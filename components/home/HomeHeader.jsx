import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Contact from "../../assets/Vector.png";
import Notification from "../../assets/notification.png";
import Avatar from "../Avatar";
import AvatarIcon from "../../assets/Gcs.png";

const headerIcons = [
  {
    id: 1,
    icon: Notification,
    badge: true,
  },
  {
    id: 2,
    icon: Contact,
    badge: false,
  },
];

const HomeHeader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Avatar source={AvatarIcon} />
        <View>
          <Text style={styles.welcomeTexxt}>Xoş gəlmisən!</Text>
          <Text style={styles.nameText}>Göyçək</Text>
        </View>
      </View>
      <View style={styles.iconContainer}>
        {headerIcons.map((header) => (
          <TouchableOpacity style={styles.iconBtn} key={header.id}>
            {header.badge && <View style={styles.badge} />}
            <Image source={header.icon} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  welcomeTexxt: {
    fontWeight: "medium",
    fontSize: 16,
    color: "#0B0E0B",
  },
  nameText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#0B0E0B",
  },
  iconContainer: {
    flexDirection: "row",
    gap: 13,
  },
  iconBtn: {
    padding: 10,
    backgroundColor: "rgba(217, 217, 217, 0.14)",
    borderRadius: 50,
    width: 42,
    height: 42,
    position: "relative",
  },
  badge: {
    backgroundColor: "#F60909",
    width: 8,
    height: 8,
    borderRadius: "50%",
    position: "absolute",
    right: 9,
    top: 6,
    zIndex: 9999,
  },
});
