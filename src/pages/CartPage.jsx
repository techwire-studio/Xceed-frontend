import { useCart } from "../context/CartContext";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => {
        const price = item.price || 0;
        return total + price * item.quantity;
      }, 0)
      .toFixed(2);
  };

  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <ShoppingBag size={64} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Your Cart is Empty</h2>
          <p className="text-gray-500 mt-2">
            Browse our products and add items to your cart.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft size={18} className="mr-2" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-6">
          <button
            onClick={handleGoBack}
            className="mr-4 flex items-center text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft size={20} className="mr-1" />
            <span>Back</span>
          </button>
          <h2 className="text-3xl font-bold text-gray-800">Your Cart</h2>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="p-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center border-b py-4 last:border-b-0"
              >
                <div className="flex-grow">
                  <h3 className="text-lg font-medium text-gray-900">
                    {item.name || "Unnamed Product"}
                  </h3>
                  <p className="text-sm text-gray-500">Part Number: {item.id}</p>
                  <p className="text-sm text-gray-600">
                    Price: ${item.price || "N/A"}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border rounded">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-4">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 hover:bg-gray-100"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:text-red-800"
                    aria-label="Remove item"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold text-gray-700">Subtotal:</span>
              <span className="font-bold text-xl">${calculateTotal()}</span>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <button
                onClick={clearCart}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Clear Cart
              </button>
              
              <div className="flex gap-3">
                <button
                  onClick={handleGoBack}
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Continue Shopping
                </button>
                <button
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;