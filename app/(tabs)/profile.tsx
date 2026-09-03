// Powered by OnSpace.AI
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, Pressable, ScrollView,
} from 'react-native';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors, Typography, Spacing, Radius } from '@/constants/theme';
import { FEATURED_CHARACTERS } from '@/constants/data';

const SAVED = FEATURED_CHARACTERS.slice(0, 4);

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.push('/settings')}>
          <Feather name="settings" size={22} color={Colors.textSecondary} />
        </Pressable>
        <Text style={styles.headerTitle}>Profile</Text>
        <Pressable>
          <Feather name="bell" size={22} color={Colors.textSecondary} />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* User Info */}
        <View style={styles.userSection}>
          <View style={styles.avatarWrapper}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&q=80' }}
              style={styles.avatar}
              contentFit="cover"
              transition={200}
            />
          </View>
          <Text style={styles.username}>Joe</Text>
          <Text style={styles.userId}>Ic72LAB71gHXtumbMe8-V</Text>
          <Pressable style={styles.editBtn}>
            <Text style={styles.editBtnText}>Edit Profile</Text>
          </Pressable>

          {/* Stats */}
          <View style={styles.statsRow}>
            {[
              { label: 'Chats', value: '528' },
              { label: 'Saves', value: '3' },
              { label: 'Followers', value: '0' },
              { label: 'Following', value: '1' },
            ].map((s) => (
              <View key={s.label} style={styles.statItem}>
                <Text style={styles.statValue}>{s.value}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Subscription Banner */}
        <View style={styles.subBanner}>
          <View style={styles.subLeft}>
            <Text style={styles.subTitle}>EMOCHI+</Text>
            <View style={styles.subPromo}>
              <Text style={styles.promoText}>31% OFF</Text>
            </View>
            <Text style={styles.countdown}>12 : 40 : 42</Text>
          </View>
          <View style={styles.subTiers}>
            <View style={styles.tierCard}>
              <Text style={styles.tierBadge}>👑</Text>
              <Text style={styles.tierName}>MAX</Text>
              <Text style={styles.tierDesc}>Maximize mem...</Text>
            </View>
            <View style={[styles.tierCard, styles.tierCardGold]}>
              <Text style={styles.tierBadge}>🏆</Text>
              <Text style={styles.tierName}>Ultra</Text>
              <Text style={styles.tierDesc}>Free 2000 Moc...</Text>
            </View>
          </View>
        </View>

        {/* Quick Nav */}
        <View style={styles.quickNav}>
          {['Emochi+', 'Wallet', 'Persona'].map((item) => (
            <Pressable key={item} style={styles.quickNavItem}>
              <Text style={styles.quickNavText}>{item}</Text>
            </Pressable>
          ))}
        </View>

        {/* Saved Characters */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>المحفوظات</Text>
        </View>
        <View style={styles.savedGrid}>
          {SAVED.map((char) => (
            <Pressable
              key={char.id}
              style={styles.savedCard}
              onPress={() => router.push(`/character/${char.id}`)}
            >
              <Image
                source={{ uri: char.imageUrl }}
                style={styles.savedImg}
                contentFit="cover"
                transition={200}
              />
              <View style={styles.savedOverlay}>
                <Text style={styles.savedName} numberOfLines={1}>{char.name}</Text>
              </View>
            </Pressable>
          ))}
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
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
  },
  headerTitle: {
    color: Colors.textPrimary,
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.semibold,
  },
  userSection: {
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.base,
  },
  avatarWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: Colors.border,
  },
  avatar: {
    width: 80,
    height: 80,
  },
  username: {
    color: Colors.textPrimary,
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    marginTop: Spacing.md,
  },
  userId: {
    color: Colors.textMuted,
    fontSize: Typography.sizes.xs,
    marginTop: 4,
  },
  editBtn: {
    marginTop: Spacing.md,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  editBtnText: {
    color: Colors.textPrimary,
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.medium,
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: Spacing.lg,
    gap: Spacing.xl,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: Colors.textPrimary,
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
  },
  statLabel: {
    color: Colors.textMuted,
    fontSize: Typography.sizes.xs,
    marginTop: 2,
  },
  subBanner: {
    marginHorizontal: Spacing.base,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.base,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderColor: Colors.primary + '44',
  },
  subLeft: {
    flex: 1,
  },
  subTitle: {
    color: Colors.primary,
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.extrabold,
    letterSpacing: 1,
  },
  subPromo: {
    backgroundColor: Colors.primary,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: Radius.sm,
    marginTop: 4,
  },
  promoText: {
    color: '#000',
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
  },
  countdown: {
    color: Colors.textSecondary,
    fontSize: Typography.sizes.sm,
    marginTop: 6,
    fontWeight: Typography.weights.medium,
  },
  subTiers: {
    flexDirection: 'row',
    gap: 8,
  },
  tierCard: {
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radius.md,
    padding: 10,
    alignItems: 'center',
    width: 80,
    borderWidth: 0.5,
    borderColor: Colors.border,
  },
  tierCardGold: {
    borderColor: Colors.primary + '66',
  },
  tierBadge: {
    fontSize: 20,
  },
  tierName: {
    color: Colors.textPrimary,
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.bold,
    marginTop: 4,
  },
  tierDesc: {
    color: Colors.textMuted,
    fontSize: 9,
    marginTop: 2,
    textAlign: 'center',
  },
  quickNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.lg,
  },
  quickNavItem: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  quickNavText: {
    color: Colors.textSecondary,
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.medium,
  },
  sectionHeader: {
    paddingHorizontal: Spacing.base,
    paddingBottom: Spacing.sm,
  },
  sectionTitle: {
    color: Colors.textPrimary,
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    textAlign: 'right',
  },
  savedGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.base,
    gap: 8,
  },
  savedCard: {
    width: '47%',
    aspectRatio: 0.75,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    position: 'relative',
  },
  savedImg: {
    width: '100%',
    height: '100%',
  },
  savedOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.55)',
    padding: 8,
  },
  savedName: {
    color: '#fff',
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
    textAlign: 'right',
  },
});
