// ============================================================
// renderResults(result, opts) -> DOM node
// Shared by app.js (candidate, right after submitting) and
// results.html (recruiter, opened from the notification email).
// `result` is the language-neutral object from scoring.js.
// opts.audience: "candidate" | "recruiter"
// opts.note: optional string shown in a banner above everything
// ============================================================
function renderResults(result, opts = {}) {
  const r = result;
  const dept = DEPARTMENTS.find(d => d.id === r.departmentId);
  const audience = opts.audience || "candidate";
  const wrap = el("div", { class: "wrap" });

  wrap.appendChild(brandMasthead((r.departmentId || "").toUpperCase() + "-RESULTS"));

  if (opts.note) {
    wrap.appendChild(el("div", { class: "warn-banner" }, opts.note));
  }

  const card = el("div", { class: "card" });

  card.appendChild(el("p", { class: "eyebrow" }, dept ? t(dept.name) : r.departmentNameEN));
  card.appendChild(el("h1", { class: "title" }, s("assessmentResults")));
  if (audience === "recruiter") {
    card.appendChild(el("p", { class: "lede" },
      `${r.candidate.name} · ${r.candidate.email}${r.candidate.phone ? " · " + r.candidate.phone : ""} · ${formatDate(r.timestamp)}`));
  }

  // ---- Overall match header ----
  const matchHead = el("div", { class: `match-head match-${r.verdictLevel}` }, [
    el("div", {}, [
      el("div", { class: `match-badge match-${r.verdictLevel}` }, verdictIcon(r.verdictLevel) + " " + s(verdictKey(r.verdictLevel))),
      el("div", { class: "match-sub" }, `${r.overallPercent}${s("matchSuffix")}`)
    ]),
    el("div", { class: "match-pct" }, r.overallPercent + "%")
  ]);
  card.appendChild(matchHead);

  card.appendChild(el("div", { class: "match-bar" }, [
    el("div", { class: `match-bar-fill match-${r.verdictLevel}`, style: `width:${r.overallPercent}%` })
  ]));

  // ---- Recommendation (regenerated live in the current language) ----
  const langNow = getLang();
  const deptNameLocalized = dept ? t(dept.name) : r.departmentNameEN;
  const traitNameLocalized = (traitIndex) => dept ? t(dept.traits[traitIndex].name) : "";
  const keyStrengthsLocalized = r.traits.filter(tr => tr.bandKey === "high").map(tr => traitNameLocalized(tr.traitIndex));
  const developmentAreasLocalized = r.traits.filter(tr => tr.bandKey === "low").map(tr => traitNameLocalized(tr.traitIndex));
  const recommendation = dept
    ? buildRecommendation(langNow, deptNameLocalized, r.verdictLevel, keyStrengthsLocalized, developmentAreasLocalized, r.sjt.isBestPractice)
    : r.recommendationEN;

  card.appendChild(el("div", { class: `callout callout-${r.verdictLevel}` }, [
    el("div", { class: "callout-title" }, s("recommendationTitle")),
    el("p", { class: "callout-text" }, recommendation)
  ]));

  wrap.appendChild(card);

  // ---- Trait breakdown ----
  const traitSection = el("div", { class: "card" });
  traitSection.appendChild(el("h2", { class: "subtitle" }, s("personalityTraitAssessment")));
  r.traits.forEach(tr => {
    traitSection.appendChild(renderTraitCard(tr, dept));
  });
  wrap.appendChild(traitSection);

  // ---- Strengths / development two-col ----
  const twoCol = el("div", { class: "two-col" }, [
    el("div", { class: "callout callout-strength" }, [
      el("div", { class: "callout-title" }, s("keyStrengths")),
      keyStrengthsLocalized.length
        ? el("ul", { class: "callout-list" }, keyStrengthsLocalized.map(nm => el("li", {}, nm)))
        : el("p", { class: "callout-text" }, s("noHighTraits"))
    ]),
    el("div", { class: "callout callout-dev" }, [
      el("div", { class: "callout-title" }, s("areasForDevelopment")),
      developmentAreasLocalized.length
        ? el("ul", { class: "callout-list" }, developmentAreasLocalized.map(nm => el("li", {}, nm)))
        : el("p", { class: "callout-text" }, s("noLowTraits"))
    ])
  ]);
  wrap.appendChild(twoCol);

  // ---- SJT note (only if not best-practice) ----
  if (!r.sjt.isBestPractice) {
    const sjtCard = el("div", { class: "callout callout-dev", style: "margin-top:20px;" }, [
      el("div", { class: "callout-title" }, s("sjtAltTitle")),
      el("p", { class: "callout-text" }, s("sjtAltText"))
    ]);
    if (audience === "recruiter") {
      const chosenText = dept ? t(dept.sjt.options[r.sjt.chosenIndex]) : r.sjt.chosenTextEN;
      sjtCard.appendChild(el("p", { class: "hint", style: "margin-top:8px;" }, `${s("responseGiven")} "${chosenText}"`));
    }
    wrap.appendChild(sjtCard);
  }

  wrap.appendChild(el("div", { class: "foot" },
    audience === "candidate" ? s("thankYouFooterCandidate") : s("confidentialFooterRecruiter")));

  return wrap;
}

