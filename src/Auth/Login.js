import React, { Component } from "react";
import { View, TextInput } from "react-native";
import PasswordInputText from "react-native-hide-show-password-input";

import Headers from "../Container/Headers";
import {
  Container,
  Content,
  Form,
  Item,
  Label,
  Input,
  Icon,
  Button,
  Text
} from "native-base";
import Server from "../Server";

import { NavigationActions } from "react-navigation";
import axios from "axios";

import { connect } from "react-redux";

import AsyncStorage from "@react-native-community/async-storage";
class Login extends Component {
  static navigationOptions = { header: null };

  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }

  _storeData = async data_local => {
    try {
      await AsyncStorage.setItem("id_user", JSON.stringify(data_local));
    } catch (error) {
      // Error saving data
    }
  };

  _storeDataLevel = async data_local => {
    try {
      await AsyncStorage.setItem("level", JSON.stringify(data_local));
    } catch (error) {
      // Error saving data
    }
  };
  bersih() {
    this.setState({
      username: "",
      password: ""
    });
  }

  login() {
    // this.props.navigation.navigate("MenuUtamaPelanggan", { status: 1 });
    axios
      .get(
        Server +
          `api.php?operasi=login&username=${this.state.username}&password=${this.state.password}`
      )
      .then(res => {
        if (res.data.length === 0) {
          alert("Maaf Username Atau Password Anda Salah");
          this.bersih();
        } else {
          var dataLevel = res.data;
          var level = "";
          var id = "";
          {
            dataLevel.map((data, key) => {
              console.log(data.level);
              level = data.level;
              id = data.id_admin;
            });
          }
          this.props.dispatch({
            type: "TES_ACTION",
            payload: id
          });
          if (level === "pelanggan") {
            this.props.navigation.navigate("MenuUtamaPelanggan", {
              level: level
            });
            this._storeData(id);
            this._storeDataLevel("pelanggan");
          } else if (level === "solsepatu") {
            this.props.navigation.navigate("MenuUtamaSolSepatu", {
              level: level
            });
            this._storeData(id);
            this._storeDataLevel("solsepatu");
          } else {
            alert("Akun Anda Belum Terdaftar");
          }
        }
      });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1.1 }}>
          <Content>
            <Headers menu="Login" men="Login" />
          </Content>
        </View>
        <Container style={{ flex: 2, marginTop: 10 }}>
          <Content>
            <Form>
              <Item floatingLabel>
                <Label>Username</Label>
                <Input
                  onChangeText={text => this.setState({ username: text })}
                  value={this.state.username}
                />
              </Item>
              <View style={{ marginLeft: 20 }}>
                <PasswordInputText
                  value={this.state.password}
                  onChangeText={password => this.setState({ password })}
                />
              </View>
            </Form>
            <View
              style={{
                marginTop: 50,
                flexDirection: "row",
                justifyContent: "center"
              }}
            >
              <Button
                onPress={this.login.bind(this)}
                success
                style={{ alignContent: "center", margin: 10 }}
              >
                <Text> Login </Text>
              </Button>
              <Button
                danger
                style={{ alignContent: "center", margin: 10 }}
                onPress={() => {
                  this.bersih();
                }}
              >
                <Text> Batal </Text>
              </Button>
            </View>
            <Text style={{ margin: 10, marginTop: 10, textAlign: "justify" }}>
              Silahkan Pilih Menu Registrasi Jika Belum Memiliki Hak Akses
            </Text>
          </Content>
        </Container>
      </View>
    );
  }
}
const mapsStateToProps = state => ({
  login: state.loginReducer
});

export default connect(mapsStateToProps)(Login);
