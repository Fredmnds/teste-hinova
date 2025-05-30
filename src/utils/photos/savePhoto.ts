import * as FileSystem from "expo-file-system";

interface SavePhotoOptions {
  photoUri: string;
  dateTime: string;
  location: { latitude: number; longitude: number } | null;
}

export async function savePhotoToFileSystem({ photoUri, dateTime, location }: SavePhotoOptions) {
  try {
    const folderUri = FileSystem.documentDirectory + "photos/";
    const fileName = `photo_${Date.now()}.jpg`;
    const jsonFileName = fileName.replace(".jpg", ".json");
    const folderInfo = await FileSystem.getInfoAsync(folderUri);


    if (!folderInfo.exists) {
      await FileSystem.makeDirectoryAsync(folderUri, { intermediates: true });
    }

    const newPhotoUri = folderUri + fileName;
    await FileSystem.copyAsync({
      from: photoUri,
      to: newPhotoUri,
    });

    const metadata = {
      uri: newPhotoUri,
      dateTime,
      location,
    };

    await FileSystem.writeAsStringAsync(
      folderUri + jsonFileName,
      JSON.stringify(metadata),
      { encoding: FileSystem.EncodingType.UTF8 }
    );

    return {
      success: true,
      uri: newPhotoUri,
      metadataUri: folderUri + jsonFileName,
    };
  } catch (error) {
    console.error("Erro ao salvar foto:", error);
    return { success: false, error };
  }
}