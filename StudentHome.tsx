import React from 'react';
import { useApp } from './AppContext';
import {
  Calendar,
  Clock,
  MapPin,
  User,
  CheckCircle2,
  AlertCircle,
  FileText,
  QrCode,
  Compass,
  ArrowLeft,
  ChevronLeft,
  Bell,
  Sparkles,
  BookOpen
} from 'lucide-react';

export const StudentHome: React.FC = () => {
  const {
    student,
    courses,
    schedule,
    selectedSection,
    assignments,
    exams,
    notifications,
    setIsQRModalOpen,
    setActiveExamSession,
    setSelectedAssignmentForDetails,
    setSelectedCourseForDetails,
    setActiveTab
  } = useApp();

  // Find next lecture (Saturday or first available in schedule for current section)
  const currentSectionSchedule = schedule.filter(
    s => s.section === selectedSection || s.section === 'جميع الشعب'
  );
  const nextLecture = currentSectionSchedule[0] || schedule[0];

  // Overall attendance calculation
  const totalLectures = courses.reduce((acc, c) => acc + c.totalLectures, 0);
  const totalAttended = courses.reduce((acc, c) => acc + c.attendedLectures, 0);
  const overallAttendance = Math.round((totalAttended / (totalLectures || 1)) * 100);

  // Pending assignments
  const pendingAssignments = assignments.filter(a => a.status === 'مطلوب');
  
  // Active/Upcoming exams
  const activeExam = exams.find(e => e.status === 'نشط');
  const upcomingExams = exams.filter(e => e.status === 'قادم');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Greeting Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
        color: '#ffffff',
        borderRadius: '18px',
        padding: '18px 16px',
        boxShadow: '0 8px 20px -4px rgba(30, 58, 138, 0.3)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle decorative background circle */}
        <div style={{
          position: 'absolute',
          top: '-20px',
          left: '-20px',
          width: '110px',
          height: '110px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.08)'
        }} />

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <span style={{ fontSize: '12px', color: '#bfdbfe', fontWeight: '600' }}>
                مرحباً بك مجدداً 👋
              </span>
            </div>
            <h1 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '6px', letterSpacing: '-0.3px' }}>
              صباح الخير، {student.name.split(' ')[0]}
            </h1>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(8px)',
              padding: '4px 10px',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: '600'
            }}>
              <span>{student.academicYear}</span>
              <span>•</span>
              <span>{student.department}</span>
              <span>•</span>
              <span style={{ color: '#fde047' }}>{selectedSection}</span>
            </div>
          </div>

          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid rgba(255,255,255,0.35)',
            fontSize: '16px',
            fontWeight: '800',
            color: '#ffffff'
          }}>
            م.أ
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
        {/* Attendance Card */}
        <div
          onClick={() => setIsQRModalOpen(true)}
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '14px',
            padding: '12px 10px',
            border: '1px solid #e2e8f0',
            textAlign: 'center',
            cursor: 'pointer',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
          }}
        >
          <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '700', marginBottom: '2px' }}>
            نسبة الحضور
          </div>
          <div style={{ fontSize: '18px', fontWeight: '900', color: '#15803d' }}>
            {overallAttendance}%
          </div>
          <div style={{ fontSize: '10px', color: '#16a34a', fontWeight: '600', marginTop: '2px' }}>
            منتظم وممتاز
          </div>
        </div>

        {/* Pending Assignments */}
        <div
          onClick={() => setActiveTab('assignments')}
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '14px',
            padding: '12px 10px',
            border: '1px solid #e2e8f0',
            textAlign: 'center',
            cursor: 'pointer',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
          }}
        >
          <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '700', marginBottom: '2px' }}>
            تكليفات مطلوبة
          </div>
          <div style={{ fontSize: '18px', fontWeight: '900', color: '#d97706' }}>
            {pendingAssignments.length}
          </div>
          <div style={{ fontSize: '10px', color: '#b45309', fontWeight: '600', marginTop: '2px' }}>
            تحتاج تسليم
          </div>
        </div>

        {/* Upcoming Exams */}
        <div
          onClick={() => setActiveTab('exams')}
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '14px',
            padding: '12px 10px',
            border: '1px solid #e2e8f0',
            textAlign: 'center',
            cursor: 'pointer',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
          }}
        >
          <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '700', marginBottom: '2px' }}>
            الاختبارات
          </div>
          <div style={{ fontSize: '18px', fontWeight: '900', color: '#2563eb' }}>
            {activeExam ? '1 نشط' : upcomingExams.length}
          </div>
          <div style={{ fontSize: '10px', color: '#2563eb', fontWeight: '600', marginTop: '2px' }}>
            {activeExam ? 'متاح الآن!' : 'قادمة'}
          </div>
        </div>
      </div>

      {/* Quick Action Shortcuts */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={() => setIsQRModalOpen(true)}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            backgroundColor: '#eff6ff',
            border: '1px solid #bfdbfe',
            color: '#1e40af',
            padding: '10px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: '700'
          }}
        >
          <QrCode size={16} />
          <span>تسجيل حضور QR</span>
        </button>

        <button
          onClick={() => setActiveTab('schedule')}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            color: '#334155',
            padding: '10px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: '700'
          }}
        >
          <Compass size={16} />
          <span>استكشاف الشعب</span>
        </button>
      </div>

      {/* Next Lecture Card */}
      {nextLecture && (
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1.5px solid #dbeafe',
          padding: '16px',
          boxShadow: '0 4px 12px rgba(30, 58, 138, 0.06)',
          position: 'relative'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#2563eb',
                display: 'inline-block'
              }} />
              <span style={{ fontSize: '12px', fontWeight: '800', color: '#1e40af' }}>
                محاضرتك القادمة
              </span>
            </div>
            <span style={{
              fontSize: '11px',
              fontWeight: '700',
              color: '#0369a1',
              backgroundColor: '#e0f2fe',
              padding: '2px 8px',
              borderRadius: '12px'
            }}>
              {nextLecture.day}
            </span>
          </div>

          <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
            {nextLecture.courseName}
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px', color: '#475569' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={14} color="#64748b" />
              <span>{nextLecture.startTime} – {nextLecture.endTime}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={14} color="#64748b" />
              <span>{nextLecture.hall}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <User size={14} color="#64748b" />
              <span>{nextLecture.doctorName}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{
                fontSize: '11px',
                fontWeight: '700',
                color: nextLecture.lectureType === 'عملي' ? '#059669' : '#1e40af',
                backgroundColor: nextLecture.lectureType === 'عملي' ? '#d1fae5' : '#eff6ff',
                padding: '1px 8px',
                borderRadius: '6px'
              }}>
                {nextLecture.lectureType}
              </span>
            </div>
          </div>

          <div style={{
            marginTop: '12px',
            paddingTop: '10px',
            borderTop: '1px solid #f1f5f9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <span style={{ fontSize: '11px', color: '#64748b', fontWeight: '600' }}>
              تأكيد التواجد بالقاعة
            </span>
            <button
              onClick={() => setIsQRModalOpen(true)}
              style={{
                fontSize: '11px',
                fontWeight: '700',
                color: '#1d4ed8',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span>تسجيل الحضور</span>
              <ChevronLeft size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Active Exam Alert Banner */}
      {activeExam && (
        <div style={{
          backgroundColor: '#fffbeb',
          border: '1.5px solid #fcd34d',
          borderRadius: '16px',
          padding: '14px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={16} color="#d97706" />
              <span style={{ fontSize: '13px', fontWeight: '800', color: '#92400e' }}>
                اختبار متاح الآن للتقديم
              </span>
            </div>
            <span style={{
              fontSize: '11px',
              fontWeight: '700',
              backgroundColor: '#fef3c7',
              color: '#b45309',
              padding: '2px 8px',
              borderRadius: '6px'
            }}>
              {activeExam.durationMinutes} دقيقة
            </span>
          </div>

          <div style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>
            {activeExam.title}
          </div>
          <div style={{ fontSize: '11px', color: '#78350f' }}>
            مقرر: {activeExam.courseName} • عدد الأسئلة: {activeExam.totalQuestions}
          </div>

          <button
            onClick={() => setActiveExamSession(activeExam)}
            style={{
              marginTop: '4px',
              backgroundColor: '#d97706',
              color: '#ffffff',
              padding: '8px 14px',
              borderRadius: '10px',
              fontSize: '12px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              boxShadow: '0 2px 6px rgba(217, 119, 6, 0.3)'
            }}
          >
            <span>بدء الامتحان الآن</span>
            <ChevronLeft size={15} />
          </button>
        </div>
      )}

      {/* Upcoming Assignments List */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <FileText size={16} color="#1e40af" />
            <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a' }}>
              التكليفات القادمة
            </h3>
          </div>
          <button
            onClick={() => setActiveTab('assignments')}
            style={{ fontSize: '11px', fontWeight: '700', color: '#2563eb' }}
          >
            عرض الكل ({assignments.length})
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {assignments.slice(0, 2).map(asg => (
            <div
              key={asg.id}
              onClick={() => setSelectedAssignmentForDetails(asg)}
              style={{
                padding: '10px 12px',
                borderRadius: '10px',
                backgroundColor: asg.status === 'مطلوب' ? '#fffdf7' : '#f8fafc',
                border: asg.status === 'مطلوب' ? '1px solid #fed7aa' : '1px solid #e2e8f0',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '12px', fontWeight: '800', color: '#0f172a' }}>
                  {asg.title}
                </span>
                <span style={{
                  fontSize: '10px',
                  fontWeight: '700',
                  padding: '2px 6px',
                  borderRadius: '6px',
                  backgroundColor: asg.status === 'تم التسليم' ? '#dcfce7' : asg.status === 'متأخر' ? '#fee2e2' : '#fef3c7',
                  color: asg.status === 'تم التسليم' ? '#15803d' : asg.status === 'متأخر' ? '#b91c1c' : '#b45309'
                }}>
                  {asg.status}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', color: '#64748b' }}>
                <span>{asg.courseName}</span>
                <span>تسليم: {asg.dueDate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* University & Department Announcements */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
          <Bell size={16} color="#d97706" />
          <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a' }}>
            إعلانات الكلية المهمة
          </h3>
        </div>

        <div style={{
          backgroundColor: '#eff6ff',
          borderRadius: '12px',
          padding: '12px',
          border: '1px solid #bfdbfe',
          marginBottom: '8px'
        }}>
          <div style={{ fontSize: '12px', fontWeight: '800', color: '#1e3a8a', marginBottom: '3px' }}>
            معرض مشروعات التخرج والابتكار الرقمي 2026
          </div>
          <div style={{ fontSize: '11px', color: '#334155', lineHeight: 1.5 }}>
            تعلن إدارة كلية التربية النوعية بجامعة الزقازيق عن فتح باب تسجيل المشاريع الرقمية لقسم تكنولوجيا التعليم للمشاركة بالملتقى السنوي.
          </div>
        </div>

        <div style={{
          backgroundColor: '#f8fafc',
          borderRadius: '12px',
          padding: '12px',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ fontSize: '12px', fontWeight: '800', color: '#334155', marginBottom: '3px' }}>
            تحديث جداول الفصول الدراسية الذكية
          </div>
          <div style={{ fontSize: '11px', color: '#64748b', lineHeight: 1.5 }}>
            يرجى من جميع الطلاب مراجعة قاعات المحاضرات العملية عبر المنصة والتأكد من تثبيت الحضور عبر QR أسبوعياً.
          </div>
        </div>
      </div>
    </div>
  );
};

