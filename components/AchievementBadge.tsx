import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Lock } from 'lucide-react-native';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  date?: string;
  progress?: number;
}

interface AchievementBadgeProps {
  achievement: Achievement;
}

export function AchievementBadge({ achievement }: AchievementBadgeProps) {
  return (
    <TouchableOpacity 
      style={[
        styles.container,
        !achievement.earned && styles.containerLocked
      ]} 
      activeOpacity={0.8}
    >
      <View style={[
        styles.iconContainer,
        !achievement.earned && styles.iconContainerLocked
      ]}>
        {achievement.earned ? (
          <Text style={styles.icon}>{achievement.icon}</Text>
        ) : (
          <Lock size={20} color="#9ca3af" strokeWidth={2} />
        )}
      </View>
      
      <View style={styles.content}>
        <Text style={[
          styles.title,
          !achievement.earned && styles.textLocked
        ]}>
          {achievement.title}
        </Text>
        <Text style={[
          styles.description,
          !achievement.earned && styles.textLocked
        ]}>
          {achievement.description}
        </Text>
        
        {achievement.earned && achievement.date && (
          <Text style={styles.date}>Earned {achievement.date}</Text>
        )}
        
        {!achievement.earned && achievement.progress !== undefined && (
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>{achievement.progress}% complete</Text>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${achievement.progress}%` }
                ]} 
              />
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  containerLocked: {
    opacity: 0.6,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f0fdf4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  iconContainerLocked: {
    backgroundColor: '#f3f4f6',
  },
  icon: {
    fontSize: 20,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 8,
  },
  textLocked: {
    color: '#9ca3af',
  },
  date: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#22c55e',
  },
  progressContainer: {
    marginTop: 4,
  },
  progressText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
    marginBottom: 4,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e5e7eb',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#22c55e',
    borderRadius: 2,
  },
});