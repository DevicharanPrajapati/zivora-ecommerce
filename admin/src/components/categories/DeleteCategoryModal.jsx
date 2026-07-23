import { useDispatch } from "react-redux";

import { deleteCategoryThunk } from "../../features/category/categoryThunks";

const DeleteCategoryModal = ({ open, onClose, category }) => {
  const dispatch = useDispatch();

  // Don't render the modal if it's closed
  if (!open || !category) return null;

  const handleDelete = async () => {
    // Dispatch delete action
    const result = await dispatch(deleteCategoryThunk(category.id));

    // Close modal only if deletion succeeds
    if (deleteCategoryThunk.fulfilled.match(result)) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-gray-900">
          Delete Category
        </h2>

        <p className="mt-3 text-gray-600">
          Are you sure you want to delete{" "}
          <span className="font-semibold">{category.name}</span>?
        </p>

        <p className="mt-2 text-sm text-red-500">
          This action cannot be undone.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border px-4 py-2 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCategoryModal;