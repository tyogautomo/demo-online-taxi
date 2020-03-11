import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ChooseOrigin, ChooseDestination } from '../screenConfig';

const Stack = createStackNavigator();

const ChooseDirectionStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ChooseOrigin" component={ChooseOrigin} options={{ title: 'Choose Direction' }} />
      <Stack.Screen name="ChooseDestination" component={ChooseDestination} />
    </Stack.Navigator>
  )
};

export { ChooseDirectionStackNavigator };
