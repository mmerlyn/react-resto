import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite, clearFavorites } from '../redux/favoritesSlice';
import toast from 'react-hot-toast';

export default function useFavorites() {
  const dispatch = useDispatch();
  const items = useSelector(state => state.favorites.items);

  const count = items.length;

  const isFavorite = (itemId) => items.some(fav => fav.id === itemId);

  const toggle = (item, showToast = true) => {
    const wasFavorite = isFavorite(item.id);
    dispatch(toggleFavorite(item));
    if (showToast) {
      if (wasFavorite) {
        toast.success(`${item.name} removed from favorites`);
      } else {
        toast.success(`${item.name} added to favorites`);
      }
    }
  };

  const clear = () => {
    dispatch(clearFavorites());
  };

  return {
    items,
    count,
    isFavorite,
    toggle,
    clear,
  };
}
