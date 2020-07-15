import React from "react";
import {
  View,
  StatusBar,
  ScrollView,
  Dimensions,
  Text,
  Image,
  StyleSheet,
  PermissionsAndroid
} from "react-native";
import StarRating from "react-native-star-rating";
import Server from "./Server";
function RatingTerbaik(props) {
  let dataRatings = props.data.length !== 0 ? props.data[0] : [];
  return (
    <View style={{ alignItems: "center", marginTop: 10 }}>
      <View
        style={{
          width: "100%",
          backgroundColor: "red",
          height: 140
        }}
      >
        <Image
          style={{ width: "100%", height: "100%" }}
          source={{
            uri:
              "https://images.unsplash.com/photo-1557683311-eac922347aa1?ixlib=rb-1.2.1&w=1000&q=80"
          }}
        />
        <Text
          style={{
            marginLeft: 20,
            color: "white",
            marginTop: 10,
            fontSize: 16,
            position: "absolute",
            zIndex: 3,
            fontWeight: "bold"
          }}
        >
          Rating Terbaik
        </Text>
      </View>

      <View style={styles.ContainerRating}>
        <View style={{ margin: 10, flexDirection: "row" }}>
          <Image
            style={styles.ImageContainer}
            source={{ uri: Server + "images/" + dataRatings.foto }}
          />
          <View style={styles.TextRating}>
            <View style={{ flex: 3 }}>
              <Text style={{ fontSize: 20, color: "black", width: '25%' }}>
                {dataRatings.nama}
              </Text>
              <Text style={{ width: '25%' }}>{dataRatings.alamat} </Text>
              <Text>{dataRatings.no_telp} </Text>
            </View>
            <View
              style={{
                flex: 0.1,
                width: "120%"
              }}
            >
              <View style={{ width: 100, alignSelf: "flex-start" }}>
                <StarRating
                  disabled={true}
                  maxStars={5}
                  starSize={21}
                  fullStarColor={"orange"}
                  rating={
                    dataRatings.length !== 0
                      ? parseFloat(dataRatings.jumlah_rating)
                      : 0
                  }
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  ImageContainer: {
    width: 150,
    height: 150,
    borderRadius: 20
  },
  TextRating: {
    margin: 10
  },
  ContainerRating: {
    width: "90%",

    top: "-25%",
    borderRadius: 20,
    backgroundColor: "white",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.84,

    elevation: 5
  }
});
export default RatingTerbaik;
