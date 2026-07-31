import LoginScreen from "@/screens/LoginScreen";
import RegisterScreen from "@/screens/RegisterScreen";
import { useState } from "react";

export default function AuthLayout() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <>
      {isLogin ? (
        <LoginScreen
          onRegisterPress={() => setIsLogin(false)}
          onGuestPress={() => {}}
        />
      ) : (
        <RegisterScreen onLoginPress={() => setIsLogin(true)} />
      )}
    </>
  );
}
