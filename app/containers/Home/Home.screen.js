import React, { Component } from 'react';
import { View, Text, ScrollView, Animated } from 'react-native';

class Home extends Component {
  offset = 0;
  state = {
    animatedBottom: new Animated.Value(0),
    scrolledToTop: false
  }

  componentDidMount() {
    this.setInitialParam();
  }

  onScroll = (e) => {
    const currentOffsetY = e.nativeEvent.contentOffset.y;
    const velocity = e.nativeEvent.velocity.y
    if ((currentOffsetY > this.offset) && velocity > 0.4) {
      if (this.state.scrolledToTop === false) {
        this.setState({ scrolledToTop: true }, () => {
          Animated.timing(
            this.state.animatedBottom,
            {
              toValue: -100,
              duration: 200
            }
          ).start();
        })
      }
    } else if ((currentOffsetY < this.offset) && velocity > -0.4) {
      if (this.state.scrolledToTop === true) {
        this.setState({ scrolledToTop: false }, () => {
          Animated.timing(
            this.state.animatedBottom,
            {
              toValue: 0,
              duration: 200
            }
          ).start();
        })
      }
    }
    this.offset = currentOffsetY;
  }

  setInitialParam = () => {
    const { navigation } = this.props;
    navigation.setParams({
      bottom: this.state.animatedBottom
    })
  };

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
