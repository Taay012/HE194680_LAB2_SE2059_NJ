import { Button } from 'react-bootstrap';
import { useTheme } from '../context/ThemeContext';

export default function Header({ favoriteCount }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h1 className="mb-0">Mini Movie Manager</h1>
        <small className="text-muted">Favorites: {favoriteCount}</small>
      </div>
      <Button variant={theme === 'light' ? 'dark' : 'light'} onClick={toggleTheme}>
        {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
      </Button>
    </div>
  );
}