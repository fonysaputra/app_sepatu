import React, { Component } from "react";
import { View } from "react-native";
import {
  Container,
  Content,
  Form,
  Item,
  Label,
  Input,
  Button,
  Tab,
  Tabs,
  TabHeading,
  Icon,
  Text
} from "native-base";
import Headers from "../Container/Headers";
import RegistrasiSolSepatu from "./RegistrasiSolSepatu";
import RegistrasiPelanggan from "./RegistrasiPelanggan";

export default class Registrasi extends Component {
  static navigationOptions = { header: null };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1.1 }}>
          <Content>
            <Headers menu="Login" men="Login" />
          </Content>
        </View>

        <View style={{ flex: 2 }}>
          <Tabs>
            <Tab
              heading={
                <TabHeading>
                  <Text>Registrasi Sol Sepatu</Text>
                </TabHeading>
              }
            >
              <RegistrasiSolSepatu />
            </Tab>
            <Tab
              heading={
                <TabHeading>
                  <Text>Registrasi Pelanggan</Text>
                </TabHeading>
              }
            >
              <RegistrasiPelanggan />
            </Tab>
          </Tabs>
        </View>
      </View>
    );
  }
}
