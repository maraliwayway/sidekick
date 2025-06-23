import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Image,
} from 'react-native';
import { Search, Leaf, Users, Compass, Sparkles } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface CultureSection {
  title: string;
  overview: string;
  healingPractices: string[];
  keyPlants?: string[];
  modernRelevance?: string;
  color: string;
  image?: string;
  imageCaption?: string;
}

const categories = [
  { id: 1, name: 'All Cultures', icon: Users, color: '#2FE4C0' },
  { id: 2, name: 'Indigenous', icon: Compass, color: '#FF5F6D' },
  { id: 3, name: 'Traditional', icon: Leaf, color: '#FFC371' },
];

const TraditionalHealingInfoPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(1);

  const cultures: CultureSection[] = [
    {
      title: "Blackfoot Culture",
      overview: "The Blackfoot Confederacy, also known as Niitsitapi, is a historic alliance of Indigenous groups including the Piegan, Blood, and Siksika bands (Encyclopædia Britannica, 2025). Today, three Blackfoot First Nation governments reside in Alberta, Canada, while the Blackfeet Nation is in Montana, United States (Wikimedia Foundation, 2025).",
      healingPractices: [
        "Medicine Wheel teachings emphasizing balance across spiritual, emotional, physical, and mental dimensions (Hazelwood, 2025)",
        "Smudging rituals using sage and sweetgrass to purify body, mind, and spirit (Hazelwood, 2025)",
        "Medicine bundles (especially Beaver bundles) used in ceremonies for ancestral support",
        "Pipe ceremonies and Sun Dances for community unity and spiritual renewal"
      ],
      keyPlants: [
        "Peppermint oil for pain relief, stress reduction, and respiratory conditions (de Rus Jacquet et al., 2017)",
        "Various plants being studied for neuroprotective and cancer-fighting properties (de Rus Jacquet et al., 2017)"
      ],
      color: '#FF5F6D',
      image: 'https://cdn.britannica.com/67/101767-050-6DB8B8BF/shawl-dancer-Powwow-dancers-jingle-dance-regalia.jpg', 
      imageCaption: 'Blackfeet Indian Reservation: Dancers in traditional regalia at a powwow on the Blackfeet Indian Reservation, Montana.'
    },
    {
      title: "Haudenosaunee (Iroquois)",
      overview: "The Haudenosaunee, meaning 'People of the Longhouse,' consists of six nations: Mohawk, Oneida, Onondaga, Cayuga, Seneca, and Tuscarora. Their traditional medicine encompasses both physical and spiritual healing through deep understanding of medicinal plants and ceremonies (Medicine - Haudenosaunee Confederacy, n.d.).",
      healingPractices: [
        "Belief that illness stems from both natural and spiritual causes (Medicine - Haudenosaunee Confederacy, n.d.)",
        "Use of spells, dances, ceremonies, and sacred instruments for healing (Medicine - Haudenosaunee Confederacy, n.d.)",
        "Medicine Societies with healing rituals using sacred masks (Life ways - explore Oneida, 2024)",
        "Thirteen Moon Ceremonies aligning with lunar cycles (Life ways - explore Oneida, 2024)",
        "Sacred plants (Tobacco, Cedar, Sage, Sweetgrass) for purification and protection (Medicine - Haudenosaunee Confederacy, n.d.)"
      ],
      keyPlants: [
        "Achillea millefolium (Yarrow) (Medicinal plants, n.d.)",
        "Asclepias syriaca (Common Milkweed) (Medicinal plants, n.d.)",
        "Ipomoea pandurata (Wild Potato Vine) (Medicinal plants, n.d.)",
        "Malva neglecta (Common Mallow) (Medicinal plants, n.d.)"
      ],
      color: '#2FE4C0',
      image: 'https://exploreoneida.com/wp-content/uploads/2022/01/Medicine_E.Smith_-1024x740.jpg', 
      imageCaption: 'In a Haudenosaunee village, there were always certain people, called healers, who held vast knowledge of medicinal and herbal plants. Once the plants were in bloom, these healers would go about the forests in search of the desired plants needed to cure disease. These healers were available as to help the people with curing diseases and sicknesses (Life ways - explore Oneida 2024).'
    },
    {
      title: "Traditional Chinese Medicine (TCM)",
      overview: "An ancient healing system developed over thousands of years in China, still widely practiced today (Chinese medicine, 2024). TCM views the human body as interconnected with nature, influenced by yin and yang and the five elements (wood, fire, earth, metal, water) (Hopp & Shurtleff, 2019).",
      healingPractices: [
        "Herbal medicine using mixtures of roots, leaves, flowers, and minerals (Chinese medicine, 2024)",
        "Acupuncture with thin needles to balance Qi (energy) and improve blood flow (Chinese medicine, 2024)",
        "Tai Chi combining slow movements with breathing techniques for health and relaxation (Chinese medicine, 2024)"
      ],
      modernRelevance: "Acupuncture is widely used in Western medicine for chronic pain, stress, and inflammation (Staff, 2024). Tai Chi is recommended by doctors for stress reduction, improving posture and balance, and overall well-being (Hopp & Shurtleff, 2019).",
      color: '#FFC371',
      image: 'https://cdn.shopify.com/s/files/1/0060/9920/6178/files/lions-mane-traditional-herbalism.jpg?v=1738865379', 
      imageCaption: 'A curated selection of Chinese herbs prepared as teas, topical applications, or supplements.'
    }
  ];

  const filteredCultures = cultures.filter(culture =>
    culture.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    culture.healingPractices.some(practice => 
      practice.toLowerCase().includes(searchQuery.toLowerCase())
    ) ||
    (culture.keyPlants && culture.keyPlants.some(plant =>
      plant.toLowerCase().includes(searchQuery.toLowerCase())
    ))
  );

  const renderCultureSection = (culture: CultureSection, index: number) => {
    return (
      <TouchableOpacity key={index}>
        <LinearGradient
          colors={['#FFFFFF', '#F8FAFC']}
          style={styles.cultureCard}
        >
          <View style={styles.cultureHeader}>
            <Text style={styles.cultureTitle}>{culture.title}</Text>
          </View>
          
          {culture.image && (
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: culture.image }}
                style={styles.cultureImage}
                resizeMode="cover"
              />
              {culture.imageCaption && (
                <Text style={styles.imageCaption}>{culture.imageCaption}</Text>
              )}
            </View>
          )}
          
          <View style={styles.overviewSection}>
            <Text style={styles.sectionHeader}>Overview</Text>
            <Text style={styles.bodyText}>{culture.overview}</Text>
          </View>

          <View style={styles.practicesSection}>
            <Text style={styles.sectionHeader}>Healing Practices</Text>
            {culture.healingPractices.map((practice, idx) => (

              <View key={idx} style={styles.practiceItem}>
                <View style={[styles.practiceDot, { backgroundColor: culture.color }]} />
                <Text style={styles.practiceText}>{practice}</Text>
              </View>
            ))}
            
          </View>

          {culture.keyPlants && (
            <View style={styles.plantsSection}>
              <Text style={styles.sectionHeader}>Key Medicinal Plants</Text>
              <View style={styles.plantTags}>
                {culture.keyPlants.slice(0, 2).map((plant, idx) => (
                  <View key={idx} style={[styles.plantTag, { borderColor: culture.color + '40' }]}>
                    <Leaf size={14} color={culture.color} />
                    <Text style={[styles.plantText, { color: culture.color }]}>
                      {plant.split(' ')[0]}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {culture.modernRelevance && (
            <View style={styles.modernSection}>
              <Text style={styles.sectionHeader}>Modern Relevance</Text>
              <Text style={styles.bodyText}>{culture.modernRelevance}</Text>
            </View>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#2FE4C0', '#26D0CE']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.title}>Traditional Healing</Text>
          <Text style={styles.subtitle}>Discover ancient wisdom </Text>
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
            placeholder="Search cultures or practices..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
        </LinearGradient>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
       
    {/* very intro paragraph */}

      <LinearGradient
          colors={['#FFFFFF', '#F8FAFC']}
          style={styles.medicineWheelCard}
        >
          <View style={styles.medicineWheelHeader}>
        
        
          </View>
          <Text style={styles.wheelText}>
          Throughout history, cultures around the world have turned to natural remedies and traditional practices for healing. This page highlights the unique approaches of Blackfoot culture, Native Americans and Ancient Indian (Ayurveda) culture, offering insight into how different communities have nurtured health through nature and knowledge passed down through generations.

          </Text>
        </LinearGradient>

        <LinearGradient
          colors={['#FFFFFF', '#F8FAFC']}
          style={styles.medicineWheelCard}
        >
          <View style={styles.medicineWheelHeader}>
           
            <Text style={styles.wheelTitle}>The Medicine Wheel</Text>
          </View>
          <Text style={styles.wheelText}>
          The Medicine Wheel is a sacred symbol used by many Indigenous cultures, including the Blackfoot and others. It represents balance, healing, and the interconnectedness of life. It is divided into four quadrants: East, South, West, and North, each corresponding to a different aspect of wellness: spiritual, emotional, physical, and mental. The East symbolizes new beginnings and spiritual strength; the South focuses on emotional warmth and self-expression; the West represents physical care and reflection; and the North is tied to wisdom and mental clarity (J. Beaulieu, 2018). 
        The Wheel teaches that true well-being comes from nurturing all four aspects equally. It encourages people to reflect on their strengths and areas that need growth, using this self-awareness to create balance in their lives (J. Beaulieu, 2018). The center of the wheel represents wholeness and harmony, where all parts come together. Today, the Medicine Wheel remains a powerful tool for personal healing, growth, and resilience, providing a holistic path to wellness grounded in Indigenous knowledge.

          </Text>
        </LinearGradient>

        <View style={styles.culturesContainer}>
          <Text style={styles.sectionTitle}>
            {searchQuery ? `Results for "${searchQuery}"` : 'Healing Traditions'}
          </Text>
          
          {filteredCultures.map((culture, index) => renderCultureSection(culture, index))}
        </View>

        <LinearGradient
          colors={['#FFFFFF', '#F8FAFC']}
          style={styles.referencesCard}
        >
          <Text style={styles.referencesTitle}>References</Text>
          <Text style={styles.referenceText}>
            Chinese medicine. (2024, June 20). Johns Hopkins Medicine. https://www.hopkinsmedicine.org/health/wellness-and-prevention/chinese-medicine
          </Text>
          <Text style={styles.referenceText}>
            de Rus Jacquet, A., Tambe, M. A., Ma, S. Y., McCabe, G. P., Vest, J. H. C., & Rochet, J.-C. (2017, July 12). Pikuni-blackfeet traditional medicine: Neuroprotective activities of medicinal plants used to treat parkinson's disease-related symptoms. Journal of ethnopharmacology. https://pmc.ncbi.nlm.nih.gov/articles/PMC6149223/
          </Text>
          <Text style={styles.referenceText}>
            Encyclopædia Britannica, inc. (2025, May 3). Blackfoot. Encyclopædia Britannica. https://www.britannica.com/topic/Blackfoot-people
          </Text>
          <Text style={styles.referenceText}>
            Hazelwood, V. (2025, January 27). Indigenous practices for Wellness. Building Brains Together. https://www.buildingbrains.ca/blog/indigenous-practices-for-wellness
          </Text>
          <Text style={styles.referenceText}>
            Hopp, C., & Shurtleff, D. (2019, April). Traditional chinese medicine: What you need to know. National Center for Complementary and Integrative Health. https://www.nccih.nih.gov/health/traditional-chinese-medicine-what-you-need-to-know
          </Text>
          <Text style={styles.referenceText}>
            J. Beaulieu, K. (2018, August 24). The seven lessons of the medicine wheel. SAY Magazine. https://saymag.com/the-seven-lessons-of-the-medicine-wheel/
          </Text>
          <Text style={styles.referenceText}>
            Life ways - explore Oneida. (2024, March 25). Explore Oneida - Welcome to Oneida Nation. https://exploreoneida.com/culture/life-ways/
          </Text>
          <Text style={styles.referenceText}>
            Medicinal plants. (n.d.). iroquoismuseum. https://www.iroquoismuseum.org/medicinal-plants
          </Text>
          <Text style={styles.referenceText}>
            Medicine - Haudenosaunee Confederacy. (n.d.). haudenosaunee confederacy. https://www.haudenosauneeconfederacy.com/historical-life-as-a-haudenosaunee/medicine/
          </Text>
          <Text style={styles.referenceText}>
            Staff, M. C. (2024, April 20). Acupuncture. Mayo Clinic. https://www.mayoclinic.org/tests-procedures/acupuncture/about/pac-20392763
          </Text>
          <Text style={styles.referenceText}>
            Wikimedia Foundation. (2025, June 7). Blackfoot confederacy. Wikipedia. https://en.wikipedia.org/wiki/Blackfoot_Confederacy
          </Text>
        </LinearGradient>

        <LinearGradient
          colors={['#2FE4C0', '#26D0CE']}
          style={styles.footer}
        >
          <Sparkles size={20} color="#FFFFFF" style={styles.footerIcon} />
          <Text style={styles.footerText}>
            These traditional healing practices continue to offer valuable insights into holistic wellness approaches that honor the connection between mind, body, spirit, and nature.
          </Text>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

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
  medicineWheelCard: {
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 24,
    shadowColor: '#2FE4C0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  medicineWheelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  wheelIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  wheelTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  wheelText: {
    fontSize: 15,
    color: '#6B7280',
    lineHeight: 22,
  },
  culturesContainer: {
    paddingHorizontal: 20,
  },
  cultureCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#2FE4C0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  cultureHeader: {
    marginBottom: 16,
  },
  cultureTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  imageContainer: {
    marginBottom: 16,
  },
  cultureImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 8,
  },
  imageCaption: {
    fontSize: 12,
    color: '#6B7280',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  overviewSection: {
    marginBottom: 20,
  },
  practicesSection: {
    marginBottom: 20,
  },
  plantsSection: {
    marginBottom: 20,
  },
  modernSection: {
    marginBottom: 10,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  bodyText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  practiceItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  practiceDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 7,
    marginRight: 12,
  },
  practiceText: {
    flex: 1,
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  moreText: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
  plantTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  plantTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F9FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
    borderWidth: 1,
  },
  plantText: {
    fontSize: 12,
    fontWeight: '600',
  },
  referencesCard: {
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 24,
    shadowColor: '#2FE4C0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  referencesTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  referenceText: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 16,
    marginBottom: 12,
  },
  footer: {
    margin: 20,
    padding: 20,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  footerIcon: {
    marginRight: 12,
    marginTop: 2,
    opacity: 0.8,
  },
  footerText: {
    flex: 1,
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 20,
  },
});

export default TraditionalHealingInfoPage;