import React, { useState } from 'react';
import { useApp } from './AppContext';
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Compass,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';
import { ScheduleLecture } from './types';

const DAYS = ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'] as const;

export const StudentSchedule: React.FC = () => {
  const { schedule, selectedSection, setSelectedSection, setIsQRModalOpen } = useApp();
  const [activeDay, setActiveDay] = useState<typeof DAYS[number]>('السبت');
  const [isSectionMenuOpen, setIsSectionMenuOpen] = useState(false);

  // Filter schedule for the active day and current section
  const currentDayLectures = schedule.filter(
    item =>
      item.day === activeDay &&
      (item.section === selectedSection || item.section === 'جميع الشعب')
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Schedule Header & Section Selector */}
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
            الجدول الدراسي الأسبوعي
          </h2>
          <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '600' }}>
            الفصل الدراسي الأول • 2026 / 2027
          </div>
        </div>

        {/* Explore Sections Menu Trigger */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setIsSectionMenuOpen(!isSectionMenuOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#eff6ff',
              border: '1px solid #bfdbfe',
              color: '#1e40af',
              padding: '6px 10px',
              borderRadius: '10px',
              fontSize: '11px',
              fontWeight: '700'
            }}
          >
            <Compass size={14} />
            <span>{selectedSection}</span>
            <ChevronDown size={14} />
          </button>

          {isSectionMenuOpen && (
            <div style={{
              position: 'absolute',
              top: '110%',
              left: 0,
              width: '160px',
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
              border: '1px solid #e2e8f0',
              zIndex: 50,
              overflow: 'hidden',
              padding: '6px'
            }}>
              <div style={{ fontSize: '10px', fontWeight: '800', color: '#94a3b8', padding: '4px 8px' }}>
                استكشاف الشعب
              </div>
              <button
                onClick={() => {
                  setSelectedSection('شعبة أ');
                  setIsSectionMenuOpen(false);
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: selectedSection === 'شعبة أ' ? '800' : '600',
                  color: selectedSection === 'شعبة أ' ? '#1e40af' : '#334155',
                  backgroundColor: selectedSection === 'شعبة أ' ? '#eff6ff' : 'transparent',
                  textAlign: 'right'
                }}
              >
                <span>شعبة (أ) - الأساسية</span>
                {selectedSection === 'شعبة أ' && <CheckCircle2 size={14} color="#2563eb" />}
              </button>

              <button
                onClick={() => {
                  setSelectedSection('شعبة ب');
                  setIsSectionMenuOpen(false);
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: selectedSection === 'شعبة ب' ? '800' : '600',
                  color: selectedSection === 'شعبة ب' ? '#1e40af' : '#334155',
                  backgroundColor: selectedSection === 'شعبة ب' ? '#eff6ff' : 'transparent',
                  textAlign: 'right'
                }}
              >
                <span>شعبة (ب) - الموازية</span>
                {selectedSection === 'شعبة ب' && <CheckCircle2 size={14} color="#2563eb" />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Days Tabs (Saturday to Thursday) */}
      <div style={{
        display: 'flex',
        gap: '6px',
        overflowX: 'auto',
        paddingBottom: '4px',
        scrollbarWidth: 'none'
      }}>
        {DAYS.map(day => {
          const isSelected = activeDay === day;
          const dayLecturesCount = schedule.filter(
            s => s.day === day && (s.section === selectedSection || s.section === 'جميع الشعب')
          ).length;

          return (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              style={{
                flex: '0 0 auto',
                padding: '8px 14px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: isSelected ? '800' : '600',
                backgroundColor: isSelected ? '#1e3a8a' : '#ffffff',
                color: isSelected ? '#ffffff' : '#475569',
                border: isSelected ? '1px solid #1e3a8a' : '1px solid #e2e8f0',
                boxShadow: isSelected ? '0 4px 10px rgba(30,58,138,0.2)' : 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2px',
                minWidth: '65px'
              }}
            >
              <span>{day}</span>
              <span style={{
                fontSize: '10px',
                opacity: isSelected ? 0.85 : 0.6,
                fontWeight: '700'
              }}>
                {dayLecturesCount} {dayLecturesCount === 1 ? 'محاضرة' : 'محاضرات'}
              </span>
            </button>
          );
        })}
      </div>

      {/* Lectures List for Active Day */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {currentDayLectures.length === 0 ? (
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px dashed #cbd5e1',
            padding: '30px 20px',
            textAlign: 'center',
            color: '#64748b'
          }}>
            <Calendar size={32} style={{ margin: '0 auto 10px auto', opacity: 0.5 }} />
            <div style={{ fontSize: '13px', fontWeight: '700' }}>
              لا توجد محاضرات مجدولة ليوم {activeDay}
            </div>
            <div style={{ fontSize: '11px', marginTop: '4px' }}>
              يمكنك الاطلاع على أيام الأسبوع الأخرى أو استكشاف شعبة أخرى
            </div>
          </div>
        ) : (
          currentDayLectures.map((lecture, idx) => (
            <div
              key={lecture.id}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                padding: '16px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.04)',
                position: 'relative'
              }}
            >
              {/* Top Row: Course Name & Type Badge */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a', flex: 1, paddingLeft: '8px' }}>
                  {lecture.courseName}
                </h3>
                <span style={{
                  fontSize: '11px',
                  fontWeight: '700',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  backgroundColor:
                    lecture.lectureType === 'عملي'
                      ? '#dcfce7'
                      : lecture.lectureType === 'ورشة'
                      ? '#fef3c7'
                      : '#eff6ff',
                  color:
                    lecture.lectureType === 'عملي'
                      ? '#15803d'
                      : lecture.lectureType === 'ورشة'
                      ? '#b45309'
                      : '#1e40af'
                }}>
                  {lecture.lectureType}
                </span>
              </div>

              {/* Lecture Details Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px', color: '#475569' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock size={14} color="#64748b" />
                  <span>{lecture.startTime} – {lecture.endTime}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={14} color="#64748b" />
                  <span style={{ fontWeight: '700', color: '#1e293b' }}>{lecture.hall}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', gridColumn: 'span 2' }}>
                  <User size={14} color="#64748b" />
                  <span>عضو هيئة التدريس: {lecture.doctorName}</span>
                </div>
              </div>

              {/* Bottom Row: Quick Attendance Button */}
              <div style={{
                marginTop: '12px',
                paddingTop: '10px',
                borderTop: '1px solid #f8fafc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: '600' }}>
                  مخصصة لـ: {lecture.section}
                </span>
                <button
                  onClick={() => setIsQRModalOpen(true)}
                  style={{
                    backgroundColor: '#eff6ff',
                    color: '#1d4ed8',
                    padding: '5px 12px',
                    borderRadius: '8px',
                    fontSize: '11px',
                    fontWeight: '700',
                    border: '1px solid #bfdbfe'
                  }}
                >
                  تسجيل الحضور QR
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

