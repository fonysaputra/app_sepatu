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
import PasswordInputText from "react-native-hide-show-password-input";

import ImagePicker from "react-native-image-picker";
import Server from "../Server";
import axios from "axios";

import { connect } from "react-redux";

class EditProfil extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Edit Profil"
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
      nama: "",
      alamat: "",
      no_telp: "",
      password: "",
      Image_TAG: "",
      data_solsepatu: [],
      foto_solsepatu: ""
    };
  }

  getData = () => {
    axios
      .get(
        Server +
          `api.php?operasi=detail_solsepatuuser&data=${this.props.id_admin.id_admin}`
      )
      .then(respon => {
        dataJson = respon.data;

        dataJson.map(data => {
          this.setState({
            nama: data.nama,
            alamat: data.alamat,
            no_telp: data.no_telp,
            password: data.password,
            foto_solsepatu: data.foto
          });
        });
      });
  };

  componentDidMount() {
    this.getData();
    // console.log(new Intl.NumberFormat('en-IN', { style: 'decimal' }).format(490000));
  }

  EditData() {
    const data = new FormData();
    data.append("nama", this.state.nama);
    data.append("alamat", this.state.alamat);
    data.append("no_telp", this.state.no_telp);
    data.append("password", this.state.password);
    data.append("id_solsepatu", this.props.id_admin.id_admin);
    if (this.state.ImageSource) {
      data.append("fileToUpload", {
        uri: this.state.uri,
        type: "image/jpeg",
        name: this.state.fileName
      });
    }

    const url = Server + "/api.php?operasi=ubah_profil_solsepatu";
    fetch(url, {
      method: "post",
      body: data
    }).then(() => {
      alert("Data Berhasil Di Ubah");

      this.props.navigation.navigate("MenuUtamaSolSepatu");
    });
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
          <View>
            <Form>
              <Item floatingLabel>
                <Input
                  value={this.state.nama}
                  onChangeText={text => this.setState({ nama: text })}
                />
              </Item>
              <Item floatingLabel last>
                <Input
                  value={this.state.alamat}
                  onChangeText={text => this.setState({ alamat: text })}
                  keyboardType="numeric"
                />
              </Item>

              <Item floatingLabel last>
                <Input
                  value={this.state.no_telp}
                  onChangeText={text => this.setState({ no_telp: text })}
                />
              </Item>

              <View style={{ marginLeft: 20 }}>
                <PasswordInputText
                  value={this.state.password}
                  onChangeText={password => this.setState({ password })}
                />
              </View>
            </Form>

            <View style={styles.container}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  marginBottom: 20
                }}
              >
                Foto
              </Text>

              <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                <View style={styles.ImageContainer}>
                  {this.state.ImageSource === null ? (
                    <Image
                      style={styles.ImageContainer}
                      source={{
                        uri: Server + "images/" + this.state.foto_solsepatu
                      }}
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

export default connect(mapStateToProps)(EditProfil);
