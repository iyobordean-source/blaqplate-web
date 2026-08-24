import { Home, UtensilsCrossed, ClipboardList, User } from 'lucide-react';

function BottomNav() {
  const navItems = [
    { label: 'Home', icon: Home, active: true },
    { label: 'Menu', icon: UtensilsCrossed, active: false },
    { label: 'Orders', icon: ClipboardList, active: false },
    { label: 'Profile', icon: User, active: false },
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map(({ label, icon: Icon, active }) => (
        <button
          key={label}
          className={`bottom-nav-item ${active ? 'active' : ''}`}
          onClick={() => alert(`${label} page coming soon`)}
        >
          <Icon size={20} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}

export default BottomNav;