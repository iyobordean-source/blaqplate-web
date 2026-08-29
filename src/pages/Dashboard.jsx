import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import DashboardHeader from '../components/DashboardHeader';
import SearchBar from '../components/SearchBar';
import CategoryList from '../components/CategoryList';
import FeaturedFoodHero from '../components/FeaturedFoodHero';
import FoodCard from '../components/FoodCard';
import BonusCard from '../components/BonusCard';
import BottomNav from '../components/BottomNav';
import { categories, menuItems } from '../data/menuData';
import '../dashboard-redesign.css';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

const heroItem = menuItems.find((item) => item.featured) || menuItems[0];

function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, activeCategory]);

  return (
    <div className="dashboard-page-wrap dash-bg-accent">
      <DashboardHeader />

      <main className="dashboard-main">
        <section className="greeting-section dash-greeting-compact">
          <h1>{getGreeting()} 👋</h1>
          <p>What are you craving today?</p>
        </section>

        <FeaturedFoodHero item={heroItem} />

        <SearchBar value={searchTerm} onChange={setSearchTerm} />

        <CategoryList
          categories={categories}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />

        <BonusCard />

        <section className="popular-section">
          <div className="section-title-row">
            <h2>Popular Meals</h2>
            <Link to="/menu" className="view-menu-link">View Full Menu →</Link>
          </div>

          {filteredItems.length > 0 ? (
            <div className="food-grid dash-food-grid">
              {filteredItems.slice(0, 6).map((item) => (
                <FoodCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <p className="empty-state">No meals match your search.</p>
          )}
        </section>
      </main>

      <BottomNav />
    </div>
  );
}

export default Dashboard;