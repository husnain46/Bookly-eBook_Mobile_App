import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Button,
} from 'react-native';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      bookName: '',
      data: [],
      bool: true,
    };
  }

  componentDidMount() {
    this.changeText(this.state.bookName);
  }

  changeText = async (inputText) => {
    this.setState({ bool: true });

    if (inputText == '' && this.state.bool == true) {
      const response = await fetch(
        'https://www.googleapis.com/books/v1/volumes?q=inthumbnail:%5C"%20"&orderBy=relevance&maxResults=40'
      );

      const json = await response.json();

      this.setState({ data: json.items, bookName: inputText });
    } else {
      const response = await fetch(
        'https://www.googleapis.com/books/v1/volumes?q=' +
          inputText +
          '&orderBy=relevance'
      );

      const json = await response.json();

      this.setState({ data: json.items, bookName: inputText });
      if (json.totalItems == 0) {
        this.setState({ bool: false });
      }
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

    const str = '';

    return (
      <View style={styles.container}>
        <View style={styles.pageHeaderView}>
          <Image
            style={styles.imageStyle}
            source={require('../assets/icons/search.png')}
          />
          <Text style={styles.pageHeader}>Search Books</Text>
        </View>

        <View
          style={{
            width: 280,
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 30,
          }}>
          <TextInput
            style={{
              width: 280,
              height: 50,
              fontSize: 18,
              borderWidth: 5,
              borderRadius: 12,
              borderColor: '#222c42',
              textAlign: 'center',
              backgroundColor: 'white',
              marginTop: -30,
            }}
            placeholder="Enter book name"
            onChangeText={(text) => this.changeText(text)}
          />
        </View>

        {this.state.bool ? (
          <View
            style={{
              flex: 0.77,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FlatList
              data={this.state.data}
              keyExtractor={(x, i) => i}
              renderItem={({ item }) =>
                item.volumeInfo.imageLinks === undefined ? (
                  <Text>''</Text>
                ) : (
                  <TouchableOpacity onPress={() => bookDetail(item)}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        marginVertical: 10,
                      }}>
                      <Image
                        style={{
                          width: 130,
                          height: 170,
                          margin: 10,
                          borderRadius: 12,
                        }}
                        source={{
                          uri: item.volumeInfo.imageLinks.thumbnail,
                        }}
                      />
                      <View style={{ width: 210 }}>
                        <Text
                          style={{
                            color: 'white',
                            marginLeft: 10,
                            marginTop: 20,
                            fontWeight: 'bold',
                          }}>
                          {item.volumeInfo.title}
                        </Text>

                        <View
                          style={{
                            width: 200,
                            flexDirection: 'row',
                            marginLeft: 7,
                            marginTop: 10,
                          }}>
                          <Image
                            style={{ width: 20, height: 20 }}
                            source={require('../assets/icons/author1.png')}
                          />

                          <Text
                            style={{
                              padding: 5,
                              color: 'grey',
                              marginLeft: 2,
                              marginTop: -5,
                            }}>
                            {item.volumeInfo.authors === undefined ? (
                              <Text>Unknown</Text>
                            ) : (
                              (this.str = Object.values(
                                item.volumeInfo.authors
                              ).join(',\n'))
                            )}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                )
              }
            />
          </View>
        ) : (
          <View style={{ flex: 0.77 }}>
            <Text style={{ fontSize: 20, color: 'orange' }}>
              Book not found!
            </Text>
          </View>
        )}
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
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#1E1B26',
    justifyContent: 'center',
    alignItems: 'center',
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
    marginTop: -65,
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
  pageFooterView: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222c42',
    alignSelf: 'center',
    marginBottom: -80,
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
export default Search;
