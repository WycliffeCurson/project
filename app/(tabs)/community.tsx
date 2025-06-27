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
import { 
  Trophy,
  Users,
  Calendar,
  MapPin,
  Award,
  Star,
  TrendingUp
} from 'lucide-react-native';
import { LeaderboardCard } from '@/components/LeaderboardCard';
import { EventCard } from '@/components/EventCard';

export default function CommunityScreen() {
  const [selectedTab, setSelectedTab] = useState('leaderboard');

  const tabs = [
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'events', label: 'Events', icon: Calendar },
  ];

  const leaderboardData = [
    {
      id: '1',
      rank: 1,
      name: 'Sarah Wanjiku',
      points: 2450,
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      badge: 'Clean Hero',
      change: '+12'
    },
    {
      id: '2',
      rank: 2,
      name: 'James Mwangi',
      points: 2380,
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      badge: 'Eco Warrior',
      change: '+5'
    },
    {
      id: '3',
      rank: 3,
      name: 'Grace Achieng',
      points: 2340,
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
      badge: 'Green Champion',
      change: '-1'
    },
    {
      id: '4',
      rank: 4,
      name: 'David Otieno',
      points: 2200,
      avatar: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg',
      badge: 'Sorter Pro',
      change: '+3'
    },
  ];

  const events = [
    {
      id: '1',
      title: 'Uhuru Park Cleanup Drive',
      date: 'Saturday, Jan 15',
      time: '8:00 AM - 12:00 PM',
      location: 'Uhuru Park, Nairobi',
      participants: 156,
      maxParticipants: 200,
      image: 'https://images.pexels.com/photos/3850512/pexels-photo-3850512.jpeg',
      description: 'Join us for a community cleanup of Uhuru Park. Bring your family and friends!'
    },
    {
      id: '2',
      title: 'Waste Sorting Workshop',
      date: 'Sunday, Jan 23',
      time: '2:00 PM - 5:00 PM',
      location: 'Westlands Community Hall',
      participants: 45,
      maxParticipants: 80,
      image: 'https://images.pexels.com/photos/802221/pexels-photo-802221.jpeg',
      description: 'Learn advanced waste sorting techniques and recycling methods.'
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Community Hub</Text>
          <Text style={styles.headerSubtitle}>
            Connect with fellow eco-warriors and make a difference together
          </Text>
        </View>

        {/* Clean Hero of the Week */}
        <View style={styles.heroSection}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg' }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroOverlay}>
            <Award size={24} color="#fbbf24" strokeWidth={2} />
            <Text style={styles.heroTitle}>Clean Hero of the Week</Text>
            <Text style={styles.heroName}>Sarah Wanjiku</Text>
            <Text style={styles.heroDescription}>
              Organized 3 community cleanups and helped 50+ neighbors with proper sorting
            </Text>
          </View>
        </View>

        {/* Your Stats */}
        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>Your Impact This Month</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: '#22c55e' }]}>
                <Trophy size={20} color="#ffffff" strokeWidth={2} />
              </View>
              <Text style={styles.statNumber}>1,240</Text>
              <Text style={styles.statLabel}>Points Earned</Text>
            </View>
            <View style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: '#3b82f6' }]}>
                <TrendingUp size={20} color="#ffffff" strokeWidth={2} />
              </View>
              <Text style={styles.statNumber}>#12</Text>
              <Text style={styles.statLabel}>Your Rank</Text>
            </View>
            <View style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: '#eab308' }]}>
                <Users size={20} color="#ffffff" strokeWidth={2} />
              </View>
              <Text style={styles.statNumber}>45</Text>
              <Text style={styles.statLabel}>Kg Sorted</Text>
            </View>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <TouchableOpacity
                key={tab.id}
                style={[
                  styles.tab,
                  selectedTab === tab.id && styles.tabActive
                ]}
                onPress={() => setSelectedTab(tab.id)}
                activeOpacity={0.8}
              >
                <IconComponent 
                  size={18} 
                  color={selectedTab === tab.id ? '#22c55e' : '#6b7280'} 
                  strokeWidth={2} 
                />
                <Text style={[
                  styles.tabText,
                  selectedTab === tab.id && styles.tabTextActive
                ]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Tab Content */}
        {selectedTab === 'leaderboard' && (
          <View style={styles.tabContent}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Westlands Ward Rankings</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>Change ward</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.leaderboardContainer}>
              {leaderboardData.map((user) => (
                <LeaderboardCard key={user.id} user={user} />
              ))}
            </View>
          </View>
        )}

        {selectedTab === 'events' && (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Upcoming Events</Text>
            <View style={styles.eventsContainer}>
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </View>
          </View>
        )}
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
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    lineHeight: 24,
  },
  heroSection: {
    marginHorizontal: 24,
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
    height: 200,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  heroTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#ffffff',
    marginTop: 8,
    marginBottom: 4,
  },
  heroName: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  heroDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#ffffff',
    textAlign: 'center',
    opacity: 0.9,
  },
  statsContainer: {
    marginHorizontal: 24,
    marginBottom: 32,
  },
  statsTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statNumber: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
    textAlign: 'center',
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
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  seeAllText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#22c55e',
  },
  leaderboardContainer: {
    gap: 12,
  },
  eventsContainer: {
    gap: 16,
  },
});