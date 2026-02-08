import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Switch,
  ScrollView,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { Ionicons, Feather } from "@expo/vector-icons";
import { Font } from "../constant/fonts";

const SettingToggle = ({ label, value, onValueChange, activeColor }) => (
  <View style={styles.settingItem}>
    <Text style={styles.settingLabel}>{label}</Text>
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: "#D1D1D6", true: activeColor || "#34C759" }}
      thumbColor="#fff"
      ios_backgroundColor="#D1D1D6"
    />
  </View>
);

const SettingLink = ({ label, onPress }) => (
  <TouchableOpacity style={styles.settingItem} onPress={onPress}>
    <Text style={styles.settingLabel}>{label}</Text>
    <Feather name="chevron-right" size={24} color="#C7C7CC" />
  </TouchableOpacity>
);

const Settings = () => {
  const router = useRouter();

  const [notifications, setNotifications] = useState(true);
  const [location, setLocation] = useState(false);
  const [theme, setTheme] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#0B0E0B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Parametrlər</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <SettingToggle
            label="Bildirişlər"
            value={notifications}
            onValueChange={setNotifications}
            activeColor="#4CD964"
          />
          <View style={styles.separator} />
          
          <SettingToggle
            label="Yerləşmə icazəsi"
            value={location}
            onValueChange={setLocation}
            activeColor="#8E8E93"
          />
          <View style={styles.separator} />

          <SettingToggle
            label="Tema (seçilmiş)"
            value={theme}
            onValueChange={setTheme}
            activeColor="#FFCC00"
          />
          <View style={styles.separator} />

          <SettingLink label="Tətbiq kilidi" />
          <View style={styles.separator} />

          <SettingLink label="İcazələr" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    color: "#0B0E0B",
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
    color: "#0B0E0B",
  },
  separator: {
    height: 1,
    backgroundColor: "#E5E5EA",
    width: "100%",
  },
});
