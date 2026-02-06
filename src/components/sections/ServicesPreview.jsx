import { motion } from "framer-motion";
import service1 from "../../assets/IMG_3978.jpg";
import service2 from "../../assets/service_alterations_1769960137293.png";
import service3 from "../../assets/Kid.jpeg";

const ServicesPreview = () => {
  const services = [
    {
      id: 1,
      image: service1,
      title: "Premium Quality Fabrics",
      description:
        "Bespoke garments crafted to your exact measurements and style preferences.",
    },
    {
      id: 2,
      image: service2,
      title: "Alterations & Repairs",
      description:
        "Expert alterations to ensure your clothing fits perfectly and lasts longer.",
    },
    {
      id: 3,
      image: service3,
      title: "Fast & Reliable Delivery",
      description:
        "Personalized styling advice and fabric selection for your unique vision.",
    },
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-black mb-4">
            Our Services
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover our comprehensive range of tailoring services designed to
            bring your vision to life
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
                {/* Image */}
                <div className="relative h-80 overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                  {/* Number Badge */}
                  <div className="absolute top-6 right-6">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-16 h-16 rounded-full border-4 border-primary bg-white flex items-center justify-center"
                    >
                      <span className="text-2xl font-serif font-bold text-primary">
                        {service.id}
                      </span>
                    </motion.div>
                  </div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-serif font-bold mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-200 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
