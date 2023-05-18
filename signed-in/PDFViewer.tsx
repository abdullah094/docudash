import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import { Appbar } from "react-native-paper";
import Pdf from "react-native-pdf";
import { DocumentNavigationProps, DocumentRouteProps } from "../types";

export default function PDFViewer() {
  const navigation = useNavigation<DocumentNavigationProps<"PDFViewer">>();
  const route = useRoute<DocumentRouteProps<"PDFViewer">>();
  const pdfPath = decodeURI(route.params?.path);
  // const pdfPath = route.params?.path; route.params?.path;

  return (
    <View style={styles.container}>
      <Appbar mode="small">
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="View Pdf" />
        <Appbar.Action
          icon="content-save"
          onPress={() => navigation.navigate("Signature", { path: pdfPath })}
        />
      </Appbar>
      <Pdf
        source={{ uri: pdfPath }}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
        }}
        onError={(error) => {
          console.log(error);
        }}
        onPressLink={(uri) => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={styles.pdf}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "flex-start",
    // alignItems: "center",
    // marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
