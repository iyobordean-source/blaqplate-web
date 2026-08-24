import Navbar from '../components/Navbar';
import Button from '../components/Button';

const featuredFood = [
  {
    id: 1,
    name: 'Jollof Deluxe Platter',
    description: 'Smoky jollof rice, grilled chicken, and plantain.',
    price: '$14.99',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    name: 'Peppered Beef Bowl',
    description: 'Slow-cooked beef in rich pepper sauce with fried rice.',
    price: '$13.49',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 3,
    name: 'Suya Skewers',
    description: 'Spiced grilled skewers served with a side of fresh salad.',
    price: '$9.99',
    image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 4,
    name: 'Coconut Rice & Fish',
    description: 'Fragrant coconut rice paired with pan-seared fish.',
    price: '$15.99',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80',
  },
];

function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <h1>
            BLAQ <span>PLATE</span>
          </h1>
          <p className="hero-headline">Bold Flavors. Delivered Fresh. Every Time.</p>
          <p className="hero-description">
            Experience premium restaurant-quality meals crafted with passion and delivered
            straight to your door. Order in seconds, taste the difference instantly.
          </p>

          <div className="hero-actions">
            <Button className="btn-primary btn-large" onClick={() => alert('Order Now coming soon')}>
              Order Now
            </Button>
            <Button className="btn-outline btn-large" onClick={() => alert('Menu coming soon')}>
              View Menu
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Food Section */}
      <section className="featured" id="menu">
        <div className="section-header">
          <h2>Featured Dishes</h2>
          <p>Handpicked favorites our customers keep coming back for.</p>
        </div>

        <div className="food-grid">
          {featuredFood.map((food) => (
            <div className="food-card" key={food.id}>
              <img src={food.image} alt={food.name} className="food-image" />
              <div className="food-info">
                <h3>{food.name}</h3>
                <p>{food.description}</p>
                <div className="food-footer">
                  <span className="food-price">{food.price}</span>
                  <Button
                    className="btn-primary btn-small"
                    onClick={() => alert(`${food.name} added to cart (coming soon)`)}
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bonus Section */}
      <section className="bonus">
        <div className="bonus-content">
          <h2>Earn While You Eat</h2>
          <p>
            Every month, loyal BLAQ PLATE customers earn a{' '}
            <strong>5% bonus reward</strong> on their total orders — automatically credited
            to your account and redeemable on future meals. The more you order, the more you save.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>
              BLAQ <span>PLATE</span>
            </h3>
            <p>Premium food, delivered with pride.</p>
          </div>

          <div className="footer-links">
            <a href="#home">Home</a>
            <a href="#menu">Menu</a>
            <a href="#">Login</a>
            <a href="#">Sign Up</a>
          </div>
        </div>

        <p className="footer-bottom">© {new Date().getFullYear()} BLAQ PLATE. All rights reserved.</p>
      </footer>
    </>
  );
}

export default Home;