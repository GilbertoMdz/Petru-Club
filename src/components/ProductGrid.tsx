import { useMemo, useState } from "react";
import { Grid, List, Search, Star } from "lucide-react";

const ProductGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"popular" | "price-low" | "price-high" | "rating">("popular");
  const [search, setSearch] = useState("");

  const categories = ["Todos", "Alimento", "Suplementos", "Juguetes", "Accesorios", "Premios"];

  const products = [
    { id: 1, name: "Premium Dog Food Adulto", category: "Alimento", price: 899, originalPrice: 999, rating: 4.8, reviews: 245, image: "https://images.pexels.com/photos/6568942/pexels-photo-6568942.jpeg", badge: "Oferta", inStock: true },
    { id: 2, name: "Multivitamínico para Gatos", category: "Suplementos", price: 450, rating: 4.9, reviews: 128, image: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/peh/peh72853/y/2.jpg", badge: "Nuevo", inStock: true },
    { id: 3, name: "Pelota Interactiva LED", category: "Juguetes", price: 299, rating: 4.7, reviews: 89, image: "https://m.media-amazon.com/images/I/61rr+GzzSKL._UF894,1000_QL80_.jpg", badge: "Popular", inStock: false },
    { id: 4, name: "Collar Antipulgas Natural", category: "Accesorios", price: 199, rating: 4.6, reviews: 156, image: "https://m.media-amazon.com/images/I/71yh4cJw76L._UF1000,1000_QL80_.jpg", inStock: true },
    { id: 5, name: "Snacks Dentales Premium", category: "Premios", price: 249, rating: 4.8, reviews: 203, image: "https://www.krakvet.pl/img/480/178dcb/22J4h6l8k0O0q1P79308H0h5X490X2a7.jpg", badge: "Orgánico", inStock: true },
    { id: 6, name: "Cama Ortopédica Deluxe", category: "Accesorios", price: 1299, originalPrice: 1499, rating: 4.9, reviews: 67, image: "https://m.media-amazon.com/images/I/61+8Jigl0YL.jpg", badge: "Premium", inStock: true },
  ];

  // 1) filtro por categoría + búsqueda
  const filtered = useMemo(() => {
    const byCategory =
      selectedCategory === "Todos"
        ? products
        : products.filter((p) => p.category === selectedCategory);

    const q = search.trim().toLowerCase();
    if (!q) return byCategory;

    return byCategory.filter((p) =>
      [p.name, p.category, p.badge].filter(Boolean).join(" ").toLowerCase().includes(q)
    );
  }, [products, selectedCategory, search]);

  // 2) ordenamiento
  const sorted = useMemo(() => {
    const copy = [...filtered];
    switch (sortBy) {
      case "price-low":
        return copy.sort((a, b) => a.price - b.price);
      case "price-high":
        return copy.sort((a, b) => b.price - a.price);
      case "rating":
        return copy.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
      default:
        // "popular": más reviews y mejor rating
        return copy.sort((a, b) => b.reviews - a.reviews || b.rating - a.rating);
    }
  }, [filtered, sortBy]);

  const getBadgeColor = (badge?: string) => {
    switch (badge) {
      case "Oferta":
        return "bg-red-500";
      case "Nuevo":
        return "bg-green-500";
      case "Popular":
        return "bg-blue-500";
      case "Premium":
        return "bg-purple-500";
      case "Orgánico":
        return "bg-emerald-500";
      default:
        return "bg-yellow-500";
    }
  };

  return (
    <section id="productos" className="py-10 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-3">
            Nuestra <span className="text-yellow-500">Tienda</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
            Explora productos premium para el cuidado y bienestar de tu mascota
          </p>
        </div>

        {/* Filtros y controles — MOBILE-FIRST */}
        <div className="bg-gray-50 rounded-2xl p-4 sm:p-6 mb-8 sm:mb-12">
          {/* Categorías: carrusel horizontal en móvil */}
          <div className="-mx-2 mb-4 overflow-x-auto no-scrollbar">
            <div className="px-2 whitespace-nowrap space-x-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`inline-block px-4 py-2 rounded-full font-medium transition-all duration-200
                    ${selectedCategory === category ? "bg-yellow-500 text-black" : "bg-white text-gray-700 hover:bg-gray-100"}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Controles: apilados en móvil, fila en sm+ */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            {/* Search */}
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar productos…"
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-yellow-500"
              />
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full sm:w-auto px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-yellow-500"
            >
              <option value="popular">Más popular</option>
              <option value="price-low">Precio: menor a mayor</option>
              <option value="price-high">Precio: mayor a menor</option>
              <option value="rating">Mejor valorados</option>
            </select>

            {/* View toggle */}
            <div className="flex border border-gray-200 rounded-lg overflow-hidden self-start sm:self-auto shrink-0">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 ${viewMode === "grid" ? "bg-yellow-500 text-black" : "bg-white text-gray-600"}`}
                aria-label="Vista de cuadrícula"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 ${viewMode === "list" ? "bg-yellow-500 text-black" : "bg-white text-gray-600"}`}
                aria-label="Vista de lista"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Grid de productos */}
        <div
          className={`grid gap-6 sm:gap-8 ${
            viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
          }`}
        >
          {sorted.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl shadow-lg md:hover:shadow-2xl transition-all duration-300 md:hover:-translate-y-2 overflow-hidden"
            >
              {/* Imagen */}
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full aspect-[4/3] object-cover md:group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
                {product.badge && (
                  <div
                    className={`absolute top-3 left-3 ${getBadgeColor(
                      product.badge
                    )} text-white px-3 py-1 rounded-full text-xs sm:text-sm font-semibold`}
                  >
                    {product.badge}
                  </div>
                )}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="bg-white text-black px-3 py-1 rounded-full font-semibold text-sm">
                      Agotado
                    </span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-black mb-1 sm:mb-2 md:group-hover:text-yellow-600 transition-colors duration-200">
                  {product.name}
                </h3>
                <p className="text-gray-500 text-sm mb-3">{product.category}</p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600 text-sm">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                {/* Precio */}
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-xl sm:text-2xl font-bold text-black">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-gray-500 line-through">${product.originalPrice}</span>
                  )}
                </div>

                {/* Botón */}
                <button
                  disabled={!product.inStock}
                  className={`w-full py-3 rounded-full font-semibold transition-all duration-300 ${
                    product.inStock
                      ? "bg-black text-white md:hover:bg-gray-800 md:hover:scale-[1.02]"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {product.inStock ? "Agregar al carrito" : "No disponible"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cargar más */}
        <div className="text-center mt-12 sm:mt-16">
          <button className="bg-yellow-500 text-black px-6 sm:px-8 py-3 rounded-full font-semibold hover:bg-yellow-600 md:hover:scale-105 transition-all duration-300">
            Cargar más productos
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
