import React from 'react';
import { useApp } from './AppContext';
import {
  Bell,
  CheckCheck,
  AlertTriangle,
  FileCheck2,
  FileText,
  GraduationCap,
  X,
  ShieldAlert
} from 'lucide-react';
import { NotificationItem } from './types';

interface NotificationsModalProps {
  onClose: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({ onClose }) => {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useApp();

  const getNotificationIcon = (cat: NotificationItem['category'], priority?: string) => {
    if (priority === 'warning' || cat === 'integrity') {
      return <ShieldAlert size={18} color="#d97706" />;
    }
    switch (cat) {
      case 'exam':
        return <FileCheck2 size={18} color="#2563eb" />;
      case 'assignment':
        return <FileText size={18} color="#059669" />;
      case 'academic':
      default:
        return <GraduationCap size={18} color="#4f46e5" />;
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="bottom-sheet" onClick={e => e.stopPropagation()} style={{ maxHeight: '85%' }}>
        <div className="sheet-handle" />

        <div className="sheet-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bell size={18} color="#1e3a8a" />
            <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a' }}>
              مركز التنبيهات والإشعارات
            </h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={markAllNotificationsRead}
              title="تحديد الكل كمقروء"
              style={{
                fontSize: '11px',
                fontWeight: '700',
                color: '#2563eb',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <CheckCheck size={14} />
              <span>قراءة الكل</span>
            </button>
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
                color: '#475569'
              }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="sheet-body">
          {notifications.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '30px 20px', color: '#64748b' }}>
              <Bell size={32} style={{ margin: '0 auto 10px auto', opacity: 0.5 }} />
              <div style={{ fontSize: '13px', fontWeight: '700' }}>لا توجد إشعارات جديدة</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {notifications.map(notif => {
                const isWarning = notif.priority === 'warning' || notif.category === 'integrity';

                return (
                  <div
                    key={notif.id}
                    onClick={() => markNotificationRead(notif.id)}
                    style={{
                      padding: '12px 14px',
                      borderRadius: '12px',
                      backgroundColor: !notif.isRead
                        ? isWarning ? '#fffdf7' : '#eff6ff'
                        : '#ffffff',
                      border: !notif.isRead
                        ? isWarning ? '1.5px solid #fcd34d' : '1.5px solid #bfdbfe'
                        : '1px solid #e2e8f0',
                      cursor: 'pointer',
                      display: 'flex',
                      gap: '12px',
                      position: 'relative',
                      boxShadow: !notif.isRead ? '0 2px 6px rgba(0,0,0,0.04)' : 'none',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {/* Icon container */}
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      backgroundColor: isWarning ? '#fef3c7' : '#dbeafe',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      {getNotificationIcon(notif.category, notif.priority)}
                    </div>

                    {/* Content */}
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
                        <span style={{
                          fontSize: '12px',
                          fontWeight: !notif.isRead ? '800' : '700',
                          color: isWarning ? '#92400e' : '#0f172a'
                        }}>
                          {notif.title}
                        </span>
                        {!notif.isRead && (
                          <span style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: isWarning ? '#d97706' : '#2563eb',
                            display: 'inline-block'
                          }} />
                        )}
                      </div>

                      <p style={{
                        fontSize: '11px',
                        color: '#475569',
                        lineHeight: 1.5,
                        marginBottom: '4px'
                      }}>
                        {notif.body}
                      </p>

                      <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: '600' }}>
                        {notif.timestamp}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

