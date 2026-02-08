import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { ALL_COLOR } from "../constant/all-color";

const CustomButton = ({
  title,
  onPress,
  variant = "primary",
  icon,
  style,
  bgColor,
  textColor,
  width, // Width propunu qəbul edirik
}) => {
  const defaultColor = ALL_COLOR["--bg-color"];

  const getTheme = () => {
    const activeBg = bgColor || defaultColor;

    switch (variant) {
      case "outline":
        return {
          container: {
            backgroundColor: "transparent",
            borderWidth: 1,
            borderColor: activeBg,
          },
          text: activeBg,
          iconBg: activeBg,
          iconColor: "#fff",
        };
      default:
        return {
          container: { backgroundColor: activeBg },
          text: ALL_COLOR["--white"],
          iconBg: ALL_COLOR["--white"],
          iconColor: activeBg,
        };
    }
  };

  const theme = getTheme();
  const activeTextColor = textColor || theme.text;

  return (
    <TouchableOpacity
      style={[
        styles.addButton,
        theme.container,
        // DƏYİŞİKLİK: Width varsa onu qoyur, yoxdursa 142 (default) götürür
        { width: width || 142 },
        !icon && styles.centerContent,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* Mətn */}
      <Text
        style={[
          styles.buttonText,
          { color: activeTextColor },
          !icon && { textAlign: "center", flex: 0 },
        ]}
      >
        {title}
      </Text>

      {icon && (
        <View style={[styles.iconCircle, { backgroundColor: theme.iconBg }]}>
          <Feather name={icon} size={20} color={theme.iconColor} />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addButton: {
    borderRadius: 20,
    height: 37,
    // width: 142,  <-- Buradan sildik ki, dinamik olsun
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  iconCircle: {
    width: 31.3,
    height: 31.3,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  centerContent: {
    justifyContent: "center",
    paddingLeft: 0,
    paddingRight: 0,
  },
});

export default CustomButton;
