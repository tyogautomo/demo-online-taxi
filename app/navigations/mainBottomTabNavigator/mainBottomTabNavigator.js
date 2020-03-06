import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Home } from '../screenConfig';

const BottomTab = createBottomTabNavigator();

const MainBottomTabNavigator = () => {
  return (
    <BottomTab.Navigator tabBarOptions={{ showLabel: false }}>
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: () => (
            <View style={{ width: 80, height: 80, backgroundColor: '#8de08b', borderRadius: 40, elevation: 2, marginBottom: 40 }}>

            </View>
          ),
        }} />
    </BottomTab.Navigator>
  );
};

export { MainBottomTabNavigator };
