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
import { ALL_COLOR } from "../constant/all-color";
import { Ionicons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import { Font } from "../constant/fonts";
import { BlurView } from "expo-blur";
import CustomButton from "./CustomButton";
import { useTranslation } from "react-i18next";

// TouchableOpacity-ni animasiyalı komponentə çeviririk
const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const FoodCard = ({
  title,
  price,
  rating,
  image,
  onPress,
  index = 0,
  hideButton = false,
}) => {
  // 1. Giriş Animasiyası (Yuxarı sürüşmə və Görünmə)
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(50)).current;

  // 2. Karta toxunanda kiçilmə (Scale) effekti
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // 3. Bookmark ikonunun animasiyası
  const bookmarkScale = useRef(new Animated.Value(1)).current;
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    // Kart ekrana gələndə işə düşən animasiya
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        delay: index * 100, // Siyahıdada hər kart bir az gecikmə ilə gəlsin
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

  // Karta barmaq vuranda (Sıxılma)
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  // Barmağı çəkəndə (Əvvəlki halına qayıtma)
  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  // Bookmark animasiyası
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
      activeOpacity={1} // Opacity-ni ləğv edirik, çünki scale istifadə edirik
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
      <View style={styles.imageBox}>
        <Image source={image} style={styles.image} />

        <BlurView intensity={20} tint="light" style={styles.ratingBadge}>
          <Ionicons name="star" size={14} color="#4CAF50" />
          <Text style={styles.ratingText}>{rating}</Text>
        </BlurView>
      </View>

      <View style={styles.contentBox}>
        <View style={styles.headerRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            <Text style={styles.price}>{price} AZN</Text>
          </View>

          <TouchableOpacity onPress={handleBookmark} activeOpacity={0.7}>
            <Animated.View style={{ transform: [{ scale: bookmarkScale }] }}>
              <Ionicons
                name={isBookmarked ? "bookmark" : "bookmark-outline"}
                size={24}
                color={
                  isBookmarked ? ALL_COLOR["--bg-color"] || "#000" : "#000"
                }
              />
            </Animated.View>
          </TouchableOpacity>
        </View>

        {!hideButton && (
          <CustomButton
            title={t("foodCard.addToBasket")}
            variant="primary"
            icon="arrow-up-right"
            width={"100%"}
          />
        )}
      </View>
    </AnimatedTouchableOpacity>
  );
};
export default FoodCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    width: 172,
    marginBottom: 20,
    // marginHorizontal: 16,
    paddingBottom: 9,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,

    elevation: 5,

    borderWidth: 1,
    borderColor: "#898A8D",
  },
  imageBox: {
    width: "100%",
    height: 119,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  ratingBadge: {
    position: "absolute",
    top: 10,
    left: 10,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    backgroundColor: "rgba(255, 252, 252, 0.7)",
  },
  ratingText: {
    fontSize: 13,
    fontFamily: Font.medium,
    color: ALL_COLOR["--bg-color"],
    marginLeft: 4,
  },
  contentBox: {
    marginTop: 12,
    paddingInline: 10,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  title: {
    fontSize: 12,
    fontFamily: Font.medium,
    color: "#0B0E0B",
    marginBottom: 4,
  },
  price: {
    fontSize: 12,
    fontFamily: Font.semibold,
    color: "#0B0E0B",
  },
});
