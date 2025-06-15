import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { User, Settings, Bell, Shield, CircleHelp as HelpCircle, Star, FileText, ChevronRight, Heart, Activity, Sparkles } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const menuItems = [
  {
    id: 1,
    title: 'Health Profile',
    description: 'Manage your health information',
    icon: User,
    color: '#2FE4C0',
  },
  {
    id: 2,
    title: 'Notifications',
    description: 'Medication reminders and alerts',
    icon: Bell,
    color: '#FFC371',
  },
  {
    id: 3,
    title: 'Privacy & Security',
    description: 'Data protection and privacy settings',
    icon: Shield,
    color: '#A78BFA',
  },
  {
    id: 4,
    title: 'Saved Items',
    description: 'Your bookmarked vitamins and drugs',
    icon: Heart,
    color: '#FF5F6D',
  },
  {
    id: 5,
    title: 'Scan History',
    description: 'View your scanning history',
    icon: Activity,
    color: '#2FE4C0',
  },
  {
    id: 6,
    title: 'Help & Support',
    description: 'Get help and contact support',
    icon: HelpCircle,
    color: '#6B7280',
  },
  {
    id: 7,
    title: 'Rate App',
    description: 'Rate and review the app',
    icon: Star,
    color: '#FFC371',
  },
  {
    id: 8,
    title: 'Terms & Privacy',
    description: 'Legal information and policies',
    icon: FileText,
    color: '#6B7280',
  },
  {
    id: 9,
    title: 'Settings',
    description: 'App preferences and configuration',
    icon: Settings,
    color: '#4B5563',
  },
];

const stats = [
  {
    label: 'Scans This Month',
    value: '24',
    color: '#2FE4C0',
  },
  {
    label: 'Vitamins Tracked',
    value: '8',
    color: '#A78BFA',
  },
  {
    label: 'Interactions Checked',
    value: '12',
    color: '#FFC371',
  },
];

export default function ProfileScreen() {
  const handleMenuPress = (itemId: number) => {
    console.log('Menu item pressed:', itemId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={['#A78BFA', '#FF5F6D']}
          style={styles.header}
        >
          <View style={styles.avatarContainer}>
            <LinearGradient
              colors={['#FFFFFF', '#F8FAFC']}
              style={styles.avatar}
            >
              <User size={32} color="#2FE4C0" />
            </LinearGradient>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>Health User</Text>
              <Text style={styles.userEmail}>user@example.com</Text>
              <Text style={styles.brandText}>Powered by sidekick</Text>
            </View>
          </View>
          <Sparkles size={24} color="#FFFFFF" style={styles.sparkleIcon} />
        </LinearGradient>

        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Your Activity</Text>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <LinearGradient
                key={index}
                colors={['#FFFFFF', '#F8FAFC']}
                style={styles.statCard}
              >
                <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </LinearGradient>
            ))}
          </View>
        </View>

        <View style={styles.menuContainer}>
          <Text style={styles.sectionTitle}>Account & Settings</Text>
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => handleMenuPress(item.id)}
              >
                <LinearGradient
                  colors={['#FFFFFF', '#F8FAFC']}
                  style={styles.menuItem}
                >
                  <LinearGradient
                    colors={[item.color, item.color]}
                    style={styles.menuIcon}
                  >
                    <IconComponent size={20} color="#FFFFFF" />
                  </LinearGradient>
                  <View style={styles.menuContent}>
                    <Text style={styles.menuTitle}>{item.title}</Text>
                    <Text style={styles.menuDescription}>{item.description}</Text>
                  </View>
                  <ChevronRight size={20} color="#2FE4C0" />
                </LinearGradient>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Version 1.0.0</Text>
          <Text style={styles.footerText}>© 2025 Sidekick Health App</Text>
          <Text style={styles.footerBrand}>Made with ❤️ by the sidekick team</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 2,
  },
  brandText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '600',
  },
  sparkleIcon: {
    opacity: 0.8,
  },
  statsContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#2FE4C0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    fontWeight: '600',
  },
  menuContainer: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  menuItem: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 2,
  },
  menuDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  footerBrand: {
    fontSize: 14,
    color: '#2FE4C0',
    fontWeight: '600',
    marginTop: 8,
  },
});