import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

// Şəkil
import Thank from "../../assets/thanks.png";

const Thanks = () => {
  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="dark" />
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Image source={Thank} style={styles.image} resizeMode="contain" />
          </View>

          <Text style={styles.title}>Təşəkkürlər</Text>
          <Text style={styles.subtitle}>
            Hesabınız uğurla yaradıldı. Sağlam qidalanmaya xoş gəldiniz
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.replace("/(auth)/login")}>
            <Text style={styles.buttonText}>İrəli</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Thanks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  content: {
    alignItems: "center",
    width: "100%",
  },
  iconContainer: {
    marginBottom: 40,
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    height: 150,
  },
  image: {
    width: 270,
    height: 220,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#000",
    marginBottom: 16,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "400",
    maxWidth: 260,
    alignSelf: "center",
    color: "#0B0E0B",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 48,
  },
  button: {
    backgroundColor: "#08A30D",
    width: "100%",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFCFC",
    fontSize: 24,
    fontWeight: "600",
  },
});
