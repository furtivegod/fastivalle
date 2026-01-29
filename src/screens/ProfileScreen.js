import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = () => {
  const theme = useTheme();

  const menuItems = [
    { id: 1, icon: 'person-outline', label: 'Edit Profile', action: () => {} },
    { id: 2, icon: 'settings-outline', label: 'Settings', action: () => {} },
    { id: 3, icon: 'notifications-outline', label: 'Notifications', action: () => {} },
    { id: 4, icon: 'card-outline', label: 'Payment Methods', action: () => {} },
    { id: 5, icon: 'help-circle-outline', label: 'Help & Support', action: () => {} },
    { id: 6, icon: 'information-circle-outline', label: 'About', action: () => {} },
    { id: 7, icon: 'log-out-outline', label: 'Logout', action: () => {}, isDestructive: true },
  ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <View style={[styles.avatar, { backgroundColor: theme.colors.primary }]}>
          <Text style={[styles.avatarText, { color: theme.colors.background }]}>
            JD
          </Text>
        </View>
        <Text style={[styles.name, { color: theme.colors.text }]}>
          John Doe
        </Text>
        <Text style={[styles.email, { color: theme.colors.textSecondary }]}>
          john.doe@example.com
        </Text>
        <TouchableOpacity
          style={[styles.editButton, { borderColor: theme.colors.primary }]}
        >
          <Text style={[styles.editButtonText, { color: theme.colors.primary }]}>
            Edit Profile
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: theme.colors.text }]}>12</Text>
          <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
            Events
          </Text>
        </View>
        <View style={[styles.statDivider, { backgroundColor: theme.colors.border }]} />
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: theme.colors.text }]}>45</Text>
          <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
            Connections
          </Text>
        </View>
        <View style={[styles.statDivider, { backgroundColor: theme.colors.border }]} />
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: theme.colors.text }]}>3</Text>
          <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
            Workshops
          </Text>
        </View>
      </View>

      <View style={styles.menuSection}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.menuItem, { backgroundColor: theme.colors.surface }]}
            onPress={item.action}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons
                name={item.icon}
                size={24}
                color={item.isDestructive ? theme.colors.error : theme.colors.text}
              />
              <Text
                style={[
                  styles.menuItemText,
                  {
                    color: item.isDestructive ? theme.colors.error : theme.colors.text,
                  },
                ]}
              >
                {item.label}
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={theme.colors.textSecondary}
            />
          </TouchableOpacity>
        ))}
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
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    marginBottom: 16,
  },
  editButton: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    marginBottom: 24,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
  statDivider: {
    width: 1,
    height: '100%',
  },
  menuSection: {
    gap: 12,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  menuItemText: {
    fontSize: 16,
  },
});

export default ProfileScreen;
