import { useState } from 'react';
import Button from './Button';
import { useCart } from '../context/CartContext';

function formatNaira(amount) {
  return `₦${amount.toLocaleString()}`;
}

function FoodCard({ item }) {
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    addToCart(item);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 900);
  };

  return (
    <div className="food-card">
      <div className="food-image-wrap">
        <img src={item.image} alt={item.name} className="food-image" loading="lazy" />
      </div>
      <div className="food-info">
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <div className="food-footer">
          <span className="food-price">{formatNaira(item.price)}</span>
          <Button
            className={`btn-small ${justAdded ? 'btn-added' : 'btn-primary'}`}
            onClick={handleAdd}
          >
            {justAdded ? 'Added ✓' : 'Add'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;