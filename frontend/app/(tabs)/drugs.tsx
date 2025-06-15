import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { Search, Heart, Brain, Activity, TriangleAlert as AlertTriangle, ChevronRight, Sparkles } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const drugCategories = [
  {
    id: 1,
    title: 'Sexual & Reproductive Health',
    icon: Heart,
    color: '#FF5F6D',
    description: 'Contraceptives, fertility, sexual health medications',
    count: 24,
  },
  {
    id: 2,
    title: 'Physical Wellness & Student Issues',
    icon: Activity,
    color: '#2FE4C0',
    description: 'Pain relief, sleep aids, common student health concerns',
    count: 18,
  },
  {
    id: 3,
    title: 'Mental Health & Cognitive',
    icon: Brain,
    color: '#A78BFA',
    description: 'Anxiety, depression, focus and concentration aids',
    count: 16,
  },
];

const recentSearches = [
  'Ibuprofen',
  'Birth control pills',
  'Melatonin',
  'Adderall',
  'Antidepressants',
];

const drugInteractions = [
  {
    drug1: 'Warfarin',
    drug2: 'Aspirin',
    severity: 'High',
    description: 'Increased bleeding risk',
  },
  {
    drug1: 'Ibuprofen',
    drug2: 'Lisinopril',
    severity: 'Medium',
    description: 'Reduced blood pressure control',
  },
];

