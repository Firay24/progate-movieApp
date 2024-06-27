import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

export default function MovieDetail({ navigation }: any): JSX.Element {
  const fetchData = (): void => {
    const ACCESS_TOKEN = process.env.EXPO_PUBLIC_API_ACCESS_TOKEN
    const URL = process.env.EXPO_PUBLIC_API_URL

    if (ACCESS_TOKEN == null || URL == null) {
      throw new Error('ENV not found')
    }

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    }

    fetch(URL, options)
      .then(async (response) => await response.json())
      .then((response) => {
        console.log(response)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <View style={styles.container}>
      <Text>Movie Detail Page</Text>
      <Button title="Fetch Data" onPress={() => fetchData()} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
