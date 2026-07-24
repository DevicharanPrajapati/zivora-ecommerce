import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchUsersThunk } from "../../features/users/userThunks";

import UserFilters from "../../components/users/UserFilters";
import UserTable from "../../components/users/UserTable";
import UserDetailsModal from "../../components/users/UserDetailsModal";

const UsersPage = () => {
  const dispatch = useDispatch();

  const { users, loading, error } = useSelector((state) => state.users);

  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");

  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchUsersThunk());
  }, [dispatch]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        (user.fullName || "")
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        user.email
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesRole =
        role === "all" || user.role === role;

      return matchesSearch && matchesRole;
    });
  }, [users, search, role]);

  const handleView = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Users
        </h1>

        <p className="text-sm text-gray-500">
          Manage all registered users.
        </p>
      </div>

      {/* Filters */}
      <UserFilters
        search={search}
        setSearch={setSearch}
        role={role}
        setRole={setRole}
      />

      {/* Loading */}
      {loading && (
        <div className="rounded-lg bg-white p-6 text-center shadow">
          Loading users...
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="rounded-lg bg-red-100 p-4 text-red-600">
          {error}
        </div>
      )}

      {/* Table */}
      {!loading && !error && (
        <UserTable
          users={filteredUsers}
          onView={handleView}
        />
      )}

      {/* Modal */}
      <UserDetailsModal
        open={isModalOpen}
        onClose={handleClose}
        user={selectedUser}
      />
    </div>
  );
};

export default UsersPage;