
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

const languages = [
  { id: "az", labelKey: "language.az" },
  { id: "en", labelKey: "language.en" },
  { id: "ru", labelKey: "language.ru" },
];

const LanguageSelection = () => {
  
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const [selected, setSelected] = useState(i18n.language);

  React.useEffect(() => {
      setSelected(i18n.language);
  }, [i18n.language]);

  const RadioButton = ({ id, label, isSelected, onSelect }) => (
    <TouchableOpacity
      style={styles.languageItem}
      onPress={() => onSelect(id)}
      activeOpacity={0.7}>
      <Text
        style={[
          styles.languageLabel,
          isSelected && styles.languageLabelSelected,
        ]}>
        {label}
      </Text>
      <View style={[styles.radio, isSelected && styles.radioSelected]}>
        {isSelected && <View style={styles.radioInner} />}
      </View>
    </TouchableOpacity>
  );

  const handleSave = () => {
    i18n.changeLanguage(selected);
    router.back();
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
        <Text style={styles.headerTitle}>{t("language.title")}</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>{t("language.suggested")}</Text>

        <View style={styles.languagesContainer}>
          {languages.map((lang) => (
            <RadioButton
              key={lang.id}
              id={lang.id}
              label={t(lang.labelKey)}
              isSelected={selected === lang.id}
              onSelect={setSelected}
            />
          ))}
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>{t("common.save")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LanguageSelection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
    paddingBottom: 30,
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
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Font.semibold,
    color: "#0B0E0B",
    marginTop: 15.5,
    marginBottom: 11,
  },
  languagesContainer: {
    flex: 1,
  },
  languageItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    marginBottom: 12,
  },
  languageLabel: {
    fontSize: 16,
    fontFamily: Font.regular,
    color: "#0B0E0B",
  },
  languageLabelSelected: {
    fontFamily: Font.medium,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#0B0E0B",
    justifyContent: "center",
    alignItems: "center",
  },
  radioSelected: {
    borderColor: "#08A30D",
  },
  radioInner: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#08A30D",
  },
  footer: {
    paddingBottom: 40,
  },
  saveButton: {
    backgroundColor: "#08A30D",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: Font.bold,
  },
});
