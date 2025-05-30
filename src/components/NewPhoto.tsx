import { colors } from "@/utils/colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";

const screenWidth = Dimensions.get("window").width;
const cardSize = screenWidth / 3 - 20;

export default function NewPhoto({ handlePress }: { handlePress: () => void }) {

  return (
    <Pressable onPress={() => handlePress()} style={styles.card}>
      <View style={styles.iconContainer}>
        <Ionicons name="camera-outline" size={28} color={colors.blue} />
        <Text>+ Nova Foto</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: colors.blue,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    width: cardSize,
    height: cardSize,
  },
  iconContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
});
