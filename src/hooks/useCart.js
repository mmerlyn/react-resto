import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, setQuantity, clearCart } from '../redux/cartSlice';
import { addOrder } from '../redux/orderHistorySlice';
import toast from 'react-hot-toast';

export default function useCart() {
  const dispatch = useDispatch();
  const items = useSelector(state => state.cart.items);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const getItemQuantity = (itemId) => {
    const item = items.find(i => i.id === itemId);
    return item ? item.quantity : 0;
  };

  const isInCart = (itemId) => items.some(item => item.id === itemId);

  const addItem = (item, showToast = true) => {
    dispatch(addToCart(item));
    if (showToast) {
      toast.success(`${item.name} added to cart`);
    }
  };

  const removeItem = (itemId, itemName, showToast = true) => {
    dispatch(removeFromCart(itemId));
    if (showToast) {
      toast.success(`${itemName} removed`);
    }
  };

  const updateQuantity = (itemId, quantity) => {
    dispatch(setQuantity({ id: itemId, quantity }));
  };

  const clear = () => {
    dispatch(clearCart());
  };

  const checkout = () => {
    if (items.length === 0) return false;
    dispatch(addOrder({ items, total }));
    dispatch(clearCart());
    toast.success('Order placed!');
    return true;
  };

  return {
    items,
    total,
    itemCount,
    getItemQuantity,
    isInCart,
    addItem,
    removeItem,
    updateQuantity,
    clear,
    checkout,
  };
}
