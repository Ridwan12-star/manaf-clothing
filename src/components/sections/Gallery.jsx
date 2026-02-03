import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { ShoppingCart } from "lucide-react";

// Import existing images
import img1 from "../../assets/imgone.png";
import img2 from "../../assets/service_alterations_1769960137293.png";
import img3 from "../../assets/imgtwo.png";
import img4 from "../../assets/about_workspace_1769960172951.png";
import img5 from "../../assets/gallery_suit_detail_1769960193088.png";
import img6 from "../../assets/hero_tailor_measuring_1769960105944.png";

const Gallery = () => {
  const [filter, setFilter] = useState("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const categories = ["all", "suits", "dresses", "alterations", "shirts"];

  const galleryItems = [
    { id: 1, image: img1, category: "suits", title: "Custom Suit Fitting" },
    {
      id: 2,
      image: img2,
      category: "alterations",
      title: "Precision Alterations",
    },
    { id: 3, image: img3, category: "dresses", title: "Elegant Evening Dress" },
    { id: 4, image: img4, category: "suits", title: "Tailoring Workshop" },
    { id: 5, image: img5, category: "suits", title: "Suit Details" },
    { id: 6, image: img6, category: "shirts", title: "Custom Shirt" },
    { id: 7, image: img1, category: "alterations", title: "Expert Tailoring" },
    { id: 8, image: img4, category: "dresses", title: "Wedding Gown" },
  ];

  const filteredItems =
    filter === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === filter);

  const lightboxSlides = filteredItems.map((item) => ({ src: item.image }));

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const addToCart = (e, item) => {
    e.stopPropagation();
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const cartItem = {
      id: `gallery-${item.id}`,
      title: item.title,
      image: item.image,
      category: item.category,
    };
    
    // Check if item already exists
    if (!cart.find((i) => i.id === cartItem.id)) {
      cart.push(cartItem);
      localStorage.setItem("cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("cart-updated"));
      
      // Show feedback
      const button = e.currentTarget;
      const originalHTML = button.innerHTML;
      button.innerHTML = '<span class="text-green-500">✓ Added</span>';
      setTimeout(() => {
        button.innerHTML = originalHTML;
      }, 2000);
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-black mb-4">
            Portfolio Gallery
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Browse through our collection of beautifully crafted garments and see the quality of our work
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                filter === category
                  ? "bg-primary text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -10 }}
                className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <div className="relative h-80 overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Title and Add to Cart on hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-lg font-serif font-bold mb-2">
                      {item.title}
                    </h3>
                    <motion.button
                      onClick={(e) => addToCart(e, item)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                    >
                      <ShoppingCart size={18} />
                      Add to Cart
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={lightboxSlides}
        index={lightboxIndex}
      />
    </section>
  );
};

export default Gallery;
