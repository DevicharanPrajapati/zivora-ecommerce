import { Link } from "react-router-dom";
import { FiHeart, FiShoppingCart, FiUser } from "react-icons/fi";

const NavIcons = ({ totalItems}) => {

  return (
    <div className="flex items-center gap-5">
      <Link
        to="/login"
        className="text-gray-700 hover:text-olive-500 transition"
      >
        <FiUser size={24} />
      </Link>

      <Link
        to="/wishlist"
        className="text-gray-700 hover:text-red-600 transition"
      >
        <FiHeart size={24} />
      </Link>

      <Link
        to="/cart"
        className="relative text-gray-700 hover:text-blue-600 transition"
      >
        <FiShoppingCart size={24} />

        {/* Cart Count */}
        <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
          {totalItems}
        </span>
      </Link>
    </div>
  );
};

export default NavIcons;
