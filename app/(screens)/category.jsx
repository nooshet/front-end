import { View, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ScreenHeader from "../../components/ScreenHeader";
import Container from "../../components/Container";
import { CATEGORY_DATA } from "../../mock/FOOD_DATA";
import CategoryCard from "../../components/CategoryCard";
import { router } from "expo-router";
import { handleBackBtnPress } from "../../helper/backButtonFunction";
import FoodScrollViewVertical from "../../components/FoodScrollViewVertical";

const CategoryScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Container>
        <ScreenHeader title="Kateqoriyalar" onBackPress={handleBackBtnPress} />
      </Container>

      <FoodScrollViewVertical
        data={CATEGORY_DATA}
        renderItem={({ item, index }) => (
          <CategoryCard
            title={item.title}
            count={item.count}
            image={item.image}
            index={index}
            onPress={() => console.log(item.title)}
          />
        )}
      />

      {/* <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.gridContainer}>
          {CATEGORY_DATA.map((item, index) => (
            <View key={item.id} style={styles.cardWrapper}>
              <CategoryCard
                title={item.title}
                count={item.count}
                image={item.image}
                index={index}
                onPress={() => console.log(item.title)}
              />
            </View>
          ))}
        </View>
      </ScrollView> */}
    </SafeAreaView>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingBottom: 40,
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
