import { colors } from "@/utils/colors";
import React from "react";
import { Dimensions, Image, StyleSheet, TouchableOpacity } from "react-native";

const screenWidth = Dimensions.get("window").width;
const cardSize = screenWidth / 3 - 20;

export default function PhotoCard({ image, onPress }: { image: string, onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.lightGray,
    backgroundColor: colors.white,
    overflow: "hidden",
    margin: 5,
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    width: cardSize,
    height: cardSize
  },
  image: {
    width: "100%",
    height: "100%",
  },
});