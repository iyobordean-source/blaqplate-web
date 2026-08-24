import { useState, useMemo } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import SearchBar from '../components/SearchBar';
import CategoryList from '../components/CategoryList';
import FoodCard from '../components/FoodCard';
import BottomNav from '../components/BottomNav';
import { categories, menuItems } from '../data/menuData';

function Menu() {
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
    <div className="dashboard-page-wrap">
      <DashboardHeader />

      <main className="dashboard-main">
        <section className="menu-title-section">
          <h1>Our Menu</h1>
          <p>Freshly prepared meals, ready when you are.</p>
        </section>

        <SearchBar value={searchTerm} onChange={setSearchTerm} />

        <CategoryList
          categories={categories}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />

        <section className="popular-section menu-results">
          {filteredItems.length > 0 ? (
            <div className="food-grid">
              {filteredItems.map((item) => (
                <FoodCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="empty-state-block">
              <p>No meals found</p>
              <span>Try a different search term or category.</span>
            </div>
          )}
        </section>
      </main>

      <BottomNav />
    </div>
  );
}

export default Menu;