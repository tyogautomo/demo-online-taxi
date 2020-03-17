import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {
  ChooseOrigin,
  ChooseDestination,
  SearchPlace,
  DirectionSummary
} from '../screenConfig';

const Stack = createStackNavigator();

const ChooseDirectionStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ChooseOrigin" component={ChooseOrigin} options={{ title: 'Pick Up Point' }} />
      <Stack.Screen name="ChooseDestination" component={ChooseDestination} options={{ title: 'Where\'s your destination?' }} />
      <Stack.Screen name="SearchPlace" component={SearchPlace} />
      <Stack.Screen name="DirectionSummary" component={DirectionSummary} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
};

export { ChooseDirectionStackNavigator };
