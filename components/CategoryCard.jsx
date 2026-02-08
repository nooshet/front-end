import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useEffect, useRef, memo } from "react"; // 1. memo import edildi
import { Font } from "../constant/fonts";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const CategoryCard = ({ title, count, image, onPress, index = 0 }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(50)).current;

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
        useNativeDriver: true,
      }),
    ]).start();
  }, []); // Bu array boşdur, yalnız ilk mount olanda işləyir

  return (
    <AnimatedTouchableOpacity
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateY: translateY }],
        },
      ]}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View style={styles.imageContainer}>
        <Image
          source={image}
          style={styles.image}
          resizeMode="cover"
          // 2. Android-də şəklin öz daxili animasiyasını söndürürük ki, bizimki ilə toqquşmasın
          fadeDuration={0}
        />
      </View>

      <View style={styles.textRow}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.count}>{count}</Text>
      </View>
    </AnimatedTouchableOpacity>
  );
};

// 3. Komponenti memo ilə ixrac edirik
// Bu, props dəyişmədikcə komponentin yenidən render olunmasının qarşısını alır
export default memo(CategoryCard);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    padding: 12,
    alignItems: "center",
    justifyContent: "space-between",
    height: 190,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: "hidden",
    marginTop: 5,
    backgroundColor: "#f0f0f0",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  textRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: "100%",
    marginTop: 10,
  },
  title: {
    flex: 1,
    fontSize: 15,
    fontFamily: Font.semibold,
    color: "#000",
    marginRight: 8,
    lineHeight: 20,
  },
  count: {
    fontSize: 14,
    fontFamily: Font.regular,
    color: "#666",
    marginBottom: 2,
  },
});
