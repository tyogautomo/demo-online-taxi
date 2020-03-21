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
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconAwesome from 'react-native-vector-icons/FontAwesome';

import { styles } from './Home.style';
import { colors } from '../../themes/colors';
import { promoPoster, promoPoster2 } from '../../themes/images';

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
    } else if ((currentOffsetY < this.offset) && velocity < -0.5 && (scrolledToTop === true)) {
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
          <View style={styles.moneyBalanceIconContainer}>
              <IconAwesome name="gratipay" color={colors.gigas} size={15} />
          </View>
          <Text style={{ fontFamily: 'OsnovaProBold' }}>IDR. </Text><Text style={{ fontFamily: 'OsnovaPro' }}>6.174.867</Text>
        </View>
        <View style={{ width: 2 }} />
        <View style={{ flex: 1, height: 50, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 }}>
          <View style={styles.moneyBalanceIconContainer} >
              <IconMaterial name="star-four-points" size={12} color={colors.gigas} />
          </View>
          <Text style={{ fontFamily: 'OsnovaPro' }}>476 </Text><Text style={{ fontFamily: 'OsnovaProBold' }}>Points</Text>
        </View>
      </View>
    );
  };

  renderMenuGrid = () => {
    const { data } = this.state;

    return (
      <View style={styles.menuContainer}>
        {data.map((item, index) => (
          <TouchableOpacity key={item} activeOpacity={0.8}>
            <ImageBackground style={styles.menuItem(data.length, index)}>
              {index === data.length - 1 ? (
                <IconEntypo name="dots-three-horizontal" size={24} />
              ) : (
                  <IconMaterial name="food" size={29} color={colors.white} />
                )}
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  renderTopUp = () => {
    return (
      <View style={{ justifyContent: 'space-around', backgroundColor: colors.white, marginTop: 6, paddingVertical: 20, flexDirection: 'row' }}>
        <TouchableOpacity activeOpacity={0.8} style={{ flexDirection: 'row', height: 40, backgroundColor: colors.white, elevation: 2, borderRadius: 5, paddingVertical: 10, paddingHorizontal: 15, justifyContent: 'center', alignItems: 'center' }}>
          <IconAnt name="wallet" size={20} color={colors.greenHaze} style={{ marginRight: 10 }} />
          <Text style={{ textAlign: 'center', fontFamily: 'OsnovaProBold' }}>Top Up •</Text>
          <Text style={{ textAlign: 'center', fontFamily: 'OsnovaPro' }}> Wallet</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} style={{ flexDirection: 'row', height: 40, backgroundColor: colors.white, elevation: 2, borderRadius: 5, paddingVertical: 10, paddingHorizontal: 15, justifyContent: 'center', alignItems: 'center' }}>
          <IconAnt name="car" size={20} color={colors.greenHaze} style={{ marginRight: 10 }} />
          <Text style={{ textAlign: 'center', fontFamily: 'OsnovaProBold' }}>Ride to •</Text>
          <Text style={{ textAlign: 'center', fontFamily: 'OsnovaPro' }}> Home</Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderMainPromo = () => {
    return (
      <View style={{ width: '100%', borderRadius: 10, marginBottom: 10, backgroundColor: colors.white, elevation: 4, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
        <ImageBackground source={promoPoster2} style={{ width: '100%', height: 100, borderTopLeftRadius: 10, borderTopRightRadius: 10 }} imageStyle={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}></ImageBackground>
        <View style={{ paddingHorizontal: 7, paddingVertical: 9 }}>
          <Text style={{ fontFamily: 'OsnovaProBold', lineHeight: 20, textAlign: 'justify', fontSize: 12, marginBottom: 6 }}>Big Sale Up To 70% shop on this store</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <IconEntypo name="calendar" size={15} color={colors.silver} style={{ marginRight: 5 }} />
            <Text style={{ fontFamily: 'OsnovaPro', fontSize: 12, color: colors.silver }}>Until 20 Mar</Text>
          </View>
        </View>
      </View>
    );
  };

  renderPromos = () => {
    const { promos } = this.state;

    return (
      <View style={styles.promosContainer}>
        {this.renderMainPromo()}
        {promos.map(promo => this.renderPromoItem(promo))}
      </View>
    );
  };

  renderPromoItem = (promo) => {
    return (
      <TouchableOpacity activeOpacity={0.6} key={promo}>
        <View style={styles.promoItemContainer}>
          <ImageBackground source={promoPoster} style={styles.promoImageBackground} imageStyle={styles.promoImageStyle} />
          <View style={{ paddingHorizontal: 7, paddingVertical: 9 }}>
            <Text style={{ fontFamily: 'OsnovaProBold', lineHeight: 20, textAlign: 'justify', fontSize: 12, marginBottom: 6 }}>Big Sale Up To 70% shop on this store</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <IconEntypo name="calendar" size={15} color={colors.silver} style={{ marginRight: 5 }} />
              <Text style={{ fontFamily: 'OsnovaPro', fontSize: 12, color: colors.silver }}>Until 20 Mar</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
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
      </ScrollView>
    );
  };
}

export { Home };
