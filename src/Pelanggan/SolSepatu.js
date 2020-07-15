import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Content, Container, Item, Input, Icon } from "native-base";

import { withNavigation } from "react-navigation";
import axios from "axios";
import Server from "../Server";
import StarRating from "react-native-star-rating";
class SolSepatu extends Component {
  constructor() {
    super();
    this.state = {
      datasolsepatu: []
    };
  }

  getDatasolsepatu = async data => {
    await axios
      .get(Server + `api.php?operasi=show_rating&data=${data}`)
      .then(res => {
        this.setState({
          datasolsepatu: res.data
        });
      });
  };

  async componentDidMount() {
    await this.getDatasolsepatu("");
  }

  render() {
    return (
      <View style={{ flex: 1, top: -50, marginLeft: 20 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: "bold", fontSize: 20, color: "black" }}>
            Sol Sepatu Pilihan
          </Text>
          <Text>Pilih Foto Untuk Memesan </Text>
          <Content horizontal>
            {this.state.datasolsepatu.map((data, key) => {
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
                    this.props.navigation.navigate("Detailsolsepatu", {
                      id_solsepatu: data.id_solsepatu,
                      nama: data.nama,
                      alamat: data.alamat,
                      foto: data.foto,

                      no_telp: data.no_telp
                    });
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
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "bold",
                          color: "black",
                          width: 200
                        }}
                      >
                        {data.nama}
                      </Text>
                      <Text note style={{ width: 200 }}>
                        {data.alamat}
                      </Text>
                      <Text note>{data.no_telp}</Text>
                    </View>
                    <View
                      style={{
                        alignSelf: "flex-start",
                        marginTop: 15,

                        backgroundColor: "#33b1ee",
                        borderRadius: 10
                      }}
                    >
                      <Text style={{ padding: 10, color: "white" }}>
                        Pesan Sekarang
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  buttom: {
    height: "100%",
    backgroundColor: "#ffffff",
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 5
  },
  buttomItem: {
    padding: 20,
    width: "50%"
  },
  buttomItemIner: {
    flex: 1,
    alignItems: "center",
    width: 100
  },
  image: {
    height: 100,
    borderRadius: 20,

    width: 100
  }
});
