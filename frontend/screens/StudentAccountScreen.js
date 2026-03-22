import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import styles from './styles';

const StudentDashboardScreen = () => {
  const [activeEvents, setActiveEvents] = useState([
    { id: 1, name: 'Весенний субботник', date: '25 марта 2026', points: 50 },
    { id: 2, name: 'Посадка деревьев', date: '1 апреля 2026', points: 30 },
    { id: 3, name: 'Сбор макулатуры', date: '10 апреля 2026', points: 40 },
  ]);

  const [achievements, setAchievements] = useState([
    { id: 1, name: 'Эко-новичок', icon: '🌱', earned: true },
    { id: 2, name: 'Защитник природы', icon: '🛡️', earned: false },
    { id: 3, name: 'Мастер переработки', icon: '♻️', earned: true },
    { id: 4, name: 'Зеленый герой', icon: '🌳', earned: false },
  ]);

  const stats = {
    points: 1250,
    classRank: 3,
    schoolRank: 15,
    classTotal: 28,
    schoolTotal: 120,
  };

  const handleJoinEvent = (eventId) => {
    // TODO: Переход на экран с деталями мероприятия
    // navigation.navigate('EventDetails', { eventId })
    Alert.alert('Мероприятие', 'Функция присоединения к мероприятию будет доступна в следующей версии');
  };

  const handleEcoTest = () => {
    // TODO: Переход на экран с эко-тестом
    // navigation.navigate('EcoTestScreen')
    Alert.alert('Эко-тест', 'Функция прохождения теста будет доступна в следующей версии');
  };

  const handleAchievements = () => {
    // TODO: Переход на экран с достижениями
    // navigation.navigate('AchievementsScreen')
    Alert.alert('Достижения', 'Функция просмотра достижений будет доступна в следующей версии');
  };

  const earnedCount = achievements.filter(a => a.earned).length;

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.greeting}>Привет, Алексей!</Text>
        <Text style={styles.subGreeting}>Твой экологический вклад</Text>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.points}</Text>
            <Text style={styles.statLabel}>Эко-баллов</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>
              {stats.classRank}/{stats.classTotal}
            </Text>
            <Text style={styles.statLabel}>Место в классе</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>
              {stats.schoolRank}/{stats.schoolTotal}
            </Text>
            <Text style={styles.statLabel}>Место в школе</Text>
          </View>
        </View>

        <View style={styles.progressContainer}>
          <Text style={styles.sectionTitle}>До следующего уровня</Text>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: '65%' }]} />
          </View>
          <Text style={styles.progressText}>Осталось 350 баллов до звания "Эко-защитник"</Text>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionCard} onPress={() => handleJoinEvent(activeEvents[0]?.id)}>
            <Text style={styles.actionIcon}>🌍</Text>
            <Text style={styles.actionTitle}>Присоединиться к субботнику</Text>
            <Text style={styles.actionDescription}>Активных мероприятий: {activeEvents.length}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard} onPress={handleEcoTest}>
            <Text style={styles.actionIcon}>📝</Text>
            <Text style={styles.actionTitle}>Пройти эко-тест</Text>
            <Text style={styles.actionDescription}>Проверь свои знания об экологии</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard} onPress={handleAchievements}>
            <Text style={styles.actionIcon}>🏆</Text>
            <Text style={styles.actionTitle}>Мои достижения</Text>
            <Text style={styles.actionDescription}>
              Получено: {earnedCount}/{achievements.length}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.eventsPreview}>
          <Text style={styles.sectionTitle}>Ближайшие мероприятия</Text>
          {activeEvents.slice(0, 2).map((event) => (
            <TouchableOpacity
              key={event.id}
              style={styles.eventItem}
              onPress={() => handleJoinEvent(event.id)}
            >
              <View style={styles.eventInfo}>
                <Text style={styles.eventName}>{event.name}</Text>
                <Text style={styles.eventDate}>{event.date}</Text>
              </View>
              <View style={styles.eventPoints}>
                <Text style={styles.pointsText}>+{event.points}</Text>
                <Text style={styles.pointsLabel}>баллов</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.achievementsPreview}>
          <Text style={styles.sectionTitle}>Недавние достижения</Text>
          <View style={styles.badgeContainer}>
            {achievements.filter(a => a.earned).slice(0, 3).map((achievement) => (
              <View key={achievement.id} style={styles.badge}>
                <Text style={styles.badgeIcon}>{achievement.icon}</Text>
                <Text style={styles.badgeName}>{achievement.name}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default StudentDashboardScreen;