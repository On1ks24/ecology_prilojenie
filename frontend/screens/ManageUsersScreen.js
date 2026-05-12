// screens/ManageUsersScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Switch,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://10.0.2.2:5000/api';

const ManageUsersScreen = ({ route, navigation }) => {
  const { userRole, userType, schoolId, classId } = route.params || {};
  // userType: 'students' | 'teachers'
  // userRole: 'teacher' | 'director'

  const [activeTab, setActiveTab] = useState('active'); // 'active' | 'inactive'
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const isTeacher = userRole === 'teacher';
  const isStudentsScreen = userType === 'students';

  useEffect(() => {
    loadUsers();
  }, []);

  const getToken = async () => {
    return await AsyncStorage.getItem('accessToken');
  };

  const loadUsers = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      
      let endpoint;
      
      if (isTeacher) {
        // Учитель всегда видит учеников своего класса
        endpoint = `${API_URL}/users/class-students`;
      } else {
        // Директор смотрит что открыл
        endpoint = `${API_URL}/users/school-${userType}`;
      }

      const response = await fetch(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error);
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      Alert.alert('Ошибка', error.message || 'Не удалось загрузить');
    } finally {
      setLoading(false);
    }
  };

  const toggleUserActive = async (userId, currentStatus) => {
    try {
      const token = await getToken();
      const response = await fetch(`${API_URL}/users/${userId}/toggle-active`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error);
      }

      setUsers(prev => prev.map(u => 
        u.id === userId ? { ...u, is_active: !currentStatus } : u
      ));

      Alert.alert(
        'Готово', 
        `Пользователь ${!currentStatus ? 'активирован' : 'деактивирован'}`
      );
    } catch (error) {
      Alert.alert('Ошибка', error.message);
    }
  };

  const filteredUsers = users.filter(u => 
    activeTab === 'active' ? u.is_active : !u.is_active
  );

  const activeCount = users.filter(u => u.is_active).length;
  const inactiveCount = users.filter(u => !u.is_active).length;

  const title = isStudentsScreen ? 'Ученики' : 'Учителя';
  const activeTabLabel = isStudentsScreen ? 'Активные ученики' : 'Активные учителя';
  const inactiveTabLabel = isStudentsScreen ? 'Неактивные ученики' : 'Неактивные учителя';

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      {/* Шапка */}
      <View style={{ backgroundColor: '#fff', padding: 16, paddingTop: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 4 }}>
          {title}
        </Text>
        <Text style={{ fontSize: 14, color: '#666' }}>
          Всего: {users.length} • Активных: {activeCount} • Неактивных: {inactiveCount}
        </Text>
      </View>

      {/* Вкладки */}
      <View style={{ 
        flexDirection: 'row', 
        backgroundColor: '#fff', 
        paddingHorizontal: 16,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
      }}>
        <TouchableOpacity
          onPress={() => setActiveTab('active')}
          style={{
            flex: 1,
            paddingVertical: 10,
            alignItems: 'center',
            borderBottomWidth: 3,
            borderBottomColor: activeTab === 'active' ? '#4CAF50' : 'transparent',
          }}
        >
          <Text style={{ 
            fontSize: 15, 
            fontWeight: activeTab === 'active' ? '600' : '400',
            color: activeTab === 'active' ? '#4CAF50' : '#666'
          }}>
            {activeTabLabel} ({activeCount})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab('inactive')}
          style={{
            flex: 1,
            paddingVertical: 10,
            alignItems: 'center',
            borderBottomWidth: 3,
            borderBottomColor: activeTab === 'inactive' ? '#c62828' : 'transparent',
          }}
        >
          <Text style={{ 
            fontSize: 15, 
            fontWeight: activeTab === 'inactive' ? '600' : '400',
            color: activeTab === 'inactive' ? '#c62828' : '#666'
          }}>
            {inactiveTabLabel} ({inactiveCount})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Список */}
      <ScrollView style={{ flex: 1 }}>
        <View style={{ padding: 16 }}>
          {filteredUsers.length === 0 ? (
            <View style={{ alignItems: 'center', marginTop: 60 }}>
              <Text style={{ fontSize: 48, marginBottom: 16 }}>
                {activeTab === 'active' ? '✅' : '⛔'}
              </Text>
              <Text style={{ fontSize: 16, color: '#999', textAlign: 'center' }}>
                {activeTab === 'active' 
                  ? `Нет ${isStudentsScreen ? 'активных учеников' : 'активных учителей'}`
                  : `Нет ${isStudentsScreen ? 'неактивных учеников' : 'неактивных учителей'}`}
              </Text>
            </View>
          ) : (
            filteredUsers.map((user) => (
              <View 
                key={user.id}
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 12,
                  padding: 16,
                  marginBottom: 12,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.1,
                  shadowRadius: 3,
                  elevation: 2,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 16, fontWeight: '600', color: '#333' }}>
                    {user.name}
                  </Text>
                  <Text style={{ fontSize: 13, color: '#666', marginTop: 2 }}>
                    {user.email}
                  </Text>
                  {(user.className || user.Class?.name) && (
                    <Text style={{ fontSize: 13, color: '#999', marginTop: 2 }}>
                      Класс: {user.className || user.Class?.name}
                    </Text>
                  )}
                  {(user.totalPoints !== undefined) && (
                    <Text style={{ fontSize: 13, color: '#4CAF50', marginTop: 4 }}>
                      {user.totalPoints} баллов
                    </Text>
                  )}
                  {(user.studentsCount !== undefined) && (
                    <Text style={{ fontSize: 13, color: '#4CAF50', marginTop: 4 }}>
                      {user.studentsCount} учеников
                    </Text>
                  )}
                </View>

                <View style={{ alignItems: 'flex-end' }}>
                  <Switch
                    value={user.is_active}
                    onValueChange={() => toggleUserActive(user.id, user.is_active)}
                    trackColor={{ false: '#ffebee', true: '#e8f5e9' }}
                    thumbColor={user.is_active ? '#4CAF50' : '#c62828'}
                  />
                  <Text style={{ 
                    fontSize: 11, 
                    color: user.is_active ? '#4CAF50' : '#c62828',
                    marginTop: 4 
                  }}>
                    {user.is_active ? 'Активен' : 'Неактивен'}
                  </Text>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default ManageUsersScreen;