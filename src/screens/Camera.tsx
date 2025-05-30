import CustomAlert from "@/components/CustomAlert";
import PhotoPreviewModal from "@/components/PhotoPreviewModal";
import { colors } from "@/utils/colors";
import { savePhotoToFileSystem } from "@/utils/photos/savePhoto";
import * as Location from "expo-location";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Camera as Cam, CameraPermissionStatus, useCameraDevice, useCameraPermission } from "react-native-vision-camera";

function useCameraAndLocationPermissions() {
  const { hasPermission, requestPermission } = useCameraPermission();
  const [cameraPermission, setCameraPermission] = useState<CameraPermissionStatus>("not-determined");
  const [locationGranted, setLocationGranted] = useState(false);

  useEffect(() => {
    (async () => {
      const cameraStatus = await requestPermission();
      setCameraPermission(cameraStatus ? "granted" : "denied");

      const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
      setLocationGranted(locationStatus === "granted");
    })();
  }, []);

  return { cameraPermission, locationGranted };
}

function formatDateTime(date: Date) {
  return date.toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function Camera({ navigation }: any) {
  const device = useCameraDevice("back");
  const { cameraPermission } = useCameraAndLocationPermissions();

  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [photoDateTime, setPhotoDateTime] = useState<string>("");
  const [photoLocation, setPhotoLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);

  const cameraRef = useRef<Cam>(null);

  if (!device) return (
    <View style={styles.loading}>
      <Text>Carregando câmera...</Text>
    </View>
  );

  if (cameraPermission !== "granted") return (
    <View style={styles.loading}>
      <Text>Permissão para câmera negada ou pendente.</Text>
    </View>
  );

  const takePicture = async () => {
    try {
      if (!cameraRef.current) throw new Error("Câmera não localizada");

      const photo = await cameraRef.current.takePhoto();
      const location = await Location.getCurrentPositionAsync();

      setCapturedPhoto(`file://${photo.path}`);
      setPhotoDateTime(formatDateTime(new Date()));
      setPhotoLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      setIsPreviewVisible(true);
    } catch (error) {
      console.error(error);
      alert("Erro ao capturar foto ou localização.");
    }
  };

  const handleSave = async () => {
    if (!capturedPhoto) return;

    try {
      await savePhotoToFileSystem({
        photoUri: capturedPhoto,
        dateTime: photoDateTime,
        location: photoLocation,
      });
      setIsSuccessVisible(true);
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar a foto.");
    }
  };

  return (
    <View style={styles.container}>
      <PhotoPreviewModal
        visible={isPreviewVisible}
        photoUri={capturedPhoto}
        onSave={handleSave}
        onCancel={() => setIsPreviewVisible(false)}
      />
      <Cam
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive
        photo
        resizeMode="cover"
      />
      <TouchableOpacity style={styles.button} onPress={takePicture} />
      <CustomAlert
        visible={isSuccessVisible}
        type="success"
        message="Foto salva com sucesso!"
        onConfirm={() => {
          setIsSuccessVisible(false);
          navigation.goBack();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 4,
    backgroundColor: colors.white,
    borderColor: colors.white,
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
  }
});