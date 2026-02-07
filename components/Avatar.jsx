import { View, Text, Image, StyleSheet } from "react-native";

const Avatar = ({ source }) => {
  return (
    <View style={styles.avatarContainer}>
      <Image source={source} />
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 64,
  },
});
