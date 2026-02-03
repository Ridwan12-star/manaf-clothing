import { motion } from "framer-motion";
import { Instagram, MessageCircle, Music } from "lucide-react";

const SocialMedia = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-black mb-4">
            Follow Us On Social Media
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Stay connected and get inspired by our latest creations and
            behind-the-scenes moments
          </p>
        </motion.div>

        {/* Social Media Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center gap-6"
        >
          <motion.a
            href="https://www.instagram.com/manafclothing?igsh=MTdpbnRhcGE5ZTY1bw=="
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, y: -5 }}
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <Instagram size={32} />
            <span className="font-semibold">Instagram</span>
          </motion.a>
          <motion.a
            href="https://wa.me/+233249494505"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, y: -5 }}
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <MessageCircle size={32} />
            <span className="font-semibold">WhatsApp</span>
          </motion.a>
          <motion.a
            href="https://www.tiktok.com/@manafclothing?_r=1&_t=ZS-93ahaV0aNwj"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, y: -5 }}
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <Music size={32} />
            <span className="font-semibold">TikTok</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialMedia;