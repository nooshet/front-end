import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import React from "react";

const { width } = Dimensions.get("window");

const OnboardingItem = ({ item }) => {
  return (
    <View style={[styles.container, { width }]}>
      <View style={styles.imageContainer}>
        {/* Placeholder for image, in a real app use Image component */}
        <View style={styles.placeholderImage}>
           <Text style={styles.imageText}>Image: {item.title}</Text>
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
};

export default OnboardingItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    flex: 0.6,
    justifyContent: "center",
    width: "100%",
    padding: 20,
  },
  placeholderImage: {
    width: "100%",
    height: 300,
    backgroundColor: "#E8F5E9",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  imageText: {
    color: "#00C853",
    fontSize: 16,
  },
  content: {
    flex: 0.4,
    paddingHorizontal: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#00C853",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 24,
  },
});
