import React, { Component } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  ScrollView,
  StyleSheet,
} from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      bookName: '',
      data: [],
      fontLoaded: false,
    };
  }

  componentDidMount() {
    this.fetchFont();
    this.fetchApi();
  }

  fetchApi = async () => {
    const response = await fetch(
      'https://www.googleapis.com/books/v1/volumes?q=inthumbnail:%5C"%20"&orderBy=newest&maxResults=40'
    );

    const json = await response.json();

    this.setState({ data: json.items });
  };

  fetchFont = async () => {
    await Font.loadAsync({
      lucida: require('../assets/fonts/lucida.ttf'),
      lh_black: require('../assets/fonts/LH_black.ttf'),
      lh_bold: require('../assets/fonts/LH_bold.ttf'),
      arialRound: require('../assets/fonts/arialRound.ttf'),
      arialBold: require('../assets/fonts/Arialbold.ttf'),
      jackMart: require('../assets/fonts/JackMartine.ttf'),
    });
    if (!this.state.fontLoaded) {
      return (
        <AppLoading
          startAsync={() => this.fetchFont()}
          onError={(err) => console.log(err)}
          onFinish={() => this.setState({ fontLoaded: true })}
        />
      );
    }
  };

  render() {
    const discoverPage = () => {
      this.props.navigation.navigate('Home');
    };

    const searchPage = () => {
      this.props.navigation.navigate('Search');
    };

    const bookDetail = (i) => {
      this.props.navigation.navigate('BookDetail', {
        img: i.volumeInfo.imageLinks.thumbnail,
        title: i.volumeInfo.title,

        author:
          i.volumeInfo.authors === undefined
            ? 'Unknown'
            : Object.values(i.volumeInfo.authors).join(', '),

        pDate: i.volumeInfo.publishedDate,

        page:
          i.volumeInfo.pageCount === undefined ? '-' : i.volumeInfo.pageCount,

        language: i.volumeInfo.language,
        desc:
          i.volumeInfo.description === undefined
            ? 'No description available.'
            : i.volumeInfo.description,

        dLink:
          i.accessInfo.pdf.downloadLink === undefined
            ? 'unknown'
            : i.accessInfo.pdf.downloadLink,

        pLink:
          i.volumeInfo.previewLink === undefined
            ? 'unknown'
            : i.volumeInfo.previewLink,

        rating:
          i.volumeInfo.averageRating === undefined
            ? '-'
            : i.volumeInfo.averageRating,
      });
    };

    return (
      <View style={styles.mainView}>
        <Text style={styles.headerText}>Bookly</Text>

        <View style={styles.pageHeaderView}>
          <Image
            style={styles.imageStyle}
            source={require('../assets/icons/discover.png')}
          />
          <Text style={styles.pageHeader}>Discover</Text>
        </View>

        <Text style={styles.latestText}>Latest Books</Text>

        <View style={{ flex: 0.865, marginTop: 10 }}>
          <FlatList
            numColumns={2}
            data={this.state.data}
            keyExtractor={(x, i) => i}
            renderItem={({ item }) =>
              item.volumeInfo.imageLinks === undefined ? (
                <Text>''</Text>
              ) : (
                <TouchableOpacity onPress={() => bookDetail(item)}>
                  <View style={{ marginVertical: 5 }}>
                    <Image
                      style={{
                        width: 155,
                        height: 190,
                        margin: 16,
                        flexWrap: 'wrap',
                        borderRadius: 5,
                        resizeMode: 'stretch',
                      }}
                      source={{ uri: item.volumeInfo.imageLinks.thumbnail }}
                    />

                    <View
                      style={{
                        width: 100,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: -8,
                      }}>
                      <Image
                        style={{ width: 23, height: 23, marginLeft: 50 }}
                        source={require('../assets/icons/date2.png')}
                      />

                      <Text
                        style={{
                          color: 'grey',
                          marginLeft: 5,
                        }}>
                        {item.volumeInfo.publishedDate}
                      </Text>
                    </View>

                    <View
                      style={{
                        width: 80,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        style={{ width: 28, height: 28, marginLeft: 70 }}
                        source={require('../assets/icons/pages.png')}
                      />
                      <Text
                        style={{
                          color: 'grey',
                          width: 80,
                          marginLeft: 5,
                        }}>
                        {item.volumeInfo.pageCount === undefined ? (
                          <Text>unknown</Text>
                        ) : (
                          item.volumeInfo.pageCount
                        )}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            }
          />
        </View>

        <View style={styles.pageFooterView}>
          <TouchableOpacity onPress={() => discoverPage()}>
            <Image
              style={{
                width: 25,
                height: 25,
                marginLeft: -35,
              }}
              source={require('../assets/icons/discover.png')}
            />
            <Text style={styles.pageFooter}>Discover</Text>
          </TouchableOpacity>

          <Text
            style={{
              color: 'white',
              fontSize: 28,
              marginTop: -5,
              marginLeft: 0,
              marginRight: 40,
            }}>
            |
          </Text>

          <TouchableOpacity onPress={() => searchPage()}>
            <Image
              style={styles.imageStyle2}
              source={require('../assets/icons/search.png')}
            />
            <Text style={styles.pageFooter2}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    width: '100%',
    backgroundColor: '#1E1B26',
    alignSelf: 'center',
  },
  headerText: {
    color: 'white',
    fontFamily: 'lh_black',
    fontSize: 28,
    textAlign: 'center',
    marginTop: 20,
  },
  pageHeaderView: {
    width: 350,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 9,
    backgroundColor: '#222c42',
    alignSelf: 'center',
    marginTop: 20,
  },
  pageHeader: {
    color: '#979ead',
    fontFamily: 'arialBold',
    fontSize: 22,
    textAlign: 'center',
    marginLeft: 10,
    marginTop: -4,
  },
  imageStyle: {
    width: 26,
    height: 26,
    marginLeft: -10,
  },
  latestText: {
    color: 'lightgrey',
    fontSize: 18,
    fontFamily:'arialRound',
    textDecorationLine: 'underline',
    textAlign: 'left',
    marginLeft: 20,
    marginTop: 30,
  },

  pageFooterView: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222c42',
    alignSelf: 'center',
    marginBottom: -75,
  },
  pageFooter: {
    color: '#979ead',
    fontFamily: 'arialBold',
    fontSize: 20,
    textAlign: 'center',
    marginLeft: 0,
    marginRight: 20,
    marginTop: -30,
  },
  pageFooter2: {
    color: '#979ead',
    fontFamily: 'arialBold',
    fontSize: 20,
    textAlign: 'center',
    marginLeft: 25,
    marginRight: -25,
    marginTop: -32,
  },
  imageStyle2: {
    width: 28,
    height: 28,
    marginLeft: -15,
  },
});

export default Home;
