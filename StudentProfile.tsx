import React, { useState } from 'react';
import { useApp } from './AppContext';
import {
  User,
  GraduationCap,
  Building2,
  Layers,
  Compass,
  FileBadge,
  Settings,
  LogOut,
  Bell,
  Moon,
  Shield,
  HelpCircle,
  RotateCcw,
  Briefcase
} from 'lucide-react';

export const StudentProfile: React.FC = () => {
  const { student, logout, resetDemoData, setIsQRModalOpen } = useApp();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Student Profile Card Header */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        border: '1px solid #e2e8f0',
        padding: '20px 16px',
        textAlign: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
      }}>
        {/* Avatar */}
        <div style={{
          width: '70px',
          height: '70px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          fontWeight: '900',
          margin: '0 auto 12px auto',
          boxShadow: '0 6px 16px rgba(30,58,138,0.25)',
          border: '3px solid #ffffff'
        }}>
          م.أ
        </div>

        <h2 style={{ fontSize: '17px', fontWeight: '900', color: '#0f172a', marginBottom: '2px' }}>
          {student.name}
        </h2>
        <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', marginBottom: '10px' }}>
          كود الطالب: <strong style={{ color: '#1e40af' }}>{student.studentCode}</strong>
        </div>

        {/* Academic status pill */}
        <div style={{ display: 'inline-flex', gap: '6px' }}>
          <span style={{
            fontSize: '11px',
            fontWeight: '700',
            backgroundColor: '#dcfce7',
            color: '#15803d',
            padding: '3px 10px',
            borderRadius: '12px'
          }}>
            حالة القيد: {student.studyType}
          </span>
          <span style={{
            fontSize: '11px',
            fontWeight: '700',
            backgroundColor: '#eff6ff',
            color: '#1e40af',
            padding: '3px 10px',
            borderRadius: '12px'
          }}>
            المعدل التراكمي: {student.gpa} (ممتاز)
          </span>
        </div>
      </div>

      {/* Academic Details List */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        padding: '16px'
      }}>
        <h3 style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>
          البيانات الأكاديمية الرسمية
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b' }}>
              <GraduationCap size={15} color="#1e3a8a" />
              <span>الجامعة</span>
            </div>
            <strong style={{ color: '#0f172a' }}>{student.university}</strong>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b' }}>
              <Building2 size={15} color="#1e3a8a" />
              <span>الكلية</span>
            </div>
            <strong style={{ color: '#0f172a' }}>{student.faculty}</strong>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b' }}>
              <Layers size={15} color="#1e3a8a" />
              <span>القسم</span>
            </div>
            <strong style={{ color: '#0f172a' }}>{student.department}</strong>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b' }}>
              <FileBadge size={15} color="#1e3a8a" />
              <span>الفرقة الدراسية</span>
            </div>
            <strong style={{ color: '#0f172a' }}>{student.academicYear}</strong>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b' }}>
              <Compass size={15} color="#1e3a8a" />
              <span>الشعبة</span>
            </div>
            <strong style={{ color: '#0f172a' }}>{student.section}</strong>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b' }}>
              <User size={15} color="#1e3a8a" />
              <span>المرشد الأكاديمي</span>
            </div>
            <strong style={{ color: '#0f172a' }}>{student.advisor}</strong>
          </div>
        </div>
      </div>

      {/* App Settings & Preferences */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        padding: '16px'
      }}>
        <h3 style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>
          إعدادات التطبيق
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12px' }}>
          {/* Notifications Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155' }}>
              <Bell size={16} color="#64748b" />
              <span>تنبيهات المحاضرات والاختبارات</span>
            </div>
            <button
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              style={{
                width: '42px',
                height: '24px',
                borderRadius: '12px',
                backgroundColor: notificationsEnabled ? '#2563eb' : '#cbd5e1',
                position: 'relative',
                transition: 'background-color 0.2s ease',
                padding: '2px'
              }}
            >
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: '#ffffff',
                transform: notificationsEnabled ? 'translateX(-18px)' : 'translateX(0)',
                transition: 'transform 0.2s ease'
              }} />
            </button>
          </div>

          {/* Quick attendance check */}
          <div
            onClick={() => setIsQRModalOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              paddingTop: '6px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155' }}>
              <Shield size={16} color="#64748b" />
              <span>بطاقة الهوية الجامعية وQR الحضور</span>
            </div>
            <span style={{ fontSize: '11px', color: '#2563eb', fontWeight: '700' }}>فتح ←</span>
          </div>
        </div>
      </div>

      {/* Account Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {/* Logout */}
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
          <LogOut size={16} color="#dc2626" />
          <span>تسجيل الخروج</span>
        </button>

        {/* Reset Demo Data */}
        <button
          onClick={resetDemoData}
          className="btn btn-secondary btn-block"
          style={{ padding: '10px', fontSize: '12px', color: '#64748b' }}
        >
          <RotateCcw size={14} />
          <span>إعادة ضبط البيانات الأولية (Reset Demo)</span>
        </button>
      </div>
    </div>
  );
};

