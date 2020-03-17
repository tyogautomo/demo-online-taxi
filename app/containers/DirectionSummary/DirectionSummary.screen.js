import React, { Component } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { styles } from './DirectionSummary.style';
import { originPin, destinationPin } from '../../themes/images';

class DirectionSummary extends Component {
  state = {
    bottomMargin: 1,
  };

  componentDidMount() {
    this.mapFitMarker();
  };

  mapFitMarker = () => {
    setTimeout(() => {
      this.mapRef.fitToSuppliedMarkers(['origin', 'destination'], {
        edgePadding: {
          top: 130,
          bottom: 80,
          left: 80,
          right: 80
        }
      });
    }, 800);
  };

  renderOriginMarker = () => {
    const { originPoint: { geometry: { location } } } = this.props;
    return (
      <Marker
        coordinate={{
          latitude: location.lat,
          longitude: location.lng
        }}
        image={originPin}
        identifier='origin'
      />
    );
  };

  renderDestinationMarker = () => {
    const { destinationPoint: { geometry: { location } } } = this.props;
    return (
      <Marker
        coordinate={{
          latitude: location.lat,
          longitude: location.lng
        }}
        image={destinationPin}
        identifier='destination'
      />
    );
  }

  renderMap = () => {
    const { bottomMargin } = this.state;
    const { originPoint: { geometry: { location } } } = this.props;

    return (
      <View>
        <MapView
          ref={ref => { this.mapRef = ref }}
          style={{ ...styles.mapContainer, marginBottom: bottomMargin }}
          onMapReady={() => this.setState({ bottomMargin: 0 })}
          camera={{
            center: {
              latitude: location.lat,
              longitude: location.lng
            },
            pitch: 0,
            heading: 0,
            altitude: 1,
            zoom: 16
          }}
          showsUserLocation
        >
          {this.renderOriginMarker()}
          {this.renderDestinationMarker()}
        </MapView>
      </View >
    )
  };

  render() {
    return (
      <View>
        {this.renderMap()}
      </View>
    )
  }
}

export { DirectionSummary };
