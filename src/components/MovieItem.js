import { ListGroup, Button } from 'react-bootstrap';
import { FaStar, FaRegStar } from 'react-icons/fa';

export default function MovieItem({ movie, isFavorite, onToggleFavorite, onViewDetails }) {
  return (
    <ListGroup.Item className="d-flex justify-content-between align-items-center flex-wrap gap-2">
      <div>
        <strong>{movie.title}</strong>
        <div className="text-muted small">
          {movie.genre} | {movie.year} | Rating: {movie.rating}
        </div>
      </div>

      <div className="d-flex gap-2">
        <Button
          size="sm"
          variant={isFavorite ? 'warning' : 'outline-warning'}
          onClick={() => onToggleFavorite(movie.id)}
        >
          {isFavorite ? (
            <>
              <FaStar /> Unfavorite
            </>
          ) : (
            <>
              <FaRegStar /> Favorite
            </>
          )}
        </Button>
        <Button size="sm" variant="outline-primary" onClick={() => onViewDetails(movie)}>
          View Details
        </Button>
      </div>
    </ListGroup.Item>
  );
}