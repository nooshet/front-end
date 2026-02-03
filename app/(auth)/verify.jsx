import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Input from "../../components/Input";
import Button from "../../components/Button";
import LogoMain from "../../assets/LogoMain.png";

const Verify = () => {
  const router = useRouter();
  const [code, setCode] = useState("");

  const handleVerify = () => {
    // Implement verify logic
    console.log("Verify using:", code);
    router.replace("/(auth)/login");
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <StatusBar style="dark" />
        
        <View style={styles.header}>
          <Image source={LogoMain} style={styles.logo} resizeMode="contain" />
          <Text style={styles.title}>Təsdiqləmə</Text>
          <Text style={styles.subtitle}>Emailinizə göndərilən kodu daxil edin</Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Təsdiq kodu"
            placeholder="123456"
            value={code}
            onChangeText={setCode}
            keyboardType="number-pad"
            style={{ textAlign: 'center' }} 
          />

          <Button title="Təsdiqlə" onPress={handleVerify} style={styles.button} />
        </View>
      </View>
    </>
  );
};

export default Verify;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  form: {
    width: "100%",
  },
  button: {
    marginTop: 24,
  },
});
