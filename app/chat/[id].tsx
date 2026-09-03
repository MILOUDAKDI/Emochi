// Powered by OnSpace.AI
import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, Pressable, TextInput,
  FlatList, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Colors, Typography, Spacing, Radius } from '@/constants/theme';
import { CHAT_LIST, FEATURED_CHARACTERS } from '@/constants/data';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  time: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    text: '*تبتسم ببطء وتميل برأسها قليلاً نحوك*\n\nلوجودك هنا بجاني. كلامك ترك أثراً جميلاً داخلي...',
    isUser: false,
    time: '1h',
  },
];

export default function ChatScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const flatRef = useRef<FlatList>(null);

  const chat = CHAT_LIST.find((c) => c.id === id) || CHAT_LIST[0];
  const character = FEATURED_CHARACTERS.find((c) => c.id === id) || FEATURED_CHARACTERS[1];

  const AI_REPLIES = [
    '*تنظر إليك بعيون مشرقة*\n\nكلامك يجعلني أشعر بدفء غريب...',
    '*تضحك بخجل وتبعد نظرها قليلاً*\n\nلم أتوقع أن أسمع هذا منك اليوم...',
    '*تقترب منك ببطء وتهمس*\n\nأتعلم... كنت أفكر فيك طوال اليوم...',
    '*تميل على كتفك برفق*\n\nالوقت يمر بسرعة عندما نكون معاً...',
  ];

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      isUser: true,
      time: 'الآن',
    };
    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      text: AI_REPLIES[Math.floor(Math.random() * AI_REPLIES.length)],
      isUser: false,
      time: 'الآن',
    };
    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setInput('');
    setTimeout(() => flatRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[styles.msgRow, item.isUser && styles.msgRowUser]}>
      {!item.isUser ? (
        <Image
          source={{ uri: chat.imageUrl }}
          style={styles.msgAvatar}
          contentFit="cover"
          transition={200}
        />
      ) : null}
      <View style={[styles.bubble, item.isUser ? styles.bubbleUser : styles.bubbleAI]}>
        <Text style={[styles.bubbleText, item.isUser && { color: '#000' }]}>
          {item.text}
        </Text>
        <Text style={[styles.bubbleTime, item.isUser && { color: 'rgba(0,0,0,0.5)' }]}>
          {item.time}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRight}>
          <Feather name="more-horizontal" size={22} color={Colors.textSecondary} />
          <Feather name="image" size={22} color={Colors.textSecondary} style={{ marginLeft: 12 }} />
        </View>
        <Pressable style={styles.headerCenter}>
          <Image
            source={{ uri: chat.imageUrl }}
            style={styles.headerAvatar}
            contentFit="cover"
            transition={200}
          />
          <View>
            <Text style={styles.headerName}>{chat.characterName}</Text>
            <Text style={styles.headerOnline}>Online</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => router.back()} style={styles.backBtn} hitSlop={8}>
          <Feather name="chevron-left" size={24} color={Colors.textSecondary} />
        </Pressable>
      </View>

      {/* Messages */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <FlatList
          ref={flatRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.messageList}
          showsVerticalScrollIndicator={false}
        />

        {/* Input */}
        <View style={[styles.inputBar, { paddingBottom: insets.bottom + 8 }]}>
          <Pressable style={styles.voiceBtn}>
            <Feather name="mic" size={20} color={Colors.textSecondary} />
          </Pressable>
          <TextInput
            style={styles.textInput}
            value={input}
            onChangeText={setInput}
            placeholder="اكتب رسالة..."
            placeholderTextColor={Colors.textMuted}
            textAlign="right"
            multiline
            maxLength={500}
          />
          <Pressable
            style={[styles.sendBtn, input.trim() && styles.sendBtnActive]}
            onPress={sendMessage}
          >
            <Feather
              name="send"
              size={18}
              color={input.trim() ? '#000' : Colors.textMuted}
            />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
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
    paddingVertical: Spacing.sm,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
  },
  backBtn: {
    width: 36,
    alignItems: 'flex-start',
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  headerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  headerName: {
    color: Colors.textPrimary,
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    textAlign: 'right',
  },
  headerOnline: {
    color: Colors.success,
    fontSize: Typography.sizes.xs,
    textAlign: 'right',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageList: {
    padding: Spacing.base,
    paddingBottom: 8,
  },
  msgRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  msgRowUser: {
    flexDirection: 'row-reverse',
  },
  msgAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  bubble: {
    maxWidth: '75%',
    borderRadius: Radius.lg,
    padding: Spacing.md,
  },
  bubbleAI: {
    backgroundColor: Colors.surface,
    borderBottomLeftRadius: 4,
  },
  bubbleUser: {
    backgroundColor: Colors.primary,
    borderBottomRightRadius: 4,
  },
  bubbleText: {
    color: Colors.textPrimary,
    fontSize: Typography.sizes.base,
    lineHeight: 22,
    textAlign: 'right',
  },
  bubbleTime: {
    color: Colors.textMuted,
    fontSize: Typography.sizes.xs,
    marginTop: 4,
    textAlign: 'right',
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: Spacing.sm,
    paddingTop: Spacing.sm,
    borderTopWidth: 0.5,
    borderTopColor: Colors.border,
    backgroundColor: Colors.background,
    gap: Spacing.sm,
  },
  voiceBtn: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    color: Colors.textPrimary,
    fontSize: Typography.sizes.base,
    maxHeight: 120,
    borderWidth: 0.5,
    borderColor: Colors.border,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnActive: {
    backgroundColor: Colors.primary,
  },
});
