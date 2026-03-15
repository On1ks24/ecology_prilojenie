import { StyleSheet } from 'react-native';
import { colors } from './colors';
import { layout } from './layout';

export const cards = StyleSheet.create({
  // Основная карточка
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    ...layout.shadow,
  },
  
  // Маленькая карточка
  small: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    ...layout.shadowSmall,
  },
  
  // Карточка профиля
  profile: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 24,
    ...layout.shadow,
  },
  
  // Карточка мероприятия
  event: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    ...layout.shadowSmall,
  },
  
  // Карточка статистики
  stat: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    ...layout.shadowSmall,
  },
  
  statHighlight: {
    backgroundColor: colors.goldLight,
    borderWidth: 1,
    borderColor: colors.gold,
  },
  
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 4,
  },
  
  statValueHighlight: {
    color: colors.warning,
  },
  
  statLabel: {
    fontSize: 12,
    color: colors.gray,
    textAlign: 'center',
  },
  
  // Карточка фото
  photo: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
  },
  
  photoFilled: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  
  // Карточка результата
  result: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
    ...layout.shadow,
    marginBottom: 20,
  },
  
  // Карточка модерации
  moderation: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    ...layout.shadowSmall,
  },
  
  moderationPending: {
    borderLeftWidth: 4,
    borderLeftColor: colors.warning,
  },
  
  moderationApproved: {
    borderLeftWidth: 4,
    borderLeftColor: colors.success,
  },
  
  moderationRejected: {
    borderLeftWidth: 4,
    borderLeftColor: colors.danger,
  },
});