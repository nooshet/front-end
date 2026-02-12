import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  TextInput,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";
import { Feather, Ionicons } from "@expo/vector-icons";
import { ALL_COLOR } from "../constant/all-color";
import { Font } from "../constant/fonts";
import * as ImagePicker from "expo-image-picker";

const EditField = ({ label, value, onChangeText, isPassword }) => (
  <View style={styles.fieldContainer}>
    <Text style={styles.fieldLabel}>{label}</Text>
    <View style={styles.inputWrapper}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isPassword}
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.fieldIcon}>
        <Feather name="edit-2" size={18} color="#C7C7CC" />
      </TouchableOpacity>
    </View>
  </View>
);

import { useTranslation } from "react-i18next";

const EditProfile = () => {
  const router = useRouter();
  const { t } = useTranslation();

  // Form State
  const [name, setName] = useState("Göyçək Qaloyeva");
  const [email, setEmail] = useState("goycekqaloyeva@gmail.com");
  const [phone, setPhone] = useState("+994 51 855 02 74");
  const [homeAddress, setHomeAddress] = useState("Azərbaycan, Bakı, Nizami");
  const [workAddress, setWorkAddress] = useState("Azərbaycan, Bakı, Nizami");
  const [password, setPassword] = useState("********");
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        t("editProfile.permissionTitle"),
        t("editProfile.permissionMsg"),
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    // ... (load logic same)
    try {
      const savedProfile = await AsyncStorage.getItem("userProfile");
      if (savedProfile) {
        const {
          name,
          email,
          phone,
          homeAddress,
          workAddress,
          password,
          image,
        } = JSON.parse(savedProfile);
        setName(name);
        setEmail(email);
        setPhone(phone);
        setHomeAddress(homeAddress);
        setWorkAddress(workAddress);
        setPassword(password);
        setImage(image);
      }
    } catch (error) {
      console.error("Failed to load profile", error);
    }
  };

  const saveProfile = async () => {
    try {
      const profileData = {
        name,
        email,
        phone,
        homeAddress,
        workAddress,
        password,
        image,
      };
      await AsyncStorage.setItem("userProfile", JSON.stringify(profileData));
      Alert.alert(t("common.success"), t("editProfile.saveSuccess"));
      // router.back(); // Optional: go back after saving
    } catch (error) {
      console.error("Failed to save profile", error);
      Alert.alert(t("common.error"), t("editProfile.saveError"));
    }
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
        <Text style={styles.headerTitle}>{t("editProfile.title")}</Text>
        <TouchableOpacity onPress={saveProfile}>
          <Text style={{ color: ALL_COLOR["--primary-color"], fontSize: 16 }}>
            {t("common.save")}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Avatar Section */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatarWrapper}>
            <Image
              source={image ? { uri: image } : require("../assets/Gcs.png")}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.avatarEditIcon} onPress={pickImage}>
              <Feather name="edit-3" size={16} color="#0B0E0B" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Form Fields */}
        <View style={styles.form}>
          <EditField
            label={t("editProfile.nameLabel")}
            value={name}
            onChangeText={setName}
          />
          <EditField
            label={t("editProfile.emailLabel")}
            value={email}
            onChangeText={setEmail}
          />
          <EditField
            label={t("editProfile.phoneLabel")}
            value={phone}
            onChangeText={setPhone}
          />

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>{t("editProfile.addresses")}</Text>
            <View style={styles.addressWrapper}>
              <View style={styles.addressItem}>
                <Text style={styles.addressLabel}>
                  {t("editProfile.homeAddress")}:{" "}
                </Text>
                <TextInput
                  style={styles.addressInput}
                  value={homeAddress}
                  onChangeText={setHomeAddress}
                  multiline={true}
                />
              </View>
              <View style={styles.addressItem}>
                <Text style={styles.addressLabel}>
                  {t("editProfile.workAddress")}:{" "}
                </Text>
                <TextInput
                  style={styles.addressInput}
                  value={workAddress}
                  onChangeText={setWorkAddress}
                  multiline={true}
                />
              </View>
              <TouchableOpacity style={styles.addressEditIcon}>
                <Feather name="edit-2" size={18} color="#C7C7CC" />
              </TouchableOpacity>
            </View>
          </View>

          <EditField
            label={t("editProfile.password")}
            value={password}
            onChangeText={setPassword}
            isPassword={true}
          />
        </View>

        {/* Delete Account Button */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => router.push("/delete-account")}>
            <Feather
              name="log-out"
              size={20}
              color="#fff"
              style={styles.deleteIcon}
            />
            <Text style={styles.deleteButtonText}>
              {t("editProfile.deleteAccount")}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
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
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  avatarContainer: {
    alignItems: "center",
    marginVertical: 30,
  },
  avatarWrapper: {
    position: "relative",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarEditIcon: {
    position: "absolute",
    bottom: -2,
    right: -2,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  form: {
    marginTop: 10,
  },
  fieldContainer: {
    marginBottom: 24,
  },
  fieldLabel: {
    fontSize: 16,
    fontFamily: Font.medium,
    color: "#0B0E0B",
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#C7C7CC",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    fontFamily: Font.regular,
  },
  fieldIcon: {
    padding: 4,
  },
  addressWrapper: {
    borderWidth: 1,
    borderColor: "#C7C7CC",
    borderRadius: 8,
    padding: 12,
    position: "relative",
  },
  addressItem: {
    flexDirection: "row",
    marginBottom: 8,
    alignItems: "flex-start",
  },
  addressLabel: {
    fontSize: 16,
    fontFamily: Font.regular,
    color: "#0B0E0B",
  },
  addressInput: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    fontFamily: Font.regular,
    paddingTop: 1,
  },
  addressEditIcon: {
    position: "absolute",
    right: 12,
    top: "50%",
    marginTop: -9,
  },
  footer: {
    marginTop: 40,
    alignItems: "center",
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF0000",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  deleteIcon: {
    marginRight: 8,
    transform: [{ rotate: "180deg" }],
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: Font.bold,
  },
});
