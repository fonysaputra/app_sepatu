import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import AsyncStorage from "@react-native-community/async-storage";
import { Thumbnail, Content, Container } from "native-base";
import { withNavigation } from "react-navigation";

class HeaderSolSepatu extends Component {
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
                this.props.navigation.navigate("MenuUtamaSolSepatu");
              }}
            >
              <View style={styles.menu}>
                <Thumbnail
                  style={{ width: 45, height: 45 }}
                  source={require("../../assets/home.png")}
                />
                <View style={styles.garisHeader} />
                <Text style={{ fontSize: 14 }}>Home</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("PemesananSolSepatu");
              }}
            >
              <View style={styles.menu}>
                <Thumbnail
                  style={{ width: 45, height: 45 }}
                  source={require("../../assets/bukti.png")}
                />
                <View style={styles.garisHeader} />
                <Text style={{ fontSize: 14 }}>Pesanan Masuk</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("JenisJasa");
              }}
            >
              <View style={styles.menu}>
                <Thumbnail
                  style={{ width: 45, height: 45 }}
                  source={require("../../assets/jasa.png")}
                />
                <View style={styles.garisHeader} />
                <Text style={{ fontSize: 14 }}>Jenis Jasa</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("FotoSolSepatu");
              }}
            >
              <View style={styles.menu}>
                <Thumbnail
                  style={{ width: 45, height: 45 }}
                  source={require("../../assets/images.png")}
                />
                <View style={styles.garisHeader} />
                <Text style={{ fontSize: 14 }}>Galery</Text>
              </View>
            </TouchableOpacity>
            {/*
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Laporan");
              }}
            >
              <View style={styles.menu}>
                <Thumbnail
                  style={{ width: 45, height: 45 }}
                  source={require("../../assets/report.png")}
                />
                <View style={styles.garisHeader} />
                <Text style={{ fontSize: 14 }}>Laporan</Text>
              </View>
            </TouchableOpacity>

            */}

            <TouchableOpacity
              onPress={() => {
                this._logOut();
              }}
            >
              <View style={styles.menu}>
                <Thumbnail
                  style={{ width: 45, height: 45 }}
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

export default withNavigation(HeaderSolSepatu);

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
    margin: 5
  },
  garisHeader: {
    backgroundColor: "#001167",
    height: 2,
    width: 60,
    marginVertical: 5
  }
});
