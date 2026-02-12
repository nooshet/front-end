import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons, Feather } from "@expo/vector-icons";
import { Font } from "../constant/fonts";

const OrderDetails = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  const orderInfo = {
    deliveryDate: "04.12.25",
    orderNo: "4185252",
    finCode: "RG45LKF",
    seller: "Bəsti xalanın mətbəxi",
    status: "Çatdırıldı",
    deliveryMsg: "Məhsulunuz sifariş verərkən seçdiyiniz ünvana çatdırıldı",
    cargoCompany: "SezarCargo",
    products: [
      {
        id: "p1",
        name: "Yarpaq Dolması",
        description:
          "Düyü, soğan, göyərti, pomidor pastası, zeytun yağı və ədviyyatlar.",
        quantity: "1 porsiya",
        price: "4.95 AZN",
        image:
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      },
      {
        id: "p2",
        name: "Səbzili aş",
        description:
          "Düyü, soğan, yerkökü, kartof, pomidor, bol göyərti, ədviyyat və yağ.",
        quantity: "1 porsiya",
        price: "7.38 AZN",
        image:
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      },
    ],
  };

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

      <ScrollView contentContainerStyle={styles.content}>
        {/* Order Info Header */}
        <View style={styles.orderInfoContainer}>
          <Text style={styles.infoLine}>
            <Text style={styles.infoLabel}>Təxmini çatdırılma müddəti:</Text>{" "}
            <Text style={styles.infoValue}>{orderInfo.deliveryDate}</Text>
          </Text>
          <Text style={styles.infoLine}>
            <Text style={styles.infoLabel}>Çatdırılma №:</Text>{" "}
            <Text style={styles.infoValue}>{orderInfo.orderNo}</Text>
          </Text>
          <Text style={styles.infoLine}>
            <Text style={styles.infoLabel}>Fin Kod:</Text>{" "}
            <Text style={styles.infoValue}>{orderInfo.finCode}</Text>
          </Text>
          <Text style={styles.infoLine}>
            <Text style={styles.infoLabel}>Satıcı:</Text>{" "}
            <Text style={styles.infoValue}>{orderInfo.seller}</Text>
          </Text>
        </View>

        <View style={styles.separator} />

        {orderInfo.products.map((product, index) => (
          <View key={product.id}>
            {/* Delivery Status */}
            <View style={styles.statusContainer}>
              <View style={styles.statusRow}>
                <Ionicons name="checkmark-sharp" size={20} color="#34C759" />
                <Text style={styles.statusText}>{orderInfo.status}</Text>
              </View>
              <Text style={styles.deliveryMsg}>{orderInfo.deliveryMsg}</Text>
              <Text style={styles.cargoCompany}>
                Yükdaşıma şirkəti:{" "}
                <Text style={styles.boldText}>{orderInfo.cargoCompany}</Text>
              </Text>
            </View>

            {/* Product Card */}
            <View style={styles.productCard}>
              <Image
                source={{ uri: product.image }}
                style={styles.productImage}
              />
              <View style={styles.productDetails}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productDescription} numberOfLines={2}>
                  {product.description}
                </Text>
                <Text style={styles.productMeta}>
                  Miqdar:{" "}
                  <Text style={styles.boldText}>{product.quantity}</Text>
                </Text>
                <Text style={styles.productMeta}>
                  Qiymət: <Text style={styles.boldText}>{product.price}</Text>
                </Text>
              </View>
            </View>

            {/* Actions */}
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={[styles.actionButton, styles.rateButton]}
                onPress={() => router.push("/rate-product")}>
                <Text style={styles.rateButtonText}>Məhsulu qiymətləndir</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.followButton]}>
                <Text style={styles.followButtonText}>Satıcını izlə</Text>
              </TouchableOpacity>
            </View>

            {/* Support Links */}
            <View style={styles.supportLinks}>
              <TouchableOpacity style={styles.supportItem}>
                <Feather name="headphones" size={20} color="#0B0E0B" />
                <Text style={styles.supportText}>NooshEt köməkçisi</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.supportItem}>
                <Ionicons
                  name="document-text-outline"
                  size={20}
                  color="#0B0E0B"
                />
                <Text style={styles.supportText}>Faktura</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.separator} />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
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
  content: {
    paddingBottom: 40,
  },
  orderInfoContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  infoLine: {
    fontSize: 14,
    marginBottom: 6,
    color: "#8E8E93",
    fontFamily: Font.regular,
  },
  infoLabel: {
    color: "#A29E9E",
  },
  infoValue: {
    color: "#0B0E0B",
    fontFamily: Font.medium,
  },
  separator: {
    height: 1,
    backgroundColor: "#E5E5EA",
    marginVertical: 10,
    width: "90%",
    alignSelf: "center",
  },
  statusContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  statusText: {
    fontSize: 16,
    fontFamily: Font.bold,
    color: "#34C759",
    marginLeft: 6,
  },
  deliveryMsg: {
    fontSize: 12,
    color: "#A29E9E",
    fontFamily: Font.regular,
    marginBottom: 4,
  },
  cargoCompany: {
    fontSize: 14,
    color: "#8E8E93",
    fontFamily: Font.regular,
  },
  boldText: {
    fontFamily: Font.medium,
    color: "#0B0E0B",
  },
  productCard: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginRight: 16,
    backgroundColor: "#F2F2F7",
  },
  productDetails: {
    flex: 1,
    justifyContent: "center",
  },
  productName: {
    fontSize: 16,
    fontFamily: Font.bold,
    color: "#0B0E0B",
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 12,
    color: "#3C3C4399", // secondary label color
    fontFamily: Font.regular,
    marginBottom: 8,
  },
  productMeta: {
    fontSize: 14,
    color: "#8E8E93",
    marginBottom: 2,
    fontFamily: Font.regular,
  },
  actionButtons: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  rateButton: {
    backgroundColor: "#08A30D", // Green
    borderColor: "#08A30D",
  },
  rateButtonText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: Font.medium,
  },
  followButton: {
    backgroundColor: "#fff",
    borderColor: "#34C759",
  },
  followButtonText: {
    color: "#0B0E0B",
    fontSize: 14,
    fontFamily: Font.medium,
  },
  supportLinks: {
    paddingHorizontal: 20,
    gap: 12,
  },
  supportItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  supportText: {
    fontSize: 14,
    color: "#A29E9E", // Light gray
    fontFamily: Font.regular,
  },
});
