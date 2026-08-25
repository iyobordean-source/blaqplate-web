import { Link, useLocation } from 'react-router-dom';
import { CheckCircle2, Bell, MapPin, Store } from 'lucide-react';
import DashboardHeader from '../components/DashboardHeader';
import Button from '../components/Button';

function formatNaira(amount) {
  return `₦${amount.toLocaleString()}`;
}

// Used when the page is refreshed and navigation state is lost —
// keeps the page useful instead of crashing or redirecting away.
const demoOrder = {
  orderId: 'BP-1042',
  customer: { fullName: 'Guest Customer', phone: '+234 800 000 0000' },
  orderType: 'delivery',
  delivery: { address: '12 Airport Road', city: 'Benin City', instructions: '' },
  paymentMethod: 'pod',
  items: [
    { id: 1, name: 'Smoky Jollof Platter', price: 4500, quantity: 1 },
    { id: 4, name: 'Crispy Fried Chicken', price: 3600, quantity: 1 },
  ],
  subtotal: 8100,
  deliveryFee: 1000,
  total: 9100,
};

const statusSteps = ['Order Received', 'Confirmed', 'Preparing', 'Ready'];
const ACTIVE_STEP_COUNT = 2; // "Order Received" and "Confirmed" are active for the prototype

function OrderConfirmation() {
  const location = useLocation();
  const order = location.state?.order || demoOrder;

  return (
    <div className="dashboard-page-wrap">
      <DashboardHeader />

      <main className="dashboard-main confirmation-page">
        {/* Success Hero */}
        <div className="confirmation-hero">
          <div className="confirmation-check">
            <CheckCircle2 size={44} />
          </div>
          <h1>Order Confirmed!</h1>
          <p>Thank you for ordering from BLAQ PLATE.</p>
          <p className="confirmation-order-id">Order #{order.orderId}</p>
        </div>

        {/* Status Tracker */}
        <div className="status-tracker">
          {statusSteps.map((step, index) => {
            const isActive = index < ACTIVE_STEP_COUNT;
            const isLast = index === statusSteps.length - 1;
            return (
              <div className="status-step-wrap" key={step}>
                <div className="status-step">
                  <span className={`status-dot ${isActive ? 'active' : ''}`}></span>
                  <span className={`status-label ${isActive ? 'active' : ''}`}>{step}</span>
                </div>
                {!isLast && <span className={`status-line ${isActive ? 'active' : ''}`}></span>}
              </div>
            );
          })}
        </div>

        {/* Estimated Time */}
        <div className="estimate-card">
          <p className="estimate-label">Estimated preparation time</p>
          <p className="estimate-value">25–40 minutes</p>
        </div>

        {/* Order Summary */}
        <div className="order-summary confirmation-details">
          <h2>Order Summary</h2>

          <div className="checkout-items-list">
            {order.items.map((item) => (
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
            <span>{formatNaira(order.subtotal)}</span>
          </div>
          <div className="summary-row">
            <span>{order.orderType === 'delivery' ? 'Delivery Fee' : 'Pickup Fee'}</span>
            <span>{order.deliveryFee > 0 ? formatNaira(order.deliveryFee) : 'Free'}</span>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-row summary-total">
            <span>Total</span>
            <span>{formatNaira(order.total)}</span>
          </div>

          <div className="confirmation-meta">
            <p className="confirmation-meta-row">
              {order.orderType === 'delivery' ? (
                <>
                  <MapPin size={15} />
                  <span>
                    <strong>Delivering to:</strong> {order.delivery.address}, {order.delivery.city}
                  </span>
                </>
              ) : (
                <>
                  <Store size={15} />
                  <span><strong>Pickup Order</strong></span>
                </>
              )}
            </p>
            <p className="confirmation-meta-row">
              <span><strong>Payment:</strong> {order.paymentMethod === 'pod' ? 'Pay on Delivery' : 'Online Payment'}</span>
            </p>
          </div>
        </div>

        {/* Notification note */}
        <div className="notify-note">
          <Bell size={16} />
          <span>We'll notify you when your order status changes.</span>
        </div>

        {/* Actions */}
        <div className="confirmation-actions">
          <Link to="/dashboard">
            <Button className="btn-primary btn-large confirmation-btn">Back to Home</Button>
          </Link>
          <Link to="/menu">
            <Button className="btn-outline btn-large confirmation-btn">View Menu</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default OrderConfirmation;