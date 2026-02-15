import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useRouter, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Font } from "../../constant/fonts";
import Container from "../../components/Container";

const { height } = Dimensions.get("window");

const SuccessPage = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backBtn}>
              <Ionicons name="chevron-back" size={24} color="#000" />
            </TouchableOpacity>
          ),
          headerShadowVisible: false,
        }}
      />

      <View style={styles.content}>
        <Text style={styles.title}>Uğurlu!</Text>

        <View style={styles.iconContainer}>
          <View style={styles.circle}>
            <Ionicons name="checkmark" size={60} color="#08A30D" />
          </View>
        </View>

        <Text style={styles.thanksText}>Alış-veriş üçün təşəkkür edirik</Text>
        <Text style={styles.statusText}>
          Sifarişiniz alınmışdır və{"\n"}Hazırlanma mərhələsindədir
        </Text>
      </View>

      {/* Sticky Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.trackBtn}
          onPress={() => router.push("/(screens)/order-tracking")}>
          <Text style={styles.trackBtnText}>Sifarişi izlə</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SuccessPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backBtn: {
    padding: 8,
    marginLeft: 10,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: height * 0.15,
  },
  title: {
    fontSize: 32,
    fontFamily: Font.bold,
    color: "#212428",
    marginBottom: 40,
  },
  iconContainer: {
    marginBottom: 40,
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 60,
    borderWidth: 5,
    borderColor: "#08A30D",
    justifyContent: "center",
    alignItems: "center",
  },
  thanksText: {
    fontSize: 22,
    fontFamily: Font.medium,
    color: "#000",
    textAlign: "center",
    marginBottom: 20,
  },
  statusText: {
    fontSize: 16,
    fontFamily: Font.medium,
    color: "#828282",
    textAlign: "center",
    lineHeight: 24,
  },
  footer: {
    position: "absolute",
    bottom: 60,
    left: 16,
    right: 16,
  },
  trackBtn: {
    backgroundColor: "#08A30D",
    height: 50,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  trackBtnText: {
    color: "#fff",
    fontSize: 20,
    fontFamily: Font.bold,
  },
});
