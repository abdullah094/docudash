import { StyleSheet, Text, View,Dimensions,ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Appbar } from "react-native-paper";


const {width,height} = Dimensions.get('window')
const WhoWillSign = ({navigation,route}) => {

const {path} = route.params;

    const Box = ({image,text,onPress}) =>(
        <TouchableOpacity 
        onPress={onPress}
        style={{justifyContent:'center',alignItems:'center',width:width-40,borderRadius:5,height:120,borderWidth:1,marginTop:15,backgroundColor:'white',borderColor:'gray'}}>
<Image style={{height:50,width:50}} source={image}/>
<Text style={{color:'black'}}>{text}</Text>
        </TouchableOpacity>
    )
  return (
    <ScrollView contentContainerStyle={{alignItems:'center',paddingBottom:50}}>
         <Appbar mode="small">
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Who will Sign" />
      </Appbar>
      <Text style={styles.top_text}>Who needs to sign this document</Text>
      <View style={{marginTop:20}}>
<Box image={require('../../assets/me.png')} text={"Sign document yourself"} 
onPress={()=>navigation.navigate('PDFViewer',{path:path})}/>
<Box image={require('../../assets/onlyOthers.png')} text={"Get others to sign it"}/>
<Box image={require('../../assets/mePlusOthers.png')} text={"Both parties sign the document"}/>
</View>
    </ScrollView>
  )
}

export default WhoWillSign

const styles = StyleSheet.create({
    top_text:{
        marginTop:50,
        fontWeight:'600',
        fontSize:16,
        color:'black'
    }
})