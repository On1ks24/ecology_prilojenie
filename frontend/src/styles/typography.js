import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const typography = StyleSheet.create({
  // Заголовки
  h1: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.black,
  },
  h2: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.black,
  },
  h3: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.black,
  },
  h4: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.black,
  },
  h5: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.black,
  },
  h6: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.black,
  },
  
  // Основной текст
  body1: {
    fontSize: 16,
    color: colors.black,
  },
  body2: {
    fontSize: 14,
    color: colors.gray,
  },
  body3: {
    fontSize: 12,
    color: colors.gray,
  },
  
  // Специальные
  caption: {
    fontSize: 12,
    color: colors.lightGray,
  },
  overline: {
    fontSize: 10,
    color: colors.lightGray,
    textTransform: 'uppercase',
  },
  
  // Для кнопок
  button: {
    fontSize: 16,
    fontWeight: '600',
  },
  buttonSmall: {
    fontSize: 14,
    fontWeight: '600',
  },
  
  // Цветные варианты
  primary: {
    color: colors.primary,
  },
  white: {
    color: colors.white,
  },
  success: {
    color: colors.success,
  },
  warning: {
    color: colors.warning,
  },
  danger: {
    color: colors.danger,
  },
});