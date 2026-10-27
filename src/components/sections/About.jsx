import { ArrowUpRight } from "lucide-react";
import portrait from "../../assets/manaff.jpeg";
import detail from "../../assets/Y.jpeg";

export default function About() {
  return (
    <section id="about" className="section-space bg-[#eee8dd]">
      <div className="site-container grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
        <div className="relative pb-10 pr-12 sm:pr-20">
          <img src={portrait} alt="A sand-coloured kaftan with a detailed neckline" loading="lazy" width="736" height="920" className="aspect-[4/5] w-full object-cover object-top" />
          <div className="absolute bottom-0 right-0 w-[42%] border-[7px] border-[#eee8dd] bg-[#e0d6c5]">
            <img src={detail} alt="Expressive print from the Vintage Tops collection" loading="lazy" className="aspect-[3/4] w-full object-cover" />
          </div>
          <span className="absolute bottom-2 left-0 text-[9px] uppercase tracking-[0.2em] text-primary">The details make the difference.</span>
        </div>
        <div>
          <span className="eyebrow">Our story / Manaf Clothing</span>
          <h2 className="section-heading">More than clothing.<br /><span className="italic text-primary">An expression of you.</span></h2>
          <div className="mt-7 space-y-4 text-sm leading-[1.95] text-[#756c60]">
            <p>Based in Koforidua, Ghana, Manaf Clothing brings African heritage into a contemporary wardrobe. We create pieces with character, from expressive vintage tops to considered occasion wear.</p>
            <p>Your fashion designer works with your ideas, your measurements, and the way you want to feel. Fabric, silhouette, and finishing come together to create something personal.</p>
            <p>Because great style should feel as natural as being yourself.</p>
          </div>
          <div className="my-8 grid grid-cols-2 gap-6 border-y border-[#d9cfbf] py-6">
            <div><p className="mb-2 font-serif text-xl">Rooted in Ghana</p><p className="text-[11px] leading-relaxed text-[#756c60]">A contemporary African perspective.</p></div>
            <div><p className="mb-2 font-serif text-xl">Created for you</p><p className="text-[11px] leading-relaxed text-[#756c60]">Your vision, thoughtfully expressed.</p></div>
          </div>
          <a href="#contact" className="text-link">Let's create something personal <ArrowUpRight size={16} /></a>
        </div>
      </div>
    </section>
  );
}
