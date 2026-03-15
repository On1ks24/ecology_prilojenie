import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { colors } from '../styles/colors';
import { typography } from '../styles/typography';
import { layout } from '../styles/layout';
import { buttons } from '../styles/buttons';
import { cards } from '../styles/cards';

const mockStudentData = {
  name: 'Иван Петров',
  totalPoints: 1250,
  eventsParticipated: 5,
  achievements: ['🏆 Первый шаг', '🌟 Чистый двор', '🌍 Эко-воин'],
  recentEvents: [
    { name: 'Парк Горького', date: '15.03.2024', points: 250 },
    { name: 'Набережная', date: '10.03.2024', points: 180 },
    { name: 'Школьный двор', date: '05.03.2024', points: 320 },
    { name: 'Городской пляж', date: '28.02.2024', points: 150 },
  ],
};

const StudentProfilePage = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={layout.center}>
        <View style={[layout.center, { width: 100, height: 100, borderRadius: 50, backgroundColor: colors.border }]}>
          <Text style={{ fontSize: 50 }}>👤</Text>
        </View>
        <Text style={[typography.h4, { marginBottom: 24 }]}>
          {mockStudentData.name}
        </Text>
      </View>

      <View style={[layout.row, { gap: 16, marginBottom: 24 }]}>
        <View style={cards.stat}>
          <Text style={cards.statValue}>{mockStudentData.totalPoints}</Text>
          <Text style={cards.statLabel}>Всего баллов</Text>
        </View>
        <View style={cards.stat}>
          <Text style={cards.statValue}>{mockStudentData.eventsParticipated}</Text>
          <Text style={cards.statLabel}>Субботников</Text>
        </View>
      </View>

      <View style={layout.section}>
        <Text style={[typography.h6, layout.mb2]}>Достижения</Text>
        <View style={layout.row}>
          {mockStudentData.achievements.map((ach, index) => (
            <View key={index} style={{ 
              backgroundColor: colors.goldLight,
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: colors.gold,
              marginRight: 8,
            }}>
              <Text style={{ color: colors.warning, fontSize: 14, fontWeight: '500' }}>
                {ach}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={layout.section}>
        <Text style={[typography.h6, layout.mb2]}>Последние мероприятия</Text>
        {mockStudentData.recentEvents.map((event, index) => (
          <View key={index} style={[cards.event, layout.rowBetween]}>
            <View>
              <Text style={typography.body1}>{event.name}</Text>
              <Text style={typography.caption}>{event.date}</Text>
            </View>
            <View style={layout.center}>
              <Text style={[typography.h5, { color: colors.primary }]}>
                +{event.points}
              </Text>
              <Text style={typography.caption}>баллов</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={[layout.row, { marginVertical: 16 }]}>
        <TouchableOpacity style={[buttons.primary, layout.flex1, { marginRight: 8 }]}>
          <Text style={buttons.primaryText}>📸 Новый субботник</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[buttons.secondary, layout.flex1]}>
          <Text style={buttons.secondaryText}>📊 Рейтинг</Text>
        </TouchableOpacity>
      </View>

      <Text style={[typography.caption, layout.center, { marginTop: 16 }]}>
        * Данные загружены с сервера
      </Text>
    </ScrollView>
  );
};

export default StudentProfilePage;