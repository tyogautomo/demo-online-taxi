import React, { Component } from 'react';
import { View, Text } from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import IconEntypo from 'react-native-vector-icons/Entypo';

import { styles } from './ChooseOrigin.style';
import { colors } from '../../themes/colors';

class ChooseOrigin extends Component {
  state = {
    location: { latitude: 0, longitude: 0, },
    bottomMargin: 1,
    bookNow: true
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
          <View style={{ alignItems: 'center', justifyContent: 'space-between', height: 100 }}>
            <IconAwesome name="dot-circle-o" size={25} color={colors.danube} />
            <IconEntypo name="dots-three-vertical" size={18} color={colors.silver} />
            <IconEntypo name="location-pin" size={28} color={colors.chestnutRose} />
          </View>
          <View>

          </View>
        </View>
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
