import React, { Component } from 'react';
import { View, Text } from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import { styles } from './ChooseOrigin.style';
import { colors } from '../../themes/colors';

class ChooseOrigin extends Component {
  state = {
    location: { latitude: 0, longitude: 0, },
    bottomMargin: 1
  };

  componentDidMount() {
    this.getCurrentLocation();
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
    return (
      <View style={{ position: 'absolute', width: '90%', height: 100, backgroundColor: colors.white, elevation: 4, borderRadius: 8, alignSelf: 'center', bottom: 0 }}>

      </View>
    )
  }

  renderMaps = () => {
    const { location, bottomMargin } = this.state;

    return (
      <View>
        <MapView
          style={{ ...styles.mapContainer, marginBottom: bottomMargin }}
          onMapReady={() => this.setState({ bottomMargin: 0 })}
          region={{
            ...location,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation
          showsMyLocationButton
          showsCompass
        >
        </MapView>
        {this.renderDirectionSummary()}
      </View>
    )
  }

  render() {
    return (
      <View>
        {this.renderMaps()}
        <Text>This is choose origin page</Text>
      </View>
    );
  }
}

export { ChooseOrigin };
