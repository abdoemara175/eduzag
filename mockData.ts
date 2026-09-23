import {
  StudentProfileData,
  DoctorProfileData,
  Course,
  ScheduleLecture,
  Assignment,
  Exam,
  ExamIntegrityLog,
  NotificationItem,
  EnrolledStudent
} from './types';

export const INITIAL_STUDENT: StudentProfileData = {
  id: 'std_20241088',
  name: 'محمد أحمد عبد الرحمن',
  studentCode: '20241088',
  nationalId: '30509121300891',
  university: 'جامعة الزقازيق',
  faculty: 'كلية التربية النوعية',
  academicYear: 'الفرقة الأولى',
  department: 'قسم تكنولوجيا التعليم',
  section: 'شعبة (أ)',
  studyType: 'انتظام',
  gpa: 3.78,
  advisor: 'أ.د. أشرف فوزي',
};

export const INITIAL_DOCTOR: DoctorProfileData = {
  id: 'doc_2012015',
  name: 'أ.د. أشرف فوزي أحمد',
  doctorCode: 'DOC-2012015',
  title: 'أستاذ تكنولوجيا التعليم ورئيس القسم',
  university: 'جامعة الزقازيق',
  faculty: 'كلية التربية النوعية',
  department: 'قسم تكنولوجيا التعليم',
  email: 'ashraf.fawzy@sed.zu.edu.eg',
  office: 'مبنى (ب) - قاعة 312',
  officeHours: 'الأحد والثلاثاء: 11:00 ص – 01:00 م',
};

