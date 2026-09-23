import React, { useState, useEffect } from 'react';
import { useApp } from './AppContext';
import {
  Clock,
  AlertTriangle,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  HelpCircle,
  ShieldAlert,
  X,
  Award,
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import { Exam } from './types';

interface ExamSessionModalProps {
  exam: Exam;
  onClose: () => void;
}

export const ExamSessionModal: React.FC<ExamSessionModalProps> = ({ exam, onClose }) => {
  const { submitExamAnswers, recordIntegrityWarning } = useApp();

  // Questions setup
  const questions = exam.questions.length > 0 ? exam.questions : [
    {
      id: 'q_default_1',
      text: 'ما هي المرحلة الأولى والأساسية في نموذج التصميم التعليمي العام ADDIE؟',
      type: 'mcq' as const,
      options: ['التحليل (Analysis)', 'التصميم (Design)', 'التطوير (Development)', 'التقويم (Evaluation)'],
      correctOptionIndex: 0,
      points: 4
    },
    {
      id: 'q_default_2',
      text: 'يُعرّف "الوسيط التفاعلي" بأنه الوسيط الذي يتيح للمتعلم التحكم في مسار المحتوى وتدفقه وسرعته.',
      type: 'true_false' as const,
      options: ['صواب', 'خطأ'],
      correctOptionIndex: 0,
      points: 4
    },
    {
      id: 'q_default_3',
      text: 'أي من المعايير الآتية هو الأهم عند تصميم واجهة المستخدم (UI) لبرمجية أطفال بالمرحلة الابتدائية؟',
      type: 'mcq' as const,
      options: [
        'استخدام نصوص كثيرة ومعقدة وشروح نظرية طويلة',
        'البساطة والأيقونات البصرية الواضحة والتغذية الراجعة الفورية',
        'تقليل الألوان والاعتماد الكامل على التدرج الرمادي',
        'استخدام خطوط خط الرقعة المعقدة'
      ],
      correctOptionIndex: 1,
      points: 4
    },
    {
      id: 'q_default_4',
      text: 'تهدف بيئات التعلم التكيفية القائمة على تقنيات الذكاء الاصطناعي إلى:',
      type: 'mcq' as const,
      options: [
        'تقديم نفس المحتوى بنفس الوتيرة لجميع المتعلمين',
        'تخصيص مسار التعلم وفقاً لمستوى وقدرات واحتياجات كل متعلم',
        'استبدال عضو هيئة التدريس بالكامل دون إشراف تربوي',
        'إلغاء التقييمات والاختبارات الدورية'
      ],
      correctOptionIndex: 1,
      points: 4
    },
    {
      id: 'q_default_5',
      text: 'صيغة الملفات المتجهة (Vector) الأكثر ملاءمة للأيقونات والرسومات القابلة للتكبير دون فقد الجودة هي:',
      type: 'mcq' as const,
      options: ['JPG', 'BMP', 'SVG', 'GIF'],
      correctOptionIndex: 2,
      points: 4
    }
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  
  // Countdown Timer: 20 minutes (1200 seconds)
  const [secondsRemaining, setSecondsRemaining] = useState(exam.durationMinutes * 60 || 1200);

  // Integrity Monitoring state
  const [warningCount, setWarningCount] = useState(0);
  const [showIntegrityWarning, setShowIntegrityWarning] = useState(false);
  const [lastWarningReason, setLastWarningReason] = useState('مغادرة شاشة الاختبار');

  // Confirmation & Result state
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  // Timer countdown effect
  useEffect(() => {
    if (isSubmitted || showConfirmModal) return;

    const timer = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinalSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted, showConfirmModal]);

  // Frontend Integrity Simulator Listeners (Page blur / visibility)
  useEffect(() => {
    if (isSubmitted) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        triggerIntegrityWarning('تم رصد مغادرة شاشة الاختبار والانتقال لتبويب آخر.');
      }
    };

    const handleWindowBlur = () => {
      // In mobile app simulation, blur indicates moving out of viewport
      triggerIntegrityWarning('تم فقد التركيز على نافذة الاختبار.');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, [isSubmitted, warningCount]);

  const triggerIntegrityWarning = (reason: string) => {
    if (isSubmitted) return;
    setWarningCount(prev => {
      const updated = prev + 1;
      recordIntegrityWarning(exam.id, reason, `عدد التنبيهات التراكمي: ${updated}`);
      return updated;
    });
    setLastWarningReason(reason);
    setShowIntegrityWarning(true);
  };

  const handleSelectAnswer = (optionIndex: number) => {
    const qId = questions[currentQuestionIndex].id;
    setSelectedAnswers(prev => ({
      ...prev,
      [qId]: optionIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleFinalSubmit = () => {
    // Calculate score
    let score = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctOptionIndex) {
        score += q.points;
      }
    });

    setFinalScore(score);
    setIsSubmitted(true);
    setShowConfirmModal(false);

    submitExamAnswers(exam.id, selectedAnswers, warningCount, score);
  };

  // Format seconds to MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const currentQ = questions[currentQuestionIndex];
  const answeredCount = Object.keys(selectedAnswers).length;
  const isAllAnswered = answeredCount === questions.length;

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      backgroundColor: '#f8fafc',
      zIndex: 60,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* Top Exam Header with Timer & Warning Badge */}
      <div style={{
        backgroundColor: '#1e3a8a',
        color: '#ffffff',
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
      }}>
        <div>
          <div style={{ fontSize: '11px', color: '#bfdbfe', fontWeight: '700' }}>
            {exam.courseName}
          </div>
          <div style={{ fontSize: '13px', fontWeight: '800' }}>
            {exam.title}
          </div>
        </div>

        {/* Live Countdown Timer */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          backgroundColor: secondsRemaining < 300 ? '#dc2626' : 'rgba(255,255,255,0.18)',
          padding: '4px 10px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: '800',
          fontVariantNumeric: 'tabular-nums'
        }}>
          <Clock size={14} />
          <span>{formatTime(secondsRemaining)}</span>
        </div>
      </div>

      {/* Warning Counter Indicator & Reviewer Simulation Button */}
      <div style={{
        backgroundColor: warningCount > 0 ? '#fffbeb' : '#f1f5f9',
        borderBottom: warningCount > 0 ? '1px solid #fcd34d' : '1px solid #e2e8f0',
        padding: '6px 14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '11px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <ShieldAlert size={14} color={warningCount > 0 ? '#d97706' : '#64748b'} />
          <span style={{ fontWeight: '700', color: warningCount > 0 ? '#92400e' : '#475569' }}>
            فحص النزاهة: عدد التنبيهات: {warningCount}
          </span>
        </div>

        {/* Trigger button for demo reviewers */}
        {!isSubmitted && (
          <button
            onClick={() => triggerIntegrityWarning('تم رصد مغادرة شاشة الاختبار. يرجى العودة إلى الاختبار.')}
            style={{
              fontSize: '10px',
              fontWeight: '700',
              color: '#d97706',
              backgroundColor: '#fef3c7',
              border: '1px solid #fcd34d',
              padding: '2px 8px',
              borderRadius: '6px'
            }}
          >
            تجربة رصد المغادرة (محاكاة)
          </button>
        )}
      </div>

      {/* Main Body */}
      {!isSubmitted ? (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: '14px 16px',
          overflowY: 'auto'
        }}>
          {/* Question Index Bar & Progress */}
          <div style={{ marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', fontWeight: '800', color: '#1e293b', marginBottom: '6px' }}>
              <span>السؤال {currentQuestionIndex + 1} من {questions.length}</span>
              <span style={{ color: '#2563eb' }}>
                المُجاب عليه: {answeredCount} / {questions.length}
              </span>
            </div>

            {/* Progress Bar */}
            <div style={{ height: '6px', backgroundColor: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
                backgroundColor: '#2563eb',
                borderRadius: '3px',
                transition: 'width 0.3s ease'
              }} />
            </div>
          </div>

          {/* Question Number Pills Navigation Grid */}
          <div style={{
            display: 'flex',
            gap: '6px',
            marginBottom: '16px',
            justifyContent: 'center'
          }}>
            {questions.map((q, idx) => {
              const isCurrent = idx === currentQuestionIndex;
              const isAnswered = selectedAnswers[q.id] !== undefined;

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentQuestionIndex(idx)}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: '800',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: isCurrent ? '#1e3a8a' : isAnswered ? '#dcfce7' : '#ffffff',
                    color: isCurrent ? '#ffffff' : isAnswered ? '#15803d' : '#64748b',
                    border: isCurrent ? '2px solid #1e3a8a' : isAnswered ? '1.5px solid #86efac' : '1px solid #cbd5e1',
                    boxShadow: isCurrent ? '0 2px 6px rgba(30,58,138,0.3)' : 'none'
                  }}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Current Question Statement Card */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            padding: '16px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
            marginBottom: '14px'
          }}>
            <div style={{ fontSize: '11px', color: '#2563eb', fontWeight: '800', marginBottom: '4px' }}>
              {currentQ.points} درجات • {currentQ.type === 'mcq' ? 'اختيار من متعدد' : 'صواب أو خطأ'}
            </div>
            <h2 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a', lineHeight: 1.5 }}>
              {currentQ.text}
            </h2>
          </div>

          {/* Options List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
            {currentQ.options.map((opt, optIdx) => {
              const isSelected = selectedAnswers[currentQ.id] === optIdx;

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectAnswer(optIdx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    backgroundColor: isSelected ? '#eff6ff' : '#ffffff',
                    border: isSelected ? '2px solid #2563eb' : '1px solid #e2e8f0',
                    color: isSelected ? '#1e3a8a' : '#334155',
                    textAlign: 'right',
                    fontSize: '13px',
                    fontWeight: isSelected ? '700' : '600',
                    boxShadow: isSelected ? '0 2px 8px rgba(37,99,235,0.12)' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    border: isSelected ? '6px solid #2563eb' : '2px solid #cbd5e1',
                    backgroundColor: '#ffffff',
                    flexShrink: 0
                  }} />
                  <span style={{ flex: 1 }}>{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Bottom Navigation Buttons */}
          <div style={{
            marginTop: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
            paddingTop: '10px',
            borderTop: '1px solid #e2e8f0'
          }}>
            <button
              onClick={handlePrev}
              disabled={currentQuestionIndex === 0}
              className="btn btn-outline"
              style={{
                flex: 1,
                opacity: currentQuestionIndex === 0 ? 0.4 : 1,
                cursor: currentQuestionIndex === 0 ? 'not-allowed' : 'pointer'
              }}
            >
              <ChevronRight size={16} />
              <span>السابق</span>
            </button>

            {currentQuestionIndex < questions.length - 1 ? (
              <button
                onClick={handleNext}
                className="btn btn-primary"
                style={{ flex: 1 }}
              >
                <span>التالي</span>
                <ChevronLeft size={16} />
              </button>
            ) : (
              <button
                onClick={() => setShowConfirmModal(true)}
                className="btn btn-accent"
                style={{ flex: 1.2, fontWeight: '800' }}
              >
                <span>تسليم الامتحان</span>
                <CheckCircle2 size={16} />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Submission Result Screen */
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px 20px',
          textAlign: 'center'
        }}>
          <div style={{
            width: '74px',
            height: '74px',
            borderRadius: '50%',
            backgroundColor: '#dcfce7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#15803d',
            marginBottom: '16px',
            boxShadow: '0 8px 24px rgba(22,163,74,0.2)'
          }}>
            <Award size={40} />
          </div>

          <h2 style={{ fontSize: '18px', fontWeight: '900', color: '#0f172a', marginBottom: '6px' }}>
            تم تسليم الاختبار بنجاح!
          </h2>
          <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '18px', maxWidth: '280px' }}>
            تم حفظ إجاباتك ورصد النتيجة في سجل درجات كلية التربية النوعية.
          </p>

          {/* Score Card */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1.5px solid #dcfce7',
            padding: '16px 24px',
            width: '100%',
            maxWidth: '300px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            marginBottom: '16px'
          }}>
            <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '700', marginBottom: '4px' }}>
              الدرجة المستحقة
            </div>
            <div style={{ fontSize: '32px', fontWeight: '900', color: '#15803d' }}>
              {finalScore} <span style={{ fontSize: '18px', color: '#64748b' }}>/ {exam.totalMarks}</span>
            </div>
            <div style={{
              marginTop: '8px',
              paddingTop: '8px',
              borderTop: '1px solid #f1f5f9',
              fontSize: '11px',
              color: '#475569'
            }}>
              النسبة المئوية: {Math.round((finalScore / exam.totalMarks) * 100)}%
            </div>
          </div>

          {/* Integrity Note if warnings exist */}
          {warningCount > 0 ? (
            <div style={{
              backgroundColor: '#fffbeb',
              border: '1px solid #fcd34d',
              borderRadius: '12px',
              padding: '10px 14px',
              fontSize: '11px',
              color: '#92400e',
              marginBottom: '20px',
              maxWidth: '300px'
            }}>
              <div style={{ fontWeight: '800', marginBottom: '2px' }}>
                ملاحظة نزاهة الاختبار ({warningCount} تنبيهات):
              </div>
              تم إرسال سجل مغادرة الشاشة إلى أستاذ المادة للمراجعة النظامية.
            </div>
          ) : (
            <div style={{
              backgroundColor: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: '12px',
              padding: '10px 14px',
              fontSize: '11px',
              color: '#166534',
              marginBottom: '20px'
            }}>
              جلسة نظامية ومستقرة بنسبة 100% دون تسجيل أية مخالفات.
            </div>
          )}

          <button
            onClick={onClose}
            className="btn btn-primary"
            style={{ width: '100%', maxWidth: '280px', padding: '12px' }}
          >
            العودة إلى لوحة الاختبارات
          </button>
        </div>
      )}

      {/* Confirmation Modal Before Submission */}
      {showConfirmModal && (
        <div className="modal-overlay" style={{ zIndex: 80 }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            padding: '20px',
            width: '90%',
            maxWidth: '340px',
            margin: 'auto',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            animation: 'fadeIn 0.2s ease-out'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              backgroundColor: '#fef3c7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#d97706',
              margin: '0 auto 12px auto'
            }}>
              <AlertTriangle size={26} />
            </div>

            <h3 style={{ fontSize: '16px', fontWeight: '900', color: '#0f172a', marginBottom: '8px' }}>
              هل أنت متأكد من تسليم الامتحان؟
            </h3>

            <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '16px', lineHeight: 1.5 }}>
              لقد أجبت على <strong>{answeredCount}</strong> من إجمالي <strong>{questions.length}</strong> أسئلة.
              {!isAllAnswered && (
                <span style={{ display: 'block', color: '#dc2626', fontWeight: '700', marginTop: '4px' }}>
                  تنبيه: متبقي {questions.length - answeredCount} أسئلة لم تتم الإجابة عليها!
                </span>
              )}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                onClick={handleFinalSubmit}
                className="btn btn-primary btn-block"
                style={{ padding: '12px', fontSize: '13px' }}
              >
                تسليم الامتحان
              </button>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="btn btn-secondary btn-block"
                style={{ padding: '10px', fontSize: '13px' }}
              >
                العودة للامتحان
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Simulated Integrity Warning Popup Modal */}
      {showIntegrityWarning && (
        <div className="modal-overlay" style={{ zIndex: 90 }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            border: '2px solid #ef4444',
            padding: '20px',
            width: '90%',
            maxWidth: '340px',
            margin: 'auto',
            textAlign: 'center',
            boxShadow: '0 25px 50px -12px rgba(220,38,38,0.35)',
            animation: 'fadeIn 0.2s ease-out'
          }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              backgroundColor: '#fee2e2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#dc2626',
              margin: '0 auto 12px auto'
            }}>
              <AlertTriangle size={28} />
            </div>

            <span style={{
              fontSize: '11px',
              fontWeight: '800',
              color: '#dc2626',
              backgroundColor: '#fef2f2',
              padding: '2px 10px',
              borderRadius: '12px',
              display: 'inline-block',
              marginBottom: '6px'
            }}>
              تنبيه
            </span>

            <h3 style={{ fontSize: '15px', fontWeight: '900', color: '#0f172a', marginBottom: '8px' }}>
              تم رصد مغادرة شاشة الاختبار
            </h3>

            <p style={{ fontSize: '12px', color: '#475569', marginBottom: '14px', lineHeight: 1.5 }}>
              تم رصد مغادرة شاشة الاختبار. يرجى العودة إلى الاختبار.
            </p>

            <div style={{
              backgroundColor: '#fef2f2',
              borderRadius: '10px',
              padding: '8px 12px',
              fontSize: '11px',
              fontWeight: '700',
              color: '#991b1b',
              marginBottom: '16px'
            }}>
              عدد التنبيهات: {warningCount}
            </div>

            <button
              onClick={() => setShowIntegrityWarning(false)}
              className="btn btn-danger btn-block"
              style={{ padding: '10px', fontSize: '13px' }}
            >
              العودة إلى شاشة الاختبار الآن
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

