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
import { Stack, useRouter } from "expo-router";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import { Font } from "../constant/fonts";
import AspazQeydiyyat from "../assets/HelpCenterImg.png";
import Help from "../assets/Help.png";

const HelpCenter = () => {
  const router = useRouter();
  const [message, setMessage] = useState("");

  const quickQuestions = [
    "Necə istifadə edəcəyimi bilmirəm",
    "Necə satıcı ola bilərəm",
    "Canlı dəstəyə qoşulmaq istəyirəm",
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#0B0E0B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Yardım mərkəzi</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Illustration Section */}
        <View style={styles.illustrationContainer}>
          <Image source={AspazQeydiyyat} style={styles.illustration} />
          <Text style={styles.helpText}>Biz sənə kömək üçün buradayırıq</Text>
        </View>

        {/* Support Card / Message */}
        <View style={styles.supportContainer}>
          <View style={styles.supportIconWrapper}>
            <Image
              source={Help}
              style={{ width: "100%", height: "100%", resizeMode: "contain" }}
            />
          </View>
          <View style={styles.chatBubble}>
            <Text style={styles.chatTitle}>
              Probleminiz aşağıdakılardan biridirmi?
            </Text>
            <View style={styles.optionsContainer}>
              {quickQuestions.map((q, index) => (
                <TouchableOpacity key={index} style={styles.optionButton}>
                  <Text style={styles.optionText}>{q}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Input Bar */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}>
        <View style={styles.inputArea}>
          <TouchableOpacity style={styles.iconButton}>
            <Feather name="plus" size={24} color="#0B0E0B" />
          </TouchableOpacity>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Yazın..."
              value={message}
              onChangeText={setMessage}
            />
            <TouchableOpacity style={styles.iconButton}>
              <Feather name="mic" size={20} color="#0B0E0B" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.sendButton}>
            <Ionicons name="send" size={24} color="#0B0E0B" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default HelpCenter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  illustrationContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  illustration: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  helpText: {
    fontSize: 16,
    color: "#A29E9E",
    fontFamily: Font.regular,
    marginTop: 10,
  },
  supportContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  supportIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
    borderWidth: 1,
    borderColor: "#E5E5EA",
    marginBottom: 280,
  },
  chatBubble: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#08A30D",
    padding: 16,
    backgroundColor: "#fff",
    borderTopLeftRadius: 2,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  chatTitle: {
    fontSize: 16,
    fontFamily: Font.bold,
    color: "#0B0E0B",
    marginBottom: 16,
  },
  optionsContainer: {
    gap: 10,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: "#C7C7CC",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  optionText: {
    fontSize: 14,
    fontFamily: Font.regular,
    color: "#0B0E0B",
  },
  inputArea: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#F2F2F7",
    gap: 10,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 45,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontFamily: Font.regular,
    color: "#0B0E0B",
  },
  iconButton: {
    padding: 5,
  },
  sendButton: {
    padding: 5,
  },
});
