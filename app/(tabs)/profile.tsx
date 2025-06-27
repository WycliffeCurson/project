import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { User, Award, History, Share2, Settings, CircleHelp as HelpCircle, LogOut, Trophy, Recycle, TrendingUp, Calendar } from 'lucide-react-native';
import { AchievementBadge } from '@/components/AchievementBadge';
import { HistoryItem } from '@/components/HistoryItem';

export default function ProfileScreen() {
  const [selectedTab, setSelectedTab] = useState('achievements');

  const achievements = [
    {
      id: '1',
      title: 'First Sort',
      description: 'Completed your first waste sorting',
      icon: '🎯',
      earned: true,
      date: '2025-01-01'
    },
    {
      id: '2',
      title: 'Weekly Warrior',
      description: 'Sorted waste 7 days in a row',
      icon: '🔥',
      earned: true,
      date: '2025-01-08'
    },
    {
      id: '3',
      title: 'Community Helper',
      description: 'Joined your first cleanup event',
      icon: '🤝',
      earned: true,
      date: '2025-01-10'
    },
    {
      id: '4',
      title: 'Plastic Crusher',
      description: 'Recycled 100kg of plastic waste',
      icon: '♻️',
      earned: false,
      progress: 75
    },
  ];

  const recentActivity = [
    {
      id: '1',
      type: 'sort',
      description: 'Sorted 2.5kg of plastic waste',
      points: 50,
      date: '2 hours ago',
      location: 'Westlands Mall'
    },
    {
      id: '2',
      type: 'event',
      description: 'Attended Uhuru Park Cleanup',
      points: 200,
      date: '1 day ago',
      location: 'Uhuru Park'
    },
    {
      id: '3',
      type: 'sort',
      description: 'Sorted 1.8kg of organic waste',
      points: 36,
      date: '2 days ago',
      location: 'Home'
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <LinearGradient
            colors={['#22c55e', '#16a34a']}
            style={styles.profileGradient}
          >
            <Image
              source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg' }}
              style={styles.avatar}
            />
            <Text style={styles.name}>Alex Kiprotich</Text>
            <Text style={styles.location}>Westlands, Nairobi</Text>
            
            <View style={styles.statsRow}>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>1,240</Text>
                <Text style={styles.statLabel}>Points</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>#12</Text>
                <Text style={styles.statLabel}>Rank</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>45.2</Text>
                <Text style={styles.statLabel}>Kg Sorted</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton} activeOpacity={0.8}>
            <Share2 size={20} color="#22c55e" strokeWidth={2} />
            <Text style={styles.actionText}>Share Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} activeOpacity={0.8}>
            <Settings size={20} color="#6b7280" strokeWidth={2} />
            <Text style={styles.actionText}>Settings</Text>
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === 'achievements' && styles.tabActive
            ]}
            onPress={() => setSelectedTab('achievements')}
            activeOpacity={0.8}
          >
            <Award size={18} color={selectedTab === 'achievements' ? '#22c55e' : '#6b7280'} strokeWidth={2} />
            <Text style={[
              styles.tabText,
              selectedTab === 'achievements' && styles.tabTextActive
            ]}>
              Achievements
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === 'history' && styles.tabActive
            ]}
            onPress={() => setSelectedTab('history')}
            activeOpacity={0.8}
          >
            <History size={18} color={selectedTab === 'history' ? '#22c55e' : '#6b7280'} strokeWidth={2} />
            <Text style={[
              styles.tabText,
              selectedTab === 'history' && styles.tabTextActive
            ]}>
              History
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {selectedTab === 'achievements' && (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Your Achievements</Text>
            <View style={styles.achievementsGrid}>
              {achievements.map((achievement) => (
                <AchievementBadge key={achievement.id} achievement={achievement} />
              ))}
            </View>
          </View>
        )}

        {selectedTab === 'history' && (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <View style={styles.historyContainer}>
              {recentActivity.map((activity) => (
                <HistoryItem key={activity.id} activity={activity} />
              ))}
            </View>
          </View>
        )}

        {/* Referral Section */}
        <View style={styles.referralSection}>
          <Text style={styles.referralTitle}>Invite Friends & Earn Points</Text>
          <Text style={styles.referralDescription}>
            Share your referral code and earn 100 points for each friend who joins!
          </Text>
          <View style={styles.referralCode}>
            <Text style={styles.referralCodeText}>ALEX2025</Text>
            <TouchableOpacity style={styles.copyButton} activeOpacity={0.8}>
              <Text style={styles.copyButtonText}>Copy</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Menu Options */}
        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem} activeOpacity={0.8}>
            <HelpCircle size={20} color="#6b7280" strokeWidth={2} />
            <Text style={styles.menuText}>Help & Support</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem} activeOpacity={0.8}>
            <LogOut size={20} color="#ef4444" strokeWidth={2} />
            <Text style={[styles.menuText, { color: '#ef4444' }]}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    marginHorizontal: 24,
    marginTop: 16,
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#22c55e',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 16,
  },
  profileGradient: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
    borderWidth: 4,
    borderColor: '#ffffff',
  },
  name: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  location: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#ffffff',
    opacity: 0.9,
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 32,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#ffffff',
    opacity: 0.9,
  },
  quickActions: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginBottom: 24,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  actionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#374151',
  },
  tabsContainer: {
    flexDirection: 'row',
    marginHorizontal: 24,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 6,
  },
  tabActive: {
    backgroundColor: '#f0fdf4',
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
  },
  tabTextActive: {
    color: '#22c55e',
  },
  tabContent: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 16,
  },
  achievementsGrid: {
    gap: 16,
  },
  historyContainer: {
    gap: 12,
  },
  referralSection: {
    marginHorizontal: 24,
    marginBottom: 32,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  referralTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 8,
  },
  referralDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  referralCode: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    padding: 12,
    gap: 12,
  },
  referralCodeText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
    letterSpacing: 2,
  },
  copyButton: {
    backgroundColor: '#22c55e',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  copyButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  menuSection: {
    marginHorizontal: 24,
    marginBottom: 32,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  menuText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#374151',
  },
});