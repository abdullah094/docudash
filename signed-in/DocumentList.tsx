import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import tw from "twrnc";
import FileItem from "../components/FileItem";
import * as FileSystem from "expo-file-system";
export default function DocumentList() {
  const [documents, setDocuments] = useState<FileSystem.FileInfo[]>([]);
  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: false,
    });
    copyFileToAppDirectory(result);
  };
  const copyFileToAppDirectory = async (
    result: DocumentPicker.DocumentResult
  ) => {
    try {
      // Get the source file URI
      // @ts-ignore
      const sourceUri = result.uri; // Replace with the actual file URI

      // Read the PDF file
      const fileInfo = await FileSystem.getInfoAsync(
        FileSystem.documentDirectory + "docudash"
      );
      const { exists, uri } = fileInfo;

      if (!exists) {
        await FileSystem.makeDirectoryAsync(
          FileSystem.documentDirectory + "docudash"
        );
      }
      //filename
      const decodedUri = decodeURIComponent(sourceUri);
      const fileName = decodedUri.substring(decodedUri.lastIndexOf("/") + 1);
      // Create a destination file URI in the application's document directory
      const destinationUri =
        FileSystem.documentDirectory + "docudash/" + fileName;
      // Copy the file to the application directory
      await FileSystem.copyAsync({
        from: sourceUri,
        to: destinationUri,
      });

      console.log(
        "PDF file copied to the application directory:",
        destinationUri
      );
      listItemsInDirectory();
    } catch (error) {
      console.log("Error copying file:", error);
    }
  };
  const listItemsInDirectory = async () => {
    setDocuments([]);
    const directoryUri = FileSystem.documentDirectory + "docudash";
    try {
      // Read the directory contents
      const dirInfo = await FileSystem.readDirectoryAsync(directoryUri);

      // Loop through the directory contents
      for (let i = 0; i < dirInfo.length; i++) {
        const itemUri = `${directoryUri}/${dirInfo[i]}`;

        // Read each item in the directory
        const itemInfo = await FileSystem.getInfoAsync(itemUri);

        if (!itemInfo.isDirectory) {
          setDocuments((prev) => [...prev, itemInfo]);
        }
        // Log the item name and type
        // console.log('Item:', dirInfo[i]);
        // console.log('Type:', itemInfo.isDirectory ? 'Directory' : 'File');
      }
    } catch (error) {
      console.log("Error listing directory:", error);
    }
  };
  useEffect(() => {
    listItemsInDirectory();
  }, []);

  return (
    <View style={tw`flex-1 bg-white items-center justify-center`}>
      <TouchableOpacity onPress={pickDocument}>
        <Text>Get document</Text>
      </TouchableOpacity>
      <FlatList
        data={documents}
        renderItem={({ item }) => <FileItem item={item}></FileItem>}
      />
    </View>
  );
}
