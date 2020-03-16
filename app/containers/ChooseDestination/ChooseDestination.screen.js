import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import IconEntypo from 'react-native-vector-icons/Entypo';
import TextTicker from 'react-native-text-ticker';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import { colors } from '../../themes/colors';
import { styles } from './ChooseDestination.style';
import { pin, originPin } from '../../themes/images';

class ChooseDestination extends Component {
  state = {
    currentLocation: { latitude: 0, longitude: 0, },
    bottomMargin: 1,
    topPin: new Animated.Value(3),
    scaleX: new Animated.Value(2),
  };

  componentDidMount() {
    this.getCurrentLocation();
    this.setOriginPinPosition();
  };

  onSuccessLocation = (info) => {

  };

  onErrorLocation = (error) => {
    console.log(error, 'from error <<<<<<');
  };

  onPressOrigin = () => {
    const { navigation } = this.props;
    navigation.goBack();
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

  getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      this.onSuccessLocation,
      this.onErrorLocation,
      { enableHighAccuracy: true }
    );
  };

  setOriginPinPosition = () => {
    const { originPoint } = this.props;

    this.setState({
      currentLocation: {
        latitude: originPoint.geometry.location.lat,
        longitude: originPoint.geometry.location.lng
      }
    })
  };

  renderMyLocationButton = () => {
    return (
      <TouchableOpacity style={{ width: 30, height: 30, backgroundColor: 'white' }}>
        <Text>Button</Text>
      </TouchableOpacity>
    )
  };

  renderDirectionSummary = () => {
    const { originPoint } = this.props;

    return (
      <View style={styles.summaryContainer}>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.directionIconContainer}>
            <IconAwesome name="dot-circle-o" size={25} color={colors.danube} />
            <IconEntypo name="dots-three-vertical" size={18} color={colors.silver} />
            <IconEntypo name="location-pin" size={28} color={colors.chestnutRose} />
          </View>
          <View style={styles.directionTextContainer}>
            <TouchableOpacity onPress={this.onPressOrigin}>
              <TextTicker
                style={{ fontFamily: 'OsnovaPro' }}
                duration={7000}
                loop
                repeatSpacer={200}
                marqueeDelay={800}
              >
                {originPoint.formatted_address.slice(0, 50)}
              </TextTicker>
            </TouchableOpacity>
            <View style={styles.separatorDirection} />
            <TouchableOpacity activeOpacity={0.8} onPress={this.onPressDestination}>
              <Text style={{ color: colors.silver, fontFamily: 'OsnovaPro' }}>Where to go?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  renderChoosePin = () => {
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

  renderOriginMarker = () => {
    const { originPoint } = this.props;

    return (
      <Marker
        coordinate={{
          latitude: originPoint.geometry.location.lat,
          longitude: originPoint.geometry.location.lng
        }}
        image={originPin}
      />
    );
  };

  renderMap = () => {
    const { currentLocation, bottomMargin } = this.state;

    return (
      <View>
        <MapView
          style={{ ...styles.mapContainer, marginBottom: bottomMargin }}
          onMapReady={() => this.setState({ bottomMargin: 0 })}
          // onRegionChangeComplete={this.onRegionChangeComplete}
          onTouchStart={this.onTouchStart}
          onTouchEnd={this.onTouchEnd}
          // onPanDrag={this.onPanDrag}
          camera={{
            center: currentLocation,
            pitch: 0,
            heading: 0,
            altitude: 1,
            zoom: 16
          }}
          showsUserLocation
          showsMyLocationButton={false}
        >
          {this.renderOriginMarker()}
        </MapView>
      </View >
    )
  }

  render() {
    return (
      <View>
        {this.renderMap()}
        {this.renderChoosePin()}
        {this.renderDirectionSummary()}
      </View>
    )
  }
}

export { ChooseDestination };

