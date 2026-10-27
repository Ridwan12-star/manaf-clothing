import { useEffect, useRef, useState } from "react";
import { Menu, X, ShoppingBag, ArrowUpRight } from "lucide-react";
import logo from "../assets/logo.jpeg";

const links = [
  { name: "Collections", href: "#our-work" },
  { name: "Our story", href: "#about" },
  { name: "The experience", href: "#services" },
  { name: "Contact", href: "#contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    const onKey = (event) => {
      if (event.key === "Escape") { setIsOpen(false); menuButton.current?.focus(); }
    };
    const onRoute = () => setIsOpen(false);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("hashchange", onRoute);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("hashchange", onRoute);
    };
  }, []);

  const navigate = (event, href) => {
    setIsOpen(false);
    const target = document.getElementById(href.slice(1));
    if (target) {
      event.preventDefault();
      if (window.location.hash !== href) window.location.hash = href;
      else target.scrollIntoView({ behavior: "auto" });
    }
  };

  return (
    <header className={`sticky top-0 z-40 border-b border-[#e4ded4] bg-[#faf8f4]/95 backdrop-blur-xl transition-shadow ${scrolled ? "shadow-sm" : ""}`}>
      <div className="hidden border-b border-[#e4ded4] sm:block">
        <div className="site-container flex h-8 items-center justify-between text-[9px] uppercase tracking-[0.18em] text-[#776c5c]">
          <span>Fashion design from Koforidua, Ghana</span>
          <span className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-primary" /> Worldwide delivery available</span>
        </div>
      </div>
      <nav aria-label="Main navigation" className="site-container">
        <div className="flex h-[76px] items-center justify-between gap-4 lg:h-[84px]">
          <a href="#home" onClick={(event) => navigate(event, "#home")} className="flex shrink-0 items-center gap-2 sm:gap-3" aria-label="Manaf Clothing home">
            <img src={logo} alt="" width="70" height="43" className="h-9 w-14 bg-black object-contain sm:h-11 sm:w-[70px]" />
            <span className="text-[17px] leading-none tracking-[-0.04em] sm:text-[23px]">
              <span className="font-serif">Manaf Clothing</span>
              <span className="mt-2 block text-[8px] font-medium uppercase tracking-[0.25em] text-primary">Fashion designer</span>
            </span>
          </a>
          <div className="hidden items-center gap-7 lg:flex">
            {links.map(link => <a key={link.href} href={link.href} onClick={event => navigate(event, link.href)} className="py-3 text-[11px] font-medium tracking-wide transition-colors hover:text-primary">{link.name}</a>)}
          </div>
          <div className="flex items-center gap-2 sm:gap-5">
            <a href="#contact" onClick={event => navigate(event, "#contact")} className="hidden items-center gap-2 border-b border-primary/50 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] xl:flex">Create your look <ArrowUpRight size={15} /></a>
            <button type="button" onClick={() => window.dispatchEvent(new Event("open-cart"))} className="relative p-2" aria-label="Open your selection">
              <ShoppingBag size={21} strokeWidth={1.5} />
              <span id="cart-count" className="absolute -right-1 -top-1 flex hidden h-[18px] min-w-[18px] items-center justify-center rounded-full bg-primary px-1 text-[9px] text-white">0</span>
            </button>
            <button ref={menuButton} type="button" onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen} aria-controls="mobile-navigation" aria-label={isOpen ? "Close menu" : "Open menu"} className="p-2 lg:hidden">
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        {isOpen && (
          <div id="mobile-navigation" className="border-t border-[#e4ded4] pb-6 pt-3 lg:hidden">
            {links.map(link => <a key={link.href} href={link.href} onClick={event => navigate(event, link.href)} className="flex items-center justify-between border-b border-[#e4ded4]/60 py-4 text-sm">{link.name}<ArrowUpRight size={16} className="text-primary" /></a>)}
            <a href="#contact" onClick={event => navigate(event, "#contact")} className="button-primary mt-5 w-full">Create your look <ArrowUpRight size={16} /></a>
          </div>
        )}
      </nav>
    </header>
  );
}
