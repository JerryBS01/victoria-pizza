import React, { useState, useEffect } from 'react';
import styles from '../../styles/Order.module.css';
import Image from 'next/image';
import axios from 'axios';
import { FaRegCheckCircle } from "react-icons/fa";
import dynamic from "next/dynamic";
import { motion } from 'framer-motion';
import LoadingScreen from '../../components/LoadingScreen';

const Order = ({ order }) => {

    const status = order.status;

    const statusClass = (index) => {
        if (index - status < 1) {
            return styles.done;
        } else if (index - status === 1) {
            return styles.inProgress;
        } else if (index - status > 1) {
            return styles.notdone;
        }
    }

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex flex-col">
            <div className="w-full">
                <div className="pt-6 pl-3 md:pl-8 text-3xl font-semibold">
                    Your Order
                </div>
            </div>
            <div className="w-full flex flex-col md:flex-row">
                {isLoading ? (
                    <div className="pt-4 md:w-2/3 md:m-8">
                        <LoadingScreen />
                    </div>
                ) : (
                    <div className="m-4 md:w-2/3 md:m-8 text-xs md:text-base">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1.5 }}
                        >
                            <table className="w-full border-collapse border-2 border-red-500">
                                <thead>
                                    <tr className="text-left">
                                        <th>Order ID</th>
                                        <th>Customer</th>
                                        <th>Order Details</th>
                                        <th>Address</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colSpan="6" className="p-0">
                                            <div className="border-b-2 border-red-500"></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span>{order._id && order._id.substring(0, 9)}...</span>
                                        </td>
                                        <td>
                                            <span>
                                                {order.customer}
                                            </span>
                                        </td>
                                        <td>
                                            {order.orderDetails.map((item, index) => (
                                                <span key={index}>
                                                    <strong>{item.item}</strong>, Qty: <strong>{item.quantity}</strong>, Extras: <strong>{item.extraOptions.join(', ')}</strong>
                                                    {index !== order.orderDetails.length - 1 && <br />}
                                                </span>
                                            ))}
                                        </td>
                                        <td>
                                            <span>
                                                {order.address}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="font-semibold text-red-500">${order.total}</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="mx-4 mt-4 md:mt-8 flex justify-between">
                                <div className={statusClass(0)}>
                                    <Image src="/img/paid.png" width={30} height={30} alt="" />
                                    <span className="text-xs">Payment</span>
                                    <div className={styles.checkedIcon}>
                                        <FaRegCheckCircle size={20} />
                                    </div>
                                </div>
                                <div className={statusClass(1)}>
                                    <Image src="/img/bake.png" width={30} height={30} alt="" />
                                    <span className="text-xs">Preparing</span>
                                    <div className={styles.checkedIcon}>
                                        <FaRegCheckCircle size={20} />
                                    </div>
                                </div>
                                <div className={statusClass(2)}>
                                    <Image src="/img/bike.png" width={30} height={30} alt="" />
                                    <span className="text-xs">On the Way</span>
                                    <div className={styles.checkedIcon}>
                                        <FaRegCheckCircle size={20} />
                                    </div>
                                </div>
                                <div className={statusClass(3)}>
                                    <Image src="/img/delivered.png" width={30} height={30} alt="" />
                                    <span className="text-xs">Delivered</span>
                                    <div className={styles.checkedIcon}>
                                        <FaRegCheckCircle size={20} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
                <div className="m-4 md:w-1/3 md:m-8">
                    <div className="bg-gray-900 p-4 md:p-8 text-white">
                        <h2 className="text-2xl pb-4">Cart Total</h2>
                        <div className="flex flex-row">
                            <div className="mb-4 pr-8 flex flex-col">
                                <span>Subtotal:</span>
                                <span>Discount:</span>
                                <span>Total:</span>
                            </div>
                            <div className="flex flex-col">
                                <span>${order.total}</span>
                                <span>$0.00</span>
                                <span className="text-red-300">${order.total}</span>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <button
                                className="px-5 py-3 rounded-sm cursor-not-allowed mb-5 bg-gray-300 text-white font-semibold"
                                disabled={true}
                            >
                                {order.method === 0 ? 'Not Paid - Cash on Delivery' : 'Paid'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps = async ({ params }) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/${params.id}`);
    return {
        props: { order: res.data },
    }
}

export default dynamic(() => Promise.resolve(Order), { ssr: false });