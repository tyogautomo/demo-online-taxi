import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ChooseDirectionStackNavigator } from '../chooseDirectionStackNavigator/chooseDirectionStackNavigator';
import { Home, Profile } from '../screenConfig';
import CustomTabBar from '../../modules/CustomTabBar/CustomTabBar.module';

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
        component={ChooseDirectionStackNavigator}
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
