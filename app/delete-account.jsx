import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Font } from "../constant/fonts";

const reasons = [
  { id: "1", label: "Tətbiq mənə gözlədiyim faydanı vermir." },
  { id: "2", label: "Nooshet telefonumu yavaşladır." },
  { id: "3", label: "Tətbiqi istidada edərkən özümü təhlükəsiz hiss etmirəm." },
  { id: "4", label: "Gizlilik ilə əlaqədar narahatam." },
  {
    id: "5",
    label: "Bildirişlər məni narahat edir",
    subtext:
      "Bildirişləri tənzimləmələrdən bağlayaraq tətbiqi daha rahat istifadə edə bilərsiniz.",
  },
  { id: "6", label: "Digər" },
];

const DeleteAccount = () => {
  const router = useRouter();
  const [selectedReason, setSelectedReason] = useState("5"); // Default as per design

  const RadioButton = ({ id, label, subtext, isSelected, onSelect }) => (
    <TouchableOpacity
      style={styles.reasonItem}
      onPress={() => onSelect(id)}
      activeOpacity={0.7}>
      <View style={[styles.radio, isSelected && styles.radioSelected]}>
        {isSelected && <View style={styles.radioInner} />}
      </View>
      <View style={styles.reasonTextContainer}>
        <Text
          style={[
            styles.reasonLabel,
            isSelected && styles.reasonLabelSelected,
          ]}>
          {label}
        </Text>
        {subtext && isSelected && (
          <Text style={styles.reasonSubtext}>{subtext}</Text>
        )}
      </View>
    </TouchableOpacity>
  );

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
        <Text style={styles.headerTitle}>Hesabı redaktə edin</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>
          Hesabı silmək istədiyinizdən əminsinizmi?
        </Text>

        <Text style={styles.description}>
          Hesabı silmək istəməyinizdən məyyus olduq. Siz hesabınızı sildikdən
          sonra hesab məlumatlarınız da silinəcək. Zəhmət olmasa hesabı silmə
          səbəbinizi bizimlə bölüşün ki, hər hansısa çətinliyiniz yaranıbsa,
          gələcəkdə istifadəçilərin istifadəsini asanlaşdırmaq üçün yeniliklər
          edək.
        </Text>

        <View style={styles.reasonsContainer}>
          {reasons.map((reason) => (
            <RadioButton
              key={reason.id}
              id={reason.id}
              label={reason.label}
              subtext={reason.subtext}
              isSelected={selectedReason === reason.id}
              onSelect={setSelectedReason}
            />
          ))}
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>Hesabı sil</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => router.back()}>
            <Text style={styles.cancelButtonText}>Ləğv et</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DeleteAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
       paddingTop: 50,
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
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  title: {
    fontSize: 16,
    fontFamily: Font.medium,
    color: "#0B0E0B",
    marginTop: 26,
    marginBottom: 11,
  },
  description: {
    fontSize: 14,
    color: "#A29E9E",
    lineHeight: 20,
    fontFamily: Font.regular,
    marginBottom: 24,
  },
  reasonsContainer: {
    marginBottom: 40,
  },
  reasonItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#0B0E0B",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    marginTop: 2,
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
  reasonTextContainer: {
    flex: 1,
  },
  reasonLabel: {
    fontSize: 16,
    color: "#0B0E0B",
    fontFamily: Font.regular,
    lineHeight: 22,
  },
  reasonLabelSelected: {
    fontFamily: Font.medium,
  },
  reasonSubtext: {
    fontSize: 12,
    color: "#08A30D",
    fontFamily: Font.regular,
    marginTop: 4,
    lineHeight: 16,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    marginTop: "auto",
  },
  deleteButton: {
    flex: 1,
    backgroundColor: "#FF0000",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: Font.bold,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#FF0000",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#FF0000",
    fontSize: 18,
    fontFamily: Font.bold,
  },
});
