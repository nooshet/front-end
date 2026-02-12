import { View, ScrollView, StyleSheet } from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Container from "../../components/Container";
import ScreenHeader from "../../components/ScreenHeader";
import Search from "../../components/Search";
import CustomButton from "../../components/CustomButton";

import { FOOD_DATA, VIDEO_DATA } from "../../mock/FOOD_DATA";
import FoodCard from "../../components/FoodCard";
import VideoCard from "../../components/VideoCard";

import { useTranslation } from "react-i18next";

// ...

const FavouriteScreen = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);
  
  // Initialize with the translation of the first tab or maintain state ID based logic
  // Better to use IDs for logic and translate display text
  const [activeTabId, setActiveTabId] = useState(1); 

  const CUSTOM_BUTTONS = [
    { id: 1, titleKey: "favorites.tab.foods" },
    { id: 2, titleKey: "favorites.tab.videos" },
  ];

  const handleTabPress = (id) => {
    setActiveTabId(id);
  };

  const renderContent = () => {
    if (activeTabId === 1) {
      return FOOD_DATA.map((food, index) => (
        <View key={food.id} style={styles.cardWrapper}>
          <FoodCard
            title={food.title}
            rating={food.rating}
            image={food.image}
            price={food.price}
            index={index}
          />
        </View>
      ));
    } else {
      return VIDEO_DATA.map((video, index) => (
        <View key={video.id} style={styles.cardWrapper}>
          <VideoCard image={video.image} index={index} />
        </View>
      ));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Container>
        <ScreenHeader title={t("favorites.title")} />
        <Search
          inputRef={inputRef}
          search={search}
          setSearch={setSearch}
          placeholder={t("favorites.searchPlaceholder")}
        />

        <View style={styles.buttonContainer}>
          {CUSTOM_BUTTONS.map((btn) => {
            const isSelected = activeTabId === btn.id;
            return (
              <CustomButton
                key={btn.id}
                title={t(btn.titleKey)}
                variant={isSelected ? "primary" : "outline"}
                onPress={() => handleTabPress(btn.id)}
                style={{ flex: 1 }}
              />
            );
          })}
        </View>
      </Container>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {renderContent()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default FavouriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
       paddingTop: 40,
    paddingBottom: 50,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
    width: "100%",
    // paddingRight: 10,
    paddingBottom: 10,
  },
  scrollContent: {
    paddingBottom: 100,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 16,
  },
  cardWrapper: {
    width: "48%",
    marginTop: 10,
  },
});
