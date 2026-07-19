import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../../features/auth/authThunks";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading } = useSelector((state) => state.auth);

  const from = location.state?.from?.pathname || "/dashboard";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(loginThunk(formData));

    if (loginThunk.fulfilled.match(result)) {
      toast.success("Welcome Admin");
      navigate(from, { replace: true });
    } else {
      toast.error(result.payload || "Login failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md space-y-5 rounded-xl bg-white p-8 shadow-lg"
    >
      <div>
        <h1 className="text-3xl font-bold">Admin Login</h1>
        <p className="mt-2 text-gray-500">
          Sign in to continue
        </p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Email
        </label>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email"
          className="w-full rounded-lg border p-3 outline-none focus:border-black"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Password
        </label>

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password"
          className="w-full rounded-lg border p-3 outline-none focus:border-black"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-black py-3 font-semibold text-white transition hover:bg-gray-800 disabled:opacity-50"
      >
        {loading ? "Signing In..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;