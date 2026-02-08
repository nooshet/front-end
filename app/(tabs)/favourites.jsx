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

const CUSTOM_BUTTONS = [
  { id: 1, title: "Yeməklər" },
  { id: 2, title: "Videolar" },
];

const FavouriteScreen = () => {
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);
  const [activeTab, setActiveTab] = useState("Yeməklər");

  const handleTabPress = (title) => {
    setActiveTab(title);
  };

  const renderContent = () => {
    if (activeTab === "Yeməklər") {
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
        <ScreenHeader title="Favorilərim" />
        <Search
          inputRef={inputRef}
          search={search}
          setSearch={setSearch}
          placeholder="Nə axtarırsan?"
        />

        <View style={styles.buttonContainer}>
          {CUSTOM_BUTTONS.map((btn) => {
            const isSelected = activeTab === btn.title;
            return (
              <CustomButton
                key={btn.id}
                title={btn.title}
                variant={isSelected ? "primary" : "outline"}
                onPress={() => handleTabPress(btn.title)}
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
