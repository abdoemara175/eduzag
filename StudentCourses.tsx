import React from 'react';
import { useApp } from './AppContext';
import {
  BookOpen,
  User,
  Clock,
  MapPin,
  CheckCircle2,
  FileText,
  FileCheck2,
  FileDown,
  ExternalLink,
  ChevronLeft,
  X
} from 'lucide-react';
import { Course } from './types';

export const StudentCourses: React.FC = () => {
  const {
    courses,
    selectedCourseForDetails,
    setSelectedCourseForDetails,
    setIsQRModalOpen
  } = useApp();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        padding: '14px 16px',
        border: '1px solid #e2e8f0'
      }}>
        <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a' }}>
          المقررات الدراسية المسجلة
        </h2>
        <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '600' }}>
          قسم تكنولوجيا التعليم • 5 مقررات معتمدة
        </div>
      </div>

      {/* Courses List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {courses.map(course => (
          <div
            key={course.id}
            onClick={() => setSelectedCourseForDetails(course)}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              padding: '16px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {/* Top row: Code & Name */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div>
                <span style={{
                  fontSize: '10px',
                  fontWeight: '800',
                  color: '#2563eb',
                  backgroundColor: '#eff6ff',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  display: 'inline-block',
                  marginBottom: '4px'
                }}>
                  {course.code} • {course.creditHours} ساعات معتمدة
                </span>
                <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a', lineHeight: 1.3 }}>
                  {course.name}
                </h3>
              </div>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#64748b'
              }}>
                <ChevronLeft size={16} />
              </div>
            </div>

            {/* Doctor & Location */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: '#475569', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <User size={13} color="#64748b" />
                <span>{course.doctorName}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={13} color="#64748b" />
                <span>{course.hall}</span>
              </div>
            </div>

            {/* Attendance Progress Bar */}
            <div style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                <span style={{ fontWeight: '700', color: '#475569' }}>نسبة الحضور</span>
                <span style={{
                  fontWeight: '800',
                  color: course.attendanceRate >= 85 ? '#15803d' : '#d97706'
                }}>
                  {course.attendanceRate}% ({course.attendedLectures} من {course.totalLectures} محاضرة)
                </span>
              </div>
              <div style={{
                height: '7px',
                backgroundColor: '#f1f5f9',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  height: '100%',
                  width: `${course.attendanceRate}%`,
                  backgroundColor: course.attendanceRate >= 85 ? '#16a34a' : '#f59e0b',
                  borderRadius: '4px',
                  transition: 'width 0.5s ease'
                }} />
              </div>
            </div>

            {/* Bottom Metrics Pill */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '10px',
              borderTop: '1px solid #f8fafc',
              fontSize: '11px',
              color: '#64748b'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: course.pendingAssignmentsCount > 0 ? '#b45309' : '#15803d',
                  fontWeight: '700'
                }}>
                  <FileText size={13} />
                  <span>{course.pendingAssignmentsCount} تكليفات مطلوبة</span>
                </span>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: '#2563eb',
                  fontWeight: '700'
                }}>
                  <FileCheck2 size={13} />
                  <span>{course.upcomingExamsCount} اختبارات قادمة</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Course Details Bottom Sheet */}
      {selectedCourseForDetails && (
        <div className="modal-overlay" onClick={() => setSelectedCourseForDetails(null)}>
          <div className="bottom-sheet" onClick={e => e.stopPropagation()}>
            <div className="sheet-handle" />
            <div className="sheet-header">
              <div>
                <span style={{ fontSize: '10px', color: '#2563eb', fontWeight: '800' }}>
                  {selectedCourseForDetails.code}
                </span>
                <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a' }}>
                  {selectedCourseForDetails.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedCourseForDetails(null)}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#475569'
                }}
              >
                <X size={18} />
              </button>
            </div>

            <div className="sheet-body">
              {/* Doctor & Lecture Info */}
              <div style={{
                backgroundColor: '#f8fafc',
                borderRadius: '12px',
                padding: '12px',
                marginBottom: '14px',
                border: '1px solid #e2e8f0',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                fontSize: '12px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>أستاذ المقرر:</span>
                  <span style={{ fontWeight: '700', color: '#0f172a' }}>{selectedCourseForDetails.doctorName}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>الموعد الأسبوعي:</span>
                  <span style={{ fontWeight: '700', color: '#0f172a' }}>{selectedCourseForDetails.dayOfWeek} ({selectedCourseForDetails.timeSlot})</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>المكان / القاعة:</span>
                  <span style={{ fontWeight: '700', color: '#0f172a' }}>{selectedCourseForDetails.hall}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>طبيعة المحاضرة:</span>
                  <span style={{ fontWeight: '700', color: '#2563eb' }}>{selectedCourseForDetails.lectureType}</span>
                </div>
              </div>

              {/* Course Description */}
              <div style={{ marginBottom: '16px' }}>
                <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a', marginBottom: '6px' }}>
                  وصف المقرر
                </h4>
                <p style={{ fontSize: '12px', color: '#475569', lineHeight: 1.6 }}>
                  {selectedCourseForDetails.description}
                </p>
              </div>

              {/* Course Syllabus / Topics */}
              <div style={{ marginBottom: '16px' }}>
                <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                  الخطة الدراسية والموضوعات
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {selectedCourseForDetails.syllabus.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 12px',
                        borderRadius: '10px',
                        backgroundColor: item.status === 'current' ? '#eff6ff' : '#ffffff',
                        border: item.status === 'current' ? '1px solid #bfdbfe' : '1px solid #e2e8f0',
                        fontSize: '12px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{
                          width: '22px',
                          height: '22px',
                          borderRadius: '50%',
                          backgroundColor: item.status === 'completed' ? '#dcfce7' : item.status === 'current' ? '#dbeafe' : '#f1f5f9',
                          color: item.status === 'completed' ? '#15803d' : item.status === 'current' ? '#1e40af' : '#64748b',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '10px',
                          fontWeight: '800'
                        }}>
                          {item.week}
                        </span>
                        <span style={{ fontWeight: item.status === 'current' ? '800' : '600', color: '#0f172a' }}>
                          {item.title}
                        </span>
                      </div>
                      <span style={{
                        fontSize: '10px',
                        fontWeight: '700',
                        color: item.status === 'completed' ? '#15803d' : item.status === 'current' ? '#1d4ed8' : '#94a3b8'
                      }}>
                        {item.status === 'completed' ? 'مكتمل' : item.status === 'current' ? 'الأسبوع الحالي' : 'قادم'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resources & Downloads */}
              <div style={{ marginBottom: '16px' }}>
                <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                  الملفات والمراجع التعليمية
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {selectedCourseForDetails.resources.map((res, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 12px',
                        borderRadius: '10px',
                        backgroundColor: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        fontSize: '12px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FileDown size={16} color="#2563eb" />
                        <div>
                          <div style={{ fontWeight: '700', color: '#0f172a' }}>{res.title}</div>
                          {res.size && <div style={{ fontSize: '10px', color: '#94a3b8' }}>{res.size}</div>}
                        </div>
                      </div>
                      <button
                        onClick={() => alert(`جاري تنزيل ملف "${res.title}"...`)}
                        style={{
                          fontSize: '11px',
                          fontWeight: '700',
                          color: '#2563eb',
                          backgroundColor: '#eff6ff',
                          padding: '4px 8px',
                          borderRadius: '6px'
                        }}
                      >
                        تحميل
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => {
                  setSelectedCourseForDetails(null);
                  setIsQRModalOpen(true);
                }}
                className="btn btn-primary btn-block"
              >
                تسجيل حضور بالمحاضرة عبر QR
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

