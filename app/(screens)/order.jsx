import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { useRouter, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Font } from "../../constant/fonts";
import Container from "../../components/Container";

const OrderPage = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Sifariş",
          headerTitleStyle: { fontFamily: Font.bold, fontSize: 22 },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backBtn}>
              <Ionicons name="chevron-back" size={24} color="#000" />
            </TouchableOpacity>
          ),
          headerShadowVisible: false,
          headerTitleAlign: "center",
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <Container>
          {/* Delivery Date & Time */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Çatdırılma tarixi</Text>
            <Text style={styles.boldText}>Çərşənbə, 03 dekabr 2025-ci il</Text>
            <Text style={styles.subText}>Saat 13:35</Text>
          </View>

          <View style={styles.divider} />

          {/* Delivery Address */}
          <TouchableOpacity style={styles.selectionRow}>
            <View style={styles.flex1}>
              <Text style={styles.sectionLabel}>Çatdırılma Ünvanı</Text>
              <Text style={styles.boldText}>Ev</Text>
              <Text style={styles.subText}>Baku, Azerbaijan</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#000" />
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Payment Method */}
          <TouchableOpacity style={styles.selectionRow}>
            <View style={styles.flex1}>
              <Text style={styles.sectionLabel}>Ödəniş</Text>
              <Text style={styles.boldText}>Bank və Kredit kartı ilə ödə</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#000" />
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Order Summary */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Sifariş</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>Yarpaq Dolması</Text>
              <Text style={styles.summaryPrice}>4.95 AZN</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>Çatdırılma</Text>
              <Text style={styles.summaryPrice}>1.20 AZN</Text>
            </View>
            <View style={[styles.summaryRow, { marginTop: 15 }]}>
              <Text style={styles.totalLabel}>Cəmi</Text>
              <Text style={styles.totalPrice}>6.15 AZN</Text>
            </View>
          </View>

          {/* Promo Code */}
          <View style={styles.promoContainer}>
            <TextInput
              style={styles.promoInput}
              placeholder="Promo kod"
              placeholderTextColor="#828282"
            />
            <View style={styles.promoBadge}>
              <Text style={styles.promoBadgeText}>15% endirim</Text>
            </View>
          </View>
        </Container>
      </ScrollView>

      {/* Sticky Footer */}
      <View style={styles.footer}>
        <View style={styles.footerContainer}>
          <View style={styles.footerPriceContainer}>
            <Text style={styles.footerPrice}>Qiymət 6.15 AZN</Text>
          </View>
          <TouchableOpacity
            style={styles.confirmBtn}
            onPress={() => router.push("/(screens)/payment")}>
            <Text style={styles.confirmBtnText}>Sifarişi təstiqlə</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OrderPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backBtn: {
    padding: 8,
  },
  scrollContent: {
    paddingTop: 10,
    paddingBottom: 120,
  },
  section: {
    marginVertical: 10,
  },
  sectionLabel: {
    fontSize: 18,
    fontFamily: Font.bold,
    color: "#BDBDBD",
    marginBottom: 8,
  },
  boldText: {
    fontSize: 18,
    fontFamily: Font.bold,
    color: "#000",
    marginBottom: 4,
  },
  subText: {
    fontSize: 16,
    fontFamily: Font.medium,
    color: "#4F4F4F",
  },
  divider: {
    height: 1,
    backgroundColor: "#F2F2F2",
    marginVertical: 15,
  },
  selectionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  flex1: {
    flex: 1,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 16,
    fontFamily: Font.medium,
    color: "#000",
  },
  summaryPrice: {
    fontSize: 16,
    fontFamily: Font.bold,
    color: "#000",
  },
  totalLabel: {
    fontSize: 20,
    fontFamily: Font.bold,
    color: "#000",
  },
  totalPrice: {
    fontSize: 20,
    fontFamily: Font.bold,
    color: "#000",
  },
  promoContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 30,
    paddingHorizontal: 15,
    height: 56,
    marginTop: 30,
  },
  promoInput: {
    flex: 1,
    fontSize: 18,
    fontFamily: Font.medium,
    color: "#000",
  },
  promoBadge: {
    backgroundColor: "#08A30D",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  promoBadgeText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: Font.bold,
  },
  footer: {
    position: "absolute",
    bottom: 60,
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
  footerPriceContainer: {
    flex: 1,
    paddingLeft: 20,
  },
  footerPrice: {
    fontSize: 18,
    fontFamily: Font.bold,
    color: "#08A30D",
  },
  confirmBtn: {
    backgroundColor: "#08A30D",
    borderRadius: 30,
    paddingHorizontal: 30,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  confirmBtnText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: Font.bold,
  },
});
