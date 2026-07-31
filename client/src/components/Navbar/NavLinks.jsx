import { Link } from "react-router-dom";


const NavLinks = () => {
  return (

    <nav>
        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="font-medium text-gray-700 transition hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            to="/category"
            className="font-medium text-gray-700 transition hover:text-blue-600"
          >
            Categories
          </Link>

          <Link
            to="/shop"
            className="font-medium text-gray-700 transition hover:text-blue-600"
          >
            Shop
          </Link>

            {/* <Link to="/register">
              <button className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700">
                Sign Up
              </button>
            </Link> */}
        </div>
     
    </nav>
  );
};

export default NavLinks;
