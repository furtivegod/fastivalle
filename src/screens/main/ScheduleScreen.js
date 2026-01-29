import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

const ScheduleScreen = () => {
  const theme = useTheme();
  const [selectedDay, setSelectedDay] = useState('Day 1');

  const days = ['Day 1', 'Day 2', 'Day 3'];
  
  const schedule = {
    'Day 1': [
      { id: 1, time: '10:00 AM', stage: 'Main Stage', artist: 'Opening Act', genre: 'Rock' },
      { id: 2, time: '12:00 PM', stage: 'Acoustic Stage', artist: 'Folk Singer', genre: 'Folk' },
      { id: 3, time: '2:00 PM', stage: 'Main Stage', artist: 'Rock Band', genre: 'Rock' },
      { id: 4, time: '4:00 PM', stage: 'DJ Stage', artist: 'DJ Mixmaster', genre: 'Electronic' },
      { id: 5, time: '6:00 PM', stage: 'Main Stage', artist: 'Headliner Band', genre: 'Rock' },
      { id: 6, time: '8:00 PM', stage: 'Acoustic Stage', artist: 'Singer Songwriter', genre: 'Indie' },
      { id: 7, time: '10:00 PM', stage: 'DJ Stage', artist: 'DJ Nightlife', genre: 'Electronic' },
    ],
    'Day 2': [
      { id: 8, time: '11:00 AM', stage: 'Main Stage', artist: 'Morning Show', genre: 'Pop' },
      { id: 9, time: '1:00 PM', stage: 'Acoustic Stage', artist: 'Acoustic Set', genre: 'Acoustic' },
    ],
    'Day 3': [
      { id: 10, time: '12:00 PM', stage: 'Main Stage', artist: 'Finale Show', genre: 'Rock' },
    ],
  };

  const currentSchedule = schedule[selectedDay] || [];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.daySelector}>
        {days.map((day) => (
          <TouchableOpacity
            key={day}
            style={[
              styles.dayButton,
              {
                backgroundColor:
                  selectedDay === day ? theme.colors.primary : theme.colors.surface,
              },
            ]}
            onPress={() => setSelectedDay(day)}
          >
            <Text
              style={[
                styles.dayButtonText,
                {
                  color:
                    selectedDay === day
                      ? theme.colors.background
                      : theme.colors.text,
                },
              ]}
            >
              {day}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        style={styles.scheduleList}
        contentContainerStyle={styles.scheduleContent}
      >
        {currentSchedule.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="calendar-outline" size={64} color={theme.colors.textSecondary} />
            <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
              No events scheduled for {selectedDay}
            </Text>
          </View>
        ) : (
          currentSchedule.map((event) => (
            <TouchableOpacity
              key={event.id}
              style={[styles.eventCard, { backgroundColor: theme.colors.surface }]}
            >
              <View style={styles.eventTimeContainer}>
                <Text style={[styles.eventTime, { color: theme.colors.primary }]}>
                  {event.time}
                </Text>
              </View>
              <View style={styles.eventDetails}>
                <Text style={[styles.eventArtist, { color: theme.colors.text }]}>
                  {event.artist}
                </Text>
                <View style={styles.eventMeta}>
                  <View style={styles.metaItem}>
                    <Ionicons name="location" size={14} color={theme.colors.textSecondary} />
                    <Text style={[styles.metaText, { color: theme.colors.textSecondary }]}>
                      {event.stage}
                    </Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Ionicons name="musical-notes" size={14} color={theme.colors.textSecondary} />
                    <Text style={[styles.metaText, { color: theme.colors.textSecondary }]}>
                      {event.genre}
                    </Text>
                  </View>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  daySelector: {
    flexDirection: 'row',
    padding: 16,
    gap: 8,
  },
  dayButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  dayButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  scheduleList: {
    flex: 1,
  },
  scheduleContent: {
    padding: 16,
  },
  eventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  eventTimeContainer: {
    width: 70,
    marginRight: 16,
  },
  eventTime: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventDetails: {
    flex: 1,
  },
  eventArtist: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  eventMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 16,
  },
});

export default ScheduleScreen;
