// Powered by OnSpace.AI
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, Pressable, ScrollView, Switch,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors, Typography, Spacing, Radius } from '@/constants/theme';
import { useAlert } from '@/template';

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { showAlert } = useAlert();

  const [notifications, setNotifications] = useState(true);
  const [vibration, setVibration] = useState(true);
  const [autoVoice, setAutoVoice] = useState(false);

  const RowArrow = ({ label, value }: { label: string; value?: string }) => (
    <Pressable style={styles.settingRow} onPress={() => {}}>
      <Feather name="chevron-right" size={16} color={Colors.textMuted} />
      {value ? <Text style={styles.settingValue}>{value}</Text> : null}
      <Text style={styles.settingLabel}>{label}</Text>
    </Pressable>
  );

  const RowToggle = ({
    label, value, onChange,
  }: { label: string; value: boolean; onChange: (v: boolean) => void }) => (
    <View style={styles.settingRow}>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: Colors.border, true: Colors.primary }}
        thumbColor="#fff"
      />
      <Text style={styles.settingLabel}>{label}</Text>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <View />
        <Text style={styles.headerTitle}>الإعدادات</Text>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Feather name="chevron-left" size={22} color={Colors.textSecondary} />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Personalization */}
        <Text style={styles.sectionHeader}>التخصيص</Text>
        <View style={styles.card}>
          <RowArrow label="تفضيلات المحتوى" />
          <View style={styles.divider} />
          <RowArrow label="Language" value="العربية" />
          <View style={styles.divider} />
          <RowArrow label="قائمة الحظر" />
        </View>

        {/* Notifications */}
        <Text style={styles.sectionHeader}>الإشعارات</Text>
        <View style={styles.card}>
          <RowToggle
            label="تفعيل الإشعارات"
            value={notifications}
            onChange={setNotifications}
          />
          <View style={styles.divider} />
          <RowToggle
            label="اهتزاز الرسائل الجديدة"
            value={vibration}
            onChange={setVibration}
          />
        </View>

        {/* Chat Features */}
        <Text style={styles.sectionHeader}>ميزات الدردشة</Text>
        <View style={styles.card}>
          <RowToggle
            label="تشغيل الصوت تلقائياً"
            value={autoVoice}
            onChange={setAutoVoice}
          />
        </View>

        {/* AI Provider */}
        <Text style={styles.sectionHeader}>مزود الخدمة والذكاء الاصطناعي</Text>
        <View style={styles.card}>
          <Pressable style={styles.apiRow}>
            <Feather name="chevron-right" size={16} color={Colors.textMuted} />
            <View style={styles.apiInfo}>
              <Text style={styles.apiSubtitle}>Gemini, Grok, OpenAI</Text>
              <Text style={styles.apiTitle}>(API) إعدادات مزود الخدمة</Text>
            </View>
            <View style={styles.apiBadge}>
              <Text style={styles.apiBadgeText}>API</Text>
            </View>
          </Pressable>
        </View>

        {/* Feedback */}
        <Text style={styles.sectionHeader}>ملاحظات</Text>
        <View style={styles.card}>
          <RowArrow label="بلاغ خلل" />
          <View style={styles.divider} />
          <RowArrow label="طلب ميزة" />
          <View style={styles.divider} />
          <RowArrow label="استبيان" />
          <View style={styles.divider} />
          <RowArrow label="انضم إلى Discord" />
        </View>

        {/* Account */}
        <Text style={styles.sectionHeader}>الحساب</Text>
        <View style={styles.card}>
          <Pressable
            style={styles.settingRow}
            onPress={() => showAlert('تسجيل الخروج', 'هل أنت متأكد من تسجيل الخروج؟', [
              { text: 'إلغاء', style: 'cancel' },
              { text: 'خروج', style: 'destructive', onPress: () => {} },
            ])}
          >
            <Feather name="chevron-right" size={16} color={Colors.textMuted} />
            <Text style={[styles.settingLabel, { color: Colors.danger }]}>تسجيل الخروج</Text>
          </Pressable>
          <View style={styles.divider} />
          <RowArrow label="حول" />
          <View style={styles.divider} />
          <RowArrow label="تشخيص الشبكة" />
        </View>

        <Text style={styles.versionText}>Emochi v2.2.8</Text>
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
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    color: Colors.textPrimary,
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.semibold,
  },
  sectionHeader: {
    color: Colors.textMuted,
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.medium,
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.sm,
    textAlign: 'right',
  },
  card: {
    marginHorizontal: Spacing.base,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 0.5,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
  },
  settingLabel: {
    flex: 1,
    color: Colors.textPrimary,
    fontSize: Typography.sizes.base,
    textAlign: 'right',
  },
  settingValue: {
    color: Colors.textMuted,
    fontSize: Typography.sizes.base,
  },
  divider: {
    height: 0.5,
    backgroundColor: Colors.border,
    marginHorizontal: Spacing.base,
  },
  apiRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
  },
  apiBadge: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  apiBadgeText: {
    color: '#000',
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
  },
  apiInfo: {
    flex: 1,
    alignItems: 'flex-end',
  },
  apiTitle: {
    color: Colors.textPrimary,
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.medium,
  },
  apiSubtitle: {
    color: Colors.textMuted,
    fontSize: Typography.sizes.xs,
    marginTop: 2,
  },
  versionText: {
    color: Colors.textMuted,
    fontSize: Typography.sizes.xs,
    textAlign: 'center',
    paddingTop: Spacing.xl,
  },
});
