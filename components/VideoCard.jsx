import React, { useRef, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

import { ALL_COLOR } from "../constant/all-color";
import { Font } from "../constant/fonts";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const VideoCard = ({ title, time, image, onPress, index = 0 }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const bookmarkScale = useRef(new Animated.Value(1)).current;
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        delay: index * 100,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        delay: index * 100,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    Animated.sequence([
      Animated.timing(bookmarkScale, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(bookmarkScale, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <AnimatedTouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        styles.cardContainer,
        {
          opacity: fadeAnim,
          transform: [{ translateY: translateY }, { scale: scaleAnim }],
        },
      ]}
    >
      <Image source={image} style={styles.image} resizeMode="cover" />

      <View style={styles.centerOverlay}>
        <BlurView intensity={30} tint="dark" style={styles.playButtonCircle}>
          <Ionicons
            name="play"
            size={28}
            color="#fff"
            style={{ marginLeft: 4 }}
          />
        </BlurView>
      </View>

      <TouchableOpacity
        style={styles.bookmarkContainer}
        onPress={handleBookmark}
        activeOpacity={0.7}
      >
        <Animated.View style={{ transform: [{ scale: bookmarkScale }] }}>
          <Ionicons
            name={isBookmarked ? "bookmark" : "bookmark"}
            size={28}
            color={isBookmarked ? "#fff" : ALL_COLOR["--bg-color"] || "#4CAF50"}
          />
        </Animated.View>
      </TouchableOpacity>
    </AnimatedTouchableOpacity>
  );
};

export default VideoCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#000",
    borderRadius: 20,
    width: "100%",
    height: 208,
    marginBottom: 0,
    overflow: "hidden",
    position: "relative",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  centerOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  playButtonCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.4)",
  },
  bookmarkContainer: {
    position: "absolute",
    top: 10,
    right: 15,
    zIndex: 2,
  },
  bottomOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    paddingTop: 30,
    zIndex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  title: {
    color: "#fff",
    fontSize: 14,
    fontFamily: Font.semibold,
    marginBottom: 4,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  timeText: {
    color: "#ddd",
    fontSize: 12,
    fontFamily: Font.regular,
  },
});
