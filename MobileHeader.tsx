import React from 'react';
import { Bell, GraduationCap, LogOut } from 'lucide-react';
import { useApp } from './AppContext';

export const MobileHeader: React.FC = () => {
  const { role, notifications, setIsNotificationsModalOpen, logout } = useApp();
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <header style={{
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e2e8f0',
      padding: '12px 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 35
    }}>
      {/* University & Faculty Identity */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          boxShadow: '0 3px 8px rgba(30, 58, 138, 0.25)'
        }}>
          <GraduationCap size={24} />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '14px', fontWeight: '900', color: '#1e3a8a', lineHeight: 1.2 }}>
              جامعة الزقازيق
            </span>
            <span style={{
              fontSize: '10px',
              padding: '1px 7px',
              borderRadius: '6px',
              backgroundColor: role === 'student' ? '#dbeafe' : '#fef3c7',
              color: role === 'student' ? '#1e40af' : '#92400e',
              fontWeight: '800'
            }}>
              {role === 'student' ? 'طالب' : 'عضو هيئة تدريس'}
            </span>
          </div>
          <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '700', lineHeight: 1.2 }}>
            كلية التربية النوعية
          </div>
        </div>
      </div>

      {/* Header Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Notifications Icon with Badge */}
        <button
          onClick={() => setIsNotificationsModalOpen(true)}
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#334155',
            position: 'relative'
          }}
          aria-label="الإشعارات"
          title="الإشعارات"
        >
          <Bell size={18} />
          {unreadCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '2px',
              right: '2px',
              minWidth: '16px',
              height: '16px',
              borderRadius: '8px',
              backgroundColor: '#dc2626',
              color: '#ffffff',
              fontSize: '10px',
              fontWeight: '800',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 3px',
              border: '2px solid #ffffff'
            }}>
              {unreadCount}
            </span>
          )}
        </button>

        {/* Logout Quick Action */}
        <button
          onClick={logout}
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            backgroundColor: '#fee2e2',
            border: '1px solid #fecaca',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#dc2626',
            cursor: 'pointer'
          }}
          aria-label="تسجيل الخروج"
          title="تسجيل الخروج"
        >
          <LogOut size={16} />
        </button>
      </div>
    </header>
  );
};

