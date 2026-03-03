import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { Font } from "../constant/fonts";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

const CallingScreen = ({ visible, onClose, courierName = "Ramin" }) => {
  const [showDialpad, setShowDialpad] = useState(false);
  const [dialedNumbers, setDialedNumbers] = useState("");

  const ControlButton = ({ icon, label, onPress, isEndCall }) => (
    <View style={styles.controlItem}>
      <TouchableOpacity
        style={[styles.iconCircle, isEndCall && styles.endCallButton]}
        onPress={onPress}
      >
        {icon}
      </TouchableOpacity>
      <Text style={styles.controlLabel}>{label}</Text>
    </View>
  );

  const DialpadButton = ({ digit, subtext, onPress }) => (
    <TouchableOpacity style={styles.dialpadButton} onPress={() => onPress(digit)}>
      <Text style={styles.dialpadDigit}>{digit}</Text>
      {subtext && <Text style={styles.dialpadSubtext}>{subtext}</Text>}
    </TouchableOpacity>
  );

  const handleDial = (digit) => {
    setDialedNumbers((prev) => prev + digit);
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <LinearGradient
          colors={["#333333", "#1A1A1A", "#331111"]}
          style={styles.gradient}
        >
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
              <TouchableOpacity style={styles.infoBtn}>
                <Ionicons name="information-circle-outline" size={28} color="#fff" />
              </TouchableOpacity>
            </View>

            <View style={styles.content}>
              {showDialpad ? (
                <View style={styles.dialedContainer}>
                  <Text style={styles.dialedText}>{dialedNumbers || " "}</Text>
                  <Text style={styles.callingText}>Zəng edilir...</Text>
                </View>
              ) : (
                <>
                  <Text style={styles.callingText}>Zəng edilir...</Text>
                  <Text style={styles.nameText}>{courierName}</Text>
                </>
              )}
            </View>

            {showDialpad ? (
              <View style={styles.dialpadGrid}>
                <View style={styles.dialpadRow}>
                  <DialpadButton digit="1" onPress={handleDial} />
                  <DialpadButton digit="2" subtext="ABC" onPress={handleDial} />
                  <DialpadButton digit="3" subtext="DEF" onPress={handleDial} />
                </View>
                <View style={styles.dialpadRow}>
                  <DialpadButton digit="4" subtext="GHI" onPress={handleDial} />
                  <DialpadButton digit="5" subtext="JKL" onPress={handleDial} />
                  <DialpadButton digit="6" subtext="MNO" onPress={handleDial} />
                </View>
                <View style={styles.dialpadRow}>
                  <DialpadButton digit="7" subtext="PQRS" onPress={handleDial} />
                  <DialpadButton digit="8" subtext="TUV" onPress={handleDial} />
                  <DialpadButton digit="9" subtext="WXYZ" onPress={handleDial} />
                </View>
                <View style={styles.dialpadRow}>
                  <DialpadButton digit="*" onPress={handleDial} />
                  <DialpadButton digit="0" subtext="+" onPress={handleDial} />
                  <DialpadButton digit="#" onPress={handleDial} />
                </View>
                <View style={styles.dialpadFooter}>
                  <TouchableOpacity 
                    style={styles.hideDialpadBtn}
                    onPress={() => setShowDialpad(false)}
                  >
                    <Text style={styles.hideDialpadText}>Gizlət</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.smallEndButton]}
                    onPress={onClose}
                  >
                    <MaterialCommunityIcons name="phone-hangup" size={32} color="#fff" />
                  </TouchableOpacity>
                  {dialedNumbers.length > 0 && (
                    <TouchableOpacity 
                      style={styles.deleteBtn}
                      onPress={() => setDialedNumbers(prev => prev.slice(0, -1))}
                    >
                      <Ionicons name="backspace-outline" size={32} color="#fff" />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ) : (
              <View style={styles.controlsGrid}>
                <View style={styles.row}>
                  <ControlButton
                    icon={<Ionicons name="volume-high-outline" size={28} color="#fff" />}
                    label="Mikrofon"
                  />
                  <ControlButton
                    icon={<Ionicons name="videocam-outline" size={28} color="#fff" />}
                    label="Görüntülü"
                  />
                  <ControlButton
                    icon={<Ionicons name="mic-off-outline" size={28} color="#fff" />}
                    label="Səssiz"
                  />
                </View>

                <View style={styles.row}>
                  <ControlButton
                    icon={<Feather name="user-plus" size={28} color="#fff" />}
                    label="Əlavə et"
                  />
                  <ControlButton
                    icon={<MaterialCommunityIcons name="phone-hangup" size={32} color="#fff" />}
                    label="Bitir"
                    onPress={onClose}
                    isEndCall
                  />
                  <ControlButton
                    icon={<MaterialCommunityIcons name="dialpad" size={28} color="#fff" />}
                    label="Klaviatura"
                    onPress={() => setShowDialpad(true)}
                  />
                </View>
              </View>
            )}

          </SafeAreaView>
        </LinearGradient>
      </View>
    </Modal>
  );
};

export default CallingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    alignItems: "flex-end",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  infoBtn: {
    padding: 10,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 60,
  },
  dialedContainer: {
    alignItems: "center",
  },
  dialedText: {
    fontSize: 40,
    fontFamily: Font.medium,
    color: "#FFFFFF",
    marginBottom: 10,
    minHeight: 50,
  },
  callingText: {
    fontSize: 24,
    fontFamily: Font.medium,
    color: "#E0E0E0",
    marginBottom: 10,
  },
  nameText: {
    fontSize: 40,
    fontFamily: Font.bold,
    color: "#FFFFFF",
  },
  controlsGrid: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  dialpadGrid: {
    paddingHorizontal: 30,
    paddingBottom: 40,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30,
  },
  dialpadRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  controlItem: {
    alignItems: "center",
    width: width / 3 - 20,
  },
  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  dialpadButton: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  dialpadDigit: {
    fontSize: 32,
    color: "#FFFFFF",
    fontFamily: Font.medium,
  },
  dialpadSubtext: {
    fontSize: 10,
    color: "#FFFFFF",
    fontFamily: Font.regular,
    marginTop: -2,
  },
  dialpadFooter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    position: "relative",
    height: 80,
  },
  hideDialpadBtn: {
    position: "absolute",
    left: 0,
    padding: 10,
  },
  hideDialpadText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: Font.medium,
  },
  smallEndButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#FF3B30",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteBtn: {
    position: "absolute",
    right: 0,
    padding: 10,
  },
  endCallButton: {
    backgroundColor: "#FF3B30",
  },
  controlLabel: {
    fontSize: 14,
    fontFamily: Font.medium,
    color: "#FFFFFF",
  },
});
