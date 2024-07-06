import React, { createContext, ReactNode, useContext, useState } from 'react'
import { FavoriteContextProps, Movie } from '../types/app'

const FavoriteContext = createContext<FavoriteContextProps | undefined>(
  undefined,
)

export const FavoriteProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Movie[]>([])

  const addFavorite = (movie: Movie) => {
    const isFavorite = favorites.find((item) => item.id === movie.id)
    if (!isFavorite) {
      setFavorites([...favorites, movie])
    }
  }

  const removeFavorite = (id: number) => {
    setFavorites(favorites.filter((movie) => movie.id !== id))
  }

  return (
    <FavoriteContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoriteContext.Provider>
  )
}

export const useFavorites = (): FavoriteContextProps => {
  const context = useContext(FavoriteContext)
  if (!context) {
    throw new Error('useFavorites must be used within a FavoriteProvider')
  }
  return context
}
