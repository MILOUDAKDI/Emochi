// Powered by OnSpace.AI
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, Pressable, ScrollView, Dimensions,
} from 'react-native';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Colors, Typography, Spacing, Radius } from '@/constants/theme';
import { FEATURED_CHARACTERS, TRENDING_CHARACTERS } from '@/constants/data';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function CharacterDetailScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [saved, setSaved] = useState(false);

  const all = [...FEATURED_CHARACTERS, ...TRENDING_CHARACTERS];
  const character = all.find((c) => c.id === id) || FEATURED_CHARACTERS[0];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <View style={styles.heroWrapper}>
          <Image
            source={{ uri: character.imageUrl }}
            style={styles.heroImage}
            contentFit="cover"
            transition={300}
          />
          <View style={styles.heroOverlay} />
          {/* Back button */}
          <Pressable
            style={[styles.backBtn, { top: 12 }]}
            onPress={() => router.back()}
            hitSlop={8}
          >
            <Feather name="chevron-left" size={24} color="#fff" />
          </Pressable>
          {/* Save button */}
          <Pressable
            style={[styles.saveBtn, { top: 12 }]}
            onPress={() => setSaved(!saved)}
            hitSlop={8}
          >
            <Feather
              name={saved ? 'bookmark' : 'bookmark'}
              size={22}
              color={saved ? Colors.primary : '#fff'}
            />
          </Pressable>
        </View>

        {/* Info */}
        <View style={styles.infoSection}>
          <Text style={styles.characterName}>{character.name}</Text>

          {/* Stats */}
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Feather name="bookmark" size={14} color={Colors.textMuted} />
              <Text style={styles.statText}>{character.saves}</Text>
            </View>
            <View style={styles.stat}>
              <Feather name="message-circle" size={14} color={Colors.textMuted} />
              <Text style={styles.statText}>{character.chats}</Text>
            </View>
          </View>

          {/* Tags */}
          <View style={styles.tagsRow}>
            {character.tags.map((tag) => (
              <View key={tag} style={styles.tagPill}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>

          {/* Description */}
          <Text style={styles.description}>{character.description}</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <Pressable
            style={styles.chatBtn}
            onPress={() => router.push(`/chat/${character.id}`)}
          >
            <Feather name="message-circle" size={18} color="#000" />
            <Text style={styles.chatBtnText}>ابدأ المحادثة</Text>
          </Pressable>
          <Pressable style={styles.shareBtn}>
            <Feather name="share-2" size={18} color={Colors.textSecondary} />
          </Pressable>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  heroWrapper: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH * 1.2,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  backBtn: {
    position: 'absolute',
    left: Spacing.base,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtn: {
    position: 'absolute',
    right: Spacing.base,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoSection: {
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.lg,
    alignItems: 'flex-end',
  },
  characterName: {
    color: Colors.textPrimary,
    fontSize: Typography.sizes.xxl,
    fontWeight: Typography.weights.bold,
    textAlign: 'right',
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.base,
    marginTop: Spacing.sm,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    color: Colors.textMuted,
    fontSize: Typography.sizes.sm,
  },
  tagsRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: Spacing.sm,
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
  },
  tagPill: {
    backgroundColor: Colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: Radius.full,
    borderWidth: 0.5,
    borderColor: Colors.border,
  },
  tagText: {
    color: Colors.textSecondary,
    fontSize: Typography.sizes.sm,
  },
  description: {
    color: Colors.textSecondary,
    fontSize: Typography.sizes.base,
    lineHeight: 24,
    textAlign: 'right',
    marginTop: Spacing.md,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.xl,
    gap: Spacing.sm,
  },
  chatBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.base,
    borderRadius: Radius.lg,
  },
  chatBtnText: {
    color: '#000',
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.bold,
  },
  shareBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: Colors.border,
  },
});
