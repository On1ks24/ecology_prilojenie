import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import styles from './styles';

const ConfirmResultsScreen = () => {
  const [filter, setFilter] = useState('pending'); // 'pending', 'approved', 'rejected'
  const [students, setStudents] = useState([
    {
      id: 1,
      name: 'Алексей Иванов',
      class: '7А',
      points: 50,
      status: 'pending',
      beforePhoto: 'https://via.placeholder.com/400x300/ffcccc?text=Before',
      afterPhoto: 'https://via.placeholder.com/400x300/ccffcc?text=After',
      comment: '',
    },
    {
      id: 2,
      name: 'Мария Петрова',
      class: '7А',
      points: 50,
      status: 'pending',
      beforePhoto: 'https://via.placeholder.com/400x300/ffcccc?text=Before',
      afterPhoto: 'https://via.placeholder.com/400x300/ccffcc?text=After',
      comment: '',
    },
    {
      id: 3,
      name: 'Дмитрий Сидоров',
      class: '7А',
      points: 50,
      status: 'approved',
      beforePhoto: 'https://via.placeholder.com/400x300/ffcccc?text=Before',
      afterPhoto: 'https://via.placeholder.com/400x300/ccffcc?text=After',
      comment: 'Отличная работа!',
    },
    {
      id: 4,
      name: 'Анна Кузнецова',
      class: '7А',
      points: 50,
      status: 'rejected',
      beforePhoto: 'https://via.placeholder.com/400x300/ffcccc?text=Before',
      afterPhoto: 'https://via.placeholder.com/400x300/ccffcc?text=After',
      comment: 'Фото размыто, нужно переделать',
    },
    {
      id: 5,
      name: 'Сергей Васильев',
      class: '7А',
      points: 50,
      status: 'pending',
      beforePhoto: 'https://via.placeholder.com/400x300/ffcccc?text=Before',
      afterPhoto: 'https://via.placeholder.com/400x300/ccffcc?text=After',
      comment: '',
    },
  ]);

  const [comments, setComments] = useState({});

  const handleApprove = (studentId) => {
    // TODO: Отправить подтверждение на сервер
    // await fetch(`API_URL/approve/${studentId}`, { method: 'POST' })
    
    setStudents(prevStudents =>
      prevStudents.map(student =>
        student.id === studentId
          ? { ...student, status: 'approved', comment: comments[studentId] || '' }
          : student
      )
    );
    
    Alert.alert('Успех', 'Результаты ученика подтверждены, баллы начислены');
  };

  const handleReject = (studentId) => {
    const comment = comments[studentId];
    
    if (!comment) {
      Alert.alert('Внимание', 'Пожалуйста, укажите причину отклонения');
      return;
    }
    
    // TODO: Отправить отклонение на сервер
    // await fetch(`API_URL/reject/${studentId}`, { 
    //   method: 'POST',
    //   body: JSON.stringify({ comment })
    // })
    
    setStudents(prevStudents =>
      prevStudents.map(student =>
        student.id === studentId
          ? { ...student, status: 'rejected', comment: comment }
          : student
      )
    );
    
    Alert.alert('Отклонено', 'Результаты ученика отклонены');
  };

  const handleCommentChange = (studentId, text) => {
    setComments(prev => ({ ...prev, [studentId]: text }));
  };

  const filteredStudents = students.filter(student => {
    if (filter === 'pending') return student.status === 'pending';
    if (filter === 'approved') return student.status === 'approved';
    if (filter === 'rejected') return student.status === 'rejected';
    return true;
  });

  const renderStudentCard = (student) => {
    const isPending = student.status === 'pending';
    const isApproved = student.status === 'approved';
    const isRejected = student.status === 'rejected';
    const currentComment = comments[student.id] || student.comment;

    return (
      <View key={student.id} style={styles.studentCard}>
        <View style={styles.studentHeader}>
          <View>
            <Text style={styles.studentNameText}>{student.name}</Text>
            <Text style={styles.studentClassText}>{student.class} класс</Text>
          </View>
          <Text style={styles.studentPointsText}>+{student.points} баллов</Text>
        </View>

        <View style={styles.photosContainer}>
          <View style={styles.photoCard}>
            <View style={styles.photoLabel}>
              <Text style={styles.photoLabelText}>ДО уборки</Text>
            </View>
            <Image source={{ uri: student.beforePhoto }} style={styles.photoImage} />
          </View>

          <View style={styles.photoCard}>
            <View style={styles.photoLabel}>
              <Text style={styles.photoLabelText}>ПОСЛЕ уборки</Text>
            </View>
            <Image source={{ uri: student.afterPhoto }} style={styles.photoImage} />
          </View>
        </View>

        {isPending && (
          <>
            <View style={styles.commentContainer}>
              <Text style={styles.commentLabel}>Комментарий (при отклонении)</Text>
              <TextInput
                style={styles.commentInput}
                value={currentComment}
                onChangeText={(text) => handleCommentChange(student.id, text)}
                placeholder="Укажите причину отклонения или оставьте комментарий..."
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.approveButton}
                onPress={() => handleApprove(student.id)}
              >
                <Text style={styles.actionButtonText}>✓ Подтвердить</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.rejectButton}
                onPress={() => handleReject(student.id)}
              >
                <Text style={styles.actionButtonText}>✗ Отклонить</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {isApproved && (
          <View style={styles.reviewedBadge}>
            <Text style={styles.reviewedText}>
              ✓ Подтверждено {student.comment && `• ${student.comment}`}
            </Text>
          </View>
        )}

        {isRejected && (
          <View style={[styles.reviewedBadge, styles.rejectedBadge]}>
            <Text style={[styles.reviewedText, styles.rejectedText]}>
              ✗ Отклонено • {student.comment}
            </Text>
          </View>
        )}
      </View>
    );
  };

  const pendingCount = students.filter(s => s.status === 'pending').length;
  const approvedCount = students.filter(s => s.status === 'approved').length;
  const rejectedCount = students.filter(s => s.status === 'rejected').length;

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
      <View style={styles.confirmContainer}>
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[styles.filterButton, filter === 'pending' && styles.filterButtonActive]}
            onPress={() => setFilter('pending')}
          >
            <Text style={[styles.filterButtonText, filter === 'pending' && styles.filterButtonTextActive]}>
              На проверке ({pendingCount})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterButton, filter === 'approved' && styles.filterButtonActive]}
            onPress={() => setFilter('approved')}
          >
            <Text style={[styles.filterButtonText, filter === 'approved' && styles.filterButtonTextActive]}>
              Подтверждены ({approvedCount})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterButton, filter === 'rejected' && styles.filterButtonActive]}
            onPress={() => setFilter('rejected')}
          >
            <Text style={[styles.filterButtonText, filter === 'rejected' && styles.filterButtonTextActive]}>
              Отклонены ({rejectedCount})
            </Text>
          </TouchableOpacity>
        </View>

        {filteredStudents.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📭</Text>
            <Text style={styles.emptyTitle}>Нет результатов</Text>
            <Text style={styles.emptyText}>
              {filter === 'pending' && 'Нет учеников, ожидающих проверки'}
              {filter === 'approved' && 'Нет подтвержденных результатов'}
              {filter === 'rejected' && 'Нет отклоненных результатов'}
            </Text>
          </View>
        ) : (
          filteredStudents.map(renderStudentCard)
        )}
      </View>
    </ScrollView>
  );
};

export default ConfirmResultsScreen;