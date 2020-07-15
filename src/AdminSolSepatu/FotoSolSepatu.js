import React, { Component } from 'react'

import { Image, View, TouchableOpacity } from 'react-native'
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Fab,
  Right,
} from 'native-base'
import axios from 'axios'
import Server from '../Server'
import { connect } from 'react-redux'
import HeaderSolSepatu from './HeaderSolSepatu'
class FotoSolSepatu extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
    }
  }
  constructor(props) {
    super(props)
    this.state = {
      datasolsepatu: [],
    }
  }
  getDatasolsepatu = () => {
    axios
      .get(
        Server +
          `api.php?operasi=get_galery&data=${this.props.id_admin.id_admin}`,
      )
      .then((res) => {
        this.setState({
          datasolsepatu: res.data,
        })
      })
  }

  actionDelete = (id_galery) => {
    axios
      .get(Server + `api.php?operasi=galery_delete&data=${id_galery}`)
      .then((respon) => {
        if (respon) {
          this.getDatasolsepatu()
        }
      })
  }

  componentDidMount() {
    this.getDatasolsepatu()
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.5 }}>
          <HeaderSolSepatu />
        </View>
        <View style={{ flex: 3 }}>
          <Content>
            {this.state.datasolsepatu.map((data, key) => {
              return (
                <Card key={key}>
                  <CardItem cardBody>
                    <Image
                      source={{ uri: Server + 'images/' + data.foto_galeri }}
                      style={{ height: 200, width: null, flex: 1 }}
                    />
                  </CardItem>
                  <View
                    style={{
                      alignContent: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        marginVertical: 10,
                        width: '40%',
                        backgroundColor: '#00BCD4',
                        borderRadius: 7,
                        height: 30,
                        margin: 5,
                      }}
                      info
                      onPress={() => {
                        this.props.navigation.navigate('EditGalerysolsepatu', {
                          id_galery: data.id_galeri,
                          foto: data.foto_galeri,
                        })
                      }}
                    >
                      <Text
                        style={{
                          textAlign: 'center',
                          color: '#fff',
                          paddingTop: 5,
                        }}
                      >
                        Edit Galery
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{
                        marginVertical: 10,
                        width: '40%',
                        backgroundColor: 'red',
                        borderRadius: 7,
                        height: 30,
                        margin: 5,
                      }}
                      info
                      onPress={() => {
                        this.actionDelete(data.id_galeri)
                      }}
                    >
                      <Text
                        style={{
                          textAlign: 'center',
                          color: '#fff',
                          paddingTop: 5,
                        }}
                      >
                        Hapus Galery
                      </Text>
                    </TouchableOpacity>
                  </View>
                </Card>
              )
            })}
          </Content>
        </View>
        <Fab
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: '#fff' }}
          position="bottomRight"
          onPress={() => {
            this.props.navigation.navigate('FotoMakeupsolsepatu')
          }}
        >
          <Icon style={{ fontSize: 29, color: '#5067FF' }} name="md-add" />
        </Fab>
      </View>
    )
  }
}

mapStateToProps = (state) => {
  return {
    id_admin: state.loginReducer,
  }
}

export default connect(mapStateToProps)(FotoSolSepatu)
