import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ALL_COLOR } from "../../constant/all-color";
import { Font } from "../../constant/fonts";
import FoodCard from "../../components/FoodCard";
import { FOOD_DATA, VIDEO_DATA } from "../../mock/FOOD_DATA";
import Container from "../../components/Container";

const { width } = Dimensions.get("window");

const ChefProfile = () => {
  const { chefName } = useLocalSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("foods"); 

  const chefFoods = FOOD_DATA; 
  const chefVideos = VIDEO_DATA; 

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.chefInfoRow}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: "https://i.pravatar.cc/150?u=" + chefName }}
            style={styles.avatar}
          />
        </View>
        <View style={styles.chefDetails}>
          <Text style={styles.chefTitle}>{chefName || "Gülşən xalanın mətbəxi"}</Text>
          <Text style={styles.chefName}>Gülşən Əliyeva</Text>
          <View style={styles.statusRow}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Hal-hazırda aktivdir</Text>
          </View>
        </View>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === "foods" && styles.activeTab]}
          onPress={() => setActiveTab("foods")}
        >
          <Text style={[styles.tabText, activeTab === "foods" && styles.activeTabText]}>Yeməklər</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === "videos" && styles.activeTab]}
          onPress={() => setActiveTab("videos")}
        >
          <Text style={[styles.tabText, activeTab === "videos" && styles.activeTabText]}>Videolar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "",
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
              <Ionicons name="chevron-back" size={24} color="#000" />
            </TouchableOpacity>
          ),
        }}
      />

      <FlatList
        data={activeTab === "foods" ? chefFoods : chefVideos}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListHeaderComponent={renderHeader}
        renderItem={({ item, index }) => {
          if (activeTab === "foods") {
            return (
              <View style={styles.cardWrapper}>
                <FoodCard
                  title={item.title}
                  price={item.price}
                  rating={item.rating}
                  image={item.image}
                  index={index}
                  width={(width - 50) / 2}
                />
              </View>
            );
          } else {
            return (
              <View style={styles.cardWrapper}>
                <TouchableOpacity activeOpacity={0.9} style={styles.videoCard}>
                  <Image source={item.image} style={styles.videoImage} resizeMode="cover" />
                  <View style={styles.playOverlay}>
                    <View style={styles.playCircle}>
                      <Ionicons name="play" size={24} color="#fff" style={{ marginLeft: 3 }} />
                    </View>
                  </View>
                  <TouchableOpacity style={styles.bookmarkBtn}>
                    <Ionicons name="bookmark" size={20} color="#fff" />
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>
            );
          }
        }}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default ChefProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backBtn: {
    marginLeft: 10,
    marginTop: 10,
  },
  chefInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: ALL_COLOR["--bg-color"],
    padding: 3,
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 47,
  },
  chefDetails: {
    marginLeft: 15,
    flex: 1,
  },
  chefTitle: {
    fontSize: 20,
    fontFamily: Font.bold,
    color: "#1A1A1A",
    marginBottom: 4,
  },
  chefName: {
    fontSize: 16,
    fontFamily: Font.medium,
    color: "#4A4A4A",
    marginBottom: 8,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: ALL_COLOR["--bg-color"],
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    fontFamily: Font.medium,
    color: "#1A1A1A",
  },
  tabContainer: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    paddingTop: 20,
  },
  tab: {
    paddingHorizontal: 25,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginRight: 10,
  },
  tabText: {
    fontSize: 16,
    fontFamily: Font.medium,
    color: "#8E8E93",
  },
  activeTab: {
    borderColor: ALL_COLOR["--bg-color"],
    backgroundColor: "#fff",
  },
  activeTabText: {
    fontFamily: Font.bold,
    color: ALL_COLOR["--bg-color"],
  },
  listContent: {
    paddingBottom: 30,
  },
  columnWrapper: {
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  cardWrapper: {
    width: (width - 60) / 2, // 2 columns with 20px gaps
    marginBottom: 10,
  },
  videoCard: {
    width: "100%",
    height: 180,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "#eee",
    position: "relative",
  },
  videoImage: {
    width: "100%",
    height: "100%",
  },
  playOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  playCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
  bookmarkBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 2,
  },
});
