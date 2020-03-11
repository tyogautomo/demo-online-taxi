import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Animated } from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import IconEntypo from 'react-native-vector-icons/Entypo';

import { styles } from './ChooseOrigin.style';
import { colors } from '../../themes/colors';
import { pin } from '../../themes/images';

class ChooseOrigin extends Component {
  state = {
    location: { latitude: 0, longitude: 0, },
    bottomMargin: 1,
    bookNow: true,
    topPin: new Animated.Value(3),
    scaleX: new Animated.Value(2)
  };

  componentDidMount() {
    this.getCurrentLocation();
  }

  onPressTime = (status) => {
    if (status === 'now') {
      this.setState({ bookNow: true });
    } else {
      this.setState({ bookNow: false });
    }
  }

  onSuccessLocation = (info) => {
    const { coords } = info;
    this.setState({
      location: {
        latitude: coords.latitude,
        longitude: coords.longitude
      }
    })
  };

  onRegionChangeComplete = (info) => {
    const { topPin, scaleX } = this.state;
    Animated.parallel([
      Animated.timing(topPin, { toValue: 3, duration: 300 }),
      Animated.timing(scaleX, { toValue: 2, duration: 300 })
    ]).start();
  }

  onTouchStart = () => {
    const { topPin, scaleX } = this.state;
    Animated.parallel([
      Animated.timing(topPin, { toValue: -4, duration: 300 }),
      Animated.timing(scaleX, { toValue: 4, duration: 300 })
    ]).start();
  }

  onTouchEnd = () => {
    const { topPin, scaleX } = this.state;
    Animated.parallel([
      Animated.timing(topPin, { toValue: 3, duration: 300 }),
      Animated.timing(scaleX, { toValue: 2, duration: 300 })
    ]).start();
  }

  onErrorLocation = (error) => {
    console.log(error, 'from error <<<<<<');
  };

  getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      this.onSuccessLocation,
      this.onErrorLocation,
      { enableHighAccuracy: true }
    );
  };

  renderDirectionSummary = () => {
    const { bookNow } = this.state;

    return (
      <View style={styles.summaryContainer}>
        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          <Text style={styles.textNow(bookNow)} onPress={() => this.onPressTime('now')}>Now</Text>
          <Text style={styles.textLater(bookNow)} onPress={() => this.onPressTime('later')}>Later</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ alignItems: 'center', justifyContent: 'space-between', height: 90 }}>
            <IconAwesome name="dot-circle-o" size={25} color={colors.danube} />
            <IconEntypo name="dots-three-vertical" size={18} color={colors.silver} />
            <IconEntypo name="location-pin" size={28} color={colors.chestnutRose} />
          </View>
          <View style={{ justifyContent: 'space-between', height: 90, paddingVertical: 3, paddingLeft: 10, flex: 1 }}>
            <View>
              <Text style={{fontFamily: 'OsnovaPro'}}>Jl. Tanah Kusir II No. 15 A</Text>
            </View>
            <View style={{ borderBottomWidth: 1, width: '100%', height: 1, backgroundColor: colors.silver, borderColor: colors.silver }} />
            <TouchableOpacity>
              <Text style={{ color: colors.silver, fontFamily: 'OsnovaPro' }}>Where to go?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  renderOriginPin = () => {
    const { topPin, scaleX } = this.state;
    return (
      <View style={styles.originPinContainer}>
        <View style={{ alignItems: 'center', bottom: 13 }}>
          <Animated.Image source={pin} style={{ width: 25, height: 25, top: topPin }} />
          <Animated.View style={{ width: 5, height: 5, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 20, transform: [{ scaleX: scaleX }] }} />
        </View>
      </View>
    );
  };

  renderMaps = () => {
    const { location, bottomMargin } = this.state;

    return (
      <View>
        <MapView
          style={{ ...styles.mapContainer, marginBottom: bottomMargin }}
          onMapReady={() => this.setState({ bottomMargin: 0 })}
          onRegionChangeComplete={this.onRegionChangeComplete}
          onTouchStart={this.onTouchStart}
          onTouchEnd={this.onTouchEnd}
          region={{
            ...location,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation
        >
        </MapView>
        {this.renderOriginPin()}
        {this.renderDirectionSummary()}
      </View>
    );
  };

  render() {
    return (
      <View>
        {this.renderMaps()}
        <Text>This is choose origin page</Text>
      </View>
    );
  };
}

export { ChooseOrigin };
