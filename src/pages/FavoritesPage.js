import { useSelector } from 'react-redux';
import MenuItem from '../components/MenuItem';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FavoritesPage() {
  const favorites = useSelector(state => state.favorites.items);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 dark:text-white flex items-center gap-2">
        <Heart className="text-red-500" />
        My Favorites
      </h1>

      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <Heart size={64} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
            You haven't added any favorites yet.
          </p>
          <Link
            to="/menu"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Browse Menu
          </Link>
        </div>
      ) : (
        <>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            {favorites.length} item{favorites.length !== 1 ? 's' : ''} in your favorites
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map(item => (
              <MenuItem key={item.id} item={item} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
