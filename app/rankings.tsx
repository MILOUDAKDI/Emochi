// Powered by OnSpace.AI
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, Pressable, ScrollView, FlatList,
} from 'react-native';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors, Typography, Spacing, Radius } from '@/constants/theme';
import { RANKING_CATEGORIES } from '@/constants/data';

const RANK_COLORS: Record<number, string> = {
  1: '#FFD700',
  2: '#C0C0C0',
  3: '#CD7F32',
};

export default function RankingsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState(0);

  const currentCategory = RANKING_CATEGORIES[activeCategory];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <View />
        <Text style={styles.headerTitle}>ترتيب الشخصيات</Text>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Feather name="chevron-left" size={22} color={Colors.textSecondary} />
        </Pressable>
      </View>

      {/* Category Tabs */}
      <View style={styles.categoryTabs}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsContent}>
          {RANKING_CATEGORIES.map((cat, i) => (
            <Pressable
              key={cat.id}
              style={[styles.catTab, activeCategory === i && styles.catTabActive]}
              onPress={() => setActiveCategory(i)}
            >
              <Text style={[styles.catTabText, activeCategory === i && styles.catTabTextActive]}>
                {cat.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Ranking List */}
      <FlatList
        data={currentCategory.characters}
        keyExtractor={(item) => `${item.rank}`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <Pressable style={styles.rankItem}>
            {/* Rank Number */}
            <Text style={[styles.rankNumber, RANK_COLORS[item.rank] ? { color: RANK_COLORS[item.rank] } : {}]}>
              {item.rank}
            </Text>

            {/* Avatar */}
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.rankAvatar}
              contentFit="cover"
              transition={200}
            />

            {/* Info */}
            <View style={styles.rankInfo}>
              <Text style={styles.rankName} numberOfLines={1}>{item.name}</Text>
              <Text style={styles.rankStats}>{item.stats}</Text>
              <Text style={styles.rankDesc} numberOfLines={2}>{item.description}</Text>
            </View>
          </Pressable>
        )}
        ListFooterComponent={<View style={{ height: 32 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    color: Colors.textPrimary,
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.semibold,
  },
  categoryTabs: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
  },
  tabsContent: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
    flexDirection: 'row',
  },
  catTab: {
    paddingHorizontal: Spacing.base,
    paddingVertical: 8,
    borderRadius: Radius.full,
    backgroundColor: Colors.surface,
    borderWidth: 0.5,
    borderColor: Colors.border,
  },
  catTabActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  catTabText: {
    color: Colors.textSecondary,
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.medium,
  },
  catTabTextActive: {
    color: '#000',
    fontWeight: Typography.weights.bold,
  },
  listContent: {
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.sm,
  },
  rankItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
    gap: Spacing.md,
  },
  rankNumber: {
    width: 28,
    color: Colors.textMuted,
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.extrabold,
    textAlign: 'center',
  },
  rankAvatar: {
    width: 64,
    height: 64,
    borderRadius: Radius.md,
  },
  rankInfo: {
    flex: 1,
    alignItems: 'flex-end',
  },
  rankName: {
    color: Colors.textPrimary,
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.bold,
    textAlign: 'right',
  },
  rankStats: {
    color: Colors.textMuted,
    fontSize: Typography.sizes.xs,
    marginTop: 3,
    textAlign: 'right',
  },
  rankDesc: {
    color: Colors.textSecondary,
    fontSize: Typography.sizes.xs,
    lineHeight: 16,
    marginTop: 4,
    textAlign: 'right',
  },
});
