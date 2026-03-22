import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import styles from './styles';

const TeacherDashboardScreen = () => {
  const [showInviteLink, setShowInviteLink] = useState(false);
  const [inviteLink, setInviteLink] = useState('https://school-eco.ru/invite/class-7a-2026');
  
  const [stats] = useState({
    studentsCount: 24,
    subbotniksCount: 3,
    classPoints: 2840,
    classRank: 2,
    totalClasses: 8,
  });

  const [students] = useState([
    { id: 1, name: 'Алексей Иванов', points: 1250, status: 'active' },
    { id: 2, name: 'Мария Петрова', points: 980, status: 'active' },
    { id: 3, name: 'Дмитрий Сидоров', points: 450, status: 'pending' },
    { id: 4, name: 'Анна Кузнецова', points: 2100, status: 'active' },
    { id: 5, name: 'Сергей Васильев', points: 670, status: 'active' },
  ]);

  const [activeSubbotniks] = useState([
    { id: 1, name: 'Весенний субботник', date: '25 марта 2026', participants: 18 },
    { id: 2, name: 'Посадка деревьев', date: '1 апреля 2026', participants: 12 },
    { id: 3, name: 'Сбор макулатуры', date: '10 апреля 2026', participants: 22 },
  ]);

  const handleCreateInvite = () => {
    setShowInviteLink(true);
    Alert.alert('Ссылка создана', 'Ссылка-приглашение для учеников сгенерирована');
  };

  const handleCopyLink = () => {
    // TODO: Скопировать ссылку в буфер обмена
    Alert.alert('Ссылка скопирована', 'Ссылка-приглашение скопирована в буфер обмена');
  };

  const handleViewSubbotniks = () => {
    // TODO: Переход на экран со списком субботников
    // navigation.navigate('SubbotniksListScreen')
    Alert.alert('Активные субботники', `Всего активных мероприятий: ${activeSubbotniks.length}`);
  };

  const handleConfirmResults = () => {
    // TODO: Переход на экран подтверждения результатов учеников
    // navigation.navigate('ConfirmResultsScreen')
    const pendingCount = students.filter(s => s.status === 'pending').length;
    Alert.alert('Подтверждение результатов', `Учеников ожидающих подтверждения: ${pendingCount}`);
  };

  const handleStudentPress = (studentId, studentName) => {
    // TODO: Переход на профиль ученика
    // navigation.navigate('StudentProfileScreen', { studentId })
    Alert.alert('Профиль ученика', `Открыть профиль: ${studentName}`);
  };

  const pendingStudentsCount = students.filter(s => s.status === 'pending').length;

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.greeting}>Здравствуйте, Анна Сергеевна!</Text>
        <Text style={styles.subGreeting}>7А класс • Классный руководитель</Text>

        <View style={styles.teacherStatsContainer}>
          <View style={styles.teacherStatCard}>
            <Text style={styles.teacherStatValue}>{stats.studentsCount}</Text>
            <Text style={styles.teacherStatLabel}>Учеников</Text>
            <Text style={styles.teacherStatSub}>в классе</Text>
          </View>

          <View style={styles.teacherStatCard}>
            <Text style={styles.teacherStatValue}>{stats.subbotniksCount}</Text>
            <Text style={styles.teacherStatLabel}>Субботников</Text>
            <Text style={styles.teacherStatSub}>проведено</Text>
          </View>

          <View style={styles.teacherStatCard}>
            <Text style={styles.teacherStatValue}>{stats.classPoints}</Text>
            <Text style={styles.teacherStatLabel}>Баллов</Text>
            <Text style={styles.teacherStatSub}>{stats.classRank}/{stats.totalClasses} место</Text>
          </View>
        </View>

        <View style={styles.teacherActionsContainer}>
          <TouchableOpacity style={styles.teacherActionCard} onPress={handleCreateInvite}>
            <Text style={styles.teacherActionIcon}>🔗</Text>
            <View style={styles.teacherActionContent}>
              <Text style={styles.teacherActionTitle}>Создать приглашение для учеников</Text>
              <Text style={styles.teacherActionDescription}>Сгенерировать ссылку для регистрации</Text>
            </View>
          </TouchableOpacity>

          {showInviteLink && (
            <View style={styles.inviteLinkContainer}>
              <Text style={styles.inviteLinkText} numberOfLines={1}>
                {inviteLink}
              </Text>
              <TouchableOpacity style={styles.copyButton} onPress={handleCopyLink}>
                <Text style={styles.copyButtonText}>Копировать</Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity style={styles.teacherActionCard} onPress={handleViewSubbotniks}>
            <Text style={styles.teacherActionIcon}>🌍</Text>
            <View style={styles.teacherActionContent}>
              <Text style={styles.teacherActionTitle}>Посмотреть активные субботники</Text>
              <Text style={styles.teacherActionDescription}>
                Доступно мероприятий: {activeSubbotniks.length}
              </Text>
            </View>
            <View style={styles.teacherActionBadge}>
              <Text style={styles.teacherActionBadgeText}>{activeSubbotniks.length}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.teacherActionCard} onPress={handleConfirmResults}>
            <Text style={styles.teacherActionIcon}>✓</Text>
            <View style={styles.teacherActionContent}>
              <Text style={styles.teacherActionTitle}>Подтвердить результаты учеников</Text>
              <Text style={styles.teacherActionDescription}>
                Ожидают подтверждения: {pendingStudentsCount}
              </Text>
            </View>
            {pendingStudentsCount > 0 && (
              <View style={styles.teacherActionBadge}>
                <Text style={styles.teacherActionBadgeText}>{pendingStudentsCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.studentsList}>
          <Text style={styles.sectionTitle}>Активные ученики</Text>
          {students.slice(0, 5).map((student) => (
            <TouchableOpacity
              key={student.id}
              style={styles.studentItem}
              onPress={() => handleStudentPress(student.id, student.name)}
            >
              <View style={styles.studentInfo}>
                <Text style={styles.studentName}>{student.name}</Text>
                <Text style={styles.studentPoints}>{student.points} баллов</Text>
              </View>
              <View style={styles.studentStatus}>
                <Text style={styles.studentStatusText}>
                  {student.status === 'active' ? 'Активен' : 'На проверке'}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
          <Text style={styles.subtext}>Всего учеников: {stats.studentsCount}</Text>
        </View>

        <View style={styles.eventsPreview}>
          <Text style={styles.sectionTitle}>Ближайшие субботники</Text>
          {activeSubbotniks.slice(0, 2).map((subbotnik) => (
            <View key={subbotnik.id} style={styles.eventItem}>
              <View style={styles.eventInfo}>
                <Text style={styles.eventName}>{subbotnik.name}</Text>
                <Text style={styles.eventDate}>{subbotnik.date}</Text>
              </View>
              <View style={styles.eventPoints}>
                <Text style={styles.pointsText}>{subbotnik.participants}</Text>
                <Text style={styles.pointsLabel}>участников</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default TeacherDashboardScreen;