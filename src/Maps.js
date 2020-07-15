// @ts-nocheck
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  ActivityIndicator
} from "react-native";

import { Item, Input, Icon } from "native-base";

import MapView, { Marker, ProviderPropType } from "react-native-maps";

const { width, height } = Dimensions.get("window");

import { connect } from "react-redux";

const ASPECT_RATIO = width / height;
const LATITUDE = -5.39714;
const LONGITUDE = 105.266792;
const LATITUDE_DELTA = 0.1122;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;
import axios from "axios";

class Maps extends React.Component {
  static navigationOptions = { title: "Lokasi Sol Sepatu" };
  constructor(props) {
    console.log("constructor");
    super(props);
    //tesData = [];
    this.state = {
      lat_user: null,
      lng_user: null,
      error: null,
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      markers: [],
      dataMaps: []
    };
  }

  getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.getData("", position.coords.latitude, position.coords.longitude);
        this.setState({
          lat_user: position.coords.latitude,
          lng_user: position.coords.longitude,
          region: {
            ...this.state.region,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          },

          error: null
        });
        //  this.jarakTerdekat();
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 }
    );
  };

  getData = (e, lat_user, lng_user) => {
    axios
      .get(
        Server +
          `api.php?operasi=show_maps_terdekat&data=${e}&lat=${lat_user}&lng=${lng_user}`
      )
      .then(respon => {
        this.setState({
          dataMaps: respon.data
        });
      })
      .then(() => {
        this.setState({
          cari: 1
        });
      });
  };

  componentDidMount() {
    this.getLocation();
  }
  render() {
    //console.log("Render");
    if (this.state.lat_user === null && this.state.lng_user === null) {
      return (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            marginTop: Dimensions.get("window").height / 3.5
          }}
        >
          <Text style={styles.textLokasi}>Silahkan Tunggu </Text>
          <Text style={styles.textLokasi}>
            Mencari Lokasi Sol Sepatu Terdekat{" "}
          </Text>

          <ActivityIndicator
            style={{ marginTop: 20 }}
            size="large"
            color="#0000ff"
          />
        </View>
      );
    } else {
      //  console.log(tesData);
      return (
        <View style={styles.container}>
          <MapView
            provider={this.props.provider}
            style={styles.map}
            initialRegion={this.state.region}
          >
            <Marker
              title="Lokasi Saya"
              coordinate={{
                latitude: this.state.lat_user,
                longitude: this.state.lng_user
              }}
            >
              <Image
                source={require("../assets/pin.png")}
                style={{ height: 55, width: 55 }}
              />
            </Marker>

            {this.state.dataMaps.map((marker, key) => {
              var lat = parseFloat(marker.lat);
              var lng = parseFloat(marker.lng);

              return (
                <Marker
                  key={key}
                  onPress={() => {
                    //this.props.navigation.navigate("MenuUtama");
                    alert(
                      "Sol Sepatu : " +
                        marker.nama +
                        " | Silahkan Login Terlebih Dahulu"
                    );

                    this.props.navigation.navigate("Login");
                  }}
                  coordinate={{ latitude: lat, longitude: lng }}
                />
              );
            })}
          </MapView>

          <View style={styles.buttonContainer}>
            <Item style={styles.bubble}>
              <Input
                placeholder="Search"
                onChangeText={e => {
                  this.getData(e, this.state.lat_user, this.state.lng_user);
                }}
              />
              <Icon active name="search" />
            </Item>
          </View>
        </View>
      );
    }
  }
}

Maps.propTypes = {
  provider: ProviderPropType
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  textLokasi: {
    textAlign: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  bubble: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.7)",
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 20
  },
  latlng: {
    width: 200,
    alignItems: "stretch"
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: "center",
    marginHorizontal: 10
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 20,
    backgroundColor: "transparent"
  }
});

mapStateToProps = state => {
  return {
    id_admin: state.loginReducer
  };
};
export default connect(mapStateToProps)(Maps);
