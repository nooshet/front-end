import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { useRouter, Stack } from "expo-router";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Font } from "../../constant/fonts";
import Container from "../../components/Container";

const { width } = Dimensions.get("window");

const OrderTrackingPage = () => {
  const router = useRouter();

  const TrackingItem = ({ icon, title, subtitle, isBoldSubtitle }) => (
    <View style={styles.trackingItem}>
      <View style={styles.iconCircle}>{icon}</View>
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle}>{title}</Text>
        <Text
          style={[styles.itemSubtitle, isBoldSubtitle && styles.boldSubtitle]}>
          {subtitle}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backBtn}>
              <Ionicons name="chevron-back" size={24} color="#000" />
            </TouchableOpacity>
          ),
          headerShadowVisible: false,
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerSection}>
          <View style={styles.truckIconContainer}>
            <MaterialCommunityIcons
              name="truck-fast"
              size={80}
              color="#08A30D"
            />
          </View>

          <Text style={styles.title}>Çatdırılma prosesi</Text>
          <Text style={styles.statusDescription}>
            Sifariş etdiyiniz məhsul{"\n"}Hazırlanma mərhələsindədir.
          </Text>

          <Text style={styles.orderId}>Sifariş: 5187452</Text>
          <Text style={styles.dateTime}>03.12.2025 ~ Saat 13:35</Text>
        </View>

        <View style={styles.listContainer}>
          <View style={styles.listDivider} />

          <TrackingItem
            icon={<Ionicons name="location-outline" size={24} color="#000" />}
            title="Məkanınız"
            subtitle="Sifarişinizi çatdırmaq üçün yer"
          />

          <View style={[styles.listDivider, { marginLeft: 70 }]} />

          <TrackingItem
            icon={<Ionicons name="time-outline" size={24} color="#000" />}
            title="Təqribi çatdırılmama vaxtı"
            subtitle={
              <Text>
                Məkana çatma vaxtı:{" "}
                <Text style={styles.boldSubtitle}>25 dəqiqə</Text>
              </Text>
            }
          />

          <View style={[styles.listDivider, { marginLeft: 70 }]} />

          <TrackingItem
            icon={<Feather name="phone-call" size={20} color="#000" />}
            title="Kuryeyə zəng et"
            subtitle="Əlavə məlumat üçün kuryerə zəng edin"
          />

          <View style={styles.listDivider} />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.detailsBtn}
            onPress={() => router.push("/(screens)/order-details")}>
            <Text style={styles.detailsBtnText}>Ətraflı</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backToShoppingBtn}
            onPress={() => router.push("/(tabs)/home")}>
            <Text style={styles.backToShoppingText}>Alış-verişə qayıt</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderTrackingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backBtn: {
    padding: 8,
    marginLeft: 10,
  },
  scrollContent: {
    alignItems: "center",
    paddingBottom: 40,
  },
  headerSection: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  truckIconContainer: {
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontFamily: Font.bold,
    color: "#1A1A1A",
    marginBottom: 10,
  },
  statusDescription: {
    fontSize: 16,
    fontFamily: Font.medium,
    color: "#828282",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 20,
  },
  orderId: {
    fontSize: 20,
    fontFamily: Font.medium,
    color: "#1A1A1A",
    marginBottom: 5,
  },
  dateTime: {
    fontSize: 18,
    fontFamily: Font.medium,
    color: "#828282",
  },
  listContainer: {
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  listDivider: {
    height: 1,
    backgroundColor: "#F2F2F2",
  },
  trackingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    // Small shadow or border
  },
  itemContent: {
    marginLeft: 15,
    flex: 1,
  },
  itemTitle: {
    fontSize: 18,
    fontFamily: Font.medium,
    color: "#1A1A1A",
  },
  itemSubtitle: {
    fontSize: 14,
    fontFamily: Font.medium,
    color: "#828282",
    marginTop: 2,
  },
  boldSubtitle: {
    color: "#000",
    fontFamily: Font.bold,
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 40,
    gap: 15,
  },
  detailsBtn: {
    backgroundColor: "#08A30D",
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  detailsBtnText: {
    color: "#fff",
    fontSize: 22,
    fontFamily: Font.bold,
  },
  backToShoppingBtn: {
    backgroundColor: "#fff",
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#08A30D",
  },
  backToShoppingText: {
    color: "#08A30D",
    fontSize: 22,
    fontFamily: Font.bold,
  },
});
