/**
 * AlEsraa Psychometric Assessment — backend
 *
 * What this does:
 *  1. Lets the site check, before a candidate starts, whether that email
 *     has already completed the assessment (once-per-email).
 *  2. On submission: rejects duplicates (returns their original result
 *     instead), otherwise appends a row to a "Responses" sheet and
 *     emails you a summary with a link to view the full results page.
 *  3. Lets the recruiter results page (results.html) look a result up
 *     by its ID for a nicely formatted view, instead of reading the
 *     raw spreadsheet.
 *
 * SETUP — see SETUP.md for the full step-by-step. Short version:
 *  1. Create a new Google Sheet.
 *  2. Extensions → Apps Script, delete the placeholder code, paste this
 *     file in.
 *  3. Change ADMIN_EMAIL and SITE_URL below.
 *  4. Deploy → New deployment → "Web app" → Execute as "Me",
 *     Who has access "Anyone". Copy the resulting URL into config.js
 *     as CONFIG.SCRIPT_URL (used by both index.html and results.html).
 */

const ADMIN_EMAIL = "alesraa.pharmaceutical.optima@gmail.com"; // <-- CHANGE THIS
// Base URL where you host index.html / results.html, no trailing slash.
// Used to build the "view full results" link in the notification email.
// e.g. "https://your-site.netlify.app"
const SITE_URL = "https://alesraapharmaceuticaloptima-png.github.io/AlEsraa-Pharmaceutical-Optima-Assessment/"; // <-- CHANGE THIS
const SHEET_NAME = "Responses";

const COLS = [
  "Timestamp", "SubmissionID", "Name", "Email", "Phone", "Department", "Language",
  "Overall %", "Verdict Level",
  "Trait 1", "Score 1", "Band 1",
  "Trait 2", "Score 2", "Band 2",
  "Trait 3", "Score 3", "Band 3",
  "Trait 4", "Score 4", "Band 4",
  "Trait 5", "Score 5", "Band 5",
  "Trait 6", "Score 6", "Band 6",
  "SJT1 Answer", "SJT1 Best Practice",
  "SJT2 Answer", "SJT2 Best Practice",
  "SJT3 Answer", "SJT3 Best Practice",
  "Result JSON"
];

function doGet(e) {
  const action = e.parameter.action;
  try {
    if (action === "resultByEmail") {
      const row = findRowByEmail_((e.parameter.email || "").trim().toLowerCase());
      return jsonOut_(row ? { found: true, result: JSON.parse(row[COLS.indexOf("Result JSON")]) } : { found: false });
    }
    if (action === "result") {
      const row = findRowById_(e.parameter.id);
      return jsonOut_(row ? { found: true, result: JSON.parse(row[COLS.indexOf("Result JSON")]) } : { found: false });
    }
    return jsonOut_({ error: "unknown_action" });
  } catch (err) {
    return jsonOut_({ error: String(err) });
  }
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const result = body.result;
    const email = (result.candidate.email || "").trim().toLowerCase();

    const existing = findRowByEmail_(email);
    if (existing) {
      return jsonOut_({ status: "duplicate", result: JSON.parse(existing[COLS.indexOf("Result JSON")]) });
    }

    const sheet = getOrCreateSheet_();
    appendRow_(sheet, result);
    sendEmail_(result);
    return jsonOut_({ status: "ok" });
  } catch (err) {
    return jsonOut_({ status: "error", message: String(err) });
  }
}

