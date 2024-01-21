import React, { Component } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Animated,
  Linking,
  Alert,
} from 'react-native';

class BookDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const img = this.props.route.params.img;
    const title = this.props.route.params.title;
    const author = this.props.route.params.author;
    const pDate = this.props.route.params.pDate;
    const page = this.props.route.params.page;
    const language = this.props.route.params.language;
    const desc = this.props.route.params.desc;
    const dLink = this.props.route.params.dLink;
    const pLink = this.props.route.params.pLink;
    const rating = this.props.route.params.rating;

    const viewBook = (vLink) => {
      if (vLink == 'unknown') {
        Alert.alert('Book not available to read!');
      } else {
        Linking.openURL(vLink);
      }
    };

    const downloadBook = (downLink) => {
      if (downLink == 'unknown') {
        Alert.alert('This Book is not available for download!');
      } else {
        Linking.openURL(downLink);
      }
    };

    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#1E1B26' }}>
        <View style={styles.topSection}>
          <ImageBackground
            style={styles.topImage}
            source={require('../assets/topImage.jpg')}>
            <View>
              <Image style={styles.thumb} source={{ uri: img }} />
            </View>

            <Text style={styles.titleText}>{title}</Text>

            <View style={styles.infoView}>
              <View
                style={{
                  width: 80,
                  height: 40,
                  flexDirection: 'row',
                  borderRightWidth: 1,
                }}>
                <Image
                  style={styles.infoPic1}
                  source={require('../assets/rating.png')}
                />
                <Text style={styles.infoText}> {rating}</Text>
              </View>

              <View
                style={{
                  width: 95,
                  height: 40,
                  flexDirection: 'row',
                  marginHorizontal: 20,
                  borderRightWidth: 1,
                }}>
                <Image
                  style={styles.infoPic2}
                  source={require('../assets/pages.png')}
                />
                <Text style={styles.infoText}>{page}</Text>
              </View>

              <View
                style={{
                  width: 50,
                  flexDirection: 'row',
                  marginHorizontal: 5,
                }}>
                <Image
                  style={styles.infoPic3}
                  source={require('../assets/lang.png')}
                />
                <Text
                  style={{
                    color: '#1E1B26',
                    fontSize: 18,
                    alignSelf: 'center',
                    marginLeft: 3,
                    marginTop: -3,
                  }}>
                  {' '}
                  {language}
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.authBox}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'arialBold',
              color: '#2e6dbf',
              marginLeft: 5,
              marginTop: 5,
            }}>
            Authors:{'  '}
          </Text>

          <Text style={styles.authText}>{author}</Text>
        </View>

        <View style={styles.descView}>
          <Text
            style={{
              fontSize: 17,
              fontFamily: 'arialBold',
              color: '#2e6dbf',
            }}>
            Description:{' '}
          </Text>

          <Text style={styles.descText}>{desc}</Text>
        </View>

        <View style={styles.footerView}>
          <View style={styles.btnView1}>
            <TouchableOpacity onPress={() => viewBook(pLink)}>
              <Text style={styles.footerBtnText}>Read Book</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.btnView2}>
            <TouchableOpacity onPress={() => downloadBook(dLink)}>
              <Text style={styles.footerBtnText}>Download</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  topSection: {
    width: '100%',
    height: 420,
    backgroundColor: '#1E1B26',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  topImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumb: {
    resizeMode: 'stretch',
    width: 170,
    height: 210,
    borderRadius: 5,
    marginTop: 0,
  },
  titleText: {
    color: '#1E1B26',
    width: 250,
    fontFamily: 'arialBold',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  infoView: {
    width: 320,
    height: 70,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  infoPic1: {
    width: 23,
    height: 23,
    alignSelf: 'center',
  },
  infoPic2: {
    width: 30,
    height: 30,
    alignSelf: 'center',
  },
  infoPic3: {
    width: 35,
    height: 35,
    alignSelf: 'center',
    marginLeft: -5,
    marginTop: 5,
  },
  infoText: {
    color: '#1E1B26',
    fontFamily: 'arialRound',
    fontSize: 18,
    alignSelf: 'center',
    marginLeft: 5,
    marginTop: -3,
  },
  authBox: {
    width: 355,
    height: 65,
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 10,

    borderBottomWidth: 1.5,
    borderBottomColor: 'grey',
  },
  authText: {
    width: 270,
    color: 'lightgrey',
    fontFamily: 'arialRound',
    fontSize: 15,
    marginTop: 7,
  },
  descView: {
    flex: 1,
    width: 345,
    marginTop: 20,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    alignSelf: 'center',
  },
  descText: {
    color: 'lightgrey',
    fontSize: 15,
    fontFamily: 'arialRound',
    marginTop: 5,
    textAlign: 'justify',
  },
  footerView: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 15,
  },
  btnView1: {
    width: 160,
    height: 40,
    backgroundColor: '#F96D41',
    borderRadius: 8,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnView2: {
    width: 160,
    height: 40,
    backgroundColor: '#5c8fd1',
    borderRadius: 8,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerBtnText: {
    color: 'white',
    fontFamily: 'arialBold',
    fontSize: 20,
    marginTop: -5,
  },
});

export default BookDetail;
