import { View, Text, StyleSheet, FlatList, Dimensions, StatusBar as RNStatusBar } from "react-native";
import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { StatusBar } from "expo-status-bar";

import Search from "../../components/Search";
import VideoCard from "../../components/VideoCard";
import { Font } from "../../constant/fonts";
import { VIDEO_DATA } from "../../mock/FOOD_DATA";
import { useRouter } from "expo-router";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const VideoScreen = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);
  const router = useRouter();

  const renderItem = ({ item, index }) => (
    <VideoCard
      title={item.title}
      description={item.description}
      chefName={item.chefName}
      image={item.image}
      index={index}
      onPress={() => console.log("Video pressed", item.id)}
      onDetailPress={() => router.push({
        pathname: "/(screens)/chef-profile",
        params: { chefName: item.chefName }
      })}
    />
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* TikTok Style Header Overlay */}
      <View style={styles.headerOverlay}>
        <View style={styles.tabsContainer}>
          <Text style={[styles.tabText, styles.activeTab]}>Sənin üçün</Text>
          <View style={styles.tabSeparator} />
          <Text style={styles.tabText}>İzlədiklərin</Text>
        </View>
        <View style={styles.searchContainer}>
          <Search
            inputRef={inputRef}
            search={search}
            setSearch={setSearch}
            placeholder={"Kəşf et..."}
            containerStyle={styles.searchBar}
          />
        </View>
      </View>

      <FlatList
        data={VIDEO_DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        pagingEnabled
        vertical
        showsVerticalScrollIndicator={false}
        snapToInterval={SCREEN_HEIGHT}
        snapToAlignment="start"
        decelerationRate="fast"
        removeClippedSubviews={true}
        initialNumToRender={1}
        maxToRenderPerBatch={2}
        windowSize={3}
        getItemLayout={(data, index) => ({
          length: SCREEN_HEIGHT,
          offset: SCREEN_HEIGHT * index,
          index,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  headerOverlay: {
    position: "absolute",
    top: RNStatusBar.currentHeight || 50,
    left: 0,
    right: 0,
    zIndex: 10,
    alignItems: "center",
  },
  tabsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginBottom: 10,
  },
  tabText: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 17,
    fontFamily: Font.bold,
  },
  activeTab: {
    color: "#fff",
    borderBottomWidth: 2,
    borderBottomColor: "#fff",
    paddingBottom: 4,
  },
  tabSeparator: {
    width: 1,
    height: 15,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  searchContainer: {
    width: "90%",
  },
  searchBar: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderWidth: 0,
  },
});

export default VideoScreen;
