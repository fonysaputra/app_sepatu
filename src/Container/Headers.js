import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { Thumbnail, Content } from "native-base";
import { withNavigation } from "react-navigation";

class Headers extends Component {
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
            marginVertical: 3
          }}
        />
        <Text
          style={{
            color: "black",
            fontWeight: "bold",
            fontSize: 19,
            marginVertical: 10
          }}
        >
          Menu Utama
        </Text>
        <View
          style={{
            flex: 1,
            width: "85%",
            height: 205,
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 4.84,

            elevation: 5,
            flexDirection: "row"
          }}
        >
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("MenuUtama");
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
                this.props.navigation.navigate("Registrasi");
              }}
            >
              <View style={styles.menu}>
                <Thumbnail
                  style={{ width: 50, height: 50 }}
                  source={require("../../assets/registrasi.png")}
                />
                <View style={styles.garisHeader} />
                <Text style={{ fontSize: 14 }}>Registrasi</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Tentang");
              }}
            >
              <View style={styles.menu}>
                <Thumbnail
                  style={{ width: 50, height: 50 }}
                  source={require("../../assets/info.png")}
                />
                <View style={styles.garisHeader} />
                <Text style={{ fontSize: 14 }}>Informasi</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Login");
              }}
            >
              <View style={styles.menu}>
                <Thumbnail
                  style={{ width: 50, height: 50 }}
                  source={require("../../assets/login.png")}
                />
                <View style={styles.garisHeader} />
                <Text style={{ fontSize: 14 }}>Login</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default withNavigation(Headers);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  menu: {
    marginTop: 18,
    justifyContent: "center",
    alignItems: "center"
  },
  garisHeader: {
    backgroundColor: "#001167",
    height: 2,
    width: 60,
    marginVertical: 5
  }
});
