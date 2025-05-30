import * as FileSystem from "expo-file-system";

export async function deletePhotoFromFileSystem(photoUri: string) {
  try {
    const photoInfo = await FileSystem.getInfoAsync(photoUri);
    if (photoInfo.exists) {
      await FileSystem.deleteAsync(photoUri, { idempotent: true });
    }

    const jsonUri = photoUri.replace(/\.jpg$/, ".json");
    const jsonInfo = await FileSystem.getInfoAsync(jsonUri);
    if (jsonInfo.exists) {
      await FileSystem.deleteAsync(jsonUri, { idempotent: true });
    }

    return { success: true };
  } catch (error) {
    console.error("Erro ao deletar foto:", error);
    return { success: false, error };
  }
}