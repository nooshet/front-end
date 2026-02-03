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
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import Input from "../../components/Input";
import Toast from "../../components/Toast";

// Illustration from assets
import Qeydiyyat from "../../assets/qeydiyyat.png";

const NewPassword = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Validation Logic
  const hasMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const allRequirementsMet = hasMinLength && hasNumber && hasSpecialChar && hasUppercase;

  const handleContinue = () => {
    if (!password || !confirmPassword) {
      showToast("Zəhmət olmasa bütün xanaları doldurun");
      return;
    }

    if (!allRequirementsMet) {
      showToast("Şifrə bütün tələblərə cavab verməlidir");
      return;
    }

    if (password !== confirmPassword) {
      showToast("Şifrələr eyni deyil");
      return;
    }

    router.push("/thanks");
  };

  const RequirementItem = ({ text, isMet }) => (
    <View style={styles.requirementItem}>
      <Ionicons 
        name={isMet ? "checkmark-circle" : "ellipse-outline"} 
        size={16} 
        color={isMet ? "#00AA13" : "#999"} 
        style={styles.checkIcon}
      />
      <Text style={[styles.requirementText, isMet && styles.requirementMetText]}>
        {text}
      </Text>
    </View>
  );

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
              <Text style={styles.title}>Yeni şifrə yaradın</Text>

              <View style={styles.form}>
                <View style={styles.inputWrapper}>
                  <Input
                    placeholder="Yeni şifrə"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    variant="underline"
                    textContentType="none"
                    autoComplete="off"
                    icon={
                      <Ionicons
                        name="lock-closed-outline"
                        size={20}
                        color="#0B0E0B"
                      />
                    }
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons
                      name={showPassword ? "eye-off-outline" : "eye-outline"}
                      size={20}
                      color="#0B0E0B"
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.inputWrapper}>
                  <Input
                    placeholder="Şifrənizi yenidən daxil edin"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showConfirmPassword}
                    variant="underline"
                    textContentType="none"
                    autoComplete="off"
                    icon={
                      <Ionicons
                        name="lock-closed-outline"
                        size={20}
                        color="#0B0E0B"
                      />
                    }
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }>
                    <Ionicons
                      name={
                        showConfirmPassword ? "eye-off-outline" : "eye-outline"
                      }
                      size={20}
                      color="#0B0E0B"
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.requirementsBox}>
                  <Text style={styles.requirementsTitle}>
                    Güclü şifrə təyin edin
                  </Text>
                  
                  <RequirementItem text="8 simvol" isMet={hasMinLength} />
                  <RequirementItem text="1 rəqəm" isMet={hasNumber} />
                  <RequirementItem text="1 xüsusi xarakter" isMet={hasSpecialChar} />
                  <RequirementItem text="1 böyük hərf" isMet={hasUppercase} />
                </View>

                <TouchableOpacity
                  style={[styles.button, !allRequirementsMet && styles.buttonDisabled]}
                  onPress={handleContinue}
                  disabled={!allRequirementsMet && password.length > 0}>
                  <Text style={styles.buttonText}>Davam et</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </View>
    </>
  );
};

export default NewPassword;

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
    paddingTop: 40,
  },
  scrollContent: { paddingBottom: 40 },
  title: {
    fontSize: 28,
    lineHeight: 38,
    fontWeight: "600",
    textAlign: "center",
    color: "#0B0E0B",
    marginBottom: 40,
  },
  form: {
    width: "100%",
  },
  inputWrapper: {
    position: "relative",
    marginBottom: 20,
  },
  eyeIcon: {
    position: "absolute",
    right: 0,
    top: 15,
    padding: 5,
  },
  requirementsBox: {
    marginTop: 10,
    marginBottom: 40,
  },
  requirementsTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#0B0E0B",
    marginBottom: 12,
  },
  requirementItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingLeft: 4,
  },
  checkIcon: {
    marginRight: 10,
  },
  requirementText: {
    fontSize: 14,
    color: "#999",
  },
  requirementMetText: {
    color: "#00AA13",
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#00AA13",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: "#A5D6A7",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});
