import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { useParams } from "react-router-dom";


const SuccessOrderPage = () => {
  const { orderId } = useParams();

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <CheckCircle
          size={80}
          className="mx-auto text-green-500 mb-6"
        />

        <h1 className="text-3xl font-bold mb-3">
          Order Placed Successfully!
        </h1>
         <p> Order ID: {orderId}</p>
        <p className="text-gray-600 mb-8">
          Thank you for shopping with us.
          <br />
          Your order has been received and is being processed.
        </p>

        <div className="space-y-3">
          <Link
            to="/orders"
            className="block w-full bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition"
          >
            View My Orders
          </Link>

          <Link
            to="/shop"
            className="block w-full border border-black py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessOrderPage;