import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://10.0.2.2:5000/api';

const GenerateInviteScreen = ({ route, navigation }) => {
  const { userId, role, schoolId, classId } = route.params || {};
  
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [activeCode, setActiveCode] = useState(null);

  const isDirector = role === 'director';
  const inviteTarget = isDirector ? 'учителей' : 'учеников';
  const inviteRole = isDirector ? 'teacher' : 'student';

  useEffect(() => {
    loadActiveCode();
  }, []);

  const getToken = async () => {
    return await AsyncStorage.getItem('accessToken');
  };

  const loadActiveCode = async () => {
    try {
      const token = await getToken();
      const response = await fetch(`${API_URL}/invites/my-active`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setActiveCode(data);
      } else {
        setActiveCode(null);
      }
    } catch (error) {
      setActiveCode(null);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateCode = async () => {
    try {
      setGenerating(true);
      const token = await getToken();

      const body = {};
      if (!isDirector) {
        body.role = 'student';
        body.class_id = classId;
      }

      const response = await fetch(`${API_URL}/invites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Failed');
      }

      const data = await response.json();
      setActiveCode(data);
      Alert.alert('Готово!', `Новый код для ${inviteTarget} создан`);
    } catch (error) {
      Alert.alert('Ошибка', error.message);
    } finally {
      setGenerating(false);
    }
  };

  const handleCopyCode = () => {
    Alert.alert('Скопировано', 'Код скопирован');
  };

  const handleDeactivate = async () => {
    Alert.alert(
      'Подтверждение',
      'Деактивировать текущий код?',
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Деактивировать',
          style: 'destructive',
          onPress: async () => {
            try {
              const token = await getToken();
              const response = await fetch(`${API_URL}/invites/${activeCode.code}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
              });

              if (response.ok) {
                setActiveCode(null);
                Alert.alert('Готово', 'Код деактивирован');
              }
            } catch (error) {
              Alert.alert('Ошибка', 'Не удалось деактивировать');
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" translucent />
      <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
        
        <TouchableOpacity 
          style={{
            position: 'absolute',
            top: 50,
            left: 20,
            backgroundColor: 'rgba(0,0,0,0.5)',
            paddingHorizontal: 14,
            paddingVertical: 8,
            borderRadius: 20,
            zIndex: 10,
            marginBottom: 250,
          }}
          onPress={() => navigation.goBack()}
        >
          <Text style={{ color: '#fff', fontSize: 14, fontWeight: '600' }}>← Назад</Text>
        </TouchableOpacity>

        <ScrollView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
          <View style={{ padding: 20, paddingTop: 100 }}>
            
            <View style={{ 
              backgroundColor: '#fff', 
              borderRadius: 16, 
              padding: 20, 
              marginBottom: 16,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}>
              
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 8 }}>
                Пригласительный код
              </Text>
              <Text style={{ fontSize: 15, color: '#666', lineHeight: 22 }}>
                {isDirector 
                  ? 'Создайте код для регистрации учителей в вашей школе. Учителя смогут выбрать класс при регистрации.'
                  : 'Создайте код для регистрации учеников в вашем классе. Ученики автоматически привяжутся к школе и классу.'}
              </Text>
            </View>

            {activeCode ? (
              <View style={{ 
                backgroundColor: '#fff', 
                borderRadius: 16, 
                padding: 20, 
                marginBottom: 16,
                borderLeftWidth: 4,
                borderLeftColor: '#4CAF50',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <Text style={{ fontSize: 13, color: '#4CAF50', fontWeight: '600', textTransform: 'uppercase' }}>
                    Активный код
                  </Text>
                  <View style={{ 
                    backgroundColor: '#E8F5E9', 
                    paddingHorizontal: 10, 
                    paddingVertical: 4, 
                    borderRadius: 12 
                  }}>
                    <Text style={{ color: '#4CAF50', fontSize: 12, fontWeight: '600' }}>
                      Действует
                    </Text>
                  </View>
                </View>

                <TouchableOpacity 
                  onPress={handleCopyCode}
                  style={{ 
                    backgroundColor: '#f8f9fa', 
                    borderRadius: 12, 
                    padding: 16,
                    borderWidth: 2,
                    borderStyle: 'dashed',
                    borderColor: '#4CAF50',
                    alignItems: 'center',
                    marginBottom: 12,
                  }}
                >
                  <Text style={{ 
                    fontSize: 28, 
                    fontWeight: 'bold', 
                    color: '#333',
                    letterSpacing: 2,
                  }}>
                    {activeCode.code}
                  </Text>
                  <Text style={{ fontSize: 12, color: '#999', marginTop: 6 }}>
                    Нажмите чтобы скопировать
                  </Text>
                </TouchableOpacity>

                <View style={{ marginBottom: 16 }}>
                  <Text style={{ fontSize: 14, color: '#666', marginBottom: 4 }}>
                    <Text style={{ fontWeight: '600' }}>Для:</Text> {activeCode.role === 'teacher' ? 'Учителей' : 'Учеников'}
                  </Text>
                  {activeCode.school && (
                    <Text style={{ fontSize: 14, color: '#666', marginBottom: 4 }}>
                      <Text style={{ fontWeight: '600' }}>Школа:</Text> {activeCode.school.name}
                    </Text>
                  )}
                  {activeCode.class && (
                    <Text style={{ fontSize: 14, color: '#666' }}>
                      <Text style={{ fontWeight: '600' }}>Класс:</Text> {activeCode.class.name}
                    </Text>
                  )}
                </View>

                <TouchableOpacity 
                  onPress={handleDeactivate}
                  style={{ 
                    backgroundColor: '#ffebee', 
                    paddingVertical: 12,
                    borderRadius: 12,
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: '#c62828', fontWeight: '600', fontSize: 15 }}>
                    Деактивировать код
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ 
                backgroundColor: '#fff', 
                borderRadius: 16, 
                padding: 30, 
                marginBottom: 16,
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}>
                <Text style={{ fontSize: 48, marginBottom: 12 }}>📭</Text>
                <Text style={{ fontSize: 16, color: '#666', textAlign: 'center' }}>
                  Нет активного пригласительного кода для {inviteTarget}
                </Text>
              </View>
            )}

            <TouchableOpacity
              onPress={handleGenerateCode}
              disabled={generating}
              style={{
                backgroundColor: generating ? '#81C784' : '#4CAF50',
                paddingVertical: 18,
                borderRadius: 16,
                alignItems: 'center',
                shadowColor: '#4CAF50',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 5,
              }}
            >
              {generating ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={{ color: '#fff', fontSize: 17, fontWeight: 'bold' }}>
                  {activeCode ? 'Сгенерировать новый код' : `Создать код для ${inviteTarget}`}
                </Text>
              )}
            </TouchableOpacity>

            {activeCode && (
              <Text style={{ 
                textAlign: 'center', 
                color: '#999', 
                fontSize: 13, 
                marginTop: 12,
                paddingHorizontal: 20,
              }}>
                При создании нового кода старый станет неактивным
              </Text>
            )}

            <View style={{ 
              backgroundColor: '#E3F2FD', 
              borderRadius: 12, 
              padding: 16, 
              marginTop: 24,
              marginBottom: 20,
            }}>
              <Text style={{ fontSize: 14, fontWeight: '600', color: '#1565C0', marginBottom: 8 }}>
                Как это работает:
              </Text>
              <Text style={{ fontSize: 13, color: '#1565C0', lineHeight: 20 }}>
                {isDirector 
                  ? '1. Создайте код\n2. Поделитесь им с учителями\n3. Учителя регистрируются и выбирают класс\n4. Код работает для неограниченного числа учителей'
                  : '1. Создайте код\n2. Поделитесь им с учениками\n3. Ученики регистрируются и автоматически попадают в ваш класс\n4. Код работает для неограниченного числа учеников'}
              </Text>
            </View>

          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default GenerateInviteScreen;