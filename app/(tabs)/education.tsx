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
  Search,
  Filter,
  Lightbulb,
  ExternalLink,
  Recycle,
  Droplets,
  Zap,
  Cpu,
  Trash2
} from 'lucide-react-native';
import { FactCard } from '@/components/FactCard';
import { NewsCard } from '@/components/NewsCard';

export default function EducationScreen() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All', icon: Trash2 },
    { id: 'plastic', label: 'Plastic', icon: Droplets },
    { id: 'organic', label: 'Organic', icon: Recycle },
    { id: 'metal', label: 'Metal', icon: Zap },
    { id: 'ewaste', label: 'E-Waste', icon: Cpu },
  ];

  const facts = [
    {
      id: '1',
      category: 'plastic',
      title: 'Plastic Decomposition',
      fact: 'A plastic bottle takes 450+ years to decompose in landfills',
      icon: '🍶',
      color: '#3b82f6'
    },
    {
      id: '2',
      category: 'organic',
      title: 'Food Waste Impact',
      fact: '30% of food produced globally is wasted, contributing to climate change',
      icon: '🍎',
      color: '#22c55e'
    },
    {
      id: '3',
      category: 'metal',
      title: 'Aluminum Recycling',
      fact: 'Recycling one aluminum can saves enough energy to power a TV for 3 hours',
      icon: '🥤',
      color: '#eab308'
    },
    {
      id: '4',
      category: 'ewaste',
      title: 'E-Waste Growth',
      fact: 'The world produces 50 million tons of e-waste annually',
      icon: '📱',
      color: '#6b7280'
    },
  ];

  const news = [
    {
      id: '1',
      title: 'Nairobi Introduces New Waste Sorting Guidelines',
      summary: 'The county government announces updated regulations for residential waste sorting.',
      image: 'https://images.pexels.com/photos/3850512/pexels-photo-3850512.jpeg',
      date: '2 days ago',
      readTime: '3 min read'
    },
    {
      id: '2',
      title: 'Success Story: Kibera Recycling Initiative',
      summary: 'Local community turns plastic waste into income-generating opportunity.',
      image: 'https://images.pexels.com/photos/802221/pexels-photo-802221.jpeg',
      date: '1 week ago',
      readTime: '5 min read'
    },
  ];

  const filteredFacts = selectedFilter === 'all' 
    ? facts 
    : facts.filter(fact => fact.category === selectedFilter);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Learn & Discover</Text>
          <Text style={styles.headerSubtitle}>
            Master waste sorting and help save our environment
          </Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search size={20} color="#9ca3af" strokeWidth={2} />
          <Text style={styles.searchPlaceholder}>Search topics...</Text>
        </View>

        {/* Filters */}
        <View style={styles.filtersSection}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersContainer}
          >
            {filters.map((filter) => {
              const IconComponent = filter.icon;
              return (
                <TouchableOpacity
                  key={filter.id}
                  style={[
                    styles.filterButton,
                    selectedFilter === filter.id && styles.filterButtonActive
                  ]}
                  onPress={() => setSelectedFilter(filter.id)}
                  activeOpacity={0.8}
                >
                  <IconComponent 
                    size={16} 
                    color={selectedFilter === filter.id ? '#ffffff' : '#6b7280'} 
                    strokeWidth={2} 
                  />
                  <Text style={[
                    styles.filterText,
                    selectedFilter === filter.id && styles.filterTextActive
                  ]}>
                    {filter.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Did You Know Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Lightbulb size={20} color="#22c55e" strokeWidth={2} />
            <Text style={styles.sectionTitle}>Did You Know?</Text>
          </View>
          <View style={styles.factsContainer}>
            {filteredFacts.map((fact) => (
              <FactCard key={fact.id} fact={fact} />
            ))}
          </View>
        </View>

        {/* Quick Tips */}
        <View style={styles.quickTipsContainer}>
          <Text style={styles.quickTipsTitle}>Today's Quick Tip</Text>
          <View style={styles.quickTip}>
            <Text style={styles.quickTipEmoji}>♻️</Text>
            <View style={styles.quickTipContent}>
              <Text style={styles.quickTipText}>
                Rinse containers before recycling to prevent contamination and improve processing efficiency.
              </Text>
            </View>
          </View>
        </View>

        {/* News & Articles */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Latest News</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>See all</Text>
              <ExternalLink size={16} color="#22c55e" strokeWidth={2} />
            </TouchableOpacity>
          </View>
          <View style={styles.newsContainer}>
            {news.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </View>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginHorizontal: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  searchPlaceholder: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
    marginLeft: 12,
  },
  filtersSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  filtersContainer: {
    paddingHorizontal: 24,
    gap: 12,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    gap: 6,
  },
  filterButtonActive: {
    backgroundColor: '#22c55e',
    borderColor: '#22c55e',
  },
  filterText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
  },
  filterTextActive: {
    color: '#ffffff',
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
    gap: 8,
  },
  factsContainer: {
    paddingHorizontal: 24,
    gap: 16,
  },
  quickTipsContainer: {
    marginHorizontal: 24,
    marginBottom: 32,
    backgroundColor: '#f0fdf4',
    borderRadius: 16,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#22c55e',
  },
  quickTipsTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#15803d',
    marginBottom: 12,
  },
  quickTip: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  quickTipEmoji: {
    fontSize: 24,
  },
  quickTipContent: {
    flex: 1,
  },
  quickTipText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#166534',
    lineHeight: 24,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginLeft: 'auto',
  },
  seeAllText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#22c55e',
  },
  newsContainer: {
    paddingHorizontal: 24,
    gap: 16,
  },
});