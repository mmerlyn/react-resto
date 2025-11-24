import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';
import ConfirmationPage from './pages/ConfirmationPage';
import FavoritesPage from './pages/FavoritesPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import Header from './components/Header';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setMenu } from './redux/menuSlice';

function App() {
  const dispatch = useDispatch();
  const darkMode = useSelector(state => state.theme.darkMode);

  useEffect(() => {
    fetch('/menu.json')
      .then((res) => res.json())
      .then((data) => dispatch(setMenu(data)))
      .catch((err) => console.error('Failed to load menu:', err));
  }, [dispatch]);

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <Router>
      <Toaster position="top-right" />
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors">
        <Header />
        <main className="pt-6 px-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/orders" element={<OrderHistoryPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
