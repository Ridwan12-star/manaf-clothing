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

        // #region agent log
        try {
          fetch("http://127.0.0.1:7244/ingest/b5944c08-8a4f-4bff-b0a6-afa3bb47d378", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              sessionId: "debug-session",
              runId: "pre-fix-1",
              hypothesisId: "H4",
              location: "OurWork.jsx:38",
              message: "Categories fetched",
              data: {
                categoriesCount: fetchedCats.length,
              },
              timestamp: Date.now(),
            }),
          }).catch(() => {});
        } catch {}
        // #endregion agent log

        // 2. Fetch Portfolio Items
        const q = query(collection(db, "portfolio"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const items = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setPortfolioItems(items);
        setCategories(fetchedCats);

        // #region agent log
        try {
          fetch("http://127.0.0.1:7244/ingest/b5944c08-8a4f-4bff-b0a6-afa3bb47d378", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              sessionId: "debug-session",
              runId: "pre-fix-1",
              hypothesisId: "H5",
              location: "OurWork.jsx:46",
              message: "Portfolio fetched",
              data: {
                itemsCount: items.length,
              },
              timestamp: Date.now(),
            }),
          }).catch(() => {});
        } catch {}
        // #endregion agent log
      } catch (error) {
        console.error("Error fetching data:", error);

        // #region agent log
        try {
          fetch("http://127.0.0.1:7244/ingest/b5944c08-8a4f-4bff-b0a6-afa3bb47d378", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              sessionId: "debug-session",
              runId: "pre-fix-1",
              hypothesisId: "H6",
              location: "OurWork.jsx:49",
              message: "Error fetching OurWork data",
              data: {
                error: String(error?.message || error),
              },
              timestamp: Date.now(),
            }),
          }).catch(() => {});
        } catch {}
        // #endregion agent log
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

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
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
                <div className="bg-white rounded-xl md:rounded-2xl shadow-[0_4px_20px_-8px_rgba(0,0,0,0.1)] overflow-hidden border border-gray-100 hover:shadow-[0_8px_30px_-10px_rgba(0,0,0,0.15)] transition-all h-full flex flex-col">
                  {/* Image Stack Preview */}
                  <div className="relative aspect-[3/4] overflow-hidden cursor-pointer" onClick={() => window.location.hash = `#category/${category.slug}`}>
                    {category.images.length > 0 ? (
                      <img src={category.images[0].src} alt={category.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300"><ImageIcon size={32} /></div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-4 md:p-6">
                      <div className="w-full">
                        <span className="bg-primary px-2 py-0.5 rounded-full text-[8px] md:text-[10px] font-black text-white uppercase tracking-widest mb-2 inline-block">Collection</span>
                        <h3 className="text-base md:text-xl lg:text-2xl font-serif font-bold text-white leading-tight line-clamp-2">{category.name}</h3>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 md:p-6 flex-1 flex flex-col justify-between">
                    <p className="text-gray-500 text-xs md:text-sm mb-4 leading-relaxed italic line-clamp-2">{category.description || `Explore our latest ${category.name} designs.`}</p>

                    <div className="flex items-center justify-between gap-2 md:gap-4 pt-3 md:pt-4 border-t border-gray-50">
                      <div className="flex -space-x-2 md:-space-x-3">
                        {category.images.slice(0, 3).map((img, idx) => (
                          <div key={idx} className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-white overflow-hidden shadow-sm">
                            <img src={img.src} alt="" className="w-full h-full object-cover" />
                          </div>
                        ))}
                        {category.images.length > 3 && (
                          <div className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[8px] md:text-[10px] font-bold text-gray-500 shadow-sm">
                            +{category.images.length - 3}
                          </div>
                        )}
                        {category.images.length === 0 && <span className="text-[10px] md:text-xs text-gray-400 font-bold">New</span>}
                      </div>
                      <button
                        onClick={() => window.location.hash = `#category/${category.slug}`}
                        className="text-primary font-black uppercase text-[9px] md:text-xs tracking-widest flex items-center gap-1 md:gap-2 hover:gap-2 md:hover:gap-3 transition-all"
                      >
                        View <Plus size={10} className="md:w-3 md:h-3" />
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
