import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MovieDetail from '../screens/MovieDetail'
import BottomTabNavigator from './BottomTabNavigation'

const Stack = createNativeStackNavigator()

const MainStackNavigator = (): JSX.Element => (
  <Stack.Navigator>
    <Stack.Screen
      name="MainTabs"
      component={BottomTabNavigator}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="MovieDetail"
      component={MovieDetail}
      options={{ title: 'Movie Detail' }}
    />
  </Stack.Navigator>
)

export default MainStackNavigator