function jsonOut_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(COLS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function getAllRows_() {
  const sheet = getOrCreateSheet_();
  const values = sheet.getDataRange().getValues();
  values.shift(); // header
  return values;
}

function findRowByEmail_(email) {
  if (!email) return null;
  const emailCol = COLS.indexOf("Email");
  return getAllRows_().find(r => String(r[emailCol]).trim().toLowerCase() === email) || null;
}

function findRowById_(id) {
  if (!id) return null;
  const idCol = COLS.indexOf("SubmissionID");
  return getAllRows_().find(r => String(r[idCol]) === id) || null;
}

function appendRow_(sheet, r) {
  const t = r.traits || [];
  const get = (i, key) => (t[i] ? t[i][key] : "");
  const sj = r.sjts || [];
  const sjGet = (i, key) => (sj[i] ? sj[i][key] : "");
  sheet.appendRow([
    r.timestamp || new Date().toISOString(),
    r.id || Utilities.getUuid(),
    r.candidate.name || "",
    r.candidate.email || "",
    r.candidate.phone || "",
    r.departmentNameEN || "",
    r.lang || "en",
    r.overallPercent, r.verdictLevel,
    get(0, "nameEN"), get(0, "score"), get(0, "bandKey"),
    get(1, "nameEN"), get(1, "score"), get(1, "bandKey"),
    get(2, "nameEN"), get(2, "score"), get(2, "bandKey"),
    get(3, "nameEN"), get(3, "score"), get(3, "bandKey"),
    get(4, "nameEN"), get(4, "score"), get(4, "bandKey"),
    get(5, "nameEN"), get(5, "score"), get(5, "bandKey"),
    sjGet(0, "chosenTextEN"), sjGet(0, "isBestPractice") ? "Yes" : (sj[0] ? "No" : ""),
    sjGet(1, "chosenTextEN"), sjGet(1, "isBestPractice") ? "Yes" : (sj[1] ? "No" : ""),
    sjGet(2, "chosenTextEN"), sjGet(2, "isBestPractice") ? "Yes" : (sj[2] ? "No" : ""),
    JSON.stringify(r)
  ]);
}

function sendEmail_(r) {
  const c = r.candidate || {};
  const traitLines = (r.traits || []).map(t => `  • ${t.nameEN}: ${t.score}/20 (${capitalize_(t.bandKey)})`).join("\n");
  const sjtLines = (r.sjts || []).map((sj, i) =>
    `  • Scenario ${i + 1}: "${sj.chosenTextEN}" — ${sj.isBestPractice ? "Best practice" : "Alternative response"}`
  ).join("\n");
  const link = (SITE_URL && SITE_URL.indexOf("PASTE_YOUR") !== 0)
    ? `${SITE_URL}/results.html?id=${encodeURIComponent(r.id)}`
    : null;

  const subject = `New assessment submitted — ${c.name || "Unknown candidate"} (${r.departmentNameEN || ""}) — ${r.overallPercent}% match`;
  const body =
`A candidate has completed the psychometric assessment.

Candidate: ${c.name || ""}
Email: ${c.email || ""}
Phone: ${c.phone || ""}
Role applied for: ${r.departmentNameEN || ""}
Language taken in: ${(r.lang || "en").toUpperCase()}
Submitted: ${r.timestamp || ""}

Overall match: ${r.overallPercent}% — ${capitalize_(r.verdictLevel)} fit

Trait scores:
${traitLines}

Situational judgment responses (${r.sjtBestPracticeCount || 0}/${r.sjtTotal || 0} best practice):
${sjtLines}
${link ? `\nView the full formatted results page (candidate's language, or switch to English/Arabic on the page):\n${link}\n` : "\n(Set SITE_URL in this script to include a direct link here.)\n"}
All submissions are also stored in the "${SHEET_NAME}" sheet:
${SpreadsheetApp.getActiveSpreadsheet().getUrl()}
`;

  MailApp.sendEmail({ to: ADMIN_EMAIL, subject: subject, body: body });
}

function capitalize_(str) {
  str = String(str || "");
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Optional: run this once manually from the Apps Script editor
 * (select "testSetup" in the function dropdown, then Run) to confirm
 * the sheet gets created and a test email is sent, before you deploy.
 * Re-running it a second time should report back as a duplicate.
 */
function testSetup() {
  const result = {
    id: Utilities.getUuid(),
    timestamp: new Date().toISOString(),
    lang: "en",
    candidate: { name: "Test Candidate", email: "test@example.com", phone: "" },
    departmentId: "qa",
    departmentNameEN: "Quality Assurance",
    overallPercent: 74,
    verdictLevel: "moderate",
    traits: [
      { traitIndex: 0, nameEN: "Integrity & Ethical Judgment", score: 18, maxScore: 20, bandKey: "high" },
      { traitIndex: 1, nameEN: "Assertiveness", score: 14, maxScore: 20, bandKey: "moderate" },
      { traitIndex: 2, nameEN: "Attention to Detail", score: 17, maxScore: 20, bandKey: "high" },
      { traitIndex: 3, nameEN: "Communication & Diplomacy", score: 12, maxScore: 20, bandKey: "moderate" },
      { traitIndex: 4, nameEN: "Objectivity / Independent Judgment", score: 16, maxScore: 20, bandKey: "high" },
      { traitIndex: 5, nameEN: "Decision Making", score: 15, maxScore: 20, bandKey: "moderate" }
    ],
    sjts: [
      { sjtIndex: 0, questionEN: "Sample scenario 1", chosenIndex: 1, chosenTextEN: "Hold the release until the discrepancy is properly investigated and documented, per procedure.", isBestPractice: true },
      { sjtIndex: 1, questionEN: "Sample scenario 2", chosenIndex: 1, chosenTextEN: "Classify it under the more conservative SOP reading and document the reasoning.", isBestPractice: true },
      { sjtIndex: 2, questionEN: "Sample scenario 3", chosenIndex: 1, chosenTextEN: "Apply the same standard process regardless of the friendship.", isBestPractice: true }
    ],
    sjtBestPracticeCount: 3,
    sjtTotal: 3,
    recommendationEN: "Test recommendation text."
  };
  const out = doPost({ postData: { contents: JSON.stringify({ action: "submit", result }) } });
  Logger.log(out.getContent());
}
