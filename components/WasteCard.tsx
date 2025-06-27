import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Video as LucideIcon } from 'lucide-react-native';

interface WasteType {
  id: string;
  name: string;
  color: string;
  icon: LucideIcon;
}

interface WasteCardProps {
  wasteType: WasteType;
  isSelected: boolean;
  onPress: () => void;
}

export function WasteCard({ wasteType, isSelected, onPress }: WasteCardProps) {
  const IconComponent = wasteType.icon;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { borderColor: isSelected ? wasteType.color : '#e5e7eb' },
        isSelected && { backgroundColor: `${wasteType.color}10` }
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={[styles.iconContainer, { backgroundColor: wasteType.color }]}>
        <IconComponent size={24} color="#ffffff" strokeWidth={2} />
      </View>
      <Text style={styles.name}>{wasteType.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 12,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  name: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#374151',
    textAlign: 'center',
  },
});