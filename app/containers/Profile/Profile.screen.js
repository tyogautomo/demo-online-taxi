import React, { Component } from 'react';
import { View, Text, Animated, Image, StyleSheet, findNodeHandle } from 'react-native';
import { BlurView } from '@react-native-community/blur';

// import { styles } from './Profile.style';
import { bgImage } from '../../themes/images';

class Profile extends Component {
  state = {
    viewRef: ''
  }

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

  imageLoaded = () => {
    this.setState({ viewRef: findNodeHandle(this.backgroundImage) })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Hi, I am some unblurred text</Text>
        <BlurView
          style={styles.absolute}
          viewRef={this.state.viewRef}
          blurType="light"
          blurAmount={20}
          blurRadius={20}
          downsampleFactor={20}
          overlayColor="white"
        >
          {/* <Text>I'm the BlurView content on both iOS and Android</Text> */}
        </BlurView>
        <Image
          ref={ref => this.backgroundImage = ref}
          source={bgImage}
          style={styles.absolute}
          onLoadEnd={this.imageLoaded.bind(this)}
        />
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'red'
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'white'
  }
});

export { Profile };
