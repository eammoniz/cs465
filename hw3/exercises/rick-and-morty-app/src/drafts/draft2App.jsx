import { useEffect, useState } from 'react'
import './App.css'

const API = 'https://rickandmortyapi.com/api';

function App() {
  //const [count, setCount] = useState(0)
	const [page, setPage] = useState(window.location.pathname);
	const [characters, setCharacters] = useState([]);
	const [species, setSpecies] = useState([]);
	const [locations, setLocations] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

  return (
    <>
	  <header>
	  <h1>Homework 3</h1>
	  <h3>Elizabeth Moniz</h3>
	  <nav>

	  	<a
	  	href="/home"
		onClick={(event) => navigate(event, '/home')}
	  	>
	  	[ HOME ]
		</a>
  
	  	<a
	  	href="/characters"
		onClick={(event) => navigate(event, '/characters')}
	  	>
	  	[ CHARACTERS ]
		</a>
  
	  	<a
	  	href="/species"
		onClick={(event) => navigate(event, '/species')}
	  	>
	  	[ SPECIES ]
		</a>
  
	  	<a
	  	href="/locations"
		onClick={(event) => navigate(event, '/locations')}
	  	>
	  	[ LOCATIONS ]
		</a>
	  </nav>
	  </header>

	  <main>

	  {(page === '/' || page === '/home') && (
		  <section>
		  <h2> Rick & Morty Explore Page</h2>
		  <p>Choose any tab to see characters, species, and locations from the show!</p>
		  </section>
	  )}


	  {(page === '/characters') && (
		<section>
		<h2>Character List</h2>
		<div className="character-list">
		{characters.map((character) => (
			<article key={character.id}>
				<img
					src={character.image}
			  		alt={character.name}
			  		width="200"
			  	/>
			  	<h3>{character.name}</h3>
			  	<p>Species: {character.species}</p>
			  	<p>Status: {character.status}</p>
			  </article>
		 ))}
		 </div>
		</section>
	  )}


	  {(page === '/species') && (
		<section>
		<h2>Species</h2>
		  {species.map((item) => (
			<article key={item.name}>
				<h3>
				{item.name}: {item.names.length}
				</h3>
				<ul>
				{item.names.map((name, index) => (
					<li key={`${name}-${index}`}>{name}</li>
				))}
				</ul>
			  </article>
		 ))}
	  	</section>
	  )}

	  {(page === '/locations') && (
		<section>
		<h2>Locations by Type</h2>
		  {locations.map((location) => (
			<article key={location.type}>
				<h3>
				{location.type}: {location.count}
				</h3>
			  </article>
		 ))}
	  	</section>
	  )}

	  </main>
	  
    </>
  );
}

useEffect(() => {
	async function getData() {
		const [characterStatus, locationStatus] = await Promise.all([
			//fetch(`${API}/character`),
			Promise.all([1, 2, 3, 4, 5].map(page =>
				fetch(`${API}/character?page=${page}`)
			)),
			fetch(`${API}/location`)
		]);

		const charInfo = {
			results: (await Promise.all(
				characterPages.map(response => response.json())
			)).flatMap(data => data.results)
		};

		const locInfo = await locationStatus.json();

		setCharacters(charInfo.results);

		const speciesGroups = charInfo.results.reduce((groups, character) => {
			if (!groups[character.species]) {
				groups[character.species] = [];
			}

			groups[character.species].push(character.name);
			return groups;
		}, {});

		setSpecies(
			Object.entries(speciesGroups).map(([name, names]) => ({
				name, names
			}))
		);

		const locGroups = locInfo.results.reduce((groups, location) => {
			groups[location.type] = (groups[location.type] || 0) + 1;
			return groups;
		}, {});

		setLocations(
			Objects.entries(locationGroups).map(([type, count]) => ({
				type, count
			}))
		);
	}
	getData();
}, []);


export default App;
