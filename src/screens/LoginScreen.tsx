import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { Input, InputField, InputSlot } from "@/components/ui/input";
import { useAuthStore } from "@/lib/auth/authStore";
import Lucide from "@react-native-vector-icons/lucide";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface LoginScreenProps {
  onRegisterPress: () => void;
  onGuestPress: () => void;
}

export default function LoginScreen({
  onRegisterPress,
  onGuestPress,
}: LoginScreenProps) {
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const { isLoading, setIsLoading } = useAuthStore();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleLogin = () => {
    if (!email?.trim() || !password?.trim()) {
    }
  };

  const inputClassName = "border border-gray-200 rounded-md px-4";

  const PasswordToggleIcon = (
    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
      <Lucide name={showPassword ? "eye" : "eye-off"} color="gray" size={16} />
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 justify-center bg-background p-6">
      <Text className="font-bold text-xl text-center mb-5 text-primary">
        Welcome Back
      </Text>
      <View className="flex flex-col gap-4">
        <Input>
          <InputField
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
        </Input>
        <Input className={inputClassName}>
          <InputField
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />

          <InputSlot>{PasswordToggleIcon}</InputSlot>
        </Input>
        <Button onPress={handleLogin} isDisabled={isLoading}>
          Login
        </Button>
      </View>
      <View className="flex flex-col mt-6 items-center">
        <TouchableOpacity onPress={onRegisterPress} disabled={isLoading}>
          <Text className="text-center">
            Don't have an account?{" "}
            <Text className="text-primary">Register</Text>
          </Text>
        </TouchableOpacity>
        <Divider className="my-3">OR</Divider>
        <TouchableOpacity onPress={onGuestPress} disabled={isLoading}>
          <Text className="text-center">Continue as Guest</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
