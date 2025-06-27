import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface Fact {
  id: string;
  category: string;
  title: string;
  fact: string;
  icon: string;
  color: string;
}

interface FactCardProps {
  fact: Fact;
}

export function FactCard({ fact }: FactCardProps) {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8}>
      <View style={styles.content}>
        <View style={[styles.iconContainer, { backgroundColor: fact.color }]}>
          <Text style={styles.icon}>{fact.icon}</Text>
        </View>
        <View style={styles.textContent}>
          <Text style={styles.title}>{fact.title}</Text>
          <Text style={styles.factText}>{fact.fact}</Text>
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
    padding: 16,
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  icon: {
    fontSize: 20,
  },
  textContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 6,
  },
  factText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    lineHeight: 20,
  },
});