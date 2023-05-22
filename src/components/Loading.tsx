import { StyleSheet, Text, View ,Modal} from 'react-native'
import React from 'react'
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
  } from 'react-native-indicators';
import Colors from '../styles/constants'

const Loading = ({visible}) => {


  return (

     <BallIndicator color={Colors.green} />
  
  )
}

export default Loading

const styles = StyleSheet.create({
    lottie: {
        width: 100,
        height: 100
      }
})