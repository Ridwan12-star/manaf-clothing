import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Quote } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      quote: 'Moniek transformed my wedding dress into something beyond my wildest dreams. The attention to detail and craftsmanship is unparalleled. I felt like royalty!',
      image: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=9c7d6d&color=fff&size=200',
    },
    {
      id: 2,
      name: 'Michael Chen',
      quote: 'I\'ve been getting my suits tailored at Moniek for years. The perfect fit and quality fabrics make all the difference. Highly recommend their custom tailoring service!',
      image: 'https://ui-avatars.com/api/?name=Michael+Chen&background=9c7d6d&color=fff&size=200',
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      quote: 'The team at Moniek is incredibly professional and talented. They took the time to understand my style and created pieces that fit perfectly. Worth every penny!',
      image: 'https://ui-avatars.com/api/?name=Emily+Rodriguez&background=9c7d6d&color=fff&size=200',
    },
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Large quotation mark background */}
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 opacity-5 pointer-events-none">
        <Quote size={300} className="text-secondary" strokeWidth={1} />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              bulletActiveClass: 'swiper-pagination-bullet-active',
            }}
            loop={true}
            className="testimonials-swiper pb-16"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={testimonial.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="flex flex-col md:flex-row items-center gap-8 p-8"
                >
                  {/* Profile Image */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex-shrink-0"
                  >
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-32 h-32 rounded-full object-cover shadow-xl border-4 border-secondary"
                    />
                  </motion.div>

                  {/* Quote Content */}
                  <div className="flex-1 text-center md:text-left">
                    <Quote className="text-primary mb-4 mx-auto md:mx-0" size={40} strokeWidth={1.5} />
                    <p className="text-xl lg:text-2xl text-gray-700 italic leading-relaxed mb-6">
                      "{testimonial.quote}"
                    </p>
                    <p className="text-lg font-serif font-bold text-primary">
                      — {testimonial.name}
                    </p>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

      <style jsx>{`
        .testimonials-swiper :global(.swiper-pagination-bullet) {
          background: #9c7d6d;
          opacity: 0.5;
          width: 12px;
          height: 12px;
        }
        .testimonials-swiper :global(.swiper-pagination-bullet-active) {
          opacity: 1;
          width: 30px;
          border-radius: 6px;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
