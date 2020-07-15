import React, { Component } from "react";
import { View, Image, TouchableOpacity } from "react-native";

import {
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right
} from "native-base";

import { withNavigation } from "react-navigation";
import axios from "axios";
import Server from "../Server";
var id_order = "";

function currencyFormat(num) {
  return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

class DetailPesanan extends Component {
  static navigationOptions = ({ navigation }) => {
    id_order = navigation.getParam("id_order");
    return {
      title: "Detail Pesanan"
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      dataPemesanan: [],
      harga: 0,
      transportasi: 0,
      total: 0
    };
  }

  getData = () => {
    axios
      .get(
        Server +
          `api.php?operasi=show_detailhistoripesananpelanggan&data=${id_order}`
      )
      .then(respon => {
        this.setState({
          dataPemesanan: respon.data
        });
      });
  };

  batalpesanan = () => {
    axios
      .get(Server + `api.php?operasi=batalkan_pesanan&data=${id_order}`)
      .then(() => {
        alert("Pesanan Anda Telah Di Batalkan !!");
        this.props.navigation.navigate("MenuUtamaPelanggan");
      });
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Content>
          {this.state.dataPemesanan.map((data, key) => {
            return (
              <Card key={key}>
                <CardItem>
                  <Left>
                    <Thumbnail
                      source={{ uri: Server + "images/" + data.foto }}
                    />
                    <Body>
                      <Text>{data.nama}</Text>
                      <Text note>{data.alamat}</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody>
                  <Image
                    source={{ uri: Server + "images/" + data.foto_jenis }}
                    style={{ height: 200, width: "100%", flex: 1 }}
                  />
                </CardItem>
                <CardItem>
                  <Text>Jasa : {data.jasa}</Text>
                </CardItem>
                <CardItem>
                  <Text>Include : {data.keterangan}</Text>
                </CardItem>
                <View
                  style={{
                    marginTop: 10,
                    marginHorizontal: 15,
                    backgroundColor: "#949494",
                    height: 1
                  }}
                />
                <CardItem>
                  <Left>
                    <Button transparent>
                      <Icon active name="calendar" />
                      <Text>{data.tanggal}</Text>
                    </Button>
                  </Left>

                  <Right>
                    <Text>{data.jam}</Text>
                  </Right>
                </CardItem>

                <View
                  style={{
                    marginTop: 10,
                    marginHorizontal: 15,
                    backgroundColor: "#949494",
                    height: 1
                  }}
                />

                <CardItem>
                  <Body>
                    <Button transparent>
                      <Text>
                        Biaya Makeup : Rp.{" "}
                        {currencyFormat(parseInt(data.harga))}
                      </Text>
                    </Button>
                    <Button transparent>
                      <Text>
                        Biaya Transportasi : Rp.{" "}
                        {currencyFormat(parseInt(data.biaya_transportasi))}
                      </Text>
                    </Button>
                    <Button transparent>
                      <Text>
                        Total Biaya : Rp.{" "}
                        {currencyFormat(parseInt(data.jml_harga))}
                      </Text>
                    </Button>
                  </Body>
                </CardItem>

                <View
                  style={{
                    marginTop: 10,
                    marginHorizontal: 15,
                    backgroundColor: "#949494",
                    height: 1
                  }}
                />

                <CardItem style={{ flex: 1 }}>
                  {data.status_pesanan === "Pesanan Di Konfirmasi" && (
                    <View style={{ alignItems: "center", width: "100%" }}>
                      <Text style={{ fontSize: 16, color: "red" }}>
                        Pesanan Anda Telah Di Konfirmasi
                      </Text>
                      <TouchableOpacity
                        style={{
                          backgroundColor: "#0789d2",
                          padding: 20,
                          margin: 10,
                          borderRadius: 10
                        }}
                        onPress={() => {
                          this.props.navigation.navigate("FotoMakeup", {
                            id_solsepatu: data.id_solsepatu,
                            nama: data.nama
                          });
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 16,
                            color: "white",
                            textAlign: "center"
                          }}
                        >
                          Foto Hasil Makeup
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  {data.status_pesanan === "Proses" && (
                    <Button info onPress={this.batalpesanan}>
                      <Text>Batalkan Pesanan</Text>
                    </Button>
                  )}
                </CardItem>
              </Card>
            );
          })}
        </Content>
      </View>
    );
  }
}

export default withNavigation(DetailPesanan);
