import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { useRouter, Stack } from "expo-router";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Font } from "../../constant/fonts";
import Container from "../../components/Container";

const { width, height } = Dimensions.get("window");

const OrderDetailsPage = () => {
  const router = useRouter();

  const StepItem = ({
    label,
    icon,
    isActive,
    isCompleted,
    isFirst,
    isLast,
  }) => (
    <View style={styles.stepItem}>
      <View style={styles.stepIndicatorContainer}>
        {/* Connection Line */}
        {!isFirst && (
          <View style={[styles.line, isCompleted && styles.completedLine]} />
        )}

        <View
          style={[
            styles.stepCircle,
            isActive && styles.activeStepCircle,
            isCompleted && styles.completedStepCircle,
          ]}>
          {isCompleted ? (
            <Ionicons name="checkmark" size={20} color="#fff" />
          ) : isActive ? (
            <MaterialIcons name="hourglass-empty" size={20} color="#fff" />
          ) : null}
        </View>

        {!isLast && (
          <View style={[styles.line, isCompleted && styles.completedLine]} />
        )}
      </View>
      <Text
        style={[
          styles.stepLabel,
          (isActive || isCompleted) && styles.activeStepLabel,
        ]}>
        {label}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Alınan sifariş",
          headerTitleStyle: { fontFamily: Font.bold, fontSize: 24 },
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

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Map Placeholder */}
        <View style={styles.mapContainer}>
          <Image
            source={{
              uri: "https://miro.medium.com/max/4068/1*q3Zkv_8MInoYpwsas4sqGw.png",
            }}
            style={styles.mapBackground}
            resizeMode="cover"
          />
          {/* Overlay Route/Markers Simulation */}
          <View style={styles.mapOverlay}>
            <View style={styles.courierMarker}>
              <View style={styles.markerCircle}>
                <Ionicons name="bus" size={20} color="#fff" />
              </View>
            </View>
            <View style={styles.homeMarker}>
              <View
                style={[styles.markerCircle, { backgroundColor: "#08A30D" }]}>
                <MaterialIcons name="home-work" size={20} color="#fff" />
              </View>
              <Text style={styles.markerLabel}>Evim</Text>
            </View>
          </View>
        </View>

        <Container>
          <View style={styles.statusSection}>
            <View style={styles.statusHeader}>
              <View>
                <Text style={styles.statusTitle}>Sifariş hazırlanır</Text>
                <Text style={styles.statusTime}>Gəlmə: 13:35</Text>
              </View>
              <Text style={styles.otpText}>OTP: 5187452</Text>
            </View>

            {/* Step Indicator */}
            <View style={styles.stepsContainer}>
              <StepItem
                label="Qəbul edildi"
                isCompleted={true}
                isFirst={true}
              />
              <StepItem label="Hazırlanır" isActive={true} />
              <StepItem label="Götürmə" />
              <StepItem label="Çatdırıldı" isLast={true} />
            </View>

            <View style={styles.divider} />

            {/* Courier Call */}
            <View style={styles.courierRow}>
              <View style={styles.courierInfo}>
                <Text style={styles.courierTitle}>Kuryeyə zəng et</Text>
                <Text style={styles.courierSubtitle}>
                  Əlavə məlumat üçün kuryerə zəng edin
                </Text>
              </View>
              <TouchableOpacity style={styles.callBtn}>
                <Ionicons name="call" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            {/* Action Buttons */}
            <TouchableOpacity
              style={styles.backToShoppingBtn}
              onPress={() => router.push("/(tabs)/home")}>
              <Text style={styles.backToShoppingText}>Alış-verişə qayıt</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelLink}>
              <Text style={styles.cancelText}>
                Sifarişi <Text style={styles.cancelBold}>ləğv etmək</Text>{" "}
                istəyirsiniz?
              </Text>
            </TouchableOpacity>
          </View>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderDetailsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backBtn: {
    padding: 8,
  },
  mapContainer: {
    width: width,
    height: height * 0.4,
    backgroundColor: "#E0E0E0",
  },
  mapBackground: {
    width: "100%",
    height: "100%",
    opacity: 0.7,
  },
  mapOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  courierMarker: {
    position: "absolute",
    top: "20%",
    left: "20%",
  },
  homeMarker: {
    position: "absolute",
    bottom: "30%",
    right: "25%",
    alignItems: "center",
  },
  markerCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EB5757",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  markerLabel: {
    fontSize: 16,
    fontFamily: Font.bold,
    color: "#000",
    marginTop: 4,
  },
  statusSection: {
    paddingTop: 30,
    paddingBottom: 40,
  },
  statusHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 30,
  },
  statusTitle: {
    fontSize: 28,
    fontFamily: Font.bold,
    color: "#000",
  },
  statusTime: {
    fontSize: 18,
    fontFamily: Font.medium,
    color: "#828282",
    marginTop: 4,
  },
  otpText: {
    fontSize: 18,
    fontFamily: Font.medium,
    color: "#BDBDBD",
  },
  stepsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 10,
    marginBottom: 40,
  },
  stepItem: {
    alignItems: "center",
    flex: 1,
  },
  stepIndicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
    marginBottom: 10,
  },
  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  activeStepCircle: {
    backgroundColor: "#08A30D",
  },
  completedStepCircle: {
    backgroundColor: "#08A30D",
  },
  line: {
    position: "absolute",
    width: "100%",
    height: 2,
    backgroundColor: "#E0E0E0",
    left: "50%",
    zIndex: 1,
  },
  completedLine: {
    backgroundColor: "#08A30D",
  },
  stepLabel: {
    fontSize: 12,
    fontFamily: Font.medium,
    color: "#BDBDBD",
    textAlign: "center",
  },
  activeStepLabel: {
    color: "#000",
    fontFamily: Font.bold,
  },
  divider: {
    height: 1,
    backgroundColor: "#F2F2F2",
    marginVertical: 40,
  },
  courierRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
  },
  courierInfo: {
    flex: 1,
  },
  courierTitle: {
    fontSize: 20,
    fontFamily: Font.bold,
    color: "#1A1A1A",
  },
  courierSubtitle: {
    fontSize: 14,
    fontFamily: Font.medium,
    color: "#828282",
    marginTop: 4,
  },
  callBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#08A30D",
    justifyContent: "center",
    alignItems: "center",
  },
  backToShoppingBtn: {
    width: "100%",
    height: 64,
    borderRadius: 32,
    borderWidth: 1.5,
    borderColor: "#08A30D",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  backToShoppingText: {
    color: "#08A30D",
    fontSize: 22,
    fontFamily: Font.bold,
  },
  cancelLink: {
    alignItems: "center",
  },
  cancelText: {
    fontSize: 16,
    fontFamily: Font.medium,
    color: "#BDBDBD",
  },
  cancelBold: {
    color: "#000",
    fontFamily: Font.bold,
  },
});
