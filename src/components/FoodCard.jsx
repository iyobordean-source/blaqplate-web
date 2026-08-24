import Button from './Button';

function formatNaira(amount) {
  return `₦${amount.toLocaleString()}`;
}

function FoodCard({ item }) {
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
            className="btn-primary btn-small"
            onClick={() => alert(`${item.name} added to cart (coming soon)`)}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;