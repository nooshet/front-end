import React, { useState, useEffect, useRef } from "react";
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
  Alert,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { Ionicons, Feather } from "@expo/vector-icons";
import { Font } from "../constant/fonts";
import AspazQeydiyyat from "../assets/HelpCenterImg.png";
import Help from "../assets/Help.png";
import { Audio } from "expo-av";

import { useTranslation } from "react-i18next";

const HelpCenter = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      id: "initial-bot",
      type: "bot",
      text: t("help.questionTitle"),
      options: [t("help.q1"), t("help.q2"), t("help.q3")],
    },
  ]);
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const scrollViewRef = useRef();

  const handleSend = (text) => {
    const msgToSend = text || message;
    if (!msgToSend.trim()) return;

    const newUserMsg = {
      id: Date.now().toString(),
      type: "user",
      text: msgToSend.trim(),
    };

    setChatHistory((prev) => [...prev, newUserMsg]);
    setMessage("");

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        text: t("help.botResponsePlaceholder") || "Tezliklə sizə cavab verəcəyik.",
      };
      setChatHistory((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const handleQuickQuestion = (q) => {
    handleSend(q);
  };

  async function startRecording() {
    if (isRecording || recording) return;

    try {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        // Add a small delay or guard here to ensure previous recording is fully cleaned up
        const { recording: newRecording } = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY
        );
        setRecording(newRecording);
        setIsRecording(true);
      } else {
        Alert.alert(t("help.micPermissionDenied") || "Mikrofon icazəsi verilməyib");
      }
    } catch (err) {
      console.error("Failed to start recording", err);
      setIsRecording(false);
      setRecording(null);
    }
  }

  async function stopRecording() {
    if (!isRecording || !recording) {
      setIsRecording(false);
      return;
    }

    try {
      const currentRecording = recording;
      setRecording(null);
      setIsRecording(false);

      await currentRecording.stopAndUnloadAsync();
      const uri = currentRecording.getURI();

      if (uri) {
        // Add voice message to chat
        const newVoiceMsg = {
          id: Date.now().toString(),
          type: "user",
          voice: true,
          uri: uri,
        };
        setChatHistory((prev) => [...prev, newVoiceMsg]);

        // Simulate bot response to voice
        setTimeout(() => {
          const botResponse = {
            id: (Date.now() + 1).toString(),
            type: "bot",
            text: t("help.voiceReceived") || "Səsli mesajınız qəbul edildi.",
          };
          setChatHistory((prev) => [...prev, botResponse]);
        }, 1500);
      }
    } catch (err) {
      console.error("Failed to stop recording", err);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#0B0E0B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t("help.title")}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Illustration Section */}
        <View style={styles.illustrationContainer}>
          <Image source={AspazQeydiyyat} style={styles.illustration} />
          <Text style={styles.helpText}>{t("help.subtitle")}</Text>
        </View>

        {/* Chat History */}
        {chatHistory.map((item) => (
          <View
            key={item.id}
            style={[
              styles.messageWrapper,
              item.type === "user" ? styles.userWrapper : styles.botWrapper,
            ]}
          >
            {item.type === "bot" && (
              <View style={styles.supportIconWrapper}>
                <Image source={Help} style={styles.supportIcon} />
              </View>
            )}
            <View
              style={[
                styles.chatBubble,
                item.type === "user" ? styles.userBubble : styles.botBubble,
              ]}
            >
              {item.voice ? (
                <View style={styles.voiceMessage}>
                  <Feather name="mic" size={16} color="#fff" />
                  <Text style={styles.voiceText}>{t("help.voiceMessage") || "Səsli mesaj"}</Text>
                </View>
              ) : (
                <Text style={item.type === "user" ? styles.userText : styles.botText}>
                  {item.text}
                </Text>
              )}

              {item.options && (
                <View style={styles.optionsContainer}>
                  {item.options.map((q, idx) => (
                    <TouchableOpacity
                      key={idx}
                      style={styles.optionButton}
                      onPress={() => handleQuickQuestion(q)}
                    >
                      <Text style={styles.optionText}>{q}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Input Bar */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <View style={styles.inputArea}>
          <TouchableOpacity style={styles.iconButton}>
            <Feather name="plus" size={24} color="#0B0E0B" />
          </TouchableOpacity>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={t("help.placeholder")}
              value={message}
              onChangeText={setMessage}
              onSubmitEditing={() => handleSend()}
            />
            <TouchableOpacity
              style={[styles.iconButton, isRecording && styles.recordingActive]}
              onPressIn={startRecording}
              onPressOut={stopRecording}
            >
              <Feather name="mic" size={20} color={isRecording ? "#FF3B30" : "#0B0E0B"} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.sendButton} onPress={() => handleSend()}>
            <Ionicons name="send" size={24} color="#0B0E0B" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? 40 : 0,
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
    textAlign: "center",
  },
  messageWrapper: {
    flexDirection: "row",
    marginBottom: 20,
    maxWidth: "85%",
  },
  botWrapper: {
    alignSelf: "flex-start",
  },
  userWrapper: {
    alignSelf: "flex-end",
    flexDirection: "row-reverse",
  },
  supportIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#E5E5EA",
    backgroundColor: "#fff",
  },
  supportIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  chatBubble: {
    padding: 12,
    borderRadius: 18,
  },
  botBubble: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#08A30D",
    borderTopLeftRadius: 2,
  },
  userBubble: {
    backgroundColor: "#08A30D",
    borderTopRightRadius: 2,
  },
  botText: {
    fontSize: 15,
    fontFamily: Font.regular,
    color: "#0B0E0B",
    lineHeight: 20,
  },
  userText: {
    fontSize: 15,
    fontFamily: Font.regular,
    color: "#fff",
    lineHeight: 20,
  },
  voiceMessage: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  voiceText: {
    color: "#fff",
    fontFamily: Font.regular,
  },
  optionsContainer: {
    marginTop: 12,
    gap: 8,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: "#C7C7CC",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
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
  recordingActive: {
    backgroundColor: "#FFE5E5",
    borderRadius: 15,
  },
});

export default HelpCenter;
