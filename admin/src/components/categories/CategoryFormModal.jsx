import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
  createCategoryThunk,
  updateCategoryThunk,
} from "../../features/category/categoryThunks";

const CategoryFormModal = ({ open, onClose, category }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState("");

  // Fill form while editing
  useEffect(() => {
    if (category) {
      setName(category.name);
      setSlug(category.slug);
      setImage(category.image);
    } else {
      setName("");
      setSlug("");
      setImage("");
    }
  }, [category]);

  // Auto generate slug while creating
  useEffect(() => {
    if (!category) {
      setSlug(name.toLowerCase().trim().replace(/\s+/g, "-"));
    }
  }, [name, category]);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Category name is required.");
      return;
    }

    if (!slug.trim()) {
      alert("Slug is required.");
      return;
    }

    if (!image.trim()) {
      alert("Image URL is required.");
      return;
    }

    const categoryData = {
      name: name.trim(),
      slug: slug.trim(),
      image: image.trim(),
    };

    const result = category
      ? await dispatch(
          updateCategoryThunk({
            id: category.id,
            categoryData,
          }),
        )
      : await dispatch(createCategoryThunk(categoryData));

    if (
      updateCategoryThunk.fulfilled.match(result) ||
      createCategoryThunk.fulfilled.match(result)
    ) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-6">
          {category ? "Edit Category" : "Add Category"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Category Name"
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Slug</label>

            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="category-slug"
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Image URL</label>

            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Image URL"
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-black text-white"
            >
              {category ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryFormModal;
