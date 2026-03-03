import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Font } from "../constant/fonts";
import { useTranslation } from "react-i18next";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SetLockCode = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [code, setCode] = useState("");
  const [confirmCode, setConfirmCode] = useState("");
  const [step, setStep] = useState(1); // 1: set, 2: confirm

  const handleNext = async () => {
    if (code.length < 4) {
      Alert.alert(t("common.error"), "Şifrə ən azı 4 rəqəmli olmalıdır.");
      return;
    }
    setStep(2);
  };

  const handleSave = async () => {
    if (code !== confirmCode) {
      Alert.alert(t("common.error"), "Şifrələr uyğun gəlmir.");
      setConfirmCode("");
      return;
    }

    try {
      await SecureStore.setItemAsync("app_lock_pin", code);
      await AsyncStorage.setItem("appLockType", "password");
      Alert.alert(t("common.success"), "Şifrə uğurla təyin edildi.", [
        { text: "OK", onPress: () => router.back() }
      ]);
    } catch (error) {
      console.error("Failed to save PIN", error);
      Alert.alert(t("common.error"), "Xəta baş verdi.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => step === 2 ? setStep(1) : router.back()}>
          <Ionicons name="chevron-back" size={24} color="#0B0E0B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {step === 1 ? "Şifrə təyin et" : "Şifrəni təsdiqlə"}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.instruction}>
          {step === 1 
            ? "Tətbiq kilidi üçün yeni şifrə daxil edin" 
            : "Daxil etdiyiniz şifrəni təkrar yazın"}
        </Text>

        <TextInput
          style={styles.input}
          value={step === 1 ? code : confirmCode}
          onChangeText={step === 1 ? setCode : setConfirmCode}
          keyboardType="numeric"
          secureTextEntry
          maxLength={6}
          placeholder="****"
          autoFocus
        />

        <TouchableOpacity 
          style={styles.button} 
          onPress={step === 1 ? handleNext : handleSave}
        >
          <Text style={styles.buttonText}>
            {step === 1 ? "Davam et" : "Yadda saxla"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SetLockCode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: Font.bold,
    color: "#0B0E0B",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    alignItems: "center",
  },
  instruction: {
    fontSize: 16,
    fontFamily: Font.regular,
    color: "#828282",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 60,
    borderBottomWidth: 2,
    borderBottomColor: "#34C759",
    fontSize: 24,
    textAlign: "center",
    letterSpacing: 10,
    marginBottom: 40,
  },
  button: {
    width: "100%",
    height: 56,
    backgroundColor: "#34C759",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: Font.bold,
  },
});
