import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

export default function MovieDetail({ navigation }: any): JSX.Element {
  const fetchData = (): void => {
    const ACCESS_TOKEN =
      'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YTIwNTMwODYyMzQ0OGQyNDMyYzk5NmZkM2Y3M2Y3ZSIsIm5iZiI6MTcxOTUwNjM5MS4yNDM1NzQsInN1YiI6IjY2N2Q5MTM4ZGY5MzE4ZGEzMmFmOWEwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mx96l9oqlTPXIS57gSMT6VhiCj1KPprTbCcPq6hofnc'
    const url =
      'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1'

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    }

    fetch(url, options)
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
