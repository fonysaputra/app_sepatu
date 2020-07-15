import React, { Component } from "react";
import { View, Image } from "react-native";

import {
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Fab,
  Icon,
  Left,
  Body,
  Right
} from "native-base";

import getDirections from "react-native-google-maps-directions";
import { withNavigation } from "react-navigation";
import axios from "axios";
import Server from "../Server";

var lat_sekarang = "";
var lng_sekarang = "";
var Locale = require("react-native-locale");

var id_order = "";
function currencyFormat(num) {
  return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

class DetailPesananSolSepatu extends Component {
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
        Server + `api.php?operasi=show_detailhistoripesanan&data=${id_order}`
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
        this.props.navigation.navigate("MenuUtamaSolSepatu");
      });
  };

  konfirmasipesanan = () => {
    axios
      .get(Server + `api.php?operasi=konfirmasi_pesanan&data=${id_order}`)
      .then(() => {
        alert("Anda Telah Mengkonfirmasi Pesanan !!");
        this.props.navigation.navigate("MenuUtamaSolSepatu");
      });
  };

  handleGetDirections = () => {
    {
      this.state.dataPemesanan.map(data => {
        lat_sekarang = data.lat_user;
        lng_sekarang = data.lng_user;
        // alert(data.lng_user);
      });
    }
    navigator.geolocation.getCurrentPosition(position => {
      const data = {
        source: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        },
        destination: {
          latitude: parseFloat(lat_sekarang),
          longitude: parseFloat(lng_sekarang)
        },
        params: [
          {
            key: "travelmode",
            value: "driving" // may be "walking", "bicycling" or "transit" as well
          },
          {
            key: "dir_action",
            value: "navigate" // this instantly initializes navigation using the given travel mode
          }
        ]
      };
      getDirections(data);
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
                    <Body>
                      <Text style={{ textAlign: "center" }}>
                        Data Pelanggan
                      </Text>
                      <Text>{data.nama}</Text>
                      <Text note>{data.alamat}</Text>
                      <Text note>{data.no_telp}</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody>
                  <Image
                    source={{ uri: Server + "images/" + data.foto }}
                    style={{ height: 200, width: "100%", flex: 1 }}
                  />
                </CardItem>
                <CardItem>
                  <Text>Jasa : {data.jasa}</Text>
                </CardItem>
                <CardItem>
                  <Text>Include : {data.keterangan}</Text>
                </CardItem>
                <CardItem>
                  <Text
                    style={{
                      fontSize: 20,
                      textAlign: "center",
                      color: "red"
                    }}
                  >
                    Kategori Layanan : {data.status}
                  </Text>
                </CardItem>
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
                <CardItem>
                  <Left>
                    <Body>
                      <Button transparent>
                        <Text>
                          Biaya Jasa : Rp.{" "}
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
                          {currencyFormat(
                            parseInt(data.harga) +
                              parseInt(data.biaya_transportasi)
                          )}
                        </Text>
                      </Button>
                    </Body>
                  </Left>
                </CardItem>

                <CardItem>
                  <Left>
                    {data.status_pesanan === "Proses" && (
                      <Button onPress={this.konfirmasipesanan}>
                        <Text style={{ fontSize: 12 }}>Konfirmasi Pesanan</Text>
                      </Button>
                    )}

                    {data.status_pesanan === "Pesanan Di Konfirmasi" && (
                      <Text style={{ fontSize: 12 }}>
                        Pesanan Telah Di Konfirmasi
                      </Text>
                    )}
                  </Left>
                  <Right>
                    <Button info onPress={this.batalpesanan}>
                      <Text style={{ fontSize: 12 }}>Batalkan Pesanan</Text>
                    </Button>
                  </Right>
                </CardItem>
              </Card>
            );
          })}
        </Content>
        <Fab
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: "#fff" }}
          position="bottomRight"
          onPress={() => {
            this.handleGetDirections();
          }}
        >
          <Icon style={{ fontSize: 29, color: "#5067FF" }} name="md-map" />
        </Fab>
      </View>
    );
  }
}

export default withNavigation(DetailPesananSolSepatu);
