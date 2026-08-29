import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Package,
  MapPin,
  Store,
  RotateCcw,
  ShoppingBag,
} from 'lucide-react';
import DashboardHeader from '../components/DashboardHeader';
import BottomNav from '../components/BottomNav';
import Button from '../components/Button';
import { useCart } from '../context/CartContext';
import { menuItems } from '../data/menuData';

function formatNaira(amount) {
  return `₦${amount.toLocaleString()}`;
}

function findItem(id) {
  return menuItems.find((item) => item.id === id);
}

// Demo/local order history only — not connected to a real database yet.
// Built from actual menu items so images/names/prices stay consistent
// with the rest of the app.
const demoOrders = [
  {
    orderId: 'BP-920049',
    date: 'Today, 2:14 PM',
    status: 'Preparing',
    orderType: 'delivery',
    delivery: { address: '12 Airport Road', city: 'Benin City' },
    deliveryFee: 1000,
    items: [
      { ...findItem(1), quantity: 1 },
      { ...findItem(4), quantity: 1 },
    ],
  },
  {
    orderId: 'BP-870021',
    date: 'Yesterday, 7:42 PM',
    status: 'Delivered',
    orderType: 'delivery',
    delivery: { address: '12 Airport Road', city: 'Benin City' },
    deliveryFee: 1000,
    items: [
      { ...findItem(7), quantity: 2 },
      { ...findItem(11), quantity: 2 },
    ],
  },
  {
    orderId: 'BP-810934',
    date: '3 days ago, 1:05 PM',
    status: 'Delivered',
    orderType: 'pickup',
    delivery: null,
    deliveryFee: 0,
    items: [
      { ...findItem(8), quantity: 1 },
      { ...findItem(12), quantity: 1 },
    ],
  },
];

function getOrderSubtotal(order) {
  return order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

const statusClassMap = {
  Confirmed: 'status-confirmed',
  Preparing: 'status-preparing',
  Ready: 'status-ready',
  Delivered: 'status-delivered',
};

function Orders() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleReorder = (order) => {
    order.items.forEach((item) => {
      for (let i = 0; i < item.quantity; i++) {
        addToCart(item);
      }
    });
    navigate('/cart');
  };

  // ===== Empty state =====
  if (demoOrders.length === 0) {
    return (
      <div className="dashboard-page-wrap">
        <DashboardHeader />
        <div className="cart-empty-state">
          <Package size={44} />
          <h2>No orders yet</h2>
          <p>Once you place an order, it'll show up here.</p>
          <Link to="/menu">
            <Button className="btn-primary btn-large">Explore Menu</Button>
          </Link>
        </div>
        <BottomNav />
      </div>
    );
  }

  // ===== Order Detail view =====
  if (selectedOrder) {
    const subtotal = getOrderSubtotal(selectedOrder);
    const total = subtotal + selectedOrder.deliveryFee;

    return (
      <div className="dashboard-page-wrap">
        <DashboardHeader />

        <main className="dashboard-main orders-page">
          <div className="placeholder-header">
            <button className="icon-btn" onClick={() => setSelectedOrder(null)}>
              <ArrowLeft size={20} />
            </button>
            <h1>Order Details</h1>
          </div>

          <div className="order-summary order-detail-card">
            <div className="order-detail-top">
              <div>
                <p className="order-detail-id">Order #{selectedOrder.orderId}</p>
                <p className="order-detail-date">{selectedOrder.date}</p>
              </div>
              <span className={`order-status-badge ${statusClassMap[selectedOrder.status]}`}>
                {selectedOrder.status}
              </span>
            </div>

            <div className="summary-divider"></div>

            <div className="checkout-items-list">
              {selectedOrder.items.map((item) => (
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
              <span>{selectedOrder.orderType === 'delivery' ? 'Delivery Fee' : 'Pickup Fee'}</span>
              <span>{selectedOrder.deliveryFee > 0 ? formatNaira(selectedOrder.deliveryFee) : 'Free'}</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row summary-total">
              <span>Total</span>
              <span>{formatNaira(total)}</span>
            </div>

            <div className="confirmation-meta">
              <p className="confirmation-meta-row">
                {selectedOrder.orderType === 'delivery' ? (
                  <>
                    <MapPin size={15} />
                    <span>
                      <strong>Delivered to:</strong> {selectedOrder.delivery.address}, {selectedOrder.delivery.city}
                    </span>
                  </>
                ) : (
                  <>
                    <Store size={15} />
                    <span><strong>Pickup Order</strong></span>
                  </>
                )}
              </p>
            </div>

            <Button
              className="btn-primary btn-large reorder-btn"
              onClick={() => handleReorder(selectedOrder)}
            >
              <RotateCcw size={16} /> Reorder
            </Button>
          </div>
        </main>

        <BottomNav />
      </div>
    );
  }

  // ===== Order List view =====
  return (
    <div className="dashboard-page-wrap">
      <DashboardHeader />

      <main className="dashboard-main orders-page">
        <h1 className="orders-title">Your Orders</h1>

        <div className="orders-list">
          {demoOrders.map((order) => {
            const subtotal = getOrderSubtotal(order);
            const total = subtotal + order.deliveryFee;

            return (
              <div className="order-card" key={order.orderId}>
                <div className="order-card-top">
                  <div>
                    <p className="order-card-id">Order #{order.orderId}</p>
                    <p className="order-card-date">{order.date}</p>
                  </div>
                  <span className={`order-status-badge ${statusClassMap[order.status]}`}>
                    {order.status}
                  </span>
                </div>

                <p className="order-card-items">
                  {order.items.map((item) => item.name).join(', ')}
                </p>

                <div className="order-card-bottom">
                  <div className="order-card-meta">
                    <span className="order-card-type">
                      {order.orderType === 'delivery' ? 'Delivery' : 'Pickup'}
                    </span>
                    <span className="order-card-total">{formatNaira(total)}</span>
                  </div>

                  <div className="order-card-actions">
                    <Button
                      className="btn-outline btn-small"
                      onClick={() => setSelectedOrder(order)}
                    >
                      Order Details
                    </Button>
                    <Button
                      className="btn-primary btn-small reorder-btn-small"
                      onClick={() => handleReorder(order)}
                    >
                      <RotateCcw size={14} /> Reorder
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="orders-explore-more">
          <ShoppingBag size={16} />
          <Link to="/menu">Explore more of the menu</Link>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}

export default Orders;