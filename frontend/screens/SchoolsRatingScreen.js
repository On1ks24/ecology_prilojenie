import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

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

  const getRankIcon = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `${rank}.`;
  };

  if (loading) {
    return (
      <View style={styles.schoolsRatingLoadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" translucent />
      <View style={styles.schoolsRatingContainer}>
        {/* Кнопка назад */}
        <TouchableOpacity 
          style={styles.schoolsRatingBackButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.schoolsRatingBackButtonText}>← Назад</Text>
        </TouchableOpacity>

        <View style={styles.schoolsRatingHeader}>
          <Text style={styles.schoolsRatingTitle}>Рейтинг школ</Text>
          <Text style={styles.schoolsRatingSubtitle}>Топ школ по экологическим баллам</Text>
        </View>

        <ScrollView 
          style={styles.schoolsRatingScrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.schoolsRatingListContainer}>
            {rating.length === 0 ? (
              <View style={styles.schoolsRatingEmptyState}>
                <Text style={styles.schoolsRatingEmptyText}>Пока нет данных</Text>
              </View>
            ) : (
              rating.map((item) => (
                <View
                  key={item.schoolId}
                  style={[
                    styles.schoolsRatingItem,
                    item.isMySchool && styles.schoolsRatingMySchoolItem,
                    item.rank <= 3 && styles.schoolsRatingTopItem
                  ]}
                >
                  <View style={styles.schoolsRatingRankContainer}>
                    <Text style={[
                      styles.schoolsRatingRank,
                      item.rank === 1 && styles.schoolsRatingRankGold,
                      item.rank === 2 && styles.schoolsRatingRankSilver,
                      item.rank === 3 && styles.schoolsRatingRankBronze,
                    ]}>
                      {getRankIcon(item.rank)}
                    </Text>
                  </View>

                  <View style={styles.schoolsRatingInfoContainer}>
                    <Text style={[
                      styles.schoolsRatingSchoolName,
                      item.isMySchool && styles.schoolsRatingMySchoolText
                    ]}>
                      {item.schoolName}
                      {item.isMySchool && ' (Ваша школа)'}
                    </Text>
                    <Text style={styles.schoolsRatingAddress}>
                      {item.address || 'Адрес не указан'}
                    </Text>
                    <View style={styles.schoolsRatingStatsRow}>
                      <Text style={styles.schoolsRatingStat}>
                        {item.studentsCount} учеников
                      </Text>
                      <Text style={styles.schoolsRatingStat}>
                        {item.eventsCount} субботников
                      </Text>
                    </View>
                  </View>

                  <View style={styles.schoolsRatingScoreContainer}>
                    <Text style={styles.schoolsRatingScore}>{item.totalScore}</Text>
                    <Text style={styles.schoolsRatingScoreLabel}>баллов</Text>
                  </View>
                </View>
              ))
            )}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default SchoolsRatingScreen;