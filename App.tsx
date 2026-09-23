import React from 'react';
import { AppProvider, useApp } from './AppContext';
import { MobileHeader } from './MobileHeader';
import { BottomNav } from './BottomNav';
import { Login } from './Login';

// Student screens
import { StudentHome } from './StudentHome';
import { StudentSchedule } from './StudentSchedule';
import { StudentCourses } from './StudentCourses';
import { StudentAssignments } from './StudentAssignments';
import { StudentExams } from './StudentExams';
import { StudentProfile } from './StudentProfile';
import { AttendanceModal } from './AttendanceModal';
import { NotificationsModal } from './NotificationsModal';
import { ExamSessionModal } from './ExamSessionModal';

// Doctor screens
import { DoctorHome } from './DoctorHome';
import { DoctorCourses } from './DoctorCourses';
import { DoctorStudents } from './DoctorStudents';
import { DoctorAssignments } from './DoctorAssignments';
import { DoctorExams } from './DoctorExams';
import { CreateAssignmentModal } from './CreateAssignmentModal';
import { CreateExamModal } from './CreateExamModal';
import { ExamIntegrityReport } from './ExamIntegrityReport';

const AppContent: React.FC = () => {
  const {
    isAuthenticated,
    role,
    activeTab,
    isQRModalOpen,
    setIsQRModalOpen,
    isNotificationsModalOpen,
    setIsNotificationsModalOpen,
    activeExamSession,
    setActiveExamSession,
    isCreateAssignmentOpen,
    setIsCreateAssignmentOpen,
    isCreateExamOpen,
    setIsCreateExamOpen,
    isIntegrityReportOpen,
    setIsIntegrityReportOpen
  } = useApp();

  // If not authenticated, always show the real Login screen
  if (!isAuthenticated) {
    return <Login />;
  }

  // Render active view based on role and active tab
  const renderCurrentView = () => {
    if (role === 'student') {
      switch (activeTab) {
        case 'home':
          return <StudentHome />;
        case 'schedule':
          return <StudentSchedule />;
        case 'courses':
          return <StudentCourses />;
        case 'assignments':
          return <StudentAssignments />;
        case 'exams':
          return <StudentExams />;
        case 'more':
        default:
          return <StudentProfile />;
      }
    } else {
      // Doctor views
      switch (activeTab) {
        case 'home':
          return <DoctorHome />;
        case 'courses':
          return <DoctorCourses />;
        case 'students':
          return <DoctorStudents />;
        case 'assignments':
          return <DoctorAssignments />;
        case 'exams':
        default:
          return <DoctorExams />;
      }
    }
  };

  return (
    <div className="app-shell-root">
      <div className="app-responsive-container">
        <MobileHeader />

        <main className="app-main-content">
          {renderCurrentView()}
        </main>

        <BottomNav />
      </div>

      {/* Global Modals & Dialogs */}
      {isQRModalOpen && (
        <AttendanceModal onClose={() => setIsQRModalOpen(false)} />
      )}

      {isNotificationsModalOpen && (
        <NotificationsModal onClose={() => setIsNotificationsModalOpen(false)} />
      )}

      {activeExamSession && (
        <ExamSessionModal
          exam={activeExamSession}
          onClose={() => setActiveExamSession(null)}
        />
      )}

      {isCreateAssignmentOpen && (
        <CreateAssignmentModal onClose={() => setIsCreateAssignmentOpen(false)} />
      )}

      {isCreateExamOpen && (
        <CreateExamModal onClose={() => setIsCreateExamOpen(false)} />
      )}

      {isIntegrityReportOpen && (
        <ExamIntegrityReport onClose={() => setIsIntegrityReportOpen(false)} />
      )}
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
