import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import ProductForm from "../../components/product/form/ProductForm";
import ProductImageUploader from "../../components/product/ProductImageUploader";
import ProductVariantForm from "../../components/product/ProductVariantForm";

import { fetchCategories } from "../../features/category/categoryThunk";
import {
  fetchProductById,
  updateProductThunk,
} from "../../features/product/productThunks";

const EditProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.category);
  const { product, loading } = useSelector((state) => state.product);

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
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (!product) return;

    setFormData({
      title: product.title,
      description: product.description || "",
      price: product.price,
      category_id: product.category_id,
      gender: product.gender || "",
      is_featured: product.is_featured,
    });
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(
        updateProductThunk({
          productId: id,
          productData: formData,
        })
      ).unwrap();

      alert("Product updated successfully.");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading.fetchOne) {
    return (
      <div className="text-center py-20">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        Product not found.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">

      <div>
        <h1 className="text-3xl font-bold">
          Edit Product
        </h1>

        <p className="text-gray-500">
          Update product information
        </p>
      </div>

      <ProductForm
        formData={formData}
        setFormData={setFormData}
        categories={categories}
        loading={loading.update}
        onSubmit={handleSubmit}
      />

      <ProductImageUploader
        productId={id}
        images={product.product_images || []}
      />

      <ProductVariantForm
        productId={id}
      />

    </div>
  );
};

export default EditProductPage;