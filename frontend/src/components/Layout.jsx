import React from 'react';
import { View, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import Header from './Header';
import Footer from './Footer';

import { colors } from '../styles/colors';
import { layout } from '../styles/layout';

const Layout = ({ children, userRole, userName, onLogout }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <View style={layout.container}>
        <Header 
          userRole={userRole} 
          userName={userName} 
          onLogout={onLogout}
        />
        
        <ScrollView 
          style={{ flex: 1, padding: 16 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {children}
        </ScrollView>
        
        <Footer />
      </View>
    </SafeAreaView>
  );
};

export default Layout;