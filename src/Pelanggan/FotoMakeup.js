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
import { Button, Text } from "native-base";
import ImagePicker from "react-native-image-picker";
import axios from "axios";
import Server from "../Server";
import { connect } from "react-redux";

var id_solsepatu = "";
var nama = "";
class FotoMakeup extends Component {
  static navigationOptions = ({ navigation }) => {
    id_solsepatu = navigation.getParam("id_solsepatu");
    nama = navigation.getParam("nama");

    return {
      title: nama
    };
  };
  constructor() {
    super();
    this.state = {
      error: null,
      ImageSource: null,
      data: null,
      uri: "",
      fileName: ""
    };
  }

  saveFoto = () => {
    const data = new FormData();
    data.append("id_solsepatu", id_solsepatu);
    data.append("id_user", this.props.id_admin.id_admin);

    data.append("fileToUpload", {
      uri: this.state.uri,
      type: "image/jpeg",
      name: this.state.fileName
    });

    const url = Server + "/api.php?operasi=insert_galery";
    fetch(url, {
      method: "post",
      body: data
    }).then(() => {
      alert("Foto Anda Berhasil Di Simpan Di Galery solsepatu");

      this.props.navigation.navigate("MenuUtamaPelanggan");
    });
  };

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
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={{ textAlign: "center", fontSize: 20, marginBottom: 20 }}>
            Masukan Foto
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
        </View>
        <TouchableOpacity
          onPress={() => {
            this.saveFoto();
          }}
          style={{
            backgroundColor: "#0789d2",
            padding: 20,
            margin: 10,
            borderRadius: 10
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "white",
              textAlign: "center"
            }}
          >
            Save Foto Hasil Makeup
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingTop: 20
  },
  containerMap: {
    height: "100%",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  ImageContainer: {
    borderRadius: 10,
    width: 350,
    height: 350,
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
mapStateToProps = state => {
  return {
    id_admin: state.loginReducer
  };
};

export default connect(mapStateToProps)(FotoMakeup);
