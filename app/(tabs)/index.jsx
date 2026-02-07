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
import FoodCard from "../../components/FoodCard";
import FeaturesSection from "../../components/home/FeaturesSection";

const HomeScreen = () => {
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);

  const categories = [
    { id: 1, title: "Gündəlik\nyeməklər", active: true },
    { id: 2, title: "Dietik\nyeməklər", active: false },
    { id: 3, title: "Uşaq\nyeməkləri", active: false },
    { id: 4, title: "Salatlar və\nqəlyanaltılar", active: false },
    { id: 5, title: "İçkilər", active: false },
  ];

  const FOOD_DATA = [
    {
      id: "1",
      title: "Klassik Burger Menyu",
      price: 12.5,
      rating: 4.8,
      // Şəkli internetdən götürürük (obyekt kimi)
      image: {
        uri: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=699&q=80",
      },
      description: "Təzə mal əti, çedar pendiri və xüsusi sous ilə.",
    },
    {
      id: "2",
      title: "Margarita Pizza",
      price: 15.0,
      rating: 4.5,
      image: {
        uri: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      },
      description: "İtalyan xəmiri, mozzarella pendiri və pomidor sousu.",
    },
    {
      id: "3",
      title: "Sezar Salatı",
      price: 9.8,
      rating: 4.3,
      image: {
        uri: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      },
      description: "Toyuq filesi, aysberq kahı və parmezan pendiri.",
    },
    {
      id: "4",
      title: "Suşi Seti (24 ədəd)",
      price: 35.0,
      rating: 4.9,
      image: {
        uri: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      },
      description: "Filadelfiya, Kaliforniya və Maki rolları.",
    },
    {
      id: "5",
      title: "Qril Toyuq",
      price: 18.5,
      rating: 4.6,
      image: {
        uri: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      },
      description: "Odun atəşində bişmiş bütöv toyuq.",
    },
  ];

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
          <Search inputRef={inputRef} search={search} setSearch={setSearch} />
          <Banner />
          <SectionHeader title="Kateqoriyalar" />
        </Container>

        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScroll}
          >
            {categories.map((item, index) => (
              <TouchableOpacity key={item.id} style={styles.categoryItem}>
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
        <FeaturesSection FOOD_DATA={FOOD_DATA} title={"Günün menyusu"} />

        {/* Populyar ev yemeyi */}
        <FeaturesSection
          FOOD_DATA={FOOD_DATA}
          title={"Populyar ev yeməkləri "}
        />

        {/* Yeni menyular */}
        <FeaturesSection FOOD_DATA={FOOD_DATA} title={"Yeni menyular"} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ekranı tam tutması üçün vacibdir
    backgroundColor: "#fff",
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
