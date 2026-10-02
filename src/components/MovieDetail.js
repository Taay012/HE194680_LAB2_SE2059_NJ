import { Card, Button } from 'react-bootstrap';

export default function MovieDetail({ movie, onClose }) {
  return (
    <Card>
      <Card.Header className="d-flex justify-content-between align-items-center">
        <strong>Movie Details</strong>
        <Button size="sm" variant="outline-secondary" onClick={onClose}>
          Close
        </Button>
      </Card.Header>
      <Card.Body>
        <p><strong>Title:</strong> {movie.title}</p>
        <p><strong>Genre:</strong> {movie.genre}</p>
        <p><strong>Year:</strong> {movie.year}</p>
        <p><strong>Rating:</strong> {movie.rating}</p>
        <p><strong>Director:</strong> {movie.director}</p>
        <p><strong>Duration:</strong> {movie.duration} minutes</p>
        <p className="mb-0"><strong>Description:</strong> {movie.description}</p>
      </Card.Body>
    </Card>
  );
}