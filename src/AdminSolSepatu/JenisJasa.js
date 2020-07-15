import React, { Component } from 'react'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import HeaderSolSepatu from './HeaderSolSepatu'
import { Fab, Icon, Content, Button, Text } from 'native-base'
import axios from 'axios'
import Server from '../Server'
import { connect } from 'react-redux'
import CardView from 'react-native-cardview'

function currencyFormat(num) {
  return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

class JenisJasa extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      Data: [],
    }
  }

  getData = () => {
    axios
      .get(
        Server +
          `api.php?operasi=Jenis_jasa_solsepatu&data=${this.props.id_admin.id_admin}`,
      )
      .then((respon) => {
        this.setState({
          Data: respon.data,
        })
      })
  }

  actionDelete = (id_jasa) => {
    axios
      .get(
        Server + `api.php?operasi=Jenis_jasa_solsepatu_delete&data=${id_jasa}`,
      )
      .then((respon) => {
        if (respon) {
          this.getData()
        }
      })
  }

  componentDidMount() {
    this.getData()
    // console.log(new Intl.NumberFormat('en-IN', { style: 'decimal' }).format(490000));
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.5 }}>
          <HeaderSolSepatu />
        </View>
        <View style={{ flex: 3 }}>
          <View
            style={{
              marginVertical: 10,
              height: 1,
              backgroundColor: '#000',
              width: '95%',
              marginLeft: 10,
            }}
          />
          <Text style={{ textAlign: 'center' }}>Jasa Yang Di Tawarkan</Text>
          <View
            style={{
              marginVertical: 10,
              height: 1,
              backgroundColor: '#000',
              width: '95%',
              marginLeft: 10,
            }}
          />
          <Content>
            {this.state.Data.map((data, key) => {
              return (
                <CardView
                  key={key}
                  cardElevation={10}
                  cardMaxElevation={10}
                  style={{ margin: 10 }}
                  cornerRadius={5}
                >
                  <Image
                    style={{ height: 200, width: '100%' }}
                    source={{ uri: Server + 'images/' + data.foto_jenis }}
                  />

                  <View style={Styles.ViewContainer}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: '#f26e00',
                      }}
                    >
                      {data.jasa}
                    </Text>

                    <Text style={{ paddingTop: 10 }}>{data.keterangan}</Text>
                    <View
                      style={{
                        marginVertical: 10,
                        height: 1,
                        backgroundColor: '#000',
                        width: '95%',
                        marginLeft: 5,
                      }}
                    />
                    <View style={{ paddingTop: 10, flexDirection: 'row' }}>
                      <Icon
                        style={{ fontSize: 26, color: '#5067FF' }}
                        name="card"
                      />
                      <Text style={{ paddingLeft: 10, paddingTop: 5 }}>
                        Rp. {currencyFormat(parseInt(data.harga))}{' '}
                      </Text>
                    </View>
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
                          margin: 5,
                          height: 30,
                        }}
                        info
                        onPress={() => {
                          this.props.navigation.navigate('EditJasa', {
                            id_jasa: data.id_jenis,
                            jasa: data.jasa,
                            foto_jenis: data.foto_jenis,
                            ket: data.keterangan,
                            harga: data.harga,
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
                          Edit Jasa
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
                          this.actionDelete(data.id_jenis)
                        }}
                      >
                        <Text
                          style={{
                            textAlign: 'center',
                            color: '#fff',
                            paddingTop: 5,
                          }}
                        >
                          Hapus Jasa
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </CardView>
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
            this.props.navigation.navigate('TambahJasa')
          }}
        >
          <Icon style={{ fontSize: 29, color: '#5067FF' }} name="add" />
        </Fab>
      </View>
    )
  }
}

const Styles = StyleSheet.create({
  ViewContainer: {
    flex: 1,
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
  },
})

mapStateToProps = (state) => {
  return {
    id_admin: state.loginReducer,
  }
}

export default connect(mapStateToProps)(JenisJasa)
