import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { Clock, ShoppingBag, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function OrderHistoryPage() {
  const orders = useSelector(state => state.orderHistory.orders);
  const dispatch = useDispatch();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleReorder = (items) => {
    items.forEach(item => {
      for (let i = 0; i < item.quantity; i++) {
        dispatch(addToCart(item));
      }
    });
    toast.success('Items added to cart!');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 dark:text-white flex items-center gap-2">
        <Clock className="text-blue-500" />
        Order History
      </h1>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingBag size={64} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
            You haven't placed any orders yet.
          </p>
          <Link
            to="/menu"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Browse Menu
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div
              key={order.id}
              className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow p-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Order #{order.id}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(order.date)}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-lg font-semibold dark:text-white">
                    ${order.total.toFixed(2)}
                  </span>
                  <button
                    onClick={() => handleReorder(order.items)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                  >
                    <RotateCcw size={14} />
                    Reorder
                  </button>
                </div>
              </div>

              <div className="border-t dark:border-gray-700 pt-4">
                <ul className="space-y-2">
                  {order.items.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 text-sm"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-medium dark:text-white">{item.name}</p>
                        <p className="text-gray-500 dark:text-gray-400">
                          {item.quantity} x ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">
                        ${(item.quantity * item.price).toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
