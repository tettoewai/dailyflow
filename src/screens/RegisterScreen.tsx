import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/lib/auth/authStore";
import Lucide from "@react-native-vector-icons/lucide";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface RegisterScreenProps {
  onLoginPress: () => void;
}

export default function RegisterScreen({ onLoginPress }: RegisterScreenProps) {
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [confirmPassword, setConfirmPassword] = useState<string | undefined>();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const { isLoading, setIsLoading } = useAuthStore();

  const inputClassName = "border border-gray-200 rounded-md px-4";

  const PasswordToggleIcon = (
    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
      <Lucide name={showPassword ? "eye" : "eye-off"} color="gray" size={16} />
    </TouchableOpacity>
  );

  const ConfirmPasswordToggleIcon = (
    <TouchableOpacity
      onPress={() => setShowConfirmPassword(!showConfirmPassword)}
    >
      <Lucide
        name={showConfirmPassword ? "eye" : "eye-off"}
        color="gray"
        size={16}
      />
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 justify-center bg-background p-6">
      <Text className="font-bold text-xl text-center mb-5 text-primary">
        Create an Account
      </Text>
      <View className="flex flex-col gap-4">
        <Input
          placeholder="Full name"
          value={email}
          onChangeText={setEmail}
          editable={!isLoading}
          className={inputClassName}
        />
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
          secureTextEntry
          editable={!isLoading}
          className={inputClassName}
          rightElement={PasswordToggleIcon}
        />
        <Input
          placeholder="Confirm password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showPassword}
          editable={!isLoading}
          className={inputClassName}
          rightElement={ConfirmPasswordToggleIcon}
        />
        <Button
          variant="primary"
          onPress={() => {}}
          loading={isLoading}
          size="sm"
        >
          Register
        </Button>
      </View>
      <View className="flex flex-col mt-4">
        <TouchableOpacity onPress={onLoginPress} disabled={isLoading}>
          <Text className="text-center">
            Already have an account? <Text className="text-primary">Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
