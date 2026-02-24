import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Switch,
  ScrollView,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
import { Stack, useRouter } from "expo-router";
import { Ionicons, Feather } from "@expo/vector-icons";
import { Font } from "../constant/fonts";
import useThemeStore from "../store/useThemeStore";
import useColors from "../hooks/useColors";

const SettingToggle = ({ label, value, onValueChange, activeColor, colors, styles }) => (
  <View style={styles.settingItem}>
    <Text style={[styles.settingLabel, { color: colors["--text-color"] }]}>{label}</Text>
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: "#D1D1D6", true: activeColor || "#34C759" }}
      thumbColor="#fff"
      ios_backgroundColor="#D1D1D6"
    />
  </View>
);

const SettingLink = ({ label, onPress, colors, styles }) => (
  <TouchableOpacity style={styles.settingItem} onPress={onPress}>
    <Text style={[styles.settingLabel, { color: colors["--text-color"] }]}>{label}</Text>
    <Feather name="chevron-right" size={24} color={colors["--placeholder-color"]} />
  </TouchableOpacity>
);

import { useTranslation } from "react-i18next";


const Settings = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const colors = useColors();
  const styles = getStyles(colors);

  const { isDarkMode, toggleTheme } = useThemeStore();

  const handleToggleTheme = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    toggleTheme();
  };

  const [notifications, setNotifications] = useState(true);
  const [location, setLocation] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={colors["--text-color"]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t("settings.title")}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <SettingToggle
            label={t("settings.notifications")}
            value={notifications}
            onValueChange={setNotifications}
            activeColor="#4CD964"
            colors={colors}
            styles={styles}
          />
          <View style={styles.separator} />
          
          <SettingToggle
            label={t("settings.location")}
            value={location}
            onValueChange={setLocation}
            activeColor="#8E8E93"
            colors={colors}
            styles={styles}
          />
          <View style={styles.separator} />

          <SettingToggle
            label={t("settings.theme")}
            value={isDarkMode}
            onValueChange={handleToggleTheme}
            activeColor="#FFCC00"
            colors={colors}
            styles={styles}
          />
          <View style={styles.separator} />

          <SettingLink
            label={t("settings.appLock")}
            onPress={() => router.push("/app-lock")}
            colors={colors}
            styles={styles}
          />
          <View style={styles.separator} />

          <SettingLink
            label={t("settings.permissions")}
            onPress={() => router.push("/permissions")}
            colors={colors}
            styles={styles}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;

const getStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors["--bg-white"],
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: Font.bold,
    color: colors["--text-color"],
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  settingLabel: {
    fontSize: 18,
    fontFamily: Font.regular,
    color: colors["--text-color"],
  },
  separator: {
    height: 1,
    backgroundColor: colors["--border-color"],
    width: "100%",
  },
});
