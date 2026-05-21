import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 30,
    marginTop: 30,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 5,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabActive: {
    backgroundColor: '#4CAF50',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  tabTextActive: {
    color: '#fff',
  },
  roleContainer: {
    flexDirection: 'row',
    marginBottom: 25,
    gap: 10,
  },
  roleButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  roleButtonActive: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  roleButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  roleButtonTextActive: {
    color: '#fff',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  notification: {
    backgroundColor: '#e8f5e9',
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  notificationText: {
    color: '#2e7d32',
    fontSize: 14,
    textAlign: 'center',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subGreeting: {
    fontSize: 16,
    color: '#666',
    marginBottom: 25,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  progressContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
  },
  actionsContainer: {
    marginBottom: 25,
  },
  actionCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  actionDescription: {
    fontSize: 14,
    color: '#666',
  },
  eventsPreview: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  eventInfo: {
    flex: 1,
  },
  eventName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  eventDate: {
    fontSize: 14,
    color: '#999',
  },
  eventPoints: {
    alignItems: 'center',
  },
  pointsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  pointsLabel: {
    fontSize: 10,
    color: '#666',
  },
  achievementsPreview: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  badgeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  badge: {
    alignItems: 'center',
    flex: 1,
  },
  badgeIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  badgeName: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },

  loginLogoContainer: {
  position: 'relative',
  zIndex: 2,
  marginBottom: 20,
},

loginBackgroundImageContainer: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
},

loginBackgroundImage: {
  width: 1100,
  height: 550,
  transform: [{ rotate: '90deg' }],
  opacity: 0.05,
},

loginBackgroundImageContainer2: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  alignItems: 'center',
  overflow: 'hidden',
},

loginBackgroundImage2: {
  width: 1700,
  height: 850,
  transform: [{ rotate: '90deg' }],
  opacity: 0.1,
},

  // Стили для экрана учителя
  teacherStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  teacherStatCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  teacherStatValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 5,
  },
  teacherStatLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  teacherStatSub: {
    fontSize: 10,
    color: '#999',
    marginTop: 4,
  },
  teacherActionsContainer: {
    marginBottom: 25,
  },
  teacherActionCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  teacherActionIcon: {
    fontSize: 40,
    marginRight: 15,
  },
  teacherActionContent: {
    flex: 1,
  },
  teacherActionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  teacherActionDescription: {
    fontSize: 13,
    color: '#666',
  },
  teacherActionBadge: {
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  teacherActionBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  studentsList: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  studentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  studentPoints: {
    fontSize: 12,
    color: '#999',
  },
  studentStatus: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#e8f5e9',
  },
  studentStatusText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },
  inviteLinkContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 12,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inviteLinkText: {
    fontSize: 12,
    color: '#666',
    flex: 1,
  },
  copyButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 10,
  },
  copyButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  subtext: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
    textAlign: 'center',
  },
  // Стили для экрана участия в субботнике
  subbotnikContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  subbotnikHeader: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  subbotnikTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subbotnikDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  subbotnikLocation: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
  },
  photoSection: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  photoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  photoSubtitle: {
    fontSize: 12,
    color: '#999',
    marginBottom: 15,
  },
  photoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
    minHeight: 200,
    marginBottom: 15,
    overflow: 'hidden',
  },
  photoPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  photoPlaceholderIcon: {
    fontSize: 50,
    marginBottom: 10,
  },
  photoPlaceholderText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  photoImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  photoButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  photoButtonDisabled: {
    backgroundColor: '#c8e6c9',
  },
  photoButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  submitButton: {
    backgroundColor: '#FF9800',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  submitButtonDisabled: {
    backgroundColor: '#ffe0b2',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  instructionText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 10,
  },
  successContainer: {
    backgroundColor: '#e8f5e9',
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
    alignItems: 'center',
  },
  successText: {
    color: '#2e7d32',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  // Стили для экрана подтверждения результатов
  confirmContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  filterButtonActive: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  filterButtonTextActive: {
    color: '#fff',
  },
  studentCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  studentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  studentNameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  studentClassText: {
    fontSize: 14,
    color: '#666',
  },
  studentPointsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  photosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
    marginBottom: 15,
  },
  photoCard: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  photoLabel: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    alignItems: 'center',
  },
  photoLabelText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  photoImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  photoPlaceholder: {
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  photoPlaceholderIcon: {
    fontSize: 40,
    marginBottom: 5,
  },
  photoPlaceholderText: {
    fontSize: 12,
    color: '#999',
  },
  commentContainer: {
    marginBottom: 15,
  },
  commentLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#555',
    marginBottom: 8,
  },
  commentInput: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    minHeight: 80,
    textAlignVertical: 'top',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  approveButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rejectButton: {
    flex: 1,
    backgroundColor: '#f44336',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  reviewedBadge: {
    backgroundColor: '#e8f5e9',
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
  },
  reviewedText: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '500',
  },
  rejectedBadge: {
    backgroundColor: '#ffebee',
  },
  rejectedText: {
    color: '#f44336',
  },
  emptyContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 40,
    alignItems: 'center',
    marginTop: 50,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 15,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
   // Стили для экрана личного кабинета школы
  schoolContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 0,
    marginTop: 40,
  },
  schoolHeader: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  schoolLogo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  schoolLogoText: {
    fontSize: 36,
  },
  schoolName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  schoolAddress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    textAlign: 'center',
  },
  schoolDirector: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
    textAlign: 'center',
  },
  schoolStatsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 12,
  },
  schoolStatCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  schoolStatIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  schoolStatValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 5,
  },
  schoolStatLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  ratingContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ratingInfo: {
    flex: 1,
  },
  ratingTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  ratingValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF9800',
  },
  ratingPosition: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  ratingButton: {
    backgroundColor: '#FF9800',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  ratingButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  schoolActionsContainer: {
    marginBottom: 20,
  },
  schoolActionCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  schoolActionIcon: {
    fontSize: 40,
    marginRight: 15,
  },
  schoolActionContent: {
    flex: 1,
  },
  schoolActionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  schoolActionDescription: {
    fontSize: 13,
    color: '#666',
  },
  inviteLinkBox: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 12,
    marginTop: 10,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inviteLinkText: {
    fontSize: 12,
    color: '#666',
    flex: 1,
  },
  copyButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 10,
  },
  copyButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  editButton: {
    marginTop: 10,
    paddingVertical: 8,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '500',
  },
  teachersList: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  teacherItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  teacherInfo: {
    flex: 1,
  },
  teacherName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  teacherSubject: {
    fontSize: 12,
    color: '#999',
  },
  teacherClass: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },
  viewAllButton: {
    marginTop: 10,
    alignItems: 'center',
    paddingVertical: 10,
  },
  viewAllText: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '500',
  },
   // Стили для экрана создания мероприятия
  createEventContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  requiredLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginBottom: 8,
  },
  requiredStar: {
    color: '#f44336',
  },
  inputMultiline: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    minHeight: 100,
    textAlignVertical: 'top',
  },
  inputSmall: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  rowContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  halfWidth: {
    flex: 1,
  },
  previewContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginTop: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  previewItem: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  previewLabel: {
    width: 80,
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  previewValue: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  generateButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  generateButtonDisabled: {
    backgroundColor: '#c8e6c9',
  },
  generateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkContainer: {
    backgroundColor: '#e8f5e9',
    borderRadius: 15,
    padding: 15,
    marginTop: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  linkTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 10,
    textAlign: 'center',
  },
  linkBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  linkText: {
    fontSize: 12,
    color: '#666',
    flex: 1,
  },
  copyButtonGreen: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 10,
  },
  copyButtonTextWhite: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  shareButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  successIcon: {
    fontSize: 50,
    textAlign: 'center',
    marginBottom: 10,
  },
  // Стили для экрана управления мероприятием
  manageEventContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  eventInfoCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  eventDateLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  eventStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  eventStatItem: {
    alignItems: 'center',
    flex: 1,
  },
  eventStatValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  eventStatLabel: {
    fontSize: 12,
    color: '#666',
  },
  ratingList: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ratingHeader: {
    flexDirection: 'row',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    marginBottom: 10,
  },
  ratingRank: {
    width: 50,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
  ratingName: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
  ratingPoints: {
    width: 70,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    textAlign: 'right',
  },
  ratingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  ratingRankNumber: {
    width: 50,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  ratingNameText: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
  ratingPointsText: {
    width: 70,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'right',
  },
  topRank: {
    backgroundColor: '#FFF3E0',
    borderRadius: 8,
    marginTop: 2,
  },
  topRankText: {
    color: '#FF9800',
  },
  participantCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  participantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  participantName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
  },
  participantPoints: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  participantClass: {
    fontSize: 13,
    color: '#666',
    marginBottom: 12,
  },
  participantPhotos: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  participantPhoto: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  participantPhotoLabel: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 6,
    alignItems: 'center',
  },
  participantPhotoLabelText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#666',
  },
  participantPhotoImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  participantPhotoPlaceholder: {
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  participantStatusBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  participantStatusText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  participantActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rejectButton: {
    flex: 1,
    backgroundColor: '#f44336',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  approvedBadge: {
    backgroundColor: '#e8f5e9',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  approvedBadgeText: {
    color: '#4CAF50',
    fontWeight: '500',
  },
  rejectedBadge: {
    backgroundColor: '#ffebee',
  },
  rejectedBadgeText: {
    color: '#f44336',
  },
  tabContainerManage: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 4,
  },
  tabManage: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabManageActive: {
    backgroundColor: '#4CAF50',
  },
  tabManageText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  tabManageTextActive: {
    color: '#fff',
  },
  // Стили для экрана рейтинга школ
  ratingSchoolContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  ratingHeaderCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ratingHeaderTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  ratingHeaderSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  ratingHeaderStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  ratingHeaderStat: {
    alignItems: 'center',
  },
  ratingHeaderStatValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  ratingHeaderStatLabel: {
    fontSize: 12,
    color: '#666',
  },
  searchContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
    color: '#999',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    padding: 8,
  },
  schoolTable: {
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    paddingHorizontal: 15,
  },
  tableHeaderRank: {
    width: 60,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  tableHeaderName: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  tableHeaderPoints: {
    width: 80,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'right',
  },
  tableHeaderAction: {
    width: 80,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  schoolRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  schoolRank: {
    width: 60,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  topRankMedal: {
    fontSize: 18,
  },
  schoolName: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
  schoolPoints: {
    width: 80,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'right',
  },
  detailButton: {
    width: 80,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    alignItems: 'center',
  },
  detailButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  mySchoolRow: {
    backgroundColor: '#FFF3E0',
    borderLeftWidth: 3,
    borderLeftColor: '#FF9800',
  },
  mySchoolText: {
    fontWeight: 'bold',
    color: '#FF9800',
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
// Стили для экрана профиля организатора
  profileContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  profileHeader: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  profileAvatarText: {
    fontSize: 48,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  profileRole: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '500',
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
  },
  profileStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  profileStatItem: {
    alignItems: 'center',
  },
  profileStatValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  profileStatLabel: {
    fontSize: 12,
    color: '#666',
  },
  profileActionsContainer: {
    marginBottom: 20,
  },
  profileActionCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileActionIcon: {
    fontSize: 32,
    marginRight: 15,
  },
  profileActionContent: {
    flex: 1,
  },
  profileActionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  profileActionDescription: {
    fontSize: 13,
    color: '#666',
  },
  logoutButton: {
    backgroundColor: '#f44336',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  editButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  myEventsList: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventItemOrganizer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  eventInfoOrganizer: {
    flex: 1,
  },
  eventNameOrganizer: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  eventDateOrganizer: {
    fontSize: 12,
    color: '#999',
  },
  eventStatusOrganizer: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#e8f5e9',
  },
  eventStatusTextOrganizer: {
    fontSize: 11,
    color: '#4CAF50',
    fontWeight: '500',
  },
  eventStatusActive: {
    backgroundColor: '#e8f5e9',
  },
  eventStatusActiveText: {
    color: '#4CAF50',
  },
  eventStatusCompleted: {
    backgroundColor: '#e3f2fd',
  },
  eventStatusCompletedText: {
    color: '#2196F3',
  },
  // Стили для экрана входа
  forgotPasswordText: {
    color: '#4CAF50',
    fontSize: 14,
    textAlign: 'right',
    marginBottom: 20,
  },
  registerLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  registerLinkText: {
    fontSize: 14,
    color: '#666',
  },
  registerLinkButton: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },
  loginLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 30,
  },

  // Стили для выбора типа пользователя
  userTypeContainer: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 25,
  },
  userTypeButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  userTypeButtonActive: {
    borderColor: '#4CAF50',
    backgroundColor: '#e8f5e9',
  },
  userTypeIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  userTypeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 4,
  },
  userTypeButtonTextActive: {
    color: '#4CAF50',
  },
  userTypeSubtext: {
    fontSize: 11,
    color: '#999',
    textAlign: 'center',
  },

  // Стили для выбора роли в учёбе
  studyRoleContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 25,
  },
  studyRoleButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  studyRoleButtonActive: {
    borderColor: '#4CAF50',
    backgroundColor: '#e8f5e9',
  },
  studyRoleIcon: {
    fontSize: 24,
    marginBottom: 6,
  },
  studyRoleButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 2,
  },
  studyRoleButtonTextActive: {
    color: '#4CAF50',
  },
  studyRoleSubtext: {
    fontSize: 10,
    color: '#999',
    textAlign: 'center',
  },




  //НОВЫЙ СТИЛИ ДЛЯ ЭКРАНОВ НОВЫЙ СТИЛИ ДЛЯ ЭКРАНОВ НОВЫЙ СТИЛИ ДЛЯ ЭКРАНОВ НОВЫЙ СТИЛИ ДЛЯ ЭКРАНОВ 
  //НОВЫЙ СТИЛИ ДЛЯ ЭКРАНОВ НОВЫЙ СТИЛИ ДЛЯ ЭКРАНОВ НОВЫЙ СТИЛИ ДЛЯ ЭКРАНОВ НОВЫЙ СТИЛИ ДЛЯ ЭКРАНОВ 
  //НОВЫЙ СТИЛИ ДЛЯ ЭКРАНОВ НОВЫЙ СТИЛИ ДЛЯ ЭКРАНОВ НОВЫЙ СТИЛИ ДЛЯ ЭКРАНОВ НОВЫЙ СТИЛИ ДЛЯ ЭКРАНОВ 

  // Стили для экрана входа
  loginImage: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },

  loginScrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingVertical: 40,
  },

  loginContainer: {
    width: '100%',
    paddingHorizontal: 24,
    maxWidth: 400,
  },

  loginHeader: {
    alignItems: 'center',
    marginBottom: 48,
  },

  loginTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    letterSpacing: 0.5,
  },

  loginSubtitle: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },

  loginForm: {
    width: '100%',
  },

  loginButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 20,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },

  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },

  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },

  forgotPasswordText: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '500',
  },

  // Стили для экрана регистрации

  registerScrollContainer: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    paddingVertical: 110,
    paddingHorizontal: 24,
  },

  registerContainer: {
    width: '100%',
  },

  registerHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },

  registerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },

  registerSubtitle: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },

  registerForm: {
    width: '100%',
  },

  registerRoleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 24,
  },

  registerRoleButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },

  registerRoleButtonActive: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },

  registerRoleText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },

  registerRoleTextActive: {
    color: '#fff',
  },

  registerButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 20,
  },

  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },

  registerInfoBox: {
    backgroundColor: '#e8f5e9',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },

  registerInfoText: {
    fontSize: 13,
    color: '#2e7d32',
    lineHeight: 18,
  },

  registerHelperText: {
    fontSize: 11,
    color: '#999',
    marginTop: 6,
    marginLeft: 4,
  },

  registerLoginLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 20,
  },

  registerLoginText: {
    fontSize: 14,
    color: '#666',
  },

  registerLoginButton: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },

  // Стили для экрана ученика

  studentLoadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },

  studentScrollContainer: {
    flexGrow: 1,
    paddingBottom: 0,
    backgroundColor: '#f5f5f5',
  },

  studentContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  studentHeader: {
    backgroundColor: '#fff',
    paddingTop: 90,
    paddingBottom: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },

  studentAvatar: {
    width: 160,
    height: 90,
    borderRadius: 40,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    
  },


  studentAvatarText: {
    fontSize: 36,
    fontWeight: '600',
    color: '#fff',
  },

  studentName: {
    fontSize: 22,
  fontWeight: 'bold',
  color: '#333',
  marginBottom: 4,
  backgroundColor: 'rgba(255, 255, 255, 1)',
  paddingHorizontal: 16,
  paddingVertical: 4,
  borderRadius: 20,
  overflow: 'hidden',
  },

  studentRole: {
  fontSize: 14,
  color: '#4CAF50',
  fontWeight: '500',
  marginBottom: 24,
  backgroundColor: 'rgba(255, 255, 255, 1)',
  paddingHorizontal: 12,
  paddingVertical: 2,
  borderRadius: 15,
  overflow: 'hidden',
  },

  studentRole2: {
  fontSize: 14,
  color: '#000',
  fontWeight: '500',
  marginBottom: 0,
  backgroundColor: 'rgba(255, 255, 255, 1)',
  paddingHorizontal: 12,
  paddingVertical: 2,
  borderRadius: 15,
  overflow: 'hidden',
  },

  studentStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 12,
  },

  studentStatButton: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },

  studentStatButtonValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 4,
  },

  studentStatButtonLabel: {
    fontSize: 10,
    color: '#666',
  },

  studentActionsContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 12,
  },

  studentActionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },

  studentActionContent: {
    flex: 1,
  },

  studentActionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },

  studentActionDescription: {
    fontSize: 13,
    color: '#666',
  },

  studentActionArrow: {
    fontSize: 18,
    color: '#4CAF50',
    fontWeight: '600',
  },

  studentMyEvents: {
    backgroundColor: '#fff',
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },

  studentMyEventsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },

  studentMyEventItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },

  studentMyEventItemPast: {
    opacity: 0.7,
  },

  studentMyEventInfo: {
    flex: 1,
  },

  studentMyEventName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },

  studentMyEventNamePast: {
    color: '#999',
  },

  studentMyEventDate: {
    fontSize: 12,
    color: '#999',
    marginBottom: 2,
  },

  studentMyEventScore: {
    fontSize: 12,
    color: '#4CAF50',
  },

  studentMyEventStatus: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },

  studentMyEventStatusPast: {
    backgroundColor: '#f5f5f5',
  },

  studentMyEventStatusText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },

  studentMyEventStatusTextPast: {
    color: '#999',
  },

  studentEmptyEvents: {
    paddingVertical: 32,
    alignItems: 'center',
  },

  studentEmptyEventsText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  // Футер с картинкой

  studentFooterImage: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
    marginTop: 8,
    marginBottom: 16,
  },

  studentFooterImageStyle: {
    width: '100%',
    height: 120,
  },

  studentAvatarImage: {
    width: '300%',
    height: '300%',

  },

  // Стили для экрана учителя

  teacherScrollContainer: {
    flexGrow: 1,
    paddingBottom: 40,
    backgroundColor: '#f5f5f5',
  },

  teacherContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  teacherHeader: {
    backgroundColor: '#fff',
    paddingTop: 90,
    paddingBottom: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },

  teacherAvatar: {
    width: 160,
    height: 90,
    borderRadius: 40,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  teacherAvatarText: {
    fontSize: 36,
    fontWeight: '600',
    color: '#fff',
  },

  teacherName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 20,
    overflow: 'hidden',
  },

  teacherRole: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
    marginBottom: 24,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    paddingHorizontal: 12,
    paddingVertical: 2,
    borderRadius: 15,
    overflow: 'hidden',
  },

  teacherStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 12,
  },

  teacherStatButton: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },

  teacherStatButtonValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 4,
  },

  teacherStatButtonLabel: {
    fontSize: 10,
    color: '#666',
  },

  teacherStatButtonSub: {
    fontSize: 9,
    color: '#4CAF50',
    marginTop: 4,
  },

  teacherActionsContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 12,
  },

  teacherActionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },

  teacherActionContent: {
    flex: 1,
  },

  teacherActionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },

  teacherActionDescription: {
    fontSize: 13,
    color: '#666',
  },

  teacherActionArrow: {
    fontSize: 18,
    color: '#4CAF50',
    fontWeight: '600',
  },

  teacherStudentsList: {
    backgroundColor: '#fff',
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },

  teacherSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },

  teacherSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },

  teacherSectionLink: {
    fontSize: 13,
    color: '#4CAF50',
    fontWeight: '500',
  },

  teacherStudentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },

  teacherStudentInfo: {
    flex: 1,
  },

  teacherStudentName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },

  teacherStudentPoints: {
    fontSize: 12,
    color: '#4CAF50',
  },

  teacherStudentStatus: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },

  teacherStudentStatusText: {
    fontSize: 11,
    color: '#4CAF50',
    fontWeight: '500',
  },

  teacherSubtext: {
    fontSize: 12,
    color: '#999',
    marginTop: 12,
    textAlign: 'center',
  },

  teacherEventsSection: {
    backgroundColor: '#fff',
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },

  teacherEventItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },

  teacherEventItemPast: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    opacity: 0.7,
  },

  teacherEventInfo: {
    flex: 1,
  },

  teacherEventName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },

  teacherEventNamePast: {
    fontSize: 16,
    fontWeight: '500',
    color: '#999',
    marginBottom: 4,
  },

  teacherEventDate: {
    fontSize: 12,
    color: '#999',
  },

  teacherFinishButton: {
    backgroundColor: '#FF9800',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },

  teacherFinishButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },

  teacherEventPastStats: {
    alignItems: 'flex-end',
  },

  teacherEventPastText: {
    fontSize: 12,
    color: '#999',
    marginBottom: 2,
  },

  teacherEventPastPoints: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4CAF50',
  },

  teacherEmptyState: {
    paddingVertical: 32,
    alignItems: 'center',
  },

  teacherEmptyText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },

  teacherFooterImage: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
    marginTop: 8,
    marginBottom: 16,
  },

  teacherFooterImageStyle: {
    width: '100%',
    height: 100,
  },
  teacherAvatarImage: {
  width: '300%',
  height: '300%',
  },
  teacherFooterImageStyle2: {
    width: '100%',
    height: 200,
    marginTop: 0,
    marginBottom: 0,
    paddingBottom: 0,
  },
  teacherFooterImage2: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 0,
    marginTop: 0,
    marginBottom: 0,
  },

  // Стили для экрана директора

  schoolLoadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },

  schoolScrollContainer: {
    flexGrow: 1,

    backgroundColor: '#f5f5f5',
  },


  schoolHeader: {
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingBottom: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },

  schoolAvatar: {
    width: 450,
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  schoolAvatarImage: {
    width: '100%',
    height: '100%',
  },

  schoolName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    textAlign: 'center',
  },

  schoolAddress: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
    textAlign: 'center',
  },

  schoolDirector: {
    fontSize: 13,
    color: '#4CAF50',
    fontWeight: '500',
    marginBottom: 24,
    textAlign: 'center',
  },

  schoolStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 12,
    flexWrap: 'wrap',
  },

  schoolStatButton: {
    flex: 1,
    minWidth: '22%',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },

  schoolStatButtonValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 4,
  },

  schoolStatButtonLabel: {
    fontSize: 10,
    color: '#666',
  },

  schoolRatingCard: {
    backgroundColor: '#fff',
    marginTop: 16,
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },

  schoolRatingInfo: {
    flex: 1,
  },

  schoolRatingTitle: {
    fontSize: 13,
    color: '#999',
    marginBottom: 4,
  },

  schoolRatingValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF9800',
    marginBottom: 2,
  },

  schoolRatingPosition: {
    fontSize: 11,
    color: '#999',
  },

  schoolRatingButton: {
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },

  schoolRatingButtonText: {
    color: '#FF9800',
    fontSize: 12,
    fontWeight: '500',
  },

  schoolActionsContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 12,
  },

  schoolActionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },

  schoolActionContent: {
    flex: 1,
  },

  schoolActionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },

  schoolActionDescription: {
    fontSize: 13,
    color: '#666',
  },

  schoolActionArrow: {
    fontSize: 18,
    color: '#4CAF50',
    fontWeight: '600',
  },

  schoolTeachersList: {
    backgroundColor: '#fff',
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 20,
  },

  schoolSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },

  schoolSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },

  schoolSectionLink: {
    fontSize: 13,
    color: '#4CAF50',
    fontWeight: '500',
  },

  schoolTeacherItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },

  schoolTeacherInfo: {
    flex: 1,
  },

  schoolTeacherName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },

  schoolTeacherSubject: {
    fontSize: 12,
    color: '#999',
  },

  schoolTeacherClass: {
    fontSize: 13,
    color: '#4CAF50',
    fontWeight: '500',
  },

  schoolViewAllButton: {
    marginTop: 12,
    alignItems: 'center',
    paddingVertical: 8,
  },

  schoolViewAllText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
  },

  schoolEmptyState: {
    paddingVertical: 24,
    alignItems: 'center',
  },

  schoolEmptyText: {
    fontSize: 14,
    color: '#999',
  },

  // Стили для экрана пользователя

  userLoadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },

  userScrollContainer: {
    flexGrow: 1,
    paddingBottom: 40,
    backgroundColor: '#f5f5f5',
  },

  userContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  userHeader: {
    backgroundColor: '#fff',
    paddingTop: 90,
    paddingBottom: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },

  userAvatar: {
    width: 450,
    height: 250,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    overflow: 'hidden',
  },

  userAvatarImage: {
    width: '100%',
    height: '100%',
  },

  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },

  userRole: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
    marginBottom: 24,
  },

  userJoinCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },

  userJoinTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },

  userJoinInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: '#fafafa',
  },

  userJoinButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
  },

  userJoinButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  userTabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },

  userTab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },

  userTabActive: {
    backgroundColor: '#4CAF50',
  },

  userTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },

  userTabTextActive: {
    color: '#fff',
  },

  userActionCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },

  userActionContent: {
    flex: 1,
  },

  userActionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },

  userActionDescription: {
    fontSize: 13,
    color: '#666',
  },

  userActionArrow: {
    fontSize: 18,
    color: '#4CAF50',
    fontWeight: '600',
  },

  userEventsList: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 20,
  },

  userSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },

  userEventItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },

  userEventInfo: {
    flex: 1,
  },

  userEventName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },

  userEventDate: {
    fontSize: 12,
    color: '#999',
    marginBottom: 2,
  },

  userEventLocation: {
    fontSize: 12,
    color: '#4CAF50',
  },

  userEventStatus: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },

  userEventStatusActive: {
    backgroundColor: '#E8F5E9',
  },

  userEventStatusFinished: {
    backgroundColor: '#E3F2FD',
  },

  userEventStatusText: {
    fontSize: 11,
    fontWeight: '500',
  },

  userEventStatusTextActive: {
    color: '#4CAF50',
  },

  userEventStatusTextFinished: {
    color: '#2196F3',
  },

  userEventParticipantStats: {
    alignItems: 'flex-end',
  },

  userEventScore: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4CAF50',
    marginBottom: 6,
  },

  userPhotoButton: {
    backgroundColor: '#FF9800',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  userPhotoButtonText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },

  userEmptyState: {
    paddingVertical: 32,
    alignItems: 'center',
  },

  userEmptyText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },

  // Стили для экрана деталей мероприятия

  eventLoadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },

  eventContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  eventHeaderBackground: {
    width: '100%',
    height: 280,
    justifyContent: 'center',
    alignItems: 'center',
  },

  eventBackButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    zIndex: 10,
  },

  eventBackButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },

  eventInfoCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 20,
    alignItems: 'center',
    maxWidth: '85%',
  },

  eventName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },

  eventIdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },

  eventIdLabel: {
    fontSize: 20,
    color: '#666',
    marginRight: 4,
  },

  eventIdValue: {
    fontSize: 20,
    fontWeight: '500',
    color: '#4CAF50',
  },

  eventDate: {
    fontSize: 20,
    color: '#666',
    marginBottom: 4,
  },

  eventLocation: {
    fontSize: 20,
    color: '#666',
    marginBottom: 12,
  },

  eventFinishedBadge: {
    backgroundColor: '#0000004a',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 4,
  },

  eventFinishedText: {
    fontSize: 13,
    color: '#fff',
    fontWeight: '600',
  },

  eventTabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },

  eventTab: {
    paddingVertical: 12,
    marginRight: 24,
  },

  eventTabActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#4CAF50',
  },

  eventTabText: {
    fontSize: 16,
    color: '#999',
    fontWeight: '500',
  },

  eventTabTextActive: {
    color: '#4CAF50',
  },

  eventContent: {
    flex: 1,
  },

  // Стили для шапки с фоном в CleanSendingScreen

  cleanEventHeaderBackground: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
  },

  cleanEventInfoCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.01)',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },

  cleanEventTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },

  cleanEventDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },

  cleanEventLocation: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
  },

  // Стили для экрана рейтинга школ

  schoolsRatingLoadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },

  schoolsRatingContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  schoolsRatingBackButton: {
    position: 'absolute',
    top: 70,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    zIndex: 10,
  },

  schoolsRatingBackButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },

  schoolsRatingHeader: {
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 80,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
  },

  schoolsRatingTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    marginTop: 30,
  },

  schoolsRatingSubtitle: {
    fontSize: 14,
    color: '#666',
  },

  schoolsRatingScrollView: {
    flex: 1,
  },

  schoolsRatingListContainer: {
    padding: 16,
  },

  schoolsRatingItem: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  schoolsRatingTopItem: {
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  schoolsRatingMySchoolItem: {
    backgroundColor: '#FFF8E1',
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },

  schoolsRatingRankContainer: {
    width: 50,
    alignItems: 'center',
  },

  schoolsRatingRank: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#999',
  },

  schoolsRatingRankGold: {
    color: '#FFD700',
  },

  schoolsRatingRankSilver: {
    color: '#C0C0C0',
  },

  schoolsRatingRankBronze: {
    color: '#CD7F32',
  },

  schoolsRatingInfoContainer: {
    flex: 1,
  },

  schoolsRatingSchoolName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },

  schoolsRatingMySchoolText: {
    color: '#FF9800',
  },

  schoolsRatingAddress: {
    fontSize: 12,
    color: '#999',
    marginBottom: 6,
  },

  schoolsRatingStatsRow: {
    flexDirection: 'row',
    gap: 16,
  },

  schoolsRatingStat: {
    fontSize: 12,
    color: '#666',
  },

  schoolsRatingScoreContainer: {
    alignItems: 'center',
    minWidth: 65,
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },

  schoolsRatingScore: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },

  schoolsRatingScoreLabel: {
    fontSize: 10,
    color: '#666',
  },

  schoolsRatingEmptyState: {
    padding: 60,
    alignItems: 'center',
  },

  schoolsRatingEmptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
  // Стили для экрана проверки запроса

  reviewLoadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },

  reviewContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  reviewBackButton: {
    position: 'absolute',
    top: 70,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    zIndex: 10,
  },

  reviewBackButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },

  reviewScrollContent: {
    padding: 16,
    paddingTop: 80,
    paddingBottom: 40,
  },

  reviewInfoCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    marginTop: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  reviewInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },

  reviewInfoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },

  reviewInfoLabel: {
    fontSize: 14,
    color: '#666',
    width: 150,
  },

  reviewInfoValue: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },

  reviewAiRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },

  reviewAiLabel: {
    fontSize: 14,
    color: '#666',
    width: 90,
  },

  reviewAiScore: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },

  reviewAiScoreText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4CAF50',
  },

  reviewPhotoCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  reviewPhotoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },

  reviewPhotoImage: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    backgroundColor: '#f9f9f9',
  },

  reviewPhotoPlaceholder: {
    height: 150,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  reviewPhotoPlaceholderText: {
    color: '#999',
    fontSize: 14,
  },

  reviewScoreCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  reviewScoreTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },

  reviewScoreInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 14,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
    backgroundColor: '#fafafa',
  },

  reviewScoreHint: {
    fontSize: 12,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
  },

  reviewCommentCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  reviewCommentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },

  reviewCommentHint: {
    fontSize: 12,
    color: '#f44336',
    marginBottom: 12,
  },

  reviewCommentInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 14,
    fontSize: 14,
    minHeight: 100,
    textAlignVertical: 'top',
    backgroundColor: '#fafafa',
    color: '#333',
  },

  reviewButtonsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
    marginBottom: 20,
  },

  reviewApproveButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },

  reviewApproveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  reviewRejectButton: {
    flex: 1,
    backgroundColor: '#f44336',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },

  reviewRejectButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  reviewButtonDisabled: {
    opacity: 0.6,
  },

  // Стили для экрана списка мероприятий

  eventsLoadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },

  eventsContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  eventsBackButton: {
    position: 'absolute',
    top: 70,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    zIndex: 10,
  },

  eventsBackButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },

  eventsHeader: {
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 120,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },

  eventsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },

  eventsSubtitle: {
    fontSize: 14,
    color: '#666',
  },

  eventsScrollView: {
    flex: 1,
  },

  eventsListContainer: {
    padding: 16,
  },

  eventsCard: {
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  eventsCardBackground: {
    width: '100%',
    backgroundColor: '#fff',
  },

  eventsCardContent: {
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },

  eventsCardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },

  eventsCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },

  eventsCardIcon: {
    fontSize: 14,
    marginRight: 8,
    color: '#666',
  },

  eventsCardText: {
    fontSize: 14,
    color: '#666',
  },

  eventsFinishedBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 10,
    alignSelf: 'flex-start',
  },

  eventsFinishedText: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: '600',
  },

  eventsEmptyState: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
    marginTop: 20,
  },

  eventsEmptyText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});
