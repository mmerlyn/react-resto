import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import useDebounce from './useDebounce';

export default function useMenuSearch() {
  const menuItems = useSelector(state => state.menu.items);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');

  // Debounce search query for better performance
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const categories = useMemo(() => {
    return ['All', ...new Set(menuItems.map(item => item.category).filter(Boolean))];
  }, [menuItems]);

  const filteredItems = useMemo(() => {
    let result = [...menuItems];

    // Filter by debounced search query
    if (debouncedSearchQuery.trim()) {
      const query = debouncedSearchQuery.toLowerCase();
      result = result.filter(
        item =>
          item.name.toLowerCase().includes(query) ||
          item.description?.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      result = result.filter(item => item.category === selectedCategory);
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    return result;
  }, [menuItems, debouncedSearchQuery, selectedCategory, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSortBy('default');
  };

  const hasActiveFilters = debouncedSearchQuery || selectedCategory !== 'All';
  const isSearching = searchQuery !== debouncedSearchQuery;

  return {
    // Data
    allItems: menuItems,
    filteredItems,
    categories,

    // State
    searchQuery,
    selectedCategory,
    sortBy,
    hasActiveFilters,
    isSearching,

    // Actions
    setSearchQuery,
    setSelectedCategory,
    setSortBy,
    clearFilters,
  };
}
