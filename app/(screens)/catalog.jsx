import { View, Text } from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ScreenHeader from "../../components/ScreenHeader";
import { router } from "expo-router";
import { handleBackBtnPress } from "../../helper/backButtonFunction";
import Search from "../../components/Search";
import { useLocalSearchParams, useSearchParams } from "expo-router/build/hooks";
import FoodScrollViewVertical from "../../components/FoodScrollViewVertical";
import { FOOD_DATA } from "../../mock/FOOD_DATA";
import FoodCard from "../../components/FoodCard";

const CatalogScreen = () => {
  const { title } = useLocalSearchParams();

  const [search, setSearch] = useState("");
  const inputRef = useRef(null);

  return (
    <SafeAreaView>
      <ScreenHeader title={title} onBackPress={handleBackBtnPress} />
      <Search
        search={search}
        setSearch={setSearch}
        inputRef={inputRef}
        placeholder="Nə axtarırsan?"
      />

      <FoodScrollViewVertical
        data={FOOD_DATA}
        renderItem={({ item, index }) => (
          <FoodCard
            title={item.title}
            rating={item.rating}
            image={item.image}
            price={item.price}
            index={index}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default CatalogScreen;
