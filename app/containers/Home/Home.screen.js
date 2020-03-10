import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  Animated,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import IconAnt from 'react-native-vector-icons/AntDesign'

import { styles } from './Home.style';
import { colors } from '../../themes/colors';
import { promoPoster } from '../../themes/images';

class Home extends Component {
  offset = 0;
  state = {
    scrolledToTop: false,
    data: [1, 2, 3, 4, 5, 6, 7, 8],
    promos: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  };

  componentDidMount() {
    this.onFocus();
  };

  onFocus = () => {
    const { navigation, bottom } = this.props;
    navigation.addListener('focus', () => {
      Animated.timing(
        bottom,
        {
          toValue: 0,
          duration: 200
        }
      ).start();
    })
  };

  onScroll = (e) => {
    const { bottom } = this.props;
    const { scrolledToTop } = this.state;

    const currentOffsetY = e.nativeEvent.contentOffset.y;
    const velocity = e.nativeEvent.velocity.y
    if ((currentOffsetY > this.offset) && velocity > 0.4 && (scrolledToTop === false)) {
      this.setState({ scrolledToTop: true }, () => {
        Animated.timing(
          bottom,
          {
            toValue: -100,
            duration: 200
          }
        ).start();
      })
    } else if (((currentOffsetY < this.offset) && velocity < -0.5 && (scrolledToTop === true)) || currentOffsetY === 0) {
      this.setState({ scrolledToTop: false }, () => {
        Animated.timing(
          bottom,
          {
            toValue: 0,
            duration: 200
          }
        ).start();
      })
    }
    this.offset = currentOffsetY;
  };

  renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.leftHeaderContainer}>
          <IconMaterial name="qrcode-scan" size={25} color={colors.white} />
          <Text style={styles.leftHeaderText}>Pay</Text>
        </View>
        <View style={styles.midHeaderContainer}>
          <Text style={styles.midHeaderText}>Taxon</Text>
        </View>
        <View style={styles.leftHeaderContainer}>

        </View>
      </View>
    )
  };

  renderPointInfo = () => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1, height: 50, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 }}>
          <View style={{ width: 25, height: 25, backgroundColor: 'white', borderRadius: 25, borderWidth: 2, borderColor: colors.silver, marginRight: 10 }} />
          <Text style={{ fontFamily: 'OsnovaPro' }}>IDR. 1.659.777</Text>
        </View>
        <View style={{ width: 2 }} />
        <View style={{ flex: 1, height: 50, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 }}>
          <View style={{ width: 25, height: 25, backgroundColor: 'white', borderRadius: 25, borderWidth: 2, borderColor: colors.silver, marginRight: 10 }} />
          <Text style={{ fontFamily: 'OsnovaPro' }}>476 Points</Text>
        </View>
      </View>
    );
  };

  renderMenuGrid = () => {
    const { data } = this.state;

    return (
      <View style={styles.menuContainer}>
        {data.map(item => (
          <TouchableOpacity key={item} activeOpacity={0.8}>
            <ImageBackground style={styles.menuItem}>
              {/* <Text>menu grid</Text> */}
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  renderTopUp = () => {
    return (
      <View style={{ alignItems: 'center', backgroundColor: colors.white, marginTop: 6, paddingVertical: 20 }}>
        <TouchableOpacity activeOpacity={0.8} style={{ flexDirection: 'row', height: 40, backgroundColor: colors.white, elevation: 2, borderRadius: 5, paddingVertical: 10, paddingHorizontal: 15, justifyContent: 'center', alignItems: 'center' }}>
          <IconAnt name="wallet" size={20} color={colors.greenHaze} style={{ marginRight: 10 }} />
          <Text style={{ textAlign: 'center', fontFamily: 'OsnovaProBold' }}>Top Up .</Text>
          <Text style={{ textAlign: 'center', fontFamily: 'OsnovaPro' }}> Wallet</Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderPromos = () => {
    return (
      <View style={{ marginTop: 3, paddingVertical: 20, paddingHorizontal: 25, backgroundColor: colors.white }}>
        <View>
          <ImageBackground source={promoPoster} style={{ width: 130, height: 150, borderRadius: 10 }} imageStyle={{ borderRadius: 10 }} />
        </View>
      </View>
    );
  };

  render() {
    return (
      <ScrollView onScroll={this.onScroll}>
        {this.renderHeader()}
        {this.renderPointInfo()}
        {this.renderTopUp()}
        {this.renderMenuGrid()}
        {this.renderPromos()}
        <Text style={{ textAlign: 'justify', marginBottom: 30 }}> This is home screen page. The screen page is a home page that show home page. What an awful page. This is home screen page. The screen page is a home page that show home page. What an awful page. This is home screen page. The screen page is a home page that show home page. What an awful page.</Text>
        <Text style={{ textAlign: 'justify', marginBottom: 30 }}> This is home screen page. The screen page is a home page that show home page. What an awful page. This is home screen page. The screen page is a home page that show home page. What an awful page. This is home screen page. The screen page is a home page that show home page. What an awful page.</Text>
        <Text style={{ textAlign: 'justify', marginBottom: 30 }}> This is home screen page. The screen page is a home page that show home page. What an awful page. This is home screen page. The screen page is a home page that show home page. What an awful page. This is home screen page. The screen page is a home page that show home page. What an awful page.</Text>
        <Text style={{ textAlign: 'justify', marginBottom: 30 }}> This is home screen page. The screen page is a home page that show home page. What an awful page. This is home screen page. The screen page is a home page that show home page. What an awful page. This is home screen page. The screen page is a home page that show home page. What an awful page.</Text>
        <Text style={{ textAlign: 'justify', marginBottom: 30 }}> This is home screen page. The screen page is a home page that show home page. What an awful page. This is home screen page. The screen page is a home page that show home page. What an awful page. This is home screen page. The screen page is a home page that show home page. What an awful page.</Text>
        <Text style={{ textAlign: 'justify', marginBottom: 30 }}> This is home screen page. The screen page is a home page that show home page. What an awful page. This is home screen page. The screen page is a home page that show home page. What an awful page. This is home screen page. The screen page is a home page that show home page. What an awful page.</Text>
        <Text style={{ textAlign: 'justify', marginBottom: 30 }}> This is home screen page. The screen page is a home page that show home page. What an awful page. This is home screen page. The screen page is a home page that show home page. What an awful page. This is home screen page. The screen page is a home page that show home page. What an awful page.</Text>
        <Text style={{ textAlign: 'justify', marginBottom: 30 }}> This is home screen page. The screen page is a home page that show home page. What an awful page. This is home screen page. The screen page is a home page that show home page. What an awful page. This is home screen page. The screen page is a home page that show home page. What an awful page.</Text>
        <Text style={{ textAlign: 'justify', marginBottom: 30 }}> This is home screen page. The screen page is a home page that show home page. What an awful page. This is home screen page. The screen page is a home page that show home page. What an awful page. This is home screen page. The screen page is a home page that show home page. What an awful page.</Text>
        <Text style={{ textAlign: 'justify', marginBottom: 30 }}> This is home screen page. The screen page is a home page that show home page. What an awful page. This is home screen page. The screen page is a home page that show home page. What an awful page. This is home screen page. The screen page is a home page that show home page. What an awful page.</Text>
        <Text style={{ textAlign: 'justify', marginBottom: 30 }}> This is home screen page. The screen page is a home page that show home page. What an awful page. This is home screen page. The screen page is a home page that show home page. What an awful page. This is home screen page. The screen page is a home page that show home page. What an awful page.</Text>
        <Text style={{ textAlign: 'justify', marginBottom: 30 }}> This is home screen page. The screen page is a home page that show home page. What an awful page. This is home screen page. The screen page is a home page that show home page. What an awful page. This is home screen page. The screen page is a home page that show home page. What an awful page.</Text>
        <Text style={{ textAlign: 'justify', marginBottom: 30 }}> This is home screen page. The screen page is a home page that show home page. What an awful page. This is home screen page. The screen page is a home page that show home page. What an awful page. This is home screen page. The screen page is a home page that show home page. What an awful page.</Text>
        <Text style={{ textAlign: 'justify', marginBottom: 30 }}> This is home screen page. The screen page is a home page that show home page. What an awful page. This is home screen page. The screen page is a home page that show home page. What an awful page. This is home screen page. The screen page is a home page that show home page. What an awful page.</Text>
        <Text style={{ textAlign: 'justify', marginBottom: 30 }}> This is home screen page. The screen page is a home page that show home page. What an awful page. This is home screen page. The screen page is a home page that show home page. What an awful page. This is home screen page. The screen page is a home page that show home page. What an awful page.</Text>
        <Text style={{ textAlign: 'justify', marginBottom: 30 }}> This is home screen page. The screen page is a home page that show home page. What an awful page. This is home screen page. The screen page is a home page that show home page. What an awful page. This is home screen page. The screen page is a home page that show home page. What an awful page.</Text>
        <Text style={{ textAlign: 'justify', marginBottom: 30 }}> This is home screen page. The screen page is a home page that show home page. What an awful page. This is home screen page. The screen page is a home page that show home page. What an awful page. This is home screen page. The screen page is a home page that show home page. What an awful page.</Text>
      </ScrollView>
    );
  };
}

export { Home };
