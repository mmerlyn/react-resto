import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/cartSlice';
import { toggleFavorite } from '../redux/favoritesSlice';
import { Heart } from 'lucide-react';
import toast from 'react-hot-toast';

export default function MenuItem({ item }) {
  const dispatch = useDispatch();
  const cartItem = useSelector(state =>
    state.cart.items.find(cart => cart.id === item.id)
  );
  const isFavorite = useSelector(state =>
    state.favorites.items.some(fav => fav.id === item.id)
  );

  const handleAdd = () => {
    dispatch(addToCart(item));
    toast.success(`${item.name} added to cart`);
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
    toast.success(`${item.name} removed`);
  };

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(item));
    if (isFavorite) {
      toast.success(`${item.name} removed from favorites`);
    } else {
      toast.success(`${item.name} added to favorites`);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow hover:shadow-md transition overflow-hidden relative">
      {/* Favorite Button */}
      <button
        onClick={handleToggleFavorite}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:scale-110 transition-transform"
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <Heart
          size={20}
          className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400 dark:text-gray-500'}
        />
      </button>

      {/* Image wrapper */}
      <div className="w-full" style={{ height: '192px', overflow: 'hidden' }}>
        <img
          src={item.image}
          alt={item.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-xl font-semibold mb-1 dark:text-white">{item.name}</h3>
          {item.category && (
            <span className="text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full whitespace-nowrap">
              {item.category}
            </span>
          )}
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{item.description}</p>
        <p className="text-gray-800 dark:text-gray-200 font-medium mb-3">${item.price.toFixed(2)}</p>

        {cartItem ? (
          <div className="flex items-center gap-2">
            <button
              onClick={handleRemove}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              -
            </button>
            <span className="font-medium dark:text-white">{cartItem.quantity}</span>
            <button
              onClick={handleAdd}
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}
