import { useEffect, useRef, useState } from 'react'
import StarRating from './StarRating'

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0)

const KEY = ''

export default function App() {
  const [query, setQuery] = useState('inception')
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedId, setSelectedId] = useState(null)
  const [watched, setWatched] = useState(function () {
    const storeWatched = localStorage.getItem('watched')
    return JSON.parse(storeWatched)
  })

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (selectedId === id ? null : id))
  }

  function handleCloseDetail() {
    setSelectedId(null)
  }

  function handleAddWatchedList(movie) {
    setWatched((watched) => [
      ...watched,
      { ...movie, Runtime: Number(movie.Runtime.split(' ')[0]) },
    ])
    handleCloseDetail()
  }

  function handleRemoveWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id))
  }

  useEffect(
    function () {
      localStorage.setItem('watched', JSON.stringify(watched))
    },
    [watched]
  )

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

      handleCloseDetail()
      fetchMovie()

      return function () {
        controller.abort()
      }
    },
    [query]
  )

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelect={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetail
              id={selectedId}
              onCloseMovie={handleCloseDetail}
              onAddWatchedList={handleAddWatchedList}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedList watched={watched} onRemove={handleRemoveWatched} />
            </>
          )}
        </Box>
      </Main>
    </>
  )
}

function Loader() {
  return <p className="loader">Loading...</p>
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>⛔</span>
      {message}
    </p>
  )
}

function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  )
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  )
}

function Search({ query, setQuery }) {
  const inputEl = useRef(null)
  useEffect(
    function () {
      function callback(e) {
        if (document.activeElement === inputEl.current) return
        if (e.code === 'Enter') {
          console.log(inputEl)
          inputEl.current.focus()
          setQuery('')
        }
      }

      document.addEventListener('keyup', callback)

      return () => document.removeEventListener('keyup', callback)
    },
    [setQuery]
  )

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  )
}

function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  )
}

function Main({ children }) {
  return <main className="main">{children}</main>
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? '–' : '+'}
      </button>
      {isOpen && children}
    </div>
  )
}

function MovieList({ movies, onSelect }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie key={movie.imdbID} movie={movie} onSelect={onSelect} />
      ))}
    </ul>
  )
}

function Movie({ movie, onSelect }) {
  return (
    <li key={movie.imdbID} onClick={() => onSelect(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  )
}

function MovieDetail({ id, onCloseMovie, onAddWatchedList, watched }) {
  const [movie, setMovie] = useState({})
  const [userRating, setUserRating] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const isWatched = watched.find((movie) => movie.imdbID === id)

  useEffect(
    function () {
      async function getMovieDetail() {
        try {
          setIsLoading(true)
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&i=${id}`
          )
          const data = await res.json()
          setMovie(data)
        } finally {
          setIsLoading(false)
        }
      }
      getMovieDetail()
    },
    [id]
  )

  useEffect(
    function () {
      if (!movie.Title) return
      document.title = `Moive | ${movie.Title}`

      return () => (document.title = 'usePopcorn')
    },
    [movie.Title]
  )

  useEffect(
    function () {
      function callback(e) {
        if (e.code === 'Escape') {
          onCloseMovie()
        }
      }
      document.addEventListener('keyup', callback)

      return function () {
        document.removeEventListener('keyup', callback)
      }
    },
    [onCloseMovie]
  )

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={movie.Poster} alt={`Poster of ${movie.Title}`} />
            <div className="details-overview">
              <h2>{movie.Title}</h2>
              <p>
                {movie.Released} &bull; {movie.Runtime}
              </p>
              <p>{movie.Genre}</p>
              <p>
                <span>⭐</span>
                {movie.imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {isWatched ? (
                <p>
                  You rated with movie {isWatched.userRating}
                  <span>⭐️</span>
                </p>
              ) : (
                <>
                  <StarRating
                    maxRating={10}
                    size={20}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button
                      className="btn-add"
                      onClick={() =>
                        onAddWatchedList({ ...movie, userRating: userRating })
                      }
                    >
                      + Add to Watched List
                    </button>
                  )}
                </>
              )}
            </div>
            <p>
              <em>{movie.Plot}</em>
            </p>
            <p>Starring {movie.Actors}</p>
            <p>Directed by {movie.Director}</p>
          </section>
        </>
      )}
    </div>
  )
}

// function WatchedBox() {
//   const [watched, setWatched] = useState(tempWatchedData)
//   const [isOpen2, setIsOpen2] = useState(true)

//   return (
//     <div className="box">
//       <button
//         className="btn-toggle"
//         onClick={() => setIsOpen2((open) => !open)}
//       >
//         {isOpen2 ? '–' : '+'}
//       </button>
//       {isOpen2 && (
//         <>
//           <WatchedSummary watched={watched} />
//           <WatchedList watched={watched} />
//         </>
//       )}
//     </div>
//   )
// }

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating))
  const avgUserRating = average(watched.map((movie) => movie.userRating))
  const avgRuntime = average(watched.map((movie) => movie.Runtime))

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  )
}

function WatchedList({ watched, onRemove }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <li key={movie.imdbID}>
          <img src={movie.Poster} alt={`${movie.Title} poster`} />
          <h3>{movie.Title}</h3>
          <div>
            <p>
              <span>⭐️</span>
              <span>{movie.imdbRating}</span>
            </p>
            <p>
              <span>🌟</span>
              <span>{movie.userRating}</span>
            </p>
            <p>
              <span>⏳</span>
              <span>{movie.Runtime} min</span>
            </p>
          </div>
          <button className="btn-delete" onClick={() => onRemove(movie.imdbID)}>
            X
          </button>
        </li>
      ))}
    </ul>
  )
}
