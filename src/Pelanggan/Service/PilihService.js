import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";

import HeaderPelanggan from "../HeaderPelanggan";

import {
  Container,
  Header,
  Content,
  Card,
  Item,
  Text,
  Icon,
  Input,
  Button,
  Thumbnail,
  Right
} from "native-base";

import DatePicker from "react-native-datepicker";

var statuss = 0;
export default class PilihService extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };
  constructor(props) {
    super(props);
    //set value in state for initial date
    this.state = { date: "" };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <HeaderPelanggan />
        </View>
        <View style={{ flex: 2 }}>
          <Text style={{ margin: 10 }}>-</Text>
          <Content>
            <Item rounded style={{ margin: 5 }}>
              <DatePicker
                style={{ width: 200 }}
                date={this.state.date} //initial date from state
                mode="date" //The enum of date, datetime and time
                placeholder="Pilih Tanggal"
                format="DD-MM-YYYY"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: "absolute",
                    left: 0,
                    top: 4,
                    marginLeft: 10
                  },
                  dateInput: {
                    marginLeft: 46
                  }
                }}
                onDateChange={date => {
                  this.setState({ date: date });
                }}
              />
            </Item>
            <Item rounded style={{ margin: 5 }}>
              <Input placeholder="Jenis Service" />
            </Item>
            <Item rounded style={{ margin: 5 }}>
              <Input placeholder="Keterangan" />
            </Item>
            <Item rounded style={{ margin: 5 }}>
              <Input placeholder="Nama Kurir" />
            </Item>
            <TouchableOpacity>
              <View
                style={{
                  marginLeft: 10,
                  marginTop: 20,

                  color: "rgba(#576f14, 0.75)"
                }}
              >
                <Text
                  style={{
                    backgroundColor: "#10bb98",
                    textAlign: "center",
                    color: "#ffffff",
                    width: 90,
                    height: 30,
                    marginTop: 20,
                    borderRadius: 40
                  }}
                >
                  Simpan
                </Text>
              </View>
            </TouchableOpacity>
          </Content>
        </View>
      </View>
    );
  }
}
