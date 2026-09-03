// Powered by OnSpace.AI
import React from 'react';
import {
  View, Text, StyleSheet, Pressable,
  FlatList, Dimensions,
} from 'react-native';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors, Typography, Spacing, Radius } from '@/constants/theme';
import { FEATURED_CHARACTERS, MY_CHARACTERS, Character } from '@/constants/data';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = (SCREEN_WIDTH - Spacing.base * 2 - Spacing.sm) / 2;

export default function CharactersScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const AllCharacters = [...MY_CHARACTERS, ...FEATURED_CHARACTERS.slice(0, 4)];

  const CharCard = ({ item }: { item: Character }) => (
    <Pressable
      style={styles.card}
      onPress={() => router.push(`/character/${item.id}`)}
    >
      <View style={styles.cardImgWrapper}>
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.cardImg}
          contentFit="cover"
          transition={200}
        />
        <View style={styles.chatBadge}>
          <Feather name="message-circle" size={11} color="#fff" />
          <Text style={styles.chatCount}>{item.chats}</Text>
        </View>
      </View>
      <Text style={styles.cardName} numberOfLines={1}>{item.name}</Text>
      <Text style={styles.cardDesc} numberOfLines={1}>{item.description}</Text>
      {item.tags.length > 0 ? (
        <View style={styles.tagsRow}>
          {item.tags.slice(0, 1).map((t) => (
            <View key={t} style={styles.tagPill}>
              <Text style={styles.tagText}>{t}</Text>
            </View>
          ))}
        </View>
      ) : null}
    </Pressable>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>الشخصيات</Text>
      </View>

      <FlatList
        data={AllCharacters}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {/* My Characters Section */}
            <View style={styles.sectionHeader}>
              <Pressable onPress={() => router.push('/create')}>
                <Text style={styles.createLink}>إنشاء</Text>
              </Pressable>
              <Text style={styles.sectionTitle}>شخصياتي</Text>
            </View>

            {MY_CHARACTERS.length === 0 ? (
              <View style={styles.emptyState}>
                <Feather name="plus-circle" size={48} color={Colors.textDim} />
                <Text style={styles.emptyText}>لا توجد شخصيات بعد</Text>
                <Pressable style={styles.createBtn} onPress={() => router.push('/create')}>
                  <Text style={styles.createBtnText}>إنشاء شخصية</Text>
                </Pressable>
              </View>
            ) : (
              <View style={styles.myCharGrid}>
                {MY_CHARACTERS.map((item) => (
                  <Pressable
                    key={item.id}
                    style={styles.myCharCard}
                    onPress={() => router.push(`/character/${item.id}`)}
                  >
                    <View style={styles.myCharImgWrapper}>
                      <Image
                        source={{ uri: item.imageUrl }}
                        style={styles.myCharImg}
                        contentFit="cover"
                        transition={200}
                      />
                      <View style={styles.chatBadge}>
                        <Feather name="message-circle" size={11} color="#fff" />
                        <Text style={styles.chatCount}>{item.chats}</Text>
                      </View>
                    </View>
                    <Text style={styles.myCharName} numberOfLines={1}>{item.name}</Text>
                    <Text style={styles.myCharDesc} numberOfLines={1}>{item.description}</Text>
                    {item.tags.length > 0 ? (
                      <View style={styles.tagsRow}>
                        <View style={styles.tagPill}>
                          <Text style={styles.tagText}>{item.tags[0]}</Text>
                        </View>
                      </View>
                    ) : null}
                  </Pressable>
                ))}
              </View>
            )}

            {/* Chats Section */}
            <View style={styles.sectionHeader}>
              <View />
              <Text style={styles.sectionTitle}>Chats</Text>
            </View>
          </View>
        }
        numColumns={2}
        columnWrapperStyle={styles.gridRow}
        contentContainerStyle={styles.gridContainer}
        renderItem={({ item }) => <CharCard item={item} />}
        ListFooterComponent={<View style={{ height: 24 }} />}
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
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
  },
  headerTitle: {
    color: Colors.textPrimary,
    fontSize: Typography.sizes.xxl,
    fontWeight: Typography.weights.bold,
    textAlign: 'right',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  sectionTitle: {
    color: Colors.textPrimary,
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.semibold,
  },
  createLink: {
    color: Colors.primary,
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.medium,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
    paddingHorizontal: Spacing.base,
  },
  emptyText: {
    color: Colors.textMuted,
    fontSize: Typography.sizes.base,
    marginTop: Spacing.md,
    textAlign: 'center',
  },
  createBtn: {
    marginTop: Spacing.base,
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.full,
  },
  createBtnText: {
    color: '#000',
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
  },
  myCharGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.base,
    gap: Spacing.sm,
  },
  myCharCard: {
    width: CARD_WIDTH,
  },
  myCharImgWrapper: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 1.45,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    position: 'relative',
  },
  myCharImg: {
    width: '100%',
    height: '100%',
  },
  myCharName: {
    color: Colors.textPrimary,
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.bold,
    marginTop: Spacing.sm,
    textAlign: 'right',
  },
  myCharDesc: {
    color: Colors.textSecondary,
    fontSize: Typography.sizes.xs,
    textAlign: 'right',
    marginTop: 3,
  },
  gridContainer: {
    paddingHorizontal: Spacing.base,
  },
  gridRow: {
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  card: {
    width: CARD_WIDTH,
  },
  cardImgWrapper: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 1.35,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    position: 'relative',
  },
  cardImg: {
    width: '100%',
    height: '100%',
  },
  chatBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  chatCount: {
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
    textAlign: 'right',
    marginTop: 3,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    gap: 4,
    marginTop: 6,
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
