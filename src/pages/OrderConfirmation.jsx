import { Link, useLocation, Navigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import DashboardHeader from '../components/DashboardHeader';
import Button from '../components/Button';

function formatNaira(amount) {
  return `₦${amount.toLocaleString()}`;
}

function OrderConfirmation() {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="dashboard-page-wrap">
      <DashboardHeader />

      <main className="dashboard-main confirmation-page">
        <div className="confirmation-hero">
          <CheckCircle2 size={48} />
          <h1>Order Placed!</h1>
          <p>Your order has been received and is being prepared.</p>
          <p className="confirmation-order-id">Order ID: {order.orderId}</p>
        </div>

        <div className="order-summary confirmation-details">
          <h2>Order Details</h2>

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
            <p><strong>{order.orderType === 'delivery' ? 'Delivering to' : 'Pickup'}:</strong>{' '}
              {order.orderType === 'delivery' ? `${order.delivery.address}, ${order.delivery.city}` : 'In-store pickup'}
            </p>
            <p><strong>Payment:</strong> {order.paymentMethod === 'pod' ? 'Pay on Delivery' : 'Online Payment'}</p>
          </div>
        </div>

        <Link to="/dashboard">
          <Button className="btn-primary btn-large confirmation-btn">Back to Home</Button>
        </Link>
      </main>
    </div>
  );
}

export default OrderConfirmation;