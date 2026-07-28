// ============================================================
// Scoring — turns raw answers into a language-neutral result
// object (department id + trait indices + scores/bands), which
// results-view.js then renders in whichever language is active
// by looking display strings up in DEPARTMENTS/STRINGS. This way
// the same stored result can be viewed in EN or AR later without
// re-scoring.
//
// The per-trait Low/Moderate/High bands (4–9 / 10–15 / 16–20)
// come directly from the assessment battery's scoring guide and
// are left untouched.
//
// The overall "match %" and fit verdict are NOT specified in
// that document — this is a composite built on top of it:
// overall % = total points earned / total points possible
// across the role's traits. Adjust OVERALL_BANDS below if you
// want different thresholds or labels.
//
// v3: bar raised. Thresholds are tighter (a merely "acceptable"
// trait profile no longer reads as Strong Fit), and — new — the
// verdict is now gated by situational-judgment performance: no
// matter how strong the trait scores are, getting a majority of
// the SJT scenarios wrong caps the verdict at "Below Target Fit",
// and missing even one scenario blocks "Strong Fit" outright. In
// a pharma production context, the judgment-call scenarios are
// exactly what predicts real on-the-job risk, so they're no
// longer just a footnote — they can override the trait composite.
// ============================================================

const OVERALL_BANDS = [
  { min: 85, level: "strong" },
  { min: 68, level: "moderate" },
  { min: 0, level: "below" }
];

const LEVEL_ORDER = ["below", "moderate", "strong"];

function traitBandKey(score) {
  if (score <= 9) return "low";
  if (score <= 15) return "moderate";
  return "high";
}

function overallLevel(pct) {
  return OVERALL_BANDS.find(b => pct >= b.min).level;
}

// Caps the verdict based on SJT performance: <50% correct caps at
// "below"; anything short of a clean sweep caps at "moderate";
// only a perfect score leaves the trait-based verdict uncapped.
function sjtCapLevel(bestPracticeCount, total) {
  if (!total) return "strong"; // no SJT data — don't cap
  const fraction = bestPracticeCount / total;
  if (fraction < 0.5) return "below";
  if (fraction < 1) return "moderate";
  return "strong";
}

function applySjtGate(rawLevel, bestPracticeCount, total) {
  const cap = sjtCapLevel(bestPracticeCount, total);
  const rawRank = LEVEL_ORDER.indexOf(rawLevel);
  const capRank = LEVEL_ORDER.indexOf(cap);
  return LEVEL_ORDER[Math.min(rawRank, capRank)];
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
function buildRecommendation(lang, deptName, verdictLevel, keyStrengths, developmentAreas, sjtInfo) {
  sjtInfo = sjtInfo || {};
  const allBestPractice = sjtInfo.allBestPractice !== false; // default true if not provided
  const capped = !!sjtInfo.capped;
  const count = sjtInfo.count;
  const total = sjtInfo.total;
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
    if (!allBestPractice) {
      text += ` ملاحظة: ${count}/${total} من إجابات تقييم الموقف طابقت الممارسة الفضلى الموصى بها.`;
      if (capped) {
        text += ` أثّر ذلك على التقييم الإجمالي، الذي كان سيعكس فئة ملاءمة أعلى استنادًا إلى درجات السمات وحدها.`;
      }
      text += ` يُنصح بمناقشة إجابات السيناريوهات مباشرة أثناء المقابلة.`;
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
    if (!allBestPractice) {
      text += ` Note: ${count}/${total} situational-judgment responses matched the recommended best-practice answer.`;
      if (capped) {
        text += ` This capped the overall verdict, which would otherwise reflect a higher-tier fit based on trait scores alone.`;
      }
      text += ` Discuss the scenario responses directly in interview.`;
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
  const rawVerdictLevel = overallLevel(overallPercent);

  const keyStrengthsEN = traits.filter(tr => tr.bandKey === "high").map(tr => tr.nameEN);
  const developmentAreasEN = traits.filter(tr => tr.bandKey === "low").map(tr => tr.nameEN);

  const sjtResults = dept.sjts.map((sjt, sIdx) => {
    const chosenIndex = answers[`sjt${sIdx}`];
    return {
      sjtIndex: sIdx,
      questionEN: sjt.question.en,
      chosenIndex,
      chosenTextEN: sjt.options[chosenIndex] ? sjt.options[chosenIndex].en : "",
      isBestPractice: chosenIndex === sjt.bestIndex
    };
  });
  const sjtBestPracticeCount = sjtResults.filter(r => r.isBestPractice).length;
  const sjtTotal = sjtResults.length;
  const sjtAllBestPractice = sjtBestPracticeCount === sjtTotal;

  const verdictLevel = applySjtGate(rawVerdictLevel, sjtBestPracticeCount, sjtTotal);
  const sjtCapped = verdictLevel !== rawVerdictLevel;

  const sjtInfo = { allBestPractice: sjtAllBestPractice, capped: sjtCapped, count: sjtBestPracticeCount, total: sjtTotal };
  const recommendationEN = buildRecommendation("en", dept.name.en, verdictLevel, keyStrengthsEN, developmentAreasEN, sjtInfo);

  const rawResponses = queue.map(q => {
    if (q.type === "likert") {
      return { traitIndex: q.traitIndex, itemTextEN: q.textEN, reverseScored: q.reverse, response: answers[q.key] };
    }
    const sjt = dept.sjts[q.sjtIndex];
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
    rawVerdictLevel,
    traits,
    keyStrengthsEN,
    developmentAreasEN,
    sjts: sjtResults,
    sjtBestPracticeCount,
    sjtTotal,
    sjtAllBestPractice,
    sjtCapped,
    recommendationEN,
    rawResponses
  };
}
