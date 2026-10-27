import { useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Image } from "lucide-react";
import { useCollections } from "../../hooks/useCollections";

export default function OurWork() {
  const [page, setPage] = useState(0);
  const categories = useCollections();
  const pageCount = Math.ceil(categories.length / 6);
  const currentPage = Math.min(page, Math.max(0, pageCount - 1));
  const visible = categories.slice(currentPage * 6, currentPage * 6 + 6);
  const changePage = next => {
    setPage(next);
    document.getElementById("our-work")?.scrollIntoView({ behavior: "auto" });
  };

  return (
    <section id="our-work" className="section-space">
      <div className="site-container">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div><span className="eyebrow">Discover your expression</span><h2 className="section-heading">A collection.<br /><span className="italic text-primary">A character.</span></h2></div>
          <p className="max-w-[320px] text-sm leading-[1.9] text-[#7b7265]">From everyday individuality to your biggest moments. Find a design that speaks your language.</p>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4">
          {visible.map((category, index) => (
            <a key={category.id} href={`#category/${category.slug}`} className="collection-card group block">
              <div className="collection-image relative overflow-hidden bg-[#e9e3d9]">
                {category.images[0] ? <img src={category.cover || category.images[0].src} alt={category.name} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-700" /> : <div className="flex h-full items-center justify-center"><Image size={36} className="text-primary/40" strokeWidth={1} /></div>}
                <span className="absolute left-2 top-2 bg-[#faf8f4]/95 px-2 py-1.5 text-[7px] uppercase tracking-[0.1em] sm:left-4 sm:top-4 sm:px-3 sm:py-2 sm:text-[9px] sm:tracking-[0.14em]">{category.slug === "vintage-tops" ? "The vintage edit" : "Manaf collection"}</span>
              </div>
              <div className="mt-5 flex items-start justify-between gap-3">
                <div><p className="mb-2 text-[8px] tracking-[0.1em] text-primary sm:text-[9px] sm:tracking-[0.15em]">0{currentPage * 6 + index + 1} / COLLECTION</p><h3 className="text-lg font-normal sm:text-2xl">{category.name}</h3></div>
                <span className="collection-arrow flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#d8cfc1] transition-colors sm:h-9 sm:w-9"><ArrowUpRight size={16} strokeWidth={1.5} /></span>
              </div>
              <p className="mt-3 text-[11px] leading-[1.8] text-[#7b7265] sm:text-xs">{category.description}</p>
            </a>
          ))}
        </div>
        {pageCount > 1 && <nav className="mt-10 flex items-center justify-center gap-5" aria-label="Collection pages">
          <button type="button" onClick={() => changePage(currentPage - 1)} disabled={currentPage === 0} aria-label="Previous collections page" className="p-3 disabled:opacity-30"><ChevronLeft size={20} /></button>
          <span className="text-xs">{currentPage + 1} / {pageCount}</span>
          <button type="button" onClick={() => changePage(currentPage + 1)} disabled={currentPage === pageCount - 1} aria-label="Next collections page" className="p-3 disabled:opacity-30"><ChevronRight size={20} /></button>
        </nav>}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[#e2dbcf] pt-6"><p className="text-xs text-[#7b7265]">Something in mind? Let's make it personal.</p><a href="#contact" className="text-link">Discuss your design <ArrowUpRight size={15} /></a></div>
      </div>
    </section>
  );
}
