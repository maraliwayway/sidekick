import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  StyleSheet,
} from 'react-native';
import { Search, AlertTriangle, ChevronRight, Sparkles } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const recentSearches = ['Ibuprofen', 'Melatonin', 'Adderall'];

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
  const [activeTab, setActiveTab] = useState<'search' | 'interactions'>('search');

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
      <LinearGradient colors={['#FF5F6D', '#FFC371']} style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Drug Information</Text>
          <Text style={styles.subtitle}>Find safe medication information with sidekick</Text>
        </View>
        <Sparkles size={24} color="#FFFFFF" />
      </LinearGradient>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'search' && styles.activeTab]}
          onPress={() => setActiveTab('search')}
        >
          <Text style={[styles.tabText, activeTab === 'search' && styles.activeTabText]}>Search</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'interactions' && styles.activeTab]}
          onPress={() => setActiveTab('interactions')}
        >
          <Text style={[styles.tabText, activeTab === 'interactions' && styles.activeTabText]}>
            Interactions
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {activeTab === 'search' && (
          <View style={styles.content}>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Enter drug name..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor="#9CA3AF"
                onSubmitEditing={handleSearchDrug}
              />
              <TouchableOpacity style={styles.searchButton} onPress={handleSearchDrug}>
                <Text style={styles.searchButtonText}>Search</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>Recent Searches</Text>
            {recentSearches.map((search, index) => (
              <TouchableOpacity key={index} style={styles.recentSearchItem}>
                <Text style={styles.recentSearchText}>{search}</Text>
              </TouchableOpacity>
            ))}

            <Text style={styles.sectionTitle}>Quick Access</Text>
            <TouchableOpacity style={styles.quickAccessCard}>
              <AlertTriangle size={24} color="#FFC371" />
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.quickAccessTitle}>Find Drugs with Least Side Effects</Text>
                <Text style={styles.quickAccessDescription}>
                  Get AI-powered recommendations for safer alternatives
                </Text>
              </View>
              <ChevronRight size={24} color="#2FE4C0" />
            </TouchableOpacity>
          </View>
        )}

        {activeTab === 'interactions' && (
          <View style={styles.content}>
            <Text style={styles.sectionTitle}>Drug Interactions</Text>
            {drugInteractions.map((interaction, index) => (
              <View key={index} style={styles.interactionCard}>
                <Text style={styles.interactionDrugs}>
                  {interaction.drug1} + {interaction.drug2}
                </Text>
                <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(interaction.severity) }]}>
                  <Text style={styles.severityText}>{interaction.severity}</Text>
                </View>
                <Text>{interaction.description}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { padding: 20, flexDirection: 'row', justifyContent: 'space-between' },
  headerContent: { flex: 1 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#FFFFFF' },
  subtitle: { fontSize: 16, color: 'rgba(255,255,255,0.9)', marginTop: 4 },
  tabContainer: { flexDirection: 'row', margin: 20, justifyContent: 'space-around' },
  tab: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20, backgroundColor: '#EEE' },
  activeTab: { backgroundColor: '#2FE4C0' },
  tabText: { fontSize: 16, color: '#333' },
  activeTabText: { color: '#FFF' },
  content: { padding: 20 },
  searchContainer: { flexDirection: 'row', marginBottom: 20 },
  searchInput: { flex: 1, borderWidth: 1, borderColor: '#DDD', borderRadius: 10, padding: 10 },
  searchButton: { marginLeft: 10, backgroundColor: '#2FE4C0', padding: 10, borderRadius: 10 },
  searchButtonText: { color: '#FFF', fontWeight: 'bold' },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginVertical: 10 },
  recentSearchItem: { padding: 10, backgroundColor: '#EEE', borderRadius: 10, marginBottom: 5 },
  recentSearchText: { fontSize: 16 },
  quickAccessCard: { flexDirection: 'row', alignItems: 'center', padding: 15, backgroundColor: '#FFF', borderRadius: 15, marginVertical: 10, elevation: 2 },
  quickAccessTitle: { fontSize: 16, fontWeight: 'bold' },
  quickAccessDescription: { fontSize: 14, color: '#666' },
  interactionCard: { padding: 15, backgroundColor: '#FFF', borderRadius: 10, marginBottom: 10, elevation: 1 },
  interactionDrugs: { fontSize: 16, fontWeight: 'bold' },
  severityBadge: { marginVertical: 5, padding: 5, borderRadius: 5 },
  severityText: { color: '#FFF', fontWeight: 'bold' },
});
