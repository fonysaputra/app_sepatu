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
import ImagePicker from "react-native-image-picker";
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
import Server from "../Server";
import axios from "axios";
import { withNavigation } from "react-navigation";
import PasswordInputText from "react-native-hide-show-password-input";

class RegistrasiPelanggan extends Component {
  static navigationOptions = { header: null };
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      nama: "",
      alamat: "",
      no_telp: "",
      email: "",
      error: null,
      ImageSource: null,
      data: null,
      uri: "",
      fileName: ""
    };
  }

  registrasi() {
    if (this.state.username === "" && this.state.password === "") {
      alert("Silahka Lengkapi Data Anda");
    } else {
      const data = new FormData();
      data.append("nama", this.state.nama);
      data.append("no_telp", this.state.no_telp);
      data.append("email", this.state.email);
      data.append("username", this.state.username);
      data.append("password", this.state.password);
      data.append("alamat", this.state.alamat);
      data.append("fileToUpload", {
        uri: this.state.uri,
        type: "image/jpeg",
        name: this.state.fileName
      });

      const url = Server + "/api.php?operasi=register_pelanggan";
      fetch(url, {
        method: "post",
        body: data
      }).then(() => {
        alert("Anda Berhasil Registrasi, Silahkan Login");
        this.bersih();
        this.props.navigation.navigate("Login");
      });
    }
  }
  batal() {
    alert("Registrasi Di Batalkan");
    this.bersih();
  }
  bersih() {
    this.setState({
      username: "",
      password: "",
      nama: "",
      alamat: "",
      no_telp: "",
      email: "",
      error: null,
      ImageSource: null,

      data: null,
      uri: "",
      fileName: ""
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

  componentDidMount() {
    this.bersih();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Container style={{ flex: 2, marginTop: 5 }}>
          <Content>
            <Form>
              <Item floatingLabel>
                <Label>Nama</Label>
                <Input
                  onChangeText={text => this.setState({ nama: text })}
                  value={this.state.nama}
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
            <View style={styles.container}>
              <Text
                style={{ textAlign: "center", fontSize: 20, marginBottom: 20 }}
              >
                Foto pelanggan
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
            <View
              style={{
                marginTop: 50,
                flexDirection: "row",
                justifyContent: "center"
              }}
            >
              <Button
                success
                style={{ alignContent: "center", margin: 10 }}
                onPress={this.registrasi.bind(this)}
              >
                <Text> Registrasi </Text>
              </Button>
              <Button
                danger
                style={{ alignContent: "center", margin: 10 }}
                onPress={this.batal.bind(this)}
              >
                <Text> Batal </Text>
              </Button>
            </View>
          </Content>
        </Container>
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

export default withNavigation(RegistrasiPelanggan);
