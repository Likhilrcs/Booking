import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-64">
      <motion.div
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
        className="w-12 h-12 border-4 border-[#f0f3bd] border-t-[#02c39a] rounded-full"
      />
    </div>
  );
};

export default LoadingSpinner;