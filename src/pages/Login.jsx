import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password.trim()) {
      setError('Please fill in both fields.');
      return;
    }

    setError('');
    // Placeholder only — no real authentication yet
    navigate('/dashboard');
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link to="/" className="auth-logo">
          BLAQ<span>PLATE</span>
        </Link>

        <h1>Welcome Back</h1>
        <p className="auth-subtext">Log in to continue ordering your favorite meals.</p>

        {error && <p className="form-error">{error}</p>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>

          <a href="#" className="forgot-link">Forgot password?</a>

          <Button type="submit" className="btn-primary btn-large auth-submit">
            Login
          </Button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>

        <Link to="/" className="back-home">← Back to Home</Link>
      </div>
    </div>
  );
}

export default Login;