import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const PizzaCard = ({ pizza }) => {

  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="w-full md:w-1/4 m-2 p-5 flex flex-col items-center text-center justify-center rounded-lg shadow-lg hover:bg-gray-300 hover:scale-105 transition-all"
    >
      <Link href={`/product/${pizza._id}`} passHref>
        <div className="flex flex-col items-center">
          <Image src={pizza.img} alt='' width={200} height={200} />
          <h2 className="title text-2xl font-bold mt-4">{pizza.title}</h2>
          <p className="price text-xl font-bold text-red-500 mt-2">${pizza.prices[0]}</p>
          <p className="desc text-black mt-2">{pizza.desc}</p>
        </div>
      </Link>
    </motion.div>
  );
};

export default PizzaCard;