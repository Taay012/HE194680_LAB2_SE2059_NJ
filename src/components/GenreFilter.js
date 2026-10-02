import { Form } from 'react-bootstrap';

const GENRES = ['All Genres', 'Action', 'Animation', 'Comedy', 'Drama', 'Romance', 'Sci-Fi'];

export default function GenreFilter({ value, onChange }) {
  return (
    <Form.Select value={value} onChange={(e) => onChange(e.target.value)}>
      {GENRES.map((g) => (
        <option key={g} value={g}>{g}</option>
      ))}
    </Form.Select>
  );
}