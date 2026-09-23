import React, { useState } from 'react';
import { useApp } from './AppContext';
import {
  QrCode,
  CheckCircle2,
  AlertCircle,
  Clock,
  BookOpen,
  X,
  ScanLine,
  Camera
} from 'lucide-react';

interface AttendanceModalProps {
  onClose: () => void;
}

export const AttendanceModal: React.FC<AttendanceModalProps> = ({ onClose }) => {
  const { courses, markAttendanceQR } = useApp();
  const [activeTab, setActiveTab] = useState<'summary' | 'qr'>('qr');
  const [scanResult, setScanResult] = useState<string | null>(null);

  // Stats calculation
  const totalLectures = courses.reduce((acc, c) => acc + c.totalLectures, 0);
  const totalAttended = courses.reduce((acc, c) => acc + c.attendedLectures, 0);
  const totalAbsence = courses.reduce((acc, c) => acc + c.absenceCount, 0);
  const totalLate = courses.reduce((acc, c) => acc + c.lateCount, 0);
  const overallRate = Math.round((totalAttended / (totalLectures || 1)) * 100);

  // Today's course to attend
  const currentCourse = courses[0]; // e.g. تصميم وإنتاج البرمجيات التعليمية

  const handleSimulateScan = () => {
    const res = markAttendanceQR(currentCourse.id);
    setScanResult(res.message);
    setTimeout(() => {
      setScanResult(null);
      setActiveTab('summary');
    }, 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="bottom-sheet" onClick={e => e.stopPropagation()} style={{ maxHeight: '90%' }}>
        <div className="sheet-handle" />
        
        {/* Header */}
        <div className="sheet-header">
          <div>
            <span style={{ fontSize: '10px', color: '#2563eb', fontWeight: '800' }}>
              كلية التربية النوعية • جامعة الزقازيق
            </span>
            <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a' }}>
              سجل الحضور والغياب الذكي
            </h3>
          </div>
          <button
            onClick={onClose}
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

        {/* Tab switch: QR Scanner vs Attendance Summary */}
        <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
          <button
            onClick={() => setActiveTab('qr')}
            style={{
              flex: 1,
              padding: '10px',
              fontSize: '12px',
              fontWeight: activeTab === 'qr' ? '800' : '600',
              color: activeTab === 'qr' ? '#1e3a8a' : '#64748b',
              borderBottom: activeTab === 'qr' ? '2.5px solid #1e3a8a' : 'none',
              backgroundColor: activeTab === 'qr' ? '#ffffff' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <QrCode size={15} />
            <span>تسجيل حضور QR</span>
          </button>

          <button
            onClick={() => setActiveTab('summary')}
            style={{
              flex: 1,
              padding: '10px',
              fontSize: '12px',
              fontWeight: activeTab === 'summary' ? '800' : '600',
              color: activeTab === 'summary' ? '#1e3a8a' : '#64748b',
              borderBottom: activeTab === 'summary' ? '2.5px solid #1e3a8a' : 'none',
              backgroundColor: activeTab === 'summary' ? '#ffffff' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <BookOpen size={15} />
            <span>سجل المقررات ({overallRate}%)</span>
          </button>
        </div>

        <div className="sheet-body">
          {activeTab === 'qr' ? (
            /* QR Scanner Simulation */
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{
                position: 'relative',
                width: '220px',
                height: '220px',
                backgroundColor: '#0f172a',
                borderRadius: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                margin: '10px 0 16px 0',
                border: '3px solid #3b82f6'
              }}>
                {/* Simulated laser scan line */}
                <div className="scanner-laser" />

                {/* Viewfinder corner brackets */}
                <div style={{
                  position: 'absolute',
                  inset: '20px',
                  border: '2px dashed rgba(255,255,255,0.4)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <QrCode size={80} color="rgba(255,255,255,0.25)" />
                </div>

                <div style={{
                  position: 'absolute',
                  bottom: '12px',
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  color: '#93c5fd',
                  padding: '3px 10px',
                  borderRadius: '12px',
                  fontSize: '10px',
                  fontWeight: '700'
                }}>
                  وجّه الكاميرا لرمز QR بالقاعة
                </div>
              </div>

              {scanResult ? (
                <div style={{
                  backgroundColor: '#dcfce7',
                  border: '1px solid #86efac',
                  color: '#15803d',
                  padding: '12px 18px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '800',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  animation: 'fadeIn 0.2s ease-out'
                }}>
                  <CheckCircle2 size={18} />
                  <span>{scanResult}</span>
                </div>
              ) : (
                <div style={{ width: '100%', maxWidth: '300px' }}>
                  <div style={{
                    backgroundColor: '#eff6ff',
                    border: '1px solid #bfdbfe',
                    borderRadius: '12px',
                    padding: '10px 14px',
                    marginBottom: '14px',
                    fontSize: '11px',
                    color: '#1e40af',
                    textAlign: 'right'
                  }}>
                    <div style={{ fontWeight: '800', marginBottom: '2px' }}>
                      محاضرة اليوم المستهدفة:
                    </div>
                    {currentCourse.name} ({currentCourse.hall})
                  </div>

                  <button
                    onClick={handleSimulateScan}
                    className="btn btn-primary btn-block"
                    style={{ padding: '12px', fontSize: '13px' }}
                  >
                    <ScanLine size={16} />
                    <span>محاكاة مسح الكود وتسجيل الحضور</span>
                  </button>

                  <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '8px' }}>
                    * محاكاة نظام الحضور الذكي المعتمد بقاعات كلية التربية النوعية
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Attendance Summary & Breakdown */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Overall Rate Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', textAlign: 'center' }}>
                <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', padding: '10px 6px', borderRadius: '12px' }}>
                  <div style={{ fontSize: '10px', color: '#166534', fontWeight: '700' }}>المحاضرات</div>
                  <div style={{ fontSize: '18px', fontWeight: '900', color: '#15803d' }}>{totalAttended} / {totalLectures}</div>
                  <div style={{ fontSize: '9px', color: '#166534' }}>حضور فعلي</div>
                </div>

                <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', padding: '10px 6px', borderRadius: '12px' }}>
                  <div style={{ fontSize: '10px', color: '#991b1b', fontWeight: '700' }}>الغياب</div>
                  <div style={{ fontSize: '18px', fontWeight: '900', color: '#b91c1c' }}>{totalAbsence}</div>
                  <div style={{ fontSize: '9px', color: '#991b1b' }}>محاضرات</div>
                </div>

                <div style={{ backgroundColor: '#fffbeb', border: '1px solid #fde68a', padding: '10px 6px', borderRadius: '12px' }}>
                  <div style={{ fontSize: '10px', color: '#92400e', fontWeight: '700' }}>التأخير</div>
                  <div style={{ fontSize: '18px', fontWeight: '900', color: '#d97706' }}>{totalLate}</div>
                  <div style={{ fontSize: '9px', color: '#92400e' }}>مرات</div>
                </div>
              </div>

              {/* Course by Course Breakdown */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a' }}>
                  نسبة الحضور لكل مقرر دراسي:
                </h4>

                {courses.map(c => (
                  <div
                    key={c.id}
                    style={{
                      backgroundColor: '#f8fafc',
                      borderRadius: '12px',
                      border: '1px solid #e2e8f0',
                      padding: '12px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '12px', fontWeight: '800', color: '#0f172a' }}>
                        {c.name}
                      </span>
                      <span style={{
                        fontSize: '11px',
                        fontWeight: '800',
                        color: c.attendanceRate >= 85 ? '#15803d' : '#d97706'
                      }}>
                        {c.attendanceRate}%
                      </span>
                    </div>

                    <div style={{
                      height: '6px',
                      backgroundColor: '#e2e8f0',
                      borderRadius: '3px',
                      overflow: 'hidden',
                      marginBottom: '6px'
                    }}>
                      <div style={{
                        height: '100%',
                        width: `${c.attendanceRate}%`,
                        backgroundColor: c.attendanceRate >= 85 ? '#16a34a' : '#f59e0b',
                        borderRadius: '3px'
                      }} />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#64748b' }}>
                      <span>الحضور: {c.attendedLectures} من {c.totalLectures}</span>
                      <span>الغياب: {c.absenceCount} • التأخير: {c.lateCount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

