import React from 'react';
import { useApp } from './AppContext';
import {
  ClipboardList,
  PlusCircle,
  Calendar,
  Clock,
  CheckCircle2,
  FileText,
  UserCheck
} from 'lucide-react';

export const DoctorAssignments: React.FC = () => {
  const { assignments, setIsCreateAssignmentOpen } = useApp();

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
            إدارة التكليفات والواجبات
          </h2>
          <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '600' }}>
            إجمالي {assignments.length} تكليفات منشورة
          </div>
        </div>

        <button
          onClick={() => setIsCreateAssignmentOpen(true)}
          style={{
            backgroundColor: '#1e3a8a',
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
          <PlusCircle size={14} />
          <span>نشر تكليف</span>
        </button>
      </div>

      {/* Assignments Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {assignments.map(asg => (
          <div
            key={asg.id}
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
                {asg.courseName}
              </span>
              <span style={{
                fontSize: '10px',
                fontWeight: '700',
                color: '#15803d',
                backgroundColor: '#dcfce7',
                padding: '2px 8px',
                borderRadius: '6px'
              }}>
                {asg.totalMarks} درجات
              </span>
            </div>

            <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a', marginBottom: '6px' }}>
              {asg.title}
            </h3>

            <p style={{ fontSize: '11px', color: '#475569', lineHeight: 1.5, marginBottom: '10px' }}>
              {asg.description}
            </p>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '8px',
              borderTop: '1px solid #f8fafc',
              fontSize: '11px',
              color: '#64748b'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Calendar size={13} />
                <span>آخر موعد: {asg.dueDate} ({asg.dueTime})</span>
              </div>
              <span style={{ fontWeight: '700', color: '#0f172a' }}>
                مخصص لـ: {asg.section}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

