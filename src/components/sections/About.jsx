import { motion } from "framer-motion";
import aboutImage from "../../assets/manafff.jpeg";

const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Column - Desktop: Left with overlap effect */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative lg:pr-12">
              <motion.img
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                src={aboutImage}
                alt="Moniek workspace"
                className="rounded-lg shadow-2xl w-full h-[500px] object-cover object-top relative z-10"
              />
              {/* Decorative element */}
              <div className="hidden lg:block absolute -bottom-6 -right-6 w-full h-full bg-primary/20 rounded-lg -z-0" />
            </div>
          </motion.div>

          {/* Content Column - Desktop: Right with background */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <div className="bg-white lg:bg-secondary p-8 lg:p-12 rounded-lg lg:-ml-12 relative z-20">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl lg:text-5xl font-serif font-bold text-black mb-6"
              >
                About Moniek Clothing
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-4 text-gray-700 leading-relaxed"
              >
                <p>
                  For over two decades, Moniek has been at the forefront of
                  bespoke tailoring, combining traditional craftsmanship with
                  contemporary design sensibilities.
                </p>
                <p>
                  Our master tailors bring years of experience and passion to
                  every garment, ensuring that each piece is not just clothing,
                  but a work of art tailored specifically to you.
                </p>
                <p>
                  We believe that the perfect fit goes beyond measurements—it's
                  about understanding your lifestyle, preferences, and the
                  confidence that comes from wearing something made just for
                  you.
                </p>
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(156, 125, 109, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 bg-primary text-white px-8 py-3 rounded-md font-semibold hover:bg-primary/90 transition-all duration-300 shadow-lg"
              >
                More About Us
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
