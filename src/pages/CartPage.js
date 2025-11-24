import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, clearCart } from '../redux/cartSlice';
import { addOrder } from '../redux/orderHistorySlice';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CartPage() {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    // Save order to history before clearing cart
    dispatch(addOrder({ items: cartItems, total }));
    dispatch(clearCart());
    toast.success('Order placed!');
    navigate('/confirmation');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-4 dark:text-white">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingCart size={64} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">Your cart is empty.</p>
          <Link
            to="/menu"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Browse Menu
          </Link>
        </div>
      ) : (
        <>
          <ul className="space-y-4">
            {cartItems.map(item => (
              <li
                key={item.id}
                className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded shadow"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full sm:w-24 h-24 object-cover rounded"
                />

                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-lg font-semibold dark:text-white">{item.name}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{item.description}</p>
                  <p className="text-sm font-medium dark:text-gray-300">
                    {item.quantity} x ${item.price.toFixed(2)} = $
                    {(item.quantity * item.price).toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    -
                  </button>
                  <span className="px-2 font-medium dark:text-white">{item.quantity}</span>
                  <button
                    onClick={() => dispatch(addToCart(item))}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded shadow">
            <h3 className="text-xl font-semibold dark:text-white">Total: ${total.toFixed(2)}</h3>
            <button
              onClick={handleCheckout}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