export const INITIAL_COURSES: Course[] = [
  {
    id: 'crs_101',
    code: 'تكن 101',
    name: 'تصميم وإنتاج البرمجيات التعليمية',
    doctorName: 'أ.د. أشرف فوزي',
    creditHours: 3,
    hall: 'قاعة 203',
    dayOfWeek: 'السبت',
    timeSlot: '10:00 ص – 12:00 م',
    lectureType: 'نظري',
    department: 'قسم تكنولوجيا التعليم',
    academicYear: 'الفرقة الأولى',
    attendanceRate: 94,
    totalLectures: 12,
    attendedLectures: 11,
    absenceCount: 1,
    lateCount: 0,
    pendingAssignmentsCount: 1,
    upcomingExamsCount: 1,
    description: 'يتناول المقرر مبادئ التصميم التعليمي، ونماذج تطوير البرمجيات التفاعلية (ADDIE & Dick and Carey)، ومهارات تأليف واجهات التعلم الرقمية.',
    syllabus: [
      { title: 'مدخل إلى نظم البرمجيات وتكنولوجيا التعلم', week: 1, status: 'completed' },
      { title: 'تحليل المتطلبات وتحديد الأهداف السلوكية', week: 2, status: 'completed' },
      { title: 'نموذج ADDIE ومراحله الخمس بالتفصيل', week: 3, status: 'completed' },
      { title: 'تصميم السيناريو التعليمي وتدفق الشاشات', week: 4, status: 'current' },
      { title: 'معايير جودة الواجهات الرسومية وسهولة الاستخدام', week: 5, status: 'upcoming' },
      { title: 'التقويم البنائي والنهائي للبرمجية', week: 6, status: 'upcoming' },
    ],
    resources: [
      { title: 'كتاب المقرر الجامعي - الطبعة المعتمدة 2026', type: 'pdf', size: '12.4 ميجابايت', url: '#' },
      { title: 'عرض الشرائح: نموذج ADDIE التطبيقي', type: 'slides', size: '4.8 ميجابايت', url: '#' },
      { title: 'دليل كتابة السيناريو التعليمي التفاعلي', type: 'pdf', size: '2.1 ميجابايت', url: '#' },
    ]
  },
  {
    id: 'crs_102',
    code: 'تكن 102',
    name: 'تكنولوجيا الوسائط المتعددة التفاعلية',
    doctorName: 'د. منى عبد الرحمن',
    creditHours: 3,
    hall: 'استوديو الملتيميديا',
    dayOfWeek: 'الاثنين',
    timeSlot: '09:00 ص – 11:00 ص',
    lectureType: 'عملي',
    department: 'قسم تكنولوجيا التعليم',
    academicYear: 'الفرقة الأولى',
    attendanceRate: 91,
    totalLectures: 11,
    attendedLectures: 10,
    absenceCount: 1,
    lateCount: 1,
    pendingAssignmentsCount: 0,
    upcomingExamsCount: 1,
    description: 'دراسة وتطبيق عناصر الوسائط المتعددة من صوت وصورة ورسوم متحركة وتضمينها في سياقات التعلم الحديثة.',
    syllabus: [
      { title: 'مبادئ الصوت الرقمي ومعالجته', week: 1, status: 'completed' },
      { title: 'إنتاج الرسومات المتجهة والنقطية للتعليم', week: 2, status: 'completed' },
      { title: 'تصميم الفيديو التفاعلي وتأثيرات الموشن', week: 3, status: 'completed' },
      { title: 'دمج الوسائط في منصات التعلم', week: 4, status: 'current' },
    ],
    resources: [
      { title: 'ملفات تدريبية لبرامج التصميم الرسومي', type: 'slides', size: '25.3 ميجابايت', url: '#' },
      { title: 'بنك المؤثرات الصوتية المرخصة للتعليم', type: 'link', url: '#' },
    ]
  },
  {
    id: 'crs_103',
    code: 'تكن 104',
    name: 'تطبيقات الذكاء الاصطناعي في التعليم',
    doctorName: 'أ.د. أشرف فوزي',
    creditHours: 2,
    hall: 'مدرج د',
    dayOfWeek: 'الأحد',
    timeSlot: '10:00 ص – 12:00 م',
    lectureType: 'نظري',
    department: 'قسم تكنولوجيا التعليم',
    academicYear: 'الفرقة الأولى',
    attendanceRate: 96,
    totalLectures: 10,
    attendedLectures: 10,
    absenceCount: 0,
    lateCount: 0,
    pendingAssignmentsCount: 1,
    upcomingExamsCount: 0,
    description: 'استكشاف نماذج الذكاء الاصطناعي التوليدي، وتخصيص بيئات التعلم التكيفي، وأخلاقيات استخدام الذكاء الاصطناعي في الفصول المدرسية.',
    syllabus: [
      { title: 'مقدمة في الذكاء الاصطناعي وتطبيقاته التربوية', week: 1, status: 'completed' },
      { title: 'هندسة الأوامر (Prompt Engineering) للمعلمين', week: 2, status: 'completed' },
      { title: 'بيئات التعلم الذكية والتكيف مع الفروق الفردية', week: 3, status: 'current' },
      { title: 'أخلاقيات ونزاهة الذكاء الاصطناعي بالجامعات', week: 4, status: 'upcoming' },
    ],
    resources: [
      { title: 'كتيب أدوات الذكاء الاصطناعي للمعلم الحديث', type: 'pdf', size: '6.7 ميجابايت', url: '#' },
    ]
  },
  {
    id: 'crs_104',
    code: 'ترب 101',
    name: 'علم النفس التربوي وتطبيقاته',
    doctorName: 'د. سامح البدري',
    creditHours: 2,
    hall: 'مدرج ج',
    dayOfWeek: 'الثلاثاء',
    timeSlot: '10:00 ص – 12:00 م',
    lectureType: 'نظري',
    department: 'متطلب كلية',
    academicYear: 'الفرقة الأولى',
    attendanceRate: 90,
    totalLectures: 10,
    attendedLectures: 9,
    absenceCount: 1,
    lateCount: 0,
    pendingAssignmentsCount: 0,
    upcomingExamsCount: 0,
    description: 'نظريات التعلم المعرفية والسلوكية والبنائية، والدافعية، وإدارة البيئة الصفية وإثارة دافعية الطلاب نحو التعلم.',
    syllabus: [
      { title: 'النظريات السلوكية وتطبيقاتها الصفية', week: 1, status: 'completed' },
      { title: 'النظرية البنائية والتعلم النشط', week: 2, status: 'completed' },
      { title: 'معالجة المعلومات والذاكرة الإنسانية', week: 3, status: 'current' },
    ],
    resources: [
      { title: 'ملخص النظريات السلوكية والمعرفية', type: 'pdf', size: '3.2 ميجابايت', url: '#' },
    ]
  },
  {
    id: 'crs_105',
    code: 'تكن 103',
    name: 'صيانة وتطوير المعامل المدرسية',
    doctorName: 'د. حازم السيد',
    creditHours: 2,
    hall: 'معمل الحاسب 4',
    dayOfWeek: 'الأربعاء',
    timeSlot: '09:30 ص – 11:30 ص',
    lectureType: 'عملي',
    department: 'قسم تكنولوجيا التعليم',
    academicYear: 'الفرقة الأولى',
    attendanceRate: 88,
    totalLectures: 9,
    attendedLectures: 8,
    absenceCount: 1,
    lateCount: 1,
    pendingAssignmentsCount: 0,
    upcomingExamsCount: 0,
    description: 'مهارات الصيانة المادية والبرمجية لأجهزة الحواسيب وشبكات المعامل المدرسية ووسائل العرض التعليمية الذكية.',
    syllabus: [
      { title: 'مكونات الحاسب وتشخيص الأعطال الشائعة', week: 1, status: 'completed' },
      { title: 'إعداد وتكوين الشبكات المحلية (LAN)', week: 2, status: 'completed' },
      { title: 'صيانة السبورات التفاعلية وأجهزة العرض Data Show', week: 3, status: 'current' },
    ],
    resources: [
      { title: 'دليل تشخيص أعطال المعامل المدرسية خطوة بخطوة', type: 'pdf', size: '5.1 ميجابايت', url: '#' },
    ]
  }
];

