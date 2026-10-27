import { useState } from "react";
import { ArrowUpRight, Check, ShoppingBag, ZoomIn } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import { studioCollections } from "../../data/collections";
import { addSelection } from "../../lib/cart";

const looks = studioCollections.flatMap(category => category.images.filter(image => image.id !== "family-print").map(image => ({ ...image, category: category.name })));
const filters = ["All looks", "Vintage Tops", "Kaftan For Men", "3-In-1 For Men", "Kids"];

export default function Gallery() {
  const [filter, setFilter] = useState("All looks");
  const [index, setIndex] = useState(-1);
  const [added, setAdded] = useState([]);
  const visible = filter === "All looks" ? looks : looks.filter(image => image.category === filter);
  const select = image => {
    addSelection(image, image.category);
    setAdded(current => [...current, image.id]);
  };
  return (
    <section id="lookbook" className="section-space">
      <div className="site-container">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><span className="eyebrow">The lookbook</span><h2 className="section-heading">Style in <span className="italic text-primary">real life.</span></h2></div><p className="max-w-[300px] text-sm leading-[1.9] text-[#7b7265]">A closer look at our design language. Find your inspiration, then make it yours.</p></div>
        <div className="mb-8 flex flex-wrap gap-2" aria-label="Filter the lookbook">{filters.map(name => <button key={name} type="button" onClick={() => { setFilter(name); setIndex(-1); }} aria-pressed={filter === name} className={`min-h-11 border px-4 py-3 text-[10px] tracking-wide transition-colors ${filter === name ? "border-[#29251f] bg-[#29251f] text-white" : "border-[#ded5c7] text-[#756c60] hover:border-primary"}`}>{name === "Kaftan For Men" ? "Kaftans" : name === "3-In-1 For Men" ? "Occasion wear" : name}</button>)}</div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-9 lg:grid-cols-3">
          {visible.map((image, imageIndex) => <article key={image.id} className="group">
            <button type="button" aria-label={`Enlarge ${image.title}`} onClick={() => setIndex(imageIndex)} className="relative block w-full overflow-hidden bg-[#e9e3d9]"><img src={image.src} alt={image.title} loading="lazy" className="aspect-[4/5] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]" /><span className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/95"><ZoomIn size={16} strokeWidth={1.5} /></span></button>
            <div className="mt-4 flex items-start justify-between gap-3"><div><p className="mb-2 text-[9px] uppercase tracking-[0.16em] text-primary">{image.category}</p><h3 className="text-lg font-normal sm:text-xl">{image.title}</h3></div><button type="button" onClick={() => select(image)} aria-label={`Add ${image.title} to your selection`} className="shrink-0 p-3 transition-colors hover:bg-[#eee8dd]">{added.includes(image.id) ? <Check size={18} className="text-primary" /> : <ShoppingBag size={18} strokeWidth={1.5} />}</button></div>
            {added.includes(image.id) && <span role="status" className="mt-2 block text-[11px] text-primary">Added to your selection.</span>}
          </article>)}
        </div>
        <div className="mt-12 text-center"><a href="#our-work" className="text-link">Explore all collections <ArrowUpRight size={16} /></a></div>
      </div>
      <Lightbox open={index >= 0} close={() => setIndex(-1)} index={Math.max(0, index)} slides={visible.map(image => ({ src: image.src, alt: image.title }))} plugins={[Zoom]} carousel={{ finite: visible.length === 1 }} />
    </section>
  );
}
