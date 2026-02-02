import { motion } from "framer-motion";
import heroImage from "../../assets/manaf.jpeg";

const Hero = () => {
  const scrollToServices = () => {
    const element = document.querySelector("#services");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-20"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Tailor measuring fabric"
          className="w-full h-full object-cover opacity-90 "
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/70" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl lg:text-7xl font-serif font-bold mb-6 leading-tight"
            >
              We make clothes that{" "}
              <span className="text-primary">suit you</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg lg:text-xl text-gray-300 mb-8 leading-relaxed max-w-xl"
            >
              Experience the perfect blend of traditional craftsmanship and
              modern design. Our expert tailors create custom clothing that
              reflects your unique style and personality.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 40px rgba(156, 125, 109, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToServices}
              className="bg-primary text-white px-8 py-4 rounded-md font-semibold text-lg hover:bg-primary/90 transition-all duration-300 shadow-lg"
            >
              OUR SERVICES
            </motion.button>
          </motion.div>

          {/* Right Column - Featured Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              <motion.img
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                src={heroImage}
                alt="Professional tailoring"
                className="rounded-lg shadow-2xl w-full h-[600px] object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent rounded-lg" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          delay: 1.2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-primary rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
