import React, { Component } from "react";

import {
  View,
  StatusBar,
  ScrollView,
  Dimensions,
  Text,
  Image,
  PermissionsAndroid
} from "react-native";
import Headers from "./Container/Headers";
import ImageSlider from "react-native-image-slider";
import SolSepatu from "./SolSepatu";
import AsyncStorage from "@react-native-community/async-storage";
import { connect } from "react-redux";

import RatingTerbaik from "./RatingTerbaik";
import axios from "axios";
import Server from "./Server";

export async function request_camera_permission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    } else {
      Alert.alert("Camera Permission Not Granted");
    }
  } catch (err) {
    console.warn(err);
  }
}
export async function request_file_permission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    } else {
      Alert.alert("File Permission Not Granted");
    }
  } catch (err) {
    console.warn(err);
  }
}

export async function request_location_permission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    } else {
      Alert.alert("Location Permission Not Granted");
    }
  } catch (err) {
    console.warn(err);
  }
}

class MenuUtama extends Component {
  static navigationOptions = { header: null };
  constructor() {
    super();
    this.state = {
      dataRating: []
    };
  }
  _retrieveData = async () => {
    try {
      id_user = JSON.parse(await AsyncStorage.getItem("id_user"));
      level = JSON.parse(await AsyncStorage.getItem("level"));
      if (id_user !== null) {
        // We have data!!
        console.log(level);
        this.props.dispatch({
          type: "TES_ACTION",
          payload: id_user
        });
        if (level === "solsepatu") {
          this.props.navigation.navigate("MenuUtamaSolSepatu", {
            level: "solsepatu"
          });
        } else if (level === "pelanggan") {
          this.props.navigation.navigate("MenuUtamaPelanggan", {
            level: "pelanggan"
          });
        }
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  getDataratingTerbaik = async data => {
    await axios
      .get(Server + `api.php?operasi=show_rating_terbaik`)
      .then(res => {
        this.setState({
          dataRating: res.data
        });
      });
  };

  async componentDidMount() {
    await this.getDataratingTerbaik();
    await request_camera_permission();
    await request_location_permission();
    await request_file_permission();

    this._retrieveData();
    //await request_courseLocation_permission();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1.2 }}>
          <StatusBar backgroundColor="#04b96d" barStyle="light-content" />
          <ScrollView>

          <Headers menu="Login" men="Login" />
          </ScrollView>
          <View
            style={{
              backgroundColor: "#001167",
              height: 2,
              marginVertical: 10,
              marginHorizontal: 2
            }}
          />
        </View>

        <View style={{ flex: 2 }}>
          <ScrollView>
            <RatingTerbaik data={this.state.dataRating} />
            <SolSepatu />
          </ScrollView>
        </View>
      </View>
    );
  }
}
const mapsStateToProps = state => ({
  tes: state.loginReducer
});

export default connect(mapsStateToProps)(MenuUtama);
