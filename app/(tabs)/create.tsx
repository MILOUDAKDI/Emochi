// Powered by OnSpace.AI
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, Pressable, TextInput,
  ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors, Typography, Spacing, Radius } from '@/constants/theme';
import { useAlert } from '@/template';

export default function CreateScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { showAlert } = useAlert();

  const [name, setName] = useState('');
  const [intro, setIntro] = useState('');
  const [personality, setPersonality] = useState('');
  const [welcomeMsg, setWelcomeMsg] = useState('');
  const [scenario, setScenario] = useState('');
  const [examples, setExamples] = useState('');
  const [isPublic, setIsPublic] = useState(true);

  const handleNext = () => {
    if (!name.trim()) {
      showAlert('حقل مطلوب', 'يرجى إدخال اسم الشخصية');
      return;
    }
    if (!intro.trim()) {
      showAlert('حقل مطلوب', 'يرجى إدخال مقدمة الشخصية');
      return;
    }
    showAlert('تم الإنشاء!', `تم إنشاء شخصية "${name}" بنجاح`);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Feather name="x" size={22} color={Colors.textSecondary} />
        </Pressable>
        <Text style={styles.headerTitle}>Create Character</Text>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Feather name="chevron-left" size={22} color={Colors.textSecondary} />
        </Pressable>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Avatar */}
          <View style={styles.avatarSection}>
            <View style={styles.avatarWrapper}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80' }}
                style={styles.avatar}
                contentFit="cover"
                transition={200}
              />
              <View style={styles.avatarEdit}>
                <Feather name="camera" size={12} color="#fff" />
                <Text style={styles.avatarEditText}>Edit avatar</Text>
              </View>
            </View>
          </View>

          {/* Name */}
          <View style={styles.fieldGroup}>
            <View style={styles.fieldHeader}>
              <Text style={styles.charCount}>0/80</Text>
              <View style={styles.labelRow}>
                <Text style={styles.required}>*</Text>
                <Text style={styles.fieldLabel}>Name</Text>
              </View>
            </View>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={(t) => setName(t.slice(0, 80))}
              placeholderTextColor={Colors.textDim}
              textAlign="right"
              maxLength={80}
            />
          </View>

          {/* Intro */}
          <View style={styles.fieldGroup}>
            <View style={styles.labelRow}>
              <Text style={styles.required}>*</Text>
              <Text style={styles.fieldLabel}>Intro</Text>
            </View>
            <TextInput
              style={styles.textarea}
              value={intro}
              onChangeText={setIntro}
              multiline
              numberOfLines={4}
              placeholderTextColor={Colors.textDim}
              textAlign="right"
              textAlignVertical="top"
            />
            <Text style={styles.fieldHint}>
              This will be displayed in character cards and influence search, won&apos;t affect how character responds.
            </Text>
          </View>

          {/* Personality */}
          <View style={styles.fieldGroup}>
            <View style={styles.labelRow}>
              <Text style={styles.required}>*</Text>
              <Text style={styles.fieldLabel}>Personality</Text>
            </View>
            <TextInput
              style={styles.textarea}
              value={personality}
              onChangeText={setPersonality}
              multiline
              numberOfLines={4}
              placeholderTextColor={Colors.textDim}
              textAlign="right"
              textAlignVertical="top"
            />
            <Text style={styles.fieldHint}>
              Describe your character&apos;s persona. This defines how the character interacts with others.
            </Text>
          </View>

          {/* Welcome Message */}
          <View style={styles.fieldGroup}>
            <View style={styles.labelRow}>
              <Text style={styles.required}>*</Text>
              <Text style={styles.fieldLabel}>Welcome message</Text>
            </View>
            <TextInput
              style={styles.textarea}
              value={welcomeMsg}
              onChangeText={setWelcomeMsg}
              multiline
              numberOfLines={4}
              placeholderTextColor={Colors.textDim}
              textAlign="right"
              textAlignVertical="top"
            />
            <Text style={styles.fieldHint}>
              This sets the style character will communicate. Provide a lengthy and engaging welcome message to encourage longer responses.
            </Text>
          </View>

          {/* Permissions */}
          <View style={styles.fieldGroup}>
            <View style={styles.labelRow}>
              <Text style={styles.required}>*</Text>
              <Text style={styles.fieldLabel}>Permissions</Text>
            </View>
            <Text style={styles.fieldHint}>
              Other users will be able to create video content based on your character
            </Text>
            <View style={styles.permissionRow}>
              <Pressable
                style={[styles.permBtn, isPublic && styles.permBtnActive]}
                onPress={() => setIsPublic(true)}
              >
                {isPublic ? <Feather name="check" size={14} color="#000" /> : null}
                <Text style={[styles.permBtnText, isPublic && { color: '#000' }]}>Public</Text>
              </Pressable>
              <Pressable
                style={[styles.permBtn, !isPublic && styles.permBtnActive]}
                onPress={() => setIsPublic(false)}
              >
                <View style={styles.radioOuter}>
                  {!isPublic ? <View style={styles.radioInner} /> : null}
                </View>
                <Text style={[styles.permBtnText, !isPublic && { color: '#000' }]}>Private</Text>
              </Pressable>
            </View>
          </View>

          {/* Voice */}
          <Text style={styles.sectionTitle}>Voice</Text>
          <View style={styles.fieldGroup}>
            <Pressable style={styles.voiceRow}>
              <Feather name="chevron-right" size={16} color={Colors.textMuted} />
              <View style={styles.voiceInfo}>
                <Text style={styles.voiceName}>Narration</Text>
                <Text style={styles.voiceDesc}>Choose a voice for your narration</Text>
              </View>
              <View style={styles.voiceIcon}>
                <Feather name="mic" size={16} color={Colors.textSecondary} />
              </View>
            </Pressable>
            <Pressable style={[styles.voiceRow, { borderTopWidth: 0.5, borderTopColor: Colors.border }]}>
              <Feather name="chevron-right" size={16} color={Colors.textMuted} />
              <View style={styles.voiceInfo}>
                <Text style={styles.voiceName}>Character</Text>
                <Text style={styles.voiceDesc}>Choose a voice for your character</Text>
              </View>
              <View style={styles.voiceIcon}>
                <Feather name="mic" size={16} color={Colors.textSecondary} />
              </View>
            </Pressable>
          </View>

          {/* Tags */}
          <View style={styles.fieldGroup}>
            <Pressable style={styles.tagRow}>
              <Feather name="chevron-right" size={16} color={Colors.textMuted} />
              <Text style={styles.fieldLabel}>Tags</Text>
            </Pressable>
            <Text style={styles.fieldHint}>Tag the gender, species, and traits</Text>
            <Pressable style={styles.advancedRow}>
              <Text style={styles.advancedText}>Advanced settings</Text>
            </Pressable>
          </View>

          {/* Scenario */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Scenario</Text>
            <TextInput
              style={styles.textarea}
              value={scenario}
              onChangeText={setScenario}
              multiline
              numberOfLines={4}
              placeholderTextColor={Colors.textDim}
              textAlign="right"
              textAlignVertical="top"
            />
            <Text style={styles.fieldHint}>
              Describe the context and circumstances of your character and dialogue.
            </Text>
          </View>

          {/* Example Conversations */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Example conversations</Text>
            <TextInput
              style={styles.textarea}
              value={examples}
              onChangeText={setExamples}
              multiline
              numberOfLines={4}
              placeholderTextColor={Colors.textDim}
              textAlign="right"
              textAlignVertical="top"
            />
            <Text style={styles.fieldHint}>The bot&apos;s speech style or tone</Text>
          </View>

          <Text style={styles.disclaimer}>
            This content may contain elements that violate platform safety policies. Emochi may automatically modify certain elements to comply with platform guidelines.
          </Text>

          {/* Next Button */}
          <Pressable style={styles.nextBtn} onPress={handleNext}>
            <Text style={styles.nextBtnText}>Next</Text>
          </Pressable>

          <View style={{ height: 32 }} />
        </ScrollView>
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
    paddingVertical: Spacing.md,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    color: Colors.textPrimary,
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.semibold,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.lg,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 2,
    borderColor: Colors.border,
  },
  avatarEdit: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.65)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    borderBottomLeftRadius: 44,
    borderBottomRightRadius: 44,
    gap: 4,
  },
  avatarEditText: {
    color: '#fff',
    fontSize: 10,
  },
  fieldGroup: {
    marginBottom: Spacing.lg,
  },
  fieldHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 6,
    gap: 3,
  },
  required: {
    color: Colors.danger,
    fontSize: Typography.sizes.base,
  },
  fieldLabel: {
    color: Colors.textPrimary,
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.medium,
  },
  charCount: {
    color: Colors.textMuted,
    fontSize: Typography.sizes.xs,
  },
  input: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    color: Colors.textPrimary,
    fontSize: Typography.sizes.base,
    borderWidth: 0.5,
    borderColor: Colors.border,
  },
  textarea: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    color: Colors.textPrimary,
    fontSize: Typography.sizes.base,
    borderWidth: 0.5,
    borderColor: Colors.border,
    minHeight: 100,
  },
  fieldHint: {
    color: Colors.textMuted,
    fontSize: Typography.sizes.xs,
    marginTop: 6,
    textAlign: 'right',
    lineHeight: 16,
  },
  permissionRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
  permBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 6,
  },
  permBtnActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  permBtnText: {
    color: Colors.textPrimary,
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.medium,
  },
  radioOuter: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: Colors.textSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#000',
  },
  sectionTitle: {
    color: Colors.textPrimary,
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    marginBottom: Spacing.sm,
    textAlign: 'right',
  },
  voiceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
    borderRadius: Radius.md,
  },
  voiceIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  voiceInfo: {
    flex: 1,
    alignItems: 'flex-end',
  },
  voiceName: {
    color: Colors.textPrimary,
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.medium,
  },
  voiceDesc: {
    color: Colors.textMuted,
    fontSize: Typography.sizes.xs,
    marginTop: 2,
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 4,
    gap: 6,
  },
  advancedRow: {
    marginTop: Spacing.sm,
    alignItems: 'flex-end',
  },
  advancedText: {
    color: Colors.textMuted,
    fontSize: Typography.sizes.sm,
    textDecorationLine: 'underline',
  },
  disclaimer: {
    color: Colors.textMuted,
    fontSize: Typography.sizes.xs,
    textAlign: 'center',
    lineHeight: 16,
    marginBottom: Spacing.lg,
  },
  nextBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    paddingVertical: Spacing.base,
    alignItems: 'center',
  },
  nextBtnText: {
    color: '#000',
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.bold,
  },
});
