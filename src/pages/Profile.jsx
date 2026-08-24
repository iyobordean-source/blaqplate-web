import { Link } from 'react-router-dom';
import { User, ArrowLeft, ChevronRight } from 'lucide-react';

function Profile() {
  const menuItems = ['My Orders', 'Saved Addresses', 'Payment Methods', 'Rewards', 'Settings', 'Help & Support'];

  return (
    <div className="placeholder-page">
      <div className="placeholder-header">
        <Link to="/dashboard" className="icon-btn">
          <ArrowLeft size={20} />
        </Link>
        <h1>Profile</h1>
      </div>

      <div className="profile-summary">
        <div className="profile-avatar">
          <User size={28} />
        </div>
        <div>
          <p className="profile-name">Guest User</p>
          <p className="profile-email">guest@example.com</p>
        </div>
      </div>

      <div className="profile-menu">
        {menuItems.map((item) => (
          <button key={item} className="profile-menu-item" onClick={() => alert(`${item} coming soon`)}>
            <span>{item}</span>
            <ChevronRight size={18} />
          </button>
        ))}
      </div>
    </div>
  );
}

export default Profile;