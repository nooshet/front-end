import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Font } from "../constant/fonts";
import { SafeAreaView } from "react-native-safe-area-context";
import { ALL_COLOR } from "../constant/all-color";
import Icon from "react-native-vector-icons/Feather";

const ScreenHeader = ({ title, onBackPress }) => {
  return (
    <View style={styles.container}>
      {onBackPress ? (
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <Icon name="chevron-left" size={30} color="#000" />
        </TouchableOpacity>
      ) : (
        <View style={styles.backButton} />
      )}

      <Text style={styles.title}>{title}</Text>
      <View style={styles.placeholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#fff",
  },
  container: {
    // height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
    // paddingHorizontal: 16,
  },
  backButton: {
    padding: 5,
    width: 40,
    justifyContent: "center",
  },
  backIcon: {
    fontSize: 28,
    color: "#000",
    fontWeight: "300",
  },
  title: {
    fontSize: 20,
    color: ALL_COLOR["--text-color"],
    fontFamily: Font.bold,
    textAlign: "center",
    flex: 1,
  },
  placeholder: {
    width: 40,
  },
});

export default ScreenHeader;
