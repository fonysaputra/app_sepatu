import React, { Component } from "react";

import { View, Image } from "react-native";
import {
  CardItem,
  Card,
  Text,
  Left,
  Thumbnail,
  Body,
  Content
} from "native-base";

export default class Tentang extends Component {
  static navigationOptions = {
    title: "Tentang Aplikasi",
    headerStyle: {
      backgroundColor: "#fff",
      textAlign: "center"
    },
    headerTintColor: "#000",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Card>
          <CardItem>
            <Left>
              {/* <Thumbnail source={require("../assets/logo_tanaman.png")} /> */}
              <Text style={{ fontSize: 18, color: "#080908" }}>
               Aplikasi Pencarian Sol Sepatu
              </Text>
            </Left>
          </CardItem>
          <CardItem>
            <Left>
              <Text>Versi Aplikasi </Text>
            </Left>
            <Body>
              <Text>: V1.0 </Text>
            </Body>
          </CardItem>
          <CardItem>
            <Left>
              <Text>Nama Pengembang </Text>
            </Left>
            <Body>
              <Text>: Muhammad Denny Prayoga</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Left>
              <Text>Jurusan </Text>
            </Left>
            <Body>
              <Text>: S1 Sistem Informasi</Text>
            </Body>
          </CardItem>
        </Card>
        <View style={{ justifyContent: 'center',
    alignItems: 'center',marginTop:20}}>        
        <Image source={require("../assets/mitra.jpg")} style={{width:"50%"}} />
        </View>

      </View>
    );
  }
}
