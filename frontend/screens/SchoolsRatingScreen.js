import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://10.0.2.2:5000/api';

const SchoolsRatingScreen = ({ navigation }) => {
  const [rating, setRating] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRating();
  }, []);

  const getToken = async () => {
    return await AsyncStorage.getItem('accessToken');
  };

  const loadRating = async () => {
    try {
      setLoading(true);
      const token = await getToken();

      const response = await fetch(`${API_URL}/stats/schools-rating?limit=100`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      setRating(data);
    } catch (error) {
      console.error('Ошибка загрузки рейтинга школ:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🏆 Рейтинг школ</Text>
        <Text style={styles.subtitle}>Топ школ по экологическим баллам</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.listContainer}>
          {rating.length === 0 ? (
            <Text style={styles.emptyText}>Пока нет данных</Text>
          ) : (
            rating.map((item) => (
              <View
                key={item.schoolId}
                style={[
                  styles.schoolItem,
                  item.isMySchool && styles.mySchoolItem,
                  item.rank <= 3 && styles.topItem
                ]}
              >
                <Text style={[
                  styles.rank,
                  item.rank === 1 && styles.gold,
                  item.rank === 2 && styles.silver,
                  item.rank === 3 && styles.bronze,
                ]}>
                  {item.rank === 1 ? '🥇' : item.rank === 2 ? '🥈' : item.rank === 3 ? '🥉' : `${item.rank}.`}
                </Text>

                <View style={styles.infoContainer}>
                  <Text style={[styles.schoolName, item.isMySchool && styles.mySchoolText]}>
                    {item.schoolName}
                    {item.isMySchool && ' (Ваша школа)'}
                  </Text>
                  <Text style={styles.address}>{item.address || 'Адрес не указан'}</Text>
                  <View style={styles.statsRow}>
                    <Text style={styles.stat}>👨‍🎓 {item.studentsCount} учеников</Text>
                    <Text style={styles.stat}>🌍 {item.eventsCount} субботников</Text>
                  </View>
                </View>

                <View style={styles.scoreContainer}>
                  <Text style={styles.score}>{item.totalScore}</Text>
                  <Text style={styles.scoreLabel}>баллов</Text>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#fff',
    padding: 16,
    paddingTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  listContainer: {
    padding: 16,
  },
  schoolItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 1,
  },
  topItem: {
    elevation: 2,
    shadowOpacity: 0.1,
  },
  mySchoolItem: {
    backgroundColor: '#FFF3E0',
    borderLeftWidth: 3,
    borderLeftColor: '#FF9800',
  },
  rank: {
    fontSize: 24,
    fontWeight: 'bold',
    width: 50,
    textAlign: 'center',
    color: '#666',
  },
  gold: { color: '#FFD700' },
  silver: { color: '#C0C0C0' },
  bronze: { color: '#CD7F32' },
  infoContainer: {
    flex: 1,
  },
  schoolName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  mySchoolText: {
    fontWeight: '600',
    color: '#FF9800',
  },
  address: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 6,
    gap: 12,
  },
  stat: {
    fontSize: 12,
    color: '#666',
  },
  scoreContainer: {
    alignItems: 'center',
    minWidth: 60,
  },
  score: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  scoreLabel: {
    fontSize: 11,
    color: '#666',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    padding: 40,
  },
});

export default SchoolsRatingScreen;