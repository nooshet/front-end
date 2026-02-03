import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import Input from "../../components/Input";
import Toast from "../../components/Toast";

import Qeydiyyat from "../../assets/qeydiyyat.png";

const ForgotPassword = () => {
  const router = useRouter();
  const { role } = useLocalSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleForgotPassword = () => {
    setPasswordError(false);

    if (!email || !password || !confirmPassword) {
      showToast("Zəhmət olmasa bütün xanaları doldurun");
      return;
    }

    if (password.length < 8) {
      setPasswordError(true);
      showToast("Şifrə ən azı 8 simvol olmalıdır");
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError(true);
      showToast("Şifrələr eyni deyil");
      return;
    }

    if (!agree) {
      showToast("Zəhmət olmasa şərtləri qəbul edin");
      return;
    }

    console.log("ForgotPassword:", { email, role });
    router.push({ pathname: "/(auth)/verification", params: { email } });
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="light" />
      {toastMessage && (
        <Toast message={toastMessage} onHide={() => setToastMessage(null)} />
      )}

      <View style={styles.container}>
        {/* Top Green Section */}
        <View style={styles.topSection}>
          <View style={styles.illustrationContainer}>
            <Image
              source={Qeydiyyat}
              style={styles.illustration}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Bottom White Section */}
        <View style={styles.bottomSection}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}>
              <Text style={styles.title}>Şifrə bərpası</Text>

              <Text style={styles.subtitle}>
                Doğrulama kodunu almaq üçün e-poçt ünvanınızı daxil edin
              </Text>

              <View style={styles.form}>
                <Input
                  placeholder="Epoçt ünvanınızı daxil edin"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  textContentType="emailAddress"
                  variant="underline"
                  icon={
                    <Ionicons name="mail-outline" size={20} color="#0B0E0B" />
                  }
                />

                {/* Buttons */}
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: "#00AA13" }]}
                  onPress={() => router.push("/(auth)/verification")}>
                  <Text style={[styles.buttonText, { color: "#fff" }]}>
                    Göndər
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </View>
    </>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#08A30D" },
  topSection: {
    height: "30%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 55,
  },
  illustrationContainer: { width: 250, height: 200 },
  illustration: { width: "100%", height: "100%" },
  bottomSection: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 30,
  },
  scrollContent: { paddingBottom: 40 },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#000",
  },
  subtitle: {
    marginBottom: 40,
    marginTop: 32,

    fontWeight: "400",
    fontSize: 14,
    color: "#0B0E0B",
    maxWidth: 260,
    alignSelf: "center",
    textAlign: "center",
  },

  form: { width: "100%" },
  passwordContainer: { position: "relative" },
  rightIcons: {
    position: "absolute",
    right: 0,
    top: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  warningIcon: { padding: 5, marginLeft: 5 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  checkbox: { marginRight: 10 },
  checkboxText: { fontSize: 12, color: "#0B0E0B" },
  forgotText: { fontSize: 12, color: "#08A30D", fontWeight: "bold" },
  button: {
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonText: { fontSize: 16, fontWeight: "bold" },
});
