import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';

class Home extends Component {
  offset = 0;
  componentDidMount() {
    this.setInitialParam();
  }

  onScroll = (e) => {
    const { navigation } = this.props;
    const currentOffsetY = e.nativeEvent.contentOffset.y;
    if (currentOffsetY > this.offset) {
      navigation.setParams({ isTabVisible: false })
    }
    if (currentOffsetY < this.offset) {
      navigation.setParams({ isTabVisible: true })
    }
    this.offset = currentOffsetY;
  }

  setInitialParam = () => {
    const { navigation } = this.props;
    navigation.setParams({ isTabVisible: true })
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
