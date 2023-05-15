import { StyleSheet, Text, View,ScrollView, Dimensions,TextInput,TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import Colors from '../styles/constants'
import { useRoute } from '@react-navigation/native'
import {useNavigation} from '@react-navigation/core'

const {width,height} = Dimensions.get('window')
const ScheduleForm = () => {
  const navigation = useNavigation();
  const route = useRoute();
    const {date} = route.params
    console.log(date)
  return (
   <ScrollView contentContainerStyle={{alignItems:'center',paddingBottom:100}}>
    
      <Text style={{color:Colors.black,width:width-40,fontFamily:'Montserrat-SemiBold',textAlign:'center',fontSize:20,marginTop:30}}>Please fill the form to book a meeting with the notary</Text>
      
      <View style={styles.input_view}>
        <Text style={styles.input_heading}>
           Full Name
        </Text>
        <TextInput style={styles.input}/>
        </View>

        <View style={styles.input_view}>
        <Text style={styles.input_heading}>
            Phone#
        </Text>
        <TextInput style={styles.input}/>
        </View>

        <View style={styles.input_view}>
        <Text style={styles.input_heading}>
            City
        </Text>
        <TextInput style={styles.input}/>
        </View>

        <View style={styles.input_view}>
        <Text style={styles.input_heading}>
         Date
        </Text>
        <TextInput style={styles.input} placeholder={date}  editable={false} selectTextOnFocus={false}/>
        </View>
        <TouchableOpacity
        onPress={() => 
        {
            Alert.alert('Meeting has been scheduled, you will be notified')
            navigation.navigate("MapHome")
        }
      }
        style={{
          backgroundColor: Colors.green,
          justifyContent: 'center',
          alignItems: 'center',
          width: 200,
          height: 70,
          borderRadius: 40,
          marginTop: 30,
        }}>
        <Text
          style={{
            color: Colors.white,
            fontFamily: 'Montserrat-SemiBold',
            fontSize: 20,
          }}>
         Book
        </Text>
      </TouchableOpacity>
      </ScrollView>
  )
}

export default ScheduleForm

const styles = StyleSheet.create({
    input_view:{
        width:width-30,
        marginTop:25
    },
    input:{
        borderBottomWidth:1,
        paddingHorizontal:10,
       color:Colors.black
    },
    input_heading:{
     
        color:Colors.black,
        fontFamily:'Montserrat-SemiBold'
    }
})