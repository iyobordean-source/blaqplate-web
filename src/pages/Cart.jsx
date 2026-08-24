import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import DashboardHeader from '../components/DashboardHeader';
import BottomNav from '../components/BottomNav';
import Button from '../components/Button';
import { useCart } from '../context/CartContext';

const DELIVERY_FEE = 1000;
const AVAILABLE_BONUS = 2500;

function formatNaira(amount) {
  return `₦${amount.toLocaleString()}`;
}

function Cart() {
  const navigate = useNavigate();
  const { cartItems, addToCart, decreaseQuantity, removeFromCart, subtotal } = useCart();
  const [useBonus, setUseBonus] = useState(false);

  const totalBeforeBonus = subtotal + DELIVERY_FEE;
  const bonusApplied = useBonus ? Math.min(AVAILABLE_BONUS, totalBeforeBonus) : 0;
  const total = Math.max(totalBeforeBonus - bonusApplied, 0);

  if (cartItems.length === 0) {
    return (
      <div className="dashboard-page-wrap">
        <DashboardHeader />
        <div className="cart-empty-state">
          <ShoppingBag size={44} />
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything yet.</p>
          <Link to="/menu">
            <Button className="btn-primary btn-large">Browse Menu</Button>
          </Link>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="dashboard-page-wrap">
      <DashboardHeader />

      <main className="dashboard-main cart-page">
        <h1 className="cart-title">Your Cart</h1>

        <div className="cart-list">
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} className="cart-item-image" />

              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p className="cart-item-desc">{item.description}</p>
                <div className="cart-item-price">{formatNaira(item.price)}</div>
              </div>

              <div className="cart-item-controls">
                <div className="qty-control">
                  <button
                    className="qty-btn"
                    onClick={() => decreaseQuantity(item.id)}
                    aria-label={`Decrease ${item.name} quantity`}
                  >
                    <Minus size={14} />
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => addToCart(item)}
                    aria-label={`Increase ${item.name} quantity`}
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <div className="cart-item-subtotal">
                  {formatNaira(item.price * item.quantity)}
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                  aria-label={`Remove ${item.name}`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bonus toggle */}
        <div className="bonus-toggle-card">
          <div>
            <p className="bonus-toggle-label">Available Bonus</p>
            <p className="bonus-toggle-amount">{formatNaira(AVAILABLE_BONUS)}</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={useBonus}
              onChange={(e) => setUseBonus(e.target.checked)}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
        <p className="bonus-toggle-hint">Use my bonus</p>

        {/* Order summary */}
        <div className="order-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>{formatNaira(subtotal)}</span>
          </div>

          <div className="summary-row">
            <span>Delivery Fee</span>
            <span>{formatNaira(DELIVERY_FEE)}</span>
          </div>

          {useBonus && (
            <div className="summary-row summary-bonus-row">
              <span>Bonus Applied</span>
              <span>-{formatNaira(bonusApplied)}</span>
            </div>
          )}

          <div className="summary-divider"></div>

          <div className="summary-row summary-total">
            <span>Total</span>
            <span>{formatNaira(total)}</span>
          </div>

          <Button
            className="btn-primary btn-large checkout-btn"
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout
          </Button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}

export default Cart;