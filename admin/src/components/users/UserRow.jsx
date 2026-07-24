import { Eye } from "lucide-react";

const UserRow = ({ user, onView }) => {
  return (
    <tr className="transition hover:bg-gray-50">
      {/* User */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <img
            src={
              user.avatar ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                user.fullName || "User"
              )}`
            }
            alt={user.fullName || "User"}
            className="h-10 w-10 rounded-full object-cover"
          />

          <div>
            <p className="font-medium text-gray-900">
              {user.fullName || "N/A"}
            </p>

            <p className="text-xs text-gray-500">
              {user.id.slice(0, 8)}...
            </p>
          </div>
        </div>
      </td>

      {/* Email */}
      <td className="px-6 py-4 text-sm text-gray-700">
        {user.email}
      </td>

      {/* Phone */}
      <td className="px-6 py-4 text-sm text-gray-700">
        {user.phone || "-"}
      </td>

      {/* Role */}
      <td className="px-6 py-4">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            user.role === "admin"
              ? "bg-purple-100 text-purple-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {user.role}
        </span>
      </td>

      {/* Joined */}
      <td className="px-6 py-4 text-sm text-gray-700">
        {new Date(user.created_at).toLocaleDateString()}
      </td>

      {/* Actions */}
      <td className="px-6 py-4 text-center">
        <button
          onClick={() => onView(user)}
          className="rounded-md bg-blue-600 p-2 text-white transition hover:bg-blue-700"
          title="View User"
        >
          <Eye size={18} />
        </button>
      </td>
    </tr>
  );
};

export default UserRow;