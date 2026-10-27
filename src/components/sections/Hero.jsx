import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Globe2 } from "lucide-react";
import heroImage from "../../assets/manaf.WEBP";

export default function Hero() {
  return (
    <section id="home" className="bg-[#f2eee6]">
      <div className="mx-auto grid max-w-[1600px] lg:grid-cols-2">
        <div className="relative flex items-center px-6 py-16 sm:px-10 sm:py-20 lg:py-16 lg:pl-[max(4rem,calc((100vw-1192px)/2))] lg:pr-12">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }} className="max-w-[600px]">
            <span className="eyebrow flex items-center gap-3"><span className="h-px w-8 bg-primary" /> The art of personal style</span>
            <h1 className="hero-title font-normal">Rooted in culture.<br /><span className="italic text-primary">Designed</span><br className="hidden sm:block" /> for you.</h1>
            <p className="mb-8 mt-7 max-w-[365px] text-sm leading-[1.9] text-[#756c60] sm:text-[15px]">Distinctive African fashion, thoughtful details, and a fit that feels like you. Discover the world of Manaf Clothing.</p>
            <div className="flex flex-wrap items-center gap-5 sm:gap-7">
              <a href="#our-work" className="button-primary">Explore collections <ArrowUpRight size={17} strokeWidth={1.5} /></a>
              <a href="#contact" className="text-link">Meet your fashion designer <ArrowUpRight size={15} /></a>
            </div>
            <div className="mt-12 flex items-center gap-3 border-t border-[#d9d1c4] pt-6 text-[10px] tracking-wide text-[#756c60] lg:mt-16">
              <Globe2 size={16} strokeWidth={1.3} className="text-primary" /> Designed in Ghana. Worn around the world.
            </div>
          </motion.div>
        </div>
        <div className="hero-photo relative overflow-hidden bg-[#d4bc92]">
          <img src={heroImage} alt="Gold embroidered African occasion wear by Manaf Clothing" width="720" height="1079" fetchPriority="high" className="h-full w-full object-cover object-[center_30%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#201d17]/65 via-transparent to-transparent" />
          <span className="absolute left-6 top-6 border border-white/70 px-4 py-2 text-[9px] uppercase tracking-[0.2em] text-white sm:left-10 sm:top-8">The Manaf signature</span>
          <div className="absolute bottom-8 left-6 right-6 flex items-end justify-between gap-4 text-white sm:bottom-10 sm:left-10 sm:right-10">
            <div><p className="mb-3 text-[9px] uppercase tracking-[0.22em] text-white/75">Heritage. Presence. Individuality.</p><p className="font-serif text-3xl font-normal sm:text-4xl">Made to be remembered.</p></div>
            <a href="#our-work" aria-label="Discover the collections" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/50 transition-colors hover:bg-white hover:text-[#29251f]"><ArrowDown size={20} strokeWidth={1.5} /></a>
          </div>
        </div>
      </div>
      <div className="border-y border-[#e0d8cb]">
        <div className="site-container flex flex-wrap items-center justify-center gap-x-10 gap-y-3 py-5 text-[9px] font-medium uppercase tracking-[0.18em] text-[#786d5b] sm:justify-between sm:text-[10px]">
          <span>Contemporary African design</span><span className="hidden h-1 w-1 rounded-full bg-primary sm:block" /><span>Made around your style</span><span className="hidden h-1 w-1 rounded-full bg-primary sm:block" /><span>Considered in every detail</span>
        </div>
      </div>
    </section>
  );
}
