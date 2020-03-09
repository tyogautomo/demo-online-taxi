import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import IconMaterial from 'react-native-vector-icons/MaterialIcons'

import { Home, ChooseOrigin, Profile } from '../screenConfig';

const BottomTab = createBottomTabNavigator();

const MainBottomTabNavigator = () => {
  return (
    <BottomTab.Navigator tabBarOptions={{ activeTintColor: "#039A34" }}>
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => <IconMaterial name="home" color={focused ? '#039A34' : '#c2c2c2'} size={30} />
        }}
      />
      <BottomTab.Screen
        name="ChooseDirection"
        component={ChooseOrigin}
        options={{
          tabBarIcon: () => (
            <View style={{ width: 80, height: 80, backgroundColor: '#039A34', borderRadius: 40, elevation: 2, marginBottom: 40, justifyContent: 'center', alignItems: 'center' }}>
              <IconAwesome name="motorcycle" color="white" size={30} />
            </View>
          ),
          tabBarLabel: () => null
        }} />
      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => <IconAwesome name="user" color={focused ? '#039A34' : '#c2c2c2'} size={27} />
        }}
      />
    </BottomTab.Navigator>
  );
};

export { MainBottomTabNavigator };
