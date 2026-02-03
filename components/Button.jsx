import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const Button = ({ title, onPress, style, textStyle, variant = "primary" }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        variant === "primary" ? styles.primary : styles.outline,
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          variant === "primary" ? styles.primaryText : styles.outlineText,
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 16,
    borderRadius: 30, // Rounded full
    alignItems: "center",
    justifyContent: "center",
  },
  primary: {
    backgroundColor: "#00C853", // Green from image
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#00C853",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  primaryText: {
    color: "#fff",
  },
  outlineText: {
    color: "#00C853",
  },
});
