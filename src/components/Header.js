import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Home, Pizza, ShoppingCart, Heart, Clock, Sun, Moon } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/themeSlice';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const cartCount = useSelector(state =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );
  const favoritesCount = useSelector(state => state.favorites.items.length);
  const darkMode = useSelector(state => state.theme.darkMode);

  const navLinkBase =
    'flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors duration-200';
  const activeClass = 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-semibold';
  const hoverClass = 'hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400';

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50 border-b dark:border-gray-700">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 h-16">
        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-2 text-2xl font-extrabold text-blue-700 dark:text-blue-400 tracking-tight"
        >
          <Home size={24} className="text-blue-500 dark:text-blue-400" />
          <span className="font-sans">ReactResto</span>
        </NavLink>

        {/* Mobile Toggle */}
        <button
          className="sm:hidden text-2xl text-gray-700 dark:text-gray-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex gap-4 text-base font-medium items-center">
          <NavLink
            to="/menu"
            className={({ isActive }) =>
              `${navLinkBase} ${isActive ? activeClass : 'text-gray-700 dark:text-gray-300'} ${hoverClass}`
            }
          >
            <Pizza size={18} />
            Menu
          </NavLink>

          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `${navLinkBase} ${isActive ? activeClass : 'text-gray-700 dark:text-gray-300'} ${hoverClass}`
            }
          >
            <div className="relative flex items-center">
              <Heart size={18} />
              {favoritesCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {favoritesCount}
                </span>
              )}
            </div>
            <span>Favorites</span>
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `${navLinkBase} ${isActive ? activeClass : 'text-gray-700 dark:text-gray-300'} ${hoverClass}`
            }
          >
            <div className="relative flex items-center">
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </div>
            <span>Cart</span>
          </NavLink>

          <NavLink
            to="/orders"
            className={({ isActive }) =>
              `${navLinkBase} ${isActive ? activeClass : 'text-gray-700 dark:text-gray-300'} ${hoverClass}`
            }
          >
            <Clock size={18} />
            Orders
          </NavLink>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => dispatch(toggleTheme())}
            className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </nav>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <nav className="sm:hidden px-4 pb-4 flex flex-col gap-3 text-base font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900">
          <NavLink
            to="/menu"
            className={({ isActive }) =>
              `${navLinkBase} ${isActive ? activeClass : ''} ${hoverClass}`
            }
            onClick={() => setIsOpen(false)}
          >
            <Pizza size={18} />
            Menu
          </NavLink>

          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `${navLinkBase} ${isActive ? activeClass : ''} ${hoverClass}`
            }
            onClick={() => setIsOpen(false)}
          >
            <div className="relative flex items-center">
              <Heart size={18} />
              {favoritesCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {favoritesCount}
                </span>
              )}
            </div>
            <span>Favorites</span>
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `${navLinkBase} ${isActive ? activeClass : ''} ${hoverClass}`
            }
            onClick={() => setIsOpen(false)}
          >
            <div className="relative flex items-center">
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </div>
            <span>Cart</span>
          </NavLink>

          <NavLink
            to="/orders"
            className={({ isActive }) =>
              `${navLinkBase} ${isActive ? activeClass : ''} ${hoverClass}`
            }
            onClick={() => setIsOpen(false)}
          >
            <Clock size={18} />
            Orders
          </NavLink>

          {/* Dark Mode Toggle - Mobile */}
          <button
            onClick={() => dispatch(toggleTheme())}
            className={`${navLinkBase} ${hoverClass}`}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </nav>
      )}
    </header>
  );
}
