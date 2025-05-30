
import CustomAlert from "@/components/CustomAlert";
import { deletePhotoFromFileSystem } from "@/utils/photos/deletePhoto";
import { PhotoDetail } from "@/utils/types";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { colors } from "@/utils/colors";

export default function PhotoDetailScreen({ navigation }: any) {
  const route = useRoute();
  const { uri } = route.params as { uri: string };

  const [photoData, setPhotoData] = useState<PhotoDetail>();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const loadMetadata = async () => {
    try {
      const fileName = uri.split("/").pop()?.replace(".jpg", ".json");
      const metadataPath = `${FileSystem.documentDirectory}photos/${fileName}`;
      const json = await FileSystem.readAsStringAsync(metadataPath);
      const data = JSON.parse(json);
      setPhotoData(data);
    } catch (e) {
      console.error("Erro ao carregar metadados da foto:", e);
    }
  };

  const confirmDelete = () => {
    setIsModalVisible(true)
  }

  const deletePhoto = async () => {
    try {
      await deletePhotoFromFileSystem(uri);
      navigation.goBack();
    } catch (e) {
      console.error("Erro ao deletar a foto:", e);
    }
  }


  useEffect(() => {
    loadMetadata();
  }, [uri]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: photoData?.uri }} style={styles.image} />

      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>Informações:</Text>
          <TouchableOpacity onPress={confirmDelete} >
            <Ionicons name="trash-outline" size={22} color={colors.red} />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Data e hora:</Text>
        <Text style={styles.value}>{photoData?.dateTime}</Text>

        {photoData?.location && (
          <>
            <Text style={styles.label}>Latitude/ Longitude:</Text>
            <Text style={styles.value}>
              {photoData.location.latitude.toFixed(6)}, {photoData.location.longitude.toFixed(6)}
            </Text>
          </>
        )}
      </View>
      <CustomAlert
        visible={isModalVisible}
        type="confirm"
        message="Quer mesmo excluir essa foto?"
        onCancel={() => setIsModalVisible(false)}
        onConfirm={() => {
          setIsModalVisible(false);
          deletePhoto();
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 400,
    borderRadius: 12,
    marginBottom: 24,
  },
  info: {
    width: "100%",
  },
  label: {
    fontWeight: "600",
    marginTop: 8,
    color: colors.defaultText,
  },
  value: {
    fontSize: 16,
    color: colors.defaultText,
  },
  card: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 12,
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    marginVertical: 8,
    width: "100%"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.lightGray,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },

});
