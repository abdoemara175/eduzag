import React, { useState } from 'react';
import { useApp } from './AppContext';
import {
  FileText,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Clock3,
  Upload,
  FileCheck,
  ChevronLeft,
  X,
  Send,
  Paperclip
} from 'lucide-react';
import { Assignment, AssignmentStatus } from './types';

export const StudentAssignments: React.FC = () => {
  const {
    assignments,
    submitAssignment,
    selectedAssignmentForDetails,
    setSelectedAssignmentForDetails
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<'الكل' | AssignmentStatus>('الكل');
  
  // Submission dialog state
  const [isSubmittingMode, setIsSubmittingMode] = useState(false);
  const [submissionNotes, setSubmissionNotes] = useState('');
  const [attachedFileName, setAttachedFileName] = useState('حل_التكليف_المعتمد.pdf');
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  // Filter assignments
  const filteredAssignments = assignments.filter(item => {
    if (activeCategory === 'الكل') return true;
    return item.status === activeCategory;
  });

  const handleOpenDetails = (asg: Assignment) => {
    setSelectedAssignmentForDetails(asg);
    setIsSubmittingMode(false);
    setSubmissionSuccess(false);
    setSubmissionNotes(asg.studentNotes || '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAssignmentForDetails) return;

    submitAssignment(selectedAssignmentForDetails.id, submissionNotes, attachedFileName);
    setSubmissionSuccess(true);
    setTimeout(() => {
      setSelectedAssignmentForDetails(null);
      setIsSubmittingMode(false);
      setSubmissionSuccess(false);
    }, 1500);
  };

  const getStatusBadge = (status: AssignmentStatus) => {
    switch (status) {
      case 'تم التسليم':
        return {
          text: 'تم التسليم',
          bg: '#dcfce7',
          color: '#15803d',
          border: '#86efac',
          icon: CheckCircle2
        };
      case 'متأخر':
        return {
          text: 'متأخر',
          bg: '#fee2e2',
          color: '#b91c1c',
          border: '#fca5a5',
          icon: AlertCircle
        };
      case 'مطلوب':
      default:
        return {
          text: 'مطلوب تسليمه',
          bg: '#fef3c7',
          color: '#b45309',
          border: '#fcd34d',
          icon: Clock3
        };
    }
  };

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
          التكليفات والمهام الدراسية
        </h2>
        <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '600' }}>
          إجمالي {assignments.length} تكليفات • {assignments.filter(a => a.status === 'مطلوب').length} بانتظار التسليم
        </div>
      </div>

      {/* Categories Tabs */}
      <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', scrollbarWidth: 'none' }}>
        {(['الكل', 'مطلوب', 'تم التسليم', 'متأخر'] as const).map(cat => {
          const isSelected = activeCategory === cat;
          const count = cat === 'الكل'
            ? assignments.length
            : assignments.filter(a => a.status === cat).length;

          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                flex: 1,
                padding: '8px 10px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: isSelected ? '800' : '600',
                backgroundColor: isSelected ? '#1e3a8a' : '#ffffff',
                color: isSelected ? '#ffffff' : '#475569',
                border: isSelected ? '1px solid #1e3a8a' : '1px solid #e2e8f0',
                boxShadow: isSelected ? '0 3px 8px rgba(30,58,138,0.2)' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                whiteSpace: 'nowrap'
              }}
            >
              <span>{cat}</span>
              <span style={{
                fontSize: '10px',
                backgroundColor: isSelected ? 'rgba(255,255,255,0.25)' : '#f1f5f9',
                color: isSelected ? '#ffffff' : '#64748b',
                padding: '1px 6px',
                borderRadius: '10px',
                fontWeight: '700'
              }}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Assignments List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filteredAssignments.length === 0 ? (
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px dashed #cbd5e1',
            padding: '30px 20px',
            textAlign: 'center',
            color: '#64748b'
          }}>
            <FileText size={32} style={{ margin: '0 auto 10px auto', opacity: 0.5 }} />
            <div style={{ fontSize: '13px', fontWeight: '700' }}>لا توجد تكليفات ضمن هذا التصنيف</div>
          </div>
        ) : (
          filteredAssignments.map(asg => {
            const badge = getStatusBadge(asg.status);
            const BadgeIcon = badge.icon;

            return (
              <div
                key={asg.id}
                onClick={() => handleOpenDetails(asg)}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0',
                  padding: '16px',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.04)',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: '700',
                    color: '#2563eb',
                    backgroundColor: '#eff6ff',
                    padding: '2px 8px',
                    borderRadius: '6px'
                  }}>
                    {asg.courseName}
                  </span>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '11px',
                    fontWeight: '800',
                    padding: '2px 8px',
                    borderRadius: '6px',
                    backgroundColor: badge.bg,
                    color: badge.color,
                    border: `1px solid ${badge.border}`
                  }}>
                    <BadgeIcon size={12} />
                    <span>{badge.text}</span>
                  </span>
                </div>

                <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a', marginBottom: '8px', lineHeight: 1.3 }}>
                  {asg.title}
                </h3>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', color: '#64748b' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={13} color="#64748b" />
                    <span>آخر موعد: {asg.dueDate} ({asg.dueTime})</span>
                  </div>
                  <span style={{ fontWeight: '700', color: '#0f172a' }}>
                    {asg.totalMarks} درجات
                  </span>
                </div>

                {asg.grade !== undefined && (
                  <div style={{
                    marginTop: '10px',
                    paddingTop: '8px',
                    borderTop: '1px solid #f1f5f9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '11px'
                  }}>
                    <span style={{ color: '#15803d', fontWeight: '700' }}>
                      الدرجة المرصودة: {asg.grade} / {asg.totalMarks}
                    </span>
                    <span style={{ color: '#2563eb', fontWeight: '700' }}>
                      عرض الملاحظات ←
                    </span>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Assignment Details & Submission Modal */}
      {selectedAssignmentForDetails && (
        <div className="modal-overlay" onClick={() => setSelectedAssignmentForDetails(null)}>
          <div className="bottom-sheet" onClick={e => e.stopPropagation()}>
            <div className="sheet-handle" />
            <div className="sheet-header">
              <div>
                <span style={{ fontSize: '10px', color: '#2563eb', fontWeight: '800' }}>
                  {selectedAssignmentForDetails.courseName}
                </span>
                <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a' }}>
                  تفاصيل التكليف
                </h3>
              </div>
              <button
                onClick={() => setSelectedAssignmentForDetails(null)}
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
              {/* Title & Status */}
              <div style={{
                backgroundColor: '#f8fafc',
                borderRadius: '12px',
                padding: '14px',
                border: '1px solid #e2e8f0',
                marginBottom: '14px'
              }}>
                <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                  {selectedAssignmentForDetails.title}
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', fontSize: '11px', color: '#475569' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={13} color="#64748b" />
                    <span>آخر موعد: {selectedAssignmentForDetails.dueDate} ({selectedAssignmentForDetails.dueTime})</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={13} color="#64748b" />
                    <span>الدرجة الكلية: {selectedAssignmentForDetails.totalMarks} درجات</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div style={{ marginBottom: '14px' }}>
                <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a', marginBottom: '6px' }}>
                  وصف التكليف والتعليمات
                </h4>
                <p style={{ fontSize: '12px', color: '#334155', lineHeight: 1.6, backgroundColor: '#ffffff', padding: '10px', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
                  {selectedAssignmentForDetails.description}
                </p>
              </div>

              {/* Attached file from Doctor */}
              {selectedAssignmentForDetails.attachedFile && (
                <div style={{ marginBottom: '16px' }}>
                  <h4 style={{ fontSize: '12px', fontWeight: '800', color: '#0f172a', marginBottom: '6px' }}>
                    ملف مرفق من أستاذ المادة
                  </h4>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: '10px',
                    backgroundColor: '#eff6ff',
                    border: '1px solid #bfdbfe',
                    fontSize: '11px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Paperclip size={14} color="#2563eb" />
                      <span style={{ fontWeight: '700', color: '#1e40af' }}>
                        {selectedAssignmentForDetails.attachedFile.name}
                      </span>
                    </div>
                    <span style={{ color: '#64748b' }}>
                      {selectedAssignmentForDetails.attachedFile.size}
                    </span>
                  </div>
                </div>
              )}

              {/* Already submitted view */}
              {selectedAssignmentForDetails.status === 'تم التسليم' && (
                <div style={{
                  backgroundColor: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  borderRadius: '12px',
                  padding: '12px',
                  marginBottom: '16px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#15803d', fontWeight: '800', fontSize: '13px', marginBottom: '4px' }}>
                    <CheckCircle2 size={16} />
                    <span>تم تسليم هذا التكليف بنجاح</span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#166534', marginBottom: '6px' }}>
                    تاريخ التسليم: {selectedAssignmentForDetails.submissionDate || 'مؤخراً'}
                  </div>
                  {selectedAssignmentForDetails.submittedFile && (
                    <div style={{ fontSize: '11px', color: '#334155' }}>
                      الملف المرفوع: <strong>{selectedAssignmentForDetails.submittedFile}</strong>
                    </div>
                  )}
                  {selectedAssignmentForDetails.feedback && (
                    <div style={{
                      marginTop: '8px',
                      padding: '8px',
                      backgroundColor: '#ffffff',
                      borderRadius: '8px',
                      border: '1px solid #dcfce7',
                      fontSize: '11px',
                      color: '#1e293b'
                    }}>
                      <div style={{ fontWeight: '800', color: '#15803d', marginBottom: '2px' }}>
                        ملاحظات أستاذ المادة:
                      </div>
                      {selectedAssignmentForDetails.feedback}
                    </div>
                  )}
                </div>
              )}

              {/* Submission Form for Pending / Late */}
              {selectedAssignmentForDetails.status !== 'تم التسليم' && (
                <div>
                  {!isSubmittingMode ? (
                    <button
                      onClick={() => setIsSubmittingMode(true)}
                      className="btn btn-primary btn-block"
                      style={{ padding: '12px' }}
                    >
                      <Upload size={16} />
                      <span>تسليم التكليف الآن</span>
                    </button>
                  ) : (
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a' }}>
                        إرسال الحل والتكليف
                      </h4>

                      {/* File upload mock */}
                      <div style={{
                        border: '2px dashed #93c5fd',
                        borderRadius: '12px',
                        padding: '16px',
                        textAlign: 'center',
                        backgroundColor: '#eff6ff'
                      }}>
                        <Upload size={24} color="#2563eb" style={{ margin: '0 auto 6px auto' }} />
                        <div style={{ fontSize: '12px', fontWeight: '700', color: '#1e40af' }}>
                          {attachedFileName}
                        </div>
                        <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>
                          ملف PDF جاهز للتسليم (تجربة العرض)
                        </div>
                      </div>

                      {/* Student Notes */}
                      <div>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>
                          ملاحظات أو تعليق للطالب (اختياري):
                        </label>
                        <textarea
                          rows={3}
                          value={submissionNotes}
                          onChange={e => setSubmissionNotes(e.target.value)}
                          placeholder="اكتب أية ملاحظات حول طريقة إعداد التكليف أو المراجع المستخدمة..."
                          style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '10px',
                            border: '1px solid #cbd5e1',
                            fontSize: '12px',
                            resize: 'none'
                          }}
                        />
                      </div>

                      {submissionSuccess ? (
                        <div style={{
                          backgroundColor: '#dcfce7',
                          color: '#15803d',
                          padding: '10px',
                          borderRadius: '10px',
                          textAlign: 'center',
                          fontSize: '12px',
                          fontWeight: '800'
                        }}>
                          تم تسليم التكليف بنجاح!
                        </div>
                      ) : (
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            type="button"
                            onClick={() => setIsSubmittingMode(false)}
                            className="btn btn-secondary"
                            style={{ flex: 1 }}
                          >
                            إلغاء
                          </button>
                          <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ flex: 2 }}
                          >
                            <Send size={15} />
                            <span>تأكيد وتسليم التكليف</span>
                          </button>
                        </div>
                      )}
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

