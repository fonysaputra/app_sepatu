import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Image
} from "react-native";

import StarRating from "react-native-star-rating";

import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Icon,
  Body,
  Button,
  Thumbnail,
  Right,
  Item,
  Input
} from "native-base";

import axios from "axios";
import Server from "./Server";

import { withNavigation } from "react-navigation";

class SolSepatu extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      dataRating: []
    };
  }

  getDatarating = async data => {
    console.log("SolSepatu");
    await axios
      .get(Server + `api.php?operasi=show_rating&data=${data}`)
      .then(res => {
        this.setState({
          dataRating: res.data
        });
      });
  };

  async componentDidMount() {
    await this.getDatarating("");
  }

  render() {
    // if (this.state.dataRating.length === 0) {
    //   return (
    //     <View
    //       style={{
    //         flex: 1,
    //         alignItems: "center",
    //         marginTop: Dimensions.get("window").height / 3.5
    //       }}
    //     >
    //       <Text style={{ textAlign: "center" }}>Loading ... </Text>
    //
    //       <ActivityIndicator
    //         style={{ marginTop: 20 }}
    //         size="large"
    //         color="#0000ff"
    //       />
    //     </View>
    //   );
    // }

    return (
      <View style={{ flex: 1, top: -60, marginLeft: 20 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: "bold" }}>Sol Sepatu Terbaik </Text>
          <Content horizontal>
            {this.state.dataRating.map((data, key) => {
              var ratings = 0;
              if (data.jumlah_rating === null) {
                ratings = 0.0;
              } else {
                ratings = parseFloat(data.jumlah_rating);
              }
              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  key={key}
                  style={{ marginTop: 10, borderRadius: 5 }}
                  onPress={() => {
                    alert("Silahkan Login Terlebih Dahulu");
                    this.props.navigation.navigate("Login");
                  }}
                >
                  <View style={{ flex: 1, paddingRight: 15 }}>
                    <View>
                      <Image
                        style={{ height: 210, width: 210, borderRadius: 5 }}
                        source={{ uri: Server + "images/" + data.foto }}
                      />
                      <View
                        style={{
                          width: 210,
                          position: "absolute",
                          top: 190,
                          borderBottomLeftRadius: 5,
                          borderBottomRightRadius: 5,
                          backgroundColor: "blue"
                        }}
                      >
                        <Image
                          style={{
                            width: "100%",
                            height: "100%",
                            borderBottomLeftRadius: 5,
                            borderBottomRightRadius: 5
                          }}
                          source={{
                            uri:
                              "https://images.unsplash.com/photo-1557683311-eac922347aa1?ixlib=rb-1.2.1&auto=format&fit=crop&w=715&q=80"
                          }}
                        />
                        <View
                          style={{
                            width: 100,
                            top: -20,
                            alignSelf: "flex-end"
                          }}
                        >
                          <StarRating
                            disabled={true}
                            maxStars={5}
                            starSize={21}
                            fullStarColor={"orange"}
                            rating={ratings}
                          />
                        </View>
                      </View>
                    </View>
                    <View style={{ marginTop: 5 }}>
                      <Text style={{ width: 200 }}>{data.nama}</Text>
                      <Text note style={{ width: 200 }}>
                        {data.alamat}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </Content>
        </View>
      </View>
    );
  }
}
export default withNavigation(SolSepatu);
