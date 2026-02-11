import { ScrollView, StyleSheet } from "react-native";
import Container from "../Container";
import SectionHeader from "../SectionHeader";
import FoodCard from "../FoodCard";
import { router } from "expo-router";

const NewMenu = ({ FOOD_DATA, title }) => {
  return (
    <>
      <Container>
        <SectionHeader title={title} />
      </Container>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          styles.foodListScroll,
          { paddingHorizontal: 16, gap: 16 },
        ]}
      >
        {FOOD_DATA.map((food) => (
          <FoodCard
            key={food.id}
            title={food.title}
            rating={food.rating}
            image={food.image}
            price={food.price}
          />
        ))}
      </ScrollView>
    </>
  );
};

export default NewMenu;

const styles = StyleSheet.create({});
