import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

const Input = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType = "default",
  label,
  icon,
  style,
  variant = "box",
  error = false,
}) => {
  const isUnderline = variant === "underline";

  return (
    <View style={[styles.container, style]}>
      {label && !isUnderline && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          isUnderline ? styles.underlineInput : styles.boxInput,
        ]}>
        {icon && <View style={styles.icon}>{icon}</View>}
        <TextInput
          style={[styles.input, error && styles.errorText]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          placeholderTextColor="#999"
        />
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 8,
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 56,
  },
  boxInput: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    backgroundColor: "#F9F9F9",
    paddingHorizontal: 16,
  },
  underlineInput: {
    borderBottomWidth: 1,
    borderBottomColor: "#0B0E0B",
    borderRadius: 0,
    backgroundColor: "transparent",
    paddingHorizontal: 0,
    height: 50,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    height: "100%",
  },
  errorText: {
    color: "#FF0000",
  },
  icon: {
    marginRight: 10,
  },
});
