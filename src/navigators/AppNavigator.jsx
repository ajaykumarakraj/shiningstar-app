import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainStack from './MainStack';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={MainStack} />
    </Stack.Navigator>
  );
}