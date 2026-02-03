
import { useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import LogoMain from "../assets/LogoMain.png";
import { useRouter } from "expo-router";

const Splash = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/onboarding");
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.logoContainer}>
        <Image source={LogoMain} style={styles.logo} />
      </View>
    </View>
  );
};
export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00AA13",
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
  },

  logo: {
    width: 332,
    height: 332,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
