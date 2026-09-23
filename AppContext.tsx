import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
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
import {
  INITIAL_STUDENT,
  INITIAL_DOCTOR,
  INITIAL_COURSES,
  INITIAL_SCHEDULE,
  INITIAL_ASSIGNMENTS,
  INITIAL_EXAMS,
  INITIAL_INTEGRITY_LOGS,
  INITIAL_NOTIFICATIONS,
  ENROLLED_STUDENTS_LIST
} from './mockData';

interface AppContextType {
  // Authentication & Role
  isAuthenticated: boolean;
  role: UserRole;
  currentUser: StudentProfileData | DoctorProfileData | null;
  login: (role: UserRole, credentials?: { username?: string; password?: string }) => boolean;
  logout: () => void;

  student: StudentProfileData;
  doctor: DoctorProfileData;
  courses: Course[];
  schedule: ScheduleLecture[];
  selectedSection: string;
  setSelectedSection: (section: string) => void;
  assignments: Assignment[];
  exams: Exam[];
  integrityLogs: ExamIntegrityLog[];
  notifications: NotificationItem[];
  students: EnrolledStudent[];
  activeTab: string;
  setActiveTab: (tab: string) => void;

  // Modals & Navigation state
  isQRModalOpen: boolean;
  setIsQRModalOpen: (open: boolean) => void;
  isNotificationsModalOpen: boolean;
  setIsNotificationsModalOpen: (open: boolean) => void;
  activeExamSession: Exam | null;
  setActiveExamSession: (exam: Exam | null) => void;
  selectedCourseForDetails: Course | null;
  setSelectedCourseForDetails: (course: Course | null) => void;
  selectedAssignmentForDetails: Assignment | null;
  setSelectedAssignmentForDetails: (assignment: Assignment | null) => void;
  isCreateAssignmentOpen: boolean;
  setIsCreateAssignmentOpen: (open: boolean) => void;
  isCreateExamOpen: boolean;
  setIsCreateExamOpen: (open: boolean) => void;
  isIntegrityReportOpen: boolean;
  setIsIntegrityReportOpen: (open: boolean) => void;

