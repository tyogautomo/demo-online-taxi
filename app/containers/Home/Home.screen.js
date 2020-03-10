import React, { Component } from 'react';
import { View, Text, ScrollView, Animated } from 'react-native';

class Home extends Component {
  offset = 0;
  state = {
    scrolledToTop: false
  }

  componentDidMount() {
    this.onFocus();
  }

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
  }

  onScroll = (e) => {
    const { bottom } = this.props;
    const { scrolledToTop } = this.state;

    const currentOffsetY = e.nativeEvent.contentOffset.y;
    const velocity = e.nativeEvent.velocity.y
    if ((currentOffsetY > this.offset) && velocity > 0.4 && (scrolledToTop === false)) {
      this.setState({ scrolledToTop: true }, () => {
        Animated.timing(
          bottom,
          {
            toValue: -100,
            duration: 200
          }
        ).start();
      })
    } else if ((currentOffsetY < this.offset) && velocity < -0.5 && (scrolledToTop === true)) {
      this.setState({ scrolledToTop: false }, () => {
        Animated.timing(
          bottom,
          {
            toValue: 0,
            duration: 200
          }
        ).start();
      })
    }
    this.offset = currentOffsetY;
  }

  render() {
    return (
      <ScrollView onScroll={this.onScroll}>
        <Text>This is home screen</Text>
        <Text>This is home screen</Text>
        <Text>This is home screen</Text>
        <Text>This is home screen</Text>
        <Text>This is home screen</Text>
        <Text>This is home screen</Text>
        <Text>This is home screen</Text>
        <Text>This is home screen</Text>
        <Text>This is home screen</Text>
        <Text>This is home screen</Text>
        <Text>This is home screen</Text>
        <Text>This is home screen</Text>
        <Text>This is home screen</Text>
        <Text>This is home screen</Text>
        <Text>This is home screen</Text>
        <Text>This is home screen</Text>
        <Text>This is home screen</Text>
        <Text>This is home screen</Text>
        <Text>This is home screen</Text>
        <Text>This is home screen</Text>
        <Text>This is home screen</Text>
        <Text>This is home screen</Text>
        <Text>This is home screen</Text>
        <Text>This is home screen</Text>
        <Text>This is home screen</Text>
        <Text>This is home screen</Text>
        <Text>This is home screen</Text>
        <Text>This is home screen</Text>
        <Text>This is home screen</Text>
        <Text>This is home screen</Text>
        <Text>This is home screen</Text>
        <Text>This is home screen</Text>
        <Text>This is home screen</Text>
        <Text>This is home screen</Text>
        <Text>This is home screen</Text>
        <Text>This is home screen</Text>
        <Text>This is home screen</Text>
        <Text>This is home screen</Text>
        <Text>This is home screen</Text>
        <Text>This is home screen</Text>
        <Text>This is home screen</Text>
        <Text>This is home screen</Text>
        <Text>This is home screen</Text>
        <Text>This is home screen</Text>
        <Text>This is home screen</Text>
        <Text>This is home screen</Text>
        <Text>This is home screen</Text>
      </ScrollView>
    )
  }
}

export { Home };
