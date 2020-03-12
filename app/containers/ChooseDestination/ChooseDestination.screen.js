import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import IconEntypo from 'react-native-vector-icons/Entypo';
import TextTicker from 'react-native-text-ticker';
import MapView from 'react-native-maps';

import { colors } from '../../themes/colors';
import { styles } from './ChooseDestination.style';

class ChooseDestination extends Component {
  state = {
    currentLocation: { latitude: -6.249931, longitude: 106.783840, },
    bottomMargin: 1,
  }

  renderDirectionSummary = () => {
    return (
      <View style={styles.summaryContainer}>
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
                Jl. Tanah Kusir II No. 15 A Kebayoran Lama Selatan
              </TextTicker>
            </View>
            <View style={styles.separatorDirection} />
            <TouchableOpacity activeOpacity={0.8} onPress={this.onPressDestination}>
              <Text style={{ color: colors.silver, fontFamily: 'OsnovaPro' }}>Where to go?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  renderMap = () => {
    const { currentLocation, bottomMargin } = this.state;

    return (
      <View>
        <MapView
          style={{ ...styles.mapContainer, marginBottom: bottomMargin }}
          onMapReady={() => this.setState({ bottomMargin: 0 })}
          // onRegionChangeComplete={this.onRegionChangeComplete}
          // onTouchStart={this.onTouchStart}
          // onTouchEnd={this.onTouchEnd}
          // onPanDrag={this.onPanDrag}
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
      </View >
    )
  }

  render() {
    return (
      <View>
        {this.renderMap()}
        {this.renderDirectionSummary()}
      </View>
    )
  }
}

export { ChooseDestination };

