import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { ALL_COLOR } from "../constant/all-color";
import { Ionicons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import { Font } from "../constant/fonts";
import { BlurView } from "expo-blur";

const FoodCard = ({ title, price, rating, image, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.cardContainer}
    >
      <View style={styles.imageBox}>
        <Image source={image} style={styles.image} />

        <BlurView intensity={20} tint="light" style={styles.ratingBadge}>
          <Ionicons name="star" size={14} color="#4CAF50" />
          <Text style={styles.ratingText}>{rating}</Text>
        </BlurView>
      </View>

      <View style={styles.contentBox}>
        <View style={styles.headerRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            <Text style={styles.price}>{price} AZN</Text>
          </View>

          <TouchableOpacity>
            <Ionicons name="bookmark-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.buttonText}>Səbətə at</Text>
          <View style={styles.iconCircle}>
            <Feather
              name="arrow-up-right"
              size={25}
              color={ALL_COLOR["--bg-color"] || "#4CAF50"}
            />
          </View>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default FoodCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    width: 172,
    marginBottom: 20,
    marginHorizontal: 16,
    paddingBottom: 9,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,

    elevation: 5,

    borderWidth: 1,
    borderColor: "#898A8D",
  },
  imageBox: {
    width: "100%",
    height: 119,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  ratingBadge: {
    position: "absolute",
    top: 10,
    left: 10,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    backgroundColor: "rgba(255, 252, 252, 0.7)",
  },
  ratingText: {
    fontSize: 13,
    fontFamily: Font.medium,
    color: ALL_COLOR["--bg-color"],
    marginLeft: 4,
  },
  contentBox: {
    marginTop: 12,
    paddingInline: 10,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  title: {
    fontSize: 12,
    fontFamily: Font.medium,
    color: "#0B0E0B",
    marginBottom: 4,
  },
  price: {
    fontSize: 12,
    fontFamily: Font.semibold,
    color: "#0B0E0B",
  },
  addButton: {
    backgroundColor: ALL_COLOR["--bg-color"],
    borderRadius: 20,
    height: 37,
    width: 142,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // paddingHorizontal: 10,
    paddingLeft: 20,
    paddingRight: 5,
  },
  buttonText: {
    color: ALL_COLOR["--white"],
    fontSize: 16,
    fontFamily: Font.semibold,
  },
  iconCircle: {
    width: 31.3,
    height: 31.3,
    backgroundColor: "#fff",
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
});
