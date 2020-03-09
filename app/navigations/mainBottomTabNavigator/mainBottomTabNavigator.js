import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Home, ChooseOrigin, Profile } from '../screenConfig';
import { CustomTabBar } from '../../modules/CustomTabBar/CustomTabBar.module';

const BottomTab = createBottomTabNavigator();

const MainBottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
    >
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home'
        }}
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
          title: 'Profile'
        }}
      />
    </BottomTab.Navigator>
  );
};

export { MainBottomTabNavigator };
