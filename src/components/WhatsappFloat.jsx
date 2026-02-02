import { MessageCircle } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

function WhatsAppFloat() {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href="https://wa.me/233249494505"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-1000 flex items-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`mr-3 px-3 py-2 bg-[#25D366] text-white text-sm rounded-lg shadow-lg whitespace-nowrap 
        transition-all duration-300 ${
          hovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
        }`}
      >
        Chat with us
      </div>

      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-[#25D366] text-white p-4 md:mr-4 rounded-full shadow-lg 
                   animate-pulse-glow hover:scale-110 transition-transform duration-300"
      >
        <MessageCircle className="w-7 h-7" />
      </motion.div>
    </a>
  );
}

export default WhatsAppFloat;
