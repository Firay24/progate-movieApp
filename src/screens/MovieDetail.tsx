import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { API_URL, API_ACCESS_TOKEN } from '@env'

export default function MovieDetail({ navigation }: any): JSX.Element {
  const fetchData = (): void => {
    if (API_ACCESS_TOKEN == null || API_URL == null) {
      throw new Error('ENV not found')
    }

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    }

    fetch(API_URL, options)
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
