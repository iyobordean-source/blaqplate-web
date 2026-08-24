import { Bell, User, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function DashboardHeader() {
  const { totalItems } = useCart();

  return (
    <header className="dash-header">
      <div className="dash-header-inner">
        <Link to="/dashboard" className="dash-logo">
          BLAQ<span>PLATE</span>
        </Link>

        <div className="dash-header-icons">
          <Link to="/cart" className="icon-btn cart-btn" aria-label="Cart">
            <ShoppingCart size={20} />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>

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