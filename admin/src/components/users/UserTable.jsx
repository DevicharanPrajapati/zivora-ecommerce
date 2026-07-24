import { Eye } from "lucide-react";

const UserTable = ({ users, onView }) => {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold">
              User
            </th>

            <th className="px-6 py-3 text-left text-sm font-semibold">
              Email
            </th>

            <th className="px-6 py-3 text-left text-sm font-semibold">
              Phone
            </th>

            <th className="px-6 py-3 text-left text-sm font-semibold">
              Role
            </th>

            <th className="px-6 py-3 text-left text-sm font-semibold">
              Joined
            </th>

            <th className="px-6 py-3 text-center text-sm font-semibold">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {users.length > 0 ? (
            users.map((user) => (
              <tr
                key={user.id}
                className="transition hover:bg-gray-50"
              >
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
                      alt={user.fullName}
                      className="h-10 w-10 rounded-full object-cover"
                    />

                    <span className="font-medium">
                      {user.fullName || "N/A"}
                    </span>
                  </div>
                </td>

                {/* Email */}
                <td className="px-6 py-4">{user.email}</td>

                {/* Phone */}
                <td className="px-6 py-4">
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
                <td className="px-6 py-4">
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
            ))
          ) : (
            <tr>
              <td
                colSpan={6}
                className="py-10 text-center text-gray-500"
              >
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;