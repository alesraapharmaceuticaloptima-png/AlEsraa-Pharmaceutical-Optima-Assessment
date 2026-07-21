// Relies on: config.js (CONFIG), i18n.js (STRINGS/s/t/setLang/getLang),
// data.js (DEPARTMENTS), dom.js (el, brandMasthead), scoring.js (buildResult),
// results-view.js (renderResults)

const root = document.getElementById("app");
const BACKEND_CONFIGURED = CONFIG.SCRIPT_URL.indexOf("PASTE_YOUR") !== 0;

const state = {
  screen: "landing",      // landing | checking | test | submitting | results | fatal
  dept: null,
  candidate: { name: "", email: "", phone: "" },
  queue: [],
  index: 0,
  answers: {},
  result: null,
  resultNote: null,
  landingError: null
};

setLang(CONFIG.DEFAULT_LANG || "en");

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildQueue(dept) {
  const items = [];
  dept.traits.forEach((trait, tIdx) => {
    trait.items.forEach(item => {
      items.push({ type: "likert", key: `t${tIdx}i${items.length}`, traitIndex: tIdx, text: item.text, textEN: item.text.en, reverse: item.reverse });
    });
  });
  const shuffled = shuffle(items);
  shuffled.push({ type: "sjt", key: "sjt" });
  return shuffled;
}

function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

// ---------------- Backend calls ----------------

function apiGet(params) {
  const url = CONFIG.SCRIPT_URL + "?" + new URLSearchParams(params).toString();
  return fetch(url).then(res => { if (!res.ok) throw new Error("HTTP " + res.status); return res.json(); });
}

function apiPost(payload) {
  return fetch(CONFIG.SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload)
  }).then(res => { if (!res.ok) throw new Error("HTTP " + res.status); return res.json(); });
}

// ---------------- Rendering ----------------

function render() {
  root.innerHTML = "";
  if (state.screen === "landing") root.appendChild(renderLanding());
  else if (state.screen === "checking") root.appendChild(renderInterstitial(s("checkingDetails")));
  else if (state.screen === "test") root.appendChild(renderTest());
  else if (state.screen === "submitting") root.appendChild(renderInterstitial(s("recordingResponses")));
  else if (state.screen === "results") root.appendChild(renderResults(state.result, { audience: "candidate", note: state.resultNote }));
  else root.appendChild(renderFatalError());
}

function langToggle() {
  const mkBtn = (code, label) => el("button", {
    type: "button",
    class: "lang-btn" + (getLang() === code ? " active" : ""),
    onclick: () => { setLang(code); render(); }
  }, label);
  return el("div", { class: "lang-toggle" }, [mkBtn("en", "EN"), mkBtn("ar", "عربي")]);
}

function renderInterstitial(msg) {
  const wrap = el("div", { class: "wrap" });
  wrap.appendChild(brandMasthead("WORKING"));
  const card = el("div", { class: "card" });
  card.appendChild(el("p", { class: "eyebrow" }, s("oneMoment")));
  card.appendChild(el("h2", { class: "subtitle" }, msg));
  wrap.appendChild(card);
  return wrap;
}

function renderLanding() {
  const presetRole = getParam("role");
  const wrap = el("div", { class: "wrap" });
  wrap.appendChild(brandMasthead("FORM-PSY-01"));
  wrap.appendChild(langToggle());
  const card = el("div", { class: "card" });

  if (!BACKEND_CONFIGURED) {
    card.appendChild(el("div", { class: "warn-banner" }, s("backendWarning")));
  }
  if (state.landingError) {
    card.appendChild(el("div", { class: "warn-banner" }, state.landingError));
  }

  card.appendChild(el("div", { class: "hero-logo" }, [
    el("img", { src: "assets/logo-full.png", alt: companyName() })
  ]));
  card.appendChild(el("p", { class: "eyebrow", style: "text-align:center;" }, s("candidateAssessment")));
  card.appendChild(el("h1", { class: "title", style: "text-align:center;" }, s("formTitle")));
  card.appendChild(el("p", { class: "lede" }, s("formLede")));

  const form = el("form", {});
  form.appendChild(el("div", { class: "field" }, [
    el("label", { for: "cand-name" }, s("fullName")),
    el("input", { type: "text", id: "cand-name", required: "required", autocomplete: "name" })
  ]));
  form.appendChild(el("div", { class: "field" }, [
    el("label", { for: "cand-email" }, s("emailAddress")),
    el("input", { type: "email", id: "cand-email", required: "required", autocomplete: "email" })
  ]));
  form.appendChild(el("div", { class: "field" }, [
    el("label", { for: "cand-phone" }, s("phoneOptional")),
    el("input", { type: "tel", id: "cand-phone", autocomplete: "tel" })
  ]));

  const deptSelect = el("select", { id: "cand-dept", required: "required" }, [
    el("option", { value: "" }, s("selectRolePlaceholder")),
    ...DEPARTMENTS.map(d => el("option", { value: d.id }, t(d.name)))
  ]);
  const deptField = el("div", { class: "field" }, [
    el("label", { for: "cand-dept" }, s("roleApplyingFor")),
    deptSelect
  ]);
  form.appendChild(deptField);
  if (presetRole && DEPARTMENTS.some(d => d.id === presetRole)) {
    deptSelect.value = presetRole;
    deptSelect.setAttribute("disabled", "disabled");
    deptField.appendChild(el("div", { class: "hint" }, s("presetRoleHint")));
  }

  form.appendChild(el("label", { class: "consent" }, [
    el("input", { type: "checkbox", id: "cand-consent", required: "required" }),
    el("span", {}, s("consentText")(companyName()))
  ]));

  const startBtn = el("button", { type: "submit", class: "btn" }, s("beginAssessment"));
  form.appendChild(el("div", { class: "btn-row" }, [el("div", {}), startBtn]));

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("cand-name").value.trim();
    const email = document.getElementById("cand-email").value.trim();
    const phone = document.getElementById("cand-phone").value.trim();
    const deptId = deptSelect.value;
    if (!name || !email || !deptId) return;
    const dept = DEPARTMENTS.find(d => d.id === deptId);
    state.candidate = { name, email, phone };
    state.dept = dept;
    state.landingError = null;
    startAssessmentFlow();
  });

  card.appendChild(form);
  wrap.appendChild(card);
  wrap.appendChild(el("div", { class: "foot" }, s("footerConfidential")));
  return wrap;
}

