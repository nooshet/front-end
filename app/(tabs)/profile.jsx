import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { ALL_COLOR } from "../../constant/all-color";
import { Font } from "../../constant/fonts";
import Button from "../../components/Button";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";

const ProfileScreen = () => {
  const router = useRouter();
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "İcazə lazımdır",
        "Şəkil seçmək üçün qalereyaya giriş icazəsi verməlisiniz.",
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
  const menuItems = [
    {
      id: "1",
      title: "Hesabı redaktə edin",
      icon: <Feather name="user" size={24} color={ALL_COLOR["--text-color"]} />,
      onPress: () => {
        router.push("/edit-profile");
      },
    },
    {
      id: "2",
      title: "Sifarişlərim",
      icon: (
        <Feather
          name="shopping-bag"
          size={24}
          color={ALL_COLOR["--text-color"]}
        />
      ),
      onPress: () => {},
    },
    {
      id: "3",
      title: "Parametrlər",
      icon: (
        <Feather name="settings" size={24} color={ALL_COLOR["--text-color"]} />
      ),
      onPress: () => {},
    },
    {
      id: "4",
      title: "Dil seçimi",
      icon: (
        <Ionicons
          name="globe-outline"
          size={24}
          color={ALL_COLOR["--text-color"]}
        />
      ),
      onPress: () => {},
    },
    {
      id: "5",
      title: "Yardım mərkəzi",
      icon: (
        <Feather
          name="help-circle"
          size={24}
          color={ALL_COLOR["--text-color"]}
        />
      ),
      onPress: () => {},
    },
    {
      id: "6",
      title: "Çıxmaq",
      icon: <Feather name="log-out" size={24} color="#FF3D00" />,
      onPress: () => {
        router.push("/(auth)/login");
      },
      isLogout: true,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.avatarWrapper}>
            <Image
              source={image ? { uri: image } : require("../../assets/Gcs.png")}
              style={styles.avatar}
            />
            <TouchableOpacity
              style={styles.editIconContainer}
              onPress={pickImage}>
              <Feather
                name="edit-3"
                size={18}
                color={ALL_COLOR["--text-color"]}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Qaloyeva Göyçək</Text>
            <View style={styles.statusRow}>
              <Text style={styles.statusLabel}>Status: </Text>
              <Text style={styles.statusValue}>İstifadəçi</Text>
            </View>
            <Text style={styles.dateText}>21.11.25 tarixindən</Text>
          </View>
        </View>

        {/* Action Button Section */}
        <View style={styles.actionSection}>
          <Button
            title="Statusunu dəyiş"
            onPress={() => {}}
            style={styles.statusButton}
            textStyle={styles.statusButtonText}
          />
          <Text style={styles.infoText}>
            istifadəçi statusunuzu dəyişərək, Siz{" "}
            <Text style={styles.boldText}>Aşbaz</Text> və ya{" "}
            <Text style={styles.boldText}>Kurye</Text> kimi davam edə
            bilərsiniz.
          </Text>
        </View>

        <View style={styles.divider} />

        {/* Menu Items Section */}
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={item.onPress}>
              <View style={styles.menuItemLeft}>
                <View style={styles.iconWrapper}>{item.icon}</View>
                <Text
                  style={[
                    styles.menuItemTitle,
                    item.isLogout && styles.logoutText,
                  ]}>
                  {item.title}
                </Text>
              </View>
              {!item.isLogout && (
                <Feather name="chevron-right" size={24} color="#C7C7CC" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ALL_COLOR["--white"],
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 100, // For tab bar space
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  avatarWrapper: {
    position: "relative",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#F2F2F7",
    resizeMode: "cover",
  },
  editIconContainer: {
    position: "absolute",
    bottom: -5,
    right: -5,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userInfo: {
    marginLeft: 20,
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: "600",
    color: ALL_COLOR["--text-color"],
    marginBottom: 6,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  statusLabel: {
    fontSize: 16,
    fontFamily: Font.bold,
    color: ALL_COLOR["--text-color"],
  },
  statusValue: {
    fontSize: 16,
    fontFamily: Font.regular,
    color: ALL_COLOR["--text-color"],
  },
  dateText: {
    fontSize: 14,
    fontFamily: Font.regular,
    color: ALL_COLOR["--placeholder-color"],
  },
  actionSection: {
    marginBottom: 10,
  },
  statusButton: {
    backgroundColor: ALL_COLOR["--bg-color"],
    borderRadius: 50,
  },
  statusButtonText: {
    fontSize: 18,
    fontWeight: "600",
    fontSize: 18,
  },
  infoText: {
    marginTop: 15,
    fontSize: 14,
    fontFamily: Font.regular,
    color: ALL_COLOR["--text-color"],
    lineHeight: 20,
  },
  boldText: {
    fontFamily: Font.bold,
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E5EA",
    marginVertical: 15,
  },
  menuContainer: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    width: 40,
    alignItems: "center",
  },
  menuItemTitle: {
    fontSize: 16,
    fontFamily: Font.light,
    color: ALL_COLOR["--text-color"],
    marginLeft: 10,
  },
  logoutText: {
    color: "#FF3D00",
  },
});
