import React from 'react';
import { useApp } from './AppContext';
import {
  BookOpen,
  Users,
  ClipboardList,
  FileCheck2,
  Clock,
  MapPin,
  PlusCircle
} from 'lucide-react';

export const DoctorCourses: React.FC = () => {
  const { courses, assignments, exams, setIsCreateAssignmentOpen, setIsCreateExamOpen } = useApp();

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
            المقررات الدراسية المكلف بها
          </h2>
          <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '600' }}>
            قسم تكنولوجيا التعليم • {courses.length} مقررات أكاديمية
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
          <span>تكليف جديد</span>
        </button>
      </div>

      {/* Courses List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {courses.map(course => {
          const courseAssignments = assignments.filter(a => a.courseId === course.id);
          const courseExams = exams.filter(e => e.courseId === course.id);

          return (
            <div
              key={course.id}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                padding: '16px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
              }}
            >
              {/* Top row */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div>
                  <span style={{
                    fontSize: '10px',
                    fontWeight: '800',
                    color: '#2563eb',
                    backgroundColor: '#eff6ff',
                    padding: '2px 8px',
                    borderRadius: '6px',
                    display: 'inline-block',
                    marginBottom: '4px'
                  }}>
                    {course.code} • {course.creditHours} ساعات معتمدة
                  </span>
                  <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a' }}>
                    {course.name}
                  </h3>
                </div>
              </div>

              {/* Hall & Time */}
              <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: '#64748b', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={13} />
                  <span>{course.dayOfWeek} ({course.timeSlot})</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={13} />
                  <span>{course.hall}</span>
                </div>
              </div>

              {/* Course Metrics Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '8px',
                backgroundColor: '#f8fafc',
                borderRadius: '12px',
                padding: '10px',
                border: '1px solid #e2e8f0',
                textAlign: 'center'
              }}>
                <div>
                  <div style={{ fontSize: '10px', color: '#64748b', fontWeight: '700' }}>الطلاب المسجلين</div>
                  <div style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a' }}>92 طالب</div>
                </div>

                <div>
                  <div style={{ fontSize: '10px', color: '#64748b', fontWeight: '700' }}>التكليفات</div>
                  <div style={{ fontSize: '15px', fontWeight: '800', color: '#2563eb' }}>{courseAssignments.length}</div>
                </div>

                <div>
                  <div style={{ fontSize: '10px', color: '#64748b', fontWeight: '700' }}>الاختبارات</div>
                  <div style={{ fontSize: '15px', fontWeight: '800', color: '#d97706' }}>{courseExams.length}</div>
                </div>
              </div>

              {/* Action shortcuts */}
              <div style={{
                marginTop: '12px',
                display: 'flex',
                gap: '8px'
              }}>
                <button
                  onClick={() => setIsCreateAssignmentOpen(true)}
                  style={{
                    flex: 1,
                    backgroundColor: '#eff6ff',
                    color: '#1e40af',
                    border: '1px solid #bfdbfe',
                    padding: '6px',
                    borderRadius: '8px',
                    fontSize: '11px',
                    fontWeight: '700'
                  }}
                >
                  + إضافة تكليف للمقرر
                </button>

                <button
                  onClick={() => setIsCreateExamOpen(true)}
                  style={{
                    flex: 1,
                    backgroundColor: '#fffbeb',
                    color: '#b45309',
                    border: '1px solid #fcd34d',
                    padding: '6px',
                    borderRadius: '8px',
                    fontSize: '11px',
                    fontWeight: '700'
                  }}
                >
                  + إنشاء اختبار للمقرر
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

