import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { AuthProvider, AuthContext } from "./src/context/AuthContext";

import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import ChatScreen from "./src/screens/ChatScreen";
import ChannelistScreen from "./src/screens/ChannellistScreen";

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

// Tabs de la app después del login
function AppTabs() {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Channels" component={ChannelistScreen} />
      {/* Agregar mas tabs aquí */}
    </Tabs.Navigator>
  );
}

// Stack principal con login / registro y el stack de tabs
function RootNavigator() {
  const { user } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="AppTabs" component={AppTabs} />
          <Stack.Screen name="Chat" component={ChatScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
