import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import ProductForm from "../../components/product/form/ProductForm";

import { fetchCategories } from "../../features/category/categoryThunk";
import { createProductThunk } from "../../features/product/productThunks";

const AddProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories } = useSelector((state) => state.category);
  const { loading } = useSelector((state) => state.product);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category_id: "",
    gender: "",
    is_featured: false,
  });

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const product = await dispatch(createProductThunk(formData)).unwrap();

      // Redirect to edit page after creating product
      navigate(`/products/edit/${product.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Add Product</h1>
        <p className="text-gray-500 mt-2">
          Fill in the product information below.
        </p>
      </div>

      <ProductForm
        formData={formData}
        setFormData={setFormData}
        categories={categories}
        loading={loading.create}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default AddProductPage;
