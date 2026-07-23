import { Pencil, Trash2 } from "lucide-react";

const CategoryTable = ({
  categories,
  loading,
  onEdit,
  onDelete,
}) => {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-8 text-center">
        Loading categories...
      </div>
    );
  }

  if (!categories.length) {
    return (
      <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
        No categories found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow">
      <table className="min-w-full">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="text-left px-6 py-4">Name</th>
            <th className="text-left px-6 py-4">Slug</th>
            <th className="text-left px-6 py-4">Created</th>
            <th className="text-center px-6 py-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((category) => (
            <tr
              key={category.id}
              className="border-b hover:bg-gray-50"
            >
              <td className="px-6 py-4 font-medium">
                {category.name}
              </td>

              <td className="px-6 py-4 text-gray-600">
                {category.slug}
              </td>

              <td className="px-6 py-4 text-gray-600">
                {new Date(category.created_at).toLocaleDateString()}
              </td>

              <td className="px-6 py-4">
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => onEdit(category)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => onDelete(category)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;