import { useState, useEffect } from 'react'

const KEY = ''

export function useMovies({ query }) {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(
    function () {
      const controller = new AbortController()
      async function fetchMovie() {
        try {
          setIsLoading(true)
          setError('')
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          )

          if (!res.ok)
            throw new Error('Something went wrong while fetching movie.')

          const data = await res.json()
          if (data.Response === 'False') throw new Error(data.Error)
          setMovies(data.Search)
          setError('')
        } catch (err) {
          if (err.name !== 'AbortError') {
            setError(err.message)
          }
        } finally {
          setIsLoading(false)
        }
      }

      if (query.length === 0) {
        setMovies([])
        setError('')
        return
      }

      // handleCloseDetail()
      fetchMovie()

      return function () {
        controller.abort()
      }
    },
    [query]
  )

  return { movies, isLoading, error }
}
