import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import PizzaCard from './PizzaCard';
import LoadingScreen from './LoadingScreen';

const PizzaList = ({ pizzaList }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  React.useEffect(() => {
    if (inView) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  return (
    <div className="container p-4 pt-[7rem] flex flex-col items-center" id="menu">
      <h1 className="title text-3xl font-bold mb-10 text-center">
        Our Menu
      </h1>
      <div className="wrapper w-full flex flex-wrap justify-center" ref={ref}>
        {isLoading ? (
          <div className="pt-4">
            <LoadingScreen />
          </div>
        ) : (
          pizzaList.map((pizza) => <PizzaCard key={pizza._id} pizza={pizza} />)
        )}
      </div>
    </div>
  );
};

export default PizzaList;