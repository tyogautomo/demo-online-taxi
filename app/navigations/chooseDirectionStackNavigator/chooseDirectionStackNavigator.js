import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Text } from 'react-native';

import {
  ChooseOrigin,
  ChooseDestination,
  SearchPlace,
  DirectionSummary
} from '../screenConfig';
import { colors } from '../../themes/colors';

const Stack = createStackNavigator();

const ChooseDirectionStackNavigator = () => {
  return (
    <Stack.Navigator headerMode="float">
      <Stack.Screen
        name="ChooseOrigin"
        component={ChooseOrigin}
        options={{
          headerTitle: <Text style={{fontFamily: 'OsnovaProBold', color: colors.white}}>Pick Up Point</Text>, 
          headerStyle: {
            elevation: 0,
            backgroundColor: colors.greenHaze
          }
        }} />
      <Stack.Screen
        name="ChooseDestination"
        component={ChooseDestination}
        options={{
          headerTitle: <Text style={{fontFamily: 'OsnovaProBold', color: colors.white}}>Where's your destination?</Text>,
          headerStyle: {
            elevation: 0,
            backgroundColor: colors.greenHaze
          },
        }} />
      <Stack.Screen name="SearchPlace" component={SearchPlace} />
      <Stack.Screen name="DirectionSummary" component={DirectionSummary} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
};

export { ChooseDirectionStackNavigator };
