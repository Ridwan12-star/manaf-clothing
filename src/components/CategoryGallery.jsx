import { useState } from "react";
import { ArrowLeft, ArrowUpRight, Check, ShoppingBag, ZoomIn } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import { useCollections } from "../hooks/useCollections";
import { collectionSlug, fashionCopy } from "../lib/content";
import { addSelection } from "../lib/cart";

export default function CategoryGallery({ categoryId }) {
  const categories = useCollections();
  const category = categories.find(item => item.slug === collectionSlug(categoryId));
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [added, setAdded] = useState([]);
  const images = category?.images || [];

  const select = image => {
    addSelection(image, category.name);
    setAdded(current => [...current, image.id]);
  };

  return (
    <section className="section-space min-h-[70vh]">
      <div className="site-container">
        <a href="#our-work" className="text-link mb-10"><ArrowLeft size={15} /> Back to collections</a>
        <div className="mb-12 flex flex-col justify-between gap-6 border-b border-[#ded5c7] pb-10 md:flex-row md:items-end">
          <div><span className="eyebrow">The Manaf collection</span><h1 className="section-heading mb-5">{category?.name || fashionCopy(categoryId.replace(/-/g, " "))}</h1><p className="max-w-lg text-sm leading-[1.9] text-[#7b7265]">{category?.description || "Discover personal style, thoughtfully designed."}</p></div>
          <a href="#contact" className="text-link self-start">Ask your fashion designer <ArrowUpRight size={16} /></a>
        </div>
        <div className="grid gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image, index) => <article key={image.id} className="group">
            <button type="button" onClick={() => setLightboxIndex(index)} aria-label={`Enlarge ${image.title}`} className="relative block w-full overflow-hidden bg-[#e9e3d9]">
              <img src={image.src} alt={image.title} loading={index < 3 ? "eager" : "lazy"} className="aspect-[4/5] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]" />
              <span className="absolute right-4 top-4 rounded-full bg-white/95 p-3"><ZoomIn size={17} strokeWidth={1.5} /></span>
            </button>
            <div className="mt-5 flex items-start justify-between gap-4"><div><p className="mb-2 text-[9px] uppercase tracking-[0.15em] text-primary">{category.name}</p><h2 className="font-serif text-xl font-normal">{image.title}</h2></div><button type="button" onClick={() => select(image)} aria-label={`Add ${image.title} to your selection`} className="shrink-0 border border-[#d8cfc1] p-3 transition-colors hover:bg-[#eee8dd]">{added.includes(image.id) ? <Check size={18} className="text-primary" /> : <ShoppingBag size={18} strokeWidth={1.5} />}</button></div>
            {added.includes(image.id) && <p role="status" className="mt-2 text-[11px] text-primary">Added to your selection.</p>}
          </article>)}
        </div>
        {!images.length && <div className="border border-[#e2dbcf] bg-[#f2eee6] px-6 py-16 text-center"><h2 className="mb-4 text-3xl">Let's find your next look.</h2><p className="mx-auto mb-7 max-w-md text-sm leading-relaxed text-[#7b7265]">Speak with your fashion designer to explore this collection and discuss a piece made for you.</p><a href="#contact" className="button-primary">Discuss a design <ArrowUpRight size={16} /></a></div>}
        <div className="mt-12 border-t border-[#e2dbcf] pt-7"><p className="text-xs leading-[1.9] text-[#7b7265]">Select a design to start your order, or contact us to discuss fabric, fit, and availability. Final details are confirmed with your fashion designer.</p></div>
      </div>
      <Lightbox open={lightboxIndex >= 0} close={() => setLightboxIndex(-1)} index={Math.max(0, lightboxIndex)} slides={images.map(image => ({ src: image.src, alt: image.title }))} plugins={[Zoom]} carousel={{ finite: images.length === 1 }} />
    </section>
  );
}
