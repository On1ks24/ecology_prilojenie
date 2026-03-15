import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const buttons = StyleSheet.create({
  // Основные кнопки
  primary: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  
  secondary: {
    backgroundColor: colors.white,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  secondaryText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  
  danger: {
    backgroundColor: colors.danger,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  dangerText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  
  // Размеры
  small: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  smallText: {
    fontSize: 14,
  },
  
  large: {
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 14,
  },
  
  fullWidth: {
    width: '100%',
  },
  
  // Состояния
  disabled: {
    backgroundColor: colors.lightGray,
    opacity: 0.5,
  },
  
  // Специальные
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  
  // Кнопки для фото
  photoButton: {
    backgroundColor: colors.background,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  photoButtonActive: {
    backgroundColor: colors.primaryLight,
    borderWidth: 1,
    borderColor: colors.primary,
  },
});