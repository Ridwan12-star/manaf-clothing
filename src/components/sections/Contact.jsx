import { useState } from "react";
import { ArrowUpRight, MapPin, Phone, MessageCircle } from "lucide-react";

export default function Contact() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const enquiry = `Hello Manaf Clothing, my name is ${name.trim()}.\n\n${message.trim()}`;
  const sendEnquiry = event => {
    event.preventDefault();
    window.open(`https://wa.me/233249494505?text=${encodeURIComponent(enquiry)}`, "_blank", "noopener,noreferrer");
  };
  return (
    <section id="contact" className="section-space bg-[#29251f] text-[#faf8f4]">
      <div className="site-container grid gap-14 lg:grid-cols-2 lg:gap-24">
        <div>
          <span className="eyebrow !text-[#c6aa7f]">Your next look starts here</span>
          <h2 className="section-heading">A little inspiration.<br /><span className="italic text-[#c6aa7f]">Endless possibility.</span></h2>
          <p className="mb-9 mt-6 max-w-sm text-sm leading-[1.9] text-[#c2b9ac]">Have an occasion, an idea, or a piece you love? Let's talk about bringing your vision to life with your fashion designer.</p>
          <div className="space-y-5 text-xs text-[#d6cec1]">
            <p className="flex items-center gap-3"><MapPin size={18} strokeWidth={1.4} className="text-[#c6aa7f]" /> Koforidua, Eastern Region, Ghana</p>
            <a href="tel:+233249494505" className="flex items-center gap-3 hover:text-white"><Phone size={18} strokeWidth={1.4} className="text-[#c6aa7f]" /> +233 24 949 4505 <ArrowUpRight size={13} /></a>
            <a href="https://wa.me/233249494505" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white"><MessageCircle size={18} strokeWidth={1.4} className="text-[#c6aa7f]" /> Prefer to chat? Find us on WhatsApp <ArrowUpRight size={13} /></a>
          </div>
        </div>
        <form onSubmit={sendEnquiry} className="self-center border border-[#5e5548] p-6 sm:p-9">
          <p className="mb-7 font-serif text-2xl">Tell us what you're imagining.</p>
          <div className="mb-6"><label htmlFor="enquiry-name" className="mb-3 block text-[10px] uppercase tracking-[0.15em] text-[#c6bfb3]">Your name</label><input id="enquiry-name" name="name" autoComplete="name" required maxLength={100} value={name} onChange={event => setName(event.target.value)} placeholder="How should we address you?" className="w-full border-b border-[#6f6659] bg-transparent pb-3 text-sm text-white placeholder:text-[#a3998a] focus:border-[#c6aa7f] focus:outline-none" /></div>
          <div className="mb-7"><label htmlFor="enquiry-message" className="mb-3 block text-[10px] uppercase tracking-[0.15em] text-[#c6bfb3]">Your idea</label><textarea id="enquiry-message" name="message" required maxLength={2000} rows={3} value={message} onChange={event => setMessage(event.target.value)} placeholder="A vintage top, a celebration outfit, or something uniquely you…" className="w-full resize-y border-b border-[#6f6659] bg-transparent pb-3 text-sm leading-relaxed text-white placeholder:text-[#a3998a] focus:border-[#c6aa7f] focus:outline-none" /></div>
          <button type="submit" className="flex min-h-12 w-full items-center justify-between gap-4 bg-[#c6aa7f] px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#29251f] transition-colors hover:bg-[#dcc7a5]">Let's talk on WhatsApp <ArrowUpRight size={18} /></button>
          <p className="mt-4 text-[10px] leading-relaxed text-[#b4aa9a]">Opens WhatsApp with your enquiry ready to send.</p>
        </form>
      </div>
    </section>
  );
}
