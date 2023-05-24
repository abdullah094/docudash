import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useFonts } from 'expo-font';
const FontText = ({text,styles,font}) => {

    const [fontsLoaded] = useFonts({
        'Billy-Argel': require('../../assets/fonts/docudash_fonts/Billy-Argel-Font___.ttf'),
        'Candy': require('../../assets/fonts/docudash_fonts/CANDY___.otf'),
        'Arty-Signature': require('../../assets/fonts/docudash_fonts/Arty-Signature.otf'),
        'Creattion-Demo': require('../../assets/fonts/docudash_fonts/Creattion-Demo.otf'),
        'Holligate-Signature-Demo': require('../../assets/fonts/docudash_fonts/Holligate-Signature-Demo.ttf'),
        'MonsieurLaDoulaise-Regular': require('../../assets/fonts/docudash_fonts/MonsieurLaDoulaise-Regular.ttf'),
        'Southam-Demo': require('../../assets/fonts/docudash_fonts/Southam-Demo.otf'),
        
      });

      const fontOutput = (fontStyle) =>{
       
       switch(fontStyle){
        case 1:
            return  'Billy-Argel'
            break;

        case 2:
            return 'Candy'
            break;
        case 3:
            return 'Arty-Signature'
            break;
        case 4: 
             return 'Creattion-Demo'
             break;
        case 5:
            return  'Holligate-Signature-Demo'
            break;
        case 6:
             return 'MonsieurLaDoulaise-Regular'
             break;
        case 7:
            return  'Southam-Demo'
            break;
        default:
            return 'Billy-Argel'
            break;

       }
      }



      if (!fontsLoaded) {
        return null;
      }
  return (
      <Text numberOfLines={1} style={[{fontFamily:fontOutput(font),fontSize:60,letterSpacing:1,},styles]}>{text}</Text>
  )
}

export default FontText

const styles = StyleSheet.create({})