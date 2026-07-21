// Psychometric assessment data — bilingual (EN/AR).
// Each translatable field is an { en, ar } object, resolved at render
// time via t() from i18n.js. reverse-scoring flags are language-neutral.
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
          { text: { en: "When a measurement falls well within the acceptable range, I see no reason to re-check it.", ar: "عندما تكون القراءة ضمن النطاق المقبول بوضوح، لا أرى داعيًا لإعادة التحقق منها." }, reverse: true },
          { text: { en: "I tend to trust my initial observation more than re-examining the same data twice.", ar: "أميل إلى الثقة بملاحظتي الأولى أكثر من إعادة فحص نفس البيانات مرتين." }, reverse: true },
          { text: { en: "I believe that maintaining detailed records during a busy shift is more important than finishing slightly ahead of schedule.", ar: "أعتقد أن الاحتفاظ بسجلات مفصّلة أثناء وردية مزدحمة أهم من الانتهاء قبل الموعد المحدد بقليل." }, reverse: false },
          { text: { en: "If I notice a minor discrepancy that doesn't affect the final result, I usually let it go.", ar: "إذا لاحظت تباينًا بسيطًا لا يؤثر على النتيجة النهائية، فعادةً ما أتغاضى عنه." }, reverse: true }
        ]
      },
      {
        name: { en: "Rule Adherence (Strictness)", ar: "الالتزام بالقواعد (الصرامة)" },
        definition: { en: "Follows SOPs exactly, resists shortcuts, treats procedure as non-negotiable.", ar: "يتبع إجراءات التشغيل القياسية بدقة، ويقاوم الطرق المختصرة، ويتعامل مع الإجراء باعتباره غير قابل للتفاوض." },
        items: [
          { text: { en: "I believe a worker's practical judgment should sometimes override a written procedure if the situation calls for it.", ar: "أعتقد أن الحكم العملي للعامل ينبغي أحيانًا أن يتجاوز الإجراء المكتوب إذا اقتضى الموقف ذلك." }, reverse: true },
          { text: { en: "I feel more productive when I'm allowed to improvise rather than follow a step-by-step checklist.", ar: "أشعر بإنتاجية أكبر عندما يُسمح لي بالارتجال بدلاً من اتباع قائمة تحقق خطوة بخطوة." }, reverse: true },
          { text: { en: "It bothers me when a procedure requires a step that seems to have no clear purpose.", ar: "يزعجني عندما يتطلب الإجراء خطوة تبدو بلا غرض واضح." }, reverse: true },
          { text: { en: "I would rather work in an environment where procedures are flexible enough to adapt to real-time conditions.", ar: "أفضّل العمل في بيئة تكون فيها الإجراءات مرنة بما يكفي للتكيف مع الظروف الآنية." }, reverse: true }
        ]
      },
      {
        name: { en: "Integrity & Honesty", ar: "النزاهة والأمانة" },
        definition: { en: "Reports results accurately even when inconvenient or under social pressure.", ar: "يُبلغ عن النتائج بدقة حتى عندما يكون ذلك غير مريح أو تحت ضغط اجتماعي." },
        items: [
          { text: { en: "If a result is very close to the limit but still technically within range, there's little harm in not flagging it.", ar: "إذا كانت النتيجة قريبة جدًا من الحد لكنها لا تزال ضمن النطاق فنيًا، فلا ضرر كبيرًا في عدم الإشارة إليها." }, reverse: true },
          { text: { en: "I believe that reporting every minor error, even small ones, creates unnecessary delays for the team.", ar: "أعتقد أن الإبلاغ عن كل خطأ، حتى الصغير منه، يخلق تأخيرات غير ضرورية للفريق." }, reverse: true },
          { text: { en: "I would feel it was my responsibility to ensure production targets are met, even if it means handling borderline results with some flexibility.", ar: "أشعر أن من مسؤوليتي ضمان تحقيق أهداف الإنتاج، حتى لو تطلّب ذلك التعامل مع النتائج الحدّية بشيء من المرونة." }, reverse: true },
          { text: { en: "When I discover I made a small error in a report, I prefer to correct it quietly rather than making it a formal issue.", ar: "عندما أكتشف أنني ارتكبت خطأ صغيرًا في تقرير ما، أفضّل تصحيحه بهدوء بدلاً من تحويله إلى قضية رسمية." }, reverse: true }
        ]
      },
      {
        name: { en: "Vigilance Under Time Pressure", ar: "اليقظة تحت ضغط الوقت" },
        definition: { en: "Sustains accuracy and focus despite line speed, repetition, and noise.", ar: "يحافظ على الدقة والتركيز رغم سرعة خط الإنتاج والتكرار والضوضاء." },
        items: [
          { text: { en: "I naturally work more carefully when there is less time pressure and can afford to slow down.", ar: "أعمل بحرص أكبر بشكل طبيعي عندما يكون ضغط الوقت أقل ويمكنني التمهّل." }, reverse: true },
          { text: { en: "Repetitive work tends to make me less alert over time, especially toward the end of a shift.", ar: "يميل العمل المتكرر إلى جعلي أقل تيقظًا مع مرور الوقت، خاصة قرب نهاية الوردية." }, reverse: true },
          { text: { en: "I believe it's normal for attention to slip when the work pace increases.", ar: "أعتقد أنه من الطبيعي أن يتراجع الانتباه عندما تزداد وتيرة العمل." }, reverse: true },
          { text: { en: "I prefer tasks that vary frequently rather than doing the same type of check repeatedly for hours.", ar: "أفضّل المهام التي تتنوع باستمرار بدلاً من إجراء نفس نوع الفحص بشكل متكرر لساعات." }, reverse: true }
        ]
      },
      {
        name: { en: "Emotional Stability", ar: "الاتزان الانفعالي" },
        definition: { en: "Stays composed when a deviation is found or when challenged about a result.", ar: "يحافظ على هدوئه عند اكتشاف انحراف أو عند التشكيك في نتيجة ما." },
        items: [
          { text: { en: "When something goes wrong on the line, I tend to feel a strong sense of personal responsibility that makes it hard to stay calm.", ar: "عندما يحدث خطأ ما في خط الإنتاج، أميل إلى الشعور بمسؤولية شخصية قوية تجعل من الصعب أن أبقى هادئًا." }, reverse: true },
          { text: { en: "I find it easier to move on from a stressful shift if I don't dwell on what went wrong.", ar: "أجد أنه من الأسهل تجاوز وردية مرهقة إذا لم أفكر مليًا فيما حدث خطأ." }, reverse: true },
          { text: { en: "I believe that staying calm in a crisis is more about experience than personality.", ar: "أعتقد أن الهدوء في الأزمات مرتبط بالخبرة أكثر من ارتباطه بالشخصية." }, reverse: true },
          { text: { en: "When someone questions my work, I take it as a sign that I need to be more careful next time rather than getting upset.", ar: "عندما يشكك أحدهم في عملي، أتعامل مع الأمر كإشارة إلى ضرورة توخي مزيد من الحذر في المرة القادمة بدلاً من الانزعاج." }, reverse: false }
        ]
      }
    ],
    sjt: {
      question: {
        en: "It is 2 a.m. on a night shift. You find that a batch parameter is borderline out-of-specification. The line supervisor, worried about the schedule, asks you to record it as a 'pass' so the line does not stop. What do you do?",
        ar: "الساعة الثانية صباحًا في وردية ليلية. تكتشف أن أحد معايير التشغيلة قريب من الحد الخارج عن المواصفات. يطلب منك مشرف الخط، القلق بشأن الجدول الزمني، تسجيلها كـ'ناجحة' حتى لا يتوقف الخط. ماذا تفعل؟"
      },
      options: [
        { en: "Record it as a pass since the supervisor asked, to avoid conflict.", ar: "تسجيلها كناجحة بناءً على طلب المشرف، تجنبًا للخلاف." },
        { en: "Record the true result, follow the deviation/escalation procedure, and notify QA regardless of the pressure.", ar: "تسجيل النتيجة الحقيقية، واتباع إجراء الانحراف/التصعيد، وإبلاغ قسم ضمان الجودة بغض النظر عن الضغط." },
        { en: "Re-test repeatedly until a passing result appears.", ar: "إعادة الاختبار بشكل متكرر حتى تظهر نتيجة ناجحة." },
        { en: "Ignore the reading and move on to the next unit.", ar: "تجاهل القراءة والانتقال إلى الوحدة التالية." }
      ],
      bestIndex: 1
    }
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
          { text: { en: "Minor formatting or transcription errors in a large dataset are usually easy to overlook.", ar: "من السهل عادةً تجاهل أخطاء التنسيق أو النسخ الطفيفة في مجموعة بيانات كبيرة." }, reverse: true },
          { text: { en: "If the final conclusion of a report is correct, small inconsistencies in the raw data don't matter much.", ar: "إذا كانت الخلاصة النهائية للتقرير صحيحة، فإن التباينات الصغيرة في البيانات الخام لا تهم كثيرًا." }, reverse: true },
          { text: { en: "I usually only notice a trend if it is very obvious or points directly to a problem.", ar: "عادةً ما ألاحظ الاتجاه فقط إذا كان واضحًا جدًا أو يشير مباشرة إلى مشكلة." }, reverse: true },
          { text: { en: "Reviewing my own calculations twice feels like a waste of time if I was careful the first time.", ar: "مراجعة حساباتي مرتين تبدو مضيعة للوقت إذا كنت حريصًا في المرة الأولى." }, reverse: true }
        ]
      },
      {
        name: { en: "Patience & Long-Term Focus", ar: "الصبر والتركيز طويل الأمد" },
        definition: { en: "Stays engaged and motivated on studies that take months to conclude.", ar: "يظل منخرطًا ومتحمسًا في الدراسات التي تستغرق أشهرًا لإنجازها." },
        items: [
          { text: { en: "I find long-term projects frustrating when I don't see immediate results or progress.", ar: "أجد المشاريع طويلة الأمد محبطة عندما لا أرى نتائج أو تقدمًا فوريًا." }, reverse: true },
          { text: { en: "Working on a task whose outcome will only be known months later makes it hard to stay motivated.", ar: "العمل على مهمة لن تُعرف نتيجتها إلا بعد أشهر يجعل الحفاظ على الحماس أمرًا صعبًا." }, reverse: true },
          { text: { en: "I prefer projects that have a clear beginning, middle, and end within a few weeks.", ar: "أفضّل المشاريع التي لها بداية ووسط ونهاية واضحة خلال أسابيع قليلة." }, reverse: true },
          { text: { en: "I tend to lose focus on studies that run for a long time without obvious milestones.", ar: "أميل إلى فقدان التركيز في الدراسات التي تستمر لفترة طويلة دون معالم واضحة." }, reverse: true }
        ]
      },
      {
        name: { en: "Emotional Stability / Calmness", ar: "الاتزان الانفعالي / الهدوء" },
        definition: { en: "Works steadily without being rattled by unexpected results or delays.", ar: "يعمل بثبات دون أن تربكه النتائج غير المتوقعة أو التأخيرات." },
        items: [
          { text: { en: "Delays in a study schedule make me noticeably tense or irritable.", ar: "تجعلني التأخيرات في الجدول الزمني للدراسة متوترًا أو سريع الانفعال بشكل ملحوظ." }, reverse: true },
          { text: { en: "When a method fails on the first attempt, I often feel discouraged or anxious.", ar: "عندما تفشل طريقة ما في المحاولة الأولى، أشعر غالبًا بالإحباط أو القلق." }, reverse: true },
          { text: { en: "Unexpected results tend to throw me off track and make it hard to focus.", ar: "تميل النتائج غير المتوقعة إلى إخراجي عن مساري وتجعل التركيز صعبًا." }, reverse: true },
          { text: { en: "I approach problems calmly rather than reacting emotionally.", ar: "أتعامل مع المشكلات بهدوء بدلاً من التفاعل معها بشكل انفعالي." }, reverse: false }
        ]
      },
      {
        name: { en: "Systematic / Analytical Thinking", ar: "التفكير المنهجي / التحليلي" },
        definition: { en: "Designs and troubleshoots methods logically, step by step.", ar: "يصمم الطرق ويعالج مشكلاتها بشكل منطقي، خطوة بخطوة." },
        items: [
          { text: { en: "I often rely on trial and error to troubleshoot a problem rather than planning out a step-by-step approach.", ar: "أعتمد غالبًا على المحاولة والخطأ لحل المشكلات بدلاً من التخطيط لنهج منظم خطوة بخطوة." }, reverse: true },
          { text: { en: "I find it tedious to isolate one variable at a time when testing a new method.", ar: "أجد أنه من الممل عزل متغير واحد في كل مرة عند اختبار طريقة جديدة." }, reverse: true },
          { text: { en: "I sometimes jump to conclusions about why an experiment failed before checking all the data.", ar: "أستنتج أحيانًا سبب فشل التجربة قبل التحقق من جميع البيانات." }, reverse: true },
          { text: { en: "I enjoy work that requires structured, logical reasoning.", ar: "أستمتع بالعمل الذي يتطلب تفكيرًا منطقيًا ومنظمًا." }, reverse: false }
        ]
      },
      {
        name: { en: "Documentation Discipline", ar: "الانضباط في التوثيق" },
        definition: { en: "Maintains precise, audit-ready records and protocols.", ar: "يحافظ على سجلات وبروتوكولات دقيقة وجاهزة للتدقيق." },
        items: [
          { text: { en: "It is acceptable to leave documentation for later if it means focusing on the immediate task at hand.", ar: "من المقبول تأجيل التوثيق لوقت لاحق إذا كان ذلك يعني التركيز على المهمة الفورية." }, reverse: true },
          { text: { en: "If a deviation is very minor, it usually isn't worth the time to write it down formally.", ar: "إذا كان الانحراف طفيفًا جدًا، فعادةً لا يستحق الوقت اللازم لتوثيقه رسميًا." }, reverse: true },
          { text: { en: "I find keeping thorough, well-organized records to be a tedious and unnecessary burden.", ar: "أجد أن الاحتفاظ بسجلات شاملة ومنظمة جيدًا عبء مملّ وغير ضروري." }, reverse: true },
          { text: { en: "My protocols and raw data are always ready to withstand an audit.", ar: "بروتوكولاتي وبياناتي الخام جاهزة دائمًا لتحمّل أي عملية تدقيق." }, reverse: false }
        ]
      }
    ],
    sjt: {
      question: {
        en: "A stability sample at the 12-month interval shows a result trending toward the specification limit, though still within range. The study is not due for formal review for another two months. What do you do?",
        ar: "تُظهر عينة ثبات عند الفاصل الزمني البالغ 12 شهرًا نتيجة تتجه نحو حد المواصفات، رغم أنها لا تزال ضمن النطاق. لا يُستحق إجراء المراجعة الرسمية للدراسة إلا بعد شهرين آخرين. ماذا تفعل؟"
      },
      options: [
        { en: "Wait until the scheduled review since the result is technically still in range.", ar: "الانتظار حتى موعد المراجعة المقررة لأن النتيجة لا تزال ضمن النطاق فنيًا." },
        { en: "Flag the trend now, document it, and inform your supervisor/QA so it can be evaluated proactively.", ar: "الإشارة إلى الاتجاه الآن وتوثيقه وإبلاغ المشرف/قسم ضمان الجودة حتى يتم تقييمه بشكل استباقي." },
        { en: "Re-test the sample repeatedly until the trend disappears.", ar: "إعادة اختبار العينة بشكل متكرر حتى يختفي الاتجاه." },
        { en: "Adjust the specification limit slightly so the trend looks less concerning.", ar: "تعديل حد المواصفات قليلاً لجعل الاتجاه يبدو أقل إثارة للقلق." }
      ],
      bestIndex: 1
    }
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
          { text: { en: "I sometimes skip a minor visual check when I'm in a hurry to finish a task.", ar: "أتجاوز أحيانًا فحصًا بصريًا بسيطًا عندما أكون مستعجلًا لإنهاء مهمة ما." }, reverse: true },
          { text: { en: "If a colony looks mostly normal, I don't usually bother examining it closely for subtle abnormalities.", ar: "إذا بدت المستعمرة طبيعية في معظمها، فلا أكلّف نفسي عادةً بفحصها عن قرب بحثًا عن أي شذوذ دقيق." }, reverse: true },
          { text: { en: "I tend to assume incubation times and temperatures are correct rather than double-checking them.", ar: "أميل إلى افتراض صحة أوقات ودرجات حرارة الحضانة بدلاً من التحقق منها مرة أخرى." }, reverse: true },
          { text: { en: "I carefully compare current results with historical trends before concluding.", ar: "أقارن بعناية النتائج الحالية بالاتجاهات التاريخية قبل استخلاص النتائج." }, reverse: false }
        ]
      },
      {
        name: { en: "Aseptic Discipline & Orderliness", ar: "الانضباط في التعقيم والترتيب" },
        definition: { en: "Maintains rigorous cleanliness and technique without exception.", ar: "يحافظ على نظافة وتقنية صارمة دون استثناء." },
        items: [
          { text: { en: "I occasionally cut a corner in my technique when no one is watching.", ar: "أختصر أحيانًا في تقنيتي عندما لا يراقبني أحد." }, reverse: true },
          { text: { en: "If I'm not sure a surface or tool has been properly sanitized, I usually proceed anyway rather than delaying my work.", ar: "إذا لم أكن متأكدًا من أن سطحًا أو أداة قد تم تعقيمها بشكل صحيح، فعادةً ما أتابع العمل بدلاً من تأخيره." }, reverse: true },
          { text: { en: "I find keeping my bench and equipment meticulously organized to be a waste of time.", ar: "أجد أن الحفاظ على منضدة عملي ومعداتي منظمة بدقة مضيعة للوقت." }, reverse: true },
          { text: { en: "I follow gowning and aseptic procedures exactly, every time, without exception.", ar: "أتبع إجراءات ارتداء الملابس الواقية والتعقيم بدقة في كل مرة، دون استثناء." }, reverse: false }
        ]
      },
      {
        name: { en: "Patience", ar: "الصبر" },
        definition: { en: "Manages multi-day incubation and waiting periods without losing rigor.", ar: "يدير فترات الحضانة والانتظار الممتدة لعدة أيام دون فقدان الدقة." },
        items: [
          { text: { en: "Long waiting periods without a result make me want to rush the next step.", ar: "فترات الانتظار الطويلة دون نتيجة تجعلني أرغب في التسرع في الخطوة التالية." }, reverse: true },
          { text: { en: "I find it hard to stay just as careful on day five of monitoring as I am on day one.", ar: "أجد صعوبة في البقاء حريصًا في اليوم الخامس من المراقبة كما كنت في اليوم الأول." }, reverse: true },
          { text: { en: "I prefer work that provides immediate results over work that unfolds slowly over several days.", ar: "أفضّل العمل الذي يعطي نتائج فورية على العمل الذي يتكشف ببطء على مدى عدة أيام." }, reverse: true },
          { text: { en: "I don't mind waiting several days for incubation results before drawing conclusions.", ar: "لا أمانع الانتظار عدة أيام للحصول على نتائج الحضانة قبل استخلاص النتائج." }, reverse: false }
        ]
      },
      {
        name: { en: "Calmness", ar: "الهدوء" },
        definition: { en: "Remains composed and methodical, especially when results suggest contamination.", ar: "يظل هادئًا ومنهجيًا، خاصة عندما تشير النتائج إلى وجود تلوث." },
        items: [
          { text: { en: "An unexpected positive result makes me anxious and quick to react.", ar: "تجعلني النتيجة الإيجابية غير المتوقعة قلقًا وسريع رد الفعل." }, reverse: true },
          { text: { en: "When I suspect contamination, I tend to panic rather than investigate methodically.", ar: "عندما أشك في وجود تلوث، أميل إلى الذعر بدلاً من التحقيق بشكل منهجي." }, reverse: true },
          { text: { en: "I find it difficult to stay steady and focused when the stakes of a result are high.", ar: "أجد صعوبة في البقاء ثابتًا ومركّزًا عندما تكون أهمية النتيجة كبيرة." }, reverse: true },
          { text: { en: "I handle ambiguous or borderline results without becoming stressed.", ar: "أتعامل مع النتائج الغامضة أو الحدّية دون أن أشعر بالتوتر." }, reverse: false }
        ]
      },
      {
        name: { en: "Contamination Risk Awareness", ar: "الوعي بمخاطر التلوث" },
        definition: { en: "Actively anticipates and prevents sources of cross-contamination.", ar: "يتوقع بنشاط مصادر التلوث المتبادل ويمنعها." },
        items: [
          { text: { en: "I sometimes assume a sample is fine without checking for cross-contamination risk.", ar: "أفترض أحيانًا أن العينة سليمة دون التحقق من خطر التلوث المتبادل." }, reverse: true },
          { text: { en: "I tend to think about contamination prevention only after a problem has occurred, rather than proactively.", ar: "أميل إلى التفكير في منع التلوث فقط بعد حدوث المشكلة، وليس بشكل استباقي." }, reverse: true },
          { text: { en: "If a potential contamination source seems minor, I usually don't bother flagging it.", ar: "إذا بدا مصدر التلوث المحتمل بسيطًا، فعادةً لا أكلّف نفسي بالإبلاغ عنه." }, reverse: true },
          { text: { en: "I treat every sample as if contamination risk is real, not just theoretical.", ar: "أتعامل مع كل عينة وكأن خطر التلوث حقيقي وليس نظريًا فقط." }, reverse: false }
        ]
      }
    ],
    sjt: {
      question: {
        en: "During a routine environmental monitoring round, you notice a colleague did not fully follow the gowning procedure before entering the clean area, but no obvious problem resulted. What do you do?",
        ar: "أثناء جولة روتينية للمراقبة البيئية، تلاحظ أن زميلًا لم يتبع بالكامل إجراء ارتداء الملابس الواقية قبل دخول المنطقة النظيفة، لكن لم تنتج أي مشكلة واضحة. ماذا تفعل؟"
      },
      options: [
        { en: "Say nothing since nothing bad happened this time.", ar: "عدم قول أي شيء لأنه لم يحدث أي ضرر هذه المرة." },
        { en: "Raise it with the colleague and, per protocol, report it so the deviation is documented and addressed.", ar: "مناقشة الأمر مع الزميل، والإبلاغ عنه وفق البروتوكول حتى يتم توثيق الانحراف ومعالجته." },
        { en: "Mention it informally to a friend but not to the colleague or supervisor.", ar: "ذكر الأمر بشكل غير رسمي لصديق دون إبلاغ الزميل أو المشرف." },
        { en: "Wait to see if it happens again before doing anything.", ar: "الانتظار لمعرفة ما إذا كان الأمر سيتكرر قبل اتخاذ أي إجراء." }
      ],
      bestIndex: 1
    }
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
          { text: { en: "I sometimes prefer to work alone rather than coordinate with the team.", ar: "أفضّل أحيانًا العمل بمفردي بدلاً من التنسيق مع الفريق." }, reverse: true },
          { text: { en: "I usually wait for a teammate to ask for help rather than offering it when they are struggling.", ar: "عادةً ما أنتظر أن يطلب زميل الفريق المساعدة بدلاً من تقديمها عندما يواجه صعوبة." }, reverse: true },
          { text: { en: "I find writing clear shift handover notes to be a tedious task that isn't really my responsibility.", ar: "أجد أن كتابة ملاحظات تسليم الوردية بوضوح مهمة مملة وليست من مسؤوليتي الحقيقية." }, reverse: true },
          { text: { en: "I speak up early if I see a teammate struggling, rather than letting it become a bigger problem.", ar: "أتحدث مبكرًا إذا رأيت زميلًا في الفريق يواجه صعوبة، بدلاً من ترك الأمر يتفاقم." }, reverse: false }
        ]
      },
      {
        name: { en: "Stamina & Resilience", ar: "التحمل والمرونة" },
        definition: { en: "Sustains performance and mood across long or physically demanding shifts.", ar: "يحافظ على أدائه ومزاجه خلال الورديات الطويلة أو الشاقة جسديًا." },
        items: [
          { text: { en: "Physically demanding tasks wear me down faster than most people.", ar: "تُنهكني المهام الشاقة جسديًا بشكل أسرع من معظم الناس." }, reverse: true },
          { text: { en: "I find it hard to maintain the same energy and focus near the end of a long shift.", ar: "أجد صعوبة في الحفاظ على نفس مستوى الطاقة والتركيز قرب نهاية وردية طويلة." }, reverse: true },
          { text: { en: "It takes me a long time to recover after a physically or mentally tiring day.", ar: "يستغرق تعافيّ وقتًا طويلاً بعد يوم مرهق جسديًا أو ذهنيًا." }, reverse: true },
          { text: { en: "I can stay productive through repetitive, physically active work.", ar: "أستطيع الحفاظ على إنتاجيتي خلال العمل المتكرر والنشط جسديًا." }, reverse: false }
        ]
      },
      {
        name: { en: "SOP / Rule Adherence", ar: "الالتزام بإجراءات التشغيل القياسية" },
        definition: { en: "Follows manufacturing and hygiene procedures consistently.", ar: "يتبع إجراءات التصنيع والنظافة باستمرار." },
        items: [
          { text: { en: "I sometimes adjust a procedure on my own if I think it will save time.", ar: "أُعدّل أحيانًا إجراءً من تلقاء نفسي إذا اعتقدت أن ذلك سيوفر الوقت." }, reverse: true },
          { text: { en: "I only complete required checks and sign-offs when I know a supervisor is watching.", ar: "أُكمل الفحوصات والتوقيعات المطلوبة فقط عندما أعلم أن المشرف يراقب." }, reverse: true },
          { text: { en: "I believe that following documented steps is often more restrictive than protective.", ar: "أعتقد أن اتباع الخطوات الموثقة غالبًا ما يكون مقيدًا أكثر منه وقائيًا." }, reverse: true },
          { text: { en: "I follow the standard operating procedure precisely, even under time pressure.", ar: "أتبع إجراء التشغيل القياسي بدقة، حتى تحت ضغط الوقت." }, reverse: false }
        ]
      },
      {
        name: { en: "Safety Consciousness", ar: "الوعي بالسلامة" },
        definition: { en: "Prioritizes safe behavior for self and colleagues, even under deadline pressure.", ar: "يُعطي الأولوية للسلوك الآمن لنفسه ولزملائه، حتى تحت ضغط المواعيد النهائية." },
        items: [
          { text: { en: "I have sometimes skipped a safety step to save a few minutes.", ar: "تجاوزت أحيانًا خطوة سلامة لتوفير بضع دقائق." }, reverse: true },
          { text: { en: "I tend to notice unsafe conditions but assume someone else will handle them.", ar: "ألاحظ الظروف غير الآمنة لكنني أفترض أن شخصًا آخر سيتعامل معها." }, reverse: true },
          { text: { en: "I don't always wear required protective equipment for a 'quick' task if I'm in a hurry.", ar: "لا أرتدي دائمًا معدات الحماية المطلوبة لمهمة 'سريعة' إذا كنت مستعجلًا." }, reverse: true },
          { text: { en: "I think about safety risks before starting any task.", ar: "أفكر في مخاطر السلامة قبل البدء بأي مهمة." }, reverse: false }
        ]
      },
      {
        name: { en: "Adaptability Under Pressure", ar: "القدرة على التكيف تحت الضغط" },
        definition: { en: "Adjusts calmly when equipment issues or schedule changes occur.", ar: "يتكيف بهدوء عند حدوث مشكلات في المعدات أو تغييرات في الجدول الزمني." },
        items: [
          { text: { en: "Sudden schedule changes throw me off more than they should.", ar: "تُربكني التغييرات المفاجئة في الجدول الزمني أكثر مما ينبغي." }, reverse: true },
          { text: { en: "When equipment breaks down mid-shift, I tend to panic rather than adjusting my approach.", ar: "عندما تتعطل المعدات في منتصف الوردية، أميل إلى الذعر بدلاً من تعديل أسلوبي." }, reverse: true },
          { text: { en: "I find it difficult to switch between tasks smoothly when the line requires it.", ar: "أجد صعوبة في التنقل بسلاسة بين المهام عندما يتطلب خط الإنتاج ذلك." }, reverse: true },
          { text: { en: "I stay productive even when priorities shift during a shift.", ar: "أظل منتجًا حتى عندما تتغير الأولويات أثناء الوردية." }, reverse: false }
        ]
      }
    ],
    sjt: {
      question: {
        en: "Midway through a shift, a machine starts producing units that look slightly different from the standard, but stopping the line will hurt the day's output target. What do you do?",
        ar: "في منتصف الوردية، تبدأ إحدى الآلات في إنتاج وحدات تبدو مختلفة قليلاً عن المعيار، لكن إيقاف الخط سيؤثر على هدف الإنتاج اليومي. ماذا تفعل؟"
      },
      options: [
        { en: "Keep running the line since the difference looks minor and the target matters.", ar: "الاستمرار في تشغيل الخط لأن الفرق يبدو بسيطًا والهدف مهم." },
        { en: "Stop or flag the line per procedure and alert your supervisor/QC so the issue is properly assessed.", ar: "إيقاف الخط أو الإشارة إليه وفق الإجراء، وتنبيه المشرف/مراقبة الجودة حتى يتم تقييم المشكلة بشكل صحيح." },
        { en: "Quietly separate the odd units yourself without telling anyone.", ar: "فصل الوحدات غير المعتادة بنفسك بهدوء دون إخبار أحد." },
        { en: "Speed up the line to make up for time you expect to lose later.", ar: "تسريع الخط لتعويض الوقت الذي تتوقع خسارته لاحقًا." }
      ],
      bestIndex: 1
    }
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
          { text: { en: "I sometimes focus on one part of a process without considering the whole system.", ar: "أُركّز أحيانًا على جزء واحد من العملية دون النظر إلى النظام بأكمله." }, reverse: true },
          { text: { en: "I find it tedious to break a complex process into its component parts.", ar: "أجد أنه من الممل تفكيك عملية معقدة إلى مكوناتها." }, reverse: true },
          { text: { en: "I tend to address the symptoms of a recurring problem rather than trying to identify the root cause.", ar: "أميل إلى معالجة أعراض المشكلة المتكررة بدلاً من محاولة تحديد السبب الجذري." }, reverse: true },
          { text: { en: "I naturally think about how a change in one step will affect the steps downstream.", ar: "أفكر بشكل طبيعي في كيفية تأثير تغيير خطوة معينة على الخطوات التالية." }, reverse: false }
        ]
      },
      {
        name: { en: "Innovation & Creativity", ar: "الابتكار والإبداع" },
        definition: { en: "Generates genuinely new approaches rather than only incremental tweaks.", ar: "يبتكر أساليب جديدة حقًا وليس مجرد تعديلات طفيفة." },
        items: [
          { text: { en: "I tend to prefer the safest, most familiar option even when a better one might exist.", ar: "أميل إلى تفضيل الخيار الأكثر أمانًا وألفة حتى عندما يكون هناك خيار أفضل." }, reverse: true },
          { text: { en: "I prefer to stick to 'how it's always been done' rather than proposing new ways of doing things.", ar: "أفضّل الالتزام بـ'الطريقة المعتادة' بدلاً من اقتراح طرق جديدة لأداء الأمور." }, reverse: true },
          { text: { en: "I find experimenting with unconventional solutions to be risky and unnecessary.", ar: "أجد أن تجربة الحلول غير التقليدية أمر محفوف بالمخاطر وغير ضروري." }, reverse: true },
          { text: { en: "Colleagues would describe me as someone who comes up with original ideas.", ar: "يصفني الزملاء بأنني شخص يأتي بأفكار أصيلة." }, reverse: false }
        ]
      },
      {
        name: { en: "Persistence in Problem-Solving", ar: "المثابرة في حل المشكلات" },
        definition: { en: "Keeps iterating on a problem despite early failures or dead ends.", ar: "يواصل تكرار المحاولة على مشكلة ما رغم الإخفاقات المبكرة أو الطرق المسدودة." },
        items: [
          { text: { en: "I tend to give up on a difficult improvement project if it doesn't work quickly.", ar: "أميل إلى التخلي عن مشروع تحسين صعب إذا لم ينجح بسرعة." }, reverse: true },
          { text: { en: "Setbacks make me discouraged rather than determined.", ar: "تجعلني النكسات محبطًا بدلاً من أن تزيد من عزيمتي." }, reverse: true },
          { text: { en: "I see a failed pilot test as a waste of time rather than useful information.", ar: "أرى الاختبار التجريبي الفاشل مضيعة للوقت بدلاً من كونه معلومة مفيدة." }, reverse: true },
          { text: { en: "I keep testing alternatives even after my first few attempts fail.", ar: "أستمر في اختبار البدائل حتى بعد فشل محاولاتي الأولى." }, reverse: false }
        ]
      },
      {
        name: { en: "Data Orientation", ar: "التوجه القائم على البيانات" },
        definition: { en: "Bases conclusions on data and evidence rather than intuition alone.", ar: "يبني استنتاجاته على البيانات والأدلة بدلاً من الحدس وحده." },
        items: [
          { text: { en: "I sometimes trust my gut over the numbers when they conflict.", ar: "أثق أحيانًا بحدسي أكثر من الأرقام عندما يتعارضان." }, reverse: true },
          { text: { en: "I tend to form an opinion about a process problem before looking at the data.", ar: "أميل إلى تكوين رأي حول مشكلة في العملية قبل النظر إلى البيانات." }, reverse: true },
          { text: { en: "I am comfortable presenting a conclusion that isn't fully backed by evidence.", ar: "أشعر بالارتياح لتقديم استنتاج غير مدعوم بالكامل بالأدلة." }, reverse: true },
          { text: { en: "I prefer to base a recommendation on data rather than a hunch.", ar: "أفضّل تأسيس التوصية على البيانات بدلاً من الحدس." }, reverse: false }
        ]
      },
      {
        name: { en: "Initiative / Proactivity", ar: "المبادرة / الاستباقية" },
        definition: { en: "Identifies opportunities for improvement without being asked.", ar: "يحدد فرص التحسين دون أن يُطلب منه ذلك." },
        items: [
          { text: { en: "I usually wait for instructions rather than raising ideas on my own.", ar: "عادةً ما أنتظر التعليمات بدلاً من طرح الأفكار من تلقاء نفسي." }, reverse: true },
          { text: { en: "I don't bother following up on my suggestions if they aren't immediately implemented.", ar: "لا أكلّف نفسي بمتابعة اقتراحاتي إذا لم تُنفَّذ فورًا." }, reverse: true },
          { text: { en: "I prefer to wait for someone else to take the first step on a project.", ar: "أفضّل الانتظار حتى يتخذ شخص آخر الخطوة الأولى في المشروع." }, reverse: true },
          { text: { en: "I look for opportunities to improve a process even when no one has asked me to.", ar: "أبحث عن فرص لتحسين العملية حتى عندما لا يطلب مني أحد ذلك." }, reverse: false }
        ]
      }
    ],
    sjt: {
      question: {
        en: "You identify a change that could improve line throughput by 8%, but it would require convincing production staff to alter a habit they are comfortable with. What do you do?",
        ar: "تحدد تغييرًا يمكن أن يحسّن إنتاجية الخط بنسبة 8%، لكنه يتطلب إقناع موظفي الإنتاج بتغيير عادة اعتادوا عليها. ماذا تفعل؟"
      },
      options: [
        { en: "Drop the idea since getting buy-in seems like too much effort.", ar: "التخلي عن الفكرة لأن الحصول على موافقة الفريق يبدو مجهودًا كبيرًا." },
        { en: "Run a small pilot, share the data with the team, and work with them to adjust the process gradually.", ar: "إجراء تجربة صغيرة، ومشاركة البيانات مع الفريق، والعمل معهم على تعديل العملية تدريجيًا." },
        { en: "Implement the change without telling the production team in advance.", ar: "تنفيذ التغيير دون إبلاغ فريق الإنتاج مسبقًا." },
        { en: "Wait for someone senior to propose the same idea before acting.", ar: "الانتظار حتى يقترح شخص أعلى مرتبة نفس الفكرة قبل التصرف." }
      ],
      bestIndex: 1
    }
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
          { text: { en: "I sometimes feel tempted to overlook a small violation to keep things moving.", ar: "أشعر أحيانًا بإغراء تجاهل مخالفة بسيطة لإبقاء الأمور تسير." }, reverse: true },
          { text: { en: "I believe it's acceptable to release a batch with a minor documentation discrepancy if production is under pressure.", ar: "أعتقد أنه من المقبول الإفراج عن تشغيلة بها تباين بسيط في التوثيق إذا كان الإنتاج تحت ضغط." }, reverse: true },
          { text: { en: "I sometimes let the prospect of being unpopular with other departments influence my decision to reject a batch.", ar: "أدع أحيانًا احتمال عدم شعبيتي لدى الأقسام الأخرى يؤثر على قراري برفض تشغيلة ما." }, reverse: true },
          { text: { en: "I report issues honestly even when I know the answer will be unwelcome.", ar: "أُبلغ عن المشكلات بصدق حتى عندما أعلم أن الإجابة لن تكون مرحبًا بها." }, reverse: false }
        ]
      },
      {
        name: { en: "Assertiveness", ar: "الحزم" },
        definition: { en: "Is comfortable saying no or halting a process when standards aren't met.", ar: "يشعر بالارتياح لقول 'لا' أو إيقاف عملية عندما لا تُستوفى المعايير." },
        items: [
          { text: { en: "I tend to avoid conflict even when I disagree with a decision.", ar: "أميل إلى تجنب الخلاف حتى عندما أختلف مع قرار ما." }, reverse: true },
          { text: { en: "I find it uncomfortable to tell a senior colleague that something does not meet requirements.", ar: "أشعر بعدم الارتياح عند إخبار زميل أعلى مرتبة بأن شيئًا ما لا يستوفي المتطلبات." }, reverse: true },
          { text: { en: "I often back down from my position if I face significant pushback from others.", ar: "غالبًا ما أتراجع عن موقفي إذا واجهت معارضة كبيرة من الآخرين." }, reverse: true },
          { text: { en: "I speak up clearly when I believe a process should be stopped.", ar: "أُعبّر بوضوح عندما أعتقد أنه ينبغي إيقاف عملية ما." }, reverse: false }
        ]
      },
      {
        name: { en: "Attention to Detail", ar: "الانتباه للتفاصيل" },
        definition: { en: "Reviews documentation and records thoroughly enough to catch real issues.", ar: "يراجع الوثائق والسجلات بدقة كافية لاكتشاف المشكلات الحقيقية." },
        items: [
          { text: { en: "I sometimes approve records quickly without checking every detail.", ar: "أوافق أحيانًا على السجلات بسرعة دون التحقق من كل التفاصيل." }, reverse: true },
          { text: { en: "Small formatting or data errors in a batch record usually slip past me.", ar: "غالبًا ما تفوتني أخطاء التنسيق أو البيانات الصغيرة في سجل التشغيلة." }, reverse: true },
          { text: { en: "I find comparing data across multiple documents to ensure consistency to be tedious.", ar: "أجد أن مقارنة البيانات عبر مستندات متعددة للتأكد من اتساقها أمر مملّ." }, reverse: true },
          { text: { en: "I read documentation closely enough to catch inconsistencies others might miss.", ar: "أقرأ الوثائق بعناية كافية لاكتشاف التباينات التي قد يغفلها الآخرون." }, reverse: false }
        ]
      },
      {
        name: { en: "Communication & Diplomacy", ar: "التواصل واللباقة" },
        definition: { en: "Enforces standards while keeping working relationships constructive.", ar: "يفرض المعايير مع الحفاظ على علاقات عمل بنّاءة." },
        items: [
          { text: { en: "I sometimes come across as harsh when I deliver critical feedback.", ar: "أبدو أحيانًا قاسيًا عند تقديم ملاحظات نقدية." }, reverse: true },
          { text: { en: "I struggle to maintain a good working relationship after disagreeing with a colleague.", ar: "أجد صعوبة في الحفاظ على علاقة عمل جيدة بعد الاختلاف مع زميل." }, reverse: true },
          { text: { en: "I tend to focus only on the rule that was broken, rather than trying to understand the other department's perspective.", ar: "أميل إلى التركيز فقط على القاعدة التي انتُهكت، بدلاً من محاولة فهم وجهة نظر القسم الآخر." }, reverse: true },
          { text: { en: "I can explain why something failed review in a way that doesn't feel like an attack.", ar: "أستطيع شرح سبب فشل المراجعة بطريقة لا تبدو وكأنها هجوم." }, reverse: false }
        ]
      },
      {
        name: { en: "Objectivity / Independent Judgment", ar: "الموضوعية / الحكم المستقل" },
        definition: { en: "Evaluates evidence on its merits, resisting pressure to conform.", ar: "يُقيّم الأدلة بموضوعية، ويقاوم الضغوط للانصياع." },
        items: [
          { text: { en: "I sometimes let a relationship with a colleague influence my professional judgment.", ar: "أدع أحيانًا علاقتي بزميل ما تؤثر على حكمي المهني." }, reverse: true },
          { text: { en: "I tend to reach different conclusions depending on whether a request comes from a junior or a senior colleague.", ar: "أميل إلى التوصل لاستنتاجات مختلفة حسب ما إذا كان الطلب صادرًا عن زميل أصغر أو أعلى مرتبة." }, reverse: true },
          { text: { en: "I find it difficult to set aside my personal opinions when evaluating compliance.", ar: "أجد صعوبة في وضع آرائي الشخصية جانبًا عند تقييم الالتزام." }, reverse: true },
          { text: { en: "I base my decisions on the evidence in front of me rather than on who is asking.", ar: "أبني قراراتي على الأدلة المتاحة أمامي وليس على هوية الشخص الذي يطلب." }, reverse: false }
        ]
      }
    ],
    sjt: {
      question: {
        en: "A production manager under deadline pressure asks you to release a batch while a minor documentation discrepancy is still being resolved, promising to 'fix the paperwork later.' What do you do?",
        ar: "يطلب منك مدير الإنتاج، تحت ضغط الموعد النهائي، الإفراج عن تشغيلة بينما لا يزال يتم حل تباين بسيط في التوثيق، ويعدك بـ'تصحيح الأوراق لاحقًا'. ماذا تفعل؟"
      },
      options: [
        { en: "Release the batch as a favor, since the manager promised to fix it later.", ar: "الإفراج عن التشغيلة كمجاملة، بما أن المدير وعد بتصحيح الأمر لاحقًا." },
        { en: "Hold the release until the discrepancy is properly investigated and documented, per procedure.", ar: "تعليق الإفراج حتى يتم التحقيق في التباين وتوثيقه بشكل صحيح، وفق الإجراء المتبع." },
        { en: "Release it but ask a colleague to sign instead of you.", ar: "الإفراج عنها مع الطلب من زميل التوقيع بدلاً منك." },
        { en: "Avoid the manager until the deadline passes.", ar: "تجنب المدير حتى يمر الموعد النهائي." }
      ],
      bestIndex: 1
    }
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
          { text: { en: "Once something works, I rarely feel the need to understand why.", ar: "بمجرد نجاح شيء ما، نادرًا ما أشعر بالحاجة لفهم السبب." }, reverse: true },
          { text: { en: "I only read up on new research if it is strictly required for my current project.", ar: "لا أطّلع على الأبحاث الجديدة إلا إذا كانت مطلوبة بشكل صارم لمشروعي الحالي." }, reverse: true },
          { text: { en: "I find asking 'what if' questions about a formulation or process to be a distraction from getting the work done.", ar: "أجد أن طرح أسئلة 'ماذا لو' حول تركيبة أو عملية ما يُشتّت التركيز عن إنجاز العمل." }, reverse: true },
          { text: { en: "I want to understand the underlying mechanism, not just whether an experiment worked.", ar: "أرغب في فهم الآلية الكامنة، وليس فقط معرفة ما إذا كانت التجربة قد نجحت." }, reverse: false }
        ]
      },
      {
        name: { en: "Creativity", ar: "الإبداع" },
        definition: { en: "Generates novel formulations or approaches rather than only replicating known ones.", ar: "يبتكر تركيبات أو أساليب جديدة بدلاً من الاكتفاء بتكرار المعروف منها." },
        items: [
          { text: { en: "I prefer to stick with proven approaches rather than experiment with new ones.", ar: "أفضّل الالتزام بالأساليب المثبتة بدلاً من تجربة أساليب جديدة." }, reverse: true },
          { text: { en: "I tend to avoid combining ideas from different fields, preferring to stay within my specific area of expertise.", ar: "أميل إلى تجنب الجمع بين أفكار من مجالات مختلفة، مفضّلًا البقاء ضمن مجال خبرتي المحدد." }, reverse: true },
          { text: { en: "I rarely propose formulation approaches that haven't been tried before.", ar: "نادرًا ما أقترح أساليب تركيب لم تُجرَّب من قبل." }, reverse: true },
          { text: { en: "Colleagues would describe me as someone with original scientific ideas.", ar: "يصفني الزملاء بأنني صاحب أفكار علمية أصيلة." }, reverse: false }
        ]
      },
      {
        name: { en: "Tolerance for Ambiguity & Failure", ar: "تحمّل الغموض والفشل" },
        definition: { en: "Stays motivated when experiments fail or the path forward is unclear.", ar: "يحافظ على حماسه عندما تفشل التجارب أو يكون المسار المستقبلي غير واضح." },
        items: [
          { text: { en: "Repeated failed experiments make me want to give up on a project.", ar: "تجعلني التجارب الفاشلة المتكررة أرغب في التخلي عن المشروع." }, reverse: true },
          { text: { en: "I lose motivation when a project's direction is unclear for weeks at a time.", ar: "أفقد الحماس عندما يكون اتجاه المشروع غير واضح لأسابيع متتالية." }, reverse: true },
          { text: { en: "I find a failed experiment to be a personal setback rather than useful data.", ar: "أرى التجربة الفاشلة نكسة شخصية بدلاً من بيانات مفيدة." }, reverse: true },
          { text: { en: "I am comfortable making decisions with incomplete information.", ar: "أشعر بالارتياح لاتخاذ قرارات بمعلومات غير مكتملة." }, reverse: false }
        ]
      },
      {
        name: { en: "Analytical Rigor", ar: "الدقة التحليلية" },
        definition: { en: "Designs and interprets experiments with methodological care.", ar: "يصمم التجارب ويفسرها بعناية منهجية." },
        items: [
          { text: { en: "I sometimes accept a promising result without fully verifying it.", ar: "أقبل أحيانًا نتيجة واعدة دون التحقق منها بشكل كامل." }, reverse: true },
          { text: { en: "I find it tedious to design experiments that isolate the effect of a single variable.", ar: "أجد أنه من الممل تصميم تجارب تعزل تأثير متغير واحد." }, reverse: true },
          { text: { en: "I rarely bother to document my experimental reasoning since I know how I did it.", ar: "نادرًا ما أكلّف نفسي بتوثيق منطق تجربتي لأنني أعرف كيف قمت بها." }, reverse: true },
          { text: { en: "I double-check my statistical or analytical methods before drawing conclusions.", ar: "أتحقق مرة أخرى من طرقي الإحصائية أو التحليلية قبل استخلاص النتائج." }, reverse: false }
        ]
      },
      {
        name: { en: "Persistence & Collaboration", ar: "المثابرة والتعاون" },
        definition: { en: "Keeps working a problem over time while integrating input from others.", ar: "يواصل العمل على مشكلة ما مع مرور الوقت مع دمج مدخلات الآخرين." },
        items: [
          { text: { en: "I tend to lose interest in a project once the initial excitement fades.", ar: "أميل إلى فقدان الاهتمام بالمشروع بمجرد تلاشي الحماس الأولي." }, reverse: true },
          { text: { en: "I prefer to work in isolation rather than actively seeking input from colleagues.", ar: "أفضّل العمل بمعزل عن الآخرين بدلاً من السعي النشط للحصول على آراء الزملاء." }, reverse: true },
          { text: { en: "I find it frustrating to rework my approach based on feedback from others.", ar: "أجد أنه من المحبط إعادة صياغة أسلوبي بناءً على ملاحظات الآخرين." }, reverse: true },
          { text: { en: "I keep pushing on a difficult formulation problem over weeks or months.", ar: "أواصل العمل على مشكلة تركيب صعبة على مدى أسابيع أو أشهر." }, reverse: false }
        ]
      }
    ],
    sjt: {
      question: {
        en: "After several months, your lead formulation approach for a new product keeps failing a key stability test, while a promising but unconventional alternative has emerged from a side experiment. What do you do?",
        ar: "بعد عدة أشهر، ما زال أسلوب التركيب الرئيسي لمنتج جديد يفشل في اختبار ثبات أساسي، بينما ظهر بديل واعد لكنه غير تقليدي من تجربة جانبية. ماذا تفعل؟"
      },
      options: [
        { en: "Keep pushing the original approach since it was the agreed plan.", ar: "الاستمرار في الأسلوب الأصلي لأنه كان الخطة المتفق عليها." },
        { en: "Present both the failure data and the promising alternative to the team, and propose a data-driven path forward.", ar: "عرض بيانات الفشل والبديل الواعد على الفريق، واقتراح مسار قائم على البيانات للمضي قدمًا." },
        { en: "Quietly switch to the alternative without informing the team.", ar: "التحول بهدوء إلى البديل دون إبلاغ الفريق." },
        { en: "Abandon the project rather than choose between the two paths.", ar: "التخلي عن المشروع بدلاً من الاختيار بين المسارين." }
      ],
      bestIndex: 1
    }
  }
];
