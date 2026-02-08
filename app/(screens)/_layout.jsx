import { Stack } from "expo-router";

const OtherScreensLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="category" options={{ headerShown: false }} />
    </Stack>
  );
};

export default OtherScreensLayout;
