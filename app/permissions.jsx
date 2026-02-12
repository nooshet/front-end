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
import { Ionicons } from "@expo/vector-icons";
import { Font } from "../constant/fonts";

const PermissionToggle = ({ label, value, onValueChange }) => (
  <View style={styles.permissionItem}>
    <Text style={styles.permissionLabel}>{label}</Text>
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: "#D1D1D6", true: "#34C759" }} 
      thumbColor="#fff"
      ios_backgroundColor="#D1D1D6"
    />
  </View>
);

const Permissions = () => {
  const router = useRouter();
  const [camera, setCamera] = useState(false);
  const [microphone, setMicrophone] = useState(false);
  const [gallery, setGallery] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={24} color="#0B0E0B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>İcazələr</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <PermissionToggle
            label="Kamera"
            value={camera}
            onValueChange={setCamera}
          />
          <View style={styles.separator} />

          <PermissionToggle
            label="Mikrofon"
            value={microphone}
            onValueChange={setMicrophone}
          />
          <View style={styles.separator} />

          <PermissionToggle
            label="Qalereya"
            value={gallery}
            onValueChange={setGallery}
          />
          <View style={styles.separator} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Permissions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
       paddingTop: 40,
    paddingBottom: 50,
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
    paddingTop: 20,
  },
  section: {
    paddingHorizontal: 20,
  },
  permissionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  permissionLabel: {
    fontSize: 18,
    fontFamily: Font.regular,
    color: "#0B0E0B",
  },
  separator: {
    height: 1,
    backgroundColor: "#E5E5EA",
  },
});
