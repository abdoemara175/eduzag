import React, { useState } from 'react';
import { useApp } from './AppContext';
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Clock,
  User,
  X,
  FileCheck2,
  Check,
  Ban,
  MessageSquare
} from 'lucide-react';
import { ExamIntegrityLog } from './types';

interface ExamIntegrityReportProps {
  onClose?: () => void;
  isStandaloneScreen?: boolean;
}

export const ExamIntegrityReport: React.FC<ExamIntegrityReportProps> = ({ onClose, isStandaloneScreen = false }) => {
  const { integrityLogs, updateIntegrityLogStatus } = useApp();
  const [filter, setFilter] = useState<'الكل' | 'يحتاج إلى مراجعة' | 'معتمد'>('الكل');
  const [selectedLog, setSelectedLog] = useState<ExamIntegrityLog | null>(null);

  const filteredLogs = integrityLogs.filter(log => {
    if (filter === 'الكل') return true;
    return log.status === filter;
  });

  const handleAction = (logId: string, status: 'معتمد' | 'ملغى' | 'يحتاج إلى مراجعة', message: string) => {
    updateIntegrityLogStatus(logId, status);
    alert(message);
    setSelectedLog(null);
  };

  const content = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        padding: '14px 16px',
        border: '1px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            backgroundColor: '#fef3c7',
            color: '#d97706',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <ShieldAlert size={20} />
          </div>
          <div>
            <h2 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a' }}>
              نزاهة الاختبار
            </h2>
            <div style={{ fontSize: '11px', color: '#64748b' }}>
              مراقبة جلسات الاختبارات الإلكترونية وسجل الملاحظات
            </div>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              backgroundColor: '#f1f5f9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#64748b'
            }}
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Advisory Banner (Fairness & non-accusatory language) */}
      <div style={{
        backgroundColor: '#eff6ff',
        border: '1px solid #bfdbfe',
        borderRadius: '12px',
        padding: '10px 14px',
        fontSize: '11px',
        color: '#1e40af',
        lineHeight: 1.5
      }}>
        <strong>توجيه إرشادي:</strong> يقوم النظام الآلي برصد التغيرات الفنية أثناء جلسة الامتحان (انقطاع الاتصال، تبديل النوافذ). تُصنّف الحالات كـ <strong>"نشاط مشبوه"</strong> و <strong>"يحتاج إلى مراجعة"</strong> للمعاينة الشفهية دون توجيه اتهام مباشر.
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '6px' }}>
        {(['الكل', 'يحتاج إلى مراجعة', 'معتمد'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              flex: 1,
              padding: '8px',
              borderRadius: '10px',
              fontSize: '11px',
              fontWeight: filter === f ? '800' : '600',
              backgroundColor: filter === f ? '#1e3a8a' : '#ffffff',
              color: filter === f ? '#ffffff' : '#475569',
              border: filter === f ? '1px solid #1e3a8a' : '1px solid #e2e8f0'
            }}
          >
            {f} ({integrityLogs.filter(l => f === 'الكل' ? true : l.status === f).length})
          </button>
        ))}
      </div>

      {/* Logs List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filteredLogs.map(log => {
          const needsReview = log.status === 'يحتاج إلى مراجعة';

          return (
            <div
              key={log.id}
              onClick={() => setSelectedLog(log)}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                border: needsReview ? '1.5px solid #fcd34d' : '1px solid #e2e8f0',
                padding: '14px 16px',
                boxShadow: needsReview ? '0 2px 8px rgba(217,119,6,0.08)' : '0 1px 3px rgba(0,0,0,0.04)',
                cursor: 'pointer'
              }}
            >
              {/* Header: Student Name & Status */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '6px' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a' }}>
                    اسم الطالب: {log.studentName}
                  </div>
                  <div style={{ fontSize: '10px', color: '#64748b' }}>
                    كود: {log.studentCode} • {log.courseName}
                  </div>
                </div>

                <span style={{
                  fontSize: '10px',
                  fontWeight: '800',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  backgroundColor: needsReview ? '#fef3c7' : '#dcfce7',
                  color: needsReview ? '#b45309' : '#15803d',
                  border: `1px solid ${needsReview ? '#fde68a' : '#86efac'}`
                }}>
                  الحالة: {log.status}
                </span>
              </div>

              {/* Activity description */}
              <div style={{
                backgroundColor: needsReview ? '#fffdf7' : '#f8fafc',
                border: '1px solid #f1f5f9',
                borderRadius: '10px',
                padding: '8px 10px',
                marginBottom: '8px',
                fontSize: '11px',
                color: '#334155'
              }}>
                <div style={{ fontWeight: '700', color: needsReview ? '#b45309' : '#0f172a', marginBottom: '2px' }}>
                  النشاط: {log.activityType}
                </div>
                {log.notes && (
                  <div style={{ color: '#64748b', fontSize: '10px' }}>
                    {log.notes}
                  </div>
                )}
              </div>

              {/* Bottom footer: timestamp & warning count */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '10px', color: '#64748b' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={12} />
                  <span>{log.timestamp}</span>
                </div>
                <div style={{ fontWeight: '700', color: '#0f172a' }}>
                  عدد التنبيهات: {log.warningCount}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Log Review Modal Dialog */}
      {selectedLog && (
        <div className="modal-overlay" onClick={() => setSelectedLog(null)} style={{ zIndex: 110 }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            padding: '20px',
            width: '90%',
            maxWidth: '350px',
            margin: 'auto',
            boxShadow: '0 20px 40px rgba(0,0,0,0.25)'
          }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldAlert size={18} color="#d97706" />
                <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a' }}>
                  مراجعة نشاط الاختبار
                </h3>
              </div>
              <button onClick={() => setSelectedLog(null)} style={{ color: '#94a3b8' }}>
                <X size={16} />
              </button>
            </div>

            <div style={{ fontSize: '12px', color: '#334155', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              <div><strong>اسم الطالب:</strong> {selectedLog.studentName} ({selectedLog.studentCode})</div>
              <div><strong>الاختبار:</strong> {selectedLog.examTitle}</div>
              <div><strong>النشاط المسجل:</strong> {selectedLog.activityType}</div>
              <div><strong>عدد التنبيهات:</strong> {selectedLog.warningCount}</div>
              <div><strong>الحالة الحالية:</strong> {selectedLog.status}</div>
              {selectedLog.notes && <div><strong>التفاصيل:</strong> {selectedLog.notes}</div>}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                onClick={() => handleAction(selectedLog.id, 'معتمد', `تم اعتماد نتيجة الاختبار للطالب ${selectedLog.studentName}`)}
                className="btn btn-primary btn-block"
                style={{ fontSize: '12px', padding: '10px' }}
              >
                <Check size={14} />
                <span>اعتماد النتيجة كجلسة مقبولة</span>
              </button>

              <button
                onClick={() => handleAction(selectedLog.id, 'يحتاج إلى مراجعة', `تم جدولة استدعاء للمراجعة الشفهية للطالب ${selectedLog.studentName}`)}
                className="btn btn-outline btn-block"
                style={{ fontSize: '12px', padding: '10px', color: '#b45309', borderColor: '#fcd34d' }}
              >
                <MessageSquare size={14} />
                <span>طلب مراجعة شفهية مع الأستاذ</span>
              </button>

              <button
                onClick={() => setSelectedLog(null)}
                className="btn btn-secondary btn-block"
                style={{ fontSize: '12px', padding: '8px' }}
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  if (isStandaloneScreen) {
    return content;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="bottom-sheet" onClick={e => e.stopPropagation()} style={{ maxHeight: '90%' }}>
        <div className="sheet-handle" />
        <div className="sheet-body">
          {content}
        </div>
      </div>
    </div>
  );
};

