import * as React from "react";
//import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../Screen/LoginScreen";
import Dashboard from "../Screen/Dashboard";
import CaptureImg from "../Screen/CaptureImg";
import UploadedImgs from "../Screen/UploadedImgs";
import ProfileManager from "../Screen/ProfileManager";

function Navigation() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="UploadedImgs" component={UploadedImgs} />
      <Stack.Screen name="CaptureImg" component={CaptureImg} />
      <Stack.Screen name="ProfileManager" component={ProfileManager} />
    </Stack.Navigator>
  );
}

export default Navigation;