export const INITIAL_SCHEDULE: ScheduleLecture[] = [
  // السبت
  {
    id: 'sch_sat_1',
    courseId: 'crs_101',
    courseName: 'تصميم وإنتاج البرمجيات التعليمية',
    doctorName: 'أ.د. أشرف فوزي',
    day: 'السبت',
    startTime: '10:00 ص',
    endTime: '12:00 م',
    hall: 'قاعة 203',
    lectureType: 'نظري',
    section: 'شعبة أ'
  },
  {
    id: 'sch_sat_2',
    courseId: 'crs_101',
    courseName: 'تصميم وإنتاج البرمجيات التعليمية (عملي)',
    doctorName: 'د. حازم السيد',
    day: 'السبت',
    startTime: '12:30 م',
    endTime: '02:30 م',
    hall: 'معمل الحاسب 4',
    lectureType: 'عملي',
    section: 'شعبة أ'
  },
  {
    id: 'sch_sat_b1',
    courseId: 'crs_101',
    courseName: 'تصميم وإنتاج البرمجيات التعليمية (عملي)',
    doctorName: 'د. حازم السيد',
    day: 'السبت',
    startTime: '10:00 ص',
    endTime: '12:00 م',
    hall: 'معمل الحاسب 4',
    lectureType: 'عملي',
    section: 'شعبة ب'
  },
  {
    id: 'sch_sat_b2',
    courseId: 'crs_101',
    courseName: 'تصميم وإنتاج البرمجيات التعليمية (نظري)',
    doctorName: 'أ.د. أشرف فوزي',
    day: 'السبت',
    startTime: '12:30 م',
    endTime: '02:30 م',
    hall: 'قاعة 203',
    lectureType: 'نظري',
    section: 'شعبة ب'
  },

  // الأحد
  {
    id: 'sch_sun_1',
    courseId: 'crs_103',
    courseName: 'تطبيقات الذكاء الاصطناعي في التعليم',
    doctorName: 'أ.د. أشرف فوزي',
    day: 'الأحد',
    startTime: '10:00 ص',
    endTime: '12:00 م',
    hall: 'مدرج د',
    lectureType: 'نظري',
    section: 'شعبة أ'
  },
  {
    id: 'sch_sun_2',
    courseId: 'crs_103',
    courseName: 'تطبيقات الذكاء الاصطناعي (معمل تجارب)',
    doctorName: 'م. أحمد ربيع',
    day: 'الأحد',
    startTime: '12:30 م',
    endTime: '02:00 م',
    hall: 'معمل تكنولوجيا 2',
    lectureType: 'عملي',
    section: 'شعبة أ'
  },
  {
    id: 'sch_sun_b1',
    courseId: 'crs_103',
    courseName: 'تطبيقات الذكاء الاصطناعي في التعليم',
    doctorName: 'أ.د. أشرف فوزي',
    day: 'الأحد',
    startTime: '10:00 ص',
    endTime: '12:00 م',
    hall: 'مدرج د',
    lectureType: 'نظري',
    section: 'شعبة ب'
  },

  // الاثنين
  {
    id: 'sch_mon_1',
    courseId: 'crs_102',
    courseName: 'تكنولوجيا الوسائط المتعددة التفاعلية',
    doctorName: 'د. منى عبد الرحمن',
    day: 'الاثنين',
    startTime: '09:00 ص',
    endTime: '11:00 ص',
    hall: 'قاعة 201',
    lectureType: 'نظري',
    section: 'شعبة أ'
  },
  {
    id: 'sch_mon_2',
    courseId: 'crs_102',
    courseName: 'إنتاج الوسائط والمونتاج الرقمي',
    doctorName: 'م. سارة محمود',
    day: 'الاثنين',
    startTime: '11:30 ص',
    endTime: '01:30 م',
    hall: 'استوديو الملتيميديا',
    lectureType: 'عملي',
    section: 'شعبة أ'
  },
  {
    id: 'sch_mon_b1',
    courseId: 'crs_102',
    courseName: 'تكنولوجيا الوسائط المتعددة التفاعلية',
    doctorName: 'د. منى عبد الرحمن',
    day: 'الاثنين',
    startTime: '11:30 ص',
    endTime: '01:30 م',
    hall: 'قاعة 201',
    lectureType: 'نظري',
    section: 'شعبة ب'
  },

  // الثلاثاء
  {
    id: 'sch_tue_1',
    courseId: 'crs_104',
    courseName: 'علم النفس التربوي وتطبيقاته',
    doctorName: 'د. سامح البدري',
    day: 'الثلاثاء',
    startTime: '10:00 ص',
    endTime: '12:00 م',
    hall: 'مدرج ج',
    lectureType: 'نظري',
    section: 'شعبة أ'
  },
  {
    id: 'sch_tue_2',
    courseId: 'crs_104',
    courseName: 'حلقة نقاش وتطبيقات الفصول الافتراضية',
    doctorName: 'د. سامح البدري',
    day: 'الثلاثاء',
    startTime: '12:30 م',
    endTime: '02:00 م',
    hall: 'قاعة الندوات 1',
    lectureType: 'ورشة',
    section: 'شعبة أ'
  },
  {
    id: 'sch_tue_b1',
    courseId: 'crs_104',
    courseName: 'علم النفس التربوي وتطبيقاته',
    doctorName: 'د. سامح البدري',
    day: 'الثلاثاء',
    startTime: '10:00 ص',
    endTime: '12:00 م',
    hall: 'مدرج ج',
    lectureType: 'نظري',
    section: 'شعبة ب'
  },

  // الأربعاء
  {
    id: 'sch_wed_1',
    courseId: 'crs_105',
    courseName: 'صيانة وتطوير المعامل المدرسية',
    doctorName: 'د. حازم السيد',
    day: 'الأربعاء',
    startTime: '09:30 ص',
    endTime: '11:30 ص',
    hall: 'معمل الحاسب 4',
    lectureType: 'عملي',
    section: 'شعبة أ'
  },
  {
    id: 'sch_wed_2',
    courseId: 'crs_105',
    courseName: 'إدارة الشبكات التعليمية وتأمينها',
    doctorName: 'د. حازم السيد',
    day: 'الأربعاء',
    startTime: '12:00 م',
    endTime: '02:00 م',
    hall: 'ورشة الصيانة 105',
    lectureType: 'عملي',
    section: 'شعبة أ'
  },
  {
    id: 'sch_wed_b1',
    courseId: 'crs_105',
    courseName: 'صيانة وتطوير المعامل المدرسية',
    doctorName: 'د. حازم السيد',
    day: 'الأربعاء',
    startTime: '12:00 م',
    endTime: '02:00 م',
    hall: 'معمل الحاسب 4',
    lectureType: 'عملي',
    section: 'شعبة ب'
  },

  // الخميس
  {
    id: 'sch_thu_1',
    courseId: 'crs_101',
    courseName: 'مشروع إنتاج البرمجيات والمتابعة الميدانية',
    doctorName: 'أ.د. أشرف فوزي',
    day: 'الخميس',
    startTime: '10:00 ص',
    endTime: '01:00 م',
    hall: 'مركز التعليم الإلكتروني بالكلية',
    lectureType: 'ورشة',
    section: 'شعبة أ'
  },
  {
    id: 'sch_thu_b1',
    courseId: 'crs_101',
    courseName: 'مشروع إنتاج البرمجيات والمتابعة الميدانية',
    doctorName: 'أ.د. أشرف فوزي',
    day: 'الخميس',
    startTime: '10:00 ص',
    endTime: '01:00 م',
    hall: 'مركز التعليم الإلكتروني بالكلية',
    lectureType: 'ورشة',
    section: 'شعبة ب'
  }
];

