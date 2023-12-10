import React, { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../redux/cartSlice';
import { GiFullPizza } from "react-icons/gi";
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import LoadingSpinner from '../../components/LoadingSpinner';

const Product = ({ pizza }) => {
    const [size, setSize] = useState(0);
    const [price, setPrice] = useState(pizza.prices[0]);
    const [extras, setExtras] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const [isAdded, setAdded] = useState(false);

    const router = useRouter();

    const handleBack = () => {
        router.push("/#menu");
    };

    const changePrice = (number) => {
        setPrice(price + number);
    };

    const handleSize = (sizeIndex) => {
        const difference = pizza.prices[sizeIndex] - pizza.prices[size];
        setSize(sizeIndex);
        changePrice(difference);
    };

    const handleChange = (e, option) => {
        const checked = e.target.checked;

        if (checked) {
            changePrice(option.price);
            setExtras((prev) => [...prev, option]);
        } else {
            changePrice(-option.price);
            setExtras(extras.filter((extra) => extra._id !== option._id));
        }
    };

    const handleClick = () => {
        if (!isAdded) {
            setAdded(true);

            dispatch(addProduct({ ...pizza, extras, price, quantity }));

            setTimeout(() => {
                setAdded(false);
            }, 1500);
        }
    };

    return (
        <div className="flex-col p-4">
            <div className="relative flex flex-col md:flex-row m-8">
                {/* Image Section */}
                <div className="flex-1 items-center md:w-1/2 md:h-1/2 mb-4 md:mb-0 flex justify-center">
                    <Image src={pizza.img} alt="" objectFit="contain" width={400} height={400} />
                </div>

                <AnimatePresence>
                    {isAdded && (
                        <motion.div
                            key="image"
                            initial={{ opacity: 1, y: 0, x: 0, zIndex: 1, scale: 1 }}
                            animate={{ opacity: 0, y: -200, x: '250%', scale: 0 }}
                            transition={{ type: 'tween', duration: 1.5 }}
                            className="absolute top-0 left-0 md:left-40 transform -translate-x-0.5 hidden md:flex"
                        >
                            <Image src={pizza.img} alt="" objectFit="contain" width={400} height={400} />
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex-1 p-4">
                    <h1 className="text-3xl font-bold mb-2">{pizza.title}</h1>
                    <span className="text-2xl font-bold text-red-500">${price}</span>
                    <p className="mt-2">{pizza.desc}</p>
                    <h3 className="text-2xl font-bold mt-4">Choose Size</h3>
                    <div className="flex flex-row gap-8">
                        <div className="flex flex-col items-center gap-2 mt-2">
                            <div
                                className={`w-10 h-10 cursor-pointer flex items-center justify-center border-2 rounded-full ${size === 0 ? 'border-red-500' : ''}`}
                                onClick={() => handleSize(0)}
                            >
                                <GiFullPizza size={20} />
                            </div>
                            <div className="text-semibold">S</div>
                        </div>
                        <div className="flex flex-col items-center gap-2 mt-2">
                            <div
                                className={`w-10 h-10 cursor-pointer flex items-center justify-center border-2 rounded-full ${size === 1 ? 'border-red-500' : ''}`}
                                onClick={() => handleSize(1)}
                            >
                                <GiFullPizza size={30} />
                            </div>
                            <div className="text-semibold">M</div>
                        </div>
                        <div className="flex flex-col items-center gap-2 mt-2">
                            <div
                                className={`w-10 h-10 cursor-pointer flex items-center justify-center border-2 rounded-full ${size === 2 ? 'border-red-500' : ''}`}
                                onClick={() => handleSize(2)}
                            >
                                <GiFullPizza size={40} />
                            </div>
                            <div className="text-semibold">L</div>
                        </div>
                    </div>
                    {pizza.extraOptions.length > 0 && (
                        <>
                            <h3 className="text-2xl font-bold mt-4">
                                Choose Extras
                            </h3>
                            <div className="flex flex-wrap gap-4 mt-2">
                                {pizza.extraOptions.map((option) => (
                                    <div key={option._id} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={option.text}
                                            name={option.text}
                                            className="w-4 h-4 mr-2"
                                            onClick={(e) => handleChange(e, option)}
                                        />
                                        <label htmlFor="double" className="text-lg">
                                            {option.text}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                    <div className="flex items-center mt-4">
                        <input
                            type="number"
                            defaultValue={1}
                            min={1}
                            max={9}
                            className="w-16 h-8 border p-2 mr-4"
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                        <button
                            className={`${isAdded ? 'cursor-not-allowed bg-red-700' : 'cursor-pointer bg-red-500 hover:scale-105 hover:bg-red-700'
                                } text-white px-4 py-2 rounded`}
                            onClick={handleClick}
                            disabled={isAdded}
                            style={{ width: '120px' }} // Adjust the width as needed
                        >
                            {isAdded ? <LoadingSpinner /> : 'Add to Cart'}
                        </button>
                    </div>
                </div>

            </div>
            <div>
                <button
                    className="text-white bg-red-500 p-2 rounded-md hover:scale-105 hover:bg-red-700 inline-block m-4"
                    onClick={handleBack}
                >
                    Back
                </button>
            </div>
        </div>
    )
}

export const getServerSideProps = async ({ params }) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${params.id}`);
    return {
        props: {
            pizza: res.data,
        }
    }
}


export default Product;