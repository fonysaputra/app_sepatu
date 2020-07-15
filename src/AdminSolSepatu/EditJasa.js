import React, { Component } from "react";
import { Text, Content, Form, Item, Input, Label, Textarea } from "native-base";
import {
  StyleSheet,
  PixelRatio,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  View
} from "react-native";

import ImagePicker from "react-native-image-picker";
import Server from "../Server";
import axios from "axios";

import { connect } from "react-redux";
id_jasa = "";
jasa = "";
foto_jenis = "";
keterangan = "";
harga = "";
class EditJasa extends Component {
  static navigationOptions = ({ navigation }) => {
    id_jasa = navigation.getParam("id_jasa");
    jasa = navigation.getParam("jasa");
    foto_jenis = navigation.getParam("foto_jenis");
    keterangan = navigation.getParam("ket");
    harga = navigation.getParam("harga");
    return {
      title: "Edit Jenis Jasa"
    };
  };

  constructor() {
    super();
    this.state = {
      error: null,
      ImageSource: null,
      data: null,
      uri: "",
      fileName: "",
      jasa: jasa,
      harga: harga,
      keterangan: keterangan,
      Image_TAG: ""
    };
  }

  EditData() {
    if (this.state.jasa === "" && this.state.harga === "") {
      alert("Silahka Lengkapi Data Anda");
    } else {
      const data = new FormData();
      data.append("jasa", this.state.jasa);
      data.append("harga", this.state.harga);
      data.append("keterangan", this.state.keterangan);
      data.append("id_jenis", id_jasa);

      if (this.state.ImageSource) {
        data.append("fileToUpload", {
          uri: this.state.uri,
          type: "image/jpeg",
          name: this.state.fileName
        });
      }

      const url = Server + "/api.php?operasi=ubah_jasa_solsepatu";
      fetch(url, {
        method: "post",
        body: data
      }).then(() => {
        alert("Data Berhasil Di Ubah");

        this.props.navigation.navigate("MenuUtamaSolSepatu");
      });
    }
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
    return (
      <View style={{ flex: 1 }}>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Jasa </Label>
              <Input
                value={this.state.jasa}
                onChangeText={text => this.setState({ jasa: text })}
              />
            </Item>
            <Item floatingLabel last>
              <Label>Harga</Label>
              <Input
                value={this.state.harga}
                onChangeText={text => this.setState({ harga: text })}
                keyboardType="numeric"
              />
            </Item>

            <Item floatingLabel last>
              <Label>Keterangan (Include)</Label>
              <Input
                value={this.state.keterangan}
                onChangeText={text => this.setState({ keterangan: text })}
              />
            </Item>
          </Form>

          <View style={styles.container}>
            <Text
              style={{ textAlign: "center", fontSize: 20, marginBottom: 20 }}
            >
              Foto Jenis Jasa
            </Text>

            <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
              <View style={styles.ImageContainer}>
                {this.state.ImageSource === null ? (
                  <Image
                    style={styles.ImageContainer}
                    source={{ uri: Server + "images/" + foto_jenis }}
                  />
                ) : (
                  <Image
                    style={styles.ImageContainer}
                    source={this.state.ImageSource}
                  />
                )}
              </View>
            </TouchableOpacity>
            <Text style={{ marginTop: 5, color: "#f10d00" }}>
              Silahkan Tekan Foto Untuk Merubah Foto
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={this.EditData.bind(this)}
            >
              <Text style={styles.TextStyle}> Edit Data </Text>
            </TouchableOpacity>
          </View>
        </Content>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: 20
  },
  containerMap: {
    height: 200,
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
    marginTop: 20,
    marginBottom: 20
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

export default connect(mapStateToProps)(EditJasa);
