import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import NavIcons from "../components/Navbar/NavIcons";
import NavLink from "../components/Navbar/NavLinks";
import SearchBar from "./Navbar/SearchBar";
import { fetchCartThunk } from "../features/cart/cartThunks";

const Navbar = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { items, loading, error } = useSelector((state) => state.cart);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCartThunk(user.id));
    }
  }, [dispatch, user?.id]);

  const totalItems = items.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0
  );

  return (
    <div className="flex items-center justify-around p-2 shadow-md">
      <h1 className="text-2xl font-bold">ZIVORA</h1>

      <NavLink />

      <SearchBar />

      <NavIcons
        totalItems={totalItems}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default Navbar;