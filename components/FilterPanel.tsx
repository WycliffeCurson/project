import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Dimensions 
} from 'react-native';
import { 
  X, 
  Trash2,
  Droplets,
  Recycle,
  Zap,
  Cpu
} from 'lucide-react-native';

const { height } = Dimensions.get('window');

interface FilterPanelProps {
  selectedFilters: string[];
  onFiltersChange: (filters: string[]) => void;
  onClose: () => void;
}

const FILTER_OPTIONS = [
  { id: 'all', label: 'All Bins', icon: Trash2, color: '#6b7280' },
  { id: 'plastic', label: 'Plastic', icon: Droplets, color: '#3b82f6' },
  { id: 'organic', label: 'Organic', icon: Recycle, color: '#22c55e' },
  { id: 'metal', label: 'Metal', icon: Zap, color: '#eab308' },
  { id: 'glass', label: 'Glass', icon: Droplets, color: '#a855f7' },
  { id: 'ewaste', label: 'E-Waste', icon: Cpu, color: '#6b7280' },
];

export function FilterPanel({ selectedFilters, onFiltersChange, onClose }: FilterPanelProps) {
  const handleFilterToggle = (filterId: string) => {
    if (filterId === 'all') {
      onFiltersChange(['all']);
      return;
    }

    let newFilters = [...selectedFilters];
    
    // Remove 'all' if it's selected and we're selecting a specific filter
    if (newFilters.includes('all')) {
      newFilters = newFilters.filter(f => f !== 'all');
    }

    if (newFilters.includes(filterId)) {
      newFilters = newFilters.filter(f => f !== filterId);
      // If no specific filters are selected, default to 'all'
      if (newFilters.length === 0) {
        newFilters = ['all'];
      }
    } else {
      newFilters.push(filterId);
    }

    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    onFiltersChange(['all']);
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.panel}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Filter Bins</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose} activeOpacity={0.8}>
            <X size={20} color="#6b7280" strokeWidth={2} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Filter Options */}
          <View style={styles.filterOptions}>
            {FILTER_OPTIONS.map((option) => {
              const IconComponent = option.icon;
              const isSelected = selectedFilters.includes(option.id);
              
              return (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.filterOption,
                    isSelected && styles.filterOptionSelected,
                    isSelected && { borderColor: option.color }
                  ]}
                  onPress={() => handleFilterToggle(option.id)}
                  activeOpacity={0.8}
                >
                  <View style={[
                    styles.filterIcon,
                    { backgroundColor: isSelected ? option.color : '#f3f4f6' }
                  ]}>
                    <IconComponent 
                      size={20} 
                      color={isSelected ? '#ffffff' : '#6b7280'} 
                      strokeWidth={2} 
                    />
                  </View>
                  <Text style={[
                    styles.filterLabel,
                    isSelected && styles.filterLabelSelected
                  ]}>
                    {option.label}
                  </Text>
                  {isSelected && (
                    <View style={[styles.selectedIndicator, { backgroundColor: option.color }]} />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Quick Actions */}
          <View style={styles.quickActions}>
            <Text style={styles.quickActionsTitle}>Quick Actions</Text>
            <TouchableOpacity 
              style={styles.quickActionButton}
              onPress={clearAllFilters}
              activeOpacity={0.8}
            >
              <Text style={styles.quickActionText}>Show All Bins</Text>
            </TouchableOpacity>
          </View>

          {/* Filter Summary */}
          <View style={styles.summary}>
            <Text style={styles.summaryTitle}>Active Filters</Text>
            <Text style={styles.summaryText}>
              {selectedFilters.includes('all') 
                ? 'Showing all bin types' 
                : `Showing ${selectedFilters.length} waste type${selectedFilters.length > 1 ? 's' : ''}`
              }
            </Text>
          </View>
        </ScrollView>

        {/* Apply Button */}
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.applyButton}
            onPress={onClose}
            activeOpacity={0.8}
          >
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  panel: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: height * 0.8,
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
  title: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
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
  filterOptions: {
    paddingVertical: 20,
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#f3f4f6',
    marginBottom: 12,
    backgroundColor: '#ffffff',
  },
  filterOptionSelected: {
    backgroundColor: '#f9fafb',
    borderWidth: 2,
  },
  filterIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  filterLabel: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#374151',
  },
  filterLabelSelected: {
    color: '#1f2937',
  },
  selectedIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  quickActions: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  quickActionsTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 12,
  },
  quickActionButton: {
    backgroundColor: '#f3f4f6',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  quickActionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
    textAlign: 'center',
  },
  summary: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  summaryTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 4,
  },
  summaryText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  applyButton: {
    backgroundColor: '#22c55e',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
});