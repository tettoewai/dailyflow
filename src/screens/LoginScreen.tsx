import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Separator from "@/components/ui/Separator";
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
        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          editable={!isLoading}
          className={inputClassName}
        />
        <Input
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          editable={!isLoading}
          className={inputClassName}
          rightElement={PasswordToggleIcon}
        />
        <Button
          variant="primary"
          onPress={() => {}}
          loading={isLoading}
          size="sm"
        >
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
        <Separator className="my-3">OR</Separator>
        <TouchableOpacity onPress={onGuestPress} disabled={isLoading}>
          <Text className="text-center">Continue as Guest</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
