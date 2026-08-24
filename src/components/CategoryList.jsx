function CategoryList({ categories, activeCategory, onSelect }) {
  return (
    <div className="category-list">
      {categories.map((category) => (
        <button
          key={category}
          className={`category-pill ${activeCategory === category ? 'active' : ''}`}
          onClick={() => onSelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryList;
