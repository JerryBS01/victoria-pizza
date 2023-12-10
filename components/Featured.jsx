import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Featured = () => {
    const images = [
        '/img/featured1.png',
        '/img/featured2.png',
        '/img/featured3.png',
    ];

    const [index, setIndex] = useState(0);

    const handleArrow = (direction) => {
        if (direction === 'l') {
            setIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
        } else if (direction === 'r') {
            setIndex((prevIndex) => (prevIndex + 1) % images.length);
        }
    };

    const autoClickArrow = () => {
        handleArrow('r');
    };

    useEffect(() => {
        const intervalId = setInterval(autoClickArrow, 4000);
        return () => clearInterval(intervalId);
    }, [index]);

    return (
        <div className="relative md:h-screen h-[40vh] bg-red-500 overflow-hidden" id="featured">
            <div className="flex transition-transform duration-1500 ease-in-out">
                {images.map((img, i) => (
                    <div key={i} className={`w-full h-full ${i === index ? '' : 'hidden'}`}>
                        <Image src={img} alt="" fill className="md:object-cover" />
                    </div>
                ))}
            </div>
            <div className="group absolute w-1/10 top-1/2 left-10 transform -translate-y-1/2 cursor-pointer z-2 pointer-events-auto md:flex hidden bg-white text-red-500 rounded-full p-2 hover:bg-gray-300 hover:scale-110 transition-all" onClick={() => handleArrow('r')}>
                <div className="group-hover:-translate-x-1 transition-all">
                    <FaArrowLeft className="pointer-events-none" />
                </div>
            </div>
            <div className="group absolute w-1/10 top-1/2 right-10 transform -translate-y-1/2 cursor-pointer z-2 pointer-events-auto md:flex hidden bg-white text-red-500 rounded-full p-2 hover:bg-gray-300 hover:scale-110 transition-all" onClick={() => handleArrow('r')}>
                <div className="group-hover:translate-x-1 transition-all">
                    <FaArrowRight className="pointer-events-none" />
                </div>
            </div>
            <div className="group absolute w-1/10 top-full left-10 transform -translate-y-12 cursor-pointer z-2 pointer-events-auto md:hidden bg-white text-red-500 rounded-full p-2 hover:bg-gray-300 hover:scale-105 transition-all" onClick={() => handleArrow('l')}>
                <div className="group-hover:-translate-x-1 transition-all">
                    <FaArrowLeft className="pointer-events-none" />
                </div>
            </div>
            <div className="group absolute w-1/10 top-full right-10 transform -translate-y-12 cursor-pointer z-2 pointer-events-auto md:hidden bg-white text-red-500 rounded-full p-2 hover:bg-gray-300 hover:scale-105 transition-all" onClick={() => handleArrow('r')}>
                <div className="group-hover:translate-x-1 transition-all">
                    <FaArrowRight className="pointer-events-none" />
                </div>
            </div>
        </div>
    );
};

export default Featured;
