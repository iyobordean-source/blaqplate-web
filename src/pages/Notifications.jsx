import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  ChefHat,
  PackageCheck,
  Truck,
  Gift,
  UtensilsCrossed,
  Bell,
} from 'lucide-react';

const initialNotifications = [
  {
    id: 1,
    type: 'order',
    icon: CheckCircle2,
    title: 'Order #BP-920049 confirmed',
    description: "We've received your order and it's being reviewed by the kitchen.",
    time: '2 minutes ago',
    read: false,
  },
  {
    id: 2,
    type: 'order',
    icon: ChefHat,
    title: 'Your order is being prepared',
    description: 'Order #BP-920049 is now being cooked fresh by our kitchen team.',
    time: '18 minutes ago',
    read: false,
  },
  {
    id: 3,
    type: 'order',
    icon: PackageCheck,
    title: 'Your order is ready',
    description: 'Order #BP-920049 is packed and ready for pickup/delivery.',
    time: '35 minutes ago',
    read: false,
  },
  {
    id: 4,
    type: 'order',
    icon: Truck,
    title: 'Your order has been delivered',
    description: 'Order #BP-870021 was delivered. We hope you enjoyed your meal!',
    time: 'Yesterday',
    read: true,
  },
  {
    id: 5,
    type: 'bonus',
    icon: Gift,
    title: 'Your monthly 5% bonus is ready to redeem',
    description: 'You have ₦2,500 available to use on your next order.',
    time: 'Yesterday',
    read: false,
  },
  {
    id: 6,
    type: 'menu',
    icon: UtensilsCrossed,
    title: 'New meal added to the menu',
    description: 'Try our new Loaded Pepperoni Pizza — now available to order.',
    time: '2 days ago',
    read: true,
  },
];

function Notifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleNotificationClick = (notification) => {
    markAsRead(notification.id);

    if (notification.type === 'order') {
      // No dedicated Orders page yet — routing to Dashboard as the closest existing equivalent.
      navigate('/dashboard');
    } else if (notification.type === 'bonus') {
      navigate('/rewards');
    } else if (notification.type === 'menu') {
      navigate('/menu');
    }
  };

  return (
    <div className="placeholder-page">
      <div className="placeholder-header notif-header">
        <div className="notif-header-left">
          <Link to="/dashboard" className="icon-btn">
            <ArrowLeft size={20} />
          </Link>
          <h1>Notifications</h1>
        </div>

        {unreadCount > 0 && (
          <button className="mark-all-read-btn" onClick={markAllAsRead}>
            Mark all as read
          </button>
        )}
      </div>

      {notifications.length > 0 ? (
        <div className="notif-list">
          {notifications.map((notification) => {
            const Icon = notification.icon;
            return (
              <button
                key={notification.id}
                className={`notif-item ${!notification.read ? 'unread' : ''}`}
                onClick={() => handleNotificationClick(notification)}
              >
                <span className={`notif-icon notif-icon-${notification.type}`}>
                  <Icon size={18} />
                </span>

                <span className="notif-content">
                  <span className="notif-title-row">
                    <span className="notif-title">{notification.title}</span>
                    {!notification.read && <span className="notif-dot"></span>}
                  </span>
                  <span className="notif-desc">{notification.description}</span>
                  <span className="notif-time">{notification.time}</span>
                </span>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="placeholder-empty">
          <Bell size={40} />
          <p>You have no notifications yet.</p>
          <span>Order updates and rewards alerts will appear here.</span>
        </div>
      )}
    </div>
  );
}

export default Notifications;