export const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: 'asg_1',
    courseId: 'crs_101',
    courseName: 'تصميم وإنتاج البرمجيات التعليمية',
    title: 'تحليل وتصميم سيناريو برمجية بأسلوب ADDIE',
    description: 'قم بإعداد ملف تحليل كامل لوحدة تعليمية من مناهج المرحلة الإعدادية، متضمناً: تحليل خصائص المتعلمين، تحديد الأهداف الإجرائية، ورسم خريطة تدفق الشاشات (Storyboarding) بأسلوب احترافي.',
    dueDate: '2026-10-12',
    dueTime: '11:59 م',
    totalMarks: 20,
    status: 'مطلوب',
    department: 'قسم تكنولوجيا التعليم',
    academicYear: 'الفرقة الأولى',
    section: 'شعبة (أ)',
    attachedFile: { name: 'نموذج_كتابة_السيناريو_التعليمي.pdf', size: '1.2 ميجابايت' }
  },
  {
    id: 'asg_2',
    courseId: 'crs_103',
    courseName: 'تطبيقات الذكاء الاصطناعي في التعليم',
    title: 'بناء وبرمجة وكيل تعليمي ذكي مخصص لمادة دراسية',
    description: 'تطبيق عملي: تصميم وتغذية Prompt مخصص لنموذج ذكاء اصطناعي يقوم بدور المعلم المساعد لشرح مفاهيم معقدة مع صياغة أسئلة تقييم ذاتي للمتعلم.',
    dueDate: '2026-10-18',
    dueTime: '10:00 م',
    totalMarks: 15,
    status: 'مطلوب',
    department: 'قسم تكنولوجيا التعليم',
    academicYear: 'الفرقة الأولى',
    section: 'شعبة (أ)',
    attachedFile: { name: 'معايير_تقييم_الأوامر_الذكية.pdf', size: '850 كيلوبايت' }
  },
  {
    id: 'asg_3',
    courseId: 'crs_102',
    courseName: 'تكنولوجيا الوسائط المتعددة التفاعلية',
    title: 'إنتاج مشهد تعليمي رسومي متحرك (Motion Graphics)',
    description: 'تصميم مقطع مدته 60 ثانية يوضح دورة حياة البرمجية التعليمية مع تعليق صوتي واضح ونصوص متحركة متزامنة.',
    dueDate: '2026-09-20',
    dueTime: '11:59 م',
    totalMarks: 20,
    status: 'تم التسليم',
    submissionDate: '2026-09-19 08:30 م',
    submittedFile: 'مشروع_الموشن_محمد_احمد.mp4',
    studentNotes: 'تم استخدام برمجيات مفتوحة المصدر وتضمين مؤثرات صوتية مرخصة.',
    grade: 19,
    feedback: 'عمل متميز وإخراج احترافي، يُرجى فقط ضبط تباين الألوان في الثواني الأخيرة.',
    department: 'قسم تكنولوجيا التعليم',
    academicYear: 'الفرقة الأولى',
    section: 'شعبة (أ)'
  },
  {
    id: 'asg_4',
    courseId: 'crs_104',
    courseName: 'علم النفس التربوي وتطبيقاته',
    title: 'مقارنة نقدية بين النظريتين السلوكية والبنائية في المنصات الرقمية',
    description: 'كتابة ورقة بحثية مصغرة تقارن أثر التغذية الراجعة السريعة مقارنة بالاستكشاف الحر في استيعاب المفاهيم الرياضية.',
    dueDate: '2026-09-15',
    dueTime: '11:59 م',
    totalMarks: 10,
    status: 'تم التسليم',
    submissionDate: '2026-09-14 05:12 م',
    submittedFile: 'بحث_مقارنة_النظريات_التربوية.docx',
    studentNotes: 'تم توثيق المراجع بنظام APA 7.',
    grade: 9.5,
    feedback: 'تحليل دقيق واستناد لمراجع علمية رصينة.',
    department: 'متطلب كلية',
    academicYear: 'الفرقة الأولى',
    section: 'شعبة (أ)'
  },
  {
    id: 'asg_5',
    courseId: 'crs_105',
    courseName: 'صيانة وتطوير المعامل المدرسية',
    title: 'خريطة تشخيص أعطال الشبكات المحلية في معامل الكلية',
    description: 'رسم مخطط انسيابي لتتبع مشكلات كابلات UTP وموزعات الشبكة Switch وأخطاء تكوين بروتوكول TCP/IP.',
    dueDate: '2026-09-10',
    dueTime: '11:59 م',
    totalMarks: 15,
    status: 'متأخر',
    department: 'قسم تكنولوجيا التعليم',
    academicYear: 'الفرقة الأولى',
    section: 'شعبة (أ)'
  }
];

