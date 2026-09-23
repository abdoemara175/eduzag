import React, { useState } from 'react';
import { useApp } from './AppContext';
import { UserRole } from './types';
import {
  GraduationCap,
  Briefcase,
  Lock,
  User,
  LogIn,
  CheckCircle2,
  Info
} from 'lucide-react';

export const Login: React.FC = () => {
  const { login, student, doctor } = useApp();

  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [studentCode, setStudentCode] = useState(student.studentCode);
  const [doctorIdentifier, setDoctorIdentifier] = useState(doctor.email);
  const [password, setPassword] = useState('123456');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      login(selectedRole, {
        username: selectedRole === 'student' ? studentCode : doctorIdentifier,
        password
      });
      setIsLoading(false);
    }, 400);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f8fafc',
      padding: '20px 16px',
      direction: 'rtl'
    }}>
      {/* Main Container: responsive max-width 440px */}
      <div style={{
        width: '100%',
        maxWidth: '440px',
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.02)',
        padding: '28px 22px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Top decorative accent */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '6px',
          background: 'linear-gradient(90deg, #1e3a8a 0%, #2563eb 50%, #d97706 100%)'
        }} />

        {/* University Header & Identity */}
        <div style={{ textAlign: 'center', marginBottom: '22px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '18px',
            background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px auto',
            boxShadow: '0 8px 20px -4px rgba(30, 58, 138, 0.3)'
          }}>
            <GraduationCap size={36} />
          </div>

          <h2 style={{ fontSize: '13px', fontWeight: '800', color: '#1e3a8a', marginBottom: '2px' }}>
            جامعة الزقازيق
          </h2>
          <h1 style={{ fontSize: '18px', fontWeight: '900', color: '#0f172a', marginBottom: '4px', letterSpacing: '-0.3px' }}>
            مرحبًا بك في منظومة جامعة الزقازيق
          </h1>
          <div style={{ fontSize: '13px', color: '#64748b', fontWeight: '700' }}>
            كلية التربية النوعية • المنظومة التعليمية
          </div>
        </div>

        {/* Role Selector: طالب vs عضو هيئة تدريس */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#334155', marginBottom: '8px' }}>
            نوع الحساب:
          </label>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px',
            backgroundColor: '#f1f5f9',
            padding: '4px',
            borderRadius: '14px'
          }}>
            <button
              type="button"
              onClick={() => {
                setSelectedRole('student');
                setPassword('123456');
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '10px 8px',
                borderRadius: '10px',
                fontSize: '12px',
                fontWeight: selectedRole === 'student' ? '800' : '600',
                backgroundColor: selectedRole === 'student' ? '#ffffff' : 'transparent',
                color: selectedRole === 'student' ? '#1e3a8a' : '#64748b',
                boxShadow: selectedRole === 'student' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                border: selectedRole === 'student' ? '1px solid #e2e8f0' : '1px solid transparent',
                transition: 'all 0.2s ease'
              }}
            >
              <GraduationCap size={16} color={selectedRole === 'student' ? '#1e3a8a' : '#64748b'} />
              <span>طالب</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedRole('doctor');
                setPassword('123456');
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '10px 8px',
                borderRadius: '10px',
                fontSize: '12px',
                fontWeight: selectedRole === 'doctor' ? '800' : '600',
                backgroundColor: selectedRole === 'doctor' ? '#ffffff' : 'transparent',
                color: selectedRole === 'doctor' ? '#d97706' : '#64748b',
                boxShadow: selectedRole === 'doctor' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                border: selectedRole === 'doctor' ? '1px solid #e2e8f0' : '1px solid transparent',
                transition: 'all 0.2s ease'
              }}
            >
              <Briefcase size={16} color={selectedRole === 'doctor' ? '#d97706' : '#64748b'} />
              <span>عضو هيئة تدريس</span>
            </button>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {selectedRole === 'student' ? (
            /* Student Input */
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                كود الطالب الجامعي:
              </label>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                backgroundColor: '#ffffff',
                border: '1.5px solid #cbd5e1',
                borderRadius: '12px',
                padding: '10px 14px'
              }}>
                <User size={18} color="#64748b" />
                <input
                  type="text"
                  required
                  placeholder="مثال: 20241088"
                  value={studentCode}
                  onChange={e => setStudentCode(e.target.value)}
                  style={{
                    flex: 1,
                    border: 'none',
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#0f172a'
                  }}
                />
              </div>
              <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>
                الحساب التجريبي: <strong>{student.name}</strong> (الفرقة الأولى)
              </div>
            </div>
          ) : (
            /* Doctor Input */
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                البريد الإلكتروني أو اسم المستخدم:
              </label>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                backgroundColor: '#ffffff',
                border: '1.5px solid #cbd5e1',
                borderRadius: '12px',
                padding: '10px 14px'
              }}>
                <User size={18} color="#64748b" />
                <input
                  type="text"
                  required
                  placeholder="البريد الجامعي أو الكود..."
                  value={doctorIdentifier}
                  onChange={e => setDoctorIdentifier(e.target.value)}
                  style={{
                    flex: 1,
                    border: 'none',
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#0f172a'
                  }}
                />
              </div>
              <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>
                الحساب التجريبي: <strong>{doctor.name}</strong> (رئيس قسم تكنولوجيا التعليم)
              </div>
            </div>
          )}

          {/* Password Input */}
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
              كلمة المرور:
            </label>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: '#ffffff',
              border: '1.5px solid #cbd5e1',
              borderRadius: '12px',
              padding: '10px 14px'
            }}>
              <Lock size={18} color="#64748b" />
              <input
                type="password"
                required
                placeholder="أدخل كلمة المرور..."
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{
                  flex: 1,
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#0f172a'
                }}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary"
            style={{
              padding: '14px',
              fontSize: '14px',
              fontWeight: '800',
              borderRadius: '12px',
              marginTop: '6px',
              backgroundColor: selectedRole === 'student' ? '#1e3a8a' : '#d97706',
              boxShadow: selectedRole === 'student'
                ? '0 4px 12px rgba(30, 58, 138, 0.25)'
                : '0 4px 12px rgba(217, 119, 6, 0.25)'
            }}
          >
            <LogIn size={18} />
            <span>{isLoading ? 'جاري التحقق...' : 'تسجيل الدخول'}</span>
          </button>
        </form>

        {/* Demo environment footer notice */}
        <div style={{
          marginTop: '22px',
          paddingTop: '16px',
          borderTop: '1px solid #f1f5f9',
          textAlign: 'center'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '11px',
            color: '#64748b',
            backgroundColor: '#f8fafc',
            padding: '4px 12px',
            borderRadius: '20px',
            border: '1px solid #e2e8f0'
          }}>
            <Info size={13} color="#2563eb" />
            <span>هذه نسخة تجريبية من المنظومة التعليمية</span>
          </div>
        </div>
      </div>
    </div>
  );
};

