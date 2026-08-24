import Button from './Button';

function FeaturedCard() {
  return (
    <div className="featured-promo">
      <div className="featured-promo-text">
        <h2>Good food, better rewards.</h2>
        <p>Earn a 5% monthly bonus on eligible purchases — automatically credited to your account.</p>
        <Button className="btn-primary" onClick={() => alert('Rewards page coming soon')}>
          Learn More
        </Button>
      </div>
    </div>
  );
}

export default FeaturedCard;