export const INITIAL_EXAMS: Exam[] = [
  {
    id: 'ex_1',
    courseId: 'crs_101',
    courseName: 'تصميم وإنتاج البرمجيات التعليمية',
    doctorName: 'أ.د. أشرف فوزي',
    title: 'الاختبار الدوري: أساسيات تصميم النظم التعليمية',
    date: '2026-09-24',
    time: '10:00 ص – 11:00 ص',
    durationMinutes: 20,
    totalQuestions: 5,
    totalMarks: 20,
    status: 'نشط',
    academicYear: 'الفرقة الأولى',
    section: 'شعبة (أ)',
    instructions: [
      'المدة المحددة للاختبار 20 دقيقة تبدأ بمجرد الضغط على زر بدء الاختبار.',
      'يتكون الاختبار من 5 أسئلة موضوعية (اختيار من متعدد وصواب وخطأ).',
      'يخضع هذا الاختبار لآلية فحص نزاهة الاختبارات، وسيتم تسجيل أي خروج عن شاشة الاختبار.',
      'تأكد من استقرار الاتصال بالإنترنت قبل البدء والضغط على زر تسليم الاختبار فور الانتهاء.'
    ],
    questions: [
      {
        id: 'q_1',
        text: 'ما هي المرحلة الأولى والأساسية في نموذج التصميم التعليمي العام ADDIE؟',
        type: 'mcq',
        options: [
          'التحليل (Analysis)',
          'التصميم (Design)',
          'التطوير (Development)',
          'التقويم (Evaluation)'
        ],
        correctOptionIndex: 0,
        points: 4
      },
      {
        id: 'q_2',
        text: 'يُعرّف "الوسيط التفاعلي" في بيئات التعلم الرقمية بأنه الوسيط الذي يتيح للمتعلم التحكم في مسار المحتوى وتدفقه وسرعته.',
        type: 'true_false',
        options: ['صواب', 'خطأ'],
        correctOptionIndex: 0,
        points: 4
      },
      {
        id: 'q_3',
        text: 'أي من المعايير الآتية هو الأهم عند تصميم واجهة المستخدم (UI) لبرمجية تعليمية موجهة للمرحلة الابتدائية؟',
        type: 'mcq',
        options: [
          'استخدام نصوص كثيرة ومعقدة وشروح نظرية مطولة',
          'البساطة والأيقونات البصرية الواضحة والتغذية الراجعة الفورية المبهجة',
          'تقليل الألوان والاعتماد الكامل على التدرج الرمادي',
          'استخدام خطوط خط الرقعة المعقدة صعبة القراءة'
        ],
        correctOptionIndex: 1,
        points: 4
      },
      {
        id: 'q_4',
        text: 'تهدف بيئات التعلم التكيفية (Adaptive Learning) القائمة على تقنيات الذكاء الاصطناعي إلى:',
        type: 'mcq',
        options: [
          'تقديم نفس المحتوى بنفس التوقيت والسرعة لجميع المتعلمين دون استثناء',
          'تخصيص مسار التعلم والمحتوى وسرعته وفقاً لمستوى وقدرات واحتياجات كل متعلم',
          'إلغاء التقييمات والاختبارات الدورية نهائياً من العملية التعليمية',
          'استبدال المعلم بالكامل ومنع أي إشراف تربوي بشري'
        ],
        correctOptionIndex: 1,
        points: 4
      },
      {
        id: 'q_5',
        text: 'صيغة الملفات المتجهة (Vector) الأكثر ملاءمة للأيقونات والرسومات التوضيحية القابلة للتكبير دون فقد الجودة في برمجيات الويب هي:',
        type: 'mcq',
        options: ['JPG', 'BMP', 'SVG', 'GIF'],
        correctOptionIndex: 2,
        points: 4
      }
    ]
  },
  {
    id: 'ex_2',
    courseId: 'crs_102',
    courseName: 'تكنولوجيا الوسائط المتعددة التفاعلية',
    doctorName: 'د. منى عبد الرحمن',
    title: 'اختبار منتصف الفصل الدراسي: تكنولوجيا الوسائط',
    date: '2026-10-28',
    time: '11:00 ص – 12:00 م',
    durationMinutes: 30,
    totalQuestions: 15,
    totalMarks: 30,
    status: 'قادم',
    academicYear: 'الفرقة الأولى',
    section: 'شعبة (أ)',
    instructions: [
      'يشمل الاختبار وحدات الصوت الرقمي، الصور النقطية والمتجهة، والمؤثرات البصرية.',
      'يحظر استخدام أي مصادر خارجية أثناء الجلسة الامتحانية.',
      'الزمن الكلي 30 دقيقة ولا يمكن إعادة الاختبار بعد التسليم.'
    ],
    questions: []
  },
  {
    id: 'ex_3',
    courseId: 'crs_103',
    courseName: 'تطبيقات الذكاء الاصطناعي في التعليم',
    doctorName: 'أ.د. أشرف فوزي',
    title: 'اختبار قصير: خوارزميات التعلم الآلي والتعليم التكيفي',
    date: '2026-11-04',
    time: '12:00 م – 12:20 م',
    durationMinutes: 20,
    totalQuestions: 10,
    totalMarks: 15,
    status: 'قادم',
    academicYear: 'الفرقة الأولى',
    section: 'شعبة (أ)',
    instructions: [
      'يركز الاختبار على الفروق بين النماذج التوليدية والنماذج التحليلية.',
      'يسمح بالدخول مرة واحدة فقط.'
    ],
    questions: []
  },
  {
    id: 'ex_4',
    courseId: 'crs_105',
    courseName: 'صيانة وتطوير المعامل المدرسية',
    doctorName: 'د. حازم السيد',
    title: 'الاختبار العملي الدوري: فحص وصيانة المكونات المادية',
    date: '2026-09-12',
    time: '09:00 ص',
    durationMinutes: 25,
    totalQuestions: 10,
    totalMarks: 20,
    status: 'منتهي',
    academicYear: 'الفرقة الأولى',
    section: 'شعبة (أ)',
    studentScore: 18,
    takenAt: '2026-09-12 09:22 ص',
    instructions: ['تم انتهاء الاختبار واعتماد الدرجة برصد 18 من 20.'],
    questions: []
  }
];

