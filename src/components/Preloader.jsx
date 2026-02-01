import { motion } from 'framer-motion';

const Preloader = ({ onLoadingComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 2 }}
      onAnimationComplete={onLoadingComplete}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
    >
      <div className="relative">
        {/* Outer ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 border-4 border-secondary rounded-full border-t-primary"
        />
        {/* Inner ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="absolute inset-2 w-16 h-16 border-4 border-secondary rounded-full border-b-primary"
        />
        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="w-3 h-3 bg-primary rounded-full"
          />
        </div>
      </div>
      <motion.p
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute mt-32 text-primary font-serif text-lg tracking-wider"
      >
        MONIEK
      </motion.p>
    </motion.div>
  );
};

export default Preloader;
