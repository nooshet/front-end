import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import React, { useState, useRef } from "react";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

import Onboarding1Image from "../assets/Onboarding1image.png";
import Onboarding2Image from "../assets/Onboarding2image.png";
import Onboarding3Image from "../assets/Onboarding3image.png";

const { width } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    image: Onboarding1Image,
    title: "Evin dadı, hər yerdə",
    subtitle:
      "Sevgiylə bişirilmiş təzə yeməkləri kəşf et, menyulara bax və istədiyin yerdən sifariş et",
  },
  {
    id: "2",
    image: Onboarding2Image,
    title: "Yerli aşpazlara dəstək ol",
    subtitle:
      "Yerli aşçılara verdiyin ləzzətlə həm əməyə, həm də yerli ləzzətlərə dəyər qat",
  },
  {
    id: "3",
    image: Onboarding3Image,
    title: "Sürətli çatdırılma",
    subtitle:
      "Təcrübəli və etibarlı sürücülərlə sifarişin isti, təhlükəsiz və vaxtında qapına gəlsin",
  },
];

const Onboarding = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems && viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current.scrollToIndex({
        index: currentIndex + 1,
      });
    } else {
      router.replace("(tabs)");
    }
  };

  const handleSkip = () => {
    router.replace("/role-selection");
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <StatusBar style="dark" />

        <FlatList
          ref={flatListRef}
          data={slides}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
          renderItem={({ item }) => (
            <View style={styles.slide}>
              <View style={styles.imageContainer}>
                <Image source={item.image} style={styles.image} />

                {currentIndex < slides.length - 1 && (
                  <TouchableOpacity
                    style={styles.skipButton}
                    onPress={handleSkip}
                  >
                    <Text style={styles.skipText}>Keç</Text>
                  </TouchableOpacity>
                )}
              </View>

              <View style={styles.content}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>{item.subtitle}</Text>
              </View>
            </View>
          )}
        />

        {/* FOOTER */}
        <View style={styles.footer}>
          {/* DOTS */}
          <View style={styles.dots}>
            {slides.map((_, index) => (
              <View
                key={index}
                style={[styles.dot, currentIndex === index && styles.activeDot]}
              />
            ))}
          </View>

          {/* BUTTON */}
          <View style={[styles.buttonWrapper, currentIndex !== slides.length - 1 && { alignItems: "flex-end" }]}>
            <TouchableOpacity
              style={[
                styles.button,
                currentIndex === slides.length - 1 && styles.startButton,
              ]}
              onPress={handleNext}
            >
              <Text
                style={[
                  styles.buttonText,
                  currentIndex === slides.length - 1 && styles.startButtonText,
                ]}
              >
                {currentIndex === slides.length - 1 ? "Başla" : "Növbəti"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    
  },

  slide: {
    width,
    flex: 1,
  },

  imageContainer: {
    width: "100%",
    height: "55%",
  },

  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  skipButton: {
    position: "absolute",
    top: 50,
    right: 24,
    backgroundColor: "#FFFEFDB2",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
  },

  skipText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0B0E0B",
  },

  content: {
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 24,
  },

  title: {
    fontSize: 28,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 24,
  },

  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#8E8E93",
    lineHeight: 24,
    marginTop: 8,
  },

  footer: {
    position: "absolute",
    bottom: 100,
    width: "100%",
    paddingHorizontal: 24,
  },

  dots: {
    flexDirection: "row",
    justifyContent: "center",
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E0E0E0",
    marginHorizontal: 4,
  },

  activeDot: {
    width: 20,
    backgroundColor: "#08A30D",
  },

  buttonWrapper: {
    marginTop: 32,
    alignItems: "center",
  },

  button: {
    backgroundColor: "#FFFCFC",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,

    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,

    // Android shadow
    elevation: 4,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#00AA13",
  },

  startButton: {
    backgroundColor: "#08A30D",
    width: "100%",
    borderRadius: 8,
    paddingVertical: 14,
  },

  startButtonText: {
    color: "#fff",
    textAlign: "center",
  },
});
