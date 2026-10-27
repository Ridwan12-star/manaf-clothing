import { ArrowUpRight } from "lucide-react";
import logo from "../assets/logo.jpeg";

export default function Footer() {
  return (
    <footer className="bg-[#faf8f4] pt-16">
      <div className="site-container">
        <div className="grid gap-10 pb-12 md:grid-cols-[1.5fr_1fr_1fr] md:gap-14">
          <div><a href="#home" className="mb-5 flex items-center gap-4"><img src={logo} alt="Manaf Clothing logo" loading="lazy" width="80" height="50" className="h-[50px] w-20 bg-black object-contain" /><span className="font-serif text-2xl">Manaf Clothing</span></a><p className="max-w-xs text-xs leading-[1.9] text-[#7b7265]">Contemporary African fashion with a personal point of view. Designed in Ghana, with you in mind.</p></div>
          <div><h2 className="mb-5 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">Explore</h2><nav aria-label="Footer navigation" className="flex flex-col items-start gap-3 text-xs text-[#756c60]">{[["Collections", "#our-work"], ["Our story", "#about"], ["The design experience", "#services"], ["Contact your fashion designer", "#contact"]].map(([label, href]) => <a key={href} href={href} className="py-1 hover:text-primary">{label}</a>)}</nav></div>
          <div><h2 className="mb-5 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">Visit the studio</h2><p className="mb-4 text-xs leading-[1.9] text-[#756c60]">Koforidua, Eastern Region<br />Ghana · Worldwide delivery available</p><a href="tel:+233249494505" className="text-xs hover:text-primary">+233 24 949 4505</a><a href="https://wa.me/233249494505" target="_blank" rel="noopener noreferrer" className="mt-4 flex items-center gap-2 text-[11px] text-primary">Arrange your visit <ArrowUpRight size={14} /></a></div>
        </div>
        <div className="flex flex-col justify-between gap-3 border-t border-[#e2dbcf] py-6 text-[10px] text-[#857b6c] sm:flex-row"><p>© {new Date().getFullYear()} Manaf Clothing. All rights reserved.</p><div className="flex items-center gap-6"><span>Fashion, with a personal signature.</span><a href="#admin" className="py-1 text-[9px] hover:text-primary">Studio login</a></div></div>
      </div>
    </footer>
  );
}
