import PhotoDetail from "@/screens/PhotoDetail";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Camera from "../screens/Camera";
import Galery from "../screens/Galery";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="galery" component={Galery} options={{ title: "Minhas fotos" }} />
      <Stack.Screen name="camera" component={Camera} options={{ title: "Câmera" }} />
      <Stack.Screen name="PhotoDetail" component={PhotoDetail} options={{ title: "Detalhes da Foto" }} />
    </Stack.Navigator>
  );
}