import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Truck, Store, Wallet, CreditCard } from 'lucide-react';
import DashboardHeader from '../components/DashboardHeader';
import Button from '../components/Button';
import { useCart } from '../context/CartContext';

const DELIVERY_FEE = 1000;

function formatNaira(amount) {
  return `₦${amount.toLocaleString()}`;
}

function Checkout() {
  const navigate = useNavigate();
  const { cartItems, subtotal, clearCart } = useCart();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    instructions: '',
  });
  const [orderType, setOrderType] = useState('delivery');
  const [paymentMethod, setPaymentMethod] = useState('pod');
  const [errors, setErrors] = useState({});

  const deliveryFee = orderType === 'delivery' ? DELIVERY_FEE : 0;
  const total = subtotal + deliveryFee;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required.';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required.';

    if (orderType === 'delivery') {
      if (!formData.address.trim()) newErrors.address = 'Delivery address is required.';
      if (!formData.city.trim()) newErrors.city = 'City is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) return;
    if (!validate()) return;

    const orderDetails = {
      customer: { fullName: formData.fullName, phone: formData.phone },
      orderType,
      delivery:
        orderType === 'delivery'
          ? { address: formData.address, city: formData.city, instructions: formData.instructions }
          : null,
      paymentMethod,
      items: cartItems,
      subtotal,
      deliveryFee,
      total,
      orderId: `BP-${Date.now().toString().slice(-6)}`,
    };

    clearCart();
    navigate('/order-confirmation', { state: { order: orderDetails } });
  };

  if (cartItems.length === 0) {
    return (
      <div className="dashboard-page-wrap">
        <DashboardHeader />
        <div className="cart-empty-state">
          <h2>Your cart is empty</h2>
          <p>Add items to your cart before checking out.</p>
          <Link to="/menu">
            <Button className="btn-primary btn-large">Browse Menu</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page-wrap">
      <DashboardHeader />

      <main className="dashboard-main checkout-page">
        <h1 className="checkout-title">Checkout</h1>

        <form onSubmit={handlePlaceOrder} className="checkout-layout">
          <div className="checkout-form-col">
            {/* Customer Information */}
            <section className="checkout-section">
              <h2>Customer Information</h2>

              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Your full name"
                />
                {errors.fullName && <p className="field-error">{errors.fullName}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+234 800 000 0000"
                />
                {errors.phone && <p className="field-error">{errors.phone}</p>}
              </div>
            </section>

            {/* Order Type */}
            <section className="checkout-section">
              <h2>Order Type</h2>

              <div className="order-type-toggle">
                <button
                  type="button"
                  className={`order-type-btn ${orderType === 'delivery' ? 'active' : ''}`}
                  onClick={() => setOrderType('delivery')}
                >
                  <Truck size={18} />
                  Delivery
                </button>
                <button
                  type="button"
                  className={`order-type-btn ${orderType === 'pickup' ? 'active' : ''}`}
                  onClick={() => setOrderType('pickup')}
                >
                  <Store size={18} />
                  Pickup
                </button>
              </div>
            </section>

            {/* Delivery Information */}
            {orderType === 'delivery' ? (
              <section className="checkout-section">
                <h2>Delivery Information</h2>

                <div className="form-group">
                  <label htmlFor="address">Delivery Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Street address"
                  />
                  {errors.address && <p className="field-error">{errors.address}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g. Benin City"
                  />
                  {errors.city && <p className="field-error">{errors.city}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="instructions">Delivery Instructions (optional)</label>
                  <input
                    type="text"
                    id="instructions"
                    name="instructions"
                    value={formData.instructions}
                    onChange={handleChange}
                    placeholder="e.g. Gate code, landmark..."
                  />
                </div>
              </section>
            ) : (
              <section className="checkout-section pickup-note">
                <h2>Pickup Information</h2>
                <p>
                  Your order will be ready for pickup at the nearest BLAQ PLATE location.
                  We'll notify you when it's ready.
                </p>
              </section>
            )}

            {/* Payment Method */}
            <section className="checkout-section">
              <h2>Payment Method</h2>

              <div className="payment-options">
                <button
                  type="button"
                  className={`payment-option ${paymentMethod === 'pod' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('pod')}
                >
                  <span className={`radio-dot ${paymentMethod === 'pod' ? 'checked' : ''}`}></span>
                  <Wallet size={18} />
                  <span>Pay on Delivery</span>
                </button>

                <button
                  type="button"
                  className={`payment-option ${paymentMethod === 'online' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('online')}
                >
                  <span className={`radio-dot ${paymentMethod === 'online' ? 'checked' : ''}`}></span>
                  <CreditCard size={18} />
                  <span>Online Payment</span>
                </button>
              </div>
            </section>
          </div>

          {/* Order Summary */}
          <div className="checkout-summary-col">
            <div className="order-summary checkout-summary">
              <h2>Order Summary</h2>

              <div className="checkout-items-list">
                {cartItems.map((item) => (
                  <div className="checkout-item-row" key={item.id}>
                    <span className="checkout-item-name">
                      {item.name} <span className="checkout-item-qty">× {item.quantity}</span>
                    </span>
                    <span>{formatNaira(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="summary-divider"></div>

              <div className="summary-row">
                <span>Subtotal</span>
                <span>{formatNaira(subtotal)}</span>
              </div>

              <div className="summary-row">
                <span>{orderType === 'delivery' ? 'Delivery Fee' : 'Pickup Fee'}</span>
                <span>{deliveryFee > 0 ? formatNaira(deliveryFee) : 'Free'}</span>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-row summary-total">
                <span>Total</span>
                <span>{formatNaira(total)}</span>
              </div>

              <Button type="submit" className="btn-primary btn-large checkout-btn">
                Place Order
              </Button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}

export default Checkout;