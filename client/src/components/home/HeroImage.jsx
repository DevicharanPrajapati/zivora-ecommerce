const HeroImage = () => {
  return (
    <section className="bg-gray-100">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-6 py-16 md:flex-row">
        {/* Left Content */}
        <div className="md:w-1/2">
          <p className="mb-2 text-blue-600 font-semibold uppercase">
            New Collection
          </p>

          <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900 md:text-6xl">
            Discover Your <br />
            Perfect Style
          </h1>

          <p className="mb-8 text-gray-600">
            Explore our latest fashion collection with premium quality,
            affordable prices, and fast delivery.
          </p>

          <button className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700">
            Shop Now
          </button>
        </div>

        {/* Right Image */}
        <div className="mt-10 md:mt-0 md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80"
            alt="Fashion Banner"
            loading="lazy"
            className="mx-auto rounded-2xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroImage;