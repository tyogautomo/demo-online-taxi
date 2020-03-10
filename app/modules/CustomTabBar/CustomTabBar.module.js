import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Animated } from 'react-native';
import IconAwesome from 'react-native-vector-icons/FontAwesome';

import { colors } from '../../themes/colors';
import { styles } from './CustomTabBar.style';

const CustomTabBar = ({ state, descriptors, navigation, route }) => {
  const [scale] = useState(new Animated.Value(1));

  return (
    <Animated.View style={{ ...styles.tabBarContainer, bottom: state.routes[0].params?.bottom }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;
        let icon = '';
        switch (options.title) {
          case 'Home':
            icon = 'home'
            break;
          case 'Profile':
            icon = 'user'
            break;
          default:
            break;
        }
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            if (index === 1) {
              Animated.sequence([
                Animated.timing(
                  scale,
                  {
                    toValue: 1.2,
                    duration: 100
                  }
                ),
                Animated.timing(
                  scale,
                  {
                    toValue: 1,
                    duration: 100
                  }
                )
              ]).start(() => {
                Animated.timing(
                  state.routes[0].params?.bottom,
                  { toValue: -100, duration: 100 }
                ).start(() => {
                  navigation.navigate(route.name);
                })
              })
            } else {
              navigation.navigate(route.name);
            }
          }
        };

        return (
          <TouchableOpacity
            onPress={onPress}
            key={index}
            style={{ ...styles.tabMenuContainer }}
            activeOpacity={0.9}>
            <View style={{ alignItems: 'center' }}>
              {index === 1 ? (
                <Animated.View style={{ ...styles.rideIcon, transform: [{ scale: scale }] }}>
                  <IconAwesome name="motorcycle" color="white" size={30} />
                </Animated.View>
              ) : (
                  <IconAwesome name={icon} color={isFocused ? colors.salem : colors.silver} size={30} />
                )}
              <Text style={{ fontSize: 11, color: isFocused ? colors.salem : colors.silver }}>{label}</Text>
            </View>
          </TouchableOpacity>
        )
      })}
    </Animated.View>
  )
};

export { CustomTabBar };
