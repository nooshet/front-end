import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";
import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { StatusBar } from "expo-status-bar";

import Search from "../../components/Search";
import VideoCard from "../../components/VideoCard";
import Container from "../../components/Container";
import { Font } from "../../constant/fonts";
import { VIDEO_DATA } from "../../mock/FOOD_DATA";
import { useRouter } from "expo-router";

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
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <Container>
        <Text style={styles.headerTitle}>Videolar</Text>
        <Search
          inputRef={inputRef}
          search={search}
          setSearch={setSearch}
          placeholder={"Nə yemək istəyirsən?"}
        />
      </Container>

      <FlatList
        data={VIDEO_DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 45,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: Font.bold,
    color: "#000",
    textAlign: "center",
    marginBottom: 20,
  },
  listContent: {
    paddingHorizontal: 13.78,
    paddingBottom: 100,
  },
});

export default VideoScreen;
