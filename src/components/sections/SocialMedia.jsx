import { motion } from "framer-motion";
import { Instagram, MessageCircle, Music } from "lucide-react";

// Import existing images for social media grid
import img1 from "../../assets/imgone.png";
import img2 from "../../assets/service_alterations_1769960137293.png";
import img3 from "../../assets/imgtwo.png";
import img4 from "../../assets/about_workspace_1769960172951.png";
import img5 from "../../assets/gallery_suit_detail_1769960193088.png";
import img6 from "../../assets/hero_tailor_measuring_1769960105944.png";

const SocialMedia = () => {
  const socialPosts = [
    {
      id: 1,
      image: img1,
      platform: "instagram",
      link: "https://instagram.com",
    },
    {
      id: 2,
      image: img2,
      platform: "whatsapp",
      link: "https://wa.me/1234567890",
    },
    { id: 3, image: img3, platform: "tiktok", link: "https://tiktok.com" },
    {
      id: 4,
      image: img4,
      platform: "instagram",
      link: "https://instagram.com",
    },
    {
      id: 5,
      image: img5,
      platform: "whatsapp",
      link: "https://wa.me/1234567890",
    },
    { id: 6, image: img6, platform: "tiktok", link: "https://tiktok.com" },
  ];

  const getIcon = (platform) => {
    switch (platform) {
      case "instagram":
        return Instagram;
      case "whatsapp":
        return MessageCircle;
      case "tiktok":
        return Music;
      default:
        return Instagram;
    }
  };

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

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {socialPosts.map((post, index) => {
            const Icon = getIcon(post.platform);
            return (
              <motion.a
                key={post.id}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group relative overflow-hidden rounded-lg shadow-lg aspect-square"
              >
                {/* Image */}
                <img
                  src={post.image}
                  alt={`Social media post ${post.id}`}
                  className="w-full h-full object-cover"
                />

                {/* Overlay with Icon */}
                <div className="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="text-white" size={60} strokeWidth={1.5} />
                  </motion.div>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Social Media Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center gap-6 mt-12"
        >
          <motion.a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, y: -5 }}
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <Instagram size={32} />
            <span className="font-semibold">Instagram</span>
          </motion.a>
          <motion.a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, y: -5 }}
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <MessageCircle size={32} />
            <span className="font-semibold">WhatsApp</span>
          </motion.a>
          <motion.a
            href="https://tiktok.com"
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
