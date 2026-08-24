import { Bell, User } from 'lucide-react';
import { Link } from 'react-router-dom';

function DashboardHeader() {
  return (
    <header className="dash-header">
      <div className="dash-header-inner">
        <Link to="/dashboard" className="dash-logo">
          BLAQ<span>PLATE</span>
        </Link>

        <div className="dash-header-icons">
          <Link to="/notifications" className="icon-btn" aria-label="Notifications">
            <Bell size={20} />
          </Link>
          <Link to="/profile" className="icon-btn" aria-label="Profile">
            <User size={20} />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;