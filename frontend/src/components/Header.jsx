import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { colors } from '../styles/colors';
import { typography } from '../styles/typography';
import { layout } from '../styles/layout';
import { buttons } from '../styles/buttons';

const Header = ({ userRole, userName, onLogout }) => {
  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: colors.white,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3,
    }}>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.primary }}>
          🌍 ЭКОЛОГИЯ
        </Text>
      </View>

      <View style={layout.row}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.background,
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderRadius: 20,
          marginRight: 10,
        }}>
          <Text style={{ fontSize: 14, marginRight: 5 }}>
            {userRole === 'teacher' ? '👨‍🏫' : '👨‍🎓'}
          </Text>
          <Text style={{ fontSize: 14, color: colors.black, fontWeight: '500', maxWidth: 100 }} numberOfLines={1}>
            {userName || 'Гость'}
          </Text>
        </View>
        
        <TouchableOpacity 
          onPress={onLogout} 
          style={{
            backgroundColor: colors.danger,
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 20,
          }}
        >
          <Text style={{ color: colors.white, fontSize: 12, fontWeight: '600' }}>Выйти</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;