import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Colors from "../styles/constants";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import StarRating from "react-native-star-rating-widget";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Foundation from "@expo/vector-icons/Foundation";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const Details = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { name } = route.params;
  const [seeMore, setSeeMore] = useState(false);
  const [rating, setRating] = useState(0);
  let numberOfLines = 2;
  let seeMoreText = "See more";
  if (seeMore) {
    numberOfLines = 100;
    seeMoreText = "See less";
  } else {
    numberOfLines = 2;
    seeMoreText = "See more";
  }
  console.log(name);
  const image_dimension = 100;
  const args = {
    number: "", // String value with the number to call
    prompt: false, // Optional boolean property. Determines if the user should be prompted prior to the call
    skipCanOpen: true, // Skip the canOpenURL check
  };
  return (
    <ScrollView
      contentContainerStyle={{ alignItems: "center", paddingBottom: 100 }}
    >
      <View style={styles.header}>
        <Pressable
          style={{ position: "absolute", left: 10, top: 20, padding: 10 }}
          onPress={() => navigation.goBack()}
        >
          <EvilIcons name={"arrow-left"} size={35} color={Colors.white} />
        </Pressable>
        <Image
          style={{
            height: image_dimension,
            width: image_dimension,
            borderRadius: image_dimension / 2,
            marginTop: 60,
          }}
          source={{
            uri: "https://randomuser.me/api/portraits/thumb/men/75.jpg",
          }}
        />
        <Text style={[styles.heading, { fontSize: 20 }]}>{name}</Text>
        <Text style={styles.heading}>wizardinnovations@gmail.com</Text>
        <Text style={styles.heading}>+1-123456789</Text>
        <View style={{ marginTop: 5 }}>
          <StarRating
            disabled={false}
            maxStars={5}
            rating={4.5}
            starSize={20}
            starStyle={{ color: Colors.golden }}
          />
        </View>
      </View>
      <View
        style={{
          width: width - 80,
          paddingVertical: 30,
          backgroundColor: Colors.white,
          top: -100,
          borderRadius: 10,
        }}
      >
        <View
          style={{
            width: "100%",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
            paddingHorizontal: 30,
          }}
        >
          <Text
            style={{
              color: "gray",
              width: "95%",
            }}
          >
            “In my experience DocuDash has a smooth and transparent process for
            documentation, as all information gathered and shared is presented
            in a user-friendly way and security technicalities are explained
            properly before moving forward.”
          </Text>
        </View>
      </View>
      {/* Content */}
      <View
        style={{
          width: width - 30,
          backgroundColor: Colors.white,
          paddingVertical: 20,
          top: -50,
          borderRadius: 10,
          paddingHorizontal: 10,
        }}
      >
        <View style={styles.box}>
          <View style={styles.tiny_box}>
            <FontAwesome name={"star"} color={Colors.golden} size={10} />
            <Text style={styles.tiny_box_text}>Top Pro</Text>
          </View>
          <View style={[styles.tiny_box, { backgroundColor: "lightgreen" }]}>
            <Text style={styles.tiny_box_text}>
              Exceptional Service 4.5{" "}
              <FontAwesome name={"star"} color={"gray"} size={13} /> (146)
            </Text>
          </View>
        </View>
        <Text style={{ color: Colors.gray, marginTop: 5 }}>
          Typically responds in about 8 minutes
        </Text>
        <TouchableOpacity
          style={[
            styles.box,
            {
              backgroundColor: Colors.blue,
              justifyContent: "center",
              alignItems: "center",
              padding: 5,
              borderRadius: 10,
              marginTop: 10,
            },
          ]}
        >
          <Text style={[styles.heading, { marginTop: 0 }]}>View Pricing</Text>
        </TouchableOpacity>
        {/* About this Notary */}
        <View style={styles.content_box}>
          <Text style={styles.content_heading}>About This Notary</Text>
          <Text style={{ color: "gray" }} numberOfLines={numberOfLines}>
            Philip Morris is a highly skilled notary who has been serving his
            community for over a decade. He is known for his exceptional
            attention to detail and his ability to authenticate legal documents
            with precision and accuracy. Philip is a consummate professional who
            takes great pride in his work. He has a thorough understanding of
            the legal system and stays up-to-date on the latest laws and
            regulations to provide his clients with the best possible service.
            In addition to his notary services, Philip is also a seasoned legal
            consultant who can provide guidance and advice on a wide range of
            legal matters. He has a reputation for being trustworthy and
            reliable, and he always puts his clients' needs first. Whether you
            need to certify a simple document or require more complex legal
            services, Philip Morris is the notary you can count on for
            professional and personalized service.
          </Text>
          <Pressable
            style={{ padding: 3 }}
            onPress={() => setSeeMore(!seeMore)}
          >
            <Text style={{ color: Colors.gray }}>{seeMoreText}</Text>
          </Pressable>
        </View>
        {/* OverView */}
        <View style={styles.content_box}>
          <Text style={styles.content_heading}>Overview</Text>
          <View style={styles.overview_bullet}>
            <Ionicons name="md-trophy-outline" color={Colors.black} size={16} />
            <Text style={styles.bullet_text}>Hired 251 times</Text>
          </View>
          <View style={styles.overview_bullet}>
            <Ionicons name="location" color={Colors.black} size={16} />
            <Text style={styles.bullet_text}>Serves Houston, TX</Text>
          </View>

          <View style={styles.overview_bullet}>
            <Ionicons name="md-person-add" color={Colors.black} size={16} />
            <Text style={styles.bullet_text}>Background Check</Text>
          </View>
          <View style={styles.overview_bullet}>
            <Ionicons name="people" color={Colors.black} size={15} />
            <Text style={styles.bullet_text}>2 employess</Text>
          </View>
          <View style={styles.overview_bullet}>
            <Ionicons name="alarm-outline" color={Colors.black} size={15} />
            <Text style={styles.bullet_text}>4 years in business</Text>
          </View>
        </View>
        {/* Top Pro */}
        <View style={styles.content_box}>
          <Text style={styles.content_heading}>Top Pro Status</Text>
          <Text style={{ color: "gray" }}>
            Top Pros are among the highest-rated, most popular professionals on
            Docudash
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <View style={styles.badge_box}>
              <Image
                style={styles.badge_image}
                source={require("../assets/badge.png")}
              />
              <Text style={styles.badge_box_text}>2021</Text>
            </View>
            <View style={styles.badge_box}>
              <Image
                style={styles.badge_image}
                source={require("../assets/badge.png")}
              />
              <Text style={styles.badge_box_text}>2022</Text>
            </View>
          </View>
        </View>
        {/* contact */}
        <View style={styles.content_box}>
          <Text style={styles.content_heading}>Contact</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
              marginTop: 10,
            }}
          >
            <TouchableOpacity style={styles.contact_button}>
              <Text style={styles.contact_button_text}>Text</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contact_button}>
              <Text style={styles.contact_button_text}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.contact_button}
              onPress={() =>
                navigation.navigate("Calling", { user:{
                  "user_id": "3",
                  "user_name": "testapp",
                  "user_display_name": "Test User"
                } })
              }
            >
              <Text
                style={[styles.contact_button_text, { textAlign: "center" }]}
              >
                Video call
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.content_box}>
          <View style={{ alignItems: "center", marginVertical: 5 }}>
            <Text style={{ color: "gray" }}>or</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Schedule")}
            style={{
              backgroundColor: Colors.blue,
              paddingVertical: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: Colors.white }}>
              Schedule a meeting in person
            </Text>
          </TouchableOpacity>
        </View>
        {/* Reviews */}
        <View style={styles.content_box}>
          <Text style={styles.content_heading}>Reviews:</Text>

          {/* Review Box */}
          <View style={{ paddingVertical: 15 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  height: "90%",
                }}
              >
                <Image
                  style={{ width: 50, height: 50, borderRadius: 25 }}
                  source={{
                    uri: "https://randomuser.me/api/portraits/thumb/men/75.jpg",
                  }}
                />
                <View style={{ marginLeft: 5, height: "90%" }}>
                  <Text
                    style={[
                      {
                        marginVertical: 1,
                        color: Colors.black,
                      },
                    ]}
                  >
                    Rene jackson
                  </Text>
                  <StarRating
                    starSize={17}
                    rating={rating}
                    onChange={setRating}
                  />
                </View>
              </View>
              <Text>4/10/2022</Text>
            </View>
            <Text style={{ color: "gray", marginTop: 5 }}>
              Philip is a consummate professional who takes great pride in his
              work. He has a thorough understanding of the legal system and
              stays up-to-date on the latest laws and regulations to provide his
              clients with the best possible service.
            </Text>
          </View>

          {/* 2nd review */}

          <View style={{ paddingVertical: 15 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  height: "90%",
                }}
              >
                <Image
                  style={{ width: 50, height: 50, borderRadius: 25 }}
                  source={{
                    uri: "https://randomuser.me/api/portraits/thumb/men/75.jpg",
                  }}
                />
                <View style={{ marginLeft: 5, height: "90%" }}>
                  <Text
                    style={[
                      {
                        marginVertical: 1,
                        color: Colors.black,
                      },
                    ]}
                  >
                    Emily Wilis
                  </Text>
                  <StarRating
                    starSize={17}
                    rating={rating}
                    onChange={setRating}
                  />
                </View>
              </View>
              <Text>13/1/2022</Text>
            </View>
            <Text style={{ color: "gray", marginTop: 5 }}>
              Whether you need to certify a simple document or require more
              complex legal services, Philip Morris is the notary you can count
              on for professional and personalized service.
            </Text>
          </View>

          {/* 3rd Review */}

          <View style={{ paddingVertical: 15 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  height: "90%",
                }}
              >
                <Image
                  style={{ width: 50, height: 50, borderRadius: 25 }}
                  source={{
                    uri: "https://randomuser.me/api/portraits/thumb/men/75.jpg",
                  }}
                />
                <View style={{ marginLeft: 5, height: "90%" }}>
                  <Text
                    style={[
                      {
                        marginVertical: 1,
                        color: Colors.black,
                      },
                    ]}
                  >
                    Cara Belwater
                  </Text>
                  <StarRating
                    starSize={17}
                    rating={rating}
                    onChange={setRating}
                  />
                </View>
              </View>
              <Text>28/1/2023</Text>
            </View>
            <Text style={{ color: "gray", marginTop: 5 }}>
              {" "}
              Philip is also a seasoned legal consultant who can provide
              guidance and advice on a wide range of legal matters. He has a
              reputation for being trustworthy and reliable, and he always puts
              his clients' needs first.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Details;

