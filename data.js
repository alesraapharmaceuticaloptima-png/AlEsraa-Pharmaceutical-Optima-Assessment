// Psychometric assessment data — bilingual (EN/AR).
// Each translatable field is an { en, ar } object, resolved at render
// time via t() from i18n.js. reverse-scoring flags are language-neutral.
//
// v2 rewrite notes:
// - Likert items are written so the "socially desirable" direction is not
//   obvious from phrasing alone — each item embeds a plausible-sounding
//   justification for the low-scoring response, so faking good requires
//   genuinely holding the trait, not pattern-matching to compliant-sounding
//   language.
// - Each department now has `sjts`: an array of 3 situational-judgment
//   scenarios (was a single `sjt` object). Every option is written to sound
//   like something a reasonable employee might actually do — the correct
//   answer requires real domain judgment (authority limits, OOS/"testing
//   into compliance" rules, alert-vs-action limits, etc.), not just picking
//   the option that uses the most compliance-flavored words.
// - If your renderer reads `department.sjt`, update it to iterate
//   `department.sjts` (array of the same {question, options, bestIndex} shape).

const DEPARTMENTS = [
  {
    id: "qc-ipc",
    name: { en: "Quality Control — In-Process Control (IPC)", ar: "مراقبة الجودة — الفحص أثناء التصنيع (IPC)" },
    summary: {
      en: "IPC analysts perform real-time checks on the production floor (weight variation, hardness, disintegration, visual defects, fill volume, etc.) while the line is running. The role demands strict, uncompromising adherence to procedure, sustained vigilance under time pressure, and the integrity to report unfavorable results even when it slows the line.",
      ar: "يقوم محللو الفحص أثناء التصنيع بإجراء فحوصات فورية على أرض المصنع (تفاوت الوزن، الصلابة، التفتت، العيوب الظاهرية، حجم التعبئة، وغيرها) أثناء تشغيل خط الإنتاج. تتطلب هذه الوظيفة الالتزام الصارم وغير القابل للتفاوض بالإجراءات، ويقظة مستمرة تحت ضغط الوقت، والنزاهة في الإبلاغ عن النتائج غير المُرضية حتى لو أدى ذلك إلى إبطاء خط الإنتاج."
    },
    traits: [
      {
        name: { en: "Conscientiousness / Attention to Detail", ar: "الضمير المهني / الانتباه للتفاصيل" },
        definition: { en: "Notices small deviations from specification; is thorough rather than approximate.", ar: "يلاحظ الانحرافات الصغيرة عن المواصفات؛ ويتسم بالدقة بدلاً من التقريب." },
        items: [
          { text: { en: "When a line has been running clean for hours, a slightly quicker visual scan of each unit is a reasonable way to keep pace without any real risk.", ar: "عندما يعمل الخط بشكل سليم لساعات، يُعد الفحص البصري الأسرع قليلاً لكل وحدة طريقة معقولة للحفاظ على الوتيرة دون أي خطر حقيقي." }, reverse: true },
          { text: { en: "I record the exact figure I observe, even in cases where a rounded number would have looked identical on the log.", ar: "أسجّل الرقم الدقيق الذي ألاحظه، حتى في الحالات التي قد يبدو فيها رقم مقرّب مطابقًا في السجل." }, reverse: false },
          { text: { en: "If a second reading matches the first, that's usually enough confirmation, even when the method technically calls for a fresh reading each time.", ar: "إذا طابقت القراءة الثانية الأولى، فهذا كافٍ عادةً كتأكيد، حتى عندما تتطلب الطريقة فنيًا قراءة جديدة في كل مرة." }, reverse: true },
          { text: { en: "I'd rather flag a reading that looks slightly off, even knowing a re-check will probably just confirm it was fine.", ar: "أفضّل الإشارة إلى قراءة تبدو غير معتادة قليلاً، حتى مع علمي أن إعادة الفحص ستؤكد على الأرجح أنها كانت سليمة." }, reverse: false }
        ]
      },
      {
        name: { en: "Rule Adherence (Strictness)", ar: "الالتزام بالقواعد (الصرامة)" },
        definition: { en: "Follows SOPs exactly, resists shortcuts, treats procedure as non-negotiable.", ar: "يتبع إجراءات التشغيل القياسية بدقة، ويقاوم الطرق المختصرة، ويتعامل مع الإجراء باعتباره غير قابل للتفاوض." },
        items: [
          { text: { en: "A step that has never once caught a real problem in years of use is probably safe to streamline.", ar: "الخطوة التي لم تكشف قط عن مشكلة حقيقية طوال سنوات من استخدامها، من المحتمل أنه يمكن تبسيطها بأمان." }, reverse: true },
          { text: { en: "An operator with years of hands-on experience is often in a better position than the written SOP to judge what's safe in an unusual moment.", ar: "غالبًا ما يكون العامل ذو الخبرة العملية الطويلة في موقف أفضل من الإجراء المكتوب للحكم على ما هو آمن في لحظة غير معتادة." }, reverse: true },
          { text: { en: "Even when I'm confident I know what the result will be, I still complete every step in the sequence the SOP specifies.", ar: "حتى عندما أكون واثقًا من معرفتي بالنتيجة، ما زلت أُكمل كل خطوة بالترتيب الذي يحدده الإجراء." }, reverse: false },
          { text: { en: "When two SOPs give me slightly different ways to reach the same checkpoint, I pick whichever is faster since the endpoint is the same.", ar: "عندما يمنحني إجراءان طريقتين مختلفتين قليلاً للوصول إلى نفس نقطة التحقق، أختار الأسرع لأن النتيجة النهائية واحدة." }, reverse: true }
        ]
      },
      {
        name: { en: "Integrity & Honesty", ar: "النزاهة والأمانة" },
        definition: { en: "Reports results accurately even when inconvenient or under social pressure.", ar: "يُبلغ عن النتائج بدقة حتى عندما يكون ذلك غير مريح أو تحت ضغط اجتماعي." },
        items: [
          { text: { en: "A result that is technically within range doesn't need any special comment, even if I personally think it's drifting toward the edge.", ar: "النتيجة التي تقع فنيًا ضمن النطاق لا تحتاج إلى أي تعليق خاص، حتى لو رأيت شخصيًا أنها تنجرف نحو الحد." }, reverse: true },
          { text: { en: "If I found a small transcription error in my own report from earlier in the shift, I'd correct it through the formal channel rather than just fixing the number quietly.", ar: "لو اكتشفت خطأ نسخ بسيطًا في تقريري من وقت سابق في الوردية، سأصححه عبر القناة الرسمية بدلاً من مجرد تعديل الرقم بهدوء." }, reverse: false },
          { text: { en: "Meeting the day's production target is ultimately part of my job too, so a borderline reading deserves the benefit of the doubt.", ar: "تحقيق هدف الإنتاج اليومي هو جزء من مهمتي أيضًا في نهاية المطاف، لذا فإن القراءة الحدّية تستحق الاستفادة من الشك." }, reverse: true },
          { text: { en: "I'd report the same result the same way whether my supervisor was standing next to me or nowhere in sight.", ar: "سأُبلغ عن نفس النتيجة بنفس الطريقة سواء كان مشرفي واقفًا بجانبي أو غير موجود على الإطلاق." }, reverse: false }
        ]
      },
      {
        name: { en: "Vigilance Under Time Pressure", ar: "اليقظة تحت ضغط الوقت" },
        definition: { en: "Sustains accuracy and focus despite line speed, repetition, and noise.", ar: "يحافظ على الدقة والتركيز رغم سرعة خط الإنتاج والتكرار والضوضاء." },
        items: [
          { text: { en: "After the third hour of checking the same parameter, it's natural for the checks to become more automatic and less consciously deliberate.", ar: "بعد الساعة الثالثة من فحص نفس المعيار، من الطبيعي أن تصبح الفحوصات أكثر آلية وأقل تعمّدًا واعيًا." }, reverse: true },
          { text: { en: "When the line speeds up, I'd rather sample fewer units thoroughly than more units superficially.", ar: "عندما يتسارع الخط، أفضّل أخذ عينات أقل بدقة كاملة بدلاً من عينات أكثر بشكل سطحي." }, reverse: false },
          { text: { en: "Toward the end of a long shift, a brief mental lapse on a routine check is an understandable and fairly harmless part of the job.", ar: "قرب نهاية وردية طويلة، يُعد الانقطاع الذهني القصير في فحص روتيني أمرًا مفهومًا وغير ضار إلى حد كبير." }, reverse: true },
          { text: { en: "I use small routines (re-reading the display, re-stating the number to myself) specifically to counter the fatigue that repetitive checks cause.", ar: "أستخدم عادات بسيطة (إعادة قراءة الشاشة، وتكرار الرقم لنفسي) خصيصًا لمواجهة الإرهاق الناتج عن الفحوصات المتكررة." }, reverse: false }
        ]
      },
      {
        name: { en: "Emotional Stability", ar: "الاتزان الانفعالي" },
        definition: { en: "Stays composed when a deviation is found or when challenged about a result.", ar: "يحافظ على هدوئه عند اكتشاف انحراف أو عند التشكيك في نتيجة ما." },
        items: [
          { text: { en: "When a colleague pushes back hard on a result I recorded, my first instinct is to double-check my own data before responding.", ar: "عندما يعارض زميل بشدة نتيجة سجّلتها، فإن ردة فعلي الأولى هي التحقق من بياناتي الخاصة قبل الرد." }, reverse: false },
          { text: { en: "Discovering a real deviation on my line feels like a personal failure, even when I followed every step correctly.", ar: "اكتشاف انحراف حقيقي في خطي يبدو كفشل شخصي، حتى عندما اتبعت كل خطوة بشكل صحيح." }, reverse: true },
          { text: { en: "If a supervisor raises their voice about a flagged result, it's reasonable to soften my next report to avoid another confrontation.", ar: "إذا رفع المشرف صوته بشأن نتيجة مُبلَّغ عنها، فمن المعقول تخفيف تقريري التالي لتجنب مواجهة أخرى." }, reverse: true },
          { text: { en: "I can explain a flagged deviation calmly and factually, even to someone who is visibly frustrated by the delay it causes.", ar: "أستطيع شرح الانحراف المُبلَّغ عنه بهدوء ووضوح، حتى لشخص يبدو عليه الإحباط الواضح بسبب التأخير الذي يسببه." }, reverse: false }
        ]
      },
      {
        name: { en: "Decision Making", ar: "اتخاذ القرار" },
        definition: { en: "Makes fast, firm calls under pressure rather than deliberating or deferring.", ar: "يتخذ قرارات سريعة وحاسمة تحت الضغط بدلاً من التردد أو التأجيل." },
        items: [
          { text: { en: "For a genuinely borderline result, it makes sense to hold off recording anything until a second analyst can look at it with me.", ar: "بالنسبة لنتيجة حدّية بحق، من المنطقي تأجيل تسجيل أي شيء حتى يتمكن محلل آخر من النظر إليها معي." }, reverse: true },
          { text: { en: "Once my data clearly points one way, I record and escalate it immediately rather than waiting to see if the next few units look different.", ar: "بمجرد أن تشير بياناتي بوضوح إلى اتجاه معين، أسجّلها وأُصعّدها فورًا بدلاً من الانتظار لمعرفة ما إذا كانت الوحدات القليلة التالية ستبدو مختلفة." }, reverse: false },
          { text: { en: "Knowing that flagging a result will be unwelcome makes me want to gather a bit more evidence first, even past the point where I'm already fairly sure.", ar: "معرفتي بأن الإبلاغ عن نتيجة ما لن يكون مرحبًا به يجعلني أرغب في جمع مزيد من الأدلة أولاً، حتى بعد النقطة التي أصبحت فيها متأكدًا إلى حد كبير." }, reverse: true },
          { text: { en: "Between two acceptable ways to handle an ambiguous reading, I pick one and move, rather than searching for a third option that avoids the discomfort entirely.", ar: "بين طريقتين مقبولتين للتعامل مع قراءة غامضة، أختار إحداهما وأمضي قدمًا، بدلاً من البحث عن خيار ثالث يتجنب الإحراج تمامًا." }, reverse: false }
        ]
      }
    ],
    sjts: [
      {
        question: {
          en: "It is 2 a.m. A batch parameter comes back borderline out-of-specification. Your line supervisor — worried about the schedule — doesn't ask you to falsify anything, but says: 'Just hold off logging it until I've had a chance to look at the batch myself in an hour.' What do you do?",
          ar: "الساعة الثانية صباحًا. يظهر أحد معايير التشغيلة قريبًا من الحد الخارج عن المواصفات. مشرف الخط، القلق بشأن الجدول الزمني، لا يطلب منك تزوير أي شيء، لكنه يقول: 'فقط أجّل تسجيلها حتى تسنح لي فرصة فحص التشغيلة بنفسي خلال ساعة.' ماذا تفعل؟"
        },
        options: [
          { en: "Agree to the delay since he's not asking you to change the number, only to wait an hour before logging it.", ar: "الموافقة على التأجيل، بما أنه لا يطلب منك تغيير الرقم، بل الانتظار ساعة فقط قبل تسجيله." },
          { en: "Log the result at the time you obtained it, exactly as observed, and separately let him know he's welcome to review it — recording promptly isn't something you can trade away, even informally.", ar: "تسجيل النتيجة في وقت الحصول عليها تمامًا كما لوحظت، وإبلاغه بشكل منفصل بأنه مرحب به لمراجعتها — فالتسجيل الفوري ليس أمرًا قابلاً للمقايضة، حتى بشكل غير رسمي." },
          { en: "Refuse to speak with him at all and escalate straight to QA before even finishing your round.", ar: "رفض التحدث معه إطلاقًا والتصعيد مباشرة إلى ضمان الجودة قبل حتى الانتهاء من جولتك." },
          { en: "Log it immediately, but quietly mention to a coworker that the supervisor tried to get you to delay it, without documenting that anywhere formal.", ar: "تسجيلها فورًا، لكن الإشارة بهدوء لزميل بأن المشرف حاول جعلك تؤجلها، دون توثيق ذلك في أي مكان رسمي." }
        ],
        bestIndex: 1
      },
      {
        question: {
          en: "A routine IPC hardness check comes back out-of-specification. Out of habit, you run the test again on the same sample and this time it passes. On this line, the informal practice has always been to keep the passing retest and move on. What do you do?",
          ar: "يعود فحص روتيني للصلابة أثناء التصنيع خارج المواصفات. بدافع العادة، تُعيد الاختبار على نفس العينة وتنجح هذه المرة. في هذا الخط، كانت العادة غير الرسمية دائمًا هي الاحتفاظ بنتيجة إعادة الاختبار الناجحة والمتابعة." }, // note: keep in sync structure
        options: [
          { en: "Keep the passing retest as the official result, since it reflects the true current state of the batch.", ar: "الاحتفاظ بنتيجة إعادة الاختبار الناجحة كنتيجة رسمية، لأنها تعكس الحالة الفعلية الحالية للتشغيلة." },
          { en: "Report the initial OOS result as-is, open a formal deviation/OOS investigation, and treat the retest only as one input into that investigation — a single informal retest can't be used to overwrite an OOS result.", ar: "الإبلاغ عن النتيجة الأولية الخارجة عن المواصفات كما هي، وفتح تحقيق رسمي للانحراف، والتعامل مع إعادة الاختبار كمجرد مدخل واحد ضمن ذلك التحقيق — فإعادة اختبار غير رسمية واحدة لا يمكن أن تُلغي نتيجة خارجة عن المواصفات." },
          { en: "Average the two results together and report that figure, since it's the fairest representation.", ar: "حساب متوسط النتيجتين والإبلاغ عن ذلك الرقم، لأنه الأكثر إنصافًا." },
          { en: "Run the test two more times and report whichever result is closest to the others.", ar: "إجراء الاختبار مرتين إضافيتين والإبلاغ عن النتيجة الأقرب إلى البقية." }
        ],
        bestIndex: 1
      },
      {
        question: {
          en: "The balance you use for fill-weight checks is due for calibration this afternoon. It's currently mid-shift, the calibration technician is running late, and you still have one more scheduled weight check before the next break. What do you do?",
          ar: "الميزان الذي تستخدمه لفحوصات وزن التعبئة مستحق للمعايرة بعد ظهر اليوم. أنت الآن في منتصف الوردية، وفني المعايرة متأخر، ولا يزال لديك فحص وزن مجدول واحد آخر قبل الاستراحة التالية." }, // structural comment note
        options: [
          { en: "Use the balance for the one remaining check since it isn't overdue yet, then let the technician calibrate it right after.", ar: "استخدام الميزان لإجراء الفحص المتبقي بما أنه لم يتجاوز موعده بعد، وترك الفني يعايره مباشرة بعد ذلك." },
          { en: "Check the current calibration status and validity window first; if it's still within its valid period, proceed and document the reading normally, and flag the delayed calibration to your supervisor so it isn't missed.", ar: "التحقق أولاً من حالة المعايرة الحالية وفترة صلاحيتها؛ فإذا كانت لا تزال ضمن فترتها الصالحة، المتابعة وتوثيق القراءة بشكل طبيعي، وإبلاغ المشرف بتأخر المعايرة حتى لا تُنسى." },
          { en: "Skip the check entirely rather than risk using a balance that's due for calibration soon.", ar: "تخطي الفحص كليًا بدلاً من المخاطرة باستخدام ميزان مستحق للمعايرة قريبًا." },
          { en: "Use a nearby balance from another line without checking its calibration status, since you need a number quickly.", ar: "استخدام ميزان مجاور من خط آخر دون التحقق من حالة معايرته، لأنك بحاجة إلى رقم بسرعة." }
        ],
        bestIndex: 1
      }
    ]
  },
  {
    id: "qc-stability",
    name: { en: "Quality Control — Stability & Methodology", ar: "مراقبة الجودة — الثبات والمنهجية التحليلية" },
    summary: {
      en: "This team runs long-term and accelerated stability studies and develops/validates analytical methods. Studies unfold over months, so the role rewards patience, meticulous documentation, and calm, systematic thinking over long time horizons rather than quick action.",
      ar: "يدير هذا الفريق دراسات الثبات طويلة الأمد والمعجّلة، ويطوّر ويتحقق من صحة الطرق التحليلية. تمتد الدراسات على مدى أشهر، لذا تكافئ هذه الوظيفة الصبر، والتوثيق الدقيق، والتفكير المنهجي الهادئ على مدى زمني طويل بدلاً من اتخاذ إجراءات سريعة."
    },
    traits: [
      {
        name: { en: "Attention to Detail", ar: "الانتباه للتفاصيل" },
        definition: { en: "Tracks subtle trends across many data points and time intervals without error.", ar: "يتتبّع الاتجاهات الدقيقة عبر نقاط بيانات وفترات زمنية عديدة دون أخطاء." },
        items: [
          { text: { en: "As long as this quarter's final number matches previous quarters, there's little value in re-checking how each intermediate point was calculated.", ar: "طالما أن الرقم النهائي لهذا الربع يطابق الأرباع السابقة، فإن قيمة إعادة التحقق من كيفية حساب كل نقطة وسيطة تكون ضئيلة." }, reverse: true },
          { text: { en: "I plot new data points against the historical series before I file them, specifically to catch a trend that a single reading wouldn't reveal.", ar: "أرسم نقاط البيانات الجديدة مقابل السلسلة التاريخية قبل حفظها، خصيصًا لاكتشاف اتجاه لا تكشفه قراءة واحدة." }, reverse: false },
          { text: { en: "A one-off formatting inconsistency in a dataset that spans two years is rarely worth tracking down if the current entries are all correct.", ar: "التباين العرضي في التنسيق ضمن مجموعة بيانات تمتد على عامين نادرًا ما يستحق التقصي إذا كانت الإدخالات الحالية كلها صحيحة." }, reverse: true },
          { text: { en: "I re-verify a calculation a second time even after getting a result that matched what I expected.", ar: "أتحقق من الحساب مرة ثانية حتى بعد الحصول على نتيجة تطابق ما توقعته." }, reverse: false }
        ]
      },
      {
        name: { en: "Patience & Long-Term Focus", ar: "الصبر والتركيز طويل الأمد" },
        definition: { en: "Stays engaged and motivated on studies that take months to conclude.", ar: "يظل منخرطًا ومتحمسًا في الدراسات التي تستغرق أشهرًا لإنجازها." },
        items: [
          { text: { en: "On a study where nothing has changed for four consecutive pulls, it's understandable if my attention to that particular protocol starts to fade a little.", ar: "في دراسة لم يتغير فيها شيء لأربع سحوبات متتالية، من المفهوم أن يبدأ انتباهي لذلك البروتوكول تحديدًا بالتراجع قليلاً." }, reverse: true },
          { text: { en: "I schedule a specific check-in for myself at each interval, even for studies where I already expect the result to be unremarkable.", ar: "أُحدد لنفسي موعد متابعة محدد عند كل فترة زمنية، حتى بالنسبة للدراسات التي أتوقع فيها بالفعل نتيجة غير لافتة." }, reverse: false },
          { text: { en: "Projects with a clear finish line within a few weeks are simply more satisfying to work on than ones stretching over a year.", ar: "المشاريع ذات النهاية الواضحة خلال أسابيع قليلة تكون ببساطة أكثر إشباعًا للعمل عليها من تلك التي تمتد لعام." }, reverse: true },
          { text: { en: "I find it easy to pick a 24-month study back up with full rigor, even after months of it producing nothing noteworthy.", ar: "أجد سهولة في العودة إلى دراسة مدتها 24 شهرًا بنفس الدقة الكاملة، حتى بعد أشهر لم تُنتج فيها شيئًا لافتًا." }, reverse: false }
        ]
      },
      {
        name: { en: "Emotional Stability / Calmness", ar: "الاتزان الانفعالي / الهدوء" },
        definition: { en: "Works steadily without being rattled by unexpected results or delays.", ar: "يعمل بثبات دون أن تربكه النتائج غير المتوقعة أو التأخيرات." },
        items: [
          { text: { en: "An unexpected result on the first attempt of a new method naturally makes me question the method before I question the sample.", ar: "النتيجة غير المتوقعة في المحاولة الأولى لطريقة جديدة تجعلني بشكل طبيعي أشكك في الطريقة قبل أن أشكك في العينة." }, reverse: false },
          { text: { en: "A schedule slip on a stability pull that's clearly outside my control still leaves me visibly tense for the rest of the day.", ar: "التأخير في سحب عينة ثبات يكون واضحًا أنه خارج عن سيطرتي، ما زال يتركني متوترًا بشكل ملحوظ لبقية اليوم." }, reverse: true },
          { text: { en: "I can walk away from an unresolved method failure at the end of the day without it following me home.", ar: "أستطيع ترك فشل طريقة لم يُحل بعد في نهاية اليوم دون أن يلاحقني إلى المنزل." }, reverse: false },
          { text: { en: "When a result surprises me, my first reaction is usually to run it again immediately rather than to first review the method conditions.", ar: "عندما تفاجئني نتيجة، غالبًا ما يكون ردّ فعلي الأول هو إعادة إجرائها فورًا بدلاً من مراجعة ظروف الطريقة أولاً." }, reverse: true }
        ]
      },
      {
        name: { en: "Systematic / Analytical Thinking", ar: "التفكير المنهجي / التحليلي" },
        definition: { en: "Designs and troubleshoots methods logically, step by step.", ar: "يصمم الطرق ويعالج مشكلاتها بشكل منطقي، خطوة بخطوة." },
        items: [
          { text: { en: "When a method fails, changing two or three parameters at once is often the fastest way to find something that works.", ar: "عندما تفشل طريقة ما، يكون تغيير عاملين أو ثلاثة عوامل في آنٍ واحد غالبًا الطريقة الأسرع لإيجاد ما يصلح." }, reverse: true },
          { text: { en: "I write down my hypothesis for why a method is failing before I run the next troubleshooting experiment, not just after.", ar: "أدوّن فرضيتي حول سبب فشل الطريقة قبل إجراء تجربة استكشاف الخلل التالية، وليس بعدها فقط." }, reverse: false },
          { text: { en: "A well-known and widely cited method is unlikely to be the source of a problem, so I'd look elsewhere first.", ar: "الطريقة المعروفة والمُستشهد بها على نطاق واسع، من غير المرجح أن تكون مصدر المشكلة، لذا أبحث في مكان آخر أولاً." }, reverse: true },
          { text: { en: "I keep isolating one variable at a time even when it's slower, because a faster shortcut would make the real cause harder to identify later.", ar: "أستمر في عزل متغير واحد في كل مرة حتى لو كان ذلك أبطأ، لأن الاختصار الأسرع سيجعل تحديد السبب الحقيقي أصعب لاحقًا." }, reverse: false }
        ]
      },
      {
        name: { en: "Documentation Discipline", ar: "الانضباط في التوثيق" },
        definition: { en: "Maintains precise, audit-ready records and protocols.", ar: "يحافظ على سجلات وبروتوكولات دقيقة وجاهزة للتدقيق." },
        items: [
          { text: { en: "A deviation so minor it had zero effect on the outcome probably doesn't need its own written record — a mental note is enough.", ar: "الانحراف الطفيف لدرجة أنه لم يؤثر إطلاقًا على النتيجة، على الأرجح لا يحتاج إلى سجل مكتوب خاص به — تكفي ملاحظة ذهنية." }, reverse: true },
          { text: { en: "I write up my raw notes into the formal record the same day, even on days when the next task is already waiting.", ar: "أُدوّن ملاحظاتي الخام في السجل الرسمي في نفس اليوم، حتى في الأيام التي تكون فيها المهمة التالية بانتظاري بالفعل." }, reverse: false },
          { text: { en: "If I'm confident I'll remember the reasoning behind a judgment call, it's fine to document the conclusion without spelling out every step of how I got there.", ar: "إذا كنت واثقًا من أنني سأتذكر منطق أحد القرارات التقييمية، فمن المقبول توثيق الاستنتاج دون تفصيل كل خطوة وصلت من خلالها إليه." }, reverse: true },
          { text: { en: "I write protocols assuming a stranger will need to reconstruct exactly what I did, two years from now, with no help from me.", ar: "أكتب البروتوكولات على افتراض أن شخصًا غريبًا سيحتاج إلى إعادة بناء ما فعلته بالضبط، بعد عامين، دون أي مساعدة مني." }, reverse: false }
        ]
      },
      {
        name: { en: "Planning & Organizing", ar: "التخطيط والتنظيم" },
        definition: { en: "Structures work and prioritizes competing deadlines without losing track of long-running studies.", ar: "ينظم عمله ويرتب أولوياته بين مواعيد متعارضة دون أن يفقد تتبع الدراسات طويلة الأمد." },
        items: [
          { text: { en: "When two study deadlines collide in the same week, it makes sense to prioritize whichever one someone is actively asking about.", ar: "عندما يتزامن موعدان نهائيان لدراستين في نفس الأسبوع، من المنطقي إعطاء الأولوية لأي منهما يسأل عنه شخص بشكل نشط." }, reverse: true },
          { text: { en: "I keep a running master calendar of every pull point across all my active studies, not just the ones due soonest.", ar: "أحتفظ بتقويم رئيسي مستمر لكل نقطة سحب عبر جميع دراساتي النشطة، وليس فقط تلك المستحقة قريبًا." }, reverse: false },
          { text: { en: "A study with a distant, multi-year endpoint can reasonably wait for attention until studies with nearer deadlines are handled.", ar: "الدراسة ذات النهاية البعيدة الممتدة لسنوات يمكن بشكل معقول أن تنتظر الاهتمام إلى حين معالجة الدراسات ذات المواعيد الأقرب." }, reverse: true },
          { text: { en: "I build in a buffer before each deadline specifically so an unexpected request doesn't derail a study I'd otherwise forget about.", ar: "أُضيف هامشًا زمنيًا قبل كل موعد نهائي خصيصًا حتى لا يُعطّل طلب غير متوقع دراسة كنت سأنساها لولا ذلك." }, reverse: false }
        ]
      }
    ],
    sjts: [
      {
        question: {
          en: "A stability sample at the 12-month interval shows a result trending toward the specification limit, though still technically within range. Formal review isn't due for two more months, and nothing in the protocol requires you to act sooner. What do you do?",
          ar: "تُظهر عينة ثبات عند الفاصل الزمني البالغ 12 شهرًا نتيجة تتجه نحو حد المواصفات، رغم أنها لا تزال ضمن النطاق فنيًا. لا تُستحق المراجعة الرسمية إلا بعد شهرين آخرين، ولا يُلزمك البروتوكول بأي إجراء أبكر." },
        options: [
          { en: "Wait for the scheduled review — the result is in range and the protocol doesn't require earlier action.", ar: "الانتظار حتى المراجعة المقررة — فالنتيجة ضمن النطاق والبروتوكول لا يتطلب إجراءً أبكر." },
          { en: "Document the trend now and raise it with your supervisor/QA proactively, even though nothing technically requires it yet — a trend toward the limit is exactly the kind of thing an early-warning flag is for.", ar: "توثيق الاتجاه الآن وإبلاغ المشرف/ضمان الجودة به بشكل استباقي، حتى دون أن يُلزمك أي شيء فنيًا بذلك بعد — فالاتجاه نحو الحد هو بالضبط ما يُعنى به الإنذار المبكر." },
          { en: "Re-test the sample now, off-protocol, so you have a second data point to decide with privately before the formal review.", ar: "إعادة اختبار العينة الآن، خارج البروتوكول، للحصول على نقطة بيانات ثانية تقرر بها بشكل خاص قبل المراجعة الرسمية." },
          { en: "Note it in your personal notebook so you remember to mention it at the scheduled review, but don't raise it with anyone before then.", ar: "تدوينها في دفترك الشخصي لتتذكر ذكرها في المراجعة المقررة، لكن دون إبلاغ أي شخص بها قبل ذلك." }
        ],
        bestIndex: 1
      },
      {
        question: {
          en: "The final stability pull needed for a regulatory submission comes back with an unexpected out-of-specification impurity result, two days before the submission deadline. Retesting per your OOS procedure typically takes at least four business days. What do you do?",
          ar: "يعود آخر سحب ثبات مطلوب لتقديم تنظيمي بنتيجة شوائب خارجة عن المواصفات بشكل غير متوقع، قبل يومين من الموعد النهائي للتقديم. تستغرق إعادة الاختبار وفق إجراء الانحراف عادةً أربعة أيام عمل على الأقل. ماذا تفعل؟" },
        options: [
          { en: "Submit on time using the in-spec data from the previous interval, and quietly resolve the OOS afterward since the deadline is fixed.", ar: "التقديم في الموعد باستخدام البيانات الضمن النطاق من الفترة السابقة، وحل مشكلة الانحراف بهدوء لاحقًا بما أن الموعد النهائي ثابت." },
          { en: "Initiate the formal OOS investigation immediately and inform your supervisor and regulatory affairs of the delay risk right away — the submission timeline has to accommodate the investigation, not the other way around.", ar: "بدء التحقيق الرسمي في الانحراف فورًا وإبلاغ المشرف وقسم الشؤون التنظيمية بمخاطر التأخير على الفور — فيجب أن يتكيف الجدول الزمني للتقديم مع التحقيق، وليس العكس." },
          { en: "Ask a colleague to re-run the impurity test informally overnight to see if the result was just an anomaly, before deciding whether to tell anyone.", ar: "طلب من زميل إعادة اختبار الشوائب بشكل غير رسمي طوال الليل لمعرفة ما إذا كانت النتيجة مجرد شذوذ، قبل تقرير إبلاغ أي شخص." },
          { en: "Delay telling anyone until you're fully sure the result is real, so you don't cause unnecessary alarm over what might be a fluke.", ar: "تأجيل إبلاغ أي شخص حتى تتأكد تمامًا من أن النتيجة حقيقية، حتى لا تسبب قلقًا غير ضروري بشأن ما قد يكون مجرد صدفة." }
        ],
        bestIndex: 1
      },
      {
        question: {
          en: "An assay result on a routine stability pull is unexpectedly low. You suspect it might be a method artifact rather than true product degradation, since the same lot passed comfortably at the previous interval. What do you do?",
          ar: "تأتي نتيجة فحص المقايسة في سحب ثبات روتيني منخفضة بشكل غير متوقع. تشك في أنها قد تكون خللاً في الطريقة وليس تدهورًا حقيقيًا للمنتج، بما أن نفس التشغيلة اجتازت الاختبار بارتياح في الفترة السابقة. ماذا تفعل؟" },
        options: [
          { en: "Report it as a genuine stability failure without further checks, since second-guessing a result just because it's inconvenient isn't good practice.", ar: "الإبلاغ عنها كفشل ثبات حقيقي دون مزيد من الفحص، لأن التشكيك في نتيجة لمجرد أنها غير مريحة ليس ممارسة جيدة." },
          { en: "Quietly re-run the assay yourself and only report whichever result looks more consistent with the trend.", ar: "إعادة إجراء المقايسة بنفسك بهدوء والإبلاغ فقط عن النتيجة الأكثر اتساقًا مع الاتجاه." },
          { en: "Open a documented, hypothesis-driven investigation — check instrument performance, standards, and sample handling with a clear rationale for each check — before concluding whether this is a true failure or an assignable lab cause.", ar: "فتح تحقيق موثق وقائم على فرضية واضحة — التحقق من أداء الجهاز، والمعايير، والتعامل مع العينة بمبرر واضح لكل فحص — قبل استنتاج ما إذا كان هذا فشلاً حقيقيًا أم سببًا مخبريًا يمكن عزوه." },
          { en: "Assume it's a lab error since the previous result passed comfortably, and log the previous interval's figure instead.", ar: "افتراض أنه خطأ مخبري بما أن النتيجة السابقة اجتازت الاختبار بارتياح، وتسجيل رقم الفترة السابقة بدلاً منها." }
        ],
        bestIndex: 2
      }
    ]
  },
  {
    id: "qc-micro",
    name: { en: "Quality Control — Microbiology", ar: "مراقبة الجودة — الأحياء الدقيقة" },
    summary: {
      en: "Microbiology analysts perform sterility testing, environmental monitoring, and bioburden analysis. The work requires extreme discipline around aseptic technique and cleanliness, patience during incubation periods, and constant awareness of contamination risk.",
      ar: "يقوم محللو الأحياء الدقيقة باختبارات التعقيم، والمراقبة البيئية، وتحليل الحمل الحيوي. يتطلب هذا العمل انضباطًا صارمًا في تقنيات التعقيم والنظافة، وصبرًا خلال فترات الحضانة، ووعيًا مستمرًا بمخاطر التلوث."
    },
    traits: [
      {
        name: { en: "Attention to Detail", ar: "الانتباه للتفاصيل" },
        definition: { en: "Notices subtle signs of contamination or procedural drift.", ar: "يلاحظ العلامات الدقيقة للتلوث أو الانحراف عن الإجراءات." },
        items: [
          { text: { en: "A colony that matches the expected morphology at a glance rarely needs closer examination under magnification.", ar: "المستعمرة التي تطابق الشكل المتوقع للوهلة الأولى، نادرًا ما تحتاج إلى فحص أقرب تحت التكبير." }, reverse: true },
          { text: { en: "I log the actual incubator readout at the time I check it, rather than assuming it's holding steady because it usually does.", ar: "أُسجّل قراءة الحاضنة الفعلية وقت فحصها، بدلاً من افتراض أنها ثابتة لأنها عادةً كذلك." }, reverse: false },
          { text: { en: "Comparing today's counts against the historical trend is mostly useful when today's number already looks unusual on its own.", ar: "مقارنة أعداد اليوم بالاتجاه التاريخي مفيدة غالبًا فقط عندما يبدو رقم اليوم غير معتاد من تلقاء نفسه." }, reverse: true },
          { text: { en: "I compare today's plate counts against the historical trend even on days when today's number looks perfectly ordinary by itself.", ar: "أقارن أعداد أطباق اليوم بالاتجاه التاريخي حتى في الأيام التي يبدو فيها رقم اليوم عاديًا تمامًا بحد ذاته." }, reverse: false }
        ]
      },
      {
        name: { en: "Aseptic Discipline & Orderliness", ar: "الانضباط في التعقيم والترتيب" },
        definition: { en: "Maintains rigorous cleanliness and technique without exception.", ar: "يحافظ على نظافة وتقنية صارمة دون استثناء." },
        items: [
          { text: { en: "If I'm confident in my own technique, the exact sequence of the gowning procedure matters less than getting into the clean area efficiently.", ar: "إذا كنت واثقًا من تقنيتي الخاصة، فإن التسلسل الدقيق لإجراء ارتداء الملابس الواقية يهم أقل من الدخول بكفاءة إلى المنطقة النظيفة." }, reverse: true },
          { text: { en: "When I'm not fully sure a surface has been properly sanitized, I re-sanitize it myself rather than assuming it's fine to save time.", ar: "عندما لا أكون متأكدًا تمامًا من أن سطحًا قد تم تعقيمه بشكل صحيح، أُعيد تعقيمه بنفسي بدلاً من افتراض أنه سليم لتوفير الوقت." }, reverse: false },
          { text: { en: "For a low-risk sample that's clearly not going anywhere near a sterile product, some of the usual aseptic precautions are more about ritual than actual risk reduction.", ar: "بالنسبة لعينة منخفضة المخاطر لن تقترب بوضوح من منتج معقم، فإن بعض احتياطات التعقيم المعتادة تتعلق بالطقوس أكثر من تقليل المخاطر الفعلي." }, reverse: true },
          { text: { en: "I follow the same gowning sequence on a quiet Tuesday afternoon as I would if an auditor were standing behind me.", ar: "أتبع نفس تسلسل ارتداء الملابس الواقية في بعد ظهر ثلاثاء هادئ تمامًا كما لو كان مدقق يقف خلفي." }, reverse: false }
        ]
      },
      {
        name: { en: "Patience", ar: "الصبر" },
        definition: { en: "Manages multi-day incubation and waiting periods without losing rigor.", ar: "يدير فترات الحضانة والانتظار الممتدة لعدة أيام دون فقدان الدقة." },
        items: [
          { text: { en: "By day five of a monitoring cycle, a quicker glance at the plates is a reasonable adjustment since nothing has changed on the previous four days.", ar: "بحلول اليوم الخامس من دورة المراقبة، تكون نظرة أسرع على الأطباق تعديلاً معقولًا بما أن شيئًا لم يتغير في الأيام الأربعة السابقة." }, reverse: true },
          { text: { en: "I read plates with the same care on the final day of incubation as I did on the first, regardless of how uneventful the days in between were.", ar: "أقرأ الأطباق بنفس الحرص في اليوم الأخير من الحضانة كما فعلت في اليوم الأول، بغض النظر عن مدى خلو الأيام بينهما من الأحداث." }, reverse: false },
          { text: { en: "Work that gives an answer within the hour is simply more engaging than work that unfolds slowly across a week, and that shows in how I approach each.", ar: "العمل الذي يعطي إجابة خلال ساعة يكون ببساطة أكثر تشويقًا من العمل الذي يتكشف ببطء على مدى أسبوع، وهذا ينعكس في طريقة تعاملي مع كل منهما." }, reverse: true },
          { text: { en: "I don't mind that a sterility result won't be known for two weeks — I treat the days in between as part of the job, not dead time to get through.", ar: "لا أمانع أن نتيجة التعقيم لن تُعرف إلا بعد أسبوعين — أتعامل مع الأيام بينهما كجزء من العمل، وليس وقتًا ميتًا يجب تجاوزه." }, reverse: false }
        ]
      },
      {
        name: { en: "Calmness", ar: "الهدوء" },
        definition: { en: "Remains composed and methodical, especially when results suggest contamination.", ar: "يظل هادئًا ومنهجيًا، خاصة عندما تشير النتائج إلى وجود تلوث." },
        items: [
          { text: { en: "An unexpected positive on a sterility test makes it hard to think about anything else until it's resolved.", ar: "النتيجة الإيجابية غير المتوقعة في اختبار التعقيم تجعل من الصعب التفكير في أي شيء آخر حتى يتم حلها." }, reverse: true },
          { text: { en: "When I suspect contamination, my first move is to methodically rule out lab-based causes before assuming the worst about the product.", ar: "عندما أشك في وجود تلوث، تكون خطوتي الأولى هي استبعاد الأسباب المخبرية بشكل منهجي قبل افتراض الأسوأ بشأن المنتج." }, reverse: false },
          { text: { en: "A high-stakes result — one that could hold up a whole batch — deserves more urgency in how quickly I move, even if that means being a little less methodical.", ar: "النتيجة عالية الأهمية — التي قد توقف تشغيلة كاملة — تستحق قدرًا أكبر من الاستعجال في سرعة تحركي، حتى لو كان ذلك يعني قدرًا أقل من المنهجية." }, reverse: true },
          { text: { en: "I handle a borderline or ambiguous count the same unhurried way I'd handle an obviously clean one.", ar: "أتعامل مع عدد حدّي أو غامض بنفس الطريقة الهادئة التي أتعامل بها مع عدد نظيف بوضوح." }, reverse: false }
        ]
      },
      {
        name: { en: "Contamination Risk Awareness", ar: "الوعي بمخاطر التلوث" },
        definition: { en: "Actively anticipates and prevents sources of cross-contamination.", ar: "يتوقع بنشاط مصادر التلوث المتبادل ويمنعها." },
        items: [
          { text: { en: "If a sample was handled by someone experienced, cross-contamination is unlikely enough that I don't need to actively check for it.", ar: "إذا تعامل مع العينة شخص ذو خبرة، فإن التلوث المتبادل يكون غير مرجح بما يكفي بحيث لا أحتاج إلى التحقق منه بشكل فعلي." }, reverse: true },
          { text: { en: "I think through where cross-contamination could plausibly enter a process before it happens, not just after a result looks suspicious.", ar: "أفكر في الأماكن التي يمكن أن يدخل منها التلوث المتبادل بشكل معقول إلى العملية قبل حدوثه، وليس فقط بعد أن تبدو نتيجة ما مريبة." }, reverse: false },
          { text: { en: "A theoretical contamination pathway that's never actually caused a problem in this lab isn't really worth flagging.", ar: "المسار النظري للتلوث الذي لم يتسبب فعليًا في أي مشكلة في هذا المختبر، لا يستحق حقًا الإشارة إليه." }, reverse: true },
          { text: { en: "I treat every sample as if contamination risk is real and specific to that sample, not a generic box to check.", ar: "أتعامل مع كل عينة وكأن خطر التلوث حقيقي وخاص بتلك العينة، وليس مجرد خانة عامة يجب وضع علامة عليها." }, reverse: false }
        ]
      },
      {
        name: { en: "Complying", ar: "الامتثال" },
        definition: { en: "Follows compliance and regulatory requirements consistently, even when no one is checking.", ar: "يلتزم بمتطلبات الامتثال التنظيمية باستمرار، حتى عندما لا يراقبه أحد." },
        items: [
          { text: { en: "A documented requirement that seems excessive for a low-risk sample is a reasonable candidate for simplifying, as long as the outcome is the same.", ar: "المتطلب الموثق الذي يبدو مبالغًا فيه لعينة منخفضة المخاطر، مرشح معقول للتبسيط، طالما أن النتيجة نفسها." }, reverse: true },
          { text: { en: "I'd report a compliance gap I noticed even in a situation where I'm confident no one else would ever find out about it.", ar: "سأُبلغ عن ثغرة امتثال لاحظتها حتى في موقف أكون فيه واثقًا من أن لا أحد آخر سيكتشفها إطلاقًا." }, reverse: false },
          { text: { en: "Audits make me want to double-check my recent records, since I'm not always fully certain everything was documented in the moment.", ar: "تجعلني عمليات التدقيق أرغب في مراجعة سجلاتي الأخيرة، لأنني لست متأكدًا دائمًا تمامًا من أن كل شيء وُثّق في حينه." }, reverse: true },
          { text: { en: "I treat a regulatory requirement as necessary even on the days it feels redundant given everything else I already checked.", ar: "أتعامل مع المتطلب التنظيمي كأنه ضروري حتى في الأيام التي يبدو فيها زائدًا عن الحاجة نظرًا لكل ما تحققت منه بالفعل." }, reverse: false }
        ]
      }
    ],
    sjts: [
      {
        question: {
          en: "During a routine round, you notice a colleague skipped one step of the gowning procedure before entering the clean area. No result from that session looks abnormal, and the colleague is well-liked and about to go on shift for a full week. What do you do?",
          ar: "أثناء جولة روتينية، تلاحظ أن زميلاً تخطى خطوة واحدة من إجراء ارتداء الملابس الواقية قبل دخول المنطقة النظيفة. لا تبدو أي نتيجة من تلك الجلسة غير طبيعية، والزميل محبوب وعلى وشك الذهاب لوردية أسبوع كامل. ماذا تفعل؟" },
        options: [
          { en: "Let it go since nothing bad actually resulted this time, and mentioning it might just create tension before a long week.", ar: "تجاهل الأمر بما أنه لم يحدث ضرر فعلي هذه المرة، وقد يخلق ذكره توترًا قبل أسبوع طويل." },
          { en: "Raise it directly with the colleague and document it per the deviation procedure — the absence of a visible bad outcome doesn't change whether the procedural gap needs to be recorded and addressed.", ar: "مناقشة الأمر مباشرة مع الزميل وتوثيقه وفق إجراء الانحراف — فغياب نتيجة سيئة ظاهرة لا يغيّر ضرورة تسجيل الثغرة الإجرائية ومعالجتها." },
          { en: "Report it anonymously to your supervisor without telling the colleague directly, to avoid an awkward personal conversation.", ar: "الإبلاغ عن الأمر بشكل مجهول للمشرف دون إخبار الزميل مباشرة، لتجنب محادثة شخصية محرجة." },
          { en: "Watch the colleague more closely over the coming week and only say something if it happens again.", ar: "مراقبة الزميل عن كثب خلال الأسبوع القادم، وعدم قول أي شيء إلا إذا تكرر الأمر." }
        ],
        bestIndex: 1
      },
      {
        question: {
          en: "A sterility test shows growth on the final day of a 14-day incubation. The organism identified is one commonly associated with lab environments rather than the product's typical contaminants, and this is the first such result from this line in over a year. What do you do?",
          ar: "يُظهر اختبار التعقيم نموًا في اليوم الأخير من فترة حضانة مدتها 14 يومًا. الكائن الحي المُحدد شائع الارتباط ببيئات المختبر أكثر من الملوثات المعتادة للمنتج، وهذه أول نتيجة من هذا النوع من هذا الخط منذ أكثر من عام. ماذا تفعل؟" },
        options: [
          { en: "Report it as a true sterility failure without further investigation, since second-guessing a positive result risks looking like you're trying to explain away a bad outcome.", ar: "الإبلاغ عنها كفشل تعقيم حقيقي دون مزيد من التحقيق، لأن التشكيك في نتيجة إيجابية قد يبدو وكأنك تحاول تبرير نتيجة سيئة." },
          { en: "Assume it's a lab artifact given the organism type and the line's clean history, and quietly repeat the test before reporting anything.", ar: "افتراض أنها خلل مخبري نظرًا لنوع الكائن الحي وسجل الخط النظيف، وإعادة الاختبار بهدوء قبل الإبلاغ عن أي شيء." },
          { en: "Report the positive result as required, and open a documented investigation that specifically examines whether it's an assignable laboratory cause — using the organism identity and line history as leads to investigate, not as grounds to dismiss the result.", ar: "الإبلاغ عن النتيجة الإيجابية كما هو مطلوب، وفتح تحقيق موثق يفحص تحديدًا ما إذا كان السبب مخبريًا يمكن عزوه — باستخدام هوية الكائن الحي وسجل الخط كأدلة للتحقيق، وليس كمبرر لرفض النتيجة." },
          { en: "Escalate it as a critical batch failure immediately and recommend halting the entire product line pending full plant investigation.", ar: "التصعيد فورًا كفشل حرج للتشغيلة والتوصية بإيقاف خط الإنتاج بأكمله ريثما يتم تحقيق شامل في المصنع." }
        ],
        bestIndex: 2
      },
      {
        question: {
          en: "Your weekly environmental monitoring in a Grade C area shows a result above the alert limit but below the action limit, in a spot that has never trended this way before. Procedure requires you to note alert-level excursions and increase monitoring frequency; it does not require a full deviation or production hold. What do you do?",
          ar: "تُظهر مراقبتك البيئية الأسبوعية في منطقة من الدرجة C نتيجة أعلى من حد الإنذار لكن أقل من حد الإجراء، في موقع لم يتجه بهذا الشكل من قبل. يتطلب الإجراء تدوين تجاوزات مستوى الإنذار وزيادة تكرار المراقبة؛ ولا يتطلب انحرافًا كاملاً أو إيقاف إنتاج. ماذا تفعل؟" },
        options: [
          { en: "Treat it as essentially a non-issue since it's below the action limit, and file it as a normal reading with no additional note.", ar: "التعامل معها كأمر غير ذي أهمية فعليًا لأنها أقل من حد الإجراء، وتسجيلها كقراءة عادية دون أي ملاحظة إضافية." },
          { en: "Escalate it as a full deviation and request a production hold, treating any excursion above alert level with the same weight as an action-level exceedance.", ar: "تصعيدها كانحراف كامل وطلب إيقاف الإنتاج، بمعاملة أي تجاوز فوق مستوى الإنذار بنفس ثقل تجاوز مستوى الإجراء." },
          { en: "Document the excursion exactly as procedure requires, increase monitoring frequency at that location, and watch closely for a developing trend — without treating it as a full deviation it isn't yet.", ar: "توثيق التجاوز تمامًا كما يتطلب الإجراء، وزيادة تكرار المراقبة في ذلك الموقع، ومراقبة أي اتجاه ناشئ عن كثب — دون التعامل معها كانحراف كامل لم تصل إليه بعد." },
          { en: "Re-sample the same spot immediately, and only log whichever of the two results is lower.", ar: "إعادة أخذ عينة من نفس الموقع فورًا، وتسجيل النتيجة الأقل من الاثنتين فقط." }
        ],
        bestIndex: 2
      }
    ]
  },
  {
    id: "production",
    name: { en: "Production Department", ar: "قسم الإنتاج" },
    summary: {
      en: "Production operators and line staff run the manufacturing equipment on a daily basis. The role requires teamwork, physical and mental stamina across shifts, unwavering adherence to SOPs and safety rules, and the ability to adapt when the line encounters problems.",
      ar: "يقوم مشغلو الإنتاج وموظفو الخط بتشغيل معدات التصنيع يوميًا. تتطلب هذه الوظيفة العمل الجماعي، والتحمل الجسدي والذهني عبر الورديات، والالتزام الثابت بإجراءات التشغيل القياسية وقواعد السلامة، والقدرة على التكيف عند مواجهة الخط لمشكلات."
    },
    traits: [
      {
        name: { en: "Teamwork & Cooperation", ar: "العمل الجماعي والتعاون" },
        definition: { en: "Works smoothly with shift colleagues and hands off information clearly.", ar: "يعمل بسلاسة مع زملاء الوردية وينقل المعلومات بوضوح." },
        items: [
          { text: { en: "If a teammate hasn't asked for help, it's usually best to assume they've got things under control and let them work it out.", ar: "إذا لم يطلب زميل المساعدة، فمن الأفضل عادةً افتراض أنه يسيطر على الأمور وتركه يحل الأمر بنفسه." }, reverse: true },
          { text: { en: "I write handover notes detailed enough that the next shift wouldn't need to text me to understand what happened.", ar: "أكتب ملاحظات تسليم الوردية مفصلة بما يكفي بحيث لا يحتاج فريق الوردية التالية إلى مراسلتي لفهم ما حدث." }, reverse: false },
          { text: { en: "A quick verbal handover covers the essentials fine; writing it all down too is often redundant if the next shift can just ask if something's unclear.", ar: "التسليم الشفهي السريع يغطي الأساسيات جيدًا؛ وكتابة كل شيء أيضًا غالبًا ما تكون زائدة إذا استطاع فريق الوردية التالية السؤال عند وجود لبس." }, reverse: true },
          { text: { en: "I'll point out a struggling teammate's issue before they ask, even knowing it might come across as me overstepping.", ar: "سأشير إلى مشكلة زميل يواجه صعوبة قبل أن يطلب ذلك، حتى مع علمي أن ذلك قد يبدو تدخلاً مني." }, reverse: false }
        ]
      },
      {
        name: { en: "Stamina & Resilience", ar: "التحمل والمرونة" },
        definition: { en: "Sustains performance and mood across long or physically demanding shifts.", ar: "يحافظ على أدائه ومزاجه خلال الورديات الطويلة أو الشاقة جسديًا." },
        items: [
          { text: { en: "A drop in energy toward the last hour of a double shift is a normal part of the job that doesn't really need managing.", ar: "انخفاض الطاقة قرب الساعة الأخيرة من وردية مزدوجة جزء طبيعي من العمل لا يحتاج فعليًا إلى إدارة." }, reverse: true },
          { text: { en: "I actively pace myself early in a long shift specifically so the last hour doesn't catch me depleted.", ar: "أُنظّم وتيرتي بنشاط في بداية الوردية الطويلة خصيصًا حتى لا تفاجئني الساعة الأخيرة وأنا منهك." }, reverse: false },
          { text: { en: "Recovering slowly after an especially demanding shift is just how the body responds and isn't something I try to change.", ar: "التعافي ببطء بعد وردية شاقة بشكل خاص هو مجرد استجابة جسدية طبيعية ولست أحاول تغييرها." }, reverse: true },
          { text: { en: "I can hold the same pace and attention on repetitive tasks in hour eight as I did in hour one.", ar: "أستطيع الحفاظ على نفس الوتيرة والانتباه في المهام المتكررة في الساعة الثامنة كما فعلت في الساعة الأولى." }, reverse: false }
        ]
      },
      {
        name: { en: "SOP / Rule Adherence", ar: "الالتزام بإجراءات التشغيل القياسية" },
        definition: { en: "Follows manufacturing and hygiene procedures consistently.", ar: "يتبع إجراءات التصنيع والنظافة باستمرار." },
        items: [
          { text: { en: "A small procedural tweak that clearly saves time and doesn't change the outcome is a reasonable thing to just start doing.", ar: "التعديل الإجرائي البسيط الذي يوفر الوقت بوضوح ولا يغيّر النتيجة، هو أمر معقول أن تبدأ بفعله ببساطة." }, reverse: true },
          { text: { en: "I complete every required sign-off the same way whether or not a supervisor happens to be nearby.", ar: "أُكمل كل توقيع مطلوب بنفس الطريقة سواء كان المشرف قريبًا أم لا." }, reverse: false },
          { text: { en: "Documented steps sometimes protect against problems that basically never happen in practice, which makes a shortcut feel low-risk.", ar: "الخطوات الموثقة تحمي أحيانًا من مشكلات لا تحدث عمليًا تقريبًا، ما يجعل الاختصار يبدو منخفض المخاطر." }, reverse: true },
          { text: { en: "I follow the standard operating procedure precisely even when I'm confident I could get to the same result faster a different way.", ar: "أتبع إجراء التشغيل القياسي بدقة حتى عندما أكون واثقًا من قدرتي على الوصول لنفس النتيجة بطريقة أسرع." }, reverse: false }
        ]
      },
      {
        name: { en: "Safety Consciousness", ar: "الوعي بالسلامة" },
        definition: { en: "Prioritizes safe behavior for self and colleagues, even under deadline pressure.", ar: "يُعطي الأولوية للسلوك الآمن لنفسه ولزملائه، حتى تحت ضغط المواعيد النهائية." },
        items: [
          { text: { en: "For a task that will take under two minutes, putting on the full required protective equipment can feel like more trouble than the actual risk warrants.", ar: "بالنسبة لمهمة تستغرق أقل من دقيقتين، قد يبدو ارتداء كامل معدات الحماية المطلوبة عناءً أكبر مما تستحقه المخاطرة الفعلية." }, reverse: true },
          { text: { en: "I'll point out an unsafe condition even if it's not technically in my area and someone else would normally be responsible for it.", ar: "سأشير إلى حالة غير آمنة حتى لو لم تكن فنيًا ضمن منطقتي وكان شخص آخر مسؤولاً عنها عادةً." }, reverse: false },
          { text: { en: "When I'm rushing to hit a target, a safety step that feels like it's 'just there to cover the company' is an understandable thing to move quickly through.", ar: "عندما أتعجل لتحقيق هدف، فإن خطوة السلامة التي تبدو 'مجرد إجراء لحماية الشركة قانونيًا' من المفهوم أن أتجاوزها بسرعة." }, reverse: true },
          { text: { en: "I think through what could go wrong physically before I start a task, even a familiar one I've done hundreds of times.", ar: "أفكر فيما قد يحدث خطأ جسديًا قبل بدء مهمة ما، حتى لو كانت مألوفة وقمت بها مئات المرات." }, reverse: false }
        ]
      },
      {
        name: { en: "Adaptability Under Pressure", ar: "القدرة على التكيف تحت الضغط" },
        definition: { en: "Adjusts calmly when equipment issues or schedule changes occur.", ar: "يتكيف بهدوء عند حدوث مشكلات في المعدات أو تغييرات في الجدول الزمني." },
        items: [
          { text: { en: "A sudden change to the day's schedule tends to throw off my whole rhythm for a while, even after I understand the new plan.", ar: "التغيير المفاجئ في جدول اليوم يميل إلى تعطيل إيقاعي بأكمله لفترة، حتى بعد فهمي للخطة الجديدة." }, reverse: true },
          { text: { en: "When equipment breaks down mid-shift, my first instinct is to figure out the safe next step, not to wait for someone else to tell me what to do.", ar: "عندما تتعطل المعدات في منتصف الوردية، تكون غريزتي الأولى هي معرفة الخطوة التالية الآمنة، وليس انتظار شخص آخر ليخبرني بما أفعله." }, reverse: false },
          { text: { en: "Jumping between two different task types in the same hour tends to leave me a bit less sharp at each one than if I'd stuck to just one.", ar: "الانتقال بين نوعين مختلفين من المهام في نفس الساعة يميل إلى تركي أقل تركيزًا قليلاً في كل منهما مما لو التزمت بواحدة فقط." }, reverse: true },
          { text: { en: "I stay just as productive when the day's priorities get reshuffled twice as when they stay fixed from morning to end of shift.", ar: "أظل منتجًا بنفس القدر عندما تُعاد ترتيب أولويات اليوم مرتين كما لو ظلت ثابتة من الصباح حتى نهاية الوردية." }, reverse: false }
        ]
      },
      {
        name: { en: "Delivering Results", ar: "إيصال النتائج" },
        definition: { en: "Consistently meets output and quality targets, and follows through on commitments.", ar: "يحقق باستمرار أهداف الإنتاج والجودة، وينفذ التزاماته حتى النهاية." },
        items: [
          { text: { en: "When a shift target starts to look genuinely out of reach, accepting a slightly lower number is often the more realistic call than pushing everyone harder.", ar: "عندما يبدو هدف الوردية بعيد المنال حقًا، غالبًا ما يكون قبول رقم أقل قليلاً القرار الأكثر واقعية من دفع الجميع بقوة أكبر." }, reverse: true },
          { text: { en: "I follow through on something I committed to even after the person who originally asked for it seems to have moved on to something else.", ar: "أنفذ ما التزمت به حتى بعد أن يبدو أن الشخص الذي طلبه أصلاً قد انتقل إلى أمر آخر." }, reverse: false },
          { text: { en: "A task nobody has followed up on in a while probably wasn't that important to begin with, so letting it slip is a reasonable read of the situation.", ar: "المهمة التي لم يتابعها أحد منذ فترة، ربما لم تكن مهمة أصلاً، لذا فإن تركها تتأخر قراءة معقولة للموقف." }, reverse: true },
          { text: { en: "I treat my shift's targets as mine to hit, not just something to contribute my part toward and hope averages out.", ar: "أتعامل مع أهداف ورديتي كأنها مسؤوليتي في تحقيقها، وليست مجرد شيء أُسهم بدوري فيه على أمل أن يتوازن المعدل." }, reverse: false }
        ]
      }
    ],
    sjts: [
      {
        question: {
          en: "Midway through a shift, one machine starts producing units with a slight cosmetic difference from the standard — the kind of thing that has, in the past, sometimes turned out to be within acceptable variation. Stopping the line will hurt the day's output target. What do you do?",
          ar: "في منتصف الوردية، تبدأ إحدى الآلات في إنتاج وحدات بها اختلاف تجميلي بسيط عن المعيار — وهو النوع الذي تبيّن في الماضي أحيانًا أنه ضمن التفاوت المقبول. إيقاف الخط سيؤثر على هدف الإنتاج اليومي. ماذا تفعل؟" },
        options: [
          { en: "Keep the line running since this kind of variation has turned out to be acceptable before, and stopping unnecessarily would cost time for nothing.", ar: "إبقاء الخط يعمل بما أن هذا النوع من التفاوت تبيّن أنه مقبول من قبل، وإيقافه دون داعٍ سيكلف وقتًا دون فائدة." },
          { en: "Flag it and pull a sample per procedure, notifying your supervisor and QC so they can assess it — recognize that whether to stop the line and how to classify the units isn't a call you're authorized to make alone, even with good intentions.", ar: "الإشارة إليها وسحب عينة وفق الإجراء، وإبلاغ المشرف وضمان الجودة حتى يتمكنا من تقييمها — مع إدراك أن قرار إيقاف الخط وتصنيف الوحدات ليس قرارًا مخوّلًا لك اتخاذه بمفردك، حتى بنية حسنة." },
          { en: "Quietly pull the odd-looking units yourself and set them aside without telling anyone, so the line keeps moving and the issue is 'handled.'", ar: "سحب الوحدات ذات المظهر غير المعتاد بنفسك بهدوء ووضعها جانبًا دون إخبار أحد، حتى يستمر الخط ويكون الأمر 'محلولًا'." },
          { en: "Stop the line yourself immediately without notifying anyone yet, and figure out the cause on your own before looping anyone in.", ar: "إيقاف الخط بنفسك فورًا دون إبلاغ أي شخص بعد، ومعرفة السبب بنفسك قبل إشراك أي شخص." }
        ],
        bestIndex: 1
      },
      {
        question: {
          en: "You're four hours into a double shift, genuinely tired, when your supervisor asks if you can cover a second line for the last two hours because another operator called in sick. Nothing you'd be doing is unusual or unsafe on its own, but you know your focus isn't at its sharpest right now. What do you do?",
          ar: "أنت في الساعة الرابعة من وردية مزدوجة، متعب حقًا، عندما يسألك مشرفك إن كان بإمكانك تغطية خط ثانٍ للساعتين الأخيرتين لأن مشغلاً آخر أبلغ عن مرضه. لا شيء ستقوم به غير معتاد أو غير آمن بحد ذاته، لكنك تعلم أن تركيزك ليس في أفضل حالاته الآن. ماذا تفعل؟" },
        options: [
          { en: "Agree without mentioning your fatigue, since the tasks themselves aren't unusually risky and you don't want to seem unwilling to help.", ar: "الموافقة دون ذكر إرهاقك، بما أن المهام نفسها ليست عالية المخاطر بشكل غير معتاد ولا تريد أن تبدو غير راغب في المساعدة." },
          { en: "Say yes, but tell your supervisor honestly that you're running low by this point so they can decide whether that's still workable — letting them make an informed call rather than deciding for them by staying quiet.", ar: "الموافقة، لكن إخبار المشرف بصدق أن طاقتك بدأت تنفد في هذه المرحلة حتى يقرر ما إذا كان ذلك لا يزال ممكنًا — تاركًا له اتخاذ قرار مستنير بدلاً من أن تقرر نيابة عنه بالصمت." },
          { en: "Decline outright without explanation, since you'd rather not risk it.", ar: "الرفض تمامًا دون تفسير، لأنك تفضّل عدم المخاطرة." },
          { en: "Agree, and privately plan to go a bit slower than usual on the second line so you don't make a mistake, without telling anyone why.", ar: "الموافقة، والتخطيط سرًا للعمل بوتيرة أبطأ قليلاً من المعتاد على الخط الثاني حتى لا ترتكب خطأ، دون إخبار أي شخص بالسبب." }
        ],
        bestIndex: 1
      },
      {
        question: {
          en: "You're new on the line. You notice a senior, well-liked operator consistently skips one PPE step during a specific task — it hasn't caused any visible incident, and everyone seems to treat it as normal. What do you do?",
          ar: "أنت جديد على الخط. تلاحظ أن مشغلاً أقدم ومحبوبًا يتخطى باستمرار خطوة واحدة من معدات الحماية الشخصية أثناء مهمة معينة — لم تسبب أي حادثة ظاهرة، ويبدو أن الجميع يعاملون الأمر وكأنه طبيعي. ماذا تفعل؟" },
        options: [
          { en: "Say nothing since you're new, everyone else seems fine with it, and it's not really your place to correct a senior colleague.", ar: "عدم قول أي شيء بما أنك جديد، ويبدو أن الجميع لا يمانعون، وليس من مكانك تصحيح زميل أقدم." },
          { en: "Raise it — with the colleague directly if you feel comfortable, or through your supervisor if not — because a safety step being skipped without incident so far doesn't make it optional, and staying quiet just because it's 'always been like this' isn't the same as it being safe.", ar: "الإشارة إلى الأمر — مع الزميل مباشرة إذا شعرت بالارتياح، أو عبر المشرف إذا لم تشعر بذلك — لأن تخطي خطوة سلامة دون حادثة حتى الآن لا يجعلها اختيارية، والصمت لمجرد أن 'الأمر كان دائمًا هكذا' لا يعني أنه آمن." },
          { en: "Start skipping the same step yourself since it seems to be accepted practice on this line.", ar: "البدء بتخطي نفس الخطوة بنفسك بما أنها تبدو ممارسة مقبولة في هذا الخط." },
          { en: "Wait until you've been on the team longer before saying anything, so it doesn't look like you're trying to make an impression early on.", ar: "الانتظار حتى تمضي فترة أطول في الفريق قبل قول أي شيء، حتى لا يبدو الأمر وكأنك تحاول ترك انطباع مبكرًا." }
        ],
        bestIndex: 1
      }
    ]
  },
  {
    id: "process-optimization",
    name: { en: "Process Optimization", ar: "تحسين العمليات" },
    summary: {
      en: "This role analyzes manufacturing data to identify inefficiencies and redesign processes for better yield, speed, or cost. It calls for analytical and systems thinking, genuine creativity, and the persistence to test and refine ideas that don't work the first time.",
      ar: "تُحلل هذه الوظيفة بيانات التصنيع لتحديد أوجه القصور وإعادة تصميم العمليات لتحسين الإنتاجية أو السرعة أو التكلفة. وتتطلب تفكيرًا تحليليًا ومنظوميًا، وإبداعًا حقيقيًا، والمثابرة على اختبار وتطوير الأفكار التي لا تنجح من المحاولة الأولى."
    },
    traits: [
      {
        name: { en: "Analytical / Systems Thinking", ar: "التفكير التحليلي / المنظومي" },
        definition: { en: "Sees how changes in one part of a process ripple through the whole system.", ar: "يدرك كيف تنتشر تأثيرات التغييرات في جزء من العملية عبر النظام بأكمله." },
        items: [
          { text: { en: "If a fix clearly solves the specific bottleneck in front of me, it's reasonable to implement it without mapping out every downstream step it might touch.", ar: "إذا كان الحل يعالج بوضوح العائق المحدد أمامي، فمن المعقول تنفيذه دون تخطيط كل خطوة لاحقة قد يمسها." }, reverse: true },
          { text: { en: "Before proposing a change, I sketch out which downstream steps it could plausibly affect, even ones that seem unrelated at first glance.", ar: "قبل اقتراح تغيير ما، أرسم الخطوات اللاحقة التي قد يؤثر عليها بشكل معقول، حتى تلك التي تبدو غير ذات صلة للوهلة الأولى." }, reverse: false },
          { text: { en: "A recurring problem that keeps getting patched the same way probably just needs a better patch, not a deeper look at why it keeps recurring.", ar: "المشكلة المتكررة التي يُعاد رقعها بنفس الطريقة تحتاج على الأرجح إلى رقعة أفضل، لا إلى نظرة أعمق لسبب تكرارها." }, reverse: true },
          { text: { en: "When the same failure shows up in a different part of the line, I look for a shared root cause before assuming they're two unrelated issues.", ar: "عندما يظهر نفس الفشل في جزء مختلف من الخط، أبحث عن سبب جذري مشترك قبل افتراض أنهما مشكلتان غير مرتبطتين." }, reverse: false }
        ]
      },
      {
        name: { en: "Innovation & Creativity", ar: "الابتكار والإبداع" },
        definition: { en: "Generates genuinely new approaches rather than only incremental tweaks.", ar: "يبتكر أساليب جديدة حقًا وليس مجرد تعديلات طفيفة." },
        items: [
          { text: { en: "When a familiar approach has always worked well enough, that track record is usually a good enough reason to keep using it over an untested alternative.", ar: "عندما يكون الأسلوب المألوف قد نجح دائمًا بشكل كافٍ، فإن هذا السجل يكون عادةً سببًا كافيًا للاستمرار باستخدامه بدلاً من بديل غير مُختبر." }, reverse: true },
          { text: { en: "I regularly borrow an idea from a completely different industry or process and test whether it applies here.", ar: "أستعير بانتظام فكرة من صناعة أو عملية مختلفة تمامًا وأختبر ما إذا كانت تنطبق هنا." }, reverse: false },
          { text: { en: "Proposing an approach that's never been tried before carries a certain risk to my credibility if it doesn't pan out, which is worth weighing against the upside.", ar: "اقتراح أسلوب لم يُجرَّب من قبل يحمل مخاطرة معينة على مصداقيتي إذا لم ينجح، وهو أمر يستحق الموازنة مقابل الفائدة المحتملة." }, reverse: true },
          { text: { en: "Colleagues would say I'm the one who suggests the option nobody else had thought of, not just a faster version of the current process.", ar: "سيقول الزملاء إنني الشخص الذي يقترح الخيار الذي لم يفكر فيه أحد آخر، وليس مجرد نسخة أسرع من العملية الحالية." }, reverse: false }
        ]
      },
      {
        name: { en: "Persistence in Problem-Solving", ar: "المثابرة في حل المشكلات" },
        definition: { en: "Keeps iterating on a problem despite early failures or dead ends.", ar: "يواصل تكرار المحاولة على مشكلة ما رغم الإخفاقات المبكرة أو الطرق المسدودة." },
        items: [
          { text: { en: "If the first two attempts at an improvement don't move the numbers, that's a reasonably strong signal the underlying idea isn't worth more time.", ar: "إذا لم تحرّك أول محاولتين للتحسين الأرقام، فهذه إشارة قوية بشكل معقول إلى أن الفكرة الأساسية لا تستحق مزيدًا من الوقت." }, reverse: true },
          { text: { en: "A pilot that fails to show improvement still tells me something useful about why the original bottleneck exists, so I don't count it as wasted.", ar: "التجربة التي تفشل في إظهار تحسن، ما زالت تخبرني بشيء مفيد عن سبب وجود العائق الأصلي، لذا لا أعتبرها هدرًا للوقت." }, reverse: false },
          { text: { en: "After a couple of setbacks on the same improvement project, it's fair to redirect that energy toward something more likely to show quick wins.", ar: "بعد نكستين على نفس مشروع التحسين، من العدل إعادة توجيه تلك الطاقة نحو شيء أكثر احتمالًا لإظهار نتائج سريعة." }, reverse: true },
          { text: { en: "I keep testing variations on an idea after early failures, adjusting one thing at a time rather than dropping the whole approach.", ar: "أستمر في اختبار تنويعات على فكرة ما بعد الإخفاقات المبكرة، معدّلاً شيئًا واحدًا في كل مرة بدلاً من التخلي عن الأسلوب بأكمله." }, reverse: false }
        ]
      },
      {
        name: { en: "Data Orientation", ar: "التوجه القائم على البيانات" },
        definition: { en: "Bases conclusions on data and evidence rather than intuition alone.", ar: "يبني استنتاجاته على البيانات والأدلة بدلاً من الحدس وحده." },
        items: [
          { text: { en: "When the numbers and my own read of the floor genuinely conflict, my gut instinct — built from time actually watching the line — deserves real weight in the decision.", ar: "عندما تتعارض الأرقام مع قراءتي الخاصة لأرض المصنع بشكل حقيقي، فإن حدسي — المبني على وقت قضيته فعليًا في مراقبة الخط — يستحق وزنًا حقيقيًا في القرار." }, reverse: true },
          { text: { en: "Before I recommend a change, I want to see the data even for the parts of my reasoning that already feel obviously true.", ar: "قبل أن أوصي بتغيير، أريد رؤية البيانات حتى للأجزاء من منطقي التي تبدو صحيحة بشكل واضح بالفعل." }, reverse: false },
          { text: { en: "If a conclusion is directionally right, presenting it with slightly more confidence than the data strictly supports is a normal part of getting buy-in.", ar: "إذا كان الاستنتاج صحيحًا من حيث الاتجاه، فإن تقديمه بثقة أكبر قليلاً مما تدعمه البيانات فعليًا هو جزء طبيعي من كسب التأييد." }, reverse: true },
          { text: { en: "I'd rather present a smaller finding I can fully back with evidence than a bigger one I can only mostly justify.", ar: "أفضّل تقديم نتيجة أصغر أستطيع دعمها بالكامل بالأدلة على نتيجة أكبر أستطيع تبريرها جزئيًا فقط." }, reverse: false }
        ]
      },
      {
        name: { en: "Initiative / Proactivity", ar: "المبادرة / الاستباقية" },
        definition: { en: "Identifies opportunities for improvement without being asked.", ar: "يحدد فرص التحسين دون أن يُطلب منه ذلك." },
        items: [
          { text: { en: "It's generally more efficient to focus on the improvements I'm explicitly asked to look into rather than spending time searching for ones nobody's flagged.", ar: "من الأكثر كفاءة عمومًا التركيز على التحسينات المطلوبة مني صراحة بدلاً من قضاء الوقت في البحث عن تحسينات لم يشر إليها أحد." }, reverse: true },
          { text: { en: "I follow up on a suggestion I made even after a few weeks pass with no one acting on it, rather than assuming it's been forgotten for a good reason.", ar: "أتابع اقتراحًا قدمته حتى بعد مرور أسابيع قليلة دون أن يتصرف فيه أحد، بدلاً من افتراض أنه نُسي لسبب وجيه." }, reverse: false },
          { text: { en: "Waiting to see whether someone more senior raises an idea first is usually the safer move before putting your own name on it.", ar: "الانتظار لمعرفة ما إذا كان شخص أعلى مرتبة سيطرح الفكرة أولاً، هو عادةً التحرك الأكثر أمانًا قبل وضع اسمك عليها." }, reverse: true },
          { text: { en: "I look for improvement opportunities during the normal course of my work, not just when a project specifically asks me to.", ar: "أبحث عن فرص التحسين خلال سير عملي الطبيعي، وليس فقط عندما يطلب مني مشروع محدد ذلك." }, reverse: false }
        ]
      },
      {
        name: { en: "Decision Making", ar: "اتخاذ القرار" },
        definition: { en: "Commits to a data-backed course of action quickly rather than over-deliberating.", ar: "يلتزم بمسار عمل مدعوم بالبيانات بسرعة بدلاً من الإفراط في التداول." },
        items: [
          { text: { en: "Even with fairly strong supporting data, one more round of analysis rarely hurts before committing to a recommendation.", ar: "حتى مع وجود بيانات داعمة قوية إلى حد ما، نادرًا ما تضر جولة تحليل إضافية قبل الالتزام بتوصية." }, reverse: true },
          { text: { en: "Once the data clearly supports a direction, I move to propose it even knowing some people won't like the change.", ar: "بمجرد أن تدعم البيانات اتجاهًا بوضوح، أنتقل لاقتراحه حتى مع علمي أن بعض الناس لن يعجبهم التغيير." }, reverse: false },
          { text: { en: "Expecting pushback from the team is a reasonable enough reason to hold off proposing something a little longer, until the timing feels better.", ar: "توقع معارضة من الفريق سبب كافٍ بشكل معقول للتأجيل قليلاً قبل اقتراح شيء ما، حتى يبدو التوقيت أفضل." }, reverse: true },
          { text: { en: "Once I've committed to a pilot, I let it run its course rather than second-guessing the decision every few days.", ar: "بمجرد التزامي بتجربة، أتركها تأخذ مسارها بدلاً من إعادة التشكيك في القرار كل بضعة أيام." }, reverse: false }
        ]
      }
    ],
    sjts: [
      {
        question: {
          en: "Your analysis shows a change to the fill sequence could improve throughput by 8%, but it requires production staff to alter a habit they're comfortable with, and your last two proposed process changes were both quietly ignored. What do you do?",
          ar: "يُظهر تحليلك أن تغيير تسلسل التعبئة يمكن أن يحسّن الإنتاجية بنسبة 8%، لكنه يتطلب من موظفي الإنتاج تغيير عادة اعتادوا عليها، وقد تم تجاهل آخر تغييرين اقترحتهما بهدوء. ماذا تفعل؟" },
        options: [
          { en: "Drop this one too, since the pattern with your last two suggestions makes it seem unlikely to go anywhere this time either.", ar: "التخلي عن هذا الاقتراح أيضًا، بما أن النمط مع اقتراحيك الأخيرين يجعل من غير المرجح أن يذهب إلى أي مكان هذه المرة أيضًا." },
          { en: "Run a small, low-disruption pilot, bring the production team into reviewing the data with you, and use their feedback to adjust the rollout — treating their buy-in as part of the solution, not an obstacle to route around.", ar: "إجراء تجربة صغيرة قليلة التعطيل، وإشراك فريق الإنتاج في مراجعة البيانات معك، واستخدام ملاحظاتهم لتعديل التنفيذ — بمعاملة موافقتهم كجزء من الحل، وليس عائقًا يجب الالتفاف حوله." },
          { en: "Implement it directly through a change to the equipment settings during a shift change, so it's already in place before anyone has a chance to object.", ar: "تنفيذه مباشرة عبر تغيير إعدادات المعدات أثناء تبديل الوردية، حتى يكون قد طُبّق بالفعل قبل أن تتاح لأحد فرصة الاعتراض." },
          { en: "Write up the full proposal and data and send it to senior management directly, bypassing the production floor conversation entirely this time.", ar: "كتابة الاقتراح الكامل والبيانات وإرسالها مباشرة إلى الإدارة العليا، متجاوزًا نقاش أرض الإنتاج تمامًا هذه المرة." }
        ],
        bestIndex: 1
      },
      {
        question: {
          en: "Your data model recommends a process change that looks clearly favorable, but a veteran operator with 15 years on that exact line says it will cause a problem the model wouldn't capture — something about how the equipment behaves at a certain time of day that isn't in any log. What do you do?",
          ar: "يوصي نموذج بياناتك بتغيير في العملية يبدو مفيدًا بوضوح، لكن مشغلاً خبيرًا لديه 15 عامًا على هذا الخط بالذات يقول إنه سيسبب مشكلة لن يلتقطها النموذج — شيء يتعلق بكيفية تصرف المعدات في وقت معين من اليوم غير مسجل في أي سجل. ماذا تفعل؟" },
        options: [
          { en: "Proceed with the model's recommendation as-is, since the data is more objective than one person's impression, however experienced.", ar: "المضي قدمًا بتوصية النموذج كما هي، بما أن البيانات أكثر موضوعية من انطباع شخص واحد، مهما كانت خبرته." },
          { en: "Defer to the operator's experience and drop the change, since 15 years on the line outweighs a model that clearly missed something.", ar: "الاستناد إلى خبرة المشغل والتخلي عن التغيير، بما أن 15 عامًا على الخط يفوق نموذجًا فاته شيء بوضوح." },
          { en: "Treat the operator's observation as a genuine data point your model is missing — design a small pilot specifically at the time of day in question to test whether the concern holds up, before deciding either way.", ar: "التعامل مع ملاحظة المشغل كنقطة بيانات حقيقية يفتقدها نموذجك — تصميم تجربة صغيرة في الوقت المحدد من اليوم موضع النقاش لاختبار صحة القلق، قبل اتخاذ أي قرار." },
          { en: "Ask a different operator on a different shift what they think, and go with whichever opinion agrees with your original model.", ar: "سؤال مشغل آخر في وردية مختلفة عن رأيه، والأخذ بالرأي الذي يتفق مع نموذجك الأصلي." }
        ],
        bestIndex: 2
      },
      {
        question: {
          en: "You have an internal review in two days where you're expected to present results from a pilot. The trend looks promising, but the sample size is small enough that a statistician would call the result inconclusive. What do you do?",
          ar: "لديك مراجعة داخلية بعد يومين حيث يُتوقع منك تقديم نتائج تجربة. يبدو الاتجاه واعدًا، لكن حجم العينة صغير بما يكفي بحيث سيصف إحصائي النتيجة بأنها غير حاسمة. ماذا تفعل؟" },
        options: [
          { en: "Present it as a confirmed win to keep momentum and enthusiasm for the project going into the review.", ar: "تقديمها كنجاح مؤكد للحفاظ على الزخم والحماس للمشروع خلال المراجعة." },
          { en: "Present the promising trend clearly labeled as preliminary, state the sample-size limitation directly, and propose a specific next step to get a conclusive result — rather than either overstating it or hiding a genuinely interesting early signal.", ar: "تقديم الاتجاه الواعد مع وضع علامة واضحة عليه بأنه أولي، وذكر محدودية حجم العينة بوضوح، واقتراح خطوة تالية محددة للحصول على نتيجة حاسمة — بدلاً من المبالغة فيه أو إخفاء إشارة أولية مثيرة للاهتمام حقًا." },
          { en: "Leave the pilot out of the presentation entirely since it isn't statistically solid enough to stand behind yet.", ar: "استبعاد التجربة كليًا من العرض بما أنها ليست قوية إحصائيًا بما يكفي لتُقدَّم بعد." },
          { en: "Quietly run a few more trials before the review without telling anyone the original numbers were too thin to present as-is.", ar: "إجراء بضع تجارب إضافية بهدوء قبل المراجعة دون إخبار أحد بأن الأرقام الأصلية كانت ضعيفة جدًا لتُقدَّم كما هي." }
        ],
        bestIndex: 1
      }
    ]
  },
  {
    id: "qa",
    name: { en: "Quality Assurance", ar: "ضمان الجودة" },
    summary: {
      en: "QA is responsible for overseeing compliance, approving or rejecting batches and documentation, and upholding quality standards even against internal pressure. This role requires uncompromising integrity, the assertiveness to say 'no,' strong attention to detail, and the diplomacy to enforce standards without alienating other departments.",
      ar: "يتولى قسم ضمان الجودة الإشراف على الالتزام، والموافقة على التشغيلات والوثائق أو رفضها، والحفاظ على معايير الجودة حتى في مواجهة الضغوط الداخلية. تتطلب هذه الوظيفة نزاهة لا تقبل المساومة، والجرأة على قول 'لا'، واهتمامًا قويًا بالتفاصيل، ولباقة في فرض المعايير دون التسبب في إبعاد الأقسام الأخرى."
    },
    traits: [
      {
        name: { en: "Integrity & Ethical Judgment", ar: "النزاهة والحكم الأخلاقي" },
        definition: { en: "Makes the compliant decision even when it is costly or unpopular.", ar: "يتخذ القرار الملتزم بالمعايير حتى عندما يكون مكلفًا أو غير مرغوب فيه." },
        items: [
          { text: { en: "A minor documentation gap that clearly wouldn't affect patient safety is a reasonable candidate to let through with a note to fix it later.", ar: "الثغرة التوثيقية البسيطة التي من الواضح أنها لن تؤثر على سلامة المريض، مرشحة معقولة للسماح بمرورها مع ملاحظة لإصلاحها لاحقًا." }, reverse: true },
          { text: { en: "I hold the same standard for a batch from a department that's always been reliable as I would for one with a rockier history.", ar: "أُطبّق نفس المعيار على تشغيلة من قسم موثوق دائمًا كما أفعل مع قسم له سجل أكثر اضطرابًا." }, reverse: false },
          { text: { en: "Whether other departments will find a rejection reasonable is a legitimate factor to weigh alongside the strict requirements when I'm close to the line.", ar: "ما إذا كانت الأقسام الأخرى ستجد الرفض معقولاً هو عامل مشروع يُوزَن جنبًا إلى جنب مع المتطلبات الصارمة عندما أكون قريبًا من الحد." }, reverse: true },
          { text: { en: "I report an issue the same way regardless of whether the answer will be welcomed or resented by the people who asked.", ar: "أُبلغ عن مشكلة بنفس الطريقة بغض النظر عما إذا كانت الإجابة ستكون مرحبًا بها أم مستاءً منها من قِبل من طلبها." }, reverse: false }
        ]
      },
      {
        name: { en: "Assertiveness", ar: "الحزم" },
        definition: { en: "Is comfortable saying no or halting a process when standards aren't met.", ar: "يشعر بالارتياح لقول 'لا' أو إيقاف عملية عندما لا تُستوفى المعايير." },
        items: [
          { text: { en: "When a senior colleague is confident their approach is fine, it usually isn't worth the friction of pushing back unless I'm completely certain they're wrong.", ar: "عندما يكون زميل أعلى مرتبة واثقًا من أن أسلوبه سليم، غالبًا لا يستحق الأمر عناء المعارضة إلا إذا كنت متأكدًا تمامًا من خطئه." }, reverse: true },
          { text: { en: "I'd tell a senior colleague something doesn't meet requirements the same way I'd tell a junior one, even knowing it might be an uncomfortable conversation.", ar: "سأخبر زميلاً أعلى مرتبة أن شيئًا ما لا يستوفي المتطلبات بنفس الطريقة التي أخبر بها زميلاً أصغر، حتى مع علمي أنها قد تكون محادثة محرجة." }, reverse: false },
          { text: { en: "If I hold a position and face real pushback from multiple people, it's often a sign I should reconsider rather than dig in.", ar: "إذا تمسكت بموقف وواجهت معارضة حقيقية من عدة أشخاص، فهذا غالبًا إشارة إلى أنني يجب أن أعيد النظر بدلاً من التمسك به." }, reverse: true },
          { text: { en: "I'll say a process should stop even in a room where I'm the only one saying it.", ar: "سأقول إن العملية يجب أن تتوقف حتى في غرفة أكون فيها الشخص الوحيد الذي يقول ذلك." }, reverse: false }
        ]
      },
      {
        name: { en: "Attention to Detail", ar: "الانتباه للتفاصيل" },
        definition: { en: "Reviews documentation and records thoroughly enough to catch real issues.", ar: "يراجع الوثائق والسجلات بدقة كافية لاكتشاف المشكلات الحقيقية." },
        items: [
          { text: { en: "A batch record from a line with a strong recent track record can reasonably get a somewhat faster review than one from a line with recent issues.", ar: "سجل التشغيلة من خط له سجل حديث قوي يمكن أن يحصل بشكل معقول على مراجعة أسرع نوعًا ما من خط له مشكلات حديثة." }, reverse: true },
          { text: { en: "I cross-check figures across different sections of a record even when the summary page already looks internally consistent.", ar: "أُقارن الأرقام عبر أقسام مختلفة من السجل حتى عندما تبدو صفحة الملخص متسقة داخليًا بالفعل." }, reverse: false },
          { text: { en: "Comparing data across several linked documents for full consistency is often more thorough than a given batch actually calls for.", ar: "مقارنة البيانات عبر عدة مستندات مترابطة لضمان الاتساق الكامل غالبًا ما تكون أكثر تدقيقًا مما تستدعيه تشغيلة معينة فعليًا." }, reverse: true },
          { text: { en: "I read closely enough to catch an inconsistency between two sections of a record, not just whether each section looks fine on its own.", ar: "أقرأ بعناية كافية لاكتشاف تباين بين قسمين من السجل، وليس فقط ما إذا كان كل قسم يبدو سليمًا بحد ذاته." }, reverse: false }
        ]
      },
      {
        name: { en: "Communication & Diplomacy", ar: "التواصل واللباقة" },
        definition: { en: "Enforces standards while keeping working relationships constructive.", ar: "يفرض المعايير مع الحفاظ على علاقات عمل بنّاءة." },
        items: [
          { text: { en: "When I'm confident a rejection is correct, spending a lot of time softening how I deliver it can feel like an unnecessary use of time.", ar: "عندما أكون واثقًا من صحة الرفض، فإن قضاء وقت طويل في تلطيف طريقة إيصاله قد يبدو استخدامًا غير ضروري للوقت." }, reverse: true },
          { text: { en: "I can explain exactly why a review failed in a way the other department walks away from understanding, not just accepting.", ar: "أستطيع شرح سبب فشل المراجعة تحديدًا بطريقة يخرج منها القسم الآخر فاهمًا، لا مجرد متقبل." }, reverse: false },
          { text: { en: "After a firm disagreement with a colleague over a rejection, it's normal for the working relationship to stay somewhat strained afterward.", ar: "بعد خلاف حازم مع زميل حول رفض ما، من الطبيعي أن تبقى علاقة العمل متوترة نوعًا ما بعد ذلك." }, reverse: true },
          { text: { en: "I try to understand the other department's constraints before I explain why something didn't pass, even when I already know I'm not changing the outcome.", ar: "أحاول فهم قيود القسم الآخر قبل أن أشرح سبب عدم اجتياز شيء ما، حتى عندما أعلم بالفعل أنني لن أغيّر النتيجة." }, reverse: false }
        ]
      },
      {
        name: { en: "Objectivity / Independent Judgment", ar: "الموضوعية / الحكم المستقل" },
        definition: { en: "Evaluates evidence on its merits, resisting pressure to conform.", ar: "يُقيّم الأدلة بموضوعية، ويقاوم الضغوط للانصياع." },
        items: [
          { text: { en: "It's natural to give a colleague you work well with a bit more benefit of the doubt on an ambiguous record than you would a stranger.", ar: "من الطبيعي منح زميل تعمل معه بشكل جيد قدرًا أكبر من الاستفادة من الشك في سجل غامض مما تمنحه لشخص غريب." }, reverse: true },
          { text: { en: "I reach the same conclusion whether the request in front of me comes from someone junior or someone senior to me.", ar: "أصل إلى نفس الاستنتاج سواء كان الطلب أمامي صادرًا عن شخص أصغر مني أو أعلى مرتبة." }, reverse: false },
          { text: { en: "A request from someone whose judgment I generally trust deserves a somewhat lighter review than one from someone I'm less familiar with.", ar: "الطلب الصادر عن شخص أثق بحكمه عمومًا يستحق مراجعة أخف نوعًا ما من طلب صادر عن شخص أقل معرفة به." }, reverse: true },
          { text: { en: "I base my decision on what's actually documented in front of me, not on my prior impression of who submitted it.", ar: "أبني قراري على ما هو موثّق فعليًا أمامي، وليس على انطباعي المسبق عن الشخص الذي قدّمه." }, reverse: false }
        ]
      },
      {
        name: { en: "Decision Making", ar: "اتخاذ القرار" },
        definition: { en: "Makes and holds firm compliance calls quickly, without deferring under pressure.", ar: "يتخذ قرارات الامتثال ويثبت عليها بسرعة، دون التراجع تحت الضغط." },
        items: [
          { text: { en: "For an urgent batch decision, giving it one more night before committing rarely makes the decision meaningfully worse.", ar: "بالنسبة لقرار تشغيلة عاجل، فإن منحه ليلة إضافية قبل الالتزام به نادرًا ما يجعل القرار أسوأ بشكل ملموس." }, reverse: true },
          { text: { en: "Once I've reviewed the evidence for a rejection, I give the decision without waiting to see if the issue quietly resolves itself first.", ar: "بمجرد مراجعتي للأدلة الخاصة برفض ما، أُصدر القرار دون الانتظار لمعرفة ما إذا كانت المشكلة ستُحل من تلقاء نفسها أولاً." }, reverse: false },
          { text: { en: "If I expect real pushback from production on a rejection, it's reasonable to let a colleague take the lead on delivering that particular call.", ar: "إذا كنت أتوقع معارضة حقيقية من الإنتاج على قرار رفض، فمن المعقول ترك زميل يتولى إيصال هذا القرار بالذات." }, reverse: true },
          { text: { en: "I hold a rejection decision once made, even when the department affected keeps pushing back on it over the following days.", ar: "أتمسك بقرار الرفض بمجرد اتخاذه، حتى عندما يستمر القسم المتأثر في الاعتراض عليه في الأيام التالية." }, reverse: false }
        ]
      }
    ],
    sjts: [
      {
        question: {
          en: "A production manager under deadline pressure asks you to release a batch while a documentation discrepancy is still being resolved, promising to 'fix the paperwork later.' The discrepancy itself looks like it's probably just a transcription issue, not a true quality problem — but you haven't confirmed that yet.", 
          ar: "يطلب منك مدير الإنتاج، تحت ضغط الموعد النهائي، الإفراج عن تشغيلة بينما لا يزال يتم حل تباين في التوثيق، ويعدك بـ'تصحيح الأوراق لاحقًا'. يبدو التباين نفسه على الأرجح مجرد خطأ نسخ، لا مشكلة جودة حقيقية — لكنك لم تؤكد ذلك بعد." },
        options: [
          { en: "Release the batch since the discrepancy is probably harmless and the manager has been reliable in the past.", ar: "الإفراج عن التشغيلة بما أن التباين على الأرجح غير ضار والمدير كان موثوقًا في الماضي." },
          { en: "Hold the release until the discrepancy is actually investigated and confirmed to be what it appears to be, documenting the reason for the hold — 'probably fine' isn't the same as verified, and that gap is exactly what the release process exists to close.", ar: "تعليق الإفراج حتى يتم التحقيق في التباين فعليًا وتأكيد أنه ما يبدو عليه، مع توثيق سبب التعليق — فـ'على الأرجح سليم' ليست بديلاً عن التحقق، وهذه الفجوة بالذات هي ما تهدف عملية الإفراج إلى إغلاقها." },
          { en: "Release it, but have a colleague co-sign so the decision doesn't rest on you alone.", ar: "الإفراج عنها، لكن مع طلب توقيع مشترك من زميل حتى لا يقع القرار على عاتقك وحدك." },
          { en: "Tell the manager you'll decide by end of day, and quietly hope the discrepancy resolves itself before then so you don't have to make the call.", ar: "إخبار المدير أنك ستقرر بنهاية اليوم، والأمل بهدوء أن يُحل التباين من تلقاء نفسه قبل ذلك حتى لا تضطر لاتخاذ القرار." }
        ],
        bestIndex: 1
      },
      {
        question: {
          en: "You're reviewing a batch record the night before a regulatory audit. Two internal SOPs give you slightly conflicting guidance on how to classify a specific minor deviation, and there's no one from corporate quality available to ask before the audit starts tomorrow morning. What do you do?",
          ar: "تراجع سجل تشغيلة في الليلة التي تسبق تدقيقًا تنظيميًا. يمنحك إجراءان داخليان توجيهًا متعارضًا قليلاً حول كيفية تصنيف انحراف بسيط محدد، ولا يوجد أحد من قسم الجودة المركزي متاح للسؤال قبل بدء التدقيق صباح الغد. ماذا تفعل؟" },
        options: [
          { en: "Pick whichever classification is less work to document, since the audit is tomorrow and you need to move fast.", ar: "اختيار التصنيف الأقل عملاً في توثيقه، بما أن التدقيق غدًا وتحتاج إلى التحرك بسرعة." },
          { en: "Classify it under whichever SOP gives the more conservative (stricter) reading, document your reasoning and the conflict you found in writing, and flag the SOP conflict itself for correction after the audit.", ar: "تصنيفه وفق الإجراء الذي يعطي القراءة الأكثر تحفظًا (صرامة)، وتوثيق منطقك والتعارض الذي وجدته كتابيًا، والإشارة إلى التعارض بين الإجراءين نفسه لتصحيحه بعد التدقيق." },
          { en: "Leave the classification blank for now and plan to explain the ambiguity live to the auditor if it comes up.", ar: "ترك التصنيف فارغًا الآن والتخطيط لشرح الغموض مباشرة للمدقق إذا طُرح السؤال." },
          { en: "Reclassify it as something that doesn't require documentation at all, since neither SOP is completely clear anyway.", ar: "إعادة تصنيفه كشيء لا يتطلب توثيقًا إطلاقًا، بما أن أيًا من الإجراءين غير واضح تمامًا على أي حال." }
        ],
        bestIndex: 1
      },
      {
        question: {
          en: "A batch record error is traced back to a QA colleague you're personally close friends with outside of work. The error is real but minor, and similar errors from other people are usually handled with a documented coaching note rather than a formal write-up. What do you do?",
          ar: "يُعزى خطأ في سجل تشغيلة إلى زميل في ضمان الجودة أنت صديق مقرب له خارج العمل. الخطأ حقيقي لكنه بسيط، وعادةً ما تُعالج الأخطاء المشابهة من أشخاص آخرين بملاحظة توجيهية موثقة بدلاً من تقرير رسمي. ماذا تفعل؟" },
        options: [
          { en: "Handle it more informally than usual — a quiet word rather than any documentation — since you know your friend well and are confident it won't happen again.", ar: "التعامل معه بشكل غير رسمي أكثر من المعتاد — كلمة هادئة بدلاً من أي توثيق — لأنك تعرف صديقك جيدًا وواثق من أنه لن يتكرر." },
          { en: "Apply the exact same process you'd use for anyone else — the documented coaching note — and be upfront with your friend that you're treating it the standard way precisely because of the friendship, not despite it.", ar: "تطبيق نفس العملية بالضبط التي كنت ستطبقها على أي شخص آخر — الملاحظة التوجيهية الموثقة — والصراحة مع صديقك بأنك تعامل الأمر بالطريقة المعتادة تحديدًا بسبب الصداقة، لا رغمًا عنها." },
          { en: "Escalate it as a more serious formal write-up than usual, to make sure no one can later say you went easy on a friend.", ar: "تصعيده كتقرير رسمي أكثر جدية من المعتاد، للتأكد من ألا يقول أحد لاحقًا إنك تساهلت مع صديق." },
          { en: "Ask another QA colleague to handle this particular review instead, without explaining why, to keep yourself out of it entirely.", ar: "طلب من زميل آخر في ضمان الجودة تولي هذه المراجعة تحديدًا بدلاً منك، دون تفسير السبب، لإبعاد نفسك عن الأمر تمامًا." }
        ],
        bestIndex: 1
      }
    ]
  },
  {
    id: "rnd",
    name: { en: "Research & Development (R&D)", ar: "البحث والتطوير" },
    summary: {
      en: "R&D scientists develop new formulations and processes. The work is exploratory by nature, so it rewards intellectual curiosity, genuine creativity, tolerance for ambiguity and repeated failed experiments, and the analytical rigor to turn ideas into validated results.",
      ar: "يعمل علماء البحث والتطوير على تطوير تركيبات وعمليات جديدة. العمل استكشافي بطبيعته، لذا يكافئ الفضول الفكري، والإبداع الحقيقي، وتحمّل الغموض والتجارب الفاشلة المتكررة، والدقة التحليلية اللازمة لتحويل الأفكار إلى نتائج موثوقة."
    },
    traits: [
      {
        name: { en: "Intellectual Curiosity", ar: "الفضول الفكري" },
        definition: { en: "Is genuinely driven to understand why something works, not just that it works.", ar: "يسعى بصدق لفهم سبب نجاح شيء ما، وليس فقط معرفة أنه نجح." },
        items: [
          { text: { en: "Once a formulation passes its tests, understanding exactly why it works is more of a nice-to-have than something worth extra time.", ar: "بمجرد اجتياز التركيبة لاختباراتها، يصبح فهم سبب نجاحها بالضبط أمرًا جيدًا أن يُمتلك أكثر من كونه يستحق وقتًا إضافيًا." }, reverse: true },
          { text: { en: "I read new literature even on topics adjacent to my current project, not just what's directly required for it.", ar: "أطّلع على أبحاث جديدة حتى في مواضيع مجاورة لمشروعي الحالي، وليس فقط ما هو مطلوب مباشرة له." }, reverse: false },
          { text: { en: "Asking 'what if' about a formulation that's already working well can end up being more distracting than useful.", ar: "طرح سؤال 'ماذا لو' حول تركيبة تعمل بالفعل بشكل جيد قد ينتهي به الأمر أكثر تشتيتًا من كونه مفيدًا." }, reverse: true },
          { text: { en: "I want to understand the underlying mechanism well enough to predict how the formulation would behave in a scenario I haven't tested.", ar: "أرغب في فهم الآلية الكامنة بشكل كافٍ للتنبؤ بكيفية تصرف التركيبة في سيناريو لم أختبره." }, reverse: false }
        ]
      },
      {
        name: { en: "Creativity", ar: "الإبداع" },
        definition: { en: "Generates novel formulations or approaches rather than only replicating known ones.", ar: "يبتكر تركيبات أو أساليب جديدة بدلاً من الاكتفاء بتكرار المعروف منها." },
        items: [
          { text: { en: "A proven formulation approach is usually the safer starting point, and safer is often the right call in this field.", ar: "أسلوب التركيب المثبت يكون عادةً نقطة البداية الأكثر أمانًا، والأمان غالبًا هو الخيار الصحيح في هذا المجال." }, reverse: true },
          { text: { en: "I look outside my specific specialty for ideas that might transfer, even when it means reading into a field I don't know well.", ar: "أبحث خارج تخصصي المحدد عن أفكار قد تنتقل، حتى عندما يعني ذلك القراءة في مجال لا أعرفه جيدًا." }, reverse: false },
          { text: { en: "Proposing an approach that's never been tried carries a real risk of wasting the team's time, which is worth weighing seriously before suggesting it.", ar: "اقتراح أسلوب لم يُجرَّب من قبل يحمل مخاطرة حقيقية بإهدار وقت الفريق، وهو أمر يستحق موازنته بجدية قبل اقتراحه." }, reverse: true },
          { text: { en: "Colleagues would describe me as someone who proposes formulation approaches nobody else on the team had considered.", ar: "يصفني الزملاء بأنني شخص يقترح أساليب تركيب لم يفكر فيها أحد آخر في الفريق." }, reverse: false }
        ]
      },
      {
        name: { en: "Tolerance for Ambiguity & Failure", ar: "تحمّل الغموض والفشل" },
        definition: { en: "Stays motivated when experiments fail or the path forward is unclear.", ar: "يحافظ على حماسه عندما تفشل التجارب أو يكون المسار المستقبلي غير واضح." },
        items: [
          { text: { en: "After several failed attempts in a row, it's fair to start wondering whether the whole direction was wrong to begin with.", ar: "بعد عدة محاولات فاشلة متتالية، من العدل أن تبدأ في التساؤل عما إذا كان الاتجاه بأكمله خاطئًا من الأساس." }, reverse: true },
          { text: { en: "I can keep generating new hypotheses on a project whose direction has been unclear for weeks, without that uncertainty wearing me down.", ar: "أستطيع الاستمرار في توليد فرضيات جديدة في مشروع كان اتجاهه غير واضح لأسابيع، دون أن يُنهكني ذلك الغموض." }, reverse: false },
          { text: { en: "A failed experiment mostly tells you the approach didn't work, which is disappointing more than it is genuinely useful information.", ar: "التجربة الفاشلة تخبرك بشكل أساسي أن الأسلوب لم ينجح، وهو أمر مخيّب للآمال أكثر من كونه معلومة مفيدة حقًا." }, reverse: true },
          { text: { en: "I'm comfortable recommending a next step when the data only partially supports it, as long as I'm honest about what's still uncertain.", ar: "أشعر بالارتياح للتوصية بخطوة تالية عندما تدعمها البيانات جزئيًا فقط، طالما أنني صادق بشأن ما هو لا يزال غير مؤكد." }, reverse: false }
        ]
      },
      {
        name: { en: "Analytical Rigor", ar: "الدقة التحليلية" },
        definition: { en: "Designs and interprets experiments with methodological care.", ar: "يصمم التجارب ويفسرها بعناية منهجية." },
        items: [
          { text: { en: "A promising result that fits what I expected doesn't usually need the same level of verification as a surprising one.", ar: "النتيجة الواعدة التي تتوافق مع ما توقعته، لا تحتاج عادةً إلى نفس مستوى التحقق الذي تحتاجه نتيجة مفاجئة." }, reverse: true },
          { text: { en: "I design experiments to isolate one variable at a time even when a faster, messier test would probably get me a usable answer sooner.", ar: "أصمم التجارب لعزل متغير واحد في كل مرة حتى عندما يكون اختبار أسرع وأقل دقة سيمنحني على الأرجح إجابة قابلة للاستخدام بشكل أسرع." }, reverse: false },
          { text: { en: "Documenting the exact reasoning behind an experiment is less important than documenting the result, since the result is what people actually reference later.", ar: "توثيق المنطق الدقيق وراء تجربة ما أقل أهمية من توثيق النتيجة، لأن النتيجة هي ما يرجع إليه الناس فعليًا لاحقًا." }, reverse: true },
          { text: { en: "I re-check my statistical assumptions before drawing a conclusion, even on analyses I've run the same way many times before.", ar: "أتحقق مرة أخرى من افتراضاتي الإحصائية قبل استخلاص النتائج، حتى في التحليلات التي أجريتها بنفس الطريقة مرات عديدة من قبل." }, reverse: false }
        ]
      },
      {
        name: { en: "Persistence & Collaboration", ar: "المثابرة والتعاون" },
        definition: { en: "Keeps working a problem over time while integrating input from others.", ar: "يواصل العمل على مشكلة ما مع مرور الوقت مع دمج مدخلات الآخرين." },
        items: [
          { text: { en: "Once the initial excitement of a new project fades, it's natural for the day-to-day motivation to fade with it.", ar: "بمجرد تلاشي الحماس الأولي لمشروع جديد، من الطبيعي أن يتلاشى الحافز اليومي معه." }, reverse: true },
          { text: { en: "I actively ask colleagues to poke holes in my approach, rather than only sharing it once I'm confident it's solid.", ar: "أطلب بنشاط من الزملاء إيجاد ثغرات في أسلوبي، بدلاً من مشاركته فقط بعد أن أصبح واثقًا من متانته." }, reverse: false },
          { text: { en: "Reworking an approach based on someone else's feedback, especially late in a project, can feel like it undoes progress rather than building on it.", ar: "إعادة صياغة أسلوب بناءً على ملاحظات شخص آخر، خصوصًا في وقت متأخر من المشروع، قد تبدو وكأنها تُلغي التقدم المُحرز بدلاً من البناء عليه." }, reverse: true },
          { text: { en: "I keep pushing on a difficult formulation problem across months, even through stretches where nothing seems to be moving.", ar: "أواصل العمل على مشكلة تركيب صعبة عبر أشهر، حتى خلال فترات لا يبدو فيها أي تقدم." }, reverse: false }
        ]
      },
      {
        name: { en: "Independence", ar: "الاستقلالية" },
        definition: { en: "Forms and defends own scientific judgment, even without close supervision or when it conflicts with consensus.", ar: "يكوّن حكمه العلمي الخاص ويدافع عنه، حتى دون إشراف مباشر أو عندما يتعارض مع الإجماع." },
        items: [
          { text: { en: "Before committing to an unusual interpretation of my own data, it's generally wise to have a supervisor confirm it first.", ar: "قبل الالتزام بتفسير غير معتاد لبياناتي الخاصة، من الحكمة عمومًا أن يؤكده المشرف أولاً." }, reverse: true },
          { text: { en: "When my data points to a different conclusion than the team expects, I say so clearly, even before I've had a chance to fully rehearse how to present it.", ar: "عندما تشير بياناتي إلى استنتاج مختلف عمّا يتوقعه الفريق، أُعبّر عن ذلك بوضوح، حتى قبل أن تتاح لي فرصة التدرب الكامل على كيفية تقديمه." }, reverse: false },
          { text: { en: "Making a judgment call with no senior colleague around to sanity-check it makes me want to wait until someone is available, even if that means a delay.", ar: "اتخاذ قرار تقييمي دون وجود زميل أعلى مرتبة للتحقق من سلامته، يجعلني أرغب في الانتظار حتى يتوفر أحد، حتى لو عنى ذلك تأخيرًا." }, reverse: true },
          { text: { en: "I've pursued a line of experimentation my supervisor was openly skeptical about, because the early data was pointing somewhere I believed was worth following.", ar: "تابعت خط تجارب كان مشرفي متشككًا فيه علنًا، لأن البيانات المبكرة كانت تشير إلى اتجاه رأيت أنه يستحق المتابعة." }, reverse: false }
        ]
      }
    ],
    sjts: [
      {
        question: {
          en: "After several months, your lead formulation approach for a new product keeps failing a key stability test, while a promising but unconventional alternative has emerged from a side experiment that wasn't part of the original plan. What do you do?",
          ar: "بعد عدة أشهر، ما زال أسلوب التركيب الرئيسي لمنتج جديد يفشل في اختبار ثبات أساسي، بينما ظهر بديل واعد لكنه غير تقليدي من تجربة جانبية لم تكن جزءًا من الخطة الأصلية. ماذا تفعل؟" },
        options: [
          { en: "Keep pushing the original approach since it was the agreed plan and switching now might look like giving up too early.", ar: "الاستمرار في الأسلوب الأصلي لأنه كان الخطة المتفق عليها، والتحول الآن قد يبدو وكأنه استسلام مبكر جدًا." },
          { en: "Present both the failure data and the promising alternative to the team, with a clear-eyed account of how preliminary the alternative still is, and propose a data-driven path forward.", ar: "عرض بيانات الفشل والبديل الواعد على الفريق، مع سرد واضح لمدى أولية البديل حتى الآن، واقتراح مسار قائم على البيانات للمضي قدمًا." },
          { en: "Quietly switch your effort to the alternative without telling the team yet, planning to reveal it once you have stronger data.", ar: "التحول بهدوء إلى البديل دون إبلاغ الفريق بعد، مع التخطيط للكشف عنه بمجرد الحصول على بيانات أقوى." },
          { en: "Recommend abandoning the project, since the original approach failed and the alternative is still too unproven to commit to.", ar: "التوصية بالتخلي عن المشروع، بما أن الأسلوب الأصلي فشل والبديل لا يزال غير مثبت بما يكفي للالتزام به." }
        ],
        bestIndex: 1
      },
      {
        question: {
          en: "You're two days from an internal milestone review where you're expected to show progress. Your latest data shows a small, encouraging effect, but the sample size is too small to be conclusive, and getting a solid answer would take three more weeks you don't have before the review. What do you do?",
          ar: "أنت على بُعد يومين من مراجعة إنجاز داخلية يُتوقع منك خلالها إظهار تقدم. تُظهر بياناتك الأخيرة تأثيرًا صغيرًا ومشجعًا، لكن حجم العينة صغير جدًا بحيث لا يمكن اعتباره حاسمًا، والحصول على إجابة قوية سيستغرق ثلاثة أسابيع إضافية لا تملكها قبل المراجعة. ماذا تفعل؟" },
        options: [
          { en: "Present the effect as a validated finding, since three weeks isn't realistic before the review and the team needs to see progress.", ar: "تقديم التأثير كنتيجة مثبتة، بما أن ثلاثة أسابيع ليست واقعية قبل المراجعة والفريق بحاجة لرؤية تقدم." },
          { en: "Present it clearly as an early, encouraging signal with the sample-size caveat stated upfront, and propose the specific follow-up work needed to confirm it — treating the review as a checkpoint, not a finish line.", ar: "تقديمها بوضوح كإشارة مبكرة ومشجعة مع ذكر تحفظ حجم العينة صراحة منذ البداية، واقتراح العمل المتابع المحدد اللازم لتأكيدها — بمعاملة المراجعة كنقطة تفقّد، لا خط نهاية." },
          { en: "Leave this result out of the review entirely and present only fully confirmed findings from earlier work.", ar: "استبعاد هذه النتيجة كليًا من المراجعة وتقديم النتائج المؤكدة بالكامل من العمل السابق فقط." },
          { en: "Push the review to gather more data first, even though the schedule wasn't set by you and moving it will affect other people's plans.", ar: "تأجيل المراجعة لجمع مزيد من البيانات أولاً، حتى لو لم يكن الجدول الزمني من تحديدك وسيؤثر تأجيله على خطط أشخاص آخرين." }
        ],
        bestIndex: 1
      },
      {
        question: {
          en: "A formulation technique described in a well-cited paper hasn't worked in your hands after three careful attempts. Your team is starting to wonder, politely, if you're missing something in your execution. What do you do?",
          ar: "لم تنجح تقنية تركيب موصوفة في ورقة بحثية كثيرة الاستشهاد في يديك بعد ثلاث محاولات دقيقة. بدأ فريقك يتساءل، بلباقة، عما إذا كنت تفوّت شيئًا في تنفيذك. ماذا تفعل؟" },
        options: [
          { en: "Try a fourth time exactly as before, since the paper is well-established and the problem is more likely to be a small execution error than the method itself.", ar: "المحاولة رابعة بنفس الطريقة تمامًا، بما أن الورقة مثبتة جيدًا والمشكلة على الأرجح خطأ تنفيذي بسيط لا الطريقة نفسها." },
          { en: "Systematically vary the conditions the paper doesn't fully specify (reagent grade, timing, equipment differences) one at a time, documenting each, rather than either repeating blindly or assuming the paper must be flawed.", ar: "تنويع الظروف التي لا تحددها الورقة بالكامل (درجة نقاء الكواشف، التوقيت، اختلافات المعدات) واحدة تلو الأخرى بشكل منهجي، مع توثيق كل منها، بدلاً من التكرار بشكل أعمى أو افتراض أن الورقة بالضرورة معيبة." },
          { en: "Conclude the published method doesn't actually work as described and move on to a different approach entirely.", ar: "الاستنتاج بأن الطريقة المنشورة لا تعمل فعليًا كما هو موصوف، والانتقال إلى أسلوب مختلف تمامًا." },
          { en: "Ask a colleague to run it instead so the team can see the failure isn't about your technique specifically.", ar: "طلب من زميل تنفيذها بدلاً منك حتى يرى الفريق أن الفشل ليس متعلقًا بتقنيتك تحديدًا." }
        ],
        bestIndex: 1
      }
    ]
  }
];
