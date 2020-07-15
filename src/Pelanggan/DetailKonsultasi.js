import React, { Component } from "react";
import { View, TextInput, TouchableOpacity, Dimensions } from "react-native";
import {
  Card,
  CardItem,
  Left,
  Thumbnail,
  Body,
  Content,
  ListItem,
  List,
  Right,
  Text
} from "native-base";
export default class DetailKonsultasi extends Component {
  static navigationOptions = { title: "Detail Konsultasi" };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Card>
          <CardItem>
            <Left>
              <Thumbnail source={require("../../assets/info.png")} />
              <Body>
                <Text>Griya Komputer</Text>
                <Text note>Jl.Ikan Bawal No.30</Text>
              </Body>
            </Left>
          </CardItem>
        </Card>
        <Content>
          <List style={{ marginTop: 20, marginRight: 90 }}>
            <ListItem avatar>
              <Body>
                <Text note>Hay</Text>
                <Text note style={{ color: "#ed0000" }}>
                  3:43
                </Text>
              </Body>
            </ListItem>
          </List>
          <List style={{ marginTop: 20, marginLeft: 90 }}>
            <ListItem avatar>
              <Body>
                <Text note>Iya Ada Yang Bisa Di Bantu</Text>
                <Text note style={{ color: "#ed0000" }}>
                  3:43
                </Text>
              </Body>
            </ListItem>
          </List>
        </Content>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            style={{ width: Dimensions.get("window").width - 100 }}
            placeholder="Masukkan Pesan"
          />
          <TouchableOpacity style={{ marginTop: 15 }}>
            <Text>Kirim Pesan</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
