import React, { useEffect, useRef } from "react";
import { Tabs } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Platform,
} from "react-native";
import { MaterialIcons, Ionicons, FontAwesome5 } from "@expo/vector-icons";

// Rənglər
const PRIMARY_GREEN = "#469F36";
const INACTIVE_GRAY = "#9CA3AF"; // Passiv rəngi boz etdim ki, fərq bilinsin

const AnimatedTab = ({ focused, icon, label }) => {
  const animValue = useRef(new Animated.Value(focused ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animValue, {
      toValue: focused ? 1 : 0,
      duration: 500, // Daha yavaş və axıcı keçid (500ms)
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false, // Layout (width/color) dəyişdiyi üçün false
    }).start();
  }, [focused]);

  // Konteynerin eni (Passiv: 50px -> Aktiv: 105px)
  const containerWidth = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 105],
  });

  // Arxa fon rəngi (Şəffaf -> Yaşıl)
  const backgroundColor = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["transparent", PRIMARY_GREEN],
  });

  // Aktiv mətnin (yan tərəf) görünməsi
  const activeLabelOpacity = animValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0, 1],
  });

  // Passiv mətnin (alt tərəf) görünməsi
  const inactiveLabelOpacity = animValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0, 0],
  });

  // İkonun rəngini interpolasiya edirik (Boz -> Ağ)
  // Qeyd: Native driver false olduğu üçün bunu birbaşa style-da yox, prop kimi verəcəyik,
  // lakin sadəlik üçün burada React render zamanı rəngi seçirik.
  const iconColor = focused ? "#FFFFFF" : INACTIVE_GRAY;

  return (
    <View style={styles.tabWrapper}>
      <Animated.View
        style={[
          styles.pillContainer,
          {
            width: containerWidth,
            backgroundColor: backgroundColor,
          },
        ]}
      >
        {/* İkon Hissəsi */}
        <View style={styles.iconContainer}>
          {React.cloneElement(icon, {
            color: iconColor,
            size: 20, // İkon ölçüsünü biraz kiçiltdim
          })}
        </View>

        {/* Aktiv Mətn (Yan tərəfdə) */}
        {focused && (
          <Animated.View style={{ opacity: activeLabelOpacity, marginLeft: 4 }}>
            <Text numberOfLines={1} style={styles.activeLabel}>
              {label}
            </Text>
          </Animated.View>
        )}
      </Animated.View>

      {/* Passiv Mətn (Aşağıda) */}
      <Animated.View
        style={[
          styles.inactiveLabelContainer,
          { opacity: inactiveLabelOpacity },
        ]}
      >
        <Text numberOfLines={1} style={styles.inactiveLabel}>
          {label}
        </Text>
      </Animated.View>
    </View>
  );
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Əsas",
          tabBarIcon: ({ focused }) => (
            <AnimatedTab
              focused={focused}
              label="Əsas"
              icon={<Ionicons name="home" />}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="favourites"
        options={{
          title: "Favorilər",
          tabBarIcon: ({ focused }) => (
            <AnimatedTab
              focused={focused}
              label="Favorilər"
              icon={<MaterialIcons name="bookmark" />}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="video"
        options={{
          title: "Video",
          tabBarIcon: ({ focused }) => (
            <AnimatedTab
              focused={focused}
              label="Video"
              icon={<Ionicons name="play-circle" />}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="basket"
        options={{
          title: "Səbət",
          tabBarIcon: ({ focused }) => (
            <AnimatedTab
              focused={focused}
              label="Səbət"
              icon={<MaterialIcons name="shopping-bag" />}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ focused }) => (
            <AnimatedTab
              focused={focused}
              label="Profil"
              icon={<FontAwesome5 name="user" />}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 30, // Aşağıdan məsafə
    marginHorizontal: 30, // SAĞ VƏ SOLDAN KİÇİLT (Bura əsas hissədir)
    height: 70,
    backgroundColor: "#FFFFFF",
    borderRadius: 35,
    // Kölgə effektləri
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
    borderTopWidth: 0,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between", // Elementlər arası məsafəni bərabər bölür
    alignItems: "center",
  },

  tabWrapper: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    flex: 1, // Bərabər sahə tutması üçün
  },

  pillContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    borderRadius: 20,
    // position absolute ETMİRİK ki, layout axını pozulmasın
  },

  iconContainer: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },

  activeLabel: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 11,
    paddingRight: 8, // Sağ tərəfdən bir az boşluq
  },

  inactiveLabelContainer: {
    position: "absolute",
    bottom: 8, // Ən aşağıda yerləşir
    width: "100%",
    alignItems: "center",
  },

  inactiveLabel: {
    color: INACTIVE_GRAY,
    fontSize: 9,
    fontWeight: "600",
  },
});
