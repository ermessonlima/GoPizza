import React from 'react';
import { Home } from '@screens/Home';
import { Product } from '@screens/Product';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { Navigator, Screen } = createNativeStackNavigator();

export function UserStackRoutes () {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name='Home' component={Home} />
      <Screen name='Product' component={Product} />
    </Navigator>
  );
}