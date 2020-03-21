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
    isDragged: false
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

  onPanDrag = () => {
    const { isDragged } = this.state;
    if (!isDragged) {
      this.setState({ isDragged: true });
    }
  };

  onRegionChangeComplete = (info) => {
    const { requestDestinationPoint } = this.props;

    const { topPin, scaleX } = this.state;
    Animated.parallel([
      Animated.timing(topPin, { toValue: 3, duration: 300 }),
      Animated.timing(scaleX, { toValue: 2, duration: 300 })
    ]).start(() => {
      const longLat = {
        latitude: info.latitude,
        longitude: info.longitude
      };
      requestDestinationPoint(longLat);
      this.setState({ isDragged: false });
    });
  };

  onPressBringMe = async () => {
    const {
      navigation,
      requestDirectionRoute,
      originPoint: {
        geometry: { location: originLoc }
      },
      destinationPoint: {
        geometry: { location: destinationLoc }
      }
    } = this.props;

    const payload = {
      origin: `${originLoc.lat},${originLoc.lng}`,
      destination: `${destinationLoc.lat},${destinationLoc.lng}`
    }
    await requestDirectionRoute(payload);
    navigation.navigate('DirectionSummary');
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
    const { originPoint, destinationPoint } = this.props;

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
                {`${originPoint.formatted_address.slice(0, 50)}...`}
              </TextTicker>
            </TouchableOpacity>
            <View style={styles.separatorDirection} />
            <TouchableOpacity activeOpacity={0.8} onPress={this.onPressDestination}>
              <TextTicker
                style={{ fontFamily: 'OsnovaPro' }}
                duration={7000}
                loop
                repeatSpacer={200}
                marqueeDelay={800}
              >
                {
                  `${destinationPoint.formatted_address.slice(0, 50)}...` ||
                  <Text style={{ fontFamily: 'OsnovaProBold' }}>I'm going to..</Text>
                }
              </TextTicker>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  renderChoosePin = () => {
    const { topPin, scaleX } = this.state;
    const { isRequestDestinationPoint } = this.props;
    return (
      <View style={styles.originPinContainer}>
        <TouchableOpacity activeOpacity={0.8} style={styles.bringMeContainer(isRequestDestinationPoint)} onPress={this.onPressBringMe} disabled={isRequestDestinationPoint}>
          <Text style={{ fontFamily: 'OsnovaPro' }}>{isRequestDestinationPoint ? 'Loading..' : 'Bring Me Here'}</Text>
        </TouchableOpacity>
        <View style={{ alignItems: 'center', bottom: 28 }}>
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
    const customStyle = [
      {
        "featureType": "poi.business",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      }
    ]

    return (
      <View>
        <MapView
          style={{ ...styles.mapContainer, marginBottom: bottomMargin }}
          customMapStyle={customStyle}
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
          showsMyLocationButton={false}
        >
          {this.renderOriginMarker()}
        </MapView>
      </View >
    )
  };

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

