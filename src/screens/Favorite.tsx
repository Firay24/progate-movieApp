import React from 'react'
import { View, Text, StyleSheet, FlatList, StatusBar } from 'react-native'
import { useFavorites } from '../store/favoriteProvider'
import MovieItem from '../components/movies/MovieItem'

const coverImageSize = {
  backdrop: {
    width: 280,
    height: 160,
  },
  poster: {
    width: 100,
    height: 160,
  },
}

export default function Favorite(): JSX.Element {
  const { favorites } = useFavorites()
  return (
    <View style={favorites.length !== 1 ? styles.container : null}>
      {favorites.length > 1 ? (
        <View style={styles.container}>
          <FlatList
            ListHeaderComponent={() => (
              <View style={styles.header}>
                <View style={styles.purpleLabel}></View>
                <Text style={styles.title}>Favorite</Text>
              </View>
            )}
            contentContainerStyle={{ paddingBottom: 16 }}
            data={favorites}
            renderItem={({ item }) => (
              <MovieItem
                movie={item}
                size={coverImageSize['poster']}
                coverType="poster"
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            numColumns={favorites.length >= 3 ? 3 : 2}
            columnWrapperStyle={styles.columnWrapper}
            key={favorites.length + 1}
          />
        </View>
      ) : favorites.length === 1 ? (
        <View style={styles.containerSingle}>
          <View style={styles.header}>
            <View style={styles.purpleLabel}></View>
            <Text style={styles.title}>Favorite</Text>
          </View>
          <View style={{ paddingHorizontal: 8 }}>
            <MovieItem
              movie={favorites[0]}
              size={coverImageSize['poster']}
              coverType="poster"
            />
          </View>
        </View>
      ) : (
        <View
          style={{
            alignItems: 'center',
          }}
        >
          <Text>Not found</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  containerSingle: {
    marginTop: StatusBar.currentHeight ?? 32,
    justifyContent: 'center',
  },
  container: {
    marginTop: StatusBar.currentHeight ?? 32,
    justifyContent: 'center',
    rowGap: 16,
    flex: 1,
  },
  header: {
    marginLeft: 6,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  purpleLabel: {
    width: 20,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8978A4',
    marginRight: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
  },
  columnWrapper: {
    paddingHorizontal: 20,
    gap: 5,
    marginTop: 12,
  },
  movieList: {
    paddingLeft: 4,
    marginTop: 8,
  },
})
