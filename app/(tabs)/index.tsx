// Powered by OnSpace.AI
import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, Pressable,
  TextInput, Dimensions, NativeSyntheticEvent, NativeScrollEvent,
} from 'react-native';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors, Typography, Spacing, Radius } from '@/constants/theme';
import { FEATURED_CHARACTERS, TRENDING_CHARACTERS, Character } from '@/constants/data';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = (SCREEN_WIDTH - Spacing.base * 2 - Spacing.sm) / 2;

const HERO_BANNERS = [
  {
    id: '1',
    title: 'استدعي بطلك',
    subtitle: 'في خضم المعركة، يتم تشكيل الروابط الحقيقية',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
  },
  {
    id: '2',
    title: 'اكتشف عوالم جديدة',
    subtitle: 'شخصيات تنتظرك في كل زاوية',
    image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=80',
  },
  {
    id: '3',
    title: 'قصتك تبدأ الآن',
    subtitle: 'كن البطل الذي تريد أن تكونه',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80',
  },
];

const EXPLORE_TABS = ['Following', 'Explore', 'Premium', 'Today'];

const CharacterCardItem = ({ item, onPress }: { item: Character; onPress: () => void }) => (
  <Pressable style={styles.characterCard} onPress={onPress}>
    <View style={styles.cardImageWrapper}>
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.cardImage}
        contentFit="cover"
        transition={200}
      />
      <View style={styles.cardChatBadge}>
        <Feather name="message-circle" size={11} color="#fff" />
        <Text style={styles.cardChatCount}>{item.chats}</Text>
      </View>
    </View>
    <Text style={styles.cardName} numberOfLines={1}>{item.name}</Text>
    <Text style={styles.cardDesc} numberOfLines={2}>{item.description}</Text>
    <View style={styles.cardTags}>
      {item.tags.slice(0, 2).map((tag) => (
        <View key={tag} style={styles.tagPill}>
          <Text style={styles.tagText}>{tag}</Text>
        </View>
      ))}
    </View>
  </Pressable>
);

