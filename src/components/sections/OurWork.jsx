import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Plus, Image as ImageIcon, ShoppingCart, Loader2 } from "lucide-react";
import { db } from "../../firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";

// Fallback images if needed
import img1 from "../../assets/customized suits.jpg";
import img2 from "../../assets/1.jpg";
import img3 from "../../assets/2.jpg";
import img4 from "../../assets/3.jpg";
import img5 from "../../assets/4.jpg";
import img6 from "../../assets/5.jpg";

const OurWork = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lightboxSlides, setLightboxSlides] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch Categories
        const catQuery = query(collection(db, "categories"), orderBy("createdAt", "desc"));
        const catSnap = await getDocs(catQuery);
        const fetchedCats = catSnap.docs.map(doc => ({
          id: doc.id,
          slug: doc.data().name.toLowerCase().replace(/\s+/g, '-'),
          ...doc.data(),
          images: []
        }));

        // 2. Fetch Portfolio Items
        const q = query(collection(db, "portfolio"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const items = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setPortfolioItems(items);
        setCategories(fetchedCats);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const getMergedCategories = () => {
    const merged = [...categories];

    portfolioItems.forEach(item => {
      const slug = item.category.toLowerCase().replace(/\s+/g, '-');
      let category = merged.find(c => c.slug === slug);

      // Only add to existing categories created by the admin
      if (category) {
        if (!category.images.find(img => img.firebaseId === item.id)) {
          category.images.unshift({
            id: `fb-${item.id}`,
            firebaseId: item.id,
            src: item.imageUrl,
            title: item.title,
            description: item.description
          });
        }
      }
    });

    return merged;
  };

  const displayCategories = getMergedCategories();

  return (
    <section id="our-work" className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-black mb-4 uppercase tracking-tight">Our Work</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto italic">Quality craftsmanship meets modern African elegance.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {isLoading ? (
            <div className="col-span-full py-20 flex justify-center"><Loader2 className="animate-spin text-primary" size={40} /></div>
          ) : (
            displayCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                className="group"
              >
                <div className="bg-white rounded-[2rem] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] overflow-hidden border border-gray-100 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] transition-all h-full flex flex-col">
                  {/* Image Stack Preview */}
                  <div className="relative aspect-[4/5] overflow-hidden cursor-pointer" onClick={() => window.location.hash = `#category/${category.slug}`}>
                    {category.images.length > 0 ? (
                      <img src={category.images[0].src} alt={category.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300"><ImageIcon size={48} /></div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                      <div>
                        <span className="bg-primary px-3 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-widest mb-3 inline-block">Collection</span>
                        <h3 className="text-3xl font-serif font-bold text-white leading-tight">{category.name}</h3>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 flex-1 flex flex-col justify-between">
                    <p className="text-gray-500 text-sm mb-6 leading-relaxed italic">{category.description || `Explore our latest ${category.name} designs.`}</p>

                    <div className="flex items-center justify-between gap-4 pt-4 border-t border-gray-50">
                      <div className="flex -space-x-3">
                        {category.images.slice(0, 3).map((img, idx) => (
                          <div key={idx} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-sm">
                            <img src={img.src} alt="" className="w-full h-full object-cover" />
                          </div>
                        ))}
                        {category.images.length > 3 && (
                          <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500 shadow-sm">
                            +{category.images.length - 3}
                          </div>
                        )}
                        {category.images.length === 0 && <span className="text-xs text-gray-400 font-bold">New Collection</span>}
                      </div>
                      <button
                        onClick={() => window.location.hash = `#category/${category.slug}`}
                        className="text-primary font-black uppercase text-xs tracking-widest flex items-center gap-2 hover:gap-3 transition-all underline underline-offset-8"
                      >
                        View Collection <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      <Lightbox open={lightboxOpen} close={() => setLightboxOpen(false)} slides={lightboxSlides} index={lightboxIndex} />
    </section>
  );
};

export default OurWork;
