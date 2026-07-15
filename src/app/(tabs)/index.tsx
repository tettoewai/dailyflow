import { useRouter } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  const router = useRouter();
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-xl font-bold text-primary">Home page</Text>
    </View>
  );
}
