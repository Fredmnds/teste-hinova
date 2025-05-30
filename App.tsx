import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import StackNavigator from "./src/navigations/";

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}