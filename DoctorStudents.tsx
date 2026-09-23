import React, { useState } from 'react';
import { useApp } from './AppContext';
import {
  Users,
  Search,
  CheckCircle2,
  Clock,
  Award,
  ChevronLeft,
  X,
  GraduationCap
} from 'lucide-react';
import { EnrolledStudent } from './types';

export const DoctorStudents: React.FC = () => {
  const { students } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSectionFilter, setSelectedSectionFilter] = useState<'الكل' | 'شعبة أ' | 'شعبة ب'>('الكل');
  const [selectedStudentForDetails, setSelectedStudentForDetails] = useState<EnrolledStudent | null>(null);

  // Filter students
  const filteredStudents = students.filter(std => {
    const matchesSearch =
      std.name.includes(searchQuery.trim()) ||
      std.studentCode.includes(searchQuery.trim());
    const matchesSection =
      selectedSectionFilter === 'الكل' || std.section === selectedSectionFilter;
    return matchesSearch && matchesSection;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        padding: '14px 16px',
        border: '1px solid #e2e8f0'
      }}>
        <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a' }}>
          قائمة الطلاب وسجل الأداء
        </h2>
        <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '600' }}>
          قسم تكنولوجيا التعليم • الفرقة الأولى ({students.length * 23} طالب مسجل)
        </div>
      </div>

      {/* Search Input & Section Filter */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #cbd5e1',
          padding: '8px 12px'
        }}>
          <Search size={16} color="#64748b" />
          <input
            type="text"
            placeholder="البحث باسم الطالب أو الكود الجامعي..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              fontSize: '12px',
              backgroundColor: 'transparent'
            }}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} style={{ color: '#94a3b8' }}>
              <X size={15} />
            </button>
          )}
        </div>

        {/* Section filter pills */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {(['الكل', 'شعبة أ', 'شعبة ب'] as const).map(sec => (
            <button
              key={sec}
              onClick={() => setSelectedSectionFilter(sec)}
              style={{
                flex: 1,
                padding: '6px',
                borderRadius: '8px',
                fontSize: '11px',
                fontWeight: selectedSectionFilter === sec ? '800' : '600',
                backgroundColor: selectedSectionFilter === sec ? '#1e3a8a' : '#ffffff',
                color: selectedSectionFilter === sec ? '#ffffff' : '#475569',
                border: selectedSectionFilter === sec ? '1px solid #1e3a8a' : '1px solid #e2e8f0'
              }}
            >
              {sec}
            </button>
          ))}
        </div>
      </div>

      {/* Students List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filteredStudents.length === 0 ? (
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px dashed #cbd5e1',
            padding: '30px 20px',
            textAlign: 'center',
            color: '#64748b'
          }}>
            <Users size={32} style={{ margin: '0 auto 10px auto', opacity: 0.5 }} />
            <div style={{ fontSize: '13px', fontWeight: '700' }}>لا يوجد طلاب يطابقون معايير البحث</div>
          </div>
        ) : (
          filteredStudents.map(std => (
            <div
              key={std.id}
              onClick={() => setSelectedStudentForDetails(std)}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                padding: '14px 16px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.04)',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    backgroundColor: '#eff6ff',
                    color: '#1e40af',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '800',
                    fontSize: '13px',
                    border: '1px solid #bfdbfe'
                  }}>
                    {std.name.slice(0, 2)}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a' }}>
                      {std.name}
                    </h3>
                    <div style={{ fontSize: '10px', color: '#64748b' }}>
                      كود: {std.studentCode} • {std.section}
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '13px', fontWeight: '900', color: '#15803d' }}>
                    {std.currentAverageGrade}%
                  </div>
                  <div style={{ fontSize: '9px', color: '#64748b' }}>متوسط الدرجات</div>
                </div>
              </div>

              {/* Progress & Submissions metrics */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '8px',
                borderTop: '1px solid #f8fafc',
                fontSize: '11px',
                color: '#475569'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ color: '#64748b' }}>نسبة الحضور:</span>
                  <span style={{ fontWeight: '700', color: std.attendanceRate >= 85 ? '#15803d' : '#d97706' }}>
                    {std.attendanceRate}%
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ color: '#64748b' }}>التكليفات:</span>
                  <span style={{ fontWeight: '700', color: '#1e40af' }}>
                    {std.submittedAssignmentsCount} من {std.totalAssignmentsCount}
                  </span>
                </div>

                <div style={{ color: '#2563eb', fontWeight: '700', fontSize: '10px' }}>
                  عرض الملف ←
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Student Details Sheet */}
      {selectedStudentForDetails && (
        <div className="modal-overlay" onClick={() => setSelectedStudentForDetails(null)}>
          <div className="bottom-sheet" onClick={e => e.stopPropagation()}>
            <div className="sheet-handle" />

            <div className="sheet-header">
              <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a' }}>
                السجل الأكاديمي للطالب
              </h3>
              <button
                onClick={() => setSelectedStudentForDetails(null)}
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

            <div className="sheet-body">
              {/* Profile Card */}
              <div style={{
                backgroundColor: '#f8fafc',
                borderRadius: '14px',
                padding: '14px',
                border: '1px solid #e2e8f0',
                marginBottom: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: '#1e3a8a',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  fontWeight: '800'
                }}>
                  {selectedStudentForDetails.name.slice(0, 2)}
                </div>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a' }}>
                    {selectedStudentForDetails.name}
                  </h3>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>
                    كود: {selectedStudentForDetails.studentCode} • {selectedStudentForDetails.section}
                  </div>
                  <div style={{ fontSize: '11px', color: '#1e40af', fontWeight: '600' }}>
                    {selectedStudentForDetails.academicYear} • {selectedStudentForDetails.department}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '16px', textAlign: 'center' }}>
                <div style={{ backgroundColor: '#f0fdf4', padding: '10px 6px', borderRadius: '10px', border: '1px solid #bbf7d0' }}>
                  <div style={{ fontSize: '10px', color: '#166534', fontWeight: '700' }}>نسبة الحضور</div>
                  <div style={{ fontSize: '16px', fontWeight: '900', color: '#15803d' }}>{selectedStudentForDetails.attendanceRate}%</div>
                </div>

                <div style={{ backgroundColor: '#eff6ff', padding: '10px 6px', borderRadius: '10px', border: '1px solid #bfdbfe' }}>
                  <div style={{ fontSize: '10px', color: '#1e40af', fontWeight: '700' }}>التكليفات</div>
                  <div style={{ fontSize: '16px', fontWeight: '900', color: '#1d4ed8' }}>
                    {selectedStudentForDetails.submittedAssignmentsCount}/{selectedStudentForDetails.totalAssignmentsCount}
                  </div>
                </div>

                <div style={{ backgroundColor: '#fffdf5', padding: '10px 6px', borderRadius: '10px', border: '1px solid #fde68a' }}>
                  <div style={{ fontSize: '10px', color: '#92400e', fontWeight: '700' }}>التقييم العام</div>
                  <div style={{ fontSize: '16px', fontWeight: '900', color: '#d97706' }}>
                    {selectedStudentForDetails.currentAverageGrade}%
                  </div>
                </div>
              </div>

              {/* Quick actions for Doctor */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button
                  onClick={() => alert(`تم إرسال إشعار أكاديمي وتنبيه متابعة للطالب ${selectedStudentForDetails.name}`)}
                  className="btn btn-outline btn-block"
                  style={{ fontSize: '12px', padding: '10px' }}
                >
                  إرسال ملاحظة أكاديمية للطالب
                </button>

                <button
                  onClick={() => setSelectedStudentForDetails(null)}
                  className="btn btn-primary btn-block"
                  style={{ fontSize: '12px', padding: '10px' }}
                >
                  إغلاق
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

