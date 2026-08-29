import { useNavigate } from 'react-router-dom';
import Button from './Button';

function formatNaira(amount) {
  return `₦${amount.toLocaleString()}`;
}

function FeaturedFoodHero({ item }) {
  const navigate = useNavigate();

  if (!item) return null;

  return (
    <div className="featured-hero" onClick={() => navigate('/menu')}>
      <img src={item.image} alt={item.name} className="featured-hero-image" loading="lazy" />
      <div className="featured-hero-overlay"></div>

      <div className="featured-hero-content">
        <p className="featured-hero-eyebrow">Featured Today</p>
        <h2>{item.name}</h2>
        <p className="featured-hero-desc">{item.description}</p>

        <div className="featured-hero-footer">
          <span className="featured-hero-price">{formatNaira(item.price)}</span>
          <Button
            className="btn-landing-primary featured-hero-btn"
            onClick={(e) => {
              e.stopPropagation();
              navigate('/menu');
            }}
          >
            Order Now
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FeaturedFoodHero;