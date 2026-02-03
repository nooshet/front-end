import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import Toast from "../../components/Toast";

// Illustration from assets
import Qeydiyyat from "../../assets/qeydiyyat.png";

const Verification = () => {
  const router = useRouter();
  const { email: emailParam } = useLocalSearchParams();
  const displayEmail = emailParam || "goycekqaloyeva@gmail.com";

  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [timer, setTimer] = useState(180); // 3 minutes
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleVerify = () => {
    const code = otp.join("");
    if (code.length < 4) {
      showToast("Zəhmət olmasa doğrulama kodunu tam daxil edin");
      return;
    }
    console.log("Verifying OTP:", code);
    router.push("/newpassword");
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
              <Text style={styles.title}>Doğrulama kodunu{"\n"}daxil edin</Text>

              <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={inputRefs[index]}
                    style={styles.otpInput}
                    maxLength={1}
                    keyboardType="number-pad"
                    value={digit}
                    onChangeText={(v) => handleOtpChange(v, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                  />
                ))}
              </View>

              <Text style={styles.infoText}>
                Biz <Text style={styles.boldText}>{displayEmail}</Text>{" "}
                e-poçtunuza dörd rəqəmli doğrulama kodu göndərdik. Gələnlər
                qutusunu yoxlaya bilərsiniz
              </Text>

              <View style={styles.timerContainer}>
                <Text style={styles.timerLabel}>Kodu yenidən göndər</Text>
                <Text style={styles.timerValue}>{formatTime(timer)}</Text>
              </View>

              <TouchableOpacity style={styles.button} onPress={handleVerify}>
                <Text style={styles.buttonText}>Doğrulayın</Text>
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </View>
    </>
  );
};

export default Verification;

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
  scrollContent: { paddingBottom: 40, alignItems: "center" },
  title: {
    fontSize: 28,
    lineHeight: 38,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 48,
    color: "#0B0E0B",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
    marginBottom: 48,
  },
  otpInput: {
    width: 60,
    height: 50,
    borderBottomWidth: 1.5,
    borderBottomColor: "#0B0E0B",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#0B0E0B",
  },
  infoText: {
    fontSize: 14,
    lineHeight: 22,
    textAlign: "center",
    color: "#0B0E0B",
    paddingHorizontal: 10,
    marginBottom: 60,
  },
  boldText: { fontWeight: "bold" },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 40,
  },
  timerLabel: {
    fontSize: 14,
    color: "#999",
  },
  timerValue: {
    fontSize: 14,
    color: "#FF0000",
    fontWeight: "600",
  },
  button: {
    width: "100%",
    backgroundColor: "#00AA13",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});
