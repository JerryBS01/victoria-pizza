import React from 'react';
import { GiFullPizza } from 'react-icons/gi';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  const bounceAnimation = {
    y: [0, -10, 0],
    transition: {
      y: {
        duration: 0.6,
        repeat: Infinity,
        repeatType: 'reverse',
      },
    },
  };

  const delayFactor = 0.3;

  return (
    <div className="flex items-center justify-center space-x-2">
      {[...Array(3).keys()].map((index) => (
        <motion.div
          key={index}
          animate={{
            y: [0, -10, 0],
            transition: {
              duration: 1,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: delayFactor * index,
            },
          }}
        >
          <GiFullPizza size={30} />
        </motion.div>
      ))}
    </div>
  );
};

export default LoadingScreen;
