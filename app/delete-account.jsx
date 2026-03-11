import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Font } from "../constant/fonts";
import { useTranslation } from "react-i18next";
import useUserStore from "../store/useUserStore";

const DeleteAccount = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { deleteAccount, isLoading } = useUserStore();
  const [selectedReason, setSelectedReason] = useState("5"); // Default as per design

  const reasons = [
    { id: "1", label: t("deleteAccount.reason1") },
    { id: "2", label: t("deleteAccount.reason2") },
    { id: "3", label: t("deleteAccount.reason3") },
    { id: "4", label: t("deleteAccount.reason4") },
    {
      id: "5",
      label: t("deleteAccount.reason5"),
      subtext: t("deleteAccount.reason5Sub"),
    },
    { id: "6", label: t("deleteAccount.reason6") },
  ];

  const handleDelete = () => {
    Alert.alert(
      t("deleteAccount.confirmTitle"),
      t("deleteAccount.confirmMsg"),
      [
        {
          text: t("common.cancel"),
          style: "cancel",
        },
        {
          text: t("common.delete"),
          style: "destructive",
          onPress: async () => {
            try {
              await deleteAccount();
              Alert.alert(t("common.success"), t("deleteAccount.success"));
              // The store's deleteAccount calls logout(), which should ideally trigger a redirect 
              // but we can also manually navigate if needed.
              // Assuming the root layout handles redirection based on auth state.
              router.replace("/(auth)/login");
            } catch (error) {
              Alert.alert(t("common.error"), error.message || t("deleteAccount.error"));
            }
          },
        },
      ]
    );
  };

  const RadioButton = ({ id, label, subtext, isSelected, onSelect }) => (
    <TouchableOpacity
      style={styles.reasonItem}
      onPress={() => onSelect(id)}
      activeOpacity={0.7}
      disabled={isLoading}>
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
          style={styles.backButton}
          disabled={isLoading}>
          <Ionicons name="chevron-back" size={24} color="#0B0E0B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t("editProfile.title")}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>
          {t("deleteAccount.title")}
        </Text>

        <Text style={styles.description}>
          {t("deleteAccount.description")}
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
          <TouchableOpacity 
            style={[styles.deleteButton, isLoading && { opacity: 0.7 }]} 
            onPress={handleDelete}
            disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.deleteButtonText}>{t("editProfile.deleteAccount")}</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => router.back()}
            disabled={isLoading}>
            <Text style={styles.cancelButtonText}>{t("common.cancel")}</Text>
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
