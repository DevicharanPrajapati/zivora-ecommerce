import { X } from "lucide-react";

const UserDetailsModal = ({ open, onClose, user }) => {
  if (!open || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl rounded-xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-5">
          <h2 className="text-xl font-semibold">User Details</h2>

          <button
            onClick={onClose}
            className="rounded p-2 transition hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-6 p-6">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <img
              src={
                user.avtar ||
                "https://ui-avatars.com/api/?name=User&background=random"
              }
              alt={user.fullName}
              className="h-20 w-20 rounded-full object-cover"
            />

            <div>
              <h3 className="text-xl font-semibold">
                {user.fullName || "N/A"}
              </h3>

              <p className="text-gray-500">{user.email}</p>
            </div>
          </div>

          {/* Information */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InfoCard title="Phone" value={user.phone || "-"} />

            <InfoCard title="Role" value={user.role} />

            <InfoCard title="Address" value={user.address || "-"} />

            <InfoCard
              title="Joined"
              value={new Date(user.created_at).toLocaleString()}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t p-5">
          <button
            onClick={onClose}
            className="rounded-lg bg-gray-900 px-5 py-2 text-white transition hover:bg-gray-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ title, value }) => (
  <div className="rounded-lg border p-4">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="mt-1 font-medium text-gray-900">{value}</p>
  </div>
);

export default UserDetailsModal;