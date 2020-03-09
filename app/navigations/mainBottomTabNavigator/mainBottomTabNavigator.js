import React from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import IconMaterial from 'react-native-vector-icons/MaterialIcons'

import { Home, ChooseOrigin, Profile } from '../screenConfig';
import { colors } from '../../themes/colors';

const BottomTab = createBottomTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={{ height: 60, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', elevation: 8 }}>
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
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            onPress={onPress}
            key={index}
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
            activeOpacity={0.9}>
            <View style={{ alignItems: 'center' }}>
              {index === 1 ? (
                <View style={{ width: 80, height: 80, backgroundColor: colors.salem, borderRadius: 40, elevation: 2, marginBottom: 30, justifyContent: 'center', alignItems: 'center' }}>
                  <IconAwesome name="motorcycle" color="white" size={30} />
                </View>
              ) : (
                  <IconAwesome name={icon} color={isFocused ? colors.salem : colors.silver} size={30} />
                )}
              <Text style={{ fontSize: 11, color: isFocused ? colors.salem : colors.silver }}>{label}</Text>
            </View>
          </TouchableOpacity>
        )
      })}
    </View>
  )
};

const MainBottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      tabBarOptions={{ activeTintColor: colors.salem }}
      tabBar={props => <CustomTabBar {...props} />}
    >
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={({ route }) => ({
          title: 'Home',
          tabBarIcon: ({ focused }) => <IconMaterial name="home" color={focused ? colors.salem : colors.silver} size={30} />,
        })}
      />
      <BottomTab.Screen
        name="ChooseDirection"
        component={ChooseOrigin}
        options={{
          tabBarLabel: () => null
        }} />
      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <IconAwesome name="user" color={focused ? colors.salem : colors.silver} size={27} />
        }}
      />
    </BottomTab.Navigator>
  );
};

export { MainBottomTabNavigator };
