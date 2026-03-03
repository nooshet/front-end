import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  Platform,
  AppState,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Font } from "../constant/fonts";
import { useTranslation } from "react-i18next";
import * as LocalAuthentication from "expo-local-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AppLock = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const [selectedOption, setSelectedOption] = useState("off");
  
  // Filter options by platform
  const options = [
    { id: "off", label: t("appLock.off") },
    { id: "password", label: t("appLock.password") },
    { id: "faceId", label: t("appLock.faceId") },
    ...(Platform.OS === "android" ? [{ id: "fingerprint", label: t("appLock.fingerPrint") }] : []),
  ];

  const loadSettings = useCallback(async () => {
    try {
      const savedLock = await AsyncStorage.getItem("appLockType");
      if (savedLock) {
        setSelectedOption(savedLock);
      }
    } catch (error) {
      console.error("Failed to load app lock settings", error);
    }
  }, []);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  // Sync when returning to screen
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState === "active") {
        loadSettings();
      }
    });
    return () => subscription.remove();
  }, [loadSettings]);

  const handleOptionSelect = async (optionId) => {
    if (optionId === "off") {
      saveOption(optionId);
      return;
    }

    if (optionId === "password") {
      router.push("/set-lock-code");
      return;
    }

    if (optionId === "faceId" || optionId === "fingerprint") {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!hasHardware || !isEnrolled) {
        Alert.alert(
          t("common.error"),
          optionId === "faceId" 
            ? "Cihazınızda Face ID dəstəklənmir və ya quraşdırılmayıb." 
            : "Cihazınızda Barmaq izi dəstəklənmir və ya quraşdırılmayıb."
        );
        return;
      }

      // Instead of just verifying, we navigate to a "setup/confirm" screen if needed,
      // but usually biometrics just need a verify-to-enable step.
      // For consistency with user request, we'll verify and save.
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: t("appLock.title"),
        fallbackLabel: t("appLock.password"),
      });

      if (result.success) {
        saveOption(optionId);
        Alert.alert(t("common.success"), `${t(`appLock.${optionId === 'faceId' ? 'faceId' : 'fingerPrint'}`)} aktivləşdirildi.`);
      } else {
        // Authenticate failed or cancelled
      }
      return;
    }
  };

  const saveOption = async (optionId) => {
    try {
      await AsyncStorage.setItem("appLockType", optionId);
      setSelectedOption(optionId);
    } catch (error) {
      console.error("Failed to save app lock setting", error);
    }
  };

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
        <Text style={styles.headerTitle}>{t("appLock.title")}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.optionsList}>
          {options.map((option, index) => (
            <React.Fragment key={option.id}>
              <TouchableOpacity
                style={styles.optionItem}
                onPress={() => handleOptionSelect(option.id)}
                activeOpacity={0.7}>
                <Text style={styles.optionText}>{option.label}</Text>
                <View style={styles.radioContainer}>
                  {selectedOption === option.id ? (
                    <View style={styles.radioSelected}>
                      <View style={styles.radioInner} />
                    </View>
                  ) : (
                    <View style={styles.radioUnselected} />
                  )}
                </View>
              </TouchableOpacity>
              {index < options.length - 1 && <View style={styles.separator} />}
            </React.Fragment>
          ))}
          <View style={styles.separator} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AppLock;

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
    paddingTop: 30,
  },
  optionsList: {
    paddingHorizontal: 20,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 18,
  },
  optionText: {
    fontSize: 16,
    fontFamily: Font.regular,
    color: "#0B0E0B",
  },
  radioContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  radioSelected: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#34C759",
    alignItems: "center",
    justifyContent: "center",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  radioUnselected: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#0B0E0B",
  },
  separator: {
    height: 1,
    backgroundColor: "#E5E5EA",
  },
});

