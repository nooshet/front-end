import { StyleSheet } from "react-native";
import { View, ScrollView } from "react-native";

const FoodScrollViewVertical = ({ data, renderItem }) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.gridContainer}>
        {data.map((item, index) => (
          <View key={item.id} style={styles.cardWrapper}>
            {renderItem({ item, index })}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default FoodScrollViewVertical;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingBottom: 100,
    paddingHorizontal: 20,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
  },
  cardWrapper: {
    width: "48%",
    marginBottom: 16,
  },
});
