import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Movie } from '../types/app'
import { API_ACCESS_TOKEN } from '@env'
import { FontAwesome } from '@expo/vector-icons'
import MovieList from '../components/movies/MovieList'

export default function MovieDetail({ route }: any): JSX.Element {
  const { id } = route.params
  const [movie, setMovie] = useState<Movie | null>(null)
  const [movieLists, setmovieLists] = useState<Movie[] | null>([])

  useEffect(() => {
    getMovieById(id)
    getMoviesList(id)
  }, [id])

  const getMovieById = (id: any): void => {
    const url = `https://api.themoviedb.org/3/movie/${id}`
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    }

    fetch(url, options)
      .then(async (response) => await response.json())
      .then((response) => {
        setMovie(response)
      })
      .catch((errorResponse) => {
        console.log(errorResponse)
      })
  }

  const getMoviesList = (id: any): void => {
    const url = `https://api.themoviedb.org/3/movie/${id}/recommendations`
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    }

    fetch(url, options)
      .then(async (response) => await response.json())
      .then((response) => {
        setmovieLists(response.results)
      })
      .catch((errorResponse) => {
        console.log(errorResponse)
      })
  }

  const formatDate = (dateString: Date): string => {
    const date = new Date(dateString)
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }
    return date.toLocaleDateString('en-US', options)
  }

  return (
    <ScrollView>
      <View>
        {movie ? (
          <View>
            <ImageBackground
              source={{
                uri: `https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`,
              }}
              resizeMode="cover"
              style={styles.image}
            >
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                style={styles.gradient}
              />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{movie.original_title}</Text>
                <Text style={styles.rating}>
                  <FontAwesome name="star" size={20} color="gold" />{' '}
                  {movie.vote_average}
                </Text>
              </View>
            </ImageBackground>
            <View style={{ padding: 15 }}>
              <Text>{movie.overview}</Text>
              <View style={styles.grid}>
                <View style={styles.item}>
                  <Text style={styles.heading}>Original Language</Text>
                  <Text style={styles.text}>{movie.original_language}</Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.heading}>Popularity</Text>
                  <Text style={styles.text}>{movie.popularity}</Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.heading}>Release date</Text>
                  <Text style={styles.text}>
                    {formatDate(movie.release_date)}
                  </Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.heading}>Vote Count</Text>
                  <Text style={styles.text}>{movie.vote_count}</Text>
                </View>
              </View>
            </View>
            {movieLists ? (
              <MovieList
                title="recommendation"
                path=""
                coverType="poster"
                moviesProps={movieLists}
              />
            ) : (
              <Text>Loading...</Text>
            )}
          </View>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 32,
  },
  image: {
    width: '100%',
    height: 225,
    justifyContent: 'flex-end',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
  },
  textContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  rating: {
    fontSize: 16,
    color: 'yellow',
    marginTop: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  item: {
    width: '45%',
  },
  text: {
    fontSize: 14,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
  },
})
