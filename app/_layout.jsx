import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { FontAwesome } from "@expo/vector-icons";

const RootLayout = () => {
  const [loaded, error] = useFonts({
    poppins_bold: require("../assets/fonts/Poppins/Poppins-Bold.ttf"),
    poppins_semibold: require("../assets/fonts/Poppins/Poppins-SemiBold.ttf"),
    poppins_medium: require("../assets/fonts/Poppins/Poppins-Medium.ttf"),
    poppins_thin: require("../assets/fonts/Poppins/Poppins-Thin.ttf"),
    poppins_regular: require("../assets/fonts/Poppins/Poppins-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <Stack>
      {/* <Stack.Screen name="index" options={{ headerShown: false }} /> */}
      {/* <Stack.Screen name="(auth)" options={{ headerShown: false }} /> */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(screens)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
