import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import Container from "../../components/Container";
import Search from "../../components/Search";
import FoodCard from "../../components/FoodCard";
import { FOOD_DATA } from "../../mock/FOOD_DATA";
import { ALL_COLOR } from "../../constant/all-color";
import { Font } from "../../constant/fonts";

const BasketScreen = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);

  const basketItems = FOOD_DATA.slice(0, 2);
  const totalPrice = basketItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <SafeAreaView style={styles.container}>
      <Container>
        <Text style={styles.headerTitle}>{t("basket.title") || "Səbət"}</Text>
        <Search
          inputRef={inputRef}
          search={search}
          setSearch={setSearch}
          placeholder={t("home.searchPlaceholder")}
          filter
        />
      </Container>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.itemsGrid}>
          {basketItems.map((item, index) => (
            <FoodCard
              key={item.id}
              title={item.title}
              price={item.price}
              rating={item.rating}
              image={item.image}
              index={index}
              hideButton={true}
            />
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.footerContainer}>
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>Qiymət {totalPrice.toFixed(2)}</Text>
          </View>
          <TouchableOpacity 
            style={styles.payButton} 
            onPress={() => router.push("/(screens)/product-detail")}
          >
            <Text style={styles.payButtonText}>Ödə</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: Font.bold,
    textAlign: "center",
    marginBottom: 20,
    color: "#000",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
    paddingTop: 20,
  },
  itemsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  footer: {
    position: "absolute",
    bottom: 130,
    left: 16,
    right: 16,
  },
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#4CAF50",
    borderRadius: 30,
    padding: 4,
    height: 56,
  },
  priceContainer: {
    flex: 1,
    paddingLeft: 20,
  },
  priceLabel: {
    fontSize: 18,
    fontFamily: Font.semibold,
    color: "#4CAF50",
  },
  payButton: {
    backgroundColor: "#16A34A",
    borderRadius: 25,
    paddingHorizontal: 40,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  payButtonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: Font.bold,
  },
});
