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
import { ALL_COLOR } from "../constant/all-color";
import Button from "../components/Button";

const ChangeStatus = () => {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState("aspaz"); 

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
        <Text style={styles.headerTitle}>Statusun dəyişməsi</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.questionText}>
          İstifadəçi statusunuzu dəyişmək istədiyinizdən əminsinizmi?
        </Text>

        <View style={styles.optionsContainer}>
          {/* Chef Option */}
          <TouchableOpacity
            style={styles.optionItem}
            onPress={() => setSelectedRole("aspaz")}
            activeOpacity={0.8}>
            <View style={styles.radioContainer}>
              <View
                style={[
                  styles.radioOuter,
                  selectedRole === "aspaz" && styles.radioActive,
                ]}>
                {selectedRole === "aspaz" && <View style={styles.radioInner} />}
              </View>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.optionTitle}>Aşpaz kimi davam et</Text>
              {selectedRole === "aspaz" && (
                <Text style={styles.optionDescription}>
                  Aşpaz olmağı seçdikdə siz yenidən qeydiyyatdan keçib
                  məlumatlarınızı daha ətraflı daxil edəcəksiniz.
                </Text>
              )}
            </View>
          </TouchableOpacity>

          {/* Courier Option */}
          <TouchableOpacity
            style={styles.optionItem}
            onPress={() => setSelectedRole("kurye")}
            activeOpacity={0.8}>
            <View style={styles.radioContainer}>
              <View
                style={[
                  styles.radioOuter,
                  selectedRole === "kurye" && styles.radioActive,
                ]}>
                {selectedRole === "kurye" && <View style={styles.radioInner} />}
              </View>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.optionTitle}>Kurye kimi davam et</Text>
              {selectedRole === "kurye" && (
                <Text style={styles.optionDescription}>
                  Kuryer olmağı seçdikdə siz yenidən qeydiyyatdan keçib
                  məlumatlarınızı daha ətraflı daxil edəcəksiniz.
                </Text>
              )}
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Button
            title="Davam et"
            onPress={() => {
              // Handle role change logic here
              console.log("Selected role:", selectedRole);
            }}
            style={styles.continueButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangeStatus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
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
    paddingHorizontal: 24,
    paddingTop: 40,
    flexGrow: 1,
  },
  questionText: {
    fontSize: 18,
    fontFamily: Font.regular,
    color: "#0B0E0B",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 26,
  },
  optionsContainer: {
    gap: 24,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  radioContainer: {
    marginTop: 2,
    marginRight: 12,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#0B0E0B", // Default border color
    alignItems: "center",
    justifyContent: "center",
  },
  radioActive: {
    borderColor: "#08A30D", // Active green color
  },
  radioInner: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#08A30D",
  },
  textContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontFamily: Font.regular,
    color: "#0B0E0B",
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 12,
    fontFamily: Font.regular,
    color: "#08A30D",
    lineHeight: 16,
  },
  footer: {
    marginTop: "auto",
    marginBottom: 40,
  },
  continueButton: {
    backgroundColor: "#08A30D",
  },
});
