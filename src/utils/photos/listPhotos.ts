import * as FileSystem from "expo-file-system";

interface PhotoMetadata {
  uri: string;
  dateTime: string;
  location: {
    latitude: number;
    longitude: number;
  } | null;
}

export async function listSavedPhotos(): Promise<PhotoMetadata[]> {
  try {
    const folderUri = FileSystem.documentDirectory + "photos/";
    const folderInfo = await FileSystem.getInfoAsync(folderUri);

    if (!folderInfo.exists) {
      return [];
    }

    const files = await FileSystem.readDirectoryAsync(folderUri);

    const jsonFiles = files.filter((file) => file.endsWith(".json"));

    const metadataList: PhotoMetadata[] = [];

    for (const jsonFile of jsonFiles) {
      const jsonUri = folderUri + jsonFile;
      const content = await FileSystem.readAsStringAsync(jsonUri);
      const metadata: PhotoMetadata = JSON.parse(content);
      metadataList.push(metadata);
    }

    metadataList.sort((a, b) => (a.dateTime < b.dateTime ? 1 : -1));

    return metadataList;
  } catch (error) {
    console.error("Erro ao listar fotos:", error);
    return [];
  }
}
