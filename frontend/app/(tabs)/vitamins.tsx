import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Image,
} from 'react-native';
import { Search, ChevronRight, Star, Zap, Shield, Heart, Sparkles } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const vitamins = [
  {
    id: 1,
    name: 'Vitamin D3',
    dosage: '2000 IU',
    benefits: ['Bone Health', 'Immune Support'],
    rating: 4.8,
    image: 'https://images.pexels.com/photos/3683087/pexels-photo-3683087.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
  },
  {
    id: 2,
    name: 'Vitamin C',
    dosage: '1000mg',
    benefits: ['Antioxidant', 'Immune Boost'],
    rating: 4.7,
    image: 'https://images.pexels.com/photos/5910800/pexels-photo-5910800.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
  },
  {
    id: 3,
    name: 'Omega-3',
    dosage: '1200mg',
    benefits: ['Heart Health', 'Brain Function'],
    rating: 4.9,
    image: 'https://images.pexels.com/photos/5910965/pexels-photo-5910965.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
  },
  {
    id: 4,
    name: 'Multivitamin',
    dosage: 'Daily',
    benefits: ['Overall Health', 'Energy Support'],
    rating: 4.6,
    image: 'https://images.pexels.com/photos/3683081/pexels-photo-3683081.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
  },
  {
    id: 5,
    name: 'B-Complex',
    dosage: '100mg',
    benefits: ['Energy', 'Nervous System'],
    rating: 4.5,
    image: 'https://images.pexels.com/photos/5910807/pexels-photo-5910807.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
  },
  {
    id: 6,
    name: 'Magnesium',
    dosage: '400mg',
    benefits: ['Muscle Function', 'Sleep Support'],
    rating: 4.7,
    image: 'https://images.pexels.com/photos/3683084/pexels-photo-3683084.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
  },
];

const categories = [
  { id: 1, name: 'Popular', icon: Star, color: '#FF5F6D' },
  { id: 2, name: 'Energy', icon: Zap, color: '#FFC371' },
  { id: 3, name: 'Immunity', icon: Shield, color: '#2FE4C0' },
  { id: 4, name: 'Heart', icon: Heart, color: '#FF5F6D' },
];

export default function VitaminsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(1);

  const filteredVitamins = vitamins.filter(vitamin =>
    vitamin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vitamin.benefits.some(benefit => 
      benefit.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const getBenefitIcon = (benefit: string) => {
    switch (benefit.toLowerCase()) {
      case 'immune support':
      case 'immune boost':
        return <Shield size={16} color="#2FE4C0" />;
      case 'heart health':
        return <Heart size={16} color="#FF5F6D" />;
      case 'energy':
      case 'energy support':
        return <Zap size={16} color="#FFC371" />;
      default:
        return <Star size={16} color="#6B7280" />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#2FE4C0', '#26D0CE']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.title}>Vitamins & Supplements</Text>
          <Text style={styles.subtitle}>Discover the right supplements with sidekick</Text>
        </View>
        <Sparkles size={24} color="#FFFFFF" style={styles.sparkleIcon} />
      </LinearGradient>

      <View style={styles.searchContainer}>
        <LinearGradient
          colors={['#FFFFFF', '#F8FAFC']}
          style={styles.searchBar}
        >
          <Search size={20} color="#2FE4C0" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search vitamins or benefits..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
        </LinearGradient>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.categoriesContainer}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.categories}>
              {categories.map((category) => {
                const IconComponent = category.icon;
                const isSelected = selectedCategory === category.id;
                return (
                  <TouchableOpacity
                    key={category.id}
                    onPress={() => setSelectedCategory(category.id)}
                  >
                    <LinearGradient
                      colors={isSelected ? [category.color, category.color] : ['#FFFFFF', '#F8FAFC']}
                      style={styles.categoryCard}
                    >
                      <IconComponent 
                        size={24} 
                        color={isSelected ? '#FFFFFF' : category.color} 
                      />
                      <Text style={[
                        styles.categoryText,
                        { color: isSelected ? '#FFFFFF' : '#1F2937' }
                      ]}>
                        {category.name}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>

        <View style={styles.vitaminsContainer}>
          <Text style={styles.sectionTitle}>
            {searchQuery ? `Results for "${searchQuery}"` : 'All Vitamins'}
          </Text>
          
          {filteredVitamins.map((vitamin) => (
            <TouchableOpacity key={vitamin.id}>
              <LinearGradient
                colors={['#FFFFFF', '#F8FAFC']}
                style={styles.vitaminCard}
              >
                <Image source={{ uri: vitamin.image }} style={styles.vitaminImage} />
                
                <View style={styles.vitaminInfo}>
                  <View style={styles.vitaminHeader}>
                    <Text style={styles.vitaminName}>{vitamin.name}</Text>
                    <View style={styles.ratingContainer}>
                      <Star size={16} color="#FFC371" fill="#FFC371" />
                      <Text style={styles.rating}>{vitamin.rating}</Text>
                    </View>
                  </View>
                  
                  <Text style={styles.dosage}>{vitamin.dosage}</Text>
                  
                  <View style={styles.benefits}>
                    {vitamin.benefits.map((benefit, index) => (
                      <View key={index} style={styles.benefitTag}>
                        {getBenefitIcon(benefit)}
                        <Text style={styles.benefitText}>{benefit}</Text>
                      </View>
                    ))}
                  </View>
                </View>
                
                <ChevronRight size={24} color="#2FE4C0" />
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
  },
  sparkleIcon: {
    opacity: 0.8,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginTop: -12,
    marginBottom: 24,
    zIndex: 1,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#2FE4C0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#1F2937',
  },
  categoriesContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  categories: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
  },
  categoryCard: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
  },
  vitaminsContainer: {
    paddingHorizontal: 20,
  },
  vitaminCard: {
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#2FE4C0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  vitaminImage: {
    width: 60,
    height: 60,
    borderRadius: 16,
    marginRight: 16,
  },
  vitaminInfo: {
    flex: 1,
  },
  vitaminHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  vitaminName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  dosage: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
    fontWeight: '500',
  },
  benefits: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  benefitTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F9FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
    borderWidth: 1,
    borderColor: 'rgba(47,228,192,0.2)',
  },
  benefitText: {
    fontSize: 12,
    color: '#1F2937',
    fontWeight: '600',
  },
});