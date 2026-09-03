// Powered by OnSpace.AI
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, Pressable,
  FlatList, Dimensions,
} from 'react-native';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors, Typography, Spacing, Radius } from '@/constants/theme';
import { CHAT_LIST, ALBUM_IMAGES, ChatItem } from '@/constants/data';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function ChatsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'Chats' | 'Album'>('Chats');

  const renderChatItem = ({ item }: { item: ChatItem }) => (
    <Pressable
      style={({ pressed }) => [styles.chatItem, pressed && { opacity: 0.75 }]}
      onPress={() => router.push(`/chat/${item.id}`)}
    >
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.chatAvatar}
        contentFit="cover"
        transition={200}
      />
      <View style={styles.chatContent}>
        <View style={styles.chatTop}>
          <Text style={styles.chatTime}>{item.time}</Text>
          <Text style={styles.chatName}>{item.characterName}</Text>
        </View>
        <Text style={styles.chatPreview} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Feather name="bell" size={22} color={Colors.textSecondary} />
          {/* unread badge */}
          <View style={styles.notifBadge} />
          <Pressable style={{ marginLeft: Spacing.base }}>
            <Feather name="search" size={22} color={Colors.textSecondary} />
          </Pressable>
        </View>
        <View style={styles.headerTabs}>
          {(['Chats', 'Album'] as const).map((tab) => (
            <Pressable key={tab} style={styles.headerTab} onPress={() => setActiveTab(tab)}>
              <Text style={[styles.headerTabText, activeTab === tab && styles.headerTabTextActive]}>
                {tab}
              </Text>
              {activeTab === tab ? <View style={styles.headerTabUnderline} /> : null}
            </Pressable>
          ))}
        </View>
      </View>

      {activeTab === 'Chats' ? (
        <FlatList
          data={CHAT_LIST}
          keyExtractor={(item) => item.id}
          renderItem={renderChatItem}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <Pressable style={styles.savedRow}>
              <Feather name="chevron-right" size={16} color={Colors.textMuted} />
              <Text style={styles.savedText}>Saved</Text>
              <View style={styles.savedIcon}>
                <Feather name="bookmark" size={20} color="#000" />
              </View>
            </Pressable>
          }
        />
      ) : (
        <FlatList
          data={ALBUM_IMAGES}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item }}
              style={styles.albumImage}
              contentFit="cover"
              transition={200}
            />
          )}
        />
      )}
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
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.base,
    paddingBottom: Spacing.sm,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    paddingBottom: 8,
  },
  notifBadge: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF4444',
    position: 'absolute',
    top: -2,
    left: 14,
  },
  headerTabs: {
    flexDirection: 'row',
    gap: Spacing.lg,
  },
  headerTab: {
    paddingBottom: Spacing.sm,
  },
  headerTabText: {
    color: Colors.textMuted,
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.semibold,
  },
  headerTabTextActive: {
    color: Colors.textPrimary,
  },
  headerTabUnderline: {
    height: 2,
    backgroundColor: Colors.textPrimary,
    borderRadius: 1,
    marginTop: 4,
  },
  savedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
  },
  savedIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Spacing.md,
  },
  savedText: {
    color: Colors.textPrimary,
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.medium,
    marginRight: 8,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
  },
  chatAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: Spacing.md,
  },
  chatContent: {
    flex: 1,
  },
  chatTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  chatName: {
    color: Colors.textPrimary,
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.semibold,
    textAlign: 'right',
  },
  chatTime: {
    color: Colors.textMuted,
    fontSize: Typography.sizes.xs,
  },
  chatPreview: {
    color: Colors.textSecondary,
    fontSize: Typography.sizes.sm,
    textAlign: 'right',
  },
  albumImage: {
    width: SCREEN_WIDTH / 2,
    height: SCREEN_WIDTH / 2 * 1.35,
  },
});
