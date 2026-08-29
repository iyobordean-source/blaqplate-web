import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Button from './Button';

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          BLAQ<span>PLATE</span>
        </Link>

        <nav className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
        </nav>

        <div className="navbar-actions">
          <Button className="btn-outline" onClick={() => navigate('/login')}>
            Login
          </Button>
          <Button className="btn-primary" onClick={() => navigate('/signup')}>
            Sign Up
          </Button>
        </div>

        <button
          className="navbar-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className={`mobile-nav-panel ${menuOpen ? 'open' : ''}`}>
        <Link to="/" onClick={closeMenu}>Home</Link>
        <Link to="/menu" onClick={closeMenu}>Menu</Link>
        <button
          className="mobile-nav-link"
          onClick={() => {
            closeMenu();
            navigate('/login');
          }}
        >
          Login
        </button>
        <button
          className="mobile-nav-link mobile-nav-signup"
          onClick={() => {
            closeMenu();
            navigate('/signup');
          }}
        >
          Sign Up
        </button>
      </div>
    </header>
  );
}

export default Navbar;