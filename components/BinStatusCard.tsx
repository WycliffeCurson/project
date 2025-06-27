import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MapPin } from 'lucide-react-native';

interface Bin {
  id: string;
  type: string;
  status: 'available' | 'full';
  distance: string;
}

interface BinStatusCardProps {
  bin: Bin;
}

export function BinStatusCard({ bin }: BinStatusCardProps) {
  const getStatusColor = (status: string) => {
    return status === 'available' ? '#22c55e' : '#ef4444';
  };

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'Plastic': '#3b82f6',
      'Organic': '#22c55e',
      'Metal': '#eab308',
      'Glass': '#a855f7',
      'E-Waste': '#6b7280',
    };
    return colors[type] || '#6b7280';
  };

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8}>
      <View style={styles.content}>
        <View style={[styles.typeIndicator, { backgroundColor: getTypeColor(bin.type) }]} />
        <View style={styles.info}>
          <Text style={styles.type}>{bin.type} Bin</Text>
          <View style={styles.locationContainer}>
            <MapPin size={12} color="#6b7280" strokeWidth={2} />
            <Text style={styles.distance}>{bin.distance} away</Text>
          </View>
        </View>
        <View style={[styles.statusDot, { backgroundColor: getStatusColor(bin.status) }]} />
      </View>
      <Text style={[styles.status, { color: getStatusColor(bin.status) }]}>
        {bin.status === 'available' ? 'Available' : 'Full'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  typeIndicator: {
    width: 4,
    height: 32,
    borderRadius: 2,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  type: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distance: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginLeft: 4,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  status: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    textAlign: 'right',
  },
});