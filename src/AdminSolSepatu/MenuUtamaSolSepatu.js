import React, { Component } from "react";

import { View, Text, Image } from "react-native";
import HeaderSolSepatu from "./HeaderSolSepatu";
import { connect } from "react-redux";
import axios from "axios";
import Server from "../Server";
import { Fab, Icon } from "native-base";

import { withNavigation } from "react-navigation";

var level = "";
class MenuUtamaSolSepatu extends Component {
  static navigationOptions = ({ navigation }) => {
    level = navigation.getParam("level");

    return {
      header: null
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      data_solsepatu: []
    };
  }

  getData =  () => {
     axios
      .get(
        Server +
          `api.php?operasi=detail_solsepatu&data=${this.props.id_admin.id_admin}`
      )
      .then(respon => {
        this.setState({
          data_solsepatu: respon.data
        });
      });
  };

   componentDidMount() {
     this.getData();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.5 }}>
          <HeaderSolSepatu />
        </View>
        <View
          style={{
            marginVertical: 10,
            height: 1,
            backgroundColor: "#000",
            width: "95%",
            marginLeft: 10
          }}
        />
        <View style={{ flex: 2.7 }}>
          <Text style={{ fontSize: 19, textAlign: "center" }}>
            Selamat Datang
          </Text>
          {this.state.data_solsepatu.map((data, key) => {
            return (
              <View key={key}>
                <Text style={{ textAlign: "center", fontSize: 20 }}>
                  {data.nama}
                </Text>
                <View
                  style={{
                    marginVertical: 20,
                    height: 1,
                    backgroundColor: "#000",
                    width: "95%",
                    marginLeft: 10
                  }}
                />
                <Image
                  resizeMode="contain"
                  style={{ height: 340, width: "100%" }}
                  source={{ uri: Server + "images/" + data.foto }}
                />
              </View>
            );
          })}
        </View>
        <Fab
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: "#3c94f1" }}
          position="bottomRight"
          onPress={() => {
            this.props.navigation.navigate("EditProfil");
          }}
        >
          <Icon style={{ fontSize: 29, color: "#fff" }} name="ios-contact" />
        </Fab>
      </View>
    );
  }
}
mapStateToProps = state => {
  return {
    id_admin: state.loginReducer
  };
};

export default connect(mapStateToProps)(withNavigation(MenuUtamaSolSepatu));
