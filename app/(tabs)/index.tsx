import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Image
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MapPin, TriangleAlert as AlertTriangle, Recycle, Trash2, Cpu, Droplets, Zap } from 'lucide-react-native';
import { WasteCard } from '@/components/WasteCard';
import { BinStatusCard } from '@/components/BinStatusCard';
import { TipCarousel } from '@/components/TipCarousel';

export default function HomeScreen() {
  const [selectedWasteType, setSelectedWasteType] = useState<string | null>(null);

  const wasteTypes = [
    { id: 'plastic', name: 'Plastic', color: '#3b82f6', icon: Droplets },
    { id: 'organic', name: 'Organic', color: '#22c55e', icon: Recycle },
    { id: 'metal', name: 'Metal', color: '#eab308', icon: Zap },
    { id: 'glass', name: 'Glass', color: '#a855f7', icon: Droplets },
    { id: 'ewaste', name: 'E-Waste', color: '#6b7280', icon: Cpu },
  ];

  const nearbyBins: { id: string; type: string; status: "available" | "full"; distance: string }[] = [
    { id: '1', type: 'Plastic', status: 'available', distance: '50m' },
    { id: '2', type: 'Organic', status: 'full', distance: '120m' },
    { id: '3', type: 'Metal', status: 'available', distance: '200m' },
  ];

  return (
    <SafeAreaProvider style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning! 👋</Text>
            <Text style={styles.headerTitle}>Ready to make a difference?</Text>
          </View>
          <View style={styles.locationContainer}>
            <MapPin size={16} color="#6b7280" strokeWidth={2} />
            <Text style={styles.locationText}>Westlands, Nairobi</Text>
          </View>
        </View>

        {/* Find Bin CTA */}
        <TouchableOpacity style={styles.findBinButton} activeOpacity={0.8}>
          <LinearGradient
            colors={['#22c55e', '#16a34a']}
            style={styles.findBinGradient}
          >
            <MapPin size={24} color="#ffffff" strokeWidth={2} />
            <Text style={styles.findBinText}>Find Nearest Bin</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Waste Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sort Your Waste</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.wasteTypesContainer}
          >
            {wasteTypes.map((type) => (
              <WasteCard
                key={type.id}
                wasteType={type}
                isSelected={selectedWasteType === type.id}
                onPress={() => setSelectedWasteType(type.id)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Nearby Bins Status */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nearby Bins</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.binsContainer}>
            {nearbyBins.map((bin) => (
              <BinStatusCard key={bin.id} bin={bin} />
            ))}
          </View>
        </View>

        {/* Report Issue */}
        <TouchableOpacity style={styles.reportButton} activeOpacity={0.8}>
          <View style={styles.reportContent}>
            <AlertTriangle size={20} color="#ef4444" strokeWidth={2} />
            <Text style={styles.reportText}>Report Bin Issue</Text>
          </View>
        </TouchableOpacity>

        {/* Tips Carousel */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How to Sort Your Trash</Text>
          <TipCarousel />
        </View>

        {/* Community Stats */}
        <View style={styles.statsContainer}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/3850512/pexels-photo-3850512.jpeg' }}
            style={styles.statsImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['rgba(34,197,94,0.9)', 'rgba(22,163,74,0.9)']}
            style={styles.statsOverlay}
          >
            <Text style={styles.statsTitle}>Together We've Sorted</Text>
            <Text style={styles.statsNumber}>15,342 kg</Text>
            <Text style={styles.statsSubtitle}>of waste this month</Text>
          </LinearGradient>
        </View>
      </ScrollView>
    </SafeAreaProvider>
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
  greeting: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
    marginLeft: 4,
  },
  findBinButton: {
    marginHorizontal: 24,
    marginBottom: 32,
    borderRadius: 16,
    shadowColor: '#22c55e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  findBinGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderRadius: 16,
    gap: 12,
  },
  findBinText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#22c55e',
  },
  wasteTypesContainer: {
    paddingHorizontal: 24,
    gap: 16,
  },
  binsContainer: {
    paddingHorizontal: 24,
    gap: 12,
  },
  reportButton: {
    marginHorizontal: 24,
    marginBottom: 32,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#fed7d7',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  reportContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    gap: 8,
  },
  reportText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#ef4444',
  },
  statsContainer: {
    marginHorizontal: 24,
    marginBottom: 32,
    borderRadius: 16,
    overflow: 'hidden',
    height: 160,
    position: 'relative',
  },
  statsImage: {
    width: '100%',
    height: '100%',
  },
  statsOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#ffffff',
    marginBottom: 8,
  },
  statsNumber: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  statsSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#ffffff',
    opacity: 0.9,
  },
});