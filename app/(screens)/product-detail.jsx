import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  FlatList,
} from "react-native";
import { useRouter, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { ALL_COLOR } from "../../constant/all-color";
import { Font } from "../../constant/fonts";
import Container from "../../components/Container";

const { width } = Dimensions.get("window");

const ProductDetail = () => {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  // Mock related products
  const relatedProducts = [
    {
      id: "1",
      title: "3 Bacı Dolması",
      price: 4.71,
      rating: 4.9,
      reviews: 95,
      image: { uri: "https://images.unsplash.com/photo-1547928576-a4a33237bac3?auto=format&fit=crop&w=400&q=80" },
    },
    {
      id: "2",
      title: "Kələm Dolması",
      price: 4.50,
      rating: 4.7,
      reviews: 42,
      image: { uri: "https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?auto=format&fit=crop&w=400&q=80" },
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Səbət",
          headerTitleStyle: { fontFamily: Font.bold, fontSize: 20 },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
              <Ionicons name="chevron-back" size={24} color="#000" />
            </TouchableOpacity>
          ),
          headerShadowVisible: false,
          headerTitleAlign: "center",
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Main Image */}
        <Image
          source={{ uri: "https://images.unsplash.com/photo-1626509135510-4448ad875fa6?auto=format&fit=crop&w=800&q=80" }}
          style={styles.mainImage}
          resizeMode="cover"
        />

        <Container>
          {/* Title and Info */}
          <Text style={styles.title}>Yarpaq dolması</Text>
          
          <View style={styles.infoRow}>
            <View style={styles.ratingBox}>
              <Ionicons name="star" size={16} color="#BDBDBD" />
              <Text style={styles.ratingText}>4.8</Text>
            </View>
            <View style={styles.reviewBox}>
              <Ionicons name="chatbubble-outline" size={16} color="#BDBDBD" />
              <Text style={styles.reviewText}>21 rəy</Text>
            </View>
          </View>

          {/* Price and Quantity */}
          <View style={styles.priceQuantityRow}>
            <View style={styles.priceContainer}>
              <Text style={styles.oldPrice}>5 AZN/kq</Text>
              <Text style={styles.currentPrice}>4.95 AZN</Text>
            </View>
            
            <View style={styles.quantityContainer}>
              <TouchableOpacity 
                style={styles.quantityBtn} 
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Ionicons name="remove" size={20} color="#000" />
              </TouchableOpacity>
              <View style={styles.quantityDisplay}>
                <Text style={styles.quantityText}>{quantity}</Text>
              </View>
              <TouchableOpacity 
                style={[styles.quantityBtn, styles.quantityPlusBtn]} 
                onPress={() => setQuantity(quantity + 1)}
              >
                <Ionicons name="add" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Ingredients */}
          <Text style={styles.sectionTitle}>İnqridientlər</Text>
          <Text style={styles.ingredientsText}>
            Çəkmə mal əti, aromatik düyü, karamelizə soğan, təzə göyərti qarışığı, pomidor konsentratı və seçilmiş ədviyyatlar.
          </Text>

          {/* Similar Products */}
          <Text style={styles.sectionTitle}>Oxşar məhsullar</Text>
          {relatedProducts.map((item) => (
            <View key={item.id} style={styles.relatedCard}>
              <Image source={item.image} style={styles.relatedImage} />
              <View style={styles.relatedInfo}>
                <Text style={styles.relatedTitle}>{item.title}</Text>
                <View style={styles.relatedRatingRow}>
                  <Ionicons name="star" size={12} color="#BDBDBD" style={{ marginRight: 4 }} />
                  <Text style={styles.relatedRatingText}>{item.rating}</Text>
                  <Ionicons name="chatbubble-outline" size={12} color="#BDBDBD" style={{ marginLeft: 15, marginRight: 4 }} />
                  <Text style={styles.relatedRatingText}>{item.reviews} rəy</Text>
                </View>
                <Text style={styles.relatedPrice}>{item.price} AZN</Text>
              </View>
              <TouchableOpacity style={styles.detailBtn}>
                <Text style={styles.detailBtnText}>Ətraflı bax</Text>
              </TouchableOpacity>
            </View>
          ))}
        </Container>
      </ScrollView>

      {/* Sticky Footer */}
      <View style={styles.footer}>
        <View style={styles.footerContainer}>
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Qiymət {(4.95 * quantity).toFixed(2)} AZN</Text>
          </View>
          <TouchableOpacity style={styles.buyBtn} onPress={() => router.push("/(screens)/order")}>
            <Text style={styles.buyBtnText}>Al</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    
  },
  backBtn: {
    padding: 8,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  mainImage: {
    width: width - 32,
    height: 250,
    borderRadius: 30,
    marginHorizontal: 16,
    marginTop: 10,
  },
  title: {
    fontSize: 28,
    fontFamily: Font.bold,
    marginTop: 20,
    color: "#000",
  },
  infoRow: {
    flexDirection: "row",
    marginTop: 12,
    gap: 20,
  },
  ratingBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontFamily: Font.medium,
    color: "#828282",
    marginLeft: 6,
    fontSize: 16,
  },
  reviewBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  reviewText: {
    fontFamily: Font.medium,
    color: "#828282",
    marginLeft: 6,
    fontSize: 16,
  },
  priceQuantityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 25,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  oldPrice: {
    fontSize: 14,
    fontFamily: Font.medium,
    color: "#BDBDBD",
    textDecorationLine: "line-through",
  },
  currentPrice: {
    fontSize: 20,
    fontFamily: Font.bold,
    color: "#08A30D",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    padding: 4,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  quantityBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityDisplay: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
  },
  quantityPlusBtn: {
    backgroundColor: "#08A30D",
  },
  quantityText: {
    fontSize: 18,
    fontFamily: Font.bold,
    color: "#08A30D",
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: Font.bold,
    marginTop: 30,
    marginBottom: 15,
  },
  ingredientsText: {
    fontSize: 16,
    fontFamily: Font.medium,
    color: "#1A1A1A",
    lineHeight: 24,
  },
  relatedCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 10,
    marginBottom: 15,
    // Add subtle shadow for card look
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  relatedImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  relatedInfo: {
    flex: 1,
    marginLeft: 12,
  },
  relatedTitle: {
    fontSize: 16,
    fontFamily: Font.bold,
    color: "#000",
  },
  relatedRatingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  relatedRatingText: {
    fontSize: 12,
    fontFamily: Font.medium,
    color: "#828282",
  },
  relatedPrice: {
    fontSize: 16,
    fontFamily: Font.bold,
    color: "#000",
    marginTop: 4,
  },
  detailBtn: {
    backgroundColor: "#08A30D",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  detailBtnText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: Font.bold,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 16,
    right: 16,
    zIndex: 10,
  },
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#08A30D",
    borderRadius: 40,
    padding: 4,
    height: 64,
    // Add shadow/elevation for Android
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  totalContainer: {
    flex: 1,
    paddingLeft: 20,
  },
  totalLabel: {
    fontSize: 18,
    fontFamily: Font.bold,
    color: "#08A30D",
  },
  buyBtn: {
    backgroundColor: "#08A30D",
    borderRadius: 30,
    paddingHorizontal: 50,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buyBtnText: {
    color: "#fff",
    fontSize: 20,
    fontFamily: Font.bold,
  },
});
