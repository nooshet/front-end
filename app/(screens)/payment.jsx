import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from "react-native";
import { useRouter, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Font } from "../../constant/fonts";
import Container from "../../components/Container";

const PaymentPage = () => {
  const router = useRouter();
  const [saveCard, setSaveCard] = useState(false);

  // Card details state
  const [cardNumber, setCardNumber] = useState("4169738852203614");
  const [cardName, setCardName] = useState("Kylie Jeenner");
  const [expiryDate, setExpiryDate] = useState("16 / 29");
  const [cvv, setCvv] = useState("356");

  // State to track if we are adding a new card
  const [isAddingNewCard, setIsAddingNewCard] = useState(false);
  const [previousCard, setPreviousCard] = useState(null);

  const handleAddNewCard = () => {
    // Backup current card data before clearing
    setPreviousCard({
      cardNumber,
      cardName,
      expiryDate,
      cvv,
    });
    setCardNumber("");
    setCardName("");
    setExpiryDate("");
    setCvv("");
    setIsAddingNewCard(true);
  };

  const handleCancel = () => {
    if (previousCard) {
      setCardNumber(previousCard.cardNumber);
      setCardName(previousCard.cardName);
      setExpiryDate(previousCard.expiryDate);
      setCvv(previousCard.cvv);
    }
    setIsAddingNewCard(false);
  };

  const handleDeleteCard = () => {
    setCardNumber("");
    setCardName("");
    setExpiryDate("");
    setCvv("");
    setIsAddingNewCard(true); // Treat as adding new card if deleted
  };

  const formatCardNumber = (number) => {
    return number.replace(/\s?/g, "").replace(/(\d{4})/g, "$1 ").trim();
  };

  const displayCardNumber = (number) => {
    const cleanNumber = number.replace(/\s/g, "");
    const parts = [
      cleanNumber.substring(0, 4) || "****",
      cleanNumber.substring(4, 8) || "****",
      cleanNumber.substring(8, 12) || "****",
      cleanNumber.substring(12, 16) || "****",
    ];
    return parts;
  };

  const cardNumberParts = displayCardNumber(cardNumber);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Ödəniş",
          headerTitleStyle: { fontFamily: Font.bold, fontSize: 22 },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backBtn}>
              <Ionicons name="chevron-back" size={24} color="#000" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={styles.addCardBtn}
              onPress={isAddingNewCard ? handleCancel : handleAddNewCard}>
              <Text
                style={[
                  styles.addCardText,
                  isAddingNewCard && { color: "#EB5757" },
                ]}>
                {isAddingNewCard ? "Ləğv et" : "+ Yeni kart"}
              </Text>
            </TouchableOpacity>
          ),
          headerShadowVisible: false,
          headerTitleAlign: "center",
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <Container>
          {/* Card Visualization */}
          <View style={styles.cardContainer}>
            <View style={styles.cardHeader}>
              <View style={styles.chipContainer}>
                <Image
                  source={{
                    uri: "https://img.icons8.com/isometric/50/sim-card-chip.png",
                  }}
                  style={styles.chip}
                />
                <Ionicons
                  name="wifi-outline"
                  size={24}
                  color="#fff"
                  style={styles.wifiIcon}
                />
              </View>
              <Text style={styles.visaText}>VISA</Text>
            </View>

            <View style={styles.cardNumberContainer}>
              {cardNumberParts.map((part, index) => (
                <Text key={index} style={styles.cardNumber}>
                  {part}
                </Text>
              ))}
            </View>

            <View style={styles.cardFooter}>
              <View>
                <Text style={styles.cardLabel}>Kart adı</Text>
                <Text style={styles.cardValue}>{cardName || "HOLDER NAME"}</Text>
              </View>
              <View>
                <Text style={styles.cardLabel}>Müddət</Text>
                <Text style={styles.cardValue}>{expiryDate || "MM / YY"}</Text>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Form Inputs */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Kart nömrəsi</Text>
            <TextInput
              style={styles.input}
              value={formatCardNumber(cardNumber)}
              onChangeText={(text) => setCardNumber(text.replace(/\s/g, ""))}
              placeholder="0000 0000 0000 0000"
              placeholderTextColor="#BDBDBD"
              keyboardType="number-pad"
              maxLength={19}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Kart adı</Text>
            <TextInput
              style={styles.input}
              value={cardName}
              onChangeText={setCardName}
              placeholder="Kylie Jeenner"
              placeholderTextColor="#BDBDBD"
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.inputLabel}>Müddəti</Text>
              <TextInput
                style={styles.input}
                value={expiryDate}
                onChangeText={setExpiryDate}
                placeholder="MM / YY"
                placeholderTextColor="#BDBDBD"
              />
            </View>
            <View style={[styles.inputGroup, { flex: 1, marginLeft: 20 }]}>
              <Text style={styles.inputLabel}>CVV</Text>
              <TextInput
                style={styles.input}
                value={cvv}
                onChangeText={setCvv}
                placeholder="000"
                placeholderTextColor="#BDBDBD"
                secureTextEntry
                keyboardType="number-pad"
                maxLength={3}
              />
            </View>
          </View>

          <View style={styles.divider} />

          {/* Save Card Toggle */}
          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setSaveCard(!saveCard)}>
              <View style={[styles.checkbox, saveCard && styles.checked]}>
                {saveCard && (
                  <Ionicons name="checkmark" size={16} color="#fff" />
                )}
              </View>
              <Text style={styles.checkboxLabel}>Yadda saxla</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleDeleteCard}>
              <Text style={styles.deleteText}>Kartı sil</Text>
            </TouchableOpacity>
          </View>
        </Container>
      </ScrollView>

      {/* Sticky Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.payBtn}
          onPress={() => router.push("/(screens)/verification-3ds")}>
          <Text style={styles.payBtnText}>Ödə</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PaymentPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backBtn: {
    padding: 8,
  },
  addCardBtn: {
    marginRight: 10,
  },
  addCardText: {
    color: "#08A30D",
    fontSize: 16,
    fontFamily: Font.bold,
  },
  scrollContent: {
    paddingTop: 10,
    paddingBottom: 120,
  },
  cardContainer: {
    height: 220,
    backgroundColor: "#7D837D",
    borderRadius: 20,
    padding: 24,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
    marginTop: 10,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  chipContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  chip: {
    width: 45,
    height: 35,
    borderRadius: 5,
  },
  wifiIcon: {
    marginLeft: 10,
    transform: [{ rotate: "90deg" }],
    opacity: 0.8,
  },
  visaText: {
    color: "#fff",
    fontSize: 24,
    fontFamily: Font.bold,
    fontStyle: "italic",
  },
  cardNumberContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  cardNumber: {
    color: "#fff",
    fontSize: 22,
    fontFamily: Font.bold,
    letterSpacing: 2,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  cardLabel: {
    color: "#E0E0E0",
    fontSize: 12,
    fontFamily: Font.medium,
    marginBottom: 4,
  },
  cardValue: {
    color: "#fff",
    fontSize: 16,
    fontFamily: Font.bold,
  },
  divider: {
    height: 1,
    backgroundColor: "#F2F2F2",
    marginVertical: 25,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 18,
    fontFamily: Font.bold,
    color: "#000",
    marginBottom: 8,
  },
  input: {
    fontSize: 18,
    fontFamily: Font.medium,
    color: "#BDBDBD",
    textAlign: "right",
    paddingVertical: 4,
  },
  row: {
    flexDirection: "row",
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#4F4F4F",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  checked: {
    backgroundColor: "#08A30D",
    borderColor: "#08A30D",
  },
  checkboxLabel: {
    fontSize: 18,
    fontFamily: Font.bold,
    color: "#000",
  },
  deleteText: {
    color: "#EB5757",
    fontSize: 16,
    fontFamily: Font.bold,
    textDecorationLine: "underline",
  },
  footer: {
    position: "absolute",
    bottom: 50,
    left: 16,
    right: 16,
    zIndex: 10,
  },
  payBtn: {
    backgroundColor: "#08A30D",
    height: 50,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  payBtnText: {
    color: "#fff",
    fontSize: 20,
    fontFamily: Font.bold,
  },
});
