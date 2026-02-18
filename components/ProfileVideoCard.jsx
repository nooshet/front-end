import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ALL_COLOR } from "../constant/all-color";
import { Font } from "../constant/fonts";

const ProfileVideoCard = ({ 
  image, 
  onPress, 
  isBookmarked: initialBookmarked = true, 
  onBookmarkPress,
  width,
  height = 180
}) => {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);
  const bookmarkScale = useRef(new Animated.Value(1)).current;

  const handleBookmark = () => {
    const newState = !isBookmarked;
    setIsBookmarked(newState);
    
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

    if (onBookmarkPress) {
      onBookmarkPress(newState);
    }
  };

  return (
    <TouchableOpacity 
      activeOpacity={0.9} 
      style={[styles.videoCard, { width: width || "100%", height }]}
      onPress={onPress}
    >
      <Image source={image} style={styles.videoImage} resizeMode="cover" />
      
      <View style={styles.playOverlay}>
        <View style={styles.playCircle}>
          <Ionicons name="play" size={24} color="#fff" style={{ marginLeft: 3 }} />
        </View>
      </View>

      <TouchableOpacity 
        style={styles.bookmarkBtn} 
        onPress={handleBookmark}
        activeOpacity={0.7}
      >
        <Animated.View style={{ transform: [{ scale: bookmarkScale }] }}>
          <Ionicons 
            name={isBookmarked ? "bookmark" : "bookmark-outline"} 
            size={20} 
            color={isBookmarked ? ALL_COLOR["--bg-color"] : "#fff"} 
          />
        </Animated.View>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ProfileVideoCard;

const styles = StyleSheet.create({
  videoCard: {
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "#eee",
    position: "relative",
  
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  videoImage: {
    width: "100%",
    height: "100%",
  },
  playOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  playCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
  bookmarkBtn: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 2,
    backgroundColor: "rgba(0,0,0,0.2)",
    padding: 6,
    borderRadius: 12,
  },
});
