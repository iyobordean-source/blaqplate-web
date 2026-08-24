import { Search } from 'lucide-react';

function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <Search size={18} className="search-icon" />
      <input
        type="text"
        placeholder="Search for meals..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;