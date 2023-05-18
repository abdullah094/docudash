import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Pressable,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import Colors from "../styles/constants";
import Entypo from "@expo/vector-icons/Entypo";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";

const { width, height } = Dimensions.get("window");
const SearchScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([
    {
      name: "John Smith",
      long: 29.767905740114198,
      lat: -95.38760462226578,
    },
    {
      name: "Ronald Trump",
      long: 32.9147414757172,
      lat: -96.81874796355638,
    },
    {
      name: "Pam Haris ",
      long: 35.66397934278645,
      lat: -97.25616510856683,
    },
    {
      name: "Sam Jackson",
      long: 31.7092934970654,
      lat: -106.51799770074491,
    },
    {
      name: "Carl Lin",
      long: 34.540631573453595,
      lat: -112.45411135435738,
    },
    {
      name: "Ryan Garcia",
      long: 33.82319571367672,
      lat: -117.29427532923128,
    },
    {
      name: "Anthony Willis",
      long: 33.6650549474976,
      lat: -118.34027284990849,
    },
    {
      name: "John Baker",
      long: 35.573579510120474,
      lat: -119.36596301579252,
    },
    {
      name: "Pablo Escobar",
      long: 36.59456517622611,
      lat: -119.76577009102057,
    },
    {
      name: "Chris Harlow",
      long: 37.94290351628866,
      lat: -121.93263970486137,
    },
    {
      name: "Larry David",
      long: 40.86482410985208,
      lat: -111.82933757486093,
    },
    {
      name: "Samuel Gray",
      long: 39.11838789095806,
      lat: -111.78446074738399,
    },
    {
      name: "Eric Baldwin",
      long: 39.92879009656849,
      lat: -105.15185104627469,
    },
    {
      name: "Alex Hales",
      long: 38.57020138088908,
      lat: -98.56128883581285,
    },
    {
      name: "Will Smith",
      long: 38.78906278338124,
      lat: -91.98871703928253,
    },
    {
      name: "Mark Wallberg",
      long: 36.38740490944467,
      lat: -87.46312377522995,
    },
    {
      name: "Billy Joel",
      long: 40.23822092797367,
      lat: -77.42996937877831,
    },
    {
      name: "Chris Prat",
      long: 41.27309587344869,
      lat: -73.92903890852712,
    },
    {
      name: "Brad Pit",
      long: 44.402723530459895,
      lat: -72.56282200649514,
    },
    {
      name: "Bradly Martin",
      long: 45.19041175073521,
      lat: -93.05607366668089,
    },
    {
      name: "Bobby Lee",
      long: 47.228703515754624,
      lat: -100.5275716214853,
    },
    {
      name: "Andrew Santino",
      long: 46.96712808579498,
      lat: -109.79222939784121,
    },
    {
      name: "Gary Dave",
      long: 47.91996065270785,
      lat: -122.51512334481447,
    },
  ]);

  const mapViewRef = useRef(null);
  const [headerHide, setHeaderHide] = useState(false);
  const [newRegion, setNewRegion] = useState({
    latitude: 29.76604135560118,
    longitude: -95.37322578574559,
    latitudeDelta: 0.95,
    longitudeDelta: 0.21,
  });

  // console.log(newRegion)
  // useEffect(()=>{
  //   console.log("useeffect")
  //   mapViewRef.current.animateToRegion( newRegion, 2000)
  // },[newRegion])

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        {/* Header */}
        <View
          style={[
            {
              paddingVertical: 20,
              zIndex: 999,
              width: width,
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              backgroundColor: Colors.green,
              flexGrow: 1,
              top: 0,
            },
          ]}
        >
          {/* Location show */}
          <View style={{ width: "90%" }}>
            <View style={tw`flex-row items-center`}>
              <EvilIcons name="location" size={35} color={Colors.white} />

              <Text
                style={{
                  color: Colors.white,
                  fontSize: 25,
                }}
                numberOfLines={1}
              >
                Your Nearest Notaries
              </Text>
            </View>

            {/* <TextInput style={{backgroundColor:Colors.white,paddingHorizontal:10,marginTop:10,fontSize:10,color:Colors.black}}>
           
        
          </TextInput> */}
            {/* <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            > */}
            <GooglePlacesAutocomplete
              placeholder="Search for Notaries based in your city"
              styles={{
                predefinedPlacesDescription: {
                  color: "blue",
                },
                textInput: {
                  height: 38,
                  color: Colors.black,
                  fontSize: 15,
                },
                listView: {
                  backgroundColor: Colors.green,
                },
              }}
              debounce={400}
              GooglePlacesDetailsQuery={{ fields: "geometry" }}
              fetchDetails={true}
              renderRow={(rowData) => {
                const title = rowData.structured_formatting.main_text;
                const address = rowData.structured_formatting.secondary_text;
                return (
                  <View style={{ height: 18 }}>
                    <Text style={{ fontSize: 13, color: Colors.black }}>
                      {title} {address}
                    </Text>
                  </View>
                );
              }}
              onPress={async (data, details = null) => {
                mapViewRef.current.animateToRegion(
                  {
                    latitude: details?.geometry?.location.lat,
                    longitude: details?.geometry?.location.lng,
                    latitudeDelta: 0.95,
                    longitudeDelta: 0.21,
                  },
                  2500
                );
                // 'details' is provided when fetchDetails = true
              }}
              query={{
                key: GOOGLE_MAPS_APIKEY,
                language: "en",
                components: "country:us",
              }}
            />
            {/* <Pressable>
          <EvilIcons name='close-o' size={35} color={Colors.white}/>
          </Pressable> */}
            {/* </View> */}
          </View>
        </View>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
            setHeaderHide(!headerHide);
          }}
        >
          <MapView
            ref={mapViewRef}
            // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            initialRegion={{
              latitude: 39.888879616869225,
              longitude: -103.22565256284255,
              latitudeDelta: 50.95,
              longitudeDelta: 35.21,
            }}
          >
            {data.map((element) => {
              return (
                <Marker
                  key={element.lat}
                  onCalloutPress={() =>
                    navigation.navigate("Details", { name: element.name })
                  }
                  title={element.name}
                  pinColor={Colors.darkgreen}
                  description={"Click to go to Profile"}
                  coordinate={{
                    latitude: element.long,
                    longitude: element.lat,
                  }}
                >
                  <Image
                    style={{ width: 50, height: 60 }}
                    source={require("../assets/pin.png")}
                  />
                </Marker>
              );
            })}
          </MapView>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
