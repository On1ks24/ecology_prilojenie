import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfileScreen = ({ route }) => {
  const { user } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.text}>Name: {user.name}</Text>
      <Text style={styles.text}>Email: {user.email}</Text>
      <Text style={styles.text}>Role: {user.role}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default ProfileScreen;
