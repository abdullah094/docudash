import { Dimensions, Platform, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";

import SignatureScreen, {
  SignatureViewRef,
} from "react-native-signature-canvas";
import { Appbar } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import {
  degrees,
  encodeToBase64,
  PDFDocument,
  rgb,
  StandardFonts,
} from "pdf-lib";
import { RNFetchBlob } from "rn-fetch-blob";
import Loading from "../components/Loading";
interface savedFile {
  exists: boolean;
  isDirectory: boolean;
  modificationTime: number;
  size: number;
  uri: string;
}

const Signature = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const pdfPath = route.params?.path;
const [isvisible, setIsvisible] = useState(false)
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [data, setData] = React.useState(null);
  const signatureView = useRef<SignatureViewRef>({} as SignatureViewRef);
  // signatureView.current.changePenSize(10,20)

  const saveSign = () => {
    signatureView.current.readSignature();

  };

  const resetSign = () => {
    signatureView.current.clearSignature();
    setData(null);
  };

  const onSave = function (signature) {
    

    EditPdf(signature);
    // const path = FileSystem.cacheDirectory + "sign.png";
    // FileSystem.writeAsStringAsync(
    //   path,
    //   signature.replace("data:image/png;base64,", ""),
    //   { encoding: FileSystem.EncodingType.Base64 }
    // )
    //   .then(() => FileSystem.getInfoAsync(path))
    //   .then((file) => {
    //     const imageURI =
    //       Platform.OS === "ios" ? file.uri.replace("file://", "") : file.uri;
    //     EditPdf(signature);
    //     // readPdfFile();
    //   })
    //   .catch(console.error);

    // setData(`data:image/png;base64,${result.encoded}`);
    // signatureView.current.show(false);
    // navigation.navigate({
    //   name: route.params?.routeName,
    //   params: { image: signature },
    //   merge: true,
    // });
    //we well add the signature to the redux store
  };

  const readPdfFile = async () => {
    try {
      // const existingPDF =
      //   Platform.OS === "ios" ? pdfPath.replace("file://", "") : pdfPath;
      // Get the URI of the PDF file
      const fileUri = pdfPath; // Replace with the actual file URI

      // Read the PDF file
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      const { exists, uri } = fileInfo;
      console.log("exists", exists);
      if (!exists) {
        console.log("PDF file does not exist.");
        return;
      }
      const fileContent = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.UTF8,
      });
      // Convert the UTF-8 string to Uint8Array
      const fileBytes = Buffer.from(fileContent, "utf-8");

      console.log("File Content (Uint8Array):", fileBytes);

      // Print the extracted text content
    } catch (error) {
      console.log("Error reading PDF file:", error);
    }
  };

  const EditPdf = async (imageURI) => {
    setIsvisible(true)
    // const existingPDF =
    //   Platform.OS === "ios" ? pdfPath.replace("file://", "") : pdfPath;
    // // console.log("existingPDF", existingPDF);

    let options = { encoding: FileSystem.EncodingType.Base64 };
    const base64 = await FileSystem.readAsStringAsync(pdfPath, options)
      .then((data) => {
        console.log(data);
        return data; // are you sure you want to resolve the data and not the base64 string?
      })
      .catch((err) => {
        console.log("​getFile -> err", err);
        return err;
      });
    // This should be a Uint8Array or ArrayBuffer
    // This data can be obtained in a number of different ways
    // If your running in a Node environment, you could use fs.readFile()
    // In the browser, you could make a fetch() call and use res.arrayBuffer()
    const existingPdfBytes = base64;

    // Load a PDFDocument from the existing PDF bytes
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Embed the Helvetica font
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Get the first page of the document
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    // Get the width and height of the first page
    const { width, height } = firstPage.getSize();

    // Draw a string of text diagonally across the first page
    // firstPage.drawText("This text was added with JavaScript!", {
    //   x: 5,
    //   y: height / 2 + 300,
    //   size: 50,
    //   font: helveticaFont,
    //   color: rgb(0.95, 0.1, 0.1),
    //   rotate: degrees(-45),
    // });
    // Embed the JPG image bytes and PNG image bytes
    const pngImage = await pdfDoc.embedPng(imageURI);
    // Get the width/height of the JPG image scaled down to 25% of its original size

    // Get the width/height of the PNG image scaled down to 50% of its original size
    const pngDims = pngImage.scale(0.5);
    // Draw the PNG image near the lower right corner of the JPG image
    firstPage.drawImage(pngImage, {
      x: 200,
      y: 10,
      width: 400,
      height: 400,
    });

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.saveAsBase64();

    FileSystem.writeAsStringAsync(pdfPath, pdfBytes, {
      encoding: FileSystem.EncodingType.Base64,
    }).then((data) => {
      console.log("File saved:", data);
      navigation.navigate('Documents')
    });

    // For example, `pdfBytes` can be:
    //   • Written to a file in Node
    //   • Downloaded from the browser
    //   • Rendered in an <iframe>
    setIsvisible(false)
  };

  const style = `
    .m-signature-pad {
      margin:auto;
      top:0;
    }
    body,html {
    width: ${windowWidth}px; height: ${windowHeight}px;
      .m-signature-pad--footer {display: none; margin: 0px;}`;

   if(isvisible)
    return(
      <Loading visible={isvisible}/>
    )  
    
    return (
    <View style={{ flex: 1 }}>
      <Appbar mode="small">
        <Appbar.Content title="Signature" />
        <Appbar.Action icon="content-save" onPress={saveSign} />
        <Appbar.Action icon="delete-outline" onPress={resetSign} />
        
      </Appbar>
      <View style={{ height: windowHeight, width: windowWidth }}>
        <SignatureScreen
          ref={signatureView}
          onBegin={() => setScrollEnabled(false)}
          onEnd={() => setScrollEnabled(true)}
          onOK={onSave}
          // dataURL={route.params?.image}
          webStyle={style}
        />
      </View>
    </View>
  );
};

export default Signature;

const styles = StyleSheet.create({});
