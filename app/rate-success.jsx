import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Font } from "../constant/fonts";

const RateSuccess = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.content}>
        <Text style={styles.title}>Uğurlu!</Text>

        <View style={styles.iconContainer}>
          <Ionicons name="checkmark-circle-outline" size={80} color="#08A30D" />
        </View>

        <Text style={styles.subtitle}>
          Qiymətləndirməniz üçün təşəkkür edirik.
        </Text>

        <Text style={styles.description}>
          Qiymətləndirməniz uğurla qeyd edildi.{"\n"}
          Alış-verişiniz və vaxt ayırıb{"\n"}
          qiymətləndirdiyiniz üçün təşəkkür edirik.
        </Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/(tabs)/basket")}>
          <Text style={styles.buttonText}>Səbətə qayıt</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RateSuccess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
   paddingTop: 40,
    paddingBottom: 50,

  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 28,
    fontFamily: Font.bold,
    color: "#0B0E0B",
    marginBottom: 40,
  },
  iconContainer: {
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: Font.medium,
    color: "#0B0E0B",
    textAlign: "center",
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    fontFamily: Font.regular,
    color: "#8E8E93",
    textAlign: "center",
    lineHeight: 20,
  },
  footer: {
    padding: 20,
    paddingBottom: 40,
  },
  button: {
    backgroundColor: "#08A30D",
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: Font.bold,
  },
});