export default function DrugsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'categories' | 'search' | 'interactions'>('categories');

  const handleCategoryPress = (categoryId: number) => {
    console.log('Navigate to category:', categoryId);
  };

  const handleSearchDrug = () => {
    if (searchQuery.trim()) {
      console.log('Search for drug:', searchQuery);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return '#FF5F6D';
      case 'medium':
        return '#FFC371';
      case 'low':
        return '#2FE4C0';
      default:
        return '#6B7280';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#FF5F6D', '#FFC371']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.title}>Drug Information</Text>
          <Text style={styles.subtitle}>Find safe medication information with sidekick</Text>
        </View>
        <Sparkles size={24} color="#FFFFFF" style={styles.sparkleIcon} />
      </LinearGradient>

      <View style={styles.tabContainer}>
        <LinearGradient
          colors={['#FFFFFF', '#F8FAFC']}
          style={styles.tabBackground}
        >
          <TouchableOpacity
            style={[styles.tab, activeTab === 'categories' && styles.activeTab]}
            onPress={() => setActiveTab('categories')}
          >
            {activeTab === 'categories' && (
              <LinearGradient
                colors={['#2FE4C0', '#26D0CE']}
                style={styles.activeTabGradient}
              />
            )}
            <Text style={[styles.tabText, activeTab === 'categories' && styles.activeTabText]}>
              Categories
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'search' && styles.activeTab]}
            onPress={() => setActiveTab('search')}
          >
            {activeTab === 'search' && (
              <LinearGradient
                colors={['#2FE4C0', '#26D0CE']}
                style={styles.activeTabGradient}
              />
            )}
            <Text style={[styles.tabText, activeTab === 'search' && styles.activeTabText]}>
              Search
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'interactions' && styles.activeTab]}
            onPress={() => setActiveTab('interactions')}
          >
            {activeTab === 'interactions' && (
              <LinearGradient
                colors={['#2FE4C0', '#26D0CE']}
                style={styles.activeTabGradient}
              />
            )}
            <Text style={[styles.tabText, activeTab === 'interactions' && styles.activeTabText]}>
              Interactions
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {activeTab === 'categories' && (
          <View style={styles.content}>
            <Text style={styles.sectionTitle}>Health Categories</Text>
            {drugCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <TouchableOpacity
                  key={category.id}
                  onPress={() => handleCategoryPress(category.id)}
                >
                  <LinearGradient
                    colors={['#FFFFFF', '#F8FAFC']}
                    style={styles.categoryCard}
                  >
                    <LinearGradient
                      colors={[category.color, category.color]}
                      style={styles.categoryIcon}
                    >
                      <IconComponent size={24} color="#FFFFFF" />
                    </LinearGradient>
                    <View style={styles.categoryInfo}>
                      <Text style={styles.categoryTitle}>{category.title}</Text>
                      <Text style={styles.categoryDescription}>{category.description}</Text>
                      <Text style={styles.categoryCount}>{category.count} medications</Text>
                    </View>
                    <ChevronRight size={24} color="#2FE4C0" />
                  </LinearGradient>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {activeTab === 'search' && (
          <View style={styles.content}>
            <View style={styles.searchContainer}>
              <LinearGradient
                colors={['#FFFFFF', '#F8FAFC']}
                style={styles.searchBar}
              >
                <Search size={20} color="#2FE4C0" />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Enter drug name..."
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholderTextColor="#9CA3AF"
                  onSubmitEditing={handleSearchDrug}
                />
              </LinearGradient>
              <TouchableOpacity onPress={handleSearchDrug}>
                <LinearGradient
                  colors={['#2FE4C0', '#26D0CE']}
                  style={styles.searchButton}
                >
                  <Text style={styles.searchButtonText}>Search</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <View style={styles.recentSearches}>
              <Text style={styles.sectionTitle}>Recent Searches</Text>
              {recentSearches.map((search, index) => (
                <TouchableOpacity key={index}>
                  <LinearGradient
                    colors={['#FFFFFF', '#F8FAFC']}
                    style={styles.recentSearchItem}
                  >
                    <Search size={16} color="#2FE4C0" />
                    <Text style={styles.recentSearchText}>{search}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.featuredSection}>
              <Text style={styles.sectionTitle}>Quick Access</Text>
              <TouchableOpacity>
                <LinearGradient
                  colors={['#FFFFFF', '#F8FAFC']}
                  style={styles.quickAccessCard}
                >
                  <AlertTriangle size={24} color="#FFC371" />
                  <View style={styles.quickAccessInfo}>
                    <Text style={styles.quickAccessTitle}>Find Drugs with Least Side Effects</Text>
                    <Text style={styles.quickAccessDescription}>
                      Get AI-powered recommendations for safer alternatives
                    </Text>
                  </View>
                  <ChevronRight size={24} color="#2FE4C0" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {activeTab === 'interactions' && (
          <View style={styles.content}>
            <Text style={styles.sectionTitle}>Drug Interactions</Text>
            <Text style={styles.interactionDescription}>
              Check for potentially dangerous drug combinations with sidekick
            </Text>

            <TouchableOpacity>
              <LinearGradient
                colors={['#2FE4C0', '#26D0CE']}
                style={styles.checkInteractionButton}
              >
                <Text style={styles.checkInteractionText}>Check New Interaction</Text>
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.interactionsList}>
              <Text style={styles.subsectionTitle}>Common Interactions</Text>
              {drugInteractions.map((interaction, index) => (
                <LinearGradient
                  key={index}
                  colors={['#FFFFFF', '#F8FAFC']}
                  style={styles.interactionCard}
                >
                  <View style={styles.interactionHeader}>
                    <Text style={styles.interactionDrugs}>
                      {interaction.drug1} + {interaction.drug2}
                    </Text>
                    <LinearGradient
                      colors={[getSeverityColor(interaction.severity), getSeverityColor(interaction.severity)]}
                      style={styles.severityBadge}
                    >
                      <Text style={styles.severityText}>{interaction.severity}</Text>
                    </LinearGradient>
                  </View>
                  <Text style={styles.interactionDescriptionText}>
                    {interaction.description}
                  </Text>
                </LinearGradient>
              ))}
            </View>
          </View>
        )}
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
  tabContainer: {
    marginHorizontal: 20,
    marginTop: -12,
    marginBottom: 20,
    zIndex: 1,
  },
  tabBackground: {
    borderRadius: 16,
    padding: 4,
    shadowColor: '#2FE4C0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
    position: 'relative',
  },
  activeTab: {
    overflow: 'hidden',
  },
  activeTabGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 12,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    zIndex: 1,
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  content: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  categoryCard: {
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#FF5F6D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#2FE4C0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#1F2937',
  },
  searchButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
    justifyContent: 'center',
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  recentSearches: {
    marginBottom: 24,
  },
  recentSearchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 8,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  recentSearchText: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
  featuredSection: {
    marginBottom: 24,
  },
  quickAccessCard: {
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#FFC371',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  quickAccessInfo: {
    flex: 1,
    marginLeft: 16,
  },
  quickAccessTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  quickAccessDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  interactionDescription: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 20,
  },
  checkInteractionButton: {
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  checkInteractionText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  interactionsList: {
    marginBottom: 24,
  },
  subsectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  interactionCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  interactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  interactionDrugs: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  severityText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  interactionDescriptionText: {
    fontSize: 14,
    color: '#6B7280',
  },
});