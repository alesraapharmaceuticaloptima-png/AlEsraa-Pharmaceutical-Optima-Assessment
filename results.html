<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
<title>Candidate Results — Recruiter View</title>
<meta name="robots" content="noindex, nofollow" />
<link rel="stylesheet" href="styles.css" />
</head>
<body>
<div id="app"></div>
<script src="config.js"></script>
<script src="i18n.js"></script>
<script src="dom.js"></script>
<script src="data.js"></script>
<script src="scoring.js"></script>
<script src="results-view.js"></script>
<script>
  const root = document.getElementById("app");
  setLang(CONFIG.DEFAULT_LANG || "en");

  const id = new URLSearchParams(window.location.search).get("id");
  const backendConfigured = CONFIG.SCRIPT_URL.indexOf("PASTE_YOUR") !== 0;

  function langToggle() {
    const mkBtn = (code, label) => el("button", {
      type: "button",
      class: "lang-btn" + (getLang() === code ? " active" : ""),
      onclick: () => { setLang(code); load(); }
    }, label);
    return el("div", { class: "lang-toggle" }, [mkBtn("en", "EN"), mkBtn("ar", "عربي")]);
  }

  function renderMsg(titleKey, bodyKey) {
    root.innerHTML = "";
    const wrap = el("div", { class: "wrap" });
    wrap.appendChild(brandMasthead(s("recruiterViewLabel")));
    wrap.appendChild(langToggle());
    const card = el("div", { class: "card" });
    card.appendChild(el("h2", { class: "subtitle" }, s(titleKey)));
    card.appendChild(el("p", { class: "lede" }, s(bodyKey)));
    wrap.appendChild(card);
    root.appendChild(wrap);
  }

  function load() {
    if (!id) {
      renderMsg("noResultId", "noResultIdBody");
    } else if (!backendConfigured) {
      renderMsg("backendNotConfiguredTitle", "backendNotConfiguredBody");
    } else {
      renderMsg("loadingResult", "fetchingResult");
      fetch(CONFIG.SCRIPT_URL + "?" + new URLSearchParams({ action: "result", id }).toString())
        .then(res => { if (!res.ok) throw new Error("HTTP " + res.status); return res.json(); })
        .then(data => {
          if (!data.found) {
            renderMsg("resultNotFound", "resultNotFoundBody");
            return;
          }
          root.innerHTML = "";
          const wrap = el("div", { class: "wrap" });
          wrap.appendChild(langToggle());
          root.appendChild(wrap);
          root.appendChild(renderResults(data.result, { audience: "recruiter" }));
        })
        .catch(err => {
          console.error(err);
          renderMsg("couldntLoad", "couldntLoadBody");
        });
    }
  }

  load();
</script>
</body>
</html>
