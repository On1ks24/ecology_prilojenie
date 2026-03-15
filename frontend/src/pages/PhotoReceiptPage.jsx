import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { colors } from '../styles/colors';
import { typography } from '../styles/typography';
import { layout } from '../styles/layout';
import { buttons } from '../styles/buttons';
import { cards } from '../styles/cards';

const PhotoReceiptPage = () => {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const mockAnalysis = {
        status: 'success',
        detectedObjectsBefore: [
          { class: 'Пластиковая бутылка', count: 3, icon: '🧴' },
          { class: 'Стекло', count: 1, icon: '🥃' },
          { class: 'Пакет', count: 2, icon: '🛍️' },
          { class: 'Бумага', count: 4, icon: '📄' },
          { class: 'Металл', count: 1, icon: '🥫' }
        ],
        totalCollected: 11,
        pointsEarned: 110,
        ecoImpact: {
          co2Saved: '2.5 кг',
          areaCleaned: '50 м²',
          plasticRecycled: '0.3 кг'
        },
        message: '🌟 Отличная работа! Территория полностью очищена!',
        ratingPosition: 3
      };
      setResult(mockAnalysis);
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return (
      <View style={[layout.container, layout.center]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[typography.body1, { marginTop: 20, textAlign: 'center' }]}>
          Нейросеть YOLO анализирует снимки...
        </Text>
        <Text style={[typography.caption, { marginTop: 8, textAlign: 'center' }]}>
          Определяем количество и типы мусора
        </Text>
      </View>
    );
  }

  if (!result) {
    return (
      <View style={[layout.container, layout.center]}>
        <Text style={[typography.body1, { color: colors.danger, marginBottom: 20 }]}>
          Ошибка загрузки результата
        </Text>
        <TouchableOpacity style={buttons.primary}>
          <Text style={buttons.primaryText}>Повторить</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={[typography.h4, { marginBottom: 20 }]}>Результаты уборки</Text>

      <View style={cards.result}>
        <View style={[layout.rowBetween, { marginBottom: 20 }]}>
          <Text style={{ fontSize: 50 }}>🏆</Text>
          <View style={[layout.row, { flex: 1, marginLeft: 16 }]}>
            <View style={[layout.center, { flex: 1 }]}>
              <Text style={[typography.h2, { color: colors.primary }]}>
                {result.totalCollected}
              </Text>
              <Text style={typography.caption}>предметов собрано</Text>
            </View>
            <View style={{ backgroundColor: colors.gold, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 }}>
              <Text style={[typography.h6, { color: colors.black }]}>+{result.pointsEarned}</Text>
            </View>
          </View>
        </View>

        <View style={{ backgroundColor: colors.primaryLight, padding: 16, borderRadius: 12, marginBottom: 20 }}>
          <Text style={[typography.body1, { color: colors.primaryDark, textAlign: 'center', fontWeight: '500' }]}>
            {result.message}
          </Text>
        </View>

        <View style={{ marginBottom: 20 }}>
          <Text style={[typography.h6, { marginBottom: 12 }]}>Найденный мусор:</Text>
          {result.detectedObjectsBefore
            .filter(item => item.count > 0)
            .map((item, index) => (
              <View key={index} style={[layout.rowBetween, { paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.border }]}>
                <View style={layout.row}>
                  <Text style={{ fontSize: 24, width: 40 }}>{item.icon}</Text>
                  <Text style={typography.body1}>{item.class}</Text>
                </View>
                <Text style={[typography.h6, { color: colors.primary }]}>{item.count} шт.</Text>
              </View>
            ))}
        </View>

        <View style={{ marginBottom: 20 }}>
          <Text style={[typography.h6, { marginBottom: 12 }]}>Экологический вклад:</Text>
          <View style={[layout.row, { justifyContent: 'space-around' }]}>
            <View style={layout.center}>
              <Text style={{ fontSize: 32, marginBottom: 8 }}>🌍</Text>
              <Text style={[typography.body1, { fontWeight: 'bold' }]}>{result.ecoImpact.co2Saved}</Text>
              <Text style={typography.caption}>CO2 сэкономлено</Text>
            </View>
            <View style={layout.center}>
              <Text style={{ fontSize: 32, marginBottom: 8 }}>📏</Text>
              <Text style={[typography.body1, { fontWeight: 'bold' }]}>{result.ecoImpact.areaCleaned}</Text>
              <Text style={typography.caption}>очищенной площади</Text>
            </View>
            <View style={layout.center}>
              <Text style={{ fontSize: 32, marginBottom: 8 }}>♻️</Text>
              <Text style={[typography.body1, { fontWeight: 'bold' }]}>{result.ecoImpact.plasticRecycled}</Text>
              <Text style={typography.caption}>пластика</Text>
            </View>
          </View>
        </View>

        <View style={{ backgroundColor: colors.goldLight, padding: 16, borderRadius: 12, marginBottom: 20 }}>
          <Text style={[typography.body1, { textAlign: 'center' }]}>
            Ваше место в рейтинге: <Text style={[typography.h4, { color: colors.warning }]}>#{result.ratingPosition}</Text>
          </Text>
        </View>

        <View style={layout.center}>
          <Text style={[typography.caption, { marginBottom: 16 }]}>* Данные получены от нейросети YOLO</Text>
          
          <View style={[layout.row, { gap: 12 }]}>
            <TouchableOpacity style={[buttons.secondary, layout.flex1]}>
              <Text style={buttons.secondaryText}>📱 Поделиться</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[buttons.primary, layout.flex1]}>
              <Text style={buttons.primaryText}>📊 В рейтинг</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default PhotoReceiptPage;