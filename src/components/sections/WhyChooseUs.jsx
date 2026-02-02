import { motion } from 'framer-motion';
import { Scissors, Ruler, Zap, Sparkles } from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    {
      icon: Scissors,
      title: 'Expert Craftsmanship',
      description: 'Our master tailors have decades of experience creating perfect garments with meticulous attention to detail.',
    },
    {
      icon: Ruler,
      title: 'Perfect Fit Guarantee',
      description: 'Every garment is tailored to your exact measurements for a flawless, comfortable fit.',
    },
    {
      icon: Zap,
      title: 'Professional Sewing',
      description: 'Using state-of-the-art equipment and traditional techniques to create beautiful, durable pieces.',
    },
    {
      icon: Sparkles,
      title: 'Quality Materials',
      description: 'We source only the finest fabrics and threads to ensure your garments last for years to come.',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-black mb-4">
            Why Use Our Services
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover what sets Moniek apart in the world of bespoke tailoring
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="text-center p-6 rounded-lg hover:bg-secondary/30 transition-all duration-300">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6 group-hover:bg-primary/20 transition-colors duration-300"
                  >
                    <Icon className="w-10 h-10 text-primary" strokeWidth={1.5} />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-xl font-serif font-bold text-black mb-3">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
