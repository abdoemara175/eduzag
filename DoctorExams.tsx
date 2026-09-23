import React, { useState } from 'react';
import { useApp } from './AppContext';
import {
  FileCheck2,
  PlusCircle,
  Calendar,
  Clock,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { ExamIntegrityReport } from './ExamIntegrityReport';

export const DoctorExams: React.FC = () => {
  const { exams, integrityLogs, setIsCreateExamOpen } = useApp();
  const [subView, setSubView] = useState<'exams' | 'integrity'>('exams');

  const pendingIntegrityCount = integrityLogs.filter(l => l.status === 'يحتاج إلى مراجعة').length;

  return (
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
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a' }}>
            الاختبارات ونزاهة الجلسات
          </h2>
          <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '600' }}>
            إدارة بنوك الأسئلة ومراقبة تقارير النزاهة
          </div>
        </div>

        <button
          onClick={() => setIsCreateExamOpen(true)}
          style={{
            backgroundColor: '#d97706',
            color: '#ffffff',
            padding: '6px 12px',
            borderRadius: '10px',
            fontSize: '11px',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <Sparkles size={14} />
          <span>إنشاء اختبار</span>
        </button>
      </div>

      {/* Toggle View: Exams List vs Integrity Report */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={() => setSubView('exams')}
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: subView === 'exams' ? '800' : '600',
            backgroundColor: subView === 'exams' ? '#1e3a8a' : '#ffffff',
            color: subView === 'exams' ? '#ffffff' : '#475569',
            border: subView === 'exams' ? '1px solid #1e3a8a' : '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}
        >
          <FileCheck2 size={16} />
          <span>قائمة الاختبارات ({exams.length})</span>
        </button>

        <button
          onClick={() => setSubView('integrity')}
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: subView === 'integrity' ? '800' : '600',
            backgroundColor: subView === 'integrity' ? '#1e3a8a' : '#ffffff',
            color: subView === 'integrity' ? '#ffffff' : '#475569',
            border: subView === 'integrity' ? '1px solid #1e3a8a' : '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}
        >
          <ShieldAlert size={16} />
          <span>نزاهة الاختبار</span>
          {pendingIntegrityCount > 0 && (
            <span style={{
              backgroundColor: '#dc2626',
              color: '#ffffff',
              fontSize: '10px',
              padding: '1px 6px',
              borderRadius: '8px',
              fontWeight: '800'
            }}>
              {pendingIntegrityCount}
            </span>
          )}
        </button>
      </div>

      {/* SubView Content */}
      {subView === 'integrity' ? (
        <ExamIntegrityReport isStandaloneScreen />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {exams.map(exam => (
            <div
              key={exam.id}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                padding: '16px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.04)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{
                  fontSize: '10px',
                  fontWeight: '800',
                  color: '#2563eb',
                  backgroundColor: '#eff6ff',
                  padding: '2px 8px',
                  borderRadius: '6px'
                }}>
                  {exam.courseName}
                </span>

                <span style={{
                  fontSize: '10px',
                  fontWeight: '700',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  backgroundColor: exam.status === 'نشط' ? '#fef3c7' : '#dcfce7',
                  color: exam.status === 'نشط' ? '#b45309' : '#15803d'
                }}>
                  {exam.status === 'نشط' ? 'نشط ومتاح' : exam.status}
                </span>
              </div>

              <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                {exam.title}
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', fontSize: '11px', color: '#64748b' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={13} />
                  <span>{exam.date}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={13} />
                  <span>المدة: {exam.durationMinutes} دقيقة</span>
                </div>
                <div>عدد الأسئلة: {exam.totalQuestions} أسئلة</div>
                <div>الدرجة الكلية: {exam.totalMarks} درجات</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

