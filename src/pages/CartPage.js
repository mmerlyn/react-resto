import { useCart } from '../hooks';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Trash2 } from 'lucide-react';

export default function CartPage() {
  const { items, total, addItem, removeItem, updateQuantity, checkout } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (checkout()) {
      navigate('/confirmation');
    }
  };

  const handleQuantityChange = (item, value) => {
    const quantity = parseInt(value, 10);
    if (!isNaN(quantity) && quantity >= 0) {
      updateQuantity(item.id, quantity);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold dark:text-white">Your Cart</h1>
        <Link
          to="/menu"
          className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
        >
          <ArrowLeft size={18} />
          Continue Shopping
        </Link>
      </div>

      {items.length === 0 ? (
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
            {items.map(item => (
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
                    ${item.price.toFixed(2)} each
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => removeItem(item.id, item.name, false)}
                      className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="0"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item, e.target.value)}
                      className="w-16 h-8 text-center border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      aria-label="Item quantity"
                    />
                    <button
                      onClick={() => addItem(item, false)}
                      className="w-8 h-8 flex items-center justify-center bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => updateQuantity(item.id, 0)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="text-right min-w-[80px]">
                  <p className="font-semibold dark:text-white">
                    ${(item.quantity * item.price).toFixed(2)}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded shadow">
            <h3 className="text-xl font-semibold dark:text-white">Total: ${total.toFixed(2)}</h3>
            <div className="flex gap-3">
              <Link
                to="/menu"
                className="px-6 py-2 border border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 rounded hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
              >
                Continue Shopping
              </Link>
              <button
                onClick={handleCheckout}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
