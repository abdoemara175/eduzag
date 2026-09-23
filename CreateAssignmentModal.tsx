import React, { useState } from 'react';
import { useApp } from './AppContext';
import {
  FileText,
  Calendar,
  Clock,
  BookOpen,
  CheckCircle2,
  X,
  Send,
  Plus
} from 'lucide-react';

interface CreateAssignmentModalProps {
  onClose: () => void;
}

export const CreateAssignmentModal: React.FC<CreateAssignmentModalProps> = ({ onClose }) => {
  const { courses, createAssignment } = useApp();

  const [title, setTitle] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState(courses[0]?.id || '');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('2026-10-25');
  const [dueTime, setDueTime] = useState('11:59 م');
  const [totalMarks, setTotalMarks] = useState(20);
  const [section, setSection] = useState('شعبة (أ)');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const courseObj = courses.find(c => c.id === selectedCourseId) || courses[0];

    createAssignment({
      courseId: courseObj.id,
      courseName: courseObj.name,
      title: title.trim(),
      description: description.trim(),
      dueDate,
      dueTime,
      totalMarks: Number(totalMarks) || 20,
      department: 'قسم تكنولوجيا التعليم',
      academicYear: 'الفرقة الأولى',
      section,
      attachedFile: { name: 'ملف_إرشادات_التكليف.pdf', size: '1.4 ميجابايت' }
    });

    setIsSuccess(true);
    setTimeout(() => {
      onClose();
      // Optional: keep in assignments tab
    }, 1400);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="bottom-sheet" onClick={e => e.stopPropagation()} style={{ maxHeight: '90%' }}>
        <div className="sheet-handle" />

        <div className="sheet-header">
          <div>
            <span style={{ fontSize: '10px', color: '#2563eb', fontWeight: '800' }}>
              بوابة عضو هيئة التدريس
            </span>
            <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a' }}>
              نشر تكليف دراسي جديد
            </h3>
          </div>
          <button
            onClick={onClose}
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
          {isSuccess ? (
            <div style={{
              textAlign: 'center',
              padding: '30px 20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: '#dcfce7',
                color: '#15803d',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px'
              }}>
                <CheckCircle2 size={34} />
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', marginBottom: '6px' }}>
                تم نشر التكليف بنجاح!
              </h3>
              <p style={{ fontSize: '12px', color: '#64748b' }}>
                أصبح التكليف متاحاً الآن في لوحة الطلاب ويمكنهم استعراضه ورفع الحلول.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Assignment Title */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '4px' }}>
                  اسم التكليف *
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثال: تحليل وتصميم برمجية تفاعلية بأسلوب ADDIE"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    fontSize: '12px'
                  }}
                />
              </div>

              {/* Course Selector */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '4px' }}>
                  المقرر الدراسي *
                </label>
                <select
                  value={selectedCourseId}
                  onChange={e => setSelectedCourseId(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    fontSize: '12px',
                    backgroundColor: '#ffffff'
                  }}
                >
                  {courses.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.code})
                    </option>
                  ))}
                </select>
              </div>

              {/* Description & Rubric */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '4px' }}>
                  الوصف والتعليمات للطلاب *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="اكتب المعايير والمتطلبات والملفات المطلوبة لتسليم التكليف..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    fontSize: '12px',
                    resize: 'none'
                  }}
                />
              </div>

              {/* Due Date & Time & Marks Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>
                    تاريخ التسليم *
                  </label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={e => setDueDate(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '12px'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>
                    الدرجة الكلية *
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={totalMarks}
                    onChange={e => setTotalMarks(Number(e.target.value))}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '12px'
                    }}
                  />
                </div>
              </div>

              {/* Section Target */}
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>
                  الشعبة المستهدفة
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {['شعبة (أ)', 'شعبة (ب)', 'جميع الشعب'].map(sec => (
                    <button
                      key={sec}
                      type="button"
                      onClick={() => setSection(sec)}
                      style={{
                        flex: 1,
                        padding: '6px',
                        borderRadius: '8px',
                        fontSize: '11px',
                        fontWeight: section === sec ? '800' : '600',
                        backgroundColor: section === sec ? '#1e3a8a' : '#f1f5f9',
                        color: section === sec ? '#ffffff' : '#475569',
                        border: section === sec ? '1px solid #1e3a8a' : '1px solid #e2e8f0'
                      }}
                    >
                      {sec}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Submit */}
              <div style={{ marginTop: '10px' }}>
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  style={{ padding: '12px', fontSize: '13px' }}
                >
                  <Send size={15} />
                  <span>نشر التكليف الآن</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

