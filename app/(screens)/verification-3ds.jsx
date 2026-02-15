import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Animated,
  Dimensions,
  ScrollView,
} from "react-native";
import { useRouter, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Font } from "../../constant/fonts";
import Container from "../../components/Container";

const { width } = Dimensions.get("window");

const Verification3DS = () => {
  const router = useRouter();
  const [code, setCode] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(161); // 2:41 in seconds
  const [showNotification, setShowNotification] = useState(false);
  
  const notificationAnim = useRef(new Animated.Value(-100)).current;
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  useEffect(() => {
    // Show simulated notification after 1 second
    const timerId = setTimeout(() => {
      setShowNotification(true);
      Animated.spring(notificationAnim, {
        toValue: 20,
        useNativeDriver: true,
      }).start();
      
      // Hide notification after 6 seconds
      setTimeout(() => {
        Animated.timing(notificationAnim, {
          toValue: -120,
          duration: 300,
          useNativeDriver: true,
        }).start(() => setShowNotification(false));
      }, 6000);
    }, 1000);

    // Countdown timer
    const intervalId = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearTimeout(timerId);
      clearInterval(intervalId);
    };
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleInputChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Focus next input or navigate if complete
    if (text.length === 1) {
      if (index < 3) {
        inputRefs[index + 1].current.focus();
      } else {
        // Code is full
        router.push("/(screens)/success");
      }
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && code[index] === "" && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "3D Təhlükəsizlik",
          headerTitleStyle: { fontFamily: Font.bold, fontSize: 22 },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
              <Ionicons name="chevron-back" size={24} color="#000" />
            </TouchableOpacity>
          ),
          headerShadowVisible: false,
          headerTitleAlign: "center",
        }}
      />

      {/* Simulated Notification */}
      <Animated.View 
        style={[
          styles.notificationBubble, 
          { transform: [{ translateY: notificationAnim }] }
        ]}
      >
        <View style={styles.notiIcon}>
          <Ionicons name="restaurant" size={20} color="#fff" />
        </View>
        <View style={styles.notiContent}>
          <View style={styles.notiHeader}>
            <Text style={styles.notiTitle}>NooshEt</Text>
            <Text style={styles.notiTime}>İndi</Text>
          </View>
          <Text style={styles.notiText}>Diqqət! Bu kodu heç kimlə paylaşmayın</Text>
          <Text style={styles.notiCode}>Kod: 2634...</Text>
        </View>
      </Animated.View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.brandingContainer}>
          <Text style={styles.logoText}>NooshEt</Text>
        </View>

        <View style={styles.divider} />

        <Container>
          <View style={styles.amountContainer}>
            <Text style={styles.amountLabel}>Məbləğ</Text>
            <Text style={styles.amountValue}>6.15 AZN</Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.infoText}>
            +994** *** 20 47 nömrəsinə göndərilmiş kodu daxil edin
          </Text>

          <View style={styles.otpContainer}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={inputRefs[index]}
                style={styles.otpInput}
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                onChangeText={(text) => handleInputChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
              />
            ))}
          </View>

          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>Kodu yenidən göndər </Text>
            <Text style={styles.timerText}>{formatTime(timer)}</Text>
          </View>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Verification3DS;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backBtn: {
    padding: 8,
  },
  scrollContent: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40,
  },
  notificationBubble: {
    position: "absolute",
    top: 50,
    left: 16,
    right: 16,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 100,
    // Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 10,
    borderWidth: 1,
    borderColor: "#F2F2F2",
  },
  notiIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#08A30D",
    justifyContent: "center",
    alignItems: "center",
  },
  notiContent: {
    flex: 1,
    marginLeft: 12,
  },
  notiHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  notiTitle: {
    fontSize: 16,
    fontFamily: Font.bold,
    color: "#000",
  },
  notiTime: {
    fontSize: 12,
    color: "#828282",
    fontFamily: Font.medium,
  },
  notiText: {
    fontSize: 13,
    color: "#000",
    marginTop: 2,
    fontFamily: Font.medium,
  },
  notiCode: {
    fontSize: 13,
    color: "#000",
    fontFamily: Font.medium,
  },
  brandingContainer: {
    marginTop: 20,
    marginBottom: 40,
  },
  logoText: {
    fontSize: 42,
    fontFamily: Font.bold,
    color: "#08A30D",
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#F2F2F2",
  },
  amountContainer: {
    alignItems: "center",
    paddingVertical: 25,
  },
  amountLabel: {
    fontSize: 22,
    fontFamily: Font.bold,
    color: "#BDBDBD",
    marginBottom: 5,
  },
  amountValue: {
    fontSize: 28,
    fontFamily: Font.bold,
    color: "#000",
  },
  infoText: {
    fontSize: 14,
    color: "#BDBDBD",
    textAlign: "center",
    marginTop: 20,
    fontFamily: Font.medium,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginTop: 50,
  },
  otpInput: {
    width: 50,
    height: 50,
    fontSize: 28,
    textAlign: "center",
    fontFamily: Font.bold,
    color: "#000",
    borderBottomWidth: 3,
    borderBottomColor: "#BDBDBD",
  },
  resendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 60,
  },
  resendText: {
    fontSize: 16,
    fontFamily: Font.medium,
    color: "#828282",
  },
  timerText: {
    fontSize: 16,
    fontFamily: Font.bold,
    color: "#EB5757",
  },
});
