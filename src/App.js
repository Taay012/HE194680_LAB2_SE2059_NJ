import { useState, useRef, useMemo, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';

import { movies } from './data/movies';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import GenreFilter from './components/GenreFilter';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';

const FAVORITE_KEY = 'movie_favorites';

export default function App() {
  
  const [search, setSearch] = useState('');             
  const [genre, setGenre] = useState('All Genres');     
  const [sortBy, setSortBy] = useState('default');      
  const [favorites, setFavorites] = useState([]);       
  const [isLoaded, setIsLoaded] = useState(false);      
  const [selectedMovie, setSelectedMovie] = useState(null); 

  
  const searchRef = useRef(null);

  
  useEffect(() => {
    if (searchRef.current) searchRef.current.focus();
  }, []);

 
  useEffect(() => {
    try {
      const saved = localStorage.getItem(FAVORITE_KEY);
      if (saved) setFavorites(JSON.parse(saved));
    } catch {
      setFavorites([]);
    }
    setIsLoaded(true);
  }, []);

  
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(FAVORITE_KEY, JSON.stringify(favorites));
    }
  }, [favorites, isLoaded]);

  
  const finalMovies = useMemo(() => {
    let result = movies.filter((m) =>
      m.title.toLowerCase().includes(search.trim().toLowerCase())
    );

    if (genre !== 'All Genres') {
      result = result.filter((m) => m.genre === genre);
    }

    
    if (sortBy === 'high') result = [...result].sort((a, b) => b.rating - a.rating);
    if (sortBy === 'low') result = [...result].sort((a, b) => a.rating - b.rating);

    return result;
  }, [search, genre, sortBy]);


  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <Container className="py-4">
      <Header favoriteCount={favorites.length} />

      <Row className="g-2 mb-3">
        <Col md={5}>
          <SearchBar value={search} onChange={setSearch} inputRef={searchRef} />
        </Col>
        <Col md={4}>
          <GenreFilter value={genre} onChange={setGenre} />
        </Col>
        <Col md={3}>
         
          <Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="default">Sort by: Default</option>
            <option value="high">Rating: High → Low</option>
            <option value="low">Rating: Low → High</option>
          </Form.Select>
        </Col>
      </Row>

      <p className="fw-semibold">Total Movies: {finalMovies.length}</p>

      <MovieList
        movies={finalMovies}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
        onViewDetails={setSelectedMovie}
      />

      {selectedMovie && (
        <MovieDetail movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </Container>
  );
}