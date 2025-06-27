import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Recycle, Calendar, MapPin, Plus } from 'lucide-react-native';

interface Activity {
  id: string;
  type: 'sort' | 'event';
  description: string;
  points: number;
  date: string;
  location: string;
}

interface HistoryItemProps {
  activity: Activity;
}

export function HistoryItem({ activity }: HistoryItemProps) {
  const getIcon = () => {
    switch (activity.type) {
      case 'sort':
        return <Recycle size={20} color="#22c55e" strokeWidth={2} />;
      case 'event':
        return <Calendar size={20} color="#3b82f6" strokeWidth={2} />;
      default:
        return <Recycle size={20} color="#6b7280" strokeWidth={2} />;
    }
  };

  const getBackgroundColor = () => {
    switch (activity.type) {
      case 'sort':
        return '#f0fdf4';
      case 'event':
        return '#eff6ff';
      default:
        return '#f3f4f6';
    }
  };

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8}>
      <View style={[styles.iconContainer, { backgroundColor: getBackgroundColor() }]}>
        {getIcon()}
      </View>
      
      <View style={styles.content}>
        <Text style={styles.description}>{activity.description}</Text>
        <View style={styles.metadata}>
          <View style={styles.locationContainer}>
            <MapPin size={12} color="#6b7280" strokeWidth={2} />
            <Text style={styles.location}>{activity.location}</Text>
          </View>
          <Text style={styles.date}>{activity.date}</Text>
        </View>
      </View>
      
      <View style={styles.pointsContainer}>
        <Plus size={14} color="#22c55e" strokeWidth={2} />
        <Text style={styles.points}>{activity.points}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1f2937',
    marginBottom: 6,
  },
  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  location: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  date: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0fdf4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 2,
  },
  points: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#22c55e',
  },
});