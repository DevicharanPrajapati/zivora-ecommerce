import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-12 md:grid-cols-4">
        {/* Brand */}
        <div>
          <h2 className="mb-4 text-2xl font-bold text-white">ZIVORA</h2>
          <p className="text-sm leading-6">
            Discover quality products at affordable prices. Shop with
            confidence and enjoy fast delivery.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">
            Quick Links
          </h3>

          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-white">
                Home
              </Link>
            </li>

            <li>
              <Link to="/products" className="hover:text-white">
                Products
              </Link>
            </li>

            <li>
              <Link to="/categories" className="hover:text-white">
                Categories
              </Link>
            </li>

            <li>
              <Link to="/cart" className="hover:text-white">
                Cart
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer */}
        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">
            Customer
          </h3>

          <ul className="space-y-2">
            <li>
              <Link to="#" className="hover:text-white">
                About Us
              </Link>
            </li>

            <li>
              <Link to="#" className="hover:text-white">
                Contact
              </Link>
            </li>

            <li>
              <Link to="#" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>

            <li>
              <Link to="#" className="hover:text-white">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">
            Follow Us
          </h3>

          <div className="flex gap-4 text-2xl">
            <a href="#" className="hover:text-blue-500">
              <FaFacebook />
            </a>

            <a href="#" className="hover:text-pink-500">
              <FaInstagram />
            </a>

            <a href="#" className="hover:text-sky-400">
              <FaTwitter />
            </a>

            <a href="#" className="hover:text-white">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 py-4 text-center text-sm">
        © {new Date().getFullYear()} ZIVORA. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;