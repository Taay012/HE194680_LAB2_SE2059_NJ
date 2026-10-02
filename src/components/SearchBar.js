import { Form } from 'react-bootstrap';

export default function SearchBar({ value, onChange, inputRef }) {
  return (
    <Form.Control
      ref={inputRef}
      placeholder="Search Movie..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}