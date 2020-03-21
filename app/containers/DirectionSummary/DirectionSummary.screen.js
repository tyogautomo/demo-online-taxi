import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';

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
    }],
    type: 'TaxiBike'
  };

  componentDidMount() {
    this.animatingRoutes(0);
  };

  onPressItem = (type) => {
    this.setState({ type })
  }

  onPressBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  }

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
    const { directionRoutes } = this.props;

    this.mapRef.fitToCoordinates(directionRoutes, {
      edgePadding: {
        top: 130,
        bottom: 40,
        left: 40,
        right: 40
      }
    });
  };

  renderBackButton = () => {
    return (
      <View style={{ position: 'absolute', margin: 20 }}>
        <TouchableOpacity style={{ backgroundColor: colors.white, padding: 5, borderRadius: 20, elevation: 4 }} onPress={this.onPressBack}>
          <IconMaterial name="keyboard-arrow-left" size={30} />
        </TouchableOpacity>
      </View>
    )
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
  };

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
        {this.renderFinance()}
        {this.renderBookButtons()}
      </View>
    )
  };

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
    const { type } = this.state;
    return (
      <TouchableOpacity activeOpacity={0.7} style={styles.rideItem(type, ride.name)} key={index} onPress={() => this.onPressItem(ride.name)}>
        <View style={{ flex: 1 }}>
          <IconAwesome name={ride.icon} color={colors.greenHaze} size={30} />
        </View>
        <View style={{ flex: 3 }}>
          <Text style={{ fontFamily: 'OsnovaProBold', fontSize: 16 }}>{ride.name}</Text>
          {ride.desc ? (
            <Text style={{ fontFamily: 'OsnovaPro', fontSize: 13 }}>{ride.desc}</Text>
          ) : null}
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', flex: 1 }}>
          <Text style={{ fontSize: 12, color: colors.silver }}>IDR. </Text>
          <Text style={{ fontFamily: 'OsnovaPro', fontSize: 16 }}>{ride.cost}</Text>
        </View>
      </TouchableOpacity>
    )
  };

  renderFinance = () => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
        <View style={styles.financeInfoContainer}>
          <Text style={styles.payType}>Cash</Text>
          <View>
            <Text style={styles.balanceTitle}>Balance</Text>
            <Text style={styles.balance}>IDR 234.987</Text>
          </View>
        </View>
        <View style={styles.promoContainer}>
          <Text style={{ fontFamily: 'OsnovaPro' }}>Promo</Text>
        </View>
        <View style={styles.financeMenu}>
          <IconEntypo name="dots-three-horizontal" color={colors.silver} size={25} />
        </View>
      </View>
    )
  };

  renderBookButtons = () => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity activeOpacity={0.7}>
          <Text style={styles.bookButton}>Book</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7}>
          <Text style={styles.rightNowButton}>Priority</Text>
        </TouchableOpacity>
      </View>
    );
  };

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
    ];

    return (
      <View>
        <MapView
          ref={ref => { this.mapRef = ref }}
          provider={PROVIDER_GOOGLE}
          customMapStyle={customStyle}
          style={{ ...styles.mapContainer, marginBottom: bottomMargin }}
          onMapReady={() => this.setState({ bottomMargin: 0 })}
          onLayout={() => this.mapFitMarker()}
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
        {this.renderBackButton()}
      </View>
    )
  }
}

export { DirectionSummary };
