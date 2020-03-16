import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Animated } from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import IconEntypo from 'react-native-vector-icons/Entypo';
import TextTicker from 'react-native-text-ticker';

import { styles } from './ChooseOrigin.style';
import { colors } from '../../themes/colors';
import { pin } from '../../themes/images';

class ChooseOrigin extends Component {
  state = {
    currentLocation: { latitude: 0, longitude: 0, },
    bottomMargin: 1,
    bookNow: true,
    topPin: new Animated.Value(3),
    scaleX: new Animated.Value(2),
    isDragged: false
  };

  componentDidMount() {
    this.getCurrentLocation();
  };

  onPressTime = (status) => {
    if (status === 'now') {
      this.setState({ bookNow: true });
    } else {
      this.setState({ bookNow: false });
    }
  };

  onSuccessLocation = (info) => {
    const { coords } = info;
    this.setState({
      currentLocation: {
        latitude: coords.latitude,
        longitude: coords.longitude
      }
    })
  };

  onErrorLocation = (error) => {
    console.log(error, 'from error <<<<<<');
  };

  onRegionChangeComplete = (info) => {
    const { requestPointAddress } = this.props;

    const { topPin, scaleX } = this.state;
    Animated.parallel([
      Animated.timing(topPin, { toValue: 3, duration: 300 }),
      Animated.timing(scaleX, { toValue: 2, duration: 300 })
    ]).start(() => {
      console.log(info)
      const longLat = {
        latitude: info.latitude,
        longitude: info.longitude
      }
      requestPointAddress(longLat);
      this.setState({ isDragged: false });
    });
  };

  onTouchStart = () => {
    const { topPin, scaleX } = this.state;
    Animated.parallel([
      Animated.timing(topPin, { toValue: -4, duration: 300 }),
      Animated.timing(scaleX, { toValue: 4, duration: 300 })
    ]).start();
  };

  onTouchEnd = () => {
    const { topPin, scaleX } = this.state;
    Animated.parallel([
      Animated.timing(topPin, { toValue: 3, duration: 300 }),
      Animated.timing(scaleX, { toValue: 2, duration: 300 })
    ]).start();
  };

  onPanDrag = () => {
    const { isDragged } = this.state;
    if (!isDragged) {
      this.setState({ isDragged: true });
    }
  };

  onPressDestination = () => {
    const { navigation } = this.props;
    navigation.navigate('ChooseDestination');
  };

  getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      this.onSuccessLocation,
      this.onErrorLocation,
      { enableHighAccuracy: true }
    );
  };

  renderDirectionSummary = () => {
    const { bookNow, isDragged } = this.state;
    const { originPoint: { formatted_address } } = this.props;

    return (
      <View style={styles.summaryContainer}>
        <View style={styles.timeContainer}>
          <Text style={styles.textNow(bookNow)} onPress={() => this.onPressTime('now')}>Now</Text>
          <Text style={styles.textLater(bookNow)} onPress={() => this.onPressTime('later')}>Later</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.directionIconContainer}>
            <IconAwesome name="dot-circle-o" size={25} color={colors.danube} />
            <IconEntypo name="dots-three-vertical" size={18} color={colors.silver} />
            <IconEntypo name="location-pin" size={28} color={colors.chestnutRose} />
          </View>
          <View style={styles.directionTextContainer}>
            <View>
              <TextTicker
                style={{ fontFamily: 'OsnovaPro' }}
                duration={7000}
                loop
                repeatSpacer={200}
                marqueeDelay={800}
              >
                {isDragged ?
                  'Searching ...' : formatted_address ?
                    `${formatted_address.slice(0, 50)}...` : 'Searching ... '}
              </TextTicker>
            </View>
            <View style={styles.separatorDirection} />
            <TouchableOpacity onPress={this.onPressDestination}>
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
          <Animated.View style={{ width: 5, height: 5, backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 20, transform: [{ scaleX: scaleX }] }} />
        </View>
      </View>
    );
  };

  renderMaps = () => {
    const { bottomMargin, currentLocation } = this.state;

    return (
      <View>
        <MapView
          style={{ ...styles.mapContainer, marginBottom: bottomMargin }}
          onMapReady={() => this.setState({ bottomMargin: 0 })}
          onRegionChangeComplete={this.onRegionChangeComplete}
          onTouchStart={this.onTouchStart}
          onTouchEnd={this.onTouchEnd}
          onPanDrag={this.onPanDrag}
          camera={{
            center: currentLocation,
            pitch: 0,
            heading: 0,
            altitude: 1,
            zoom: 16
          }}
          showsUserLocation
        >
        </MapView>
        {this.renderOriginPin()}
        {this.renderDirectionSummary()}
      </View >
    );
  };

  render() {
    return (
      <View>
        {this.renderMaps()}
      </View>
    );
  };
}

export { ChooseOrigin };
