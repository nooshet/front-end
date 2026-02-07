import { View, Text } from "react-native";
import React from "react";

const Container = ({ children }) => {
  return <View style={{ paddingHorizontal: 16 }}>{children}</View>;
};

export default Container;
