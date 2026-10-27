import { Ruler, Palette, Gem, Globe2 } from "lucide-react";
const features = [
  { icon: Palette, title: "Personal by design", description: "A fashion designer who listens to your ideas and understands your style." },
  { icon: Ruler, title: "A considered fit", description: "Made around your measurements, with comfort and movement in mind." },
  { icon: Gem, title: "Details that matter", description: "Thoughtful fabrics, finishing, and the little touches that make a piece yours." },
  { icon: Globe2, title: "From Ghana, to you", description: "Visit us in Koforidua or speak with us about worldwide delivery." },
];
export default function WhyChooseUs() {
  return <section className="border-y border-[#e2dbcf] bg-[#f2eee6] py-12"><div className="site-container grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{features.map(({ icon: Icon, title, description }) => <div key={title} className="flex gap-4"><Icon size={23} strokeWidth={1.3} className="mt-1 shrink-0 text-primary" /><div><h3 className="mb-2 text-lg font-normal">{title}</h3><p className="text-[11px] leading-[1.9] text-[#7b7265]">{description}</p></div></div>)}</div></section>;
}