const styles = StyleSheet.create({
  header: {
    height: 400,
    backgroundColor: Colors.green,
    borderBottomEndRadius: 60,
    borderBottomStartRadius: 60,
    alignItems: "center",
    width: width,
  },
  heading: {
    color: Colors.white,
    marginTop: 5,
  },
  tiny_box: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "lightblue",
    paddingHorizontal: 10,
    justifyContent: "space-evenly",
    borderRadius: 10,
    padding: 5,
    margin: 5,
  },
  tiny_box_text: { color: "gray", marginLeft: 2 },
  box: { flexDirection: "row", alignItems: "center", marginTop: 5 },
  content_heading: {
    color: Colors.black,
    fontSize: 15,
    marginVertical: 5,
  },
  content_box: { marginTop: 15 },
  overview_bullet: { flexDirection: "row", alignItems: "center", marginTop: 5 },
  bullet_text: {
    marginLeft: 10,
    color: Colors.black,
  },
  badge_box: { alignItems: "center", marginLeft: 10 },
  badge_image: { width: 50, height: 50 },
  badge_box_text: { color: Colors.black, marginTop: 5 },
  contact_button: {
    borderWidth: 2,
    width: "30%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.blue,
  },
  contact_button_text: {
    color: Colors.blue,
  },
});
