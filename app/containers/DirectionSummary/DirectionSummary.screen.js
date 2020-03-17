import React, { Component } from 'react';
import { View, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import IconAwesome from 'react-native-vector-icons/FontAwesome';

import { styles } from './DirectionSummary.style';
import { originPin, destinationPin } from '../../themes/images';
import { colors } from '../../themes/colors';

class DirectionSummary extends Component {
  state = {
    bottomMargin: 1,
    showsRoute: false,
    animatedRoutes: [],
    rideList: [{
      name: 'TaxiBike',
      cost: '13K',
      desc: '',
      icon: 'motorcycle'
    },
    {
      name: 'TaxiCar',
      cost: '18K',
      desc: '1 - 4 seats',
      icon: 'car'
    }]
  };

  componentDidMount() {
    this.mapFitMarker();
    // this.getRoute();
  };

  getRoute = async () => {
    const {
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
    this.animatingRoutes(0);
  };

  animatingRoutes = (i) => {
    const { directionRoutes } = this.props;

    if (i < directionRoutes.length) {
      setTimeout(() => {
        this.setState(prevState => ({ animatedRoutes: [...prevState.animatedRoutes, directionRoutes[i]] }), () => {
          i++;
          this.animatingRoutes(i);
        })
      }, 0);
    }
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

  renderRoutes = () => {
    const { animatedRoutes } = this.state
    return (
      <Polyline
        strokeWidth={4}
        strokeColor={colors.greenHaze}
        coordinates={animatedRoutes}
        lineJoin="miter"
        miterLimit={20}
      />
    );
  };

  renderCostSheet = () => {
    return (
      <View style={styles.summarySheetContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15 }}>
          <Text style={{ fontFamily: 'OsnovaProBold' }}>Suggested Rides</Text>
          <Text style={{ fontFamily: 'OsnovaProBold', color: colors.skyBlue }}>View All</Text>
        </View>
        {this.renderRideList()}
      </View>
    )
  }

  renderRideList = () => {
    const { rideList } = this.state;
    return (
      <View>
        {rideList.map((ride, index) => (
          this.renderRideItem(ride, index)
        ))}
      </View>
    );
  };

  renderRideItem = (ride, index) => {
    return (
      <View style={{ paddingHorizontal: 10, paddingVertical: 20, flexDirection: 'row', alignItems: 'center', borderRadius: 7, borderWidth: 1, marginBottom: 8, borderColor: colors.greenHaze }} key={index}>
        <View style={{ flex: 1 }}>
          <IconAwesome name={ride.icon} color={colors.greenHaze} size={30} />
        </View>
        <View style={{ flex: 3 }}>
          <Text style={{ fontFamily: 'OsnovaProBold', fontSize: 16 }}>{ride.name}</Text>
          <Text style={{ fontFamily: 'OsnovaPro', fontSize: 13 }}>{ride.desc}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          <Text>IDR. </Text>
          <Text>{ride.cost}</Text>
        </View>
      </View>
    )
  };

  renderFinance = () => {
    
  }

  renderMap = () => {
    const { bottomMargin } = this.state;
    const { originPoint: { geometry: { location } } } = this.props;
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
          ref={ref => { this.mapRef = ref }}
          provider={PROVIDER_GOOGLE}
          customMapStyle={customStyle}
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
          {this.renderRoutes()}
        </MapView>
      </View >
    )
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.renderMap()}
        {this.renderCostSheet()}
      </View>
    )
  }
}

export { DirectionSummary };
