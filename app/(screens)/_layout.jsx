import { Stack } from "expo-router";

const OtherScreensLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="category" options={{ headerShown: false }} />
      <Stack.Screen name="catalog" options={{ headerShown: false }} />
      <Stack.Screen name="chef-profile" options={{ headerShown: false }} />
      <Stack.Screen name="product-detail" options={{ headerShown: false }} />
      <Stack.Screen name="order" options={{ headerShown: false }} />
      <Stack.Screen name="payment" options={{ headerShown: false }} />
      <Stack.Screen name="verification-3ds" options={{ headerShown: false }} />
      <Stack.Screen name="success" options={{ headerShown: false }} />
      <Stack.Screen name="order-tracking" options={{ headerShown: false }} />
      <Stack.Screen name="order-details" options={{ headerShown: false }} />
    </Stack>
  );
};

export default OtherScreensLayout;