function startAssessmentFlow() {
  if (!BACKEND_CONFIGURED) {
    beginQuestions();
    return;
  }
  state.screen = "checking";
  render();
  apiGet({ action: "resultByEmail", email: state.candidate.email })
    .then(res => {
      if (res && res.found) {
        state.result = res.result;
        state.resultNote = s("alreadyCompletedNote");
        state.screen = "results";
        render();
      } else {
        beginQuestions();
      }
    })
    .catch(err => {
      console.warn("Email check failed, proceeding to assessment:", err);
      beginQuestions();
    });
}

function beginQuestions() {
  state.queue = buildQueue(state.dept);
  state.index = 0;
  state.answers = {};
  state.screen = "test";
  render();
  window.scrollTo(0, 0);
}

function renderTest() {
  const q = state.queue[state.index];
  const total = state.queue.length;
  const wrap = el("div", { class: "wrap" });
  wrap.appendChild(brandMasthead(state.dept.id.toUpperCase() + "-" + String(state.index + 1).padStart(2, "0")));
  const card = el("div", { class: "card" });

  const pct = Math.round((state.index / total) * 100);
  card.appendChild(el("div", { class: "gauge" }, [
    el("div", { class: "gauge-track" }, [el("div", { class: "gauge-fill", style: `width:${pct}%` })]),
    el("div", { class: "gauge-count" }, `${state.index + 1} / ${total}`)
  ]));

  if (q.type === "likert") {
    card.appendChild(el("div", { class: "q-kicker" }, s("rateAgreement")));
    card.appendChild(el("p", { class: "q-text" }, t(q.text)));
    const likert = el("div", { class: "likert" });
    s("likertLabels").forEach((label, i) => {
      const val = i + 1;
      const selected = state.answers[q.key] === val;
      likert.appendChild(el("button", {
        type: "button",
        class: "likert-btn" + (selected ? " selected" : ""),
        onclick: () => { state.answers[q.key] = val; goNext(); }
      }, [el("span", { class: "num" }, String(val)), el("span", {}, label)]));
    });
    card.appendChild(likert);
  } else {
    const sjt = state.dept.sjt;
    card.appendChild(el("div", { class: "q-kicker" }, s("situationalJudgment")));
    card.appendChild(el("p", { class: "q-text" }, t(sjt.question)));
    const list = el("div", { class: "opt-list" });
    sjt.options.forEach((opt, i) => {
      const letter = String.fromCharCode(97 + i);
      const selected = state.answers[q.key] === i;
      list.appendChild(el("button", {
        type: "button",
        class: "opt" + (selected ? " selected" : ""),
        onclick: () => { state.answers[q.key] = i; goNext(); }
      }, [el("span", { class: "letter" }, letter + ")"), el("span", {}, t(opt))]));
    });
    card.appendChild(list);
  }

  const backBtn = el("button", { type: "button", class: "btn ghost", onclick: goBack }, s("back"));
  if (state.index === 0) backBtn.setAttribute("disabled", "disabled");

  const rowRight = el("div", {}, state.index === total - 1 && state.answers[q.key] !== undefined
    ? el("button", { type: "button", class: "btn", onclick: submitAssessment }, s("submitAssessment"))
    : el("span", { class: "hint" }, s("tapToContinue")));

  card.appendChild(el("div", { class: "btn-row" }, [backBtn, rowRight]));
  wrap.appendChild(card);
  return wrap;
}

function goNext() {
  if (state.index < state.queue.length - 1) {
    state.index += 1;
    render();
    window.scrollTo(0, 0);
  } else {
    render();
  }
}

function goBack() {
  if (state.index > 0) {
    state.index -= 1;
    render();
    window.scrollTo(0, 0);
  }
}

function renderFatalError() {
  const wrap = el("div", { class: "wrap" });
  const card = el("div", { class: "card" });
  card.appendChild(el("h2", { class: "subtitle" }, s("somethingWrong")));
  card.appendChild(el("p", { class: "lede" }, s("refreshTryAgain")));
  wrap.appendChild(card);
  return wrap;
}

// ---------------- Submission ----------------

function submitAssessment() {
  const result = buildResult(state.dept, state.candidate, state.answers, state.queue, getLang());
  state.screen = "submitting";
  render();

  if (!BACKEND_CONFIGURED) {
    console.warn("CONFIG.SCRIPT_URL is not set — result was not saved anywhere. Computed result:", result);
    state.result = result;
    state.resultNote = s("backendNotConfiguredResultNote");
    state.screen = "results";
    render();
    return;
  }

  apiPost({ action: "submit", result })
    .then(res => {
      if (res.status === "duplicate" && res.result) {
        state.result = res.result;
        state.resultNote = s("alreadyCompletedNote");
      } else {
        state.result = result;
        state.resultNote = null;
      }
      state.screen = "results";
      render();
    })
    .catch(err => {
      console.error("Submission failed:", err);
      state.result = result;
      state.resultNote = s("submissionFailedNote");
      state.screen = "results";
      render();
    });
}

render();
