import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import { useRouter } from "expo-router";

// Şəkilləri öz yolunuzla idxal etməyə davam edin
import Contact from "../../assets/Vector.png";
import Notification from "../../assets/notification.png";
import Avatar from "../Avatar";
import AvatarIcon from "../../assets/Gcs.png";

const headerIcons = [
  {
    id: 1,
    icon: Notification,
    badge: true,
  },
  {
    id: 2,
    icon: Contact,
    badge: false,
  },
];

const HomeHeader = () => {
  const router = useRouter();
  // 1. Sol tərəf üçün animasiya dəyərləri (Slide & Fade)
  const slideAnim = useRef(new Animated.Value(-50)).current; // Soldan (-50px) başlayır
  const fadeAnim = useRef(new Animated.Value(0)).current; // Görünməz (0)-dan başlayır

  // 2. İkonlar üçün animasiya dəyərləri (Scale)
  // Hər ikon üçün ayrıca animated value yaradırıq
  const iconAnims = useRef(
    headerIcons.map(() => new Animated.Value(0)),
  ).current;

  // 3. Badge (Bildiriş nöqtəsi) üçün sonsuz animasiya
  const badgeScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // A. Sol tərəfin animasiyası (Paralel işləyir)
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.out(Easing.exp),
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // B. İkonların ardıcıl gəlməsi (Stagger)
    const iconAnimations = iconAnims.map((anim) =>
      Animated.spring(anim, {
        toValue: 1,
        friction: 5, // Sıçrayış effekti
        tension: 40,
        useNativeDriver: true,
      }),
    );
    // 300ms gecikmə ilə ikonları işə salırıq
    setTimeout(() => {
      Animated.stagger(150, iconAnimations).start();
    }, 300);

    // C. Badge üçün sonsuz "Pulse" animasiyası
    Animated.loop(
      Animated.sequence([
        Animated.timing(badgeScale, {
          toValue: 1.2, // Bir az böyüyür
          duration: 800,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(badgeScale, {
          toValue: 1, // Geri qayıdır
          duration: 800,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
      ]),
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Sol tərəf: Avatar və Yazılar */}
      <Animated.View
        style={[
          styles.left,
          {
            opacity: fadeAnim,
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        <Avatar source={AvatarIcon} />
        <View>
          <Text style={styles.welcomeTexxt}>Xoş gəlmisən!</Text>
          <Text style={styles.nameText}>Göyçək</Text>
        </View>
      </Animated.View>

      {/* Sağ tərəf: İkonlar */}
      <View style={styles.iconContainer}>
        {headerIcons.map((header, index) => (
          <Animated.View
            key={header.id}
            style={{
              transform: [{ scale: iconAnims[index] }], // Pop effekti
            }}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.iconBtn}
              onPress={() => {
                if (header.id === 1) {
                  router.push("/notifications");
                }
              }}
            >
              {header.badge && (
                <Animated.View
                  style={[
                    styles.badge,
                    { transform: [{ scale: badgeScale }] }, // Pulse effekti
                  ]}
                />
              )}
              <Image source={header.icon} style={styles.iconImage} />
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20, // Kənarlardan boşluq əlavə etdim
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  welcomeTexxt: {
    fontWeight: "500", // "medium" bəzən Android-də işləmir, 500 daha etibarlıdır
    fontSize: 16,
    color: "#0B0E0B",
  },
  nameText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#0B0E0B",
  },
  iconContainer: {
    flexDirection: "row",
    gap: 13,
  },
  iconBtn: {
    padding: 10,
    backgroundColor: "rgba(217, 217, 217, 0.14)",
    borderRadius: 50,
    width: 42,
    height: 42,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  badge: {
    backgroundColor: "#F60909",
    width: 10,
    height: 10,
    borderRadius: 5,
    position: "absolute",
    right: 8,
    top: 8,
    zIndex: 9999,
    borderWidth: 1.5,
    borderColor: "#FFF",
  },
});
