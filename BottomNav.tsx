import React from 'react';
import {
  Home,
  Calendar,
  BookOpen,
  FileCheck2,
  MoreHorizontal,
  Users,
  ClipboardList
} from 'lucide-react';
import { useApp } from './AppContext';

export const BottomNav: React.FC = () => {
  const { role, activeTab, setActiveTab } = useApp();

  const studentNavItems = [
    { id: 'home', label: 'الرئيسية', icon: Home },
    { id: 'schedule', label: 'الجدول', icon: Calendar },
    { id: 'courses', label: 'المواد', icon: BookOpen },
    { id: 'exams', label: 'الاختبارات', icon: FileCheck2 },
    { id: 'more', label: 'المزيد', icon: MoreHorizontal }
  ];

  const doctorNavItems = [
    { id: 'home', label: 'الرئيسية', icon: Home },
    { id: 'courses', label: 'المواد', icon: BookOpen },
    { id: 'students', label: 'الطلاب', icon: Users },
    { id: 'assignments', label: 'التكليفات', icon: ClipboardList },
    { id: 'exams', label: 'الاختبارات', icon: FileCheck2 }
  ];

  const items = role === 'student' ? studentNavItems : doctorNavItems;

  return (
    <nav className="bottom-nav">
      {items.map(item => {
        const IconComponent = item.icon;
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`nav-item ${isActive ? 'active' : ''}`}
            aria-label={item.label}
          >
            <div className="nav-icon-wrapper">
              <IconComponent size={20} strokeWidth={isActive ? 2.5 : 1.8} />
            </div>
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

