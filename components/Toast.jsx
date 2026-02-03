import { StyleSheet, Text, View, Animated } from "react-native";
import React, { useEffect, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";

const Toast = ({ message, type = "error", onHide }) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide && onHide();
    });
  }, [message]);

  const backgroundColor = type === "error" ? "#FF3B30" : "#00AA13";
  const icon = type === "error" ? "warning" : "checkmark-circle";

  return (
    <Animated.View style={[styles.container, { opacity, backgroundColor }]}>
      <Ionicons name={icon} size={24} color="#fff" />
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
};

export default Toast;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 60,
    left: 20,
    right: 20,
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 9999,
  },
  message: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 12,
  },
});
