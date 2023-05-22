import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect,useState } from "react";
import { StyleSheet, Dimensions, View, Alert } from "react-native";
import { Appbar } from "react-native-paper";
import Pdf from "react-native-pdf";
import { DocumentNavigationProps, DocumentRouteProps } from "../types";
import Draggable from 'react-native-draggable';
import { Item } from "react-native-paper/lib/typescript/src/components/Drawer/Drawer";


const {width,height} = Dimensions.get('window')
export default function PDFViewer() {
  const navigation = useNavigation<DocumentNavigationProps<"PDFViewer">>();
  const route = useRoute<DocumentRouteProps<"PDFViewer">>();
  const pdfPath = decodeURI(route.params?.path);
  // const pdfPath = route.params?.path; route.params?.path;
const [pdfDimension, setPDFDimension] = useState({
  x: 0,
  y: 100,
  width: 300,
  height:400
})
console.log(pdfDimension)
  const draggable = (event,gesture,bounds) =>{
    // console.log(gesture)
  }
  const ondrag  = (event, gestureState)=>{
    // console.log(gestureState)
  }
  return (
    <View style={styles.container} >
      <Appbar mode="small">
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="View Pdf" />
        <Appbar.Action
          icon="content-save"
          onPress={() => navigation.navigate("Signature", { path: pdfPath })}
        />
      </Appbar>
      <View  onLayout={(event) => {
      var {x, y, width, height} = event.nativeEvent.layout;
      console.log(`x: ${x} y: ${y} width: ${width} height: ${height}`)
     setPDFDimension({...pdfDimension,x:x,y:y,width:width,height:height})
    }}>
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

          <Draggable 
          
            imageSource={require('../../assets/icon.png')} 
            renderSize={80} 
            x={width-100}
           minX={pdfDimension.x+10}
          minY={pdfDimension.y+50}
          maxX={pdfDimension.width-5}
          maxY={pdfDimension.height-5}
            y={width-10}
            onDrag={ondrag}
            onDragRelease={draggable}
            onLongPress={()=>console.log('long press')}
            onShortPressRelease={()=>console.log('press drag')}
            onPressIn={()=>console.log('in press')}
            onPressOut={()=>console.log('out press')}
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
  
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height-100,
  },
});
