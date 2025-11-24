import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function ConfirmationPage() {
  return (
    <div className="text-center mt-20">
      <CheckCircle size={80} className="mx-auto text-green-500 mb-4" />
      <h1 className="text-3xl font-bold mb-4 dark:text-white">Order Confirmed!</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Thank you for ordering with React-Resto.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/menu"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Back to Menu
        </Link>
        <Link
          to="/orders"
          className="inline-block bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-6 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          View Order History
        </Link>
      </div>
    </div>
  );
}
