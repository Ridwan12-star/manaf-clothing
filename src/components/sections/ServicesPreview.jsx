import { ArrowUpRight } from "lucide-react";
import fabrics from "../../assets/IMG_3978.jpg";
import garment from "../../assets/manafff.jpeg";
import kids from "../../assets/Kid.jpeg";

const services = [
  { number: "01", image: fabrics, title: "Find your inspiration", description: "Start with a collection, a fabric, or an idea. Your fashion designer helps you explore colours, textures, and a direction that feels right.", label: "Discover & discuss" },
  { number: "02", image: garment, title: "Make it your own", description: "Bring your look to life with a personal fit and considered details. Share your measurements or visit the studio for a fitting.", label: "Design & fit" },
  { number: "03", image: kids, title: "Wear your story", description: "From everyday favourites to celebration pieces for you and your family, create a look for the moments that matter.", label: "Create & enjoy" },
];

export default function ServicesPreview() {
  return (
    <section id="services" className="section-space">
      <div className="site-container">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><span className="eyebrow">The personal design experience</span><h2 className="section-heading">Your vision.<br /><span className="italic text-primary">Our creative process.</span></h2></div><a href="#contact" className="text-link self-start md:self-auto">Start a conversation <ArrowUpRight size={16} /></a></div>
        <div className="grid gap-10 md:grid-cols-3 md:gap-7">
          {services.map(service => <article key={service.number}>
            <div className="relative overflow-hidden bg-[#e7e0d6]"><img src={service.image} alt={service.title} loading="lazy" className="aspect-[5/4] w-full object-cover object-[center_25%]" /><span className="absolute bottom-4 left-4 bg-[#faf8f4] px-4 py-2 font-serif text-xl text-primary">{service.number}</span></div>
            <p className="mb-3 mt-6 text-[9px] uppercase tracking-[0.2em] text-primary">{service.label}</p><h3 className="mb-3 text-2xl font-normal">{service.title}</h3><p className="text-xs leading-[1.95] text-[#7b7265]">{service.description}</p>
          </article>)}
        </div>
      </div>
    </section>
  );
}
