import React from 'react';
import { useApp } from './AppContext';
import {
  Users,
  BookOpen,
  ClipboardList,
  FileCheck2,
  ShieldAlert,
  PlusCircle,
  Clock,
  MapPin,
  ChevronLeft,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

export const DoctorHome: React.FC = () => {
  const {
    doctor,
    courses,
    assignments,
    exams,
    integrityLogs,
    students,
    setIsCreateAssignmentOpen,
    setIsCreateExamOpen,
    setIsIntegrityReportOpen,
    setActiveTab,
    logout
  } = useApp();

  // Review queue: assignments that have been submitted
  const submittedAssignments = assignments.filter(a => a.status === 'تم التسليم');
  
  // Pending integrity logs
  const pendingIntegrityLogs = integrityLogs.filter(l => l.status === 'يحتاج إلى مراجعة');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Doctor Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
        color: '#ffffff',
        borderRadius: '18px',
        padding: '18px 16px',
        boxShadow: '0 8px 20px -4px rgba(30, 58, 138, 0.3)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-25px',
          left: '-25px',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.08)'
        }} />

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
          <div>
            <div style={{ fontSize: '11px', color: '#bfdbfe', fontWeight: '700', marginBottom: '4px' }}>
              بوابة عضو هيئة التدريس
            </div>
            <h1 style={{ fontSize: '17px', fontWeight: '900', marginBottom: '4px' }}>
              {doctor.name}
            </h1>
            <div style={{ fontSize: '11px', color: '#e2e8f0', lineHeight: 1.4 }}>
              {doctor.title} • {doctor.department}
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
            fontSize: '15px',
            fontWeight: '900',
            color: '#ffffff'
          }}>
            أ.د
          </div>
        </div>
      </div>

      {/* Doctor Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
        <div
          onClick={() => setActiveTab('courses')}
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '14px',
            padding: '12px 10px',
            border: '1px solid #e2e8f0',
            textAlign: 'center',
            cursor: 'pointer'
          }}
        >
          <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '700' }}>المقررات</div>
          <div style={{ fontSize: '18px', fontWeight: '900', color: '#1e3a8a' }}>{courses.length}</div>
          <div style={{ fontSize: '10px', color: '#2563eb' }}>قيد التدريس</div>
        </div>

        <div
          onClick={() => setActiveTab('students')}
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '14px',
            padding: '12px 10px',
            border: '1px solid #e2e8f0',
            textAlign: 'center',
            cursor: 'pointer'
          }}
        >
          <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '700' }}>إجمالي الطلاب</div>
          <div style={{ fontSize: '18px', fontWeight: '900', color: '#059669' }}>{students.length * 24}</div>
          <div style={{ fontSize: '10px', color: '#16a34a' }}>طالب مسجل</div>
        </div>

        <div
          onClick={() => setActiveTab('assignments')}
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '14px',
            padding: '12px 10px',
            border: '1px solid #e2e8f0',
            textAlign: 'center',
            cursor: 'pointer'
          }}
        >
          <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '700' }}>تكليفات للمراجعة</div>
          <div style={{ fontSize: '18px', fontWeight: '900', color: '#d97706' }}>{submittedAssignments.length}</div>
          <div style={{ fontSize: '10px', color: '#b45309' }}>تم تسليمها</div>
        </div>
      </div>

      {/* Fast Action Buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        <button
          onClick={() => setIsCreateAssignmentOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            backgroundColor: '#1e3a8a',
            color: '#ffffff',
            padding: '10px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: '700',
            boxShadow: '0 2px 6px rgba(30,58,138,0.25)'
          }}
        >
          <PlusCircle size={15} />
          <span>إضافة تكليف جديد</span>
        </button>

        <button
          onClick={() => setIsCreateExamOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            backgroundColor: '#d97706',
            color: '#ffffff',
            padding: '10px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: '700',
            boxShadow: '0 2px 6px rgba(217,119,6,0.25)'
          }}
        >
          <Sparkles size={15} />
          <span>إنشاء اختبار جديد</span>
        </button>
      </div>

      {/* Exam Integrity Alert Card */}
      <div style={{
        backgroundColor: '#fffdf5',
        borderRadius: '16px',
        border: '1.5px solid #fcd34d',
        padding: '14px 16px',
        boxShadow: '0 2px 6px rgba(217,119,6,0.08)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldAlert size={16} color="#d97706" />
            <h3 style={{ fontSize: '13px', fontWeight: '800', color: '#92400e' }}>
              فحص نزاهة الاختبارات
            </h3>
          </div>
          <span style={{
            fontSize: '10px',
            fontWeight: '800',
            backgroundColor: '#fef3c7',
            color: '#92400e',
            padding: '2px 8px',
            borderRadius: '10px'
          }}>
            {pendingIntegrityLogs.length} حالات تحتاج مراجعة
          </span>
        </div>

        <p style={{ fontSize: '11px', color: '#78350f', lineHeight: 1.5, marginBottom: '10px' }}>
          تم رصد أنشطة ملحوظة (مغادرة شاشة الاختبار، انقطاع اتصال) أثناء الجلسات الأخيرة وتتطلب مراجعة الأستاذ.
        </p>

        <button
          onClick={() => setIsIntegrityReportOpen(true)}
          style={{
            width: '100%',
            backgroundColor: '#ffffff',
            border: '1px solid #fcd34d',
            color: '#92400e',
            padding: '8px',
            borderRadius: '10px',
            fontSize: '11px',
            fontWeight: '800',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px'
          }}
        >
          <span>فتح تقرير نزاهة الاختبار التفصيلي</span>
          <ChevronLeft size={14} />
        </button>
      </div>

      {/* Courses Taught Overview */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <BookOpen size={16} color="#1e3a8a" />
            <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a' }}>
              المقررات التي يدرسها الدكتور
            </h3>
          </div>
          <button
            onClick={() => setActiveTab('courses')}
            style={{ fontSize: '11px', fontWeight: '700', color: '#2563eb' }}
          >
            عرض التفاصيل ←
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {courses.slice(0, 3).map(c => (
            <div
              key={c.id}
              onClick={() => setActiveTab('courses')}
              style={{
                padding: '10px 12px',
                borderRadius: '10px',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <span style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a' }}>
                  {c.name}
                </span>
                <span style={{ fontSize: '10px', fontWeight: '700', color: '#2563eb', backgroundColor: '#eff6ff', padding: '2px 6px', borderRadius: '6px' }}>
                  {c.code}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '12px', fontSize: '11px', color: '#64748b' }}>
                <span>{c.academicYear}</span>
                <span>•</span>
                <span>القاعة: {c.hall}</span>
                <span>•</span>
                <span>نسبة الحضور: {c.attendanceRate}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Doctor Logout Action */}
      <button
        onClick={logout}
        className="btn btn-outline btn-block"
        style={{
          padding: '12px',
          color: '#dc2626',
          borderColor: '#fca5a5',
          backgroundColor: '#fef2f2',
          fontWeight: '800'
        }}
      >
        <span>تسجيل الخروج من حساب عضو هيئة التدريس</span>
      </button>
    </div>
  );
};

