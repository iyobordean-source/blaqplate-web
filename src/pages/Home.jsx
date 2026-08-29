import { Link, useNavigate } from 'react-router-dom';
import { Flame, Zap, Gift, Star } from 'lucide-react';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import { menuItems } from '../data/menuData';
import '../landing.css';

const featuredItems = menuItems.filter((item) => item.featured).slice(0, 4);
const floatingItem = menuItems.find((item) => item.id === 1);

function formatNaira(amount) {
  return `₦${amount.toLocaleString()}`;
}

function Home() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <Navbar />

      {/* ===== Hero ===== */}
      <section className="landing-hero">
        <div className="landing-hero-bg">
          <img
            src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1600&q=80"
            alt="Smoky jollof platter"
          />
          <div className="landing-hero-overlay"></div>
        </div>

        <div className="landing-hero-content">
          <span className="landing-eyebrow">BLAQ PLATE</span>
          <h1>Bold Flavors. Delivered Fresh.</h1>
          <p>
            From smoky jollof to perfectly grilled favorites, order your next meal from
            BLAQ PLATE and enjoy bold Nigerian flavors delivered straight to you.
          </p>

          <div className="landing-hero-actions">
            <Button className="btn-landing-primary btn-large" onClick={() => navigate('/menu')}>
              Order Now
            </Button>
            <Button className="btn-landing-outline btn-large" onClick={() => navigate('/menu')}>
              Explore Menu
            </Button>
          </div>
        </div>

        {floatingItem && (
          <Link to="/menu" className="floating-food-card">
            <img src={floatingItem.image} alt={floatingItem.name} />
            <div className="floating-food-info">
              <p className="floating-food-name">{floatingItem.name}</p>
              <p className="floating-food-price">{formatNaira(floatingItem.price)}</p>
              <div className="floating-food-rating">
                <Star size={12} fill="#E85D04" color="#E85D04" />
                <Star size={12} fill="#E85D04" color="#E85D04" />
                <Star size={12} fill="#E85D04" color="#E85D04" />
                <Star size={12} fill="#E85D04" color="#E85D04" />
                <Star size={12} fill="#E85D04" color="#E85D04" />
                <span>Popular choice</span>
              </div>
            </div>
          </Link>
        )}
      </section>

      {/* ===== Value Strip ===== */}
      <section className="value-strip">
        <div className="value-card">
          <Flame size={22} />
          <div>
            <h3>Bold Nigerian Flavors</h3>
            <p>Freshly prepared meals with real character.</p>
          </div>
        </div>
        <div className="value-card">
          <Zap size={22} />
          <div>
            <h3>Fast Delivery</h3>
            <p>Get your favorites without the wait.</p>
          </div>
        </div>
        <div className="value-card">
          <Gift size={22} />
          <div>
            <h3>Monthly Rewards</h3>
            <p>Earn 5% back on your orders.</p>
          </div>
        </div>
      </section>

      {/* ===== Featured Food ===== */}
      <section className="landing-featured">
        <div className="landing-section-label">Menu Highlights</div>
        <h2>Something You'll Love</h2>
        <p className="landing-section-sub">Customer favorites, freshly prepared.</p>

        <div className="landing-food-grid">
          {featuredItems.map((item) => (
            <Link to="/menu" className="landing-food-card" key={item.id}>
              <div className="landing-food-image-wrap">
                <img src={item.image} alt={item.name} loading="lazy" />
              </div>
              <div className="landing-food-info">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <span className="landing-food-price">{formatNaira(item.price)}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== Brand Story ===== */}
      <section className="brand-story">
        <div className="brand-story-image">
          <img
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80"
            alt="BLAQ PLATE dish"
          />
        </div>
        <div className="brand-story-content">
          <div className="landing-section-label">Our Story</div>
          <h2>Big Flavor. No Compromise.</h2>
          <p>
            BLAQ PLATE brings together bold Nigerian flavors and a modern ordering
            experience — making it easier to discover your next favorite meal.
          </p>

          <div className="brand-story-details">
            <div className="brand-detail">
              <span className="brand-detail-line"></span>
              <p>Freshly prepared</p>
            </div>
            <div className="brand-detail">
              <span className="brand-detail-line"></span>
              <p>Made to order</p>
            </div>
            <div className="brand-detail">
              <span className="brand-detail-line"></span>
              <p>5% monthly rewards</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Final CTA ===== */}
      <section className="landing-cta">
        <div className="landing-cta-bg">
          <img
            src="https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1600&q=80"
            alt="BLAQ PLATE meal"
          />
          <div className="landing-hero-overlay"></div>
        </div>
        <div className="landing-cta-content">
          <h2>Your next favorite meal is waiting.</h2>
          <p>Explore the menu and order something worth craving.</p>
          <Button className="btn-landing-primary btn-large" onClick={() => navigate('/menu')}>
            Order Now
          </Button>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="landing-footer">
        <div className="landing-footer-content">
          <div>
            <p className="landing-footer-logo">
              BLAQ<span>PLATE</span>
            </p>
            <p className="landing-footer-tagline">Bold flavors. Delivered fresh.</p>
          </div>

          <div className="landing-footer-links">
            <Link to="/">Home</Link>
            <Link to="/menu">Menu</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        </div>

        <p className="landing-footer-bottom">© {new Date().getFullYear()} BLAQ PLATE. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;