function renderTraitCard(tr, dept) {
  const pct = Math.round((tr.score / tr.maxScore) * 100);
  const name = dept ? t(dept.traits[tr.traitIndex].name) : tr.nameEN;
  const note = s("bandNote_" + tr.bandKey) || bandNoteFallback(tr.bandKey);
  return el("div", { class: "trait-card" }, [
    el("div", { class: "trait-top" }, [
      el("div", {}, [
        el("div", { class: "trait-name" }, name),
        el("div", { class: "trait-note" }, note)
      ]),
      el("div", { class: `trait-badge trait-${tr.bandKey}` }, s("band" + capitalize(tr.bandKey)))
    ]),
    el("div", { class: "trait-score-row" }, [
      el("span", { class: "hint" }, s("scoreLabel")),
      el("span", { class: "trait-score-num" }, `${tr.score}/${tr.maxScore}`)
    ]),
    el("div", { class: "trait-bar" }, [
      el("div", { class: "trait-zones" }, [
        el("span", { class: "zone zone-low" }), el("span", { class: "zone zone-mod" }), el("span", { class: "zone zone-high" })
      ]),
      el("div", { class: "trait-marker", style: `left:${pct}%` })
    ]),
    el("div", { class: "trait-scale-labels" }, [
      el("span", {}, s("bandRangeLow")), el("span", {}, s("bandRangeModerate")), el("span", {}, s("bandRangeHigh"))
    ])
  ]);
}

const BAND_NOTES = {
  en: {
    low: "Below the typical range for this role — worth probing directly in interview.",
    moderate: "Acceptable range for most roles. May need to probe specific concerns.",
    high: "Strong fit for the demands of this trait in this role."
  },
  ar: {
    low: "أقل من النطاق المعتاد لهذه الوظيفة — يستحق التطرق إليه مباشرة أثناء المقابلة.",
    moderate: "نطاق مقبول لمعظم الوظائف. قد يستدعي الأمر مناقشة نقاط محددة.",
    high: "ملاءمة قوية لمتطلبات هذه السمة في هذه الوظيفة."
  }
};
function bandNoteFallback(bandKey) {
  return BAND_NOTES[getLang()][bandKey];
}

function capitalize(str) { return str.charAt(0).toUpperCase() + str.slice(1); }

function verdictKey(level) {
  return level === "strong" ? "verdictStrong" : level === "moderate" ? "verdictModerate" : "verdictBelow";
}

function verdictIcon(level) {
  return level === "strong" ? "●" : level === "moderate" ? "◐" : "○";
}

function formatDate(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleString(getLang() === "ar" ? "ar-EG" : undefined, { dateStyle: "medium", timeStyle: "short" });
  } catch (e) {
    return iso;
  }
}
