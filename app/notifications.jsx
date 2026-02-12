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
import { useRouter, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Font } from "../constant/fonts";
import { ALL_COLOR } from "../constant/all-color";

// Mock Data
const notificationsToday = [
  {
    id: "1",
    title: "Sifariş təsdiqi",
    description: "2458659 nömrəli sifarişiniz alınmışdır tezliklə sifarişiniz hazırlanıb yola çıxacaq.",
    time: "İndi",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D",
    isNew: true,
  },
];

const notificationsYesterday = [
  {
    id: "2",
    title: "Sifariş çatdırılmışdır",
    description: "5648235 sifarişiniz qeyd etdiyiniz ünvana çatdırılmışdır.",
    time: "13:56",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D",
    isNew: false,
  },
  {
    id: "3",
    title: "Sifariş təsdiqi",
    description: "7548621 sifarişiniz alınmışdır tezliklə sifarişiniz hazırlanıb yola çıxacaq.",
    time: "11:37",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D",
    isNew: false,
  },
];

const NotificationItem = ({ item }) => (
  <View style={[styles.notificationCard, item.isNew && styles.newNotificationCard]}>
    <Image source={{ uri: item.image }} style={styles.notificationImage} />
    <View style={styles.notificationContent}>
      <View style={styles.notificationHeader}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationTime}>{item.time}</Text>
      </View>
      <Text style={styles.notificationDescription}>{item.description}</Text>
    </View>
  </View>
);

const Notifications = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#0B0E0B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bildirişlər</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Today Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Bu gün</Text>
          <TouchableOpacity>
            <Text style={styles.markAllRead}>Hamısını oxundu et</Text>
          </TouchableOpacity>
        </View>

        {notificationsToday.map((item) => (
          <NotificationItem key={item.id} item={item} />
        ))}

        {/* Yesterday Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Dünən</Text>
        </View>

        {notificationsYesterday.map((item) => (
          <NotificationItem key={item.id} item={item} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notifications;

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
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: Font.bold,
    color: "#0B0E0B",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Font.bold,
    color: "#0B0E0B",
  },
  markAllRead: {
    fontSize: 14,
    fontFamily: Font.medium,
    color: "#34C759", // Green color matching the design
  },
  notificationCard: {
    flexDirection: "row",
    padding: 12,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E5EA",
  },
  newNotificationCard: {
    borderColor: "#34C759", // Green border for new notifications
    backgroundColor: "#F2FCF4", // Slight green tint background
  },
  notificationImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontFamily: Font.bold,
    color: "#0B0E0B",
    flex: 1,
  },
  notificationTime: {
    fontSize: 12,
    fontFamily: Font.regular,
    color: "#A29E9E",
    marginLeft: 8,
    marginTop: 2,
  },
  notificationDescription: {
    fontSize: 13,
    fontFamily: Font.regular,
    color: "#666",
    lineHeight: 18,
  },
});
