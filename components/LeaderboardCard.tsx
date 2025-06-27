import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { TrendingUp, TrendingDown, Crown } from 'lucide-react-native';

interface User {
  id: string;
  rank: number;
  name: string;
  points: number;
  avatar: string;
  badge: string;
  change: string;
}

interface LeaderboardCardProps {
  user: User;
}

export function LeaderboardCard({ user }: LeaderboardCardProps) {
  const isPositiveChange = user.change.startsWith('+');
  const isNegativeChange = user.change.startsWith('-');

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return { backgroundColor: '#fbbf24', color: '#ffffff' };
      case 2:
        return { backgroundColor: '#9ca3af', color: '#ffffff' };
      case 3:
        return { backgroundColor: '#d97706', color: '#ffffff' };
      default:
        return { backgroundColor: '#f3f4f6', color: '#6b7280' };
    }
  };

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8}>
      <View style={styles.content}>
        <View style={[styles.rankContainer, getRankStyle(user.rank)]}>
          {user.rank === 1 && <Crown size={16} color="#ffffff" strokeWidth={2} />}
          {user.rank !== 1 && <Text style={styles.rankText}>{user.rank}</Text>}
        </View>
        
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        
        <View style={styles.userInfo}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.badge}>{user.badge}</Text>
        </View>
        
        <View style={styles.rightSection}>
          <Text style={styles.points}>{user.points.toLocaleString()}</Text>
          <View style={styles.changeContainer}>
            {isPositiveChange && (
              <TrendingUp size={12} color="#22c55e" strokeWidth={2} />
            )}
            {isNegativeChange && (
              <TrendingDown size={12} color="#ef4444" strokeWidth={2} />
            )}
            <Text style={[
              styles.changeText,
              isPositiveChange && { color: '#22c55e' },
              isNegativeChange && { color: '#ef4444' }
            ]}>
              {user.change}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  rankContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rankText: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 2,
  },
  badge: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  points: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
    marginBottom: 2,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  changeText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
  },
});