export const INITIAL_INTEGRITY_LOGS: ExamIntegrityLog[] = [
  {
    id: 'int_1',
    studentId: 'std_20241088',
    studentName: 'محمد أحمد عبد الرحمن',
    studentCode: '20241088',
    examId: 'ex_1',
    examTitle: 'الاختبار الدوري: أساسيات تصميم النظم التعليمية',
    courseName: 'تصميم وإنتاج البرمجيات التعليمية',
    activityType: 'مغادرة شاشة الامتحان مرتين',
    timestamp: 'منذ 18 دقيقة',
    warningCount: 2,
    status: 'يحتاج إلى مراجعة',
    notes: 'تم رصد تحويل التركيز عن نافذة الاختبار واستعادة النافذة بعد 12 ثانية.'
  },
  {
    id: 'int_2',
    studentId: 'std_20241094',
    studentName: 'سارة علي إبراهيم',
    studentCode: '20241094',
    examId: 'ex_1',
    examTitle: 'الاختبار الدوري: أساسيات تصميم النظم التعليمية',
    courseName: 'تصميم وإنتاج البرمجيات التعليمية',
    activityType: 'انقطاع اتصال مؤقت واستئناف',
    timestamp: 'منذ ساعتين',
    warningCount: 1,
    status: 'يحتاج إلى مراجعة',
    notes: 'انقطاع اتصال بالشبكة لمدة 24 ثانية واستئناف الجلسة بنجاح.'
  },
  {
    id: 'int_3',
    studentId: 'std_20241102',
    studentName: 'محمود خالد التميمي',
    studentCode: '20241102',
    examId: 'ex_1',
    examTitle: 'الاختبار الدوري: أساسيات تصميم النظم التعليمية',
    courseName: 'تصميم وإنتاج البرمجيات التعليمية',
    activityType: 'تبديل نافذة المتصفح المتكرر',
    timestamp: 'أمس 02:40 م',
    warningCount: 3,
    status: 'يحتاج إلى مراجعة',
    notes: 'تكرار إلغاء وضع ملء الشاشة والرجوع للتبويبات الجانبية.'
  },
  {
    id: 'int_4',
    studentId: 'std_20241075',
    studentName: 'فاطمة عمر حسن',
    studentCode: '20241075',
    examId: 'ex_4',
    examTitle: 'الاختبار العملي الدوري: فحص وصيانة المكونات المادية',
    courseName: 'صيانة وتطوير المعامل المدرسية',
    activityType: 'جلسة نظامية مستقرة',
    timestamp: 'منذ 3 أيام',
    warningCount: 0,
    status: 'معتمد',
    notes: 'تم أداء الاختبار دون تسجيل أية سلوكيات غير اعتيادية.'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_1',
    title: 'تم إضافة اختبار جديد متاح للتقديم',
    body: 'نشر أ.د. أشرف فوزي الاختبار الدوري لمقرر تصميم وإنتاج البرمجيات التعليمية. يمكنك البدء الآن.',
    timestamp: 'منذ 10 دقائق',
    category: 'exam',
    isRead: false,
    priority: 'high'
  },
  {
    id: 'notif_2',
    title: 'تنبيه بشأن موعد تسليم تكليف بأسلوب ADDIE',
    body: 'متبقي 4 أيام على الموعد النهائي لتسليم تكليف تحليل وتصميم سيناريو البرمجية.',
    timestamp: 'منذ ساعتين',
    category: 'assignment',
    isRead: false,
    priority: 'warning'
  },
  {
    id: 'notif_3',
    title: 'تم تعديل موعد المحاضرة القادمة',
    body: 'محاضرة تكنولوجيا الوسائط المتعددة التفاعلية ستبدأ الساعة 09:30 ص بدلاً من 09:00 ص بقاعة 201.',
    timestamp: 'أمس 04:15 م',
    category: 'academic',
    isRead: false,
    priority: 'normal'
  },
  {
    id: 'notif_4',
    title: 'تم رصد نشاط يحتاج إلى مراجعة أثناء الاختبار',
    body: 'تم تسجيل تنبيه مغادرة شاشة الاختبار في جلستك الأخيرة وإرسال التقرير للأستاذ المساعد للمراجعة.',
    timestamp: 'أمس 01:20 م',
    category: 'integrity',
    isRead: true,
    priority: 'warning'
  },
  {
    id: 'notif_5',
    title: 'تم نشر نتيجتك في الاختبار العملي',
    body: 'حصلت على 18 من 20 في اختبار مهارات فحص وصيانة المكونات المادية بمعامل الكلية.',
    timestamp: 'منذ يومين',
    category: 'academic',
    isRead: true,
    priority: 'normal'
  }
];

