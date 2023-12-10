import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AboutUs = () => {
  const [showAlternateContent, setShowAlternateContent] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);

  const handleSliderChange = (event) => {
    const x = parseInt(event.target.value, 10);
    setSliderValue(x);

    if (x >= 50 && !showAlternateContent) {
      setShowAlternateContent(true);
      setAnimationKey((prevKey) => prevKey + 1);
    } else if (x < 50 && showAlternateContent) {
      setShowAlternateContent(false);
      setAnimationKey((prevKey) => prevKey + 1);
    }
  };

  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  useEffect(() => {
    const slider = document.getElementById('custom-slider');

    const updateSliderValue = () => {
      setSliderValue(parseInt(slider.value, 10));
    };

    slider.addEventListener('input', updateSliderValue);

    return () => {
      slider.removeEventListener('input', updateSliderValue);
    };
  }, []);

  return (
    <div className="px-3 py-[7rem] items-center" id="about">
      <h2 className="text-3xl font-bold text-center mb-8">About Us</h2>

      <div className="md:ml-8 mb-4 md:mb-0 text-xs md:text-base inline-block">
        <div className="flex flex-row py-3 px-6 gap-6 items-center bg-white shadow-lg rounded-full hover:scale-105 transition-all">
          <p>Our Story</p>
          <input
            type="range"
            id="custom-slider"
            value={sliderValue}
            onChange={handleSliderChange}
            min="0"
            max="100"
            step="1"
          />
          <p>Our History</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center">
        <div className="md:w-1/2 p-6 pt-2 relative">
          <motion.div
            ref={ref}
            key={animationKey}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            {showAlternateContent ? (
              <>
                <p className="mb-4">
                  Victoria Pizza&apos;s roots trace back to humble beginnings, a corner of the city where innovation and dedication collided. The pioneering years were marked by experimentation, introducing artisanal excellence that set the stage for our commitment to quality and taste.
                </p>
                <p className="mb-4">
                  As we evolved, so did our connection with the community, turning Victoria Pizza into more than a restaurant. Today, our history is a tapestry of joy, innovation, and a belief that a great pizza is not just about the flavors but the shared experiences it creates.
                </p>
                <p className="mb-4">
                  Join us in celebrating the rich narrative of Victoria Pizza—a history crafted with love and a slice of culinary artistry.
                </p>
              </>
            ) : (
              <>
                <p className="mb-4">
                  Embark on a flavorful journey at Victoria Pizza, where passion meets every slice. We take pride in being your go-to destination for mouthwatering pizzas crafted with love and the finest ingredients.
                </p>
                <p className="mb-4">
                  From the first bite, you&apos;ll taste the dedication that goes into redefining the pizza experience, from hand-tossed crusts to a curated selection of premium toppings.
                </p>
                <p className="mb-4">
                  Our culinary adventure began with a simple goal—to create more than just a meal but lasting memories with every customer we serve.
                </p>
              </>
            )}
          </motion.div>
        </div>
        <div className="md:w-1/2 p-6 pt-2">
          <iframe
            className="border-2 border-red-500 hover:scale-105 transition-all"
            width="100%"
            height="300"
            title="Victoria Pizza Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100815.16744609828!2d144.83788849726562!3d-37.8491986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad66824c65b1d15%3A0x13bb99dc6d6d9139!2sVictoria%20Pizza!5e0!3m2!1sen!2sau!4v1701909237465!5m2!1sen!2sau"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;