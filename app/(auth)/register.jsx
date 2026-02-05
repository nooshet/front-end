import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Stack, useRouter, Link, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Toast from "../../components/Toast";

import Qeydiyyat from "../../assets/qeydiyyat.png";
import AspazQeydiyyat from "../../assets/aspazQeydiyyatı.png";
import KuryerQeydiyyat from "../../assets/kuryerQeydiyyatı.png";

const Register = () => {
  const router = useRouter();
  const { role } = useLocalSearchParams();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);

  // Chef/Courier common fields
  const [bankAccount, setBankAccount] = useState("");

  // Chef-specific fields
  const [storeAddress, setStoreAddress] = useState("");
  const [kitchenImage, setKitchenImage] = useState(null);

  // Courier-specific fields
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleImage, setVehicleImage] = useState(null);

  // Toggle password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Validation State
  const [passwordError, setPasswordError] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleRegister = () => {
    // Basic validation
    setPasswordError(false);

    if (!name || !phone || !email || !password || !confirmPassword) {
      showToast("Zəhmət olmasa bütün xanaları doldurun");
      return;
    }

    if (password.length < 8) {
      setPasswordError(true);
      showToast("Şifrə ən azı 8 simvol olmalıdır");
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError(true);
      showToast("Şifrələr eyni deyil");
      return;
    }

    // Chef validation
    if (role === "chef") {
      if (!storeAddress || !bankAccount) {
        showToast("Zəhmət olmasa bütün məlumatları doldurun");
        return;
      }
    }

    // Courier validation
    if (role === "courier") {
      if (!bankAccount || !vehicleType) {
        showToast("Zəhmət olmasa bütün məlumatları doldurun");
        return;
      }
    }

    if (!agree) {
      showToast("Zəhmət olmasa şərtləri qəbul edin");
      return;
    }

    console.log("Register:", { name, phone, email, password, role, storeAddress, bankAccount, kitchenImage });
    router.push("/thanks");
  };

  const pickImage = async (target) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== "granted") {
      showToast("Şəkil seçmək üçün qalereya icazəsi lazımdır");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      if (target === "kitchen") {
        setKitchenImage(result.assets[0].uri);
      } else if (target === "vehicle") {
        setVehicleImage(result.assets[0].uri);
      }
    }
  };

  const selectVehicle = () => {
    Alert.alert("Nəqliyyat vasitəsi", "Zəhmət olmasa seçin:", [
      { text: "Velosiped", onPress: () => setVehicleType("Velosiped") },
      { text: "Motosikl", onPress: () => setVehicleType("Motosikl") },
      { text: "Avtomobil", onPress: () => setVehicleType("Avtomobil") },
      { text: "Ləğv et", style: "cancel" },
    ]);
  };

  // Determine illustration based on role
  const getIllustration = () => {
    switch (role) {
      case "chef":
        return AspazQeydiyyat;
      case "courier":
        return KuryerQeydiyyat;
      default:
        return Qeydiyyat;
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="light" />
      {toastMessage && (
        <Toast message={toastMessage} onHide={() => setToastMessage(null)} />
      )}

      <View style={styles.container}>
        {/* Top Green Section */}
        <View style={styles.topSection}>
          <View style={styles.illustrationContainer}>
            <Image
              source={getIllustration()}
              style={styles.illustration}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Bottom White Section */}
        <View style={styles.bottomSection}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}>
              <Text style={styles.title}>Qeydiyyat</Text>

              <View style={styles.form}>
                <Input
                  placeholder="Ad soyad"
                  value={name}
                  onChangeText={setName}
                  variant="underline"
                  autoCapitalize="words"
                  autoComplete="name"
                  textContentType="name"
                  icon={
                    <Ionicons name="person-outline" size={20} color="#0B0E0B" />
                  }
                />

                <Input
                  placeholder="Telefon nömrəsi"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                  variant="underline"
                  autoComplete="tel"
                  textContentType="telephoneNumber"
                  icon={
                    <Ionicons name="call-outline" size={20} color="#0B0E0B" />
                  }
                />

                <Input
                  placeholder="Epoçt ünvanı"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  textContentType="emailAddress"
                  variant="underline"
                  icon={
                    <Ionicons name="mail-outline" size={20} color="#0B0E0B" />
                  }
                />

                <View style={styles.passwordContainer}>
                  <Input
                    placeholder="Şifrə"
                    textContentType="none"
                    autoComplete="off"
                    autoCorrect={false}
                    spellCheck={false}
                    value={password}
                    onChangeText={(text) => {
                      setPassword(text);
                      if (passwordError) setPasswordError(false);
                    }}
                    secureTextEntry={!showPassword}
                    variant="underline"
                    error={passwordError}
                    icon={
                      <Ionicons
                        name="lock-closed-outline"
                        size={20}
                        color="#0B0E0B"
                      />
                    }
                  />
                  <View style={styles.rightIcons}>
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}>
                      <Ionicons
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        size={20}
                        color="#0B0E0B"
                      />
                    </TouchableOpacity>
                    {passwordError && (
                      <View style={styles.warningIcon}>
                        <Ionicons name="warning" size={20} color="#FF0000" />
                      </View>
                    )}
                  </View>
                </View>

                <View style={styles.passwordContainer}>
                  <Input
                    placeholder="Şifrə yenidən"
                    value={confirmPassword}
                    onChangeText={(text) => {
                      setConfirmPassword(text);
                      if (passwordError) setPasswordError(false);
                    }}
                    secureTextEntry={!showConfirmPassword}
                    variant="underline"
                    textContentType="none"
                    autoComplete="off"
                    autoCorrect={false}
                    spellCheck={false}
                    error={passwordError}
                    icon={
                      <Ionicons
                        name="lock-closed-outline"
                        size={20}
                        color="#0B0E0B"
                      />
                    }
                  />
                  <View style={styles.rightIcons}>
                    <TouchableOpacity
                      onPress={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }>
                      <Ionicons
                        name={
                          showConfirmPassword
                            ? "eye-off-outline"
                            : "eye-outline"
                        }
                        size={20}
                        color="#0B0E0B"
                      />
                    </TouchableOpacity>
                    {passwordError && (
                      <View style={styles.warningIcon}>
                        <Ionicons name="warning" size={20} color="#FF0000" />
                      </View>
                    )}
                  </View>
                </View>

                {role === "chef" && (
                  <>
                    <Input
                      placeholder="Mağaza/Ünvan"
                      value={storeAddress}
                      onChangeText={setStoreAddress}
                      variant="underline"
                      icon={
                        <Ionicons name="storefront-outline" size={20} color="#0B0E0B" />
                      }
                    />

                    <Input
                      placeholder="Bank hesabı"
                      value={bankAccount}
                      onChangeText={setBankAccount}
                      variant="underline"
                      icon={
                        <Ionicons name="business-outline" size={20} color="#0B0E0B" />
                      }
                    />

                    <View style={styles.imageUploadSection}>
                      <Text style={styles.uploadTitle}>
                        Mətbəxin şəklini əlavə edin
                      </Text>
                      <TouchableOpacity
                        style={styles.uploadContainer}
                        onPress={() => pickImage("kitchen")}>
                        {kitchenImage ? (
                          <Image
                            source={{ uri: kitchenImage }}
                            style={styles.previewImage}
                          />
                        ) : (
                          <>
                            <Ionicons name="camera-outline" size={40} color="#000" />
                            <Text style={styles.uploadText}>+Şəkil əlavə et</Text>
                            <Text style={styles.uploadSubtext}>
                              PNG, JPG, max 5MB
                            </Text>
                          </>
                        )}
                      </TouchableOpacity>
                    </View>
                  </>
                )}

                {role === "courier" && (
                  <>
                    <Input
                      placeholder="Bank hesabı"
                      value={bankAccount}
                      onChangeText={setBankAccount}
                      variant="underline"
                      icon={
                        <Ionicons name="business-outline" size={20} color="#0B0E0B" />
                      }
                    />

                    <TouchableOpacity 
                      style={styles.pickerContainer}
                      onPress={selectVehicle}>
                      <View style={styles.pickerLeft}>
                        <Ionicons name="car-outline" size={24} color="#000" />
                        <Text style={[styles.pickerText, !vehicleType && styles.placeholderText]}>
                          {vehicleType || "Nəqliyyat vasitəsini seçin"}
                        </Text>
                      </View>
                      <Ionicons name="chevron-down" size={24} color="#000" />
                    </TouchableOpacity>

                    <View style={styles.imageUploadSection}>
                      <Text style={styles.uploadTitle}>
                        Çatdırılma vasitəsinin şəklini əlavə edin
                      </Text>
                      <TouchableOpacity
                        style={styles.uploadContainer}
                        onPress={() => pickImage("vehicle")}>
                        {vehicleImage ? (
                          <Image
                            source={{ uri: vehicleImage }}
                            style={styles.previewImage}
                          />
                        ) : (
                          <>
                            <Ionicons name="camera-outline" size={40} color="#000" />
                            <Text style={styles.uploadText}>+Şəkil əlavə et</Text>
                            <Text style={styles.uploadSubtext}>
                              PNG, JPG, max 5MB
                            </Text>
                          </>
                        )}
                      </TouchableOpacity>
                    </View>
                  </>
                )}

                {/* Terms Checkbox */}
                <View style={styles.checkboxContainer}>
                  <TouchableOpacity
                    onPress={() => setAgree(!agree)}
                    style={styles.checkbox}>
                    {agree ? (
                      <Ionicons
                        name="checkmark-circle"
                        size={24}
                        color="#00C853"
                      />
                    ) : (
                      <Ionicons name="ellipse-outline" size={24} color="#999" />
                    )}
                  </TouchableOpacity>
                  <Text style={styles.checkboxText}>
                    İstifadəçi{" "}
                    <Text style={styles.linkText}>
                      müqaviləsini və məxfilik siyasətini
                    </Text>{" "}
                    oxudum və razılaşdım
                  </Text>
                </View>

                <Button
                  title="Qeydiyyatdan keç"
                  onPress={handleRegister}
                  style={styles.button}
                />

                <View style={styles.footer}>
                  <Text style={styles.footerText}>Artıq hesabınız var? </Text>
                  <Link href={{ pathname: "/(auth)/login", params: { role } }} asChild>
                    <TouchableOpacity>
                      <Text style={styles.loginLink}>Daxil ol</Text>
                    </TouchableOpacity>
                  </Link>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </View>
    </>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#08A30D",
  },
  topSection: {
    height: "30%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 55,
  },
  illustrationContainer: {
    width: 250,
    height: 200,
  },
  illustration: {
    width: "100%",
    height: "100%",
  },
  bottomSection: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 30,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#000",
  },
  form: {
    width: "100%",
  },
  passwordContainer: {
    position: "relative",
  },
  rightIcons: {
    position: "absolute",
    right: 0,
    top: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  eyeIcon: {
    padding: 5,
  },
  warningIcon: {
    padding: 5,
    marginLeft: 5,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 20,
  },
  checkbox: {
    marginRight: 10,
    marginTop: -2,
  },
  checkboxText: {
    fontSize: 12,
    color: "#999",
    flex: 1,
    lineHeight: 18,
  },
  linkText: {
    color: "#00C853",
  },
  button: {
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: "#00AA13",
    borderRadius: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  footerText: {
    color: "#666",
    fontSize: 14,
  },
  loginLink: {
    color: "#00AA13",
    fontWeight: "bold",
    fontSize: 14,
  },
  imageUploadSection: {
    marginTop: 20,
  },
  uploadTitle: {
    fontSize: 16,
    color: "#000",
    marginBottom: 10,
    fontWeight: "500",
  },
  uploadContainer: {
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 12,
    borderStyle: "dashed",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  uploadText: {
    fontSize: 18,
    color: "#00C853",
    fontWeight: "600",
    marginTop: 8,
  },
  uploadSubtext: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
  previewImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    resizeMode: "cover",
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 8,
    padding: 12,
    marginTop: 20,
    backgroundColor: "#fff",
  },
  pickerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  pickerText: {
    fontSize: 16,
    color: "#000",
  },
  placeholderText: {
    color: "#999",
  },
});
