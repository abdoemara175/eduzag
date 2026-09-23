import React, { useState } from 'react';
import { useApp } from './AppContext';
import {
  FileCheck2,
  Calendar,
  Clock,
  BookOpen,
  Plus,
  Trash2,
  CheckCircle2,
  X,
  ChevronLeft,
  ChevronRight,
  Send,
  HelpCircle
} from 'lucide-react';
import { Question } from './types';

interface CreateExamModalProps {
  onClose: () => void;
}

export const CreateExamModal: React.FC<CreateExamModalProps> = ({ onClose }) => {
  const { courses, createExam } = useApp();

  const [step, setStep] = useState<1 | 2>(1);

  // Step 1: Basic details
  const [title, setTitle] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState(courses[0]?.id || '');
  const [academicYear, setAcademicYear] = useState('الفرقة الأولى');
  const [section, setSection] = useState('شعبة (أ)');
  const [date, setDate] = useState('2026-10-30');
  const [time, setTime] = useState('10:00 ص – 10:30 ص');
  const [durationMinutes, setDurationMinutes] = useState(25);
  const [instructionText, setInstructionText] = useState(
    'مدة الاختبار 25 دقيقة.\nيمنع الخروج من شاشة الاختبار أثناء الجلسة.\nجميع الأسئلة إجبارية.'
  );

  // Step 2: Questions list
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 'q_new_1',
      text: 'ما هي أهم خصائص التعلم التكيفي المعتمد على الذكاء الاصطناعي؟',
      type: 'mcq',
      options: [
        'تخصيص مسار التعلم وفق مستوى كل طالب',
        'توحيد نمط الشرح لجميع المتعلمين',
        'إلغاء التقييم المستمر والنهائي',
        'تقليص دور المتعلم في البحث'
      ],
      correctOptionIndex: 0,
      points: 5
    }
  ]);

  // Draft question inputs for adding new questions
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newQuestionType, setNewQuestionType] = useState<'mcq' | 'true_false'>('mcq');
  const [newOptions, setNewOptions] = useState<string[]>(['', '', '', '']);
  const [newCorrectIndex, setNewCorrectIndex] = useState(0);
  const [newPoints, setNewPoints] = useState(5);

  const [isSuccess, setIsSuccess] = useState(false);

  const handleAddQuestion = () => {
    if (!newQuestionText.trim()) return;

    const opts =
      newQuestionType === 'true_false'
        ? ['صواب', 'خطأ']
        : newOptions.filter(o => o.trim().length > 0);

    const questionItem: Question = {
      id: `q_custom_${Date.now()}`,
      text: newQuestionText.trim(),
      type: newQuestionType,
      options: opts.length > 0 ? opts : ['الخيار الأول', 'الخيار الثاني'],
      correctOptionIndex: newCorrectIndex,
      points: Number(newPoints) || 5
    };

    setQuestions(prev => [...prev, questionItem]);
    setNewQuestionText('');
    setNewOptions(['', '', '', '']);
    setNewCorrectIndex(0);
  };

  const handleRemoveQuestion = (idx: number) => {
    setQuestions(prev => prev.filter((_, i) => i !== idx));
  };

  const handlePublishExam = () => {
    if (!title.trim() || questions.length === 0) return;

    const courseObj = courses.find(c => c.id === selectedCourseId) || courses[0];
    const instructionsList = instructionText.split('\n').filter(i => i.trim().length > 0);
    const totalMarks = questions.reduce((acc, q) => acc + q.points, 0);

    createExam({
      courseId: courseObj.id,
      courseName: courseObj.name,
      doctorName: 'أ.د. أشرف فوزي',
      title: title.trim(),
      date,
      time,
      durationMinutes: Number(durationMinutes) || 20,
      totalQuestions: questions.length,
      totalMarks,
      instructions: instructionsList,
      academicYear,
      section,
      questions
    });

    setIsSuccess(true);
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="bottom-sheet" onClick={e => e.stopPropagation()} style={{ maxHeight: '92%' }}>
        <div className="sheet-handle" />

        <div className="sheet-header">
          <div>
            <span style={{ fontSize: '10px', color: '#d97706', fontWeight: '800' }}>
              بوابة الدكتور • الخطوة {step} من 2
            </span>
            <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a' }}>
              إنشاء ونشر اختبار إلكتروني
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
            <div style={{ textAlign: 'center', padding: '30px 20px' }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: '#dcfce7',
                color: '#15803d',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px auto'
              }}>
                <CheckCircle2 size={34} />
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', marginBottom: '6px' }}>
                تم نشر الاختبار بنجاح!
              </h3>
              <p style={{ fontSize: '12px', color: '#64748b' }}>
                أصبح الاختبار الآن متاحاً للطلاب مع تفعيل خاصية فحص النزاهة ورصد النتائج التلقائية.
              </p>
            </div>
          ) : step === 1 ? (
            /* STEP 1: Basic Information */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '4px' }}>
                  عنوان الاختبار *
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثال: الاختبار الدوري: مهارات تصميم النظم التعليمية"
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

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>
                    الفرقة الدراسية
                  </label>
                  <select
                    value={academicYear}
                    onChange={e => setAcademicYear(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '12px',
                      backgroundColor: '#ffffff'
                    }}
                  >
                    <option value="الفرقة الأولى">الفرقة الأولى</option>
                    <option value="الفرقة الثانية">الفرقة الثانية</option>
                    <option value="الفرقة الثالثة">الفرقة الثالثة</option>
                    <option value="الفرقة الرابعة">الفرقة الرابعة</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>
                    الشعبة
                  </label>
                  <select
                    value={section}
                    onChange={e => setSection(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '12px',
                      backgroundColor: '#ffffff'
                    }}
                  >
                    <option value="شعبة (أ)">شعبة (أ)</option>
                    <option value="شعبة (ب)">شعبة (ب)</option>
                    <option value="جميع الشعب">جميع الشعب</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>
                    تاريخ الانعقاد *
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
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
                    مدة الاختبار (بالدقائق) *
                  </label>
                  <input
                    type="number"
                    min={5}
                    max={120}
                    value={durationMinutes}
                    onChange={e => setDurationMinutes(Number(e.target.value))}
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

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>
                  تعليمات الاختبار (سطر لكل تعليم)
                </label>
                <textarea
                  rows={3}
                  value={instructionText}
                  onChange={e => setInstructionText(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '12px',
                    resize: 'none'
                  }}
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  if (title.trim()) setStep(2);
                }}
                disabled={!title.trim()}
                className="btn btn-primary btn-block"
                style={{
                  marginTop: '10px',
                  padding: '12px',
                  opacity: !title.trim() ? 0.5 : 1
                }}
              >
                <span>الانتقال لإضافة الأسئلة (الخطوة 2)</span>
                <ChevronLeft size={16} />
              </button>
            </div>
          ) : (
            /* STEP 2: Questions Builder */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Existing Questions List */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a' }}>
                    الأسئلة المضافة ({questions.length})
                  </h4>
                  <span style={{ fontSize: '11px', color: '#15803d', fontWeight: '700' }}>
                    إجمالي الدرجات: {questions.reduce((a, b) => a + b.points, 0)}
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {questions.map((q, idx) => (
                    <div
                      key={q.id}
                      style={{
                        backgroundColor: '#f8fafc',
                        borderRadius: '10px',
                        border: '1px solid #e2e8f0',
                        padding: '10px 12px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        gap: '8px'
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                          <span style={{ fontSize: '10px', fontWeight: '800', color: '#2563eb' }}>
                            سؤال {idx + 1} ({q.points} درجات)
                          </span>
                          <span style={{ fontSize: '10px', color: '#64748b' }}>
                            [{q.type === 'mcq' ? 'اختيار من متعدد' : 'صح أو خطأ'}]
                          </span>
                        </div>
                        <div style={{ fontSize: '12px', fontWeight: '700', color: '#0f172a' }}>
                          {q.text}
                        </div>
                        <div style={{ fontSize: '10px', color: '#059669', marginTop: '2px' }}>
                          الإجابة الصحيحة: {q.options[q.correctOptionIndex]}
                        </div>
                      </div>

                      <button
                        onClick={() => handleRemoveQuestion(idx)}
                        style={{ color: '#ef4444', padding: '4px' }}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add New Question Section */}
              <div style={{
                backgroundColor: '#eff6ff',
                borderRadius: '14px',
                border: '1px solid #bfdbfe',
                padding: '14px'
              }}>
                <h4 style={{ fontSize: '12px', fontWeight: '800', color: '#1e40af', marginBottom: '8px' }}>
                  + إضافة سؤال جديد
                </h4>

                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setNewQuestionType('mcq')}
                    style={{
                      flex: 1,
                      padding: '6px',
                      borderRadius: '8px',
                      fontSize: '11px',
                      fontWeight: '700',
                      backgroundColor: newQuestionType === 'mcq' ? '#1e3a8a' : '#ffffff',
                      color: newQuestionType === 'mcq' ? '#ffffff' : '#334155',
                      border: '1px solid #cbd5e1'
                    }}
                  >
                    اختيار من متعدد
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewQuestionType('true_false')}
                    style={{
                      flex: 1,
                      padding: '6px',
                      borderRadius: '8px',
                      fontSize: '11px',
                      fontWeight: '700',
                      backgroundColor: newQuestionType === 'true_false' ? '#1e3a8a' : '#ffffff',
                      color: newQuestionType === 'true_false' ? '#ffffff' : '#334155',
                      border: '1px solid #cbd5e1'
                    }}
                  >
                    صح أو خطأ
                  </button>
                </div>

                <div style={{ marginBottom: '8px' }}>
                  <input
                    type="text"
                    placeholder="نص السؤال..."
                    value={newQuestionText}
                    onChange={e => setNewQuestionText(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '12px'
                    }}
                  />
                </div>

                {newQuestionType === 'mcq' ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '8px' }}>
                    {newOptions.map((opt, oIdx) => (
                      <div key={oIdx} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <input
                          type="radio"
                          name="correctOption"
                          checked={newCorrectIndex === oIdx}
                          onChange={() => setNewCorrectIndex(oIdx)}
                        />
                        <input
                          type="text"
                          placeholder={`الخيار ${oIdx + 1}`}
                          value={opt}
                          onChange={e => {
                            const updated = [...newOptions];
                            updated[oIdx] = e.target.value;
                            setNewOptions(updated);
                          }}
                          style={{
                            flex: 1,
                            padding: '6px 8px',
                            borderRadius: '6px',
                            border: '1px solid #cbd5e1',
                            fontSize: '11px'
                          }}
                        />
                      </div>
                    ))}
                    <div style={{ fontSize: '10px', color: '#64748b' }}>
                      * اختر الدائرة بجانب الخيار الذي يمثل الإجابة الصحيحة.
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: '10px', marginBottom: '8px', fontSize: '12px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <input
                        type="radio"
                        name="tfOption"
                        checked={newCorrectIndex === 0}
                        onChange={() => setNewCorrectIndex(0)}
                      />
                      <span>صواب (صح)</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <input
                        type="radio"
                        name="tfOption"
                        checked={newCorrectIndex === 1}
                        onChange={() => setNewCorrectIndex(1)}
                      />
                      <span>خطأ</span>
                    </label>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleAddQuestion}
                  style={{
                    width: '100%',
                    backgroundColor: '#ffffff',
                    border: '1px solid #3b82f6',
                    color: '#1d4ed8',
                    padding: '6px',
                    borderRadius: '8px',
                    fontSize: '11px',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px'
                  }}
                >
                  <Plus size={14} />
                  <span>إدراج السؤال في الاختبار</span>
                </button>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn btn-secondary"
                  style={{ flex: 1 }}
                >
                  <ChevronRight size={15} />
                  <span>السابق</span>
                </button>

                <button
                  type="button"
                  onClick={handlePublishExam}
                  disabled={questions.length === 0}
                  className="btn btn-primary"
                  style={{ flex: 2, padding: '12px' }}
                >
                  <Send size={15} />
                  <span>نشر الامتحان للطلاب</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

