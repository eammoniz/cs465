import { useEffect, useState } from 'react'
import './App.css'

const API = 'https://rickandmortyapi.com/api'

function App() {
  const [page, setPage] = useState(window.location.pathname)
  const [characters, setCharacters] = useState([])
  const [species, setSpecies] = useState([])
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    function handlePopState() {
      setPage(window.location.pathname)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  function navigate(event, path) {
    event.preventDefault()
    window.history.pushState({}, '', path)
    setPage(path)
  }

  useEffect(() => {
    if (page === '/characters') {
      setLoading(true)

      Promise.all(
        [1, 2, 3, 4, 5].map((number) =>
          fetch(`${API}/character?page=${number}`).then((response) =>
            response.json()
          )
        )
      )
        .then((data) => setCharacters(data.flatMap((item) => item.results)))
        .finally(() => setLoading(false))
    }

    if (page === '/species') {
      setLoading(true)

      fetch(`${API}/character`)
        .then((response) => response.json())
        .then((data) => {
          const grouped = {}

          data.results.forEach((character) => {
            if (!grouped[character.species]) {
              grouped[character.species] = []
            }
            grouped[character.species].push(character.name)
          })

          setSpecies(
            Object.entries(grouped).map(([name, names]) => ({
              name,
              names,
            }))
          )
        })
        .finally(() => setLoading(false))
    }

    if (page === '/locations') {
      setLoading(true)

      fetch(`${API}/location`)
        .then((response) => response.json())
        .then((data) => {
          const grouped = {}

          data.results.forEach((location) => {
            const type = location.type || 'Unknown'
            grouped[type] = (grouped[type] || 0) + 1
          })

          setLocations(
            Object.entries(grouped).map(([type, count]) => ({
              type,
              count,
            }))
          )
        })
        .finally(() => setLoading(false))
    }
  }, [page])

  return (
    <>
      <header>
        <h1>Rick and Morty</h1>
        <nav>
          <a href="/home" onClick={(event) => navigate(event, '/home')}>Home</a>
          <a href="/characters" onClick={(event) => navigate(event, '/characters')}>Characters</a>
          <a href="/species" onClick={(event) => navigate(event, '/species')}>Species</a>
          <a href="/locations" onClick={(event) => navigate(event, '/locations')}>Locations</a>
        </nav>
      </header>

      <main>
        {(page === '/' || page === '/home') && (
          <section>
            <h2>Welcome to the Rick and Morty Explorer</h2>
            <p>Explore characters, species, and locations from the Rick and Morty universe.</p>
          </section>
        )}

        {page === '/characters' && (
          <section>
            <h2>Characters</h2>
            {loading ? (
              <p>Loading characters...</p>
            ) : (
              <div className="character-list">
                {characters.map((character) => (
                  <article key={character.id}>
                    <img src={character.image} alt={character.name} width="150" />
                    <h3>{character.name}</h3>
                    <p>Species: {character.species}</p>
                    <p>Status: {character.status}</p>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}

        {page === '/species' && (
          <section>
            <h2>Species</h2>
            {loading ? (
              <p>Loading species...</p>
            ) : (
              species.map((item) => (
                <article key={item.name}>
                  <h3>{item.name}: {item.names.length}</h3>
                  <ul>
                    {item.names.map((name, index) => (
                      <li key={`${name}-${index}`}>{name}</li>
                    ))}
                  </ul>
                </article>
              ))
            )}
          </section>
        )}

        {page === '/locations' && (
          <section>
            <h2>Locations by Type</h2>
            {loading ? (
              <p>Loading locations...</p>
            ) : (
              locations.map((location) => (
                <article key={location.type}>
                  <h3>{location.type}: {location.count}</h3>
                </article>
              ))
            )}
          </section>
        )}
      </main>
    </>
  )
}

export default App

