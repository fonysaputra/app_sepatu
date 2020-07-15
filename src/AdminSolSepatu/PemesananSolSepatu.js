import React, { Component } from "react";

import { View } from "react-native";

import {
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  Button
} from "native-base";

import HeaderSolSepatu from "./HeaderSolSepatu";
import { connect } from "react-redux";
import axios from "axios";
import Server from "../Server";

class PemesananSolSepatu extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      Data: []
    };
  }

  getData = () => {
    axios
      .get(
        Server +
          `api.php?operasi=pemesanan_solsepatu&data=${this.props.id_admin.id_admin}`
      )
      .then(respon => {
        console.log(respon.data);
        this.setState({
          Data: respon.data
        });
      });
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    if (this.state.Data.length === 0) {
      return (
        <View style={{ flex: 1 }}>
          <View style={{ flex: 0.5 }}>
            <HeaderSolSepatu />
          </View>
          <View style={{ flex: 3, textAlign: "center" }}>
            <Text>Tidak Ada Pesanan Masuk</Text>
          </View>
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.5 }}>
          <HeaderSolSepatu />
        </View>
        <View style={{ flex: 3 }}>
          <Text style={{ margin: 7, textAlign: "center" }}>Pesanan Masuk</Text>
          <Content>
            {this.state.Data.map((data, key) => {
              return (
                <List key={key}>
                  <ListItem avatar>
                    <Left>
                      <Thumbnail
                        source={{ uri: Server + "images/" + data.foto }}
                      />
                    </Left>
                    <Body>
                      <Text>{data.nama}</Text>
                      <Text note>{data.alamat}</Text>
                    </Body>
                    <Right>
                      <Button
                        transparent
                        onPress={() => {
                          this.props.navigation.navigate(
                            "DetailPemesananSolSepatu",
                            {
                              id_order: data.id_order
                            }
                          );
                        }}
                      >
                        <Text style={{ color: "#000" }}>Detail</Text>
                      </Button>
                    </Right>
                  </ListItem>
                </List>
              );
            })}
          </Content>
        </View>
      </View>
    );
  }
}

mapStateToProps = state => {
  return {
    id_admin: state.loginReducer
  };
};

export default connect(mapStateToProps)(PemesananSolSepatu);
