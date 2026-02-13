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

const VideoCard = ({
  title,
  description,
  chefName,
  image,
  onPress,
  index = 0,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const bookmarkScale = useRef(new Animated.Value(1)).current;
  const heartScale = useRef(new Animated.Value(1)).current;
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

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
      toValue: 0.98,
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

  const handleLike = () => {
    setIsLiked(!isLiked);
    Animated.sequence([
      Animated.timing(heartScale, {
        toValue: 1.3,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(heartScale, {
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
      ]}>
      <Image
        source={image ?? { uri: "https://via.placeholder.com/400" }}
        style={styles.image}
        resizeMode="cover"
      />

      {/* Profile Name Label */}
      <View style={styles.profileLabelContainer}>
        <BlurView intensity={40} tint="dark" style={styles.profileLabelBlur}>
          <Text style={styles.profileLabelText}>
            {chefName || "Gülşən xalanın mətbəxi"}
          </Text>
        </BlurView>
      </View>

      {/* Center Play Button */}
      <View style={styles.centerOverlay}>
        <BlurView intensity={30} tint="light" style={styles.playButtonCircle}>
          <Ionicons
            name="play"
            size={40}
            color="#fff"
            style={{ marginLeft: 5 }}
          />
        </BlurView>
      </View>

      {/* Side Icons */}
      <View style={styles.sideIconsContainer}>
        <TouchableOpacity style={styles.sideIconBtn} onPress={handleLike}>
          <Animated.View style={{ transform: [{ scale: heartScale }] }}>
            <Ionicons
              name={isLiked ? "heart" : "heart"}
              size={32}
              color={isLiked ? "#F60909" : "#fff"}
            />
          </Animated.View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sideIconBtn}>
          <Ionicons name="chatbubble" size={30} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.sideIconBtn} onPress={handleBookmark}>
          <Animated.View style={{ transform: [{ scale: bookmarkScale }] }}>
            <Ionicons
              name={isBookmarked ? "bookmark" : "bookmark"}
              size={30}
              color={isBookmarked ? ALL_COLOR["--bg-color"] : "#fff"}
            />
          </Animated.View>
        </TouchableOpacity>
      </View>

      {/* Bottom Info */}
      <View style={styles.bottomOverlay}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>

        <TouchableOpacity style={styles.actionBtn} activeOpacity={0.8}>
          <Text style={styles.actionBtnText}>Ətraflı bax</Text>
          <View style={styles.arrowCircle}>
            <Ionicons
              name="arrow-up-outline"
              size={20}
              color={ALL_COLOR["--bg-color"]}
              style={{ transform: [{ rotate: "45deg" }] }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </AnimatedTouchableOpacity>
  );
};

export default VideoCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#222",
    borderRadius: 30,
    width: "100%",
    height: 480,
    marginBottom: 20,
    overflow: "hidden",
    position: "relative",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  profileLabelContainer: {
    position: "absolute",
    top: 230, // Adjusted based on design
    left: 15,
    zIndex: 2,
  },
  profileLabelBlur: {
    marginTop: 50,
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  profileLabelText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: Font.semibold,
  },
  centerOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    marginBottom: 50,
  },
  playButtonCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    overflow: "hidden",
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.4)",
  },
  sideIconsContainer: {
    position: "absolute",
    right: 15,
    bottom: 120,
    gap: 20,
    zIndex: 2,
    alignItems: "center",
  },
  sideIconBtn: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    zIndex: 2,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontFamily: Font.bold,
    marginBottom: 4,
  },
  description: {
    color: "#eee",
    fontSize: 14,
    fontFamily: Font.medium,
    marginBottom: 15,
    opacity: 0.9,
  },
  actionBtn: {
    backgroundColor: ALL_COLOR["--bg-color"],
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  actionBtnText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: Font.bold,
  },
  arrowCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});
