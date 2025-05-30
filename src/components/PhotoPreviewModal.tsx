import { colors } from "@/utils/colors";
import React from "react";
import { Button, Dimensions, Image, Modal, StyleSheet, View } from "react-native";

interface PhotoPreviewModalProps {
  visible: boolean;
  photoUri: string | null;
  onSave: () => void;
  onCancel: () => void;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const imageWidth = screenWidth * 0.85;
const imageHeight = screenHeight * 0.5;

export default function PhotoPreviewModal({
  visible,
  photoUri,
  onSave,
  onCancel
}: PhotoPreviewModalProps) {

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.content}>
          {photoUri && (
            <Image
              source={{ uri: photoUri }}
              style={styles.previewImage}
              resizeMode="contain"
            />
          )}
          <View style={styles.buttonRow}>
            <View style={styles.button}>
              <Button title="Cancelar" color="red" onPress={onCancel} />
            </View>
            <View style={styles.button}>
              <Button title="Salvar" onPress={onSave} />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: colors.black,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  content: {
    width: screenWidth * 0.9,
    height: screenHeight * 0.6,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
  },
  previewImage: {
    borderRadius: 12,
    marginBottom: 20,
    width: imageWidth,
    height: imageHeight
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
});
