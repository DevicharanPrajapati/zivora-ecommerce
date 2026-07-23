import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchCategoriesThunk } from "../../features/category/categoryThunks";

import CategoryTable from "../../components/categories/CategoryTable";
import CategoryFormModal from "../../components/categories/CategoryFormModal";
import DeleteCategoryModal from "../../components/categories/DeleteCategoryModal";

const CategoriesPage = () => {
  const dispatch = useDispatch();

  const { categories, loading } = useSelector((state) => state.category);

  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const [showDelete, setShowDelete] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    dispatch(fetchCategoriesThunk());
  }, [dispatch]);

  const handleAdd = () => {
    setEditingCategory(null);
    setShowForm(true);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setShowForm(true);
  };

  const handleDelete = (category) => {
    setSelectedCategory(category);
    setShowDelete(true);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Categories</h1>
          <p className="text-gray-500">
            Manage your product categories
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
        >
          + Add Category
        </button>
      </div>

      {/* Table */}
      <CategoryTable
        categories={categories}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Form Modal */}
      <CategoryFormModal
        open={showForm}
        onClose={() => setShowForm(false)}
        category={editingCategory}
      />

      {/* Delete Modal */}
      <DeleteCategoryModal
        open={showDelete}
        onClose={() => setShowDelete(false)}
        category={selectedCategory}
      />
    </div>
  );
};

export default CategoriesPage;