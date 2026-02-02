import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Plus, Image as ImageIcon } from "lucide-react";

// Import existing images - you can replace these with your boss's work
// To add new images: 
// 1. Place images in src/assets/ folder
// 2. Import them at the top (e.g., import newImage from "../../assets/your-image.jpg")
// 3. Add them to the images array in the workCategories below
import img1 from "../../assets/customized suits.jpg";
import img2 from "../../assets/1.jpg";
import img3 from "../../assets/2.jpg";
import img4 from "../../assets/3.jpg";
import img5 from "../../assets/4.jpg";
import img6 from "../../assets/5.jpg";

const OurWork = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Work categories - Easy to add more categories and images later
  // To add a new category: Copy one of the category objects below and update:
  // - id: unique identifier (lowercase, no spaces)
  // - name: Display name for the category
  // - description: Brief description
  // - images: Array of image objects with id, src (imported image), and title
  const workCategories = [
    {
      id: "suits",
      name: "Custom Suits",
      description: "Handcrafted suits tailored to perfection",
      images: [
        { id: 1, src: img1, title: "Classic Navy Suit" },
        { id: 2, src: img5, title: "Elegant Black Suit" },
        { id: 3, src: img3, title: "Formal Evening Suit" },
      ],
    },
    {
      id: "dresses",
      name: "Dresses & Gowns",
      description: "Beautiful dresses for every occasion",
      images: [
        { id: 1, src: img2, title: "Elegant Evening Dress" },
        { id: 2, src: img4, title: "Wedding Gown" },
        { id: 3, src: img6, title: "Cocktail Dress" },
      ],
    },
    {
      id: "alterations",
      name: "Alterations & Repairs",
      description: "Expert alterations to make your clothes fit perfectly",
      images: [
        { id: 1, src: img2, title: "Hem Alteration" },
        { id: 2, src: img1, title: "Sleeve Adjustment" },
        { id: 3, src: img3, title: "Waist Fitting" },
      ],
    },
    {
      id: "shirts",
      name: "Custom Shirts",
      description: "Perfectly fitted shirts for work and casual wear",
      images: [
        { id: 1, src: img3, title: "Business Shirt" },
        { id: 2, src: img5, title: "Casual Shirt" },
        { id: 3, src: img6, title: "Formal Shirt" },
      ],
    },
    {
      id: "jackets",
      name: "Jackets & Blazers",
      description: "Stylish jackets tailored to your measurements",
      images: [
        { id: 1, src: img1, title: "Classic Blazer" },
        { id: 2, src: img3, title: "Leather Jacket" },
        { id: 3, src: img5, title: "Formal Jacket" },
      ],
    },
    {
      id: "accessories",
      name: "Accessories & Details",
      description: "Custom accessories and finishing touches",
      images: [
        { id: 1, src: img2, title: "Custom Cufflinks" },
        { id: 2, src: img4, title: "Belt Alteration" },
        { id: 3, src: img6, title: "Button Details" },
      ],
    },
  ];

  const openLightbox = (categoryIndex, imageIndex) => {
    const category = workCategories[categoryIndex];
    const allImages = workCategories.flatMap((cat) =>
      cat.images.map((img) => ({ src: img.src, title: img.title }))
    );
    const startIndex = workCategories
      .slice(0, categoryIndex)
      .reduce((sum, cat) => sum + cat.images.length, 0);
    setLightboxIndex(startIndex + imageIndex);
    setLightboxOpen(true);
  };

  return (
    <section id="our-work" className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-black mb-4">
            Our Work
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore the beautiful pieces we've created. Each item is carefully
            crafted with attention to detail and precision.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {workCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100">
                {/* Category Header */}
                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 border-b border-gray-100">
                  <h3 className="text-2xl font-serif font-bold text-black mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{category.description}</p>
                </div>

                {/* Image Grid */}
                <div className="p-4">
                  <div className="grid grid-cols-3 gap-2">
                    {category.images.map((image, imageIndex) => (
                      <motion.div
                        key={image.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => openLightbox(categoryIndex, imageIndex)}
                        className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group/item"
                      >
                        <img
                          src={image.src}
                          alt={image.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover/item:bg-black/30 transition-all duration-300 flex items-center justify-center">
                          <ImageIcon
                            className="text-white opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"
                            size={24}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* View All Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-4 w-full py-3 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-semibold"
                  >
                    <span>View All {category.name}</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <h3 className="text-3xl font-serif font-bold text-black mb-4">
            Ready to Create Something Beautiful?
          </h3>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Let us bring your vision to life with our expert tailoring services
          </p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(156, 125, 109, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const element = document.querySelector("#contact");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="bg-primary text-white px-8 py-4 rounded-md font-semibold text-lg hover:bg-primary/90 transition-all duration-300 shadow-lg"
          >
            Get Started Today
          </motion.button>
        </motion.div>
      </div>

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={workCategories.flatMap((cat) =>
          cat.images.map((img) => ({ src: img.src, title: img.title }))
        )}
        index={lightboxIndex}
      />
    </section>
  );
};

export default OurWork;

