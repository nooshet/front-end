import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Switch,
  ScrollView,
  Linking,
  Alert,
  AppState,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Font } from "../constant/fonts";
import { useTranslation } from "react-i18next";
import { useCameraPermissions, useMicrophonePermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

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
  const { t } = useTranslation();

  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [micPermission, requestMicPermission] = useMicrophonePermissions();
  const [galleryPermission, requestGalleryPermission] = ImagePicker.useMediaLibraryPermissions();

  const [camera, setCamera] = useState(false);
  const [microphone, setMicrophone] = useState(false);
  const [gallery, setGallery] = useState(false);

  // Sync state with permission status
  const syncPermissions = useCallback(() => {
    setCamera(cameraPermission?.granted || false);
    setMicrophone(micPermission?.granted || false);
    setGallery(galleryPermission?.granted || false);
  }, [cameraPermission, micPermission, galleryPermission]);

  useEffect(() => {
    syncPermissions();
  }, [syncPermissions]);

  // Handle app state changes (user might return from settings)
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState === "active") {
        // Refresh permissions when returning to app
        // Note: the hooks refresh automatically if they are top-level, 
        // but we might need to manually trigger sync if they don't update immediately.
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const openSettings = () => {
    Linking.openSettings();
  };

  const handleToggle = async (type, value) => {
    // If turning OFF, tell user they must go to settings
    if (!value) {
      Alert.alert(
        t("editProfile.permissionTitle"),
        t("editProfile.permissionMsg"), // Or a more specific message about revoking
        [
          { text: t("common.cancel"), style: "cancel" },
          { text: t("profile.menu.settings"), onPress: openSettings },
        ]
      );
      // We can't actually programmatically revoke, so we keep the toggle state until synced
      return;
    }

    // If turning ON
    try {
      if (type === "camera") {
        const result = await requestCameraPermission();
        if (!result.granted && !result.canAskAgain) {
          openSettingsAlert();
        }
      } else if (type === "microphone") {
        const result = await requestMicPermission();
        if (!result.granted && !result.canAskAgain) {
          openSettingsAlert();
        }
      } else if (type === "gallery") {
        const result = await requestGalleryPermission();
        if (!result.granted && !result.canAskAgain) {
          openSettingsAlert();
        }
      }
    } catch (error) {
      console.error(`Error requesting ${type} permission:`, error);
    }
  };

  const openSettingsAlert = () => {
    Alert.alert(
      t("editProfile.permissionTitle"),
      t("editProfile.permissionMsg"),
      [
        { text: t("common.cancel"), style: "cancel" },
        { text: t("profile.menu.settings"), onPress: openSettings },
      ]
    );
  };

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
        <Text style={styles.headerTitle}>{t("permissions.title")}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <PermissionToggle
            label={t("permissions.camera")}
            value={camera}
            onValueChange={(val) => handleToggle("camera", val)}
          />
          <View style={styles.separator} />

          <PermissionToggle
            label={t("permissions.microphone")}
            value={microphone}
            onValueChange={(val) => handleToggle("microphone", val)}
          />
          <View style={styles.separator} />

          <PermissionToggle
            label={t("permissions.gallery")}
            value={gallery}
            onValueChange={(val) => handleToggle("gallery", val)}
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

