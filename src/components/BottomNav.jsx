import { Home, UtensilsCrossed, ClipboardList, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Home', icon: Home, path: '/dashboard' },
    { label: 'Menu', icon: UtensilsCrossed, path: '/menu' },
    { label: 'Orders', icon: ClipboardList, path: null },
    { label: 'Profile', icon: User, path: '/profile' },
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map(({ label, icon: Icon, path }) => {
        const isActive = path === location.pathname;
        return (
          <button
            key={label}
            className={`bottom-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => (path ? navigate(path) : alert('Orders page coming soon'))}
          >
            <Icon size={20} />
            <span>{label}</span>
          </button>
        );
      })}
    </nav>
  );
}

export default BottomNav;