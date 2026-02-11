import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Image,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { Ionicons, Feather } from "@expo/vector-icons";
import { Font } from "../constant/fonts";
import { ALL_COLOR } from "../constant/all-color";

// Mock Data
const orders = [
  {
    id: "1",
    date: "02.08.25",
    total: "13.98 AZN",
    status: "Çatdırıldı",
    itemCount: 2,
    images: [
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D",
    ],
  },
  {
    id: "2",
    date: "28.07.25",
    total: "4.36 AZN",
    status: "Çatdırıldı",
    itemCount: 1,
    images: [
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D",
    ],
  },
];

const OrderCard = ({ order }) => {
  const router = useRouter();

  return (
    <View style={styles.cardContainer}>
      {/* Header: Date & Price + Details Link */}
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.dateText}>{order.date}</Text>
          <Text style={styles.totalText}>
            Ümumi: <Text style={styles.totalValue}>{order.total}</Text>
          </Text>
        </View>
        <TouchableOpacity
          style={styles.detailsLink}
          onPress={() =>
            router.push({
              pathname: "/order-details",
              params: { id: order.id },
            })
          }>
          <Text style={styles.detailsText}>Təfərrüatlar</Text>
          <Ionicons name="chevron-forward" size={16} color="#0B0E0B" />
        </TouchableOpacity>
      </View>

      {/* Status */}
      <View style={styles.statusRow}>
        <Ionicons name="checkmark-sharp" size={20} color="#34C759" />
        <Text style={styles.statusText}>{order.status}</Text>
      </View>

      {/* Images */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.imagesContainer}>
        {order.images.map((img, index) => (
          <Image
            key={index}
            source={{ uri: img }}
            style={styles.productImage}
          />
        ))}
      </ScrollView>

      {/* Footer: Item Count */}
      <Text style={styles.itemCountText}>
        {order.itemCount} məhsul təslim edildi
      </Text>

      <View style={styles.separator} />
    </View>
  );
};

const MyOrders = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#0B0E0B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sifarişlərim</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.contentContainer}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Feather
            name="search"
            size={20}
            color="#A29E9E"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Axtar"
            placeholderTextColor="#A29E9E"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Orders List */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default MyOrders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
   paddingTop: 40,
    paddingBottom: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: Font.bold,
    color: "#0B0E0B",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E5EA",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
    marginTop: 10,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: Font.regular,
    color: "#0B0E0B",
  },
  scrollContent: {
    paddingBottom: 20,
  },
  cardContainer: {
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  dateText: {
    fontSize: 14,
    fontFamily: Font.regular,
    color: "#A29E9E",
    marginBottom: 4,
  },
  totalText: {
    fontSize: 16,
    fontFamily: Font.regular,
    color: "#A29E9E",
  },
  totalValue: {
    color: "#0B0E0B",
    fontWeight: "600", // Semi-bold look for price
  },
  detailsLink: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailsText: {
    fontSize: 14,
    fontFamily: Font.medium,
    color: "#0B0E0B",
    marginRight: 4,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  statusText: {
    fontSize: 16,
    fontFamily: Font.medium,
    color: "#34C759",
    marginLeft: 6,
  },
  imagesContainer: {
    flexDirection: "row",
    marginBottom: 12,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 12,
    backgroundColor: "#F2F2F7",
  },
  itemCountText: {
    fontSize: 14,
    fontFamily: Font.regular,
    color: "#A29E9E",
    marginBottom: 16,
  },
  separator: {
    height: 1,
    backgroundColor: "#E5E5EA",
    width: "100%",
  },
});
