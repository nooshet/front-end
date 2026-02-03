import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

import Istifadeci from "../../assets/istifadeci.png";
import Aspaz from "../../assets/aspaz.png";
import Kuryer from "../../assets/kuryer.png";

/* ROLE CARD */
const RoleCard = ({ title, image, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.cardImageContainer}>
        <Image source={image} style={styles.cardImage} />
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{title}</Text>
      </View>

      <View style={styles.cardArrow}>
        <Ionicons name="chevron-forward" size={24} color="#00AA13" />
      </View>
    </TouchableOpacity>
  );
};

const RoleSelection = () => {
  const router = useRouter();

  const handleRoleSelect = (role) => {
    router.push({ pathname: "/(auth)/register", params: { role } });
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <StatusBar style="dark" />

        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.push("/onboarding")}
            style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* CONTENT */}
        <View style={styles.content}>
          <Text style={styles.title}>Davam etmək üçün rolunuzu seçin.</Text>

          <View style={styles.cardsContainer}>
            <RoleCard
              title="İstifadəçi"
              image={Istifadeci}
              onPress={() => handleRoleSelect("user")}
            />

            <RoleCard
              title="Aşpaz"
              image={Aspaz}
              onPress={() => handleRoleSelect("chef")}
            />

            <RoleCard
              title="Kuryer"
              image={Kuryer}
              onPress={() => handleRoleSelect("courier")}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default RoleSelection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFCFC",
    paddingHorizontal: 20,
    paddingTop: 50,

  },

  header: {
    marginBottom: 20,
  },

  backButton: {
    padding: 10,
    marginLeft: -10,
  },

  content: {
    flex: 1,
    alignItems: "center",
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 28,
    textAlign: "center",
    color: "#000",
    marginBottom: 40,

    maxWidth: 260,
    alignSelf: "center",
  },

  cardsContainer: {
    width: "100%",
    gap: 24,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    height: 100,

    /* SHADOW */
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,

    borderWidth: 1,
    borderColor: "#D9D9D9",
  },

  cardImageContainer: {
    width: 70,
    height: 70,
    marginRight: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  cardImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },

  cardContent: {
    flex: 1,
    alignItems: "center",
  },

  cardTitle: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "600",
    color: "#08A30D",
  },

  cardArrow: {
    paddingLeft: 8,
  },
});
