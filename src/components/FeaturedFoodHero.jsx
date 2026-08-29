import { useNavigate } from 'react-router-dom';
import Button from './Button';

function FeaturedFoodHero({ item }) {
  const navigate = useNavigate();

  if (!item) return null;

  return (
    <div className="featured-hero" onClick={() => navigate('/menu')}>
      <img src={item.image} alt={item.name} className="featured-hero-image" loading="lazy" />
      <div className="featured-hero-overlay"></div>

      <div className="featured-hero-content">
        <p className="featured-hero-eyebrow">Craving something delicious?</p>
        <h2>Fresh meals, made to order.</h2>
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
  );
}

export default FeaturedFoodHero;