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

const mockTeacherData = {
  name: 'Мария Ивановна',
  organizedEvents: 3,
  pendingModeration: 12,
  totalStudents: 45,
  totalCollected: 128,
  recentModeration: [
    { student: 'Петров И.', event: 'Парк Горького', status: 'pending' },
    { student: 'Сидорова А.', event: 'Школьный двор', status: 'pending' },
    { student: 'Иванов Д.', event: 'Набережная', status: 'approved' },
    { student: 'Смирнова Е.', event: 'Городской пляж', status: 'pending' },
  ],
};

const TeacherProfilePage = ({ onNavigateToModeration }) => {
  const getStatusStyle = (status) => {
    switch(status) {
      case 'pending': return { backgroundColor: colors.warning + '20', color: colors.warning };
      case 'approved': return { backgroundColor: colors.success + '20', color: colors.success };
      case 'rejected': return { backgroundColor: colors.danger + '20', color: colors.danger };
      default: return {};
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'pending': return '⏳ Ожидает';
      case 'approved': return '✅ Принято';
      case 'rejected': return '❌ Отклонено';
      default: return status;
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={layout.center}>
        <View style={[layout.center, { width: 100, height: 100, borderRadius: 50, backgroundColor: colors.border }]}>
          <Text style={{ fontSize: 50 }}>👩‍🏫</Text>
        </View>
        <Text style={[typography.h4, { marginBottom: 8 }]}>
          {mockTeacherData.name}
        </Text>
        <View style={{ backgroundColor: colors.primary, paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20, marginBottom: 24 }}>
          <Text style={{ color: colors.white, fontSize: 14, fontWeight: '600' }}>Организатор</Text>
        </View>
      </View>

      <View style={[layout.row, { gap: 8, marginBottom: 24 }]}>
        <View style={[cards.stat, layout.flex1]}>
          <Text style={cards.statValue}>{mockTeacherData.organizedEvents}</Text>
          <Text style={cards.statLabel}>Мероприятий</Text>
        </View>
        <View style={[cards.stat, cards.statHighlight, layout.flex1]}>
          <Text style={[cards.statValue, cards.statValueHighlight]}>
            {mockTeacherData.pendingModeration}
          </Text>
          <Text style={cards.statLabel}>На проверке</Text>
        </View>
        <View style={[cards.stat, layout.flex1]}>
          <Text style={cards.statValue}>{mockTeacherData.totalStudents}</Text>
          <Text style={cards.statLabel}>Участников</Text>
        </View>
        <View style={[cards.stat, layout.flex1]}>
          <Text style={cards.statValue}>{mockTeacherData.totalCollected}</Text>
          <Text style={cards.statLabel}>Кг собрано</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={[buttons.primary, buttons.fullWidth, { marginBottom: 24 }]}
        onPress={onNavigateToModeration}
      >
        <Text style={buttons.primaryText}>
          📋 Перейти к модерации ({mockTeacherData.pendingModeration})
        </Text>
      </TouchableOpacity>

      <View style={layout.section}>
        <Text style={[typography.h6, layout.mb2]}>Последние заявки</Text>
        {mockTeacherData.recentModeration.map((item, index) => (
          <View key={index} style={[cards.moderation, layout.rowBetween]}>
            <View>
              <Text style={typography.body1}>{item.student}</Text>
              <Text style={typography.caption}>{item.event}</Text>
            </View>
            <View style={[{
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 20,
            }, getStatusStyle(item.status)]}>
              <Text style={[{
                fontSize: 12,
                fontWeight: '600',
              }, getStatusStyle(item.status)]}>
                {getStatusText(item.status)}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View style={layout.section}>
        <Text style={[typography.h6, layout.mb2]}>Быстрые действия</Text>
        {[
          { icon: '➕', text: 'Создать мероприятие' },
          { icon: '📊', text: 'Статистика' },
          { icon: '👥', text: 'Участники' }
        ].map((action, index) => (
          <TouchableOpacity key={index} style={{
            backgroundColor: colors.white,
            padding: 16,
            borderRadius: 12,
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: colors.border,
            marginBottom: 8,
          }}>
            <Text style={{ fontSize: 24, marginRight: 12 }}>{action.icon}</Text>
            <Text style={{ fontSize: 16, color: colors.black, fontWeight: '500' }}>
              {action.text}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default TeacherProfilePage;