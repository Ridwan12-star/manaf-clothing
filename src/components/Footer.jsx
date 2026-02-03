import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin, Globe } from 'lucide-react';
import logo from '../assets/logo.jpeg';

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Our Work', href: '#our-work' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-gray-900 text-white overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-gray-900/90 z-0" />

      <div className="relative z-10 container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Column 1: About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center md:text-left"
          >
            <div className="flex flex-col items-center md:items-start mb-4">
              <img
                src={logo}
                alt="Manaf Clothing Logo"
                className="h-16 w-auto object-contain mb-4"
              />
              <h3 className="text-2xl font-serif font-bold text-primary">
                Manaf Clothing
              </h3>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed text-center md:text-left">
              We are dedicated to creating custom-tailored clothing that perfectly fits your style and personality. Quality craftsmanship meets modern design.
            </p>
            <div className="flex space-x-4 justify-center md:justify-start">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.2, y: -3 }}
                  className="text-primary hover:text-secondary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={24} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center md:text-left"
          >
            <h3 className="text-xl font-serif font-bold text-primary mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="text-gray-300 hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Contact & Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center md:text-left"
          >
            <h3 className="text-xl font-serif font-bold text-primary mb-4">
              Contact Us
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start justify-center md:justify-start space-x-2">
                <MapPin size={18} className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">📍 Location</p>
                  <p>Koforidua, Eastern Region, Ghana</p>
                  <p className="text-primary font-semibold mt-2 flex items-center gap-1">
                    <Globe size={16} />
                    🌍 Delivery Worldwide Available
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-300">
                <Phone size={18} className="text-primary flex-shrink-0" />
                <span>+ 233(0) 249-494-505</span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-300">
                <Mail size={18} className="text-primary flex-shrink-0" />
                <span>info@manaf.com</span>
              </div>
            </div>
            <div className="mt-6">
              <h4 className="text-lg font-serif font-bold text-primary mb-2">Opening Hours</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span className="font-semibold">9:00 AM - 6:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday:</span>
                  <span className="font-semibold">10:00 AM - 4:00 PM</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400"
        >
          <p>
            <button
              id="admin-secret-trigger"
              onClick={() => {
                window.location.hash = "#admin";
                window.location.reload();
              }}
              className="hover:text-primary transition-colors cursor-default inline-block py-2 px-4 -ml-4"
              aria-label="Admin Portal"
            >
              &copy;
            </button>{" "}
            {new Date().getFullYear()} Manaf Clothing. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
