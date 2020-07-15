import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { Thumbnail, Content, Container } from "native-base";
import { withNavigation } from "react-navigation";

import AsyncStorage from "@react-native-community/async-storage";
class HeaderPelanggan extends Component {
  _logOut = async () => {
    try {
      await AsyncStorage.removeItem("id_user");
      await AsyncStorage.removeItem("level");
      this.props.navigation.navigate("MenuUtama");
    } catch (error) {
      // Error saving data
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Text
          style={{
            textAlign: "center",
            marginVertical: 10,
            fontSize: 19,
            color: "blue",
            fontWeight: "bold"
          }}
        >
          Sol Sepatu Bandar Lampung
        </Text>
        <View
          style={{
            backgroundColor: "#001167",
            height: 2,
            width: 280,
            marginVertical: 5
          }}
        />
        <Container>
          <Content horizontal>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("MenuUtamaPelanggan");
              }}
            >
              <View style={styles.menu}>
                <Thumbnail
                  style={{ width: 50, height: 50 }}
                  source={require("../../assets/home.png")}
                />
                <View style={styles.garisHeader} />
                <Text style={{ fontSize: 14 }}>Home</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Rating");
              }}
            >
              <View style={styles.menu}>
                <Thumbnail
                  style={{ width: 50, height: 50 }}
                  source={require("../../assets/daftar.png")}
                />
                <View style={styles.garisHeader} />
                <Text style={{ fontSize: 14 }}>Rating</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Pemesanan");
              }}
            >
              <View style={styles.menu}>
                <Thumbnail
                  style={{ width: 50, height: 50 }}
                  source={require("../../assets/bukti.png")}
                />
                <View style={styles.garisHeader} />
                <Text style={{ fontSize: 14 }}>Pesanan Saya</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("MapsPelanggan");
              }}
            >
              <View style={styles.menu}>
                <Thumbnail
                  style={{ width: 50, height: 50 }}
                  source={require("../../assets/peta.png")}
                />
                <View style={styles.garisHeader} />
                <Text style={{ fontSize: 14 }}>Lokasi Sol Sepatu</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this._logOut();
              }}
            >
              <View style={styles.menu}>
                <Thumbnail
                  style={{ width: 50, height: 50 }}
                  source={require("../../assets/logout.png")}
                />
                <View style={styles.garisHeader} />
                <Text style={{ fontSize: 14 }}>LogOut</Text>
              </View>
            </TouchableOpacity>
          </Content>
        </Container>
      </View>
    );
  }
}

export default withNavigation(HeaderPelanggan);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  menu: {
    height: 110,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 9
  },
  garisHeader: {
    backgroundColor: "#001167",
    height: 2,
    width: 60,
    marginVertical: 5
  }
});
