// ============================================================
// Scoring — turns raw answers into a language-neutral result
// object (department id + trait indices + scores/bands), which
// results-view.js then renders in whichever language is active
// by looking display strings up in DEPARTMENTS/STRINGS. This way
// the same stored result can be viewed in EN or AR later without
// re-scoring.
//
// The per-trait Low/Moderate/High bands (4–9 / 10–15 / 16–20)
// come directly from the assessment battery's scoring guide.
// The overall "match %" and fit verdict are NOT specified in
// that document (it only defines per-trait bands) — this is a
// straightforward, documented composite built on top of it:
// overall % = total points earned / total points possible
// across the role's 5 traits. Adjust OVERALL_BANDS below if
// you want different thresholds or labels.
// ============================================================

const OVERALL_BANDS = [
  { min: 75, level: "strong" },
  { min: 55, level: "moderate" },
  { min: 0, level: "below" }
];

function traitBandKey(score) {
  if (score <= 9) return "low";
  if (score <= 15) return "moderate";
  return "high";
}

function overallLevel(pct) {
  return OVERALL_BANDS.find(b => pct >= b.min).level;
}

// Bilingual "N and M" / "N, M, and P" list joiner.
function listJoin(arr, lang) {
  if (arr.length === 0) return "";
  if (arr.length === 1) return arr[0];
  const and = lang === "ar" ? "و" : " and ";
  if (arr.length === 2) return lang === "ar" ? `${arr[0]} و${arr[1]}` : `${arr[0]} and ${arr[1]}`;
  return lang === "ar"
    ? arr.slice(0, -1).join("، ") + "، و" + arr[arr.length - 1]
    : arr.slice(0, -1).join(", ") + ", and " + arr[arr.length - 1];
}

/**
 * Builds the recommendation paragraph in the given language, from
 * language-neutral result data. deptName/keyStrengths/developmentAreas
 * are already-localized strings (resolved by the caller via t()).
 */
function buildRecommendation(lang, deptName, verdictLevel, keyStrengths, developmentAreas, sjtOk) {
  let text;
  if (lang === "ar") {
    if (verdictLevel === "strong") {
      text = `يتماشى ملف شخصية هذا المرشح بشكل جيد مع متطلبات وظيفة ${deptName}.` +
        (keyStrengths.length ? ` تبرز نقاط قوة ملحوظة في ${listJoin(keyStrengths, lang)}.` : "") +
        ` يمكن المتابعة بثقة إلى مرحلة المقابلة للتحقق من هذه النقاط.`;
    } else if (verdictLevel === "moderate") {
      text = `يُظهر هذا المرشح ملاءمة معقولة لوظيفة ${deptName}.` +
        (developmentAreas.length ? ` يُنصح بمناقشة ${listJoin(developmentAreas, lang)} بمزيد من التفصيل أثناء المقابلة.` : " يُنصح بمناقشة نقاط محددة بمزيد من التفصيل أثناء المقابلة.");
    } else {
      text = `يشير ملف شخصية هذا المرشح إلى تحديات محتملة في وظيفة ${deptName}.` +
        ` يُنصح بالنظر في وظائف بديلة أو مناقشة مجالات التطوير أثناء المقابلة.` +
        (developmentAreas.length ? ` يُنصح بالانتباه بشكل خاص إلى ${listJoin(developmentAreas, lang)}.` : "");
    }
    if (!sjtOk) {
      text += ` ملاحظة: يشير تقييم الموقف إلى وجود فجوة محتملة في اتخاذ القرار الخاص بهذه الوظيفة — يُنصح بمناقشة إجابة السيناريو مباشرة أثناء المقابلة.`;
    }
  } else {
    if (verdictLevel === "strong") {
      text = `This candidate's personality profile aligns well with the demands of the ${deptName} role.` +
        (keyStrengths.length ? ` Particular strengths in ${listJoin(keyStrengths, lang)} stand out.` : "") +
        ` Proceed with confidence to interview to validate these strengths.`;
    } else if (verdictLevel === "moderate") {
      text = `This candidate shows a reasonable match for the ${deptName} role.` +
        (developmentAreas.length ? ` Consider probing ${listJoin(developmentAreas, lang)} further in interview.` : " Consider probing specific concerns further in interview.");
    } else {
      text = `This candidate's personality profile suggests potential challenges in the ${deptName} role.` +
        ` Consider alternative positions or discuss development areas in interview.` +
        (developmentAreas.length ? ` Particular attention to ${listJoin(developmentAreas, lang)} is recommended.` : "");
    }
    if (!sjtOk) {
      text += ` Note: situational judgment indicates a potential gap in role-specific decision-making — discuss the scenario response directly in interview.`;
    }
  }
  return text;
}

/**
 * Builds the full, language-neutral result object from a completed
 * queue + answers. `queue` and `answers` follow the shape produced
 * in app.js. `lang` is the language the candidate took the test in
 * (stored for reference; doesn't limit later re-rendering).
 */
function buildResult(dept, candidate, answers, queue, lang) {
  const traitSums = dept.traits.map(() => 0);
  queue.forEach(q => {
    if (q.type !== "likert") return;
    const raw = answers[q.key];
    if (raw === undefined) return;
    traitSums[q.traitIndex] += q.reverse ? (6 - raw) : raw;
  });

  const traits = dept.traits.map((trait, i) => {
    const score = traitSums[i];
    return { traitIndex: i, nameEN: trait.name.en, score, maxScore: 20, bandKey: traitBandKey(score) };
  });

  const totalScore = traitSums.reduce((a, b) => a + b, 0);
  const maxTotal = dept.traits.length * 20;
  const overallPercent = Math.round((totalScore / maxTotal) * 100);
  const verdictLevel = overallLevel(overallPercent);

  const keyStrengthsEN = traits.filter(tr => tr.bandKey === "high").map(tr => tr.nameEN);
  const developmentAreasEN = traits.filter(tr => tr.bandKey === "low").map(tr => tr.nameEN);

  const sjt = dept.sjt;
  const chosenIndex = answers["sjt"];
  const sjtResult = {
    chosenIndex,
    chosenTextEN: sjt.options[chosenIndex] ? sjt.options[chosenIndex].en : "",
    isBestPractice: chosenIndex === sjt.bestIndex
  };

  const recommendationEN = buildRecommendation("en", dept.name.en, verdictLevel, keyStrengthsEN, developmentAreasEN, sjtResult.isBestPractice);

  const rawResponses = queue.map(q => {
    if (q.type === "likert") {
      return { traitIndex: q.traitIndex, itemTextEN: q.textEN, reverseScored: q.reverse, response: answers[q.key] };
    }
    return { traitIndex: null, itemTextEN: sjt.question.en, response: sjt.options[answers[q.key]] ? sjt.options[answers[q.key]].en : "" };
  });

  return {
    id: (typeof window !== "undefined" && window.crypto && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2),
    timestamp: new Date().toISOString(),
    lang: lang || "en",
    candidate,
    departmentId: dept.id,
    departmentNameEN: dept.name.en,
    overallPercent,
    verdictLevel,
    traits,
    keyStrengthsEN,
    developmentAreasEN,
    sjt: sjtResult,
    recommendationEN,
    rawResponses
  };
}
