import React, { Component } from "react";
import { Text, View } from "react-native";
import MenuUtama from "../MenuUtama";
import HeaderPelanggan from "./HeaderPelanggan";
import SolSepatu from "./SolSepatu";
import { Content, Container } from "native-base";
import RatingTerbaik from "./RatingTerbaik";
import axios from "axios";
import Server from "../Server";
var level = 0;

export default class MenuUtamaPelanggan extends Component {
  static navigationOptions = ({ navigation }) => {
    level = navigation.getParam("level");

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
  async componentDidMount() {
    await this.getDataratingTerbaik();
  }
  getDataratingTerbaik = async data => {
    await axios
      .get(Server + `api.php?operasi=show_rating_terbaik`)
      .then(res => {
        this.setState({
          dataRating: res.data
        });
      });
  };

  login() {
    this.props.navigation.navigate("MenuUtama");
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.7 }}>
          <HeaderPelanggan />
        </View>
        <View style={{ flex: 2.5 }}>
          <Container>
            <Content>
              <RatingTerbaik data={this.state.dataRating} />
              <SolSepatu />
            </Content>
          </Container>
        </View>
      </View>
    );
  }
}
