import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import BottomTabNavigator from './src/navigations/BottomTabNavigation'
import MainStackNavigator from './src/navigations/MainStackNavigation'
import { FavoriteProvider } from './src/store/favoriteProvider'

export default function App(): JSX.Element {
  return (
    <FavoriteProvider>
      <NavigationContainer>
        <MainStackNavigator />
      </NavigationContainer>
    </FavoriteProvider>
  )
}