export const ENROLLED_STUDENTS_LIST: EnrolledStudent[] = [
  {
    id: 'std_20241088',
    name: 'محمد أحمد عبد الرحمن',
    studentCode: '20241088',
    department: 'قسم تكنولوجيا التعليم',
    academicYear: 'الفرقة الأولى',
    section: 'شعبة أ',
    attendanceRate: 94,
    submittedAssignmentsCount: 3,
    totalAssignmentsCount: 4,
    currentAverageGrade: 92
  },
  {
    id: 'std_20241094',
    name: 'سارة علي إبراهيم',
    studentCode: '20241094',
    department: 'قسم تكنولوجيا التعليم',
    academicYear: 'الفرقة الأولى',
    section: 'شعبة أ',
    attendanceRate: 98,
    submittedAssignmentsCount: 4,
    totalAssignmentsCount: 4,
    currentAverageGrade: 96
  },
  {
    id: 'std_20241102',
    name: 'محمود خالد التميمي',
    studentCode: '20241102',
    department: 'قسم تكنولوجيا التعليم',
    academicYear: 'الفرقة الأولى',
    section: 'شعبة أ',
    attendanceRate: 85,
    submittedAssignmentsCount: 2,
    totalAssignmentsCount: 4,
    currentAverageGrade: 78
  },
  {
    id: 'std_20241075',
    name: 'فاطمة عمر حسن',
    studentCode: '20241075',
    department: 'قسم تكنولوجيا التعليم',
    academicYear: 'الفرقة الأولى',
    section: 'شعبة أ',
    attendanceRate: 92,
    submittedAssignmentsCount: 4,
    totalAssignmentsCount: 4,
    currentAverageGrade: 89
  },
  {
    id: 'std_20241118',
    name: 'كريم يوسف منصور',
    studentCode: '20241118',
    department: 'قسم تكنولوجيا التعليم',
    academicYear: 'الفرقة الأولى',
    section: 'شعبة ب',
    attendanceRate: 90,
    submittedAssignmentsCount: 3,
    totalAssignmentsCount: 4,
    currentAverageGrade: 84
  },
  {
    id: 'std_20241125',
    name: 'نورهان عادل عبد الله',
    studentCode: '20241125',
    department: 'قسم تكنولوجيا التعليم',
    academicYear: 'الفرقة الأولى',
    section: 'شعبة ب',
    attendanceRate: 95,
    submittedAssignmentsCount: 4,
    totalAssignmentsCount: 4,
    currentAverageGrade: 93
  },
  {
    id: 'std_20241133',
    name: 'طارق صلاح الدين',
    studentCode: '20241133',
    department: 'قسم تكنولوجيا التعليم',
    academicYear: 'الفرقة الأولى',
    section: 'شعبة ب',
    attendanceRate: 82,
    submittedAssignmentsCount: 2,
    totalAssignmentsCount: 4,
    currentAverageGrade: 74
  },
  {
    id: 'std_20241142',
    name: 'مريم حسام العوضي',
    studentCode: '20241142',
    department: 'قسم تكنولوجيا التعليم',
    academicYear: 'الفرقة الأولى',
    section: 'شعبة أ',
    attendanceRate: 97,
    submittedAssignmentsCount: 4,
    totalAssignmentsCount: 4,
    currentAverageGrade: 95
  }
];

