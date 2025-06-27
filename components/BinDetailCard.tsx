import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Dimensions 
} from 'react-native';
import { X, Navigation, TriangleAlert as AlertTriangle, Clock, MapPin, Droplets, Recycle, Zap, Cpu } from 'lucide-react-native';

const { height } = Dimensions.get('window');

interface SmartBin {
  id: string;
  latitude: number;
  longitude: number;
  wasteTypes: string[];
  status: 'available' | 'full' | 'maintenance';
  fillLevel: number;
  lastEmptied: string;
  address: string;
  distance?: number;
}

interface BinDetailCardProps {
  bin: SmartBin;
  onClose: () => void;
  onNavigate: () => void;
  onReport: () => void;
}

const WASTE_TYPE_COLORS = {
  plastic: '#3b82f6',
  organic: '#22c55e',
  metal: '#eab308',
  glass: '#a855f7',
  ewaste: '#6b7280',
};

const WASTE_TYPE_ICONS = {
  plastic: Droplets,
  organic: Recycle,
  metal: Zap,
  glass: Droplets,
  ewaste: Cpu,
};

const WASTE_TYPE_NAMES = {
  plastic: 'Plastic',
  organic: 'Organic',
  metal: 'Metal',
  glass: 'Glass',
  ewaste: 'E-Waste',
};

export function BinDetailCard({ bin, onClose, onNavigate, onReport }: BinDetailCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return '#22c55e';
      case 'full': return '#ef4444';
      case 'maintenance': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Available';
      case 'full': return 'Full';
      case 'maintenance': return 'Maintenance';
      default: return 'Unknown';
    }
  };

  const getFillLevelColor = (level: number) => {
    if (level >= 80) return '#ef4444';
    if (level >= 60) return '#f59e0b';
    return '#22c55e';
  };

  const formatLastEmptied = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} days ago`;
    }
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.binId}>Bin {bin.id.split('-')[1].toUpperCase()}</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(bin.status) }]}>
              <Text style={styles.statusText}>{getStatusText(bin.status)}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose} activeOpacity={0.8}>
            <X size={20} color="#6b7280" strokeWidth={2} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Location */}
          <View style={styles.section}>
            <View style={styles.locationHeader}>
              <MapPin size={16} color="#6b7280" strokeWidth={2} />
              <Text style={styles.address}>{bin.address}</Text>
            </View>
            {bin.distance && (
              <Text style={styles.distance}>{bin.distance.toFixed(1)} km away</Text>
            )}
          </View>

          {/* Waste Types */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Accepted Waste Types</Text>
            <View style={styles.wasteTypes}>
              {bin.wasteTypes.map((type) => {
                const IconComponent = WASTE_TYPE_ICONS[type as keyof typeof WASTE_TYPE_ICONS];
                const color = WASTE_TYPE_COLORS[type as keyof typeof WASTE_TYPE_COLORS];
                const name = WASTE_TYPE_NAMES[type as keyof typeof WASTE_TYPE_NAMES];
                
                return (
                  <View key={type} style={styles.wasteType}>
                    <View style={[styles.wasteTypeIcon, { backgroundColor: color }]}>
                      <IconComponent size={16} color="#ffffff" strokeWidth={2} />
                    </View>
                    <Text style={styles.wasteTypeName}>{name}</Text>
                  </View>
                );
              })}
            </View>
          </View>

          {/* Fill Level */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Fill Level</Text>
            <View style={styles.fillLevelContainer}>
              <View style={styles.fillLevelBar}>
                <View 
                  style={[
                    styles.fillLevelProgress, 
                    { 
                      width: `${bin.fillLevel}%`,
                      backgroundColor: getFillLevelColor(bin.fillLevel)
                    }
                  ]} 
                />
              </View>
              <Text style={[styles.fillLevelText, { color: getFillLevelColor(bin.fillLevel) }]}>
                {bin.fillLevel}%
              </Text>
            </View>
          </View>

          {/* Last Emptied */}
          <View style={styles.section}>
            <View style={styles.lastEmptiedHeader}>
              <Clock size={16} color="#6b7280" strokeWidth={2} />
              <Text style={styles.sectionTitle}>Last Emptied</Text>
            </View>
            <Text style={styles.lastEmptiedText}>{formatLastEmptied(bin.lastEmptied)}</Text>
          </View>
        </ScrollView>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity 
            style={styles.reportButton} 
            onPress={onReport}
            activeOpacity={0.8}
          >
            <AlertTriangle size={18} color="#ef4444" strokeWidth={2} />
            <Text style={styles.reportButtonText}>Report Issue</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.navigateButton} 
            onPress={onNavigate}
            activeOpacity={0.8}
          >
            <Navigation size={18} color="#ffffff" strokeWidth={2} />
            <Text style={styles.navigateButtonText}>Navigate</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingTop: height * 0.3,
  },
  card: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
    maxHeight: height * 0.7,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  binId: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#ffffff',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  section: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  address: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1f2937',
    flex: 1,
  },
  distance: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 12,
  },
  wasteTypes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  wasteType: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  wasteTypeIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wasteTypeName: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#374151',
  },
  fillLevelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  fillLevelBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
  },
  fillLevelProgress: {
    height: '100%',
    borderRadius: 4,
  },
  fillLevelText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    minWidth: 40,
    textAlign: 'right',
  },
  lastEmptiedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  lastEmptiedText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  actions: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 20,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  reportButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fef2f2',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fecaca',
    gap: 6,
  },
  reportButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#ef4444',
  },
  navigateButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#22c55e',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 6,
  },
  navigateButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
});