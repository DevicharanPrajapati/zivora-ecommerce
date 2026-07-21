import { useState } from "react";
import { useDispatch } from "react-redux";

import {
  uploadProductImageThunk,
  deleteProductImageThunk,
  setPrimaryImageThunk,
} from "../../features/product/productThunks";

const ProductImageUploader = ({ productId, images = [] }) => {
  const dispatch = useDispatch();

  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const files = [...e.target.files];

    if (!files.length) return;

    setUploading(true);

    try {
      for (let i = 0; i < files.length; i++) {
        await dispatch(
          uploadProductImageThunk({
            productId,
            file: files[i],
            isPrimary: images.length === 0 && i === 0,
          }),
        ).unwrap();
      }
      // 👇 Refresh product data
      // await dispatch(fetchProductById(productId));
    } catch (error) {
      console.error(error);
    }

    setUploading(false);
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Product Images</h2>

        <label className="bg-black text-white px-4 py-2 rounded-lg cursor-pointer">
          {uploading ? "Uploading..." : "Upload Images"}

          <input
            type="file"
            multiple
            hidden
            accept="image/*"
            onChange={handleUpload}
          />
        </label>
      </div>

      {images.length === 0 ? (
        <div className="text-center py-12 text-gray-500 border rounded-lg">
          No Images Uploaded
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {images.map((image) => (
            <div key={image.id} className="border rounded-lg overflow-hidden">
              <img
                src={image.image_url}
                alt=""
                className="w-full h-44 object-cover"
              />

              <div className="p-3 space-y-2">
                {image.is_primary ? (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                    Primary Image
                  </span>
                ) : (
                  <button
                    onClick={() =>
                      dispatch(
                        setPrimaryImageThunk({
                          productId,
                          imageId: image.id,
                        }),
                      )
                    }
                    className="text-blue-600 text-sm"
                  >
                    Set Primary
                  </button>
                )}

                <button
                  onClick={() => dispatch(deleteProductImageThunk(image.id))}
                  className="text-red-500 text-sm block"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageUploader;
