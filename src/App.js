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
  // ===== STATE =====
  const [search, setSearch] = useState('');             // từ khóa tìm kiếm
  const [genre, setGenre] = useState('All Genres');     // thể loại đang chọn
  const [sortBy, setSortBy] = useState('default');      // 'default' | 'high' | 'low'
  const [favorites, setFavorites] = useState([]);       // mảng ID phim yêu thích
  const [isLoaded, setIsLoaded] = useState(false);      // đã đọc localStorage xong chưa
  const [selectedMovie, setSelectedMovie] = useState(null); // phim đang xem chi tiết

  // useRef: tham chiếu tới ô tìm kiếm để focus
  const searchRef = useRef(null);

  // Tự focus vào ô tìm kiếm khi mở app
  useEffect(() => {
    if (searchRef.current) searchRef.current.focus();
  }, []);

  // LOAD favorite từ localStorage khi app khởi động
  useEffect(() => {
    try {
      const saved = localStorage.getItem(FAVORITE_KEY);
      if (saved) setFavorites(JSON.parse(saved));
    } catch {
      setFavorites([]);
    }
    setIsLoaded(true);
  }, []);

  // SAVE favorite mỗi khi danh sách đổi (chỉ sau khi đã load xong)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(FAVORITE_KEY, JSON.stringify(favorites));
    }
  }, [favorites, isLoaded]);

  // useMemo: tìm kiếm -> lọc thể loại -> sắp xếp
  const finalMovies = useMemo(() => {
    let result = movies.filter((m) =>
      m.title.toLowerCase().includes(search.trim().toLowerCase())
    );

    if (genre !== 'All Genres') {
      result = result.filter((m) => m.genre === genre);
    }

    // Copy mảng trước khi sort để không làm đổi mảng gốc
    if (sortBy === 'high') result = [...result].sort((a, b) => b.rating - a.rating);
    if (sortBy === 'low') result = [...result].sort((a, b) => a.rating - b.rating);

    return result;
  }, [search, genre, sortBy]);

  // Thêm / bỏ yêu thích
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
          {/* Sắp xếp ghép thẳng vào App */}
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