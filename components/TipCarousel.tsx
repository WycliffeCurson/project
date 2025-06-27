import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Recycle, Droplets, Zap, Cpu } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 48;

const tips = [
  {
    id: '1',
    icon: Droplets,
    color: '#3b82f6',
    title: 'Plastic Bottles',
    description: 'Remove caps and labels. Rinse with water before disposal.',
    tip: 'Empty bottles take up less space!'
  },
  {
    id: '2',
    icon: Recycle,
    color: '#22c55e',
    title: 'Food Waste',
    description: 'Separate food scraps from packaging. No liquids in organic bins.',
    tip: 'Compost at home for better results!'
  },
  {
    id: '3',
    icon: Zap,
    color: '#eab308',
    title: 'Metal Cans',
    description: 'Clean cans thoroughly. Aluminum and steel go together.',
    tip: 'Crushed cans save space!'
  },
  {
    id: '4',
    icon: Cpu,
    color: '#6b7280',
    title: 'Electronics',
    description: 'Remove batteries first. Find certified e-waste centers.',
    tip: 'Data wipe devices for security!'
  },
];

export function TipCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / CARD_WIDTH);
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
      >
        {tips.map((tip) => {
          const IconComponent = tip.icon;
          return (
            <View key={tip.id} style={[styles.card, { width: CARD_WIDTH }]}>
              <View style={[styles.iconContainer, { backgroundColor: tip.color }]}>
                <IconComponent size={24} color="#ffffff" strokeWidth={2} />
              </View>
              <Text style={styles.title}>{tip.title}</Text>
              <Text style={styles.description}>{tip.description}</Text>
              <View style={styles.tipContainer}>
                <Text style={styles.tipLabel}>💡 Pro Tip:</Text>
                <Text style={styles.tipText}>{tip.tip}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
      
      <View style={styles.pagination}>
        {tips.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: index === currentIndex ? '#22c55e' : '#d1d5db' }
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  scrollContent: {
    paddingHorizontal: 24,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    marginRight: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    lineHeight: 24,
    marginBottom: 16,
  },
  tipContainer: {
    backgroundColor: '#f0fdf4',
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#22c55e',
  },
  tipLabel: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#15803d',
    marginBottom: 4,
  },
  tipText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#166534',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});