import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IconAwesome from 'react-native-vector-icons/FontAwesome';

import { Home, ChooseDestination, ChooseOrigin } from '../screenConfig';

const BottomTab = createBottomTabNavigator();

const MainBottomTabNavigator = () => {
  return (
    <BottomTab.Navigator tabBarOptions={{ showLabel: false }}>
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: () => (
            <View style={{ width: 80, height: 80, backgroundColor: '#039A34', borderRadius: 40, elevation: 2, marginBottom: 40 }}>

            </View>
          ),
        }} />
    </BottomTab.Navigator>
  );
};

export { MainBottomTabNavigator };
