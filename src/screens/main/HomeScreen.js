import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeScreen = () => {
  const theme = useTheme();

  const featuredEvents = [
    { id: 1, title: 'Main Stage', time: '6:00 PM', artist: 'Headliner Band' },
    { id: 2, title: 'Acoustic Stage', time: '4:00 PM', artist: 'Singer Songwriter' },
    { id: 3, title: 'DJ Set', time: '10:00 PM', artist: 'DJ Mixmaster' },
  ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <Text style={[styles.greeting, { color: theme.colors.textSecondary }]}>
          Welcome to
        </Text>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Fastivalle
        </Text>
      </View>

      <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
          Today's Highlights
        </Text>
        <View style={styles.highlightContainer}>
          <Ionicons name="calendar" size={24} color={theme.colors.primary} />
          <View style={styles.highlightText}>
            <Text style={[styles.highlightTitle, { color: theme.colors.text }]}>
              Festival Day 1
            </Text>
            <Text style={[styles.highlightSubtitle, { color: theme.colors.textSecondary }]}>
              12 events scheduled
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Featured Events
        </Text>
        {featuredEvents.map((event) => (
          <TouchableOpacity
            key={event.id}
            style={[styles.eventCard, { backgroundColor: theme.colors.surface }]}
          >
            <View style={styles.eventInfo}>
              <Text style={[styles.eventTitle, { color: theme.colors.text }]}>
                {event.title}
              </Text>
              <Text style={[styles.eventArtist, { color: theme.colors.textSecondary }]}>
                {event.artist}
              </Text>
            </View>
            <View style={styles.eventTime}>
              <Text style={[styles.timeText, { color: theme.colors.primary }]}>
                {event.time}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.quickActions}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: theme.colors.primary }]}
        >
          <Ionicons name="calendar-outline" size={24} color={theme.colors.background} />
          <Text style={[styles.actionText, { color: theme.colors.background }]}>
            View Schedule
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: theme.colors.secondary }]}
        >
          <Ionicons name="people-outline" size={24} color={theme.colors.background} />
          <Text style={[styles.actionText, { color: theme.colors.background }]}>
            Connect
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  greeting: {
    fontSize: 16,
    marginBottom: 4,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  highlightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  highlightText: {
    marginLeft: 12,
    flex: 1,
  },
  highlightTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  highlightSubtitle: {
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  eventCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  eventArtist: {
    fontSize: 14,
  },
  eventTime: {
    marginLeft: 16,
  },
  timeText: {
    fontSize: 16,
    fontWeight: '600',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 8,
  },
  actionText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default HomeScreen;
