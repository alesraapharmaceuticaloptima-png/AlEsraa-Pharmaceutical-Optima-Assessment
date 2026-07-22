// ============================================================
// i18n — UI chrome strings (EN/AR) + small helpers.
// Content strings (department/trait/item text) live in data.js
// as { en, ar } objects and are resolved with t().
// ============================================================

const STRINGS = {
  en: {
    candidateAssessment: "Candidate Assessment",
    formTitle: "Role-Fit Personality Assessment",
    formLede: "This short self-report questionnaire helps us understand how your working style fits the role you're applying for. There are no right or wrong answers — please respond honestly and go with your first instinct. It takes about 10–15 minutes.",
    fullName: "Full name",
    emailAddress: "Email address",
    phoneOptional: "Phone (optional)",
    roleApplyingFor: "Role applying for",
    selectRolePlaceholder: "Select the role you're applying for…",
    presetRoleHint: "Pre-selected from your invitation link.",
    consentText: (company) => `I understand my responses will be reviewed by the ${company} hiring team as part of my application, and stored for that purpose.`,
    beginAssessment: "Begin assessment →",
    footerConfidential: "Your responses are confidential and used only for hiring evaluation purposes.",
    backendWarning: "⚠ Admin notice: backend not configured yet — responses will NOT be saved, emailed, or deduplicated by email until CONFIG.SCRIPT_URL is set in config.js. See SETUP.md.",
    checkingDetails: "Checking your details…",
    oneMoment: "One moment",
    recordingResponses: "Recording your responses…",
    rateAgreement: "Rate how much you agree",
    situationalJudgment: "Situational judgment",
    back: "← Back",
    tapToContinue: "Tap an answer to continue",
    submitAssessment: "Submit assessment",
    somethingWrong: "Something went wrong",
    refreshTryAgain: "Please refresh the page and try again.",
    likertLabels: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
    assessmentResults: "Assessment Results",
    matchSuffix: "% of required traits at target level",
    recommendationTitle: "Recommendation",
    personalityTraitAssessment: "Personality Trait Assessment",
    scoreLabel: "Score",
    keyStrengths: "✓ Key Strengths",
    noHighTraits: "No traits scored in the high range. Focus on development areas.",
    areasForDevelopment: "△ Areas for Development",
    noLowTraits: "All traits are at acceptable levels for this role.",
    sjtAltTitle: "◐ Situational Judgment: Alternative Response",
    sjtAltText: "This candidate selected an alternative response to the situational judgment scenario. This may indicate an area to discuss further in interview.",
    responseGiven: "Response given:",
    thankYouFooterCandidate: "Thank you for completing this assessment. The hiring team will follow up with next steps.",
    confidentialFooterRecruiter: "Confidential — for internal hiring use only.",
    alreadyCompletedNote: "You've already completed this assessment — here are your previously recorded results.",
    backendNotConfiguredResultNote: "⚠ Admin notice: backend not configured — this result was NOT saved or emailed. See SETUP.md.",
    submissionFailedNote: "⚠ Admin notice: this result could not be sent to the backend (see browser console). It was shown to the candidate but is not saved.",
    loadingResult: "Loading…",
    fetchingResult: "Fetching this candidate's results.",
    noResultId: "No result ID given",
    noResultIdBody: "Open this page using the link from the notification email, which includes ?id=… in the URL.",
    backendNotConfiguredTitle: "Backend not configured",
    backendNotConfiguredBody: "Set CONFIG.SCRIPT_URL in config.js before results can be looked up.",
    resultNotFound: "Result not found",
    resultNotFoundBody: "This link may be out of date, or the row was removed from the spreadsheet.",
    couldntLoad: "Couldn't load this result",
    couldntLoadBody: "Check your connection and try again, or open the spreadsheet directly.",
    bandLow: "Low", bandModerate: "Moderate", bandHigh: "High",
    bandRangeLow: "Low (4–9)", bandRangeModerate: "Moderate (10–15)", bandRangeHigh: "High (16–20)",
    verdictStrong: "Strong Fit", verdictModerate: "Moderate Fit", verdictBelow: "Below Target Fit",
    langToggleLabel: "Language",
    recruiterViewLabel: "Recruiter view"
  },
  ar: {
    candidateAssessment: "تقييم المتقدم",
    formTitle: "تقييم الشخصية لملاءمة الوظيفة",
    formLede: "يساعدنا هذا الاستبيان القصير القائم على التقييم الذاتي على فهم مدى ملاءمة أسلوب عملك للوظيفة التي تتقدم إليها. لا توجد إجابات صحيحة أو خاطئة — يرجى الإجابة بصدق واختيار أول انطباع يخطر ببالك. يستغرق الاستبيان من 10 إلى 15 دقيقة.",
    fullName: "الاسم الكامل",
    emailAddress: "البريد الإلكتروني",
    phoneOptional: "رقم الهاتف (اختياري)",
    roleApplyingFor: "الوظيفة المتقدَّم إليها",
    selectRolePlaceholder: "اختر الوظيفة التي تتقدم إليها…",
    presetRoleHint: "تم تحديدها مسبقًا من رابط الدعوة الخاص بك.",
    consentText: (company) => `أُقر بأن إجاباتي ستتم مراجعتها من قِبل فريق التوظيف في ${company} كجزء من طلب التوظيف، وسيتم حفظها لهذا الغرض.`,
    beginAssessment: "بدء التقييم ←",
    footerConfidential: "إجاباتك سرية ولا تُستخدم إلا لأغراض تقييم التوظيف.",
    backendWarning: "⚠ تنبيه للمسؤول: لم يتم إعداد الخادم الخلفي بعد — لن يتم حفظ الإجابات أو إرسالها بالبريد الإلكتروني أو منع تكرارها حسب البريد الإلكتروني حتى يتم ضبط CONFIG.SCRIPT_URL في ملف config.js. راجع SETUP.md.",
    checkingDetails: "جارٍ التحقق من بياناتك…",
    oneMoment: "لحظة واحدة",
    recordingResponses: "جارٍ تسجيل إجاباتك…",
    rateAgreement: "حدّد درجة موافقتك",
    situationalJudgment: "تقييم الموقف",
    back: "→ رجوع",
    tapToContinue: "اختر إجابة للمتابعة",
    submitAssessment: "إرسال التقييم",
    somethingWrong: "حدث خطأ ما",
    refreshTryAgain: "يرجى تحديث الصفحة والمحاولة مرة أخرى.",
    likertLabels: ["أعارض بشدة", "أعارض", "محايد", "أوافق", "أوافق بشدة"],
    assessmentResults: "نتائج التقييم",
    matchSuffix: "% من السمات المطلوبة عند المستوى المستهدف",
    recommendationTitle: "التوصية",
    personalityTraitAssessment: "تقييم سمات الشخصية",
    scoreLabel: "الدرجة",
    keyStrengths: "✓ نقاط القوة الرئيسية",
    noHighTraits: "لم تُسجَّل أي سمة ضمن النطاق المرتفع. ركّز على مجالات التطوير.",
    areasForDevelopment: "△ مجالات التطوير",
    noLowTraits: "جميع السمات ضمن المستويات المقبولة لهذه الوظيفة.",
    sjtAltTitle: "◐ تقييم الموقف: إجابة بديلة",
    sjtAltText: "اختار المرشح إجابة بديلة لسيناريو تقييم الموقف. قد يشير ذلك إلى نقطة تستحق مزيدًا من النقاش أثناء المقابلة.",
    responseGiven: "الإجابة المُقدَّمة:",
    thankYouFooterCandidate: "شكرًا لإكمالك هذا التقييم. سيتواصل معك فريق التوظيف بخصوص الخطوات التالية.",
    confidentialFooterRecruiter: "سرّي — للاستخدام الداخلي في التوظيف فقط.",
    alreadyCompletedNote: "لقد أكملت هذا التقييم بالفعل — هذه نتائجك المسجَّلة سابقًا.",
    backendNotConfiguredResultNote: "⚠ تنبيه للمسؤول: لم يتم إعداد الخادم الخلفي — لم يتم حفظ هذه النتيجة أو إرسالها. راجع SETUP.md.",
    submissionFailedNote: "⚠ تنبيه للمسؤول: تعذّر إرسال هذه النتيجة إلى الخادم الخلفي (راجع سجل المتصفح). تم عرضها للمرشح لكنها غير محفوظة.",
    loadingResult: "جارٍ التحميل…",
    fetchingResult: "جارٍ جلب نتائج هذا المرشح.",
    noResultId: "لم يتم تقديم معرّف للنتيجة",
    noResultIdBody: "افتح هذه الصفحة عبر الرابط الموجود في رسالة البريد الإلكتروني، والذي يتضمن ?id=… ضمن العنوان.",
    backendNotConfiguredTitle: "لم يتم إعداد الخادم الخلفي",
    backendNotConfiguredBody: "يرجى ضبط CONFIG.SCRIPT_URL في ملف config.js قبل إمكانية البحث عن النتائج.",
    resultNotFound: "لم يتم العثور على النتيجة",
    resultNotFoundBody: "قد يكون هذا الرابط قديمًا، أو تم حذف الصف من جدول البيانات.",
    couldntLoad: "تعذّر تحميل هذه النتيجة",
    couldntLoadBody: "تحقق من اتصالك وحاول مرة أخرى، أو افتح جدول البيانات مباشرة.",
    bandLow: "منخفض", bandModerate: "متوسط", bandHigh: "مرتفع",
    bandRangeLow: "منخفض (4–9)", bandRangeModerate: "متوسط (10–15)", bandRangeHigh: "مرتفع (16–20)",
    verdictStrong: "ملاءمة قوية", verdictModerate: "ملاءمة متوسطة", verdictBelow: "أقل من المستوى المستهدف",
    langToggleLabel: "اللغة",
    recruiterViewLabel: "عرض المسؤول"
  }
};

let currentLang = (typeof CONFIG !== "undefined" && CONFIG.DEFAULT_LANG) || "en";

function setLang(lang) {
  currentLang = (lang === "ar") ? "ar" : "en";
  document.documentElement.setAttribute("lang", currentLang);
  document.documentElement.setAttribute("dir", currentLang === "ar" ? "rtl" : "ltr");
}

function getLang() { return currentLang; }

// s(key) -> current-language UI string (chrome text)
function s(key) {
  const val = STRINGS[currentLang][key];
  return typeof val === "function" ? val : val;
}

// t(bilingualObj) -> current-language value from a { en, ar } content object
function t(obj) {
  if (obj === null || obj === undefined) return "";
  if (typeof obj === "string") return obj;
  return obj[currentLang] || obj.en || "";
}

function companyName() {
  return t(CONFIG.COMPANY_NAME);
}