const renderGrid = (items: Character[], onPress: (id: string) => void) => {
  const rows: Character[][] = [];
  for (let i = 0; i < items.length; i += 2) {
    rows.push(items.slice(i, i + 2));
  }
  return rows.map((row, ri) => (
    <View key={ri} style={styles.gridRow}>
      {row.map((item) => (
        <CharacterCardItem key={item.id} item={item} onPress={() => onPress(item.id)} />
      ))}
      {row.length === 1 ? <View style={styles.characterCard} /> : null}
    </View>
  ));
};

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(1);
  const [genderFilter, setGenderFilter] = useState('Female');
  const [heroBannerIndex, setHeroBannerIndex] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [showGenderMenu, setShowGenderMenu] = useState(false);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const idx = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    setHeroBannerIndex(idx);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Search bar */}
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Feather name="search" size={16} color={Colors.textMuted} style={{ marginRight: 8 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="بحث"
            placeholderTextColor={Colors.textMuted}
            value={searchText}
            onChangeText={setSearchText}
            textAlign="right"
          />
        </View>
        <Pressable
          style={styles.genderFilter}
          onPress={() => setShowGenderMenu(!showGenderMenu)}
        >
          <Text style={styles.genderText}>{genderFilter}</Text>
          <Feather name="chevron-down" size={14} color={Colors.textSecondary} />
        </Pressable>
        {showGenderMenu ? (
          <View style={styles.genderMenu}>
            {['Female', 'Male', 'All'].map((g) => (
              <Pressable
                key={g}
                style={styles.genderMenuItem}
                onPress={() => { setGenderFilter(g); setShowGenderMenu(false); }}
              >
                <Text style={[styles.genderMenuText, genderFilter === g && { color: Colors.primary }]}>
                  {g}
                </Text>
              </Pressable>
            ))}
          </View>
        ) : null}
      </View>

      {/* Tabs */}
      <View style={styles.tabsRow}>
        {EXPLORE_TABS.map((tab, i) => (
          <Pressable key={tab} style={styles.tabBtn} onPress={() => setActiveTab(i)}>
            <View style={styles.tabInner}>
              {tab === 'Premium' ? (
                <Feather name="zap" size={13} color={Colors.primary} style={{ marginRight: 3 }} />
              ) : null}
              <Text style={[styles.tabText, activeTab === i && styles.tabTextActive]}>
                {tab}
              </Text>
            </View>
            {activeTab === i ? <View style={styles.tabUnderline} /> : null}
          </Pressable>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
        {/* Hero Banner */}
        <View style={styles.heroBannerContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            {HERO_BANNERS.map((banner) => (
              <View key={banner.id} style={styles.heroSlide}>
                <Image
                  source={{ uri: banner.image }}
                  style={styles.heroImage}
                  contentFit="cover"
                  transition={300}
                />
                <View style={styles.heroOverlay} />
                <View style={styles.heroText}>
                  <Text style={styles.heroTitle}>{banner.title}</Text>
                  <Text style={styles.heroSubtitle}>{banner.subtitle}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
          {/* Dots */}
          <View style={styles.heroDots}>
            {HERO_BANNERS.map((_, i) => (
              <View
                key={i}
                style={[styles.heroDot, heroBannerIndex === i && styles.heroDotActive]}
              />
            ))}
          </View>
        </View>

        {/* Promo Banner */}
        <View style={styles.promoBanner}>
          <View>
            <Text style={styles.promoTitle}>First Purchase 31% OFF</Text>
            <Text style={styles.promoSub}>Ends in 24hrs</Text>
          </View>
          <Pressable style={styles.promoBtn}>
            <Text style={styles.promoBtnText}>Claim</Text>
          </Pressable>
        </View>

        {/* Featured Characters */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>الشخصيات المميزة</Text>
        </View>
        <View style={styles.gridContainer}>
          {renderGrid(FEATURED_CHARACTERS, (id) => router.push(`/character/${id}`))}
        </View>

        {/* Trending */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>الرائج الآن</Text>
          <Pressable onPress={() => router.push('/rankings')}>
            <Text style={styles.seeAll}>عرض الكل</Text>
          </Pressable>
        </View>
        <View style={styles.gridContainer}>
          {renderGrid(TRENDING_CHARACTERS, (id) => router.push(`/character/${id}`))}
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
    zIndex: 10,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.md,
    height: 42,
  },
  searchInput: {
    flex: 1,
    color: Colors.textPrimary,
    fontSize: Typography.sizes.base,
  },
  genderFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 6,
  },
  genderText: {
    color: Colors.textSecondary,
    fontSize: Typography.sizes.base,
  },
  genderMenu: {
    position: 'absolute',
    right: 8,
    top: 50,
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radius.md,
    padding: 4,
    zIndex: 100,
    borderWidth: 1,
    borderColor: Colors.border,
    minWidth: 100,
  },
  genderMenuItem: {
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  genderMenuText: {
    color: Colors.textPrimary,
    fontSize: Typography.sizes.base,
  },
  tabsRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.base,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
  },
  tabBtn: {
    marginRight: Spacing.lg,
  },
  tabInner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  tabText: {
    color: Colors.textMuted,
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.medium,
  },
  tabTextActive: {
    color: Colors.textPrimary,
    fontWeight: Typography.weights.semibold,
  },
  tabUnderline: {
    height: 2,
    backgroundColor: Colors.textPrimary,
    borderRadius: 1,
    marginTop: 2,
  },
  scroll: {
    flex: 1,
  },
  heroBannerContainer: {
    width: SCREEN_WIDTH,
    height: 220,
    position: 'relative',
  },
  heroSlide: {
    width: SCREEN_WIDTH,
    height: 220,
    position: 'relative',
  },
  heroImage: {
    width: SCREEN_WIDTH,
    height: 220,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  heroText: {
    position: 'absolute',
    bottom: 32,
    left: 16,
    right: 16,
  },
  heroTitle: {
    color: '#fff',
    fontSize: Typography.sizes.xxxl,
    fontWeight: Typography.weights.bold,
    textAlign: 'right',
  },
  heroSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: Typography.sizes.sm,
    textAlign: 'right',
    marginTop: 4,
  },
  heroDots: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  heroDot: {
    width: 8,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  heroDotActive: {
    width: 24,
    backgroundColor: '#fff',
  },
  promoBanner: {
    marginHorizontal: Spacing.base,
    marginTop: Spacing.md,
    backgroundColor: Colors.primary,
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  promoTitle: {
    color: '#000',
    fontWeight: Typography.weights.bold,
    fontSize: Typography.sizes.md,
  },
  promoSub: {
    color: '#000',
    fontSize: Typography.sizes.sm,
    marginTop: 2,
  },
  promoBtn: {
    backgroundColor: '#000',
    paddingHorizontal: Spacing.base,
    paddingVertical: 8,
    borderRadius: Radius.full,
  },
  promoBtnText: {
    color: Colors.primary,
    fontWeight: Typography.weights.bold,
    fontSize: Typography.sizes.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.sm,
  },
  sectionTitle: {
    color: Colors.textPrimary,
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
  },
  seeAll: {
    color: Colors.primary,
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.medium,
  },
  gridContainer: {
    paddingHorizontal: Spacing.base,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  characterCard: {
    width: CARD_WIDTH,
  },
  cardImageWrapper: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 1.3,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardChatBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  cardChatCount: {
    color: '#fff',
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.semibold,
  },
  cardName: {
    color: Colors.textPrimary,
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.bold,
    marginTop: Spacing.sm,
    textAlign: 'right',
  },
  cardDesc: {
    color: Colors.textSecondary,
    fontSize: Typography.sizes.xs,
    lineHeight: 16,
    textAlign: 'right',
    marginTop: 3,
  },
  cardTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginTop: 6,
    justifyContent: 'flex-end',
  },
  tagPill: {
    backgroundColor: Colors.surface,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.full,
    borderWidth: 0.5,
    borderColor: Colors.border,
  },
  tagText: {
    color: Colors.textSecondary,
    fontSize: Typography.sizes.xs,
  },
});
