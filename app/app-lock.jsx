import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Font } from "../constant/fonts";
import { useTranslation } from "react-i18next";

const AppLock = () => {
  const router = useRouter();
  const { t } = useTranslation();
  
  // Note: Using translated strings as keys/values for selection state might generate mismatches 
  // if language changes while screen is active, but for now we follow the existing pattern.
  // Ideally, use stable IDs (e.g., 'off', 'password') for state and translate only for display.
  // Here we will stick to the requested task of replacing strings.
  
  const options = [
    t("appLock.off"), 
    t("appLock.password"), 
    t("appLock.faceId"), 
    t("appLock.fingerPrint")
  ];
  
  const [selectedOption, setSelectedOption] = useState(options[0]); 

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
            <React.Fragment key={index}>
              <TouchableOpacity
                style={styles.optionItem}
                onPress={() => setSelectedOption(option)}
                activeOpacity={0.7}>
                <Text style={styles.optionText}>{option}</Text>
                <View style={styles.radioContainer}>
                  {selectedOption === option ? (
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
    backgroundColor: "#34C759", // Green color
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
