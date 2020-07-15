import React, { Component } from "react";
import { View, Image } from "react-native";
import {
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Item,
  Input,
  DatePicker,
  Body
} from "native-base";

import { connect } from "react-redux";

var id_jasa = "";
var jasa = "";
var harga = "";
var foto = "";
import axios from "axios";

class Pesan extends Component {
  static navigationOptions = ({ navigation }) => {
    id_jasa = navigation.getParam("id_jasa");
    jasa = navigation.getParam("jasa");
    harga = navigation.getParam("harga");
    foto = navigation.getParam("foto");

    return {
      title: jasa
    };
  };
  constructor(props) {
    super(props);
    this.state = { chosenDate: new Date(), keterangan: "" };
    this.setDate = this.setDate.bind(this);
  }
  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }

  inputPesanan() {
    axios
      .get(
        Server +
          `api.php?operasi=input_order&tanggal=${this.state.chosenDate
            .toString()
            .substr(4, 12)}&id_jenisjasa=${id_jasa}
        &id_pendaftar=${
          this.props.id_admin.id_admin
        }&harga=${harga}&keterangan=${this.state.keterangan}`
      )
      .then(() => {
        this.bersih.bind(this);
        alert("Berhasil Order");
        this.props.navigation.navigate("MenuUtamaPelanggan");
      });
  }

  bersih() {
    this.setState({
      chosenDate: new Date(),
      keterangan: ""
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Content>
          <Card style={{ flex: 0 }}>
            <CardItem>
              <Left>
                <Body>
                  <Text>{jasa}</Text>
                  <Text note>{harga}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image
                style={{ height: 200, width: null, flex: 1 }}
                source={{ uri: Server + "images/" + foto }}
              />
            </CardItem>
          </Card>
          <View style={{ marginLeft: 20, marginTop: 20, marginRight: 20 }}>
            <DatePicker
              locale={"en"}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={"fade"}
              androidMode={"default"}
              placeHolderText="Pilih Tanggal"
              textStyle={{ color: "green" }}
              placeHolderTextStyle={{ color: "#d3d3d3" }}
              onDateChange={this.setDate}
              disabled={false}
            />
            <Text
              style={{ textAlign: "center", marginTop: 10, marginBottom: 10 }}
            >
              Tanggal: {this.state.chosenDate.toString().substr(4, 12)}
            </Text>
            <Item success style={{ marginTop: 10 }}>
              <Input
                placeholder="Keterangan"
                onChangeText={e => {
                  this.setState({ keterangan: e });
                }}
              />
              <Icon name="checkmark-circle" />
            </Item>
            <Button
              full
              info
              style={{ marginTop: 10 }}
              onPress={this.inputPesanan.bind(this)}
            >
              <Text>Pesan Sekarang</Text>
            </Button>
          </View>
        </Content>
      </View>
    );
  }
}

mapStateToProps = state => {
  return {
    id_admin: state.loginReducer
  };
};
export default connect(mapStateToProps)(Pesan);
