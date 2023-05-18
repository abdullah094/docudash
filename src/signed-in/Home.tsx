import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import Colors from "../styles/constants";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { DocumentNavigationProps } from "types";
const { width, height } = Dimensions.get("window");

const Home = () => {
  const navigation = useNavigation<DocumentNavigationProps<"DocumentHome">>();
  const [data, setData] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setData(true);
    }, 1500);
  }, []);

  if (!data) return <ActivityIndicator />;

  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={require("../../assets/northwest_background.jpg")}
      resizeMode="cover"
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 100,
          paddingTop: height / 3,
        }}
        // contentContainerStyle={{ alignSelf: "center", paddingBottom: 100 }}
        // contentContainerStyle={{ alignItems: "center", display: "flex" }}
        showsVerticalScrollIndicator={false}
        stickyHeaderHiddenOnScroll={true}
      >
        <Text
          numberOfLines={2}
          style={{
            color: Colors.white,
            paddingHorizontal: 10,
            fontSize: 28,
            textAlign: "center",
            marginTop: 100,
          }}
        >
          Notarize Instantly. Anywhere. Anytime..
        </Text>
        <Text
          style={{
            color: Colors.white,
            marginTop: 20,
            marginHorizontal: 10,
            textAlign: "center",
            fontSize: 17,
          }}
        >
          Your Digital End-to-End Solution For E-Documentation
        </Text>

        <TouchableOpacity
          onPress={() => navigation.replace("SignedIn")}
          style={{
            width: 250,
            borderWidth: 1,
            borderColor: Colors.white,
            justifyContent: "center",
            alignItems: "center",
            height: 60,
            marginTop: 40,
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              color: Colors.white,
              fontSize: 15,
              marginRight: 5,
            }}
          >
            Dash A Document
          </Text>

          <View style={{ top: 1 }}>
            <FontAwesome
              name="long-arrow-right"
              color={Colors.white}
              size={23}
            />
          </View>
        </TouchableOpacity>

        {/* Tabs */}
        <View
          style={{
            width: 290,
            height: 250,
            backgroundColor: Colors.white,
            borderRadius: 29,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 50,
          }}
        >
          <View style={{ paddingHorizontal: 40 }}>
            <Image
              style={{ width: 50, height: 50 }}
              source={require("../../assets/easy.png")}
            />

            <Text
              style={{
                fontSize: 20,
                color: Colors.black,
                marginTop: 10,
              }}
            >
              Easily Signed then Done
            </Text>
            <Text style={{ fontSize: 15, marginTop: 10 }}>
              Simply click and notarize your documents.
            </Text>
          </View>
        </View>

        <View
          style={{
            width: 290,
            height: 250,
            backgroundColor: Colors.white,
            borderRadius: 29,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          <View style={{ paddingHorizontal: 40 }}>
            <Image
              style={{ width: 50, height: 50 }}
              source={require("../../assets/idea.png")}
            />

            <Text
              style={{
                fontSize: 20,
                color: Colors.black,
                marginTop: 10,
              }}
            >
              Faster and smarter than ever
            </Text>
            <Text style={{ fontSize: 15, marginTop: 10 }}>
              AI integrated digital documentation and notarization.
            </Text>
          </View>
        </View>

        <View
          style={{
            width: 290,
            height: 250,
            backgroundColor: Colors.white,
            borderRadius: 29,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          <View style={{ paddingHorizontal: 40 }}>
            <Image
              style={{ width: 50, height: 50 }}
              source={require("../../assets/idea.png")}
            />

            <Text
              style={{
                fontSize: 20,
                color: Colors.black,
                marginTop: 10,
              }}
            >
              Secure & Compliant
            </Text>
            <Text style={{ fontSize: 15, marginTop: 10 }}>
              Digital encryption and multi-verification step process for secure
              documentation.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Home;

const styles = StyleSheet.create({});
