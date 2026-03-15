import React from 'react';
import { View, Text } from 'react-native';

import { colors } from '../styles/colors';
import { typography } from '../styles/typography';
import { layout } from '../styles/layout';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <View style={{
      backgroundColor: colors.white,
      paddingVertical: 20,
      paddingHorizontal: 16,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    }}>
      <View style={[layout.row, { justifyContent: 'center', marginBottom: 15 }]}>
        <Text style={{ fontSize: 20, marginHorizontal: 8 }}>🌱</Text>
        <Text style={{ fontSize: 16, color: colors.primary, fontWeight: '500' }}>
          Чистота начинается с тебя!
        </Text>
        <Text style={{ fontSize: 20, marginHorizontal: 8 }}>♻️</Text>
      </View>
      
      <View style={[layout.row, { justifyContent: 'center', marginBottom: 15, gap: 20 }]}>
        <Text style={{ color: colors.gray, fontSize: 14 }}>О проекте</Text>
        <Text style={{ color: colors.gray, fontSize: 14 }}>Правила</Text>
        <Text style={{ color: colors.gray, fontSize: 14 }}>Контакты</Text>
      </View>
      
      <View style={layout.center}>
        <Text style={[typography.caption, { color: colors.lightGray }]}>
          © {currentYear} Экологическое приложение
        </Text>
        <Text style={[typography.overline, { color: colors.lightGray, marginTop: 4 }]}>
          Задунов Л.Э. КИ22-11Б
        </Text>
      </View>
    </View>
  );
};

export default Footer;