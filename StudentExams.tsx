import React, { useState } from 'react';
import { useApp } from './AppContext';
import {
  FileCheck2,
  Calendar,
  Clock,
  User,
  AlertCircle,
  CheckCircle2,
  Play,
  HelpCircle,
  Award,
  ChevronLeft,
  X
} from 'lucide-react';
import { Exam } from './types';

export const StudentExams: React.FC = () => {
  const { exams, setActiveExamSession } = useApp();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [selectedExamForDetails, setSelectedExamForDetails] = useState<Exam | null>(null);

  const upcomingExams = exams.filter(e => e.status === 'قادم' || e.status === 'نشط');
  const pastExams = exams.filter(e => e.status === 'منتهي');

  const displayedExams = activeTab === 'upcoming' ? upcomingExams : pastExams;

  const handleStartExam = (exam: Exam) => {
    setSelectedExamForDetails(null);
    setActiveExamSession(exam);
  };

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
          الاختبارات والتقييمات الأكاديمية
        </h2>
        <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '600' }}>
          الاختبارات الدورية ومنتصف الفصل ونهاية العام
        </div>
      </div>

      {/* Tabs: Upcoming vs Past */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={() => setActiveTab('upcoming')}
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: activeTab === 'upcoming' ? '800' : '600',
            backgroundColor: activeTab === 'upcoming' ? '#1e3a8a' : '#ffffff',
            color: activeTab === 'upcoming' ? '#ffffff' : '#475569',
            border: activeTab === 'upcoming' ? '1px solid #1e3a8a' : '1px solid #e2e8f0',
            boxShadow: activeTab === 'upcoming' ? '0 3px 8px rgba(30,58,138,0.2)' : 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}
        >
          <span>الامتحانات القادمة والنشطة</span>
          <span style={{
            fontSize: '10px',
            backgroundColor: activeTab === 'upcoming' ? 'rgba(255,255,255,0.25)' : '#eff6ff',
            color: activeTab === 'upcoming' ? '#ffffff' : '#1e40af',
            padding: '1px 6px',
            borderRadius: '10px',
            fontWeight: '700'
          }}>
            {upcomingExams.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('past')}
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: activeTab === 'past' ? '800' : '600',
            backgroundColor: activeTab === 'past' ? '#1e3a8a' : '#ffffff',
            color: activeTab === 'past' ? '#ffffff' : '#475569',
            border: activeTab === 'past' ? '1px solid #1e3a8a' : '1px solid #e2e8f0',
            boxShadow: activeTab === 'past' ? '0 3px 8px rgba(30,58,138,0.2)' : 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}
        >
          <span>الامتحانات السابقة</span>
          <span style={{
            fontSize: '10px',
            backgroundColor: activeTab === 'past' ? 'rgba(255,255,255,0.25)' : '#f1f5f9',
            color: activeTab === 'past' ? '#ffffff' : '#64748b',
            padding: '1px 6px',
            borderRadius: '10px',
            fontWeight: '700'
          }}>
            {pastExams.length}
          </span>
        </button>
      </div>

      {/* Exams Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {displayedExams.map(exam => {
          const isActive = exam.status === 'نشط';

          return (
            <div
              key={exam.id}
              onClick={() => setSelectedExamForDetails(exam)}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                border: isActive ? '1.5px solid #60a5fa' : '1px solid #e2e8f0',
                padding: '16px',
                boxShadow: isActive ? '0 4px 12px rgba(37,99,235,0.1)' : '0 2px 5px rgba(0,0,0,0.04)',
                cursor: 'pointer',
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{
                  fontSize: '11px',
                  fontWeight: '700',
                  color: '#2563eb',
                  backgroundColor: '#eff6ff',
                  padding: '2px 8px',
                  borderRadius: '6px'
                }}>
                  {exam.courseName}
                </span>

                <span style={{
                  fontSize: '11px',
                  fontWeight: '800',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  backgroundColor: isActive ? '#fef3c7' : exam.status === 'منتهي' ? '#dcfce7' : '#f1f5f9',
                  color: isActive ? '#b45309' : exam.status === 'منتهي' ? '#15803d' : '#475569',
                  border: isActive ? '1px solid #fcd34d' : '1px solid transparent'
                }}>
                  {isActive ? 'متاح للبدء الآن' : exam.status === 'منتهي' ? 'تم الانتهاء' : 'مجدول'}
                </span>
              </div>

              <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                {exam.title}
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', fontSize: '11px', color: '#64748b' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={13} color="#64748b" />
                  <span>{exam.date}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={13} color="#64748b" />
                  <span>المدة: {exam.durationMinutes} دقيقة</span>
                </div>
              </div>

              {exam.studentScore !== undefined && (
                <div style={{
                  marginTop: '10px',
                  paddingTop: '8px',
                  borderTop: '1px solid #f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '12px'
                }}>
                  <span style={{ fontWeight: '800', color: '#15803d' }}>
                    الدرجة المسجلة: {exam.studentScore} من {exam.totalMarks}
                  </span>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>
                    تاريخ التسليم: {exam.takenAt || 'مكتمل'}
                  </span>
                </div>
              )}

              {isActive && (
                <div style={{
                  marginTop: '10px',
                  paddingTop: '8px',
                  borderTop: '1px solid #eff6ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <span style={{ fontSize: '11px', color: '#d97706', fontWeight: '700' }}>
                    جاهز للاختبار الآن
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStartExam(exam);
                    }}
                    style={{
                      backgroundColor: '#2563eb',
                      color: '#ffffff',
                      padding: '5px 12px',
                      borderRadius: '8px',
                      fontSize: '11px',
                      fontWeight: '700',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Play size={12} fill="#ffffff" />
                    <span>بدء الامتحان</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Exam Details Sheet */}
      {selectedExamForDetails && (
        <div className="modal-overlay" onClick={() => setSelectedExamForDetails(null)}>
          <div className="bottom-sheet" onClick={e => e.stopPropagation()}>
            <div className="sheet-handle" />
            <div className="sheet-header">
              <div>
                <span style={{ fontSize: '10px', color: '#2563eb', fontWeight: '800' }}>
                  {selectedExamForDetails.courseName}
                </span>
                <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a' }}>
                  بيانات وتعليمات الاختبار
                </h3>
              </div>
              <button
                onClick={() => setSelectedExamForDetails(null)}
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
              {/* Exam Info Card */}
              <div style={{
                backgroundColor: '#f8fafc',
                borderRadius: '12px',
                padding: '14px',
                border: '1px solid #e2e8f0',
                marginBottom: '14px'
              }}>
                <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a', marginBottom: '10px' }}>
                  {selectedExamForDetails.title}
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px', color: '#475569' }}>
                  <div>المقرر: <strong style={{ color: '#0f172a' }}>{selectedExamForDetails.courseName}</strong></div>
                  <div>أستاذ المادة: <strong style={{ color: '#0f172a' }}>{selectedExamForDetails.doctorName}</strong></div>
                  <div>التاريخ: <strong style={{ color: '#0f172a' }}>{selectedExamForDetails.date}</strong></div>
                  <div>التوقيت: <strong style={{ color: '#0f172a' }}>{selectedExamForDetails.time}</strong></div>
                  <div>المدة المحددة: <strong style={{ color: '#2563eb' }}>{selectedExamForDetails.durationMinutes} دقيقة</strong></div>
                  <div>عدد الأسئلة: <strong style={{ color: '#0f172a' }}>{selectedExamForDetails.totalQuestions} أسئلة</strong></div>
                  <div>الدرجة الكلية: <strong style={{ color: '#15803d' }}>{selectedExamForDetails.totalMarks} درجات</strong></div>
                  <div>الشعبة: <strong style={{ color: '#0f172a' }}>{selectedExamForDetails.section}</strong></div>
                </div>
              </div>

              {/* Instructions */}
              <div style={{ marginBottom: '18px' }}>
                <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                  تعليمات الاختبار وقواعد النزاهة
                </h4>
                <div style={{
                  backgroundColor: '#fffdf5',
                  border: '1px solid #fef3c7',
                  borderRadius: '12px',
                  padding: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}>
                  {selectedExamForDetails.instructions.map((inst, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '11px', color: '#78350f', lineHeight: 1.5 }}>
                      <span style={{ fontWeight: '800' }}>•</span>
                      <span>{inst}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Primary Action Button */}
              {selectedExamForDetails.status === 'منتهي' ? (
                <div style={{
                  backgroundColor: '#dcfce7',
                  border: '1px solid #86efac',
                  color: '#15803d',
                  padding: '12px',
                  borderRadius: '12px',
                  textAlign: 'center',
                  fontWeight: '800',
                  fontSize: '13px'
                }}>
                  تم أداء هذا الاختبار سابقاً. درجتك: {selectedExamForDetails.studentScore} من {selectedExamForDetails.totalMarks}
                </div>
              ) : (
                <button
                  onClick={() => handleStartExam(selectedExamForDetails)}
                  className="btn btn-primary btn-block"
                  style={{ padding: '12px', fontSize: '14px' }}
                >
                  <Play size={16} fill="#ffffff" />
                  <span>بدء الامتحان الآن</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

