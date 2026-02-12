import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useState, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeHeader from "../../components/home/HomeHeader";
import Search from "../../components/Search";
import Banner from "../../components/home/Banner";
import { ALL_COLOR } from "../../constant/all-color";
import SectionHeader from "../../components/SectionHeader";
import { Font } from "../../constant/fonts";
import Container from "../../components/Container";
import FeaturesSection from "../../components/home/FeaturesSection";
import { FOOD_DATA } from "../../mock/FOOD_DATA";
import { router } from "expo-router";

import { useTranslation } from "react-i18next";

const HomeScreen = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);

  const categories = [
    { id: 1, title: t("home.cat.daily"), active: true },
    { id: 2, title: t("home.cat.diet"), active: false },
    { id: 3, title: t("home.cat.kids"), active: false },
    { id: 4, title: t("home.cat.salads"), active: false },
    { id: 5, title: t("home.cat.drinks"), active: false },
  ];

  const handleCategoryPress = (id) => {
    router.push("(screens)/category");
  };

  const handleAllPress = (title) => {
    console.log("All Pressed");
    router.push({
      pathname: "/(screens)/catalog",
      params: { title: title },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Container>
        <HomeHeader />
      </Container>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Container>
          <Search
            inputRef={inputRef}
            search={search}
            setSearch={setSearch}
            placeholder={t("home.searchPlaceholder")}
            filter
          />
          <Banner />
          <SectionHeader title={t("home.categories")} onPress={handleCategoryPress} />
        </Container>

        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScroll}
          >
            {categories.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={styles.categoryItem}
                onPress={() => handleAllPress(item.title)}
              >
                <View
                  style={[
                    styles.imageContainer,
                    item.active && styles.activeImageContainer,
                  ]}
                >
                  <View style={styles.placeholderImage} />
                </View>
                <Text style={styles.categoryText}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Gunun menusu */}
        <FeaturesSection FOOD_DATA={FOOD_DATA} title={t("home.menuOfDay")} />

        {/* Populyar ev yemeyi */}
        <FeaturesSection
          FOOD_DATA={FOOD_DATA}
          title={t("home.popularHomeFood")}
        />

        {/* Yeni menyular */}
        <FeaturesSection FOOD_DATA={FOOD_DATA} title={t("home.newMenus")} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
       paddingTop: 40,
    paddingBottom: 50,
  },
  categoriesScroll: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  categoryItem: {
    alignItems: "center",
    marginRight: 20,
    width: 80,
  },
  imageContainer: {
    width: 78,
    height: 78,
    borderRadius: 39,
    borderWidth: 2,
    borderColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
  activeImageContainer: {
    borderColor: ALL_COLOR["--bg-color"],
  },
  placeholderImage: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
    backgroundColor: "#e0e0e0",
  },
  categoryText: {
    marginTop: 2,
    textAlign: "center",
    fontSize: 12,
    fontWeight: "500",
    color: "#000",
    fontFamily: Font.medium,
  },
});
