import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { ShoppingCart, ArrowLeft, Loader2, Image as ImageIcon } from "lucide-react";
import { db } from "../firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";

const CategoryGallery = ({ categoryId }) => {
    const [images, setImages] = useState([]);
    const [categoryDetail, setCategoryDetail] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const slugify = (text) => text.toLowerCase().replace(/\s+/g, '-');

    useEffect(() => {
        const loadContent = async () => {
            setIsLoading(true);
            try {
                // 1. Fetch Categories to find the detail
                const catSnap = await getDocs(collection(db, "categories"));
                const allCats = catSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                const currentCat = allCats.find(c => slugify(c.name) === categoryId);
                setCategoryDetail(currentCat || { name: categoryId.replace(/-/g, ' '), description: "Bespoke designs tailored for you." });

                // 2. Fetch Portfolio Items
                const q = query(collection(db, "portfolio"), orderBy("createdAt", "desc"));
                const querySnapshot = await getDocs(q);
                const fbItems = querySnapshot.docs
                    .map(doc => ({ id: doc.id, ...doc.data() }))
                    .filter(item => slugify(item.category) === categoryId);

                setImages(fbItems.map(item => ({ id: item.id, src: item.imageUrl, title: item.title })));
            } catch (error) {
                console.error("Error loading gallery:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (categoryId) loadContent();
        window.scrollTo(0, 0);
    }, [categoryId]);

    const addToCart = (e, image) => {
        e.stopPropagation();
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const cartItem = {
            id: `gallery-${categoryId}-${image.id}`,
            title: image.title,
            image: image.src,
            category: categoryDetail?.name || categoryId,
            quantity: 1,
        };

        const existingItem = cart.find(i => i.id === cartItem.id);
        if (existingItem) {
            // If exists, increase quantity
            existingItem.quantity = (existingItem.quantity || 1) + 1;
        } else {
            cart.push(cartItem);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        window.dispatchEvent(new Event("cart-updated"));

        const button = e.currentTarget;
        const original = button.innerText;
        button.innerText = "✓ ADDED";
        setTimeout(() => button.innerText = original, 2000);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white">
                <Loader2 className="animate-spin text-primary mb-4" size={48} />
                <p className="text-gray-500 font-bold uppercase tracking-widest">Loading Collection...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white pt-24 pb-20">
            <div className="container mx-auto px-4 lg:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b pb-8">
                    <div className="flex-1">
                        <button
                            onClick={() => window.location.hash = "#our-work"}
                            className="group flex items-center gap-2 text-primary font-black mb-4 hover:translate-x-[-4px] transition-transform uppercase text-xs tracking-[0.2em]"
                        >
                            <ArrowLeft size={16} strokeWidth={3} /> Back to Gallery
                        </button>
                        <h1 className="text-5xl md:text-7xl font-serif font-black text-black mb-4 uppercase leading-none">{categoryDetail?.name}</h1>
                        <p className="text-gray-600 text-lg max-w-2xl italic leading-relaxed">
                            "{categoryDetail?.description}"
                        </p>
                    </div>
                    <div className="bg-primary/5 px-8 py-6 rounded-[2rem] border border-primary/10 text-center min-w-[160px]">
                        <span className="block text-4xl font-black text-primary leading-none mb-1">{images.length}</span>
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Unique Styles</span>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    <AnimatePresence>
                        {images.map((image, index) => (
                            <motion.div
                                key={image.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                className="group relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl transition-all cursor-pointer"
                                onClick={() => {
                                    setLightboxIndex(index);
                                    setLightboxOpen(true);
                                }}
                            >
                                <img
                                    src={image.src}
                                    alt={image.title}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                />

                                {/* Overlay - Optimized for Touch & Desktop */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent lg:opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="h-[2px] w-8 bg-primary"></div>
                                        <p className="text-primary text-[10px] font-black uppercase tracking-[0.2em]">DESIGN #{index + 1}</p>
                                    </div>
                                    <h3 className="text-white text-2xl font-serif font-bold mb-6 leading-tight">{image.title}</h3>
                                    <button
                                        onClick={(e) => addToCart(e, image)}
                                        className="w-full py-4 bg-white text-black rounded-2xl font-black text-[10px] tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-all active:scale-95 shadow-xl"
                                    >
                                        <ShoppingCart size={16} /> ADD TO ORDER
                                    </button>
                                </div>

                                {/* Info Chip */}
                                <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-xl px-4 py-2 rounded-full shadow-lg">
                                    <span className="text-[9px] font-black text-black tracking-widest uppercase">ENLARGE</span>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {images.length === 0 && (
                    <div className="text-center py-32 border-4 border-dashed rounded-[3rem] bg-gray-50/50">
                        <ImageIcon size={80} className="mx-auto text-gray-200 mb-6" strokeWidth={1} />
                        <h3 className="text-2xl font-serif font-black text-gray-900 mb-2 uppercase">Collection Coming Soon</h3>
                        <p className="text-gray-400 font-medium">We are currently curating our latest masterpieces.</p>
                    </div>
                )}
            </div>

            <Lightbox
                open={lightboxOpen}
                close={() => setLightboxOpen(false)}
                slides={images.map(img => ({ src: img.src, title: img.title }))}
                index={lightboxIndex}
            />
        </div>
    );
};

export default CategoryGallery;
