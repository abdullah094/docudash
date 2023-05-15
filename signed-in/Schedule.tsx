import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Alert
} from 'react-native';
import React, {useState} from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import Colors from '../styles/constants';
import {useNavigation} from '@react-navigation/core'


const {width, height} = Dimensions.get('window');
const Schedule = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState();
  const [color, setColor] = useState('');

  const ExtractMonthString = (day) => {
    let dayString;
    switch (day) {
      case 1:
        dayString = 'January';
        break;
      case 2:
        dayString = 'Feburary';
        break;
      case 3:
        dayString = 'March';
        break;
      case 4:
        dayString = 'April';
        break;
      case 5:
        dayString = 'May';
        break;
      case 6:
        dayString = 'June';
        break;
      case 7:
        dayString = 'July';
        break;
      case 8:
        dayString = 'August';
        break;
      case 9:
        dayString = 'September';
        break;
      case 10:
        dayString = 'October';
        break;
      case 11:
        dayString = 'November';
        break;
        case 12:
        dayString = 'December';
        break;
    }
    return dayString
  };

  return (
    <ScrollView
      contentContainerStyle={{alignItems: 'center', paddingBottom: 100}}>
      
      <Text
        style={{
          color: Colors.black,
          fontFamily: 'Montserrat-SemiBold',
          marginTop: 20,
          fontSize: 20,
          textAlign: 'center',
          marginHorizontal: 25,
        }}>
        Select an available date, 
convenient for you
      </Text>
      <Calendar
        style={{
          height: 350,
          marginTop: 40,
          width: width,
        }}
        markedDates={{
          [color]: {
            selected: true,
            disableTouchEvent: true,
            selectedDotColor: 'orange',
            selectedColor: Colors.green,
          },
          '2023-05-16': {disabled: true},
          '2023-05-20': {disabled: true},
          '2023-05-21': {disabled: true},
          '2023-06-16': {disabled: true},
          '2023-05-25': {disabled: true},
          '2023-05-29': {disabled: true},

          '2012-05-18': {disabled: true},
        }}
        onDayPress={day => {
          console.log({day});
          setSelected(`${ExtractMonthString(day.month)}/${day.day}/${day.year}`);
          setColor(day.dateString);
        }}
      />
      <Text
        style={{
          color: Colors.black,
          fontFamily: 'Montserrat',
          marginTop: 20,
          fontSize: 20,
        }}>
        {selected}
      </Text>
      <TouchableOpacity
        onPress={() => selected? navigation.navigate('ScheduleForm', {date: selected}):
        Alert.alert('Please select a date')
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
          Select
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Schedule;

const styles = StyleSheet.create({});
