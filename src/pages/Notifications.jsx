import { Link } from 'react-router-dom';
import { Bell, ArrowLeft } from 'lucide-react';

function Notifications() {
  return (
    <div className="placeholder-page">
      <div className="placeholder-header">
        <Link to="/dashboard" className="icon-btn">
          <ArrowLeft size={20} />
        </Link>
        <h1>Notifications</h1>
      </div>

      <div className="placeholder-empty">
        <Bell size={40} />
        <p>You have no notifications yet.</p>
        <span>Order updates and rewards alerts will appear here.</span>
      </div>
    </div>
  );
}

export default Notifications;