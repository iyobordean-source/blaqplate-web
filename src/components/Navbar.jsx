import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';

function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          BLAQ<span>PLATE</span>
        </Link>

        <nav className="navbar-links">
          <Link to="/">Home</Link>
          <a href="#menu">Menu</a>
        </nav>

        <div className="navbar-actions">
          <Button className="btn-outline" onClick={() => navigate('/login')}>
            Login
          </Button>
          <Button className="btn-primary" onClick={() => navigate('/signup')}>
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;