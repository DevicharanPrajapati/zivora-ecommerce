import { Bell, Menu, UserCircle } from "lucide-react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <header className="h-16 bg-white border-b px-6 flex items-center justify-between">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button className="lg:hidden">
          <Menu size={22} />
        </button>

        <h1 className="text-2xl font-semibold text-gray-800">
          Dashboard
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        <button className="relative">
          <Bell size={22} />
          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        <div className="flex items-center gap-3">
          <UserCircle size={36} className="text-gray-500" />

          <div className="hidden sm:block">
            <p className="font-medium">
              {user?.fullName || "Admin"}
            </p>

            <p className="text-sm text-gray-500">
              {user?.email}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;