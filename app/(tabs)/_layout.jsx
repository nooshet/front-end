import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  LayoutAnimation,
  UIManager,
  Image, // <--- Image komponentini əlavə etdik
} from "react-native";
import { Tabs } from "expo-router";
import { ALL_COLOR } from "../../constant/all-color";
import { Font } from "../../constant/fonts";
import { Icons } from "../../constant/icons/icons";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const PRIMARY_GREEN = ALL_COLOR["--bg-color"];
const INACTIVE_COLOR = ALL_COLOR["--bg-color"];
const WHITE = ALL_COLOR["--white"];

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut,
            );
            navigation.navigate(route.name);
          }
        };

        // --- İKON MƏNTİQİ ---
        // Route adına (index, favourites, video...) uyğun ikonu seçirik
        const iconSet = Icons[route.name];
        // Aktivdirsə active, deyilsə inactive versiyanı götürürük
        const iconSource = isFocused ? iconSet?.active : iconSet?.inactive;

        // Mətn məntiqi
        const labelText = options.title;

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            activeOpacity={0.8}
            style={[
              styles.tabItem,
              isFocused ? styles.tabItemFocused : styles.tabItemInactive,
            ]}>
            {/* İKON HİSSƏSİ (ARTIQ IMAGE) */}
            <View
              style={{
                marginRight: isFocused ? 8 : 0,
                marginBottom: isFocused ? 0 : 4,
              }}>
              {/* Vektor ikonları əvəzinə Image işlədirik */}
              {iconSource && (
                <Image
                  source={iconSource}
                  style={{
                    width: isFocused ? 22 : 24,
                    height: isFocused ? 22 : 24,
                    resizeMode: "contain",
                    // Əgər PNG-lərin rəngini kodla dəyişmək istəyirsinizsə:
                    tintColor: isFocused ? WHITE : INACTIVE_COLOR,
                  }}
                />
              )}
            </View>

            {/* MƏTN HİSSƏSİ */}
            <Text
              numberOfLines={2}
              adjustsFontSizeToFit={true}
              minimumFontScale={0.8}
              style={[
                styles.label,
                {
                  color: isFocused ? WHITE : INACTIVE_COLOR,
                  fontSize: isFocused ? 13 : 10,
                  textAlign: isFocused ? "left" : "center",
                  lineHeight: isFocused ? 14 : 12,
                },
              ]}>
              {labelText}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

import { useTranslation } from "react-i18next";

export default function TabLayout() {
  const { t } = useTranslation();

  return (
    <Tabs
      tabBar={(props) => <MyTabBar {...props} />}
      screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: t("tabs.home") }} />
      <Tabs.Screen name="favourites" options={{ title: t("tabs.favorites") }} />
      <Tabs.Screen name="video" options={{ title: t("tabs.video") }} />
      <Tabs.Screen name="basket" options={{ title: t("tabs.basket") }} />
      <Tabs.Screen name="profile" options={{ title: t("tabs.profile") }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    position: "absolute",
    bottom: 50,
    left: 20,
    right: 20,
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 35,
    padding: 10,
    height: 75,
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    height: "100%",
  },

  tabItemFocused: {
    flex: 2.5, // Genişliyi bir az artırdım (2 -> 2.5) ki, mətn tam yerləşsin
    flexDirection: "row",
    backgroundColor: PRIMARY_GREEN,
    paddingHorizontal: 15,
  },

  tabItemInactive: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "transparent",
    paddingVertical: 5,
  },
  label: {
    fontFamily: Font.semibold,
    fontWeight: "600",
  },
});
