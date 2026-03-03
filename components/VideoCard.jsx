import React, { useRef, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

import { ALL_COLOR } from "../constant/all-color";
import { Font } from "../constant/fonts";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const VideoCard = ({
  title,
  description,
  chefName,
  image,
  onPress,
  onDetailPress,
  index = 0,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const bookmarkScale = useRef(new Animated.Value(1)).current;
  const heartScale = useRef(new Animated.Value(1)).current;
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
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
    <View style={styles.cardContainer}>
      <Image
        source={image ?? { uri: "https://via.placeholder.com/400" }}
        style={styles.image}
        resizeMode="cover"
      />

      <AnimatedTouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          styles.touchableOverlay,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Center Play Button (Subtle overlay) */}
        <View style={styles.centerOverlay}>
          <Ionicons
            name="play"
            size={60}
            color="rgba(255,255,255,0.3)"
            style={{ marginLeft: 5 }}
          />
        </View>

        {/* Side Icons (TikTok style) */}
        <View style={styles.sideIconsContainer}>
          <TouchableOpacity style={styles.chefAvatarContainer} onPress={onDetailPress}>
            <Image
              source={image ?? { uri: "https://via.placeholder.com/100" }}
              style={styles.chefAvatar}
            />
            <View style={styles.plusIcon}>
              <Ionicons name="add" size={14} color="#fff" />
            </View>
          </TouchableOpacity>

          {/* <TouchableOpacity style={styles.sideIconBtn} onPress={handleLike}>
            <Animated.View style={{ transform: [{ scale: heartScale }] }}>
              <Ionicons
                name={isLiked ? "heart" : "heart"}
                size={38}
                color={isLiked ? "#FE2C55" : "#fff"}
              />
            </Animated.View>
            <Text style={styles.sideIconText}>1.2K</Text>
          </TouchableOpacity> */}

          <TouchableOpacity style={styles.sideIconBtn}>
            <Ionicons name="chatbubble-ellipses" size={35} color="#fff" />
            <Text style={styles.sideIconText}>45</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sideIconBtn} onPress={handleBookmark}>
            <Animated.View style={{ transform: [{ scale: bookmarkScale }] }}>
              <Ionicons
                name={isBookmarked ? "bookmark" : "bookmark"}
                size={35}
                color={isBookmarked ? "#FACD3B" : "#fff"}
              />
            </Animated.View>
            <Text style={styles.sideIconText}>230</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sideIconBtn}>
            <Ionicons name="share-social" size={35} color="#fff" />
            <Text style={styles.sideIconText}>Share</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Info (TikTok style) */}
        <View style={styles.bottomOverlay}>
          <TouchableOpacity onPress={onDetailPress}>
            <Text style={styles.chefNameText}>
              @{chefName?.replace(/\s+/g, "").toLowerCase() || "chef_noosh"}
            </Text>
          </TouchableOpacity>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          <Text style={styles.description} numberOfLines={2}>
            {description}
          </Text>
          
          <View style={styles.musicContainer}>
            <Ionicons name="musical-notes" size={18} color="#fff" />
            <Text style={styles.musicText}>Orijinal səs - {chefName || "Noosh"}</Text>
          </View>
        </View>
      </AnimatedTouchableOpacity>
    </View>
  );
};

export default VideoCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: "#000",
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  touchableOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  centerOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  sideIconsContainer: {
    position: "absolute",
    right: 12,
    bottom: 160, 
    gap: 15,
    zIndex: 2,
    alignItems: "center",
  },
  chefAvatarContainer: {
    marginBottom: 10,
    position: "relative",
  },
  chefAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#fff",
  },
  plusIcon: {
    position: "absolute",
    bottom: -8,
    backgroundColor: "#FE2C55",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  sideIconBtn: {
    alignItems: "center",
    marginBottom: 5,
  },
  sideIconText: {
    color: "#fff",
    fontSize: 12,
    fontFamily: Font.semibold,
    marginTop: 4,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  bottomOverlay: {
    position: "absolute",
    bottom: 145, // Slightly higher to be safe
    left: 12,
    right: 80,
    zIndex: 2,
    gap: 10,
  },
  chefNameText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: Font.bold,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    maxWidth: "100%",
  },
  title: {
    color: "#fff",
    fontSize: 15,
    fontFamily: Font.regular,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  description: {
    color: "#eee",
    fontSize: 13,
    fontFamily: Font.medium,
    opacity: 0.8,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  musicContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 4,
  },
  musicText: {
    color: "#fff",
    fontSize: 13,
    fontFamily: Font.regular,
  },
});
