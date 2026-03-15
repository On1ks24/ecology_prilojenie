import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const forms = StyleSheet.create({
  inputGroup: {
    marginBottom: 20,
  },
  
  label: {
    fontSize: 16,
    color: colors.black,
    marginBottom: 8,
    fontWeight: '500',
  },
  
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    backgroundColor: colors.background,
  },
  
  inputFocused: {
    borderColor: colors.primary,
  },
  
  inputError: {
    borderColor: colors.danger,
  },
  
  errorText: {
    color: colors.danger,
    fontSize: 12,
    marginTop: 4,
  },
  
  // Radio кнопки
  radioGroup: {
    flexDirection: 'row',
    gap: 20,
  },
  
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.primary,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  radioSelected: {
    borderColor: colors.primary,
  },
  
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  
  radioText: {
    fontSize: 15,
    color: colors.black,
  },
  
  // Чекбоксы
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  checkboxChecked: {
    backgroundColor: colors.primary,
  },
  
  // Селекты
  select: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 14,
    backgroundColor: colors.background,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});