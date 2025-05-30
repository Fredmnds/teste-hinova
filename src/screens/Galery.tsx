import NewPhoto from "@/components/NewPhoto";
import PhotoCard from "@/components/PhotoCard";
import { colors } from "@/utils/colors";
import { listSavedPhotos } from "@/utils/photos/listPhotos";
import { Photo } from "@/utils/types";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";

const screenWidth = Dimensions.get("window").width;
const numColumns = 3;
const spacing = 10;
const itemSize = (screenWidth - spacing * (numColumns + 1)) / numColumns;

export default function Galery({ navigation }: any) {
  const [images, setImages] = useState<Photo[]>([]);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchPhotos = async () => {
        const photos = await listSavedPhotos();
        if (isActive) {
          setImages(photos);
        }
      };

      fetchPhotos();

      return () => {
        isActive = false;
      };
    }, [])
  );

  const handlePress = useCallback(() => {
    navigation.navigate("camera");
  }, [navigation]);

  const data = React.useMemo(() => [{ id: "new-photo", type: "new" }, ...images], [images]);

  const renderItem = useCallback(
    ({ item }: any) => {
      if (item.type === "new") {
        return <NewPhoto handlePress={handlePress} />;
      }
      return (
        <PhotoCard
          image={item.uri}
          onPress={() => navigation.navigate("PhotoDetail", { uri: item.uri })}
        />
      );
    },
    [handlePress, navigation]
  );

  const keyExtractor = useCallback((item: any, index: number) => {
    if (item.type === "new") return "new-photo-unique-key";
    return item.id ? String(item.id) : `photo-${index}`;
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={numColumns}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        initialNumToRender={9}
        maxToRenderPerBatch={9}
        windowSize={5}
        removeClippedSubviews={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing,
    backgroundColor: colors.background,
  },
  row: {
    justifyContent: "flex-start",
  },
  item: {
    width: itemSize,
    height: itemSize,
    marginRight: spacing,
    marginBottom: spacing,
    borderRadius: 12,
  },
});
