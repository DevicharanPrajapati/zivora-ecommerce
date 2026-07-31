import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const CategoryCard = ({ category }) => {
  return (
    <Link
      to={`/category/${category?.slug}`}
      className="group relative block h-96 overflow-hidden rounded-2xl"
    >
      <img
        src={category.image || "/images/category-placeholder.jpg"}
        alt={category.name}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition duration-300 group-hover:from-black/90" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-6">
        <h2 className="text-3xl font-bold text-white">
          {category.name}
        </h2>

        <div className="mt-3 flex items-center gap-2 text-white">
          <span className="font-medium">Shop Now</span>

          <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-2" />
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;