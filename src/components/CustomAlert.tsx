import { colors } from "@/utils/colors";
import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type AlertType = "success" | "error" | "confirm";

type CustomAlertProps = {
  visible: boolean;
  type: AlertType;
  title?: string;
  message: string;
  onCancel?: () => void;
  onConfirm?: () => void;
};

export default function CustomAlert({
  visible,
  type,
  title,
  message,
  onCancel,
  onConfirm,
}: CustomAlertProps) {
  const isConfirm = type === "confirm";
  const isError = type === "error";
  const isSuccess = type === "success";

  const getTitle = () => {
    if (title) return title;
    if (isConfirm) return "Confirmação";
    if (isError) return "Erro";
    if (isSuccess) return "Sucesso";
    return "";
  };

  return (
    <Modal animationType="fade" transparent visible={visible} onRequestClose={onCancel}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text
            style={[
              styles.title,
              isSuccess && { color: "green" },
              isError && { color: "red" },
              isConfirm && { color: colors.defaultText },
            ]}
          >
            {getTitle()}
          </Text>
          <Text style={styles.message}>{message}</Text>

          <View style={styles.buttonsContainer}>
            {isConfirm && (
              <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onCancel}>
                <Text style={[styles.buttonText, styles.cancelButtonText]}>Cancelar</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[
                styles.button,
                isSuccess && styles.successButton,
                isError && styles.errorButton,
                isConfirm && styles.confirmButton,
              ]}
              onPress={onConfirm}
            >
              <Text
                style={[
                  styles.buttonText,
                  isSuccess && { color: colors.white },
                  isError && { color: colors.white },
                  isConfirm && { color: colors.white },
                ]}
              >
                {isConfirm ? "Confirmar" : "OK"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "80%",
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.defaultText,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: colors.defaultText,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: colors.lightGray,
  },
  confirmButton: {
    backgroundColor: colors.blue,
  },
  successButton: {
    backgroundColor: "green",
  },
  errorButton: {
    backgroundColor: "red",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  cancelButtonText: {
    color: colors.defaultText,
  },
});
