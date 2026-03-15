import React, { useState } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

import RegistrationPage from './src/pages/RegistrationPage';
import StudentProfilePage from './src/pages/StudentProfilePage';
import TeacherProfilePage from './src/pages/TeacherProfilePage';
import PhotoSendingPage from './src/pages/PhotoSendingPage';
import PhotoReceiptPage from './src/pages/PhotoReceiptPage';
import Layout from './src/components/Layout';

import { colors } from './src/styles/colors';
import { layout } from './src/styles/layout';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('registration');

  const handleLogin = (userData) => {
    setCurrentUser(userData);
    setCurrentPage(userData.role === 'teacher' ? 'teacher-profile' : 'student-profile');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('registration');
  };

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  if (!currentUser) {
    return (
      <SafeAreaView style={[layout.container, { backgroundColor: 'transparent' }]}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" />
        <RegistrationPage onLogin={handleLogin} />
      </SafeAreaView>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'student-profile':
        return <StudentProfilePage />;
      case 'teacher-profile':
        return <TeacherProfilePage onNavigateToModeration={() => navigateTo('moderation')} />;
      case 'photo-sending':
        return <PhotoSendingPage />;
      case 'photo-receipt':
        return <PhotoReceiptPage />;
      case 'moderation':
        return (
          <Layout 
            userRole={currentUser.role} 
            userName={currentUser.name}
            onLogout={handleLogout}
          >
            <TeacherProfilePage onNavigateToModeration={() => navigateTo('teacher-profile')} />
          </Layout>
        );
      default:
        return <StudentProfilePage />;
    }
  };

  return (
    <Layout 
      userRole={currentUser.role} 
      userName={currentUser.name}
      onLogout={handleLogout}
    >
      {renderPage()}
    </Layout>
  );
}