  // Actions
  submitAssignment: (assignmentId: string, notes: string, fileName?: string) => void;
  createAssignment: (newAssignment: Omit<Assignment, 'id' | 'status'>) => void;
  createExam: (newExam: Omit<Exam, 'id' | 'status'>) => void;
  submitExamAnswers: (examId: string, answers: Record<string, number>, warningCount: number, score: number) => void;
  recordIntegrityWarning: (examId: string, activityType: string, notes?: string) => void;
  markAttendanceQR: (courseId: string) => { success: boolean; message: string };
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  updateIntegrityLogStatus: (logId: string, status: 'يحتاج إلى مراجعة' | 'معتمد' | 'ملغى') => void;
  resetDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  AUTH: 'zu_app_auth_v2',
  ROLE: 'zu_app_role_v2',
  ASSIGNMENTS: 'zu_app_assignments_v1',
  EXAMS: 'zu_app_exams_v1',
  COURSES: 'zu_app_courses_v1',
  INTEGRITY_LOGS: 'zu_app_integrity_v1',
  NOTIFICATIONS: 'zu_app_notifications_v1',
  SECTION: 'zu_app_section_v1'
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
  });

  const [role, setRoleState] = useState<UserRole>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ROLE);
    return (saved as UserRole) || 'student';
  });

  const [student] = useState<StudentProfileData>(INITIAL_STUDENT);
  const [doctor] = useState<DoctorProfileData>(INITIAL_DOCTOR);

  const currentUser = role === 'student' ? student : doctor;

  const [selectedSection, setSelectedSectionState] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEYS.SECTION) || 'شعبة أ';
  });

  // State with localStorage backing
  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.COURSES);
    return saved ? JSON.parse(saved) : INITIAL_COURSES;
  });

  const [schedule] = useState<ScheduleLecture[]>(INITIAL_SCHEDULE);

  const [assignments, setAssignments] = useState<Assignment[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ASSIGNMENTS);
    return saved ? JSON.parse(saved) : INITIAL_ASSIGNMENTS;
  });

  const [exams, setExams] = useState<Exam[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.EXAMS);
    return saved ? JSON.parse(saved) : INITIAL_EXAMS;
  });

  const [integrityLogs, setIntegrityLogs] = useState<ExamIntegrityLog[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.INTEGRITY_LOGS);
    return saved ? JSON.parse(saved) : INITIAL_INTEGRITY_LOGS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [students] = useState<EnrolledStudent[]>(ENROLLED_STUDENTS_LIST);

  // Tab navigation
  const [activeTab, setActiveTab] = useState<string>('home');

  // Modals
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false);
  const [activeExamSession, setActiveExamSession] = useState<Exam | null>(null);
  const [selectedCourseForDetails, setSelectedCourseForDetails] = useState<Course | null>(null);
  const [selectedAssignmentForDetails, setSelectedAssignmentForDetails] = useState<Assignment | null>(null);
  const [isCreateAssignmentOpen, setIsCreateAssignmentOpen] = useState(false);
  const [isCreateExamOpen, setIsCreateExamOpen] = useState(false);
  const [isIntegrityReportOpen, setIsIntegrityReportOpen] = useState(false);

  // Login handler
  const login = (chosenRole: UserRole, _credentials?: { username?: string; password?: string }) => {
    setRoleState(chosenRole);
    setIsAuthenticated(true);
    setActiveTab('home');
    localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
    localStorage.setItem(STORAGE_KEYS.ROLE, chosenRole);
    return true;
  };

  // Logout handler
  const logout = () => {
    setIsAuthenticated(false);
    setActiveTab('home');
    localStorage.removeItem(STORAGE_KEYS.AUTH);
  };

  const setSelectedSection = (section: string) => {
    setSelectedSectionState(section);
    localStorage.setItem(STORAGE_KEYS.SECTION, section);
  };

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(assignments));
  }, [assignments]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EXAMS, JSON.stringify(exams));
  }, [exams]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.INTEGRITY_LOGS, JSON.stringify(integrityLogs));
  }, [integrityLogs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);

  // Action: Submit assignment
  const submitAssignment = (assignmentId: string, notes: string, fileName?: string) => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}`;

    setAssignments(prev =>
      prev.map(item => {
        if (item.id === assignmentId) {
          return {
            ...item,
            status: 'تم التسليم',
            submissionDate: formattedDate,
            submittedFile: fileName || 'ملف_التكليف_المعتمد.pdf',
            studentNotes: notes,
            feedback: 'تم استلام التكليف بنجاح وجارٍ مراجعته من قبل أستاذ المادة.'
          };
        }
        return item;
      })
    );

    // Add notification
    const currentAssignment = assignments.find(a => a.id === assignmentId);
    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      title: 'تم تسليم التكليف بنجاح',
      body: `تم رفع تكليف "${currentAssignment?.title || 'التكليف'}" وتسجيله في المنصة.`,
      timestamp: 'الآن',
      category: 'assignment',
      isRead: false,
      priority: 'normal'
    };
    setNotifications(prev => [newNotif, ...prev]);

    // Update pending count in course
    if (currentAssignment) {
      setCourses(prev =>
        prev.map(c =>
          c.id === currentAssignment.courseId
            ? { ...c, pendingAssignmentsCount: Math.max(0, c.pendingAssignmentsCount - 1) }
            : c
        )
      );
    }
  };

  // Action: Doctor creates assignment
  const createAssignment = (newAssignmentData: Omit<Assignment, 'id' | 'status'>) => {
    const newId = `asg_${Date.now()}`;
    const newAssignment: Assignment = {
      ...newAssignmentData,
      id: newId,
      status: 'مطلوب'
    };

    setAssignments(prev => [newAssignment, ...prev]);

    // Update course pending count
    setCourses(prev =>
      prev.map(c =>
        c.id === newAssignment.courseId
          ? { ...c, pendingAssignmentsCount: c.pendingAssignmentsCount + 1 }
          : c
      )
    );

    // Notify students
    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      title: 'تم إضافة تكليف جديد',
      body: `أضاف ${doctor.name} تكليفاً جديداً: "${newAssignment.title}" لمقرر ${newAssignment.courseName}.`,
      timestamp: 'الآن',
      category: 'assignment',
      isRead: false,
      priority: 'high'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Action: Doctor creates exam
  const createExam = (newExamData: Omit<Exam, 'id' | 'status'>) => {
    const newId = `ex_${Date.now()}`;
    const newExam: Exam = {
      ...newExamData,
      id: newId,
      status: 'نشط'
    };

    setExams(prev => [newExam, ...prev]);

    // Update course upcoming count
    setCourses(prev =>
      prev.map(c =>
        c.id === newExam.courseId
          ? { ...c, upcomingExamsCount: c.upcomingExamsCount + 1 }
          : c
      )
    );

    // Notify students
    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      title: 'تم نشر اختبار جديد متاح الآن',
      body: `نشر ${doctor.name} اختباراً جديداً: "${newExam.title}"، يمكنك البدء الآن.`,
      timestamp: 'الآن',
      category: 'exam',
      isRead: false,
      priority: 'high'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Action: Submit exam answers
  const submitExamAnswers = (
    examId: string,
    answers: Record<string, number>,
    warningCount: number,
    score: number
  ) => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}`;

    setExams(prev =>
      prev.map(ex => {
        if (ex.id === examId) {
          return {
            ...ex,
            status: 'منتهي',
            studentScore: score,
            studentAnswers: answers,
            takenAt: formattedDate
          };
        }
        return ex;
      })
    );

    // If warnings occurred, ensure logged in integrity report
    if (warningCount > 0) {
      const exam = exams.find(e => e.id === examId);
      const newLog: ExamIntegrityLog = {
        id: `int_${Date.now()}`,
        studentId: student.id,
        studentName: student.name,
        studentCode: student.studentCode,
        examId: examId,
        examTitle: exam?.title || 'الاختبار الدوري',
        courseName: exam?.courseName || 'تصميم البرمجيات التعليمية',
        activityType: `مغادرة شاشة الاختبار ${warningCount} ${warningCount > 1 ? 'مرات' : 'مرة'}`,
        timestamp: 'منذ دقيقة',
        warningCount: warningCount,
        status: 'يحتاج إلى مراجعة',
        notes: 'تم رصد تحول التركيز عن شاشة الاختبار وإصدار تنبيهات أثناء الجلسة.'
      };
      setIntegrityLogs(prev => [newLog, ...prev]);
    }

    // Add completion notification
    const exam = exams.find(e => e.id === examId);
    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      title: 'تم تسليم الاختبار ورصد النتيجة',
      body: `أكملت اختبار "${exam?.title || 'الاختبار'}" بنجاح، ودرجتك المسجلة: ${score} من ${exam?.totalMarks || 20}.`,
      timestamp: 'الآن',
      category: 'exam',
      isRead: false,
      priority: 'normal'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Action: Record integrity warning during exam
  const recordIntegrityWarning = (examId: string, activityType: string, notes?: string) => {
    const exam = exams.find(e => e.id === examId);
    const newLog: ExamIntegrityLog = {
      id: `int_${Date.now()}`,
      studentId: student.id,
      studentName: student.name,
      studentCode: student.studentCode,
      examId: examId,
      examTitle: exam?.title || 'الاختبار',
      courseName: exam?.courseName || 'المقرر الدراسي',
      activityType: activityType,
      timestamp: 'الآن',
      warningCount: 1,
      status: 'يحتاج إلى مراجعة',
      notes: notes || 'تم رصد حدث غير اعتيادي أثناء فحص نزاهة الاختبار.'
    };
    setIntegrityLogs(prev => [newLog, ...prev]);

    // Also add warning notification
    const warnNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      title: 'تنبيه نزاهة أثناء جلسة الاختبار',
      body: `تم تسجيل تنبيه "${activityType}" أثناء الاختبار وإرسال إشعار للمشرف الأكاديمي.`,
      timestamp: 'الآن',
      category: 'integrity',
      isRead: false,
      priority: 'warning'
    };
    setNotifications(prev => [warnNotif, ...prev]);
  };

  // Action: Mark attendance via QR
  const markAttendanceQR = (courseId: string) => {
    let courseName = '';
    setCourses(prev =>
      prev.map(c => {
        if (c.id === courseId) {
          courseName = c.name;
          const newAttended = c.attendedLectures + 1;
          const newTotal = c.totalLectures;
          const newRate = Math.min(100, Math.round((newAttended / newTotal) * 100));
          return {
            ...c,
            attendedLectures: newAttended,
            attendanceRate: newRate
          };
        }
        return c;
      })
    );

    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      title: 'تم تسجيل الحضور عبر رمز الاستجابة السريعة (QR)',
      body: `تم إثبات حضورك بنجاح في محاضرة اليوم لمقرر ${courseName || 'المقرر'}.`,
      timestamp: 'الآن',
      category: 'academic',
      isRead: false,
      priority: 'normal'
    };
    setNotifications(prev => [newNotif, ...prev]);

    return {
      success: true,
      message: `تم تسجيل حضورك بنجاح في ${courseName || 'المحاضرة'}`
    };
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const updateIntegrityLogStatus = (logId: string, status: 'يحتاج إلى مراجعة' | 'معتمد' | 'ملغى') => {
    setIntegrityLogs(prev =>
      prev.map(l => (l.id === logId ? { ...l, status } : l))
    );
  };

  const resetDemoData = () => {
    localStorage.clear();
    setCourses(INITIAL_COURSES);
    setAssignments(INITIAL_ASSIGNMENTS);
    setExams(INITIAL_EXAMS);
    setIntegrityLogs(INITIAL_INTEGRITY_LOGS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setSelectedSectionState('شعبة أ');
    setActiveExamSession(null);
    setSelectedCourseForDetails(null);
    setSelectedAssignmentForDetails(null);
    setIsCreateAssignmentOpen(false);
    setIsCreateExamOpen(false);
    setIsIntegrityReportOpen(false);
    setIsQRModalOpen(false);
    setIsNotificationsModalOpen(false);
    setActiveTab('home');
    setIsAuthenticated(false);
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        role,
        currentUser,
        login,
        logout,

        student,
        doctor,
        courses,
        schedule,
        selectedSection,
        setSelectedSection,
        assignments,
        exams,
        integrityLogs,
        notifications,
        students,
        activeTab,
        setActiveTab,

        isQRModalOpen,
        setIsQRModalOpen,
        isNotificationsModalOpen,
        setIsNotificationsModalOpen,
        activeExamSession,
        setActiveExamSession,
        selectedCourseForDetails,
        setSelectedCourseForDetails,
        selectedAssignmentForDetails,
        setSelectedAssignmentForDetails,
        isCreateAssignmentOpen,
        setIsCreateAssignmentOpen,
        isCreateExamOpen,
        setIsCreateExamOpen,
        isIntegrityReportOpen,
        setIsIntegrityReportOpen,

        submitAssignment,
        createAssignment,
        createExam,
        submitExamAnswers,
        recordIntegrityWarning,
        markAttendanceQR,
        markNotificationRead,
        markAllNotificationsRead,
        updateIntegrityLogStatus,
        resetDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

