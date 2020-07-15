import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Icon,
  List,
  ListItem,
  Thumbnail,
  Item,
  Left,
  Input,
  Body,
  Button,
  Right
} from "native-base";

import { View } from "react-native";
import axios from "axios";
import Server from "../../Server";

import StarRating from "react-native-star-rating";
import { connect } from "react-redux";

var id_solsepatu = "";
var nama = "";

class DetailRating extends Component {
  static navigationOptions = ({ navigation }) => {
    id_solsepatu = navigation.getParam("id_solsepatu");
    nama = navigation.getParam("nama");

    return {
      title: nama
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      starCount: 0.0,
      keterangan: "",
      dataDetailRating: []
    };
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }

  showDetailRating = () => {
    axios
      .get(Server + `api.php?operasi=show_detail_rating&data=${id_solsepatu}`)
      .then(res => {
        this.setState({
          dataDetailRating: res.data
        });
      });
  };

  saveRating() {
    axios
      .get(
        Server +
          `api.php?operasi=input_rating&id_solsepatu=${id_solsepatu}
      &id_pendaftaran=${this.props.id_admin.id_admin}&rating=${this.state.starCount}&keterangan=${this.state.keterangan}`
      )
      .then(() => {
        this.bersih();
        this.showDetailRating();
      });
  }

  bersih = () => {
    this.setState({
      starCount: 0.0,
      keterangan: ""
    });
  };

  componentDidMount() {
    this.showDetailRating();
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Content>
          <List>
            {this.state.dataDetailRating.map((data, key) => {
              var ratings = 0;
              if (data.jumlah_rating === null) {
                ratings = 0.0;
              } else {
                ratings = parseFloat(data.jumlah_rating);
              }
              return (
                <ListItem avatar key={key}>
                  <Left>
                    <Thumbnail
                      source={{ uri: Server + "images/" + data.foto }}
                    />
                  </Left>
                  <Body>
                    <Text>{data.nama}</Text>
                    <Text note>{data.keterangan}</Text>
                  </Body>
                  <Right>
                    <StarRating
                      disabled={true}
                      maxStars={5}
                      starSize={12}
                      fullStarColor="orange"
                      rating={ratings}
                    />
                  </Right>
                </ListItem>
              );
            })}
          </List>
        </Content>
        <View>
          <View
            style={{
              marginLeft: 20,
              marginRight: 20,
              marginBottom: 20,
              backgroundColor: "#e6e6e6",
              borderRadius: 10
            }}
          >
            <StarRating
              disabled={false}
              maxStars={5}
              starSize={35}
              fullStarColor="yellow"
              rating={this.state.starCount}
              selectedStar={rating => this.onStarRatingPress(rating)}
            />
          </View>
          <Item success style={{ marginLeft: 20 }}>
            <Input
              placeholder="Keterangan"
              value={this.state.keterangan}
              onChangeText={e => {
                this.setState({ keterangan: e });
              }}
            />
            <Icon name="checkmark-circle" />
          </Item>
          <Button
            iconLeft
            primary
            style={{ margin: 20 }}
            onPress={this.saveRating.bind(this)}
          >
            <Icon name="save" />
            <Text>Save Rating</Text>
          </Button>
        </View>
      </View>
    );
  }
}

mapStateToProps = state => {
  return {
    id_admin: state.loginReducer
  };
};
export default connect(mapStateToProps)(DetailRating);
