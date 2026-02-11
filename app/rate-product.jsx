import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Font } from "../constant/fonts";

const RateProduct = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  // Mock Data (In a real app, use params to fetch or display specific product)
  const product = {
    name: "Yarpaq Dolması",
    description: "Düyü, soğan, göyərti, pomidor pastası, zeytun yağı və ədviyyatlar.",
    quantity: "1 porsiya",
    price: "4.95 AZN",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={24} color="#0B0E0B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Qiymətləndir</Text>
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.content}>
          {/* Product Card */}
          <View style={styles.productCard}>
            <View style={styles.selectionIndicator}>
                 <Ionicons name="radio-button-on" size={24} color="#08A30D" />
            </View>
            <Image source={{ uri: product.image }} style={styles.productImage} />
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productDescription} numberOfLines={2}>
                {product.description}
              </Text>
              <Text style={styles.productMeta}>
                Miqdar: <Text style={styles.boldText}>{product.quantity}</Text>
              </Text>
              <Text style={styles.productMeta}>
                Qiymət: <Text style={styles.boldText}>{product.price}</Text>
              </Text>
            </View>
          </View>

          <View style={styles.separator} />

          {/* Rating Section */}
          <Text style={styles.sectionTitle}>
            Aşağıda məhsulu qiymətləndirə və rəy yaza bilərsiniz.
          </Text>
          
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => setRating(star)}>
                <Ionicons
                  name="star"
                  size={46}
                  style={{ opacity: star <= rating ? 1 : 0.4 }} 
                  color={star <= rating ? "#FFD700" : "#D1D1D6"}
                />
              </TouchableOpacity>
            ))}
            {/* The screenshot shows large grey stars. I will implement large grey stars that might turn color on selection, 
                but based on image they look like placeholders. I'll stick to a standard interaction. */}
          </View>

           {/* Review Input */}
           <Text style={styles.inputLabel}>Məhsulu qiymətləndir</Text>
           <TextInput
            style={styles.reviewInput}
            placeholder="Məhsulla bağlı Rəylərinizi bizimlə paylaşa bilərsiniz."
            placeholderTextColor="#A29E9E"
            multiline
            textAlignVertical="top"
            value={review}
            onChangeText={setReview}
          />

        </ScrollView>
        
        {/* Submit Button */}
         <View style={styles.footer}>
            <TouchableOpacity style={styles.submitButton} onPress={() => router.push("/rate-success")}>
                <Text style={styles.submitButtonText}>Qiymətləndir</Text>
            </TouchableOpacity>
         </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RateProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
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
  content: {
    padding: 20,
  },
  productCard: {
    flexDirection: "row",
    alignItems: 'center',
    marginBottom: 20,
  },
  selectionIndicator: {
      marginRight: 10,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginRight: 16,
    backgroundColor: "#F2F2F7",
  },
  productDetails: {
    flex: 1,
    justifyContent: "center",
  },
  productName: {
    fontSize: 16,
    fontFamily: Font.bold,
    color: "#0B0E0B",
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 12,
    color: "#3C3C4399",
     fontFamily: Font.regular,
    marginBottom: 8,
  },
  productMeta: {
    fontSize: 14,
    color: "#8E8E93",
    marginBottom: 2,
     fontFamily: Font.regular,
  },
  boldText: {
    fontFamily: Font.medium,
    color: "#0B0E0B",
  },
   separator: {
    height: 1,
    backgroundColor: "#E5E5EA",
    width: "100%",
    marginBottom: 20,
  },
  sectionTitle: {
      fontSize: 14,
      fontFamily: Font.medium,
      color: "#0B0E0B",
      marginBottom: 20,
  },
  starsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      marginBottom: 30,
  },
  inputLabel: {
      fontSize: 16,
      fontFamily: Font.medium,
      color: "#0B0E0B",
      marginBottom: 10,
  },
  reviewInput: {
      backgroundColor: "#D9D9D9", // Light grey background as in screenshot
      borderRadius: 12,
      padding: 16,
      height: 120,
      fontSize: 14,
      fontFamily: Font.regular,
      color: "#0B0E0B",
  },
  footer: {
      padding: 20,
  },
  submitButton: {
      backgroundColor: "#08A30D",
      paddingVertical: 16,
      borderRadius: 25, // Rounded pill shape
      alignItems: "center",
  },
  submitButtonText: {
      color: "#fff",
      fontSize: 16,
      fontFamily: Font.bold,
  }

});
