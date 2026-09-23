export type UserRole = 'student' | 'doctor';

export interface StudentProfileData {
  id: string;
  name: string;
  studentCode: string;
  nationalId: string;
  university: string;
  faculty: string;
  academicYear: string; // الفرقة الأولى
  department: string;   // قسم تكنولوجيا التعليم
  section: string;      // شعبة (أ)
  studyType: string;    // انتظام
  gpa: number;          // 3.78
  advisor: string;      // أ.د. أشرف فوزي
  avatar?: string;
}

export interface DoctorProfileData {
  id: string;
  name: string;
  doctorCode: string;
  title: string;        // أستاذ تكنولوجيا التعليم ورئيس القسم
  university: string;
  faculty: string;
  department: string;
  email: string;
  office: string;       // مبنى (ب) - غرفة 312
  officeHours: string;  // الأحد والثلاثاء: 11:00 ص – 01:00 م
}

export interface Course {
  id: string;
  code: string;         // تكن 101
  name: string;
  doctorName: string;
  creditHours: number;
  hall: string;
  dayOfWeek: string;
  timeSlot: string;
  lectureType: 'نظري' | 'عملي' | 'مشترك';
  department: string;
  academicYear: string;
  attendanceRate: number; // 92%
  totalLectures: number;
  attendedLectures: number;
  absenceCount: number;
  lateCount: number;
  pendingAssignmentsCount: number;
  upcomingExamsCount: number;
  description: string;
  syllabus: { title: string; week: number; status: 'completed' | 'current' | 'upcoming' }[];
  resources: { title: string; type: 'pdf' | 'slides' | 'link'; size?: string; url: string }[];
}

export interface ScheduleLecture {
  id: string;
  courseId: string;
  courseName: string;
  doctorName: string;
  day: 'السبت' | 'الأحد' | 'الاثنين' | 'الثلاثاء' | 'الأربعاء' | 'الخميس';
  startTime: string; // "10:00 ص"
  endTime: string;   // "12:00 م"
  hall: string;      // "قاعة 203" أو "معمل الحاسب 4"
  lectureType: 'نظري' | 'عملي' | 'ورشة';
  section: string;   // "شعبة أ" أو "شعبة ب" أو "جميع الشعب"
}

export type AssignmentStatus = 'مطلوب' | 'تم التسليم' | 'متأخر';

export interface Assignment {
  id: string;
  courseId: string;
  courseName: string;
  title: string;
  description: string;
  dueDate: string;          // "2026-10-05"
  dueTime: string;          // "11:59 م"
  totalMarks: number;
  status: AssignmentStatus;
  submissionDate?: string;
  submittedFile?: string;
  studentNotes?: string;
  grade?: number;
  feedback?: string;
  attachedFile?: { name: string; size: string };
  department: string;
  academicYear: string;
  section: string;
}

export interface Question {
  id: string;
  text: string;
  type: 'mcq' | 'true_false';
  options: string[];
  correctOptionIndex: number;
  points: number;
}

export type ExamStatus = 'قادم' | 'نشط' | 'منتهي';

export interface Exam {
  id: string;
  courseId: string;
  courseName: string;
  doctorName: string;
  title: string;
  date: string;
  time: string;
  durationMinutes: number;
  totalQuestions: number;
  totalMarks: number;
  instructions: string[];
  status: ExamStatus;
  academicYear: string;
  section: string;
  questions: Question[];
  studentScore?: number;
  studentAnswers?: Record<string, number>;
  takenAt?: string;
}

export interface ExamIntegrityLog {
  id: string;
  studentId: string;
  studentName: string;
  studentCode: string;
  examId: string;
  examTitle: string;
  courseName: string;
  activityType: string;    // "مغادرة شاشة الامتحان مرتين" أو "انقطاع اتصال مؤقت"
  timestamp: string;
  warningCount: number;
  status: 'يحتاج إلى مراجعة' | 'معتمد' | 'ملغى';
  notes?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  timestamp: string;
  category: 'academic' | 'exam' | 'assignment' | 'integrity';
  isRead: boolean;
  priority?: 'normal' | 'high' | 'warning';
}

export interface EnrolledStudent {
  id: string;
  name: string;
  studentCode: string;
  department: string;
  academicYear: string;
  section: string;
  attendanceRate: number;
  submittedAssignmentsCount: number;
  totalAssignmentsCount: number;
  currentAverageGrade: number; // e.g. 88%
  avatar?: string;
}
