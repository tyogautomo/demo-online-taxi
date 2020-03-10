import React, { Component } from 'react';
import { View, Text, Animated } from 'react-native';

class Profile extends Component {
  componentDidMount() {
    this.onFocus();
  };

  onFocus = () => {
    const { navigation, bottom } = this.props;
    navigation.addListener('focus', () => {
      Animated.timing(
        bottom,
        {
          toValue: 0,
          duration: 200
        }
      ).start();
    })
  };

  render() {
    return (
      <View>
        <Text>This is profile page</Text>
      </View>
    );
  };
}

export { Profile };
