import { ListGroup } from 'react-bootstrap';
import MovieItem from './MovieItem';

export default function MovieList({ movies, favorites, onToggleFavorite, onViewDetails }) {
  if (movies.length === 0) {
    return <p className="text-muted">No movies found.</p>;
  }

  return (
    <ListGroup className="mb-4">
      {movies.map((movie) => (
        <MovieItem
          key={movie.id}
          movie={movie}
          isFavorite={favorites.includes(movie.id)}
          onToggleFavorite={onToggleFavorite}
          onViewDetails={onViewDetails}
        />
      ))}
    </ListGroup>
  );
}