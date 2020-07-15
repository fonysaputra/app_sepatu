import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  PixelRatio,
  Dimensions,
  ActivityIndicator
} from "react-native";
import {
  Container,
  Content,
  Form,
  Item,
  Label,
  Input,
  Button,
  Text
} from "native-base";

import ImagePicker from "react-native-image-picker";
import { withNavigation } from "react-navigation";
import Server from "../Server";
import axios from "axios";
import { TabNavigator } from "react-navigation";
import PasswordInputText from "react-native-hide-show-password-input";

import MapView, { Marker, ProviderPropType } from "react-native-maps";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE = -5.39714;
const LONGITUDE = 105.266792;
const LATITUDE_DELTA = 0.1122;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class RegistrasiSolSepatu extends Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      nama: "",
      alamat: "",
      no_telp: "",
      email: "",
      pemilik: "",
      latitude: null,
      longitude: null,
      error: null,
      ImageSource: null,

      data: null,
      uri: "",
      fileName: "",

      Image_TAG: "",
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }
    };
  }

  registrasi() {
    if (this.state.username === "" && this.state.password === "") {
      alert("Silahka Lengkapi Data Anda");
    } else if (this.state.longitude === null && this.state.latitude === null) {
      alert("Lokasi Anda Belum Di Temukan Silahkan Tunggu !!!");
    } else {
      const data = new FormData();
      data.append("nama", this.state.nama);
      data.append("no_telp", this.state.no_telp);
      data.append("email", this.state.email);
      data.append("username", this.state.username);
      data.append("password", this.state.password);
      data.append("pemilik", this.state.pemilik);
      data.append("lat", this.state.latitude);
      data.append("long", this.state.longitude);
      data.append("alamat", this.state.alamat);
      data.append("fileToUpload", {
        uri: this.state.uri,
        type: "image/jpeg",
        name: this.state.fileName
      });

      const url = Server + "/api.php?operasi=register_solsepatu";
      fetch(url, {
        method: "post",
        body: data
      }).then(() => {
        alert("Anda Berhasil Registrasi");
        this.bersih();
        this.getLocation();
        this.props.navigation.navigate("Login");
      });
    }
  }
  batal() {
    alert("Registrasi Di Batalkan");
    this.bersih();
  }
  getLocation() {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log("wokeeey");
        console.log(position);
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          region: {
            ...this.state.region,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          },

          error: null
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 }
    );
  }
  bersih() {
    this.setState({
      ImageSource: null,

      data: null,
      uri: "",
      fileName: "",

      Image_TAG: "",
      username: "",
      password: "",
      nama: "",
      alamat: "",
      no_telp: "",
      email: "",
      latitude: null,
      longitude: null,
      pemilik: ""
    });
  }

  componentDidMount() {
    this.bersih();
    this.getLocation();
  }

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled photo picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        let source = { uri: response.uri };

        this.setState({
          ImageSource: source,
          uri: response.uri,
          fileName: response.fileName,
          data: response.data
        });
      }
    });
  }

  render() {
    if (this.state.latitude === null && this.state.longitude === null) {
      return (
        <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              marginTop: Dimensions.get("window").height / 6
            }}
          >
            <Text style={styles.textLokasi}>Silahkan Tunggu </Text>
            <Text style={styles.textLokasi}>Mencari Lokasi Saya... </Text>

            <ActivityIndicator
              style={{ marginTop: 20 }}
              size="large"
              color="#0000ff"
            />
          </View>
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <Container style={{ flex: 2, marginTop: 5 }}>
          <Content>
            <Form>
              <Item floatingLabel>
                <Label>Nama Sol Sepatu</Label>
                <Input
                  onChangeText={text => this.setState({ nama: text })}
                  value={this.state.nama}
                />
              </Item>
              <Item floatingLabel>
                <Label>Nama Pemilik</Label>
                <Input
                  onChangeText={text => this.setState({ pemilik: text })}
                  value={this.state.pemilik}
                />
              </Item>
              <Item floatingLabel>
                <Label>Alamat</Label>
                <Input
                  onChangeText={text => this.setState({ alamat: text })}
                  value={this.state.alamat}
                />
              </Item>
              <Item floatingLabel>
                <Label>No Telfon</Label>
                <Input
                  keyboardType="numeric"
                  onChangeText={text => this.setState({ no_telp: text })}
                  value={this.state.no_telp}
                />
              </Item>
              <Item floatingLabel>
                <Label>Email</Label>
                <Input
                  keyboardType="email-address"
                  onChangeText={text => this.setState({ email: text })}
                  value={this.state.email}
                />
              </Item>

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

            <View style={styles.containerMap}>
              <MapView
                provider={this.props.provider}
                style={styles.map}
                initialRegion={this.state.region}
              >
                <Marker
                  title="Lokasi Anda"
                  coordinate={{
                    latitude: this.state.latitude,
                    longitude: this.state.longitude
                  }}
                >
                  <Image
                    source={require("../../assets/pin.png")}
                    style={{ height: 55, width: 55 }}
                  />
                </Marker>
              </MapView>
            </View>

            <Text style={{ margin: 10, textAlign: "center" }}>
              Pastikan Anda Berada Di Lokasi Sol Sepatu Anda
            </Text>

            <View style={styles.container}>
              <Text
                style={{ textAlign: "center", fontSize: 20, marginBottom: 20 }}
              >
                Foto
              </Text>
              <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                <View style={styles.ImageContainer}>
                  {this.state.ImageSource === null ? (
                    <Text>Select a Photo</Text>
                  ) : (
                    <Image
                      style={styles.ImageContainer}
                      source={this.state.ImageSource}
                    />
                  )}
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={this.registrasi.bind(this)}
              >
                <Text style={styles.TextStyle}> Registrasi </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.6}
                onPress={this.batal.bind(this)}
              >
                <Text style={styles.TextStyle}> Batal </Text>
              </TouchableOpacity>
            </View>
          </Content>
        </Container>
      </View>
    );
  }
}

RegistrasiSolSepatu.propTypes = {
  provider: MapView.ProviderPropType
};

export default withNavigation(RegistrasiSolSepatu);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 20
  },
  containerMap: {
    height: 200,
    marginTop: 10,
    marginBottom: 10
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  ImageContainer: {
    borderRadius: 10,
    width: 250,
    height: 250,
    borderColor: "#000",
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3fbbd1"
  },

  button: {
    width: "80%",
    backgroundColor: "#00BCD4",
    borderRadius: 7,
    marginTop: 20
  },

  TextStyle: {
    color: "#fff",
    textAlign: "center",
    padding: 10
  }
});
