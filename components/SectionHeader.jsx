import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { ALL_COLOR } from "../constant/all-color";
import { Font } from "../constant/fonts";

const SectionHeader = ({ title, subtitle, onPress }) => {
  return (
    <View style={style.sectionContainer}>
      <Text style={style.title}>{title}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={style.subtitle}>{subtitle ?? "Hamısı"}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SectionHeader;

const style = StyleSheet.create({
  sectionContainer: {
    marginTop: 20,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "semibold",
    color: ALL_COLOR["--text-color"],
    fontFamily: Font.semibold,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "regular",
    color: ALL_COLOR["--text-color"],
    fontFamily: Font.regular,
  },
});
