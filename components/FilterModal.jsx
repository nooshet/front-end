import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ALL_COLOR } from "../constant/all-color";
import { Font } from "../constant/fonts";

const FilterModal = ({ visible, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState("Gündəlik yeməklər");
  const [selectedIngredient, setSelectedIngredient] = useState("Yağlı");
  const [selectedPrice, setSelectedPrice] = useState("Hamısı");

  const categories = [
    "Gündəlik yeməklər",
    "Bayram yeməkləri",
    "Uşaq yeməkləri",
    "Salatlar və qəlyanaltılar",
    "Dietik yeməklər",
    "Şirniyyatlar",
    "Kompotlar",
  ];

  const ingredients = ["Yağlı", "Yağsız", "Dietik", "Vegetarian"];
  const prices = ["Hamısı", "Artan", "Azalan", "0 ~ 100"];

  const handleClearAll = () => {
    setSelectedCategory(null);
    setSelectedIngredient(null);
    setSelectedPrice(null);
  };

  const FilterSection = ({ title, items, selectedItem, onSelect }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.tagContainer}>
        {items.map((item) => {
          const isSelected = selectedItem === item;
          return (
            <TouchableOpacity
              key={item}
              style={[
                styles.tag,
                isSelected && styles.tagSelected,
              ]}
              onPress={() => onSelect(item)}
            >
              <Text
                style={[
                  styles.tagText,
                  isSelected && styles.tagTextSelected,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
          <View style={styles.header}>
            <View style={styles.headerPlaceholder} />
            <Text style={styles.headerTitle}>Filter</Text>
            <TouchableOpacity onPress={handleClearAll}>
              <Text style={styles.clearAllText}>Hamısını sil</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <FilterSection
              title="Kateqoriyalar"
              items={categories}
              selectedItem={selectedCategory}
              onSelect={setSelectedCategory}
            />

            <FilterSection
              title="Tərkibi"
              items={ingredients}
              selectedItem={selectedIngredient}
              onSelect={setSelectedIngredient}
            />

            <FilterSection
              title="Qiymət"
              items={prices}
              selectedItem={selectedPrice}
              onSelect={setSelectedPrice}
            />
          </ScrollView>

          <TouchableOpacity style={styles.applyBtn} onPress={onClose}>
            <Text style={styles.applyBtnText}>Tətbiq et</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    maxHeight: "85%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  headerPlaceholder: {
    width: 80,
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: Font.bold,
    color: "#000",
  },
  clearAllText: {
    fontSize: 16,
    fontFamily: Font.medium,
    color: "rgba(0,0,0,0.4)",
    width: 100,
    textAlign: "right",
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Font.bold,
    color: "#000",
    marginBottom: 15,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  tag: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    marginBottom: 5,
  },
  tagSelected: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderColor: ALL_COLOR["--bg-color"],
  },
  tagText: {
    fontSize: 14,
    fontFamily: Font.medium,
    color: "#000",
  },
  tagTextSelected: {
    color: ALL_COLOR["--bg-color"],
  },
  applyBtn: {
    backgroundColor: ALL_COLOR["--bg-color"],
    borderRadius: 30,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  applyBtnText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: Font.bold,
  },
});
