import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Image as ImageIcon, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { db } from "../../firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";

const OurWork = () => {
  const [page, setPage] = useState(0);
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
  const pageCount = Math.ceil(displayCategories.length / 6);
  const visibleCategories = displayCategories.slice(page * 6, page * 6 + 6);

  const changePage = (nextPage) => {
    setPage(nextPage);
    document.getElementById("our-work")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="our-work" className="py-16 bg-white scroll-mt-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <div className="text-center mb-10">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-black mb-4 uppercase tracking-tight">Our Work</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto italic">Quality craftsmanship meets modern African elegance.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 lg:gap-6">
          {isLoading ? (
            <div className="col-span-full py-20 flex justify-center"><Loader2 className="animate-spin text-primary" size={40} /></div>
          ) : (
            visibleCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                className="group"
              >
                <div className="bg-white rounded-xl md:rounded-2xl shadow-[0_4px_20px_-8px_rgba(0,0,0,0.1)] overflow-hidden border border-gray-100 hover:shadow-[0_8px_30px_-10px_rgba(0,0,0,0.15)] transition-all h-full flex flex-col">
                  {/* Image Stack Preview */}
                  <div className="relative aspect-[4/3] overflow-hidden cursor-pointer" onClick={() => window.location.hash = `#category/${category.slug}`}>
                    {category.images.length > 0 ? (
                      <img src={category.images[0].src} alt={category.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300"><ImageIcon size={32} /></div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-3 md:p-4">
                      <div className="w-full">
                        <span className="bg-primary px-2 py-0.5 rounded-full text-[8px] md:text-[10px] font-black text-white uppercase tracking-widest mb-2 inline-block">Collection</span>
                        <h3 className="text-sm md:text-lg lg:text-xl font-serif font-bold text-white leading-tight line-clamp-2">{category.name}</h3>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 md:p-4 flex-1 flex flex-col justify-between">
                    <p className="text-gray-500 text-xs md:text-sm mb-3 leading-relaxed italic line-clamp-2">{category.description || `Explore our latest ${category.name} designs.`}</p>

                    <div className="flex items-center justify-between gap-2 md:gap-4 pt-3 border-t border-gray-50">
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
        {pageCount > 1 && (
          <nav className="flex items-center justify-center gap-3 mt-8" aria-label="Collection pages">
            <button type="button" onClick={() => changePage(page - 1)} disabled={page === 0} aria-label="Previous collections page" className="p-3 rounded-full border border-gray-200 disabled:opacity-40 hover:bg-gray-100"><ChevronLeft size={20} /></button>
            <span className="text-sm font-bold text-gray-600">Page {page + 1} of {pageCount}</span>
            <button type="button" onClick={() => changePage(page + 1)} disabled={page === pageCount - 1} aria-label="Next collections page" className="p-3 rounded-full border border-gray-200 disabled:opacity-40 hover:bg-gray-100"><ChevronRight size={20} /></button>
          </nav>
        )}
      </div>
    </section>
  );
};

export default OurWork;
