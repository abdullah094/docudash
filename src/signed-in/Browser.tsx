import { StyleSheet, Text, View, Dimensions, } from 'react-native'
import React, { useEffect, useState } from 'react'
import Pdf from 'react-native-pdf';
import { WebView } from 'react-native-webview'
import { useNavigation, useRoute } from '@react-navigation/native';
import * as FileSystem from "expo-file-system";
import { Pressable } from 'react-native';
import Colors from '../styles/constants'
import {Button} from 'react-native-paper'
import tw from 'twrnc';
const Browser = () => {

    const navigation = useNavigation();
    const route = useRoute();
    const pdfPath = decodeURI(route.params?.path);

console.log(pdfPath)
const [data, setData] = useState()

useEffect(() => {
  const file = async()=>{
    let options = { encoding: FileSystem.EncodingType.Base64 };
    const base64 = await FileSystem.readAsStringAsync(pdfPath, options)
      .then((data) => {
       
        setData(data)
        return data; // are you sure you want to resolve the data and not the base64 string?
      })
      .catch((err) => {
        console.log("​getFile -> err", err);
        return err;
      });
}
file();
}, [pdfPath,route])

console.log(pdfPath)



  return (
   <>
   <Button style={tw`bg-[#6FAC46] rounded-xl mx-20 mt-4`} 
    onPress={()=>navigation.navigate('Signature',{path : pdfPath})}>
   <Text style={{color:Colors.white}}>Sign Document</Text>
   </Button>
       
   <View style={styles.container}>
                <Pdf
                    source={{uri :pdfPath}}
                    onLoadComplete={(numberOfPages,filePath) => {
                        console.log(`Number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page,numberOfPages) => {
                        console.log(`Current page: ${page}`);
                    }}
                    onError={(error) => {
                        console.log(error);
                    }}
                    onPressLink={(uri) => {
                        console.log(`Link pressed: ${uri}`);
                    }}
                    style={styles.pdf}/>
            </View>
</>
  )
}

export default Browser

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex:1,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    }
})