import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useRouter } from "next/router";
import { deleteProduct, reset } from "../redux/cartSlice";
import { FaTrash } from "react-icons/fa";
import dynamic from "next/dynamic";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import LoadingScreen from "../components/LoadingScreen";
import { motion } from "framer-motion";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [customer, setCustomer] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const isPaymentDisabled = !customer || !address || !phoneNumber;

  const createOrder = async (data) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, data);
      if (res.status === 201) {
        localStorage.setItem('orderId', res.data._id);

        dispatch(reset());
        router.push(`/orders/${res.data._id}`);
      }
    } catch (err) {
      console.log(err.response.status); // Log the response status code
      console.log(err.response.data);   // Log any additional error data
    }
  };

  const handleCashPayment = () => {
    const orderItems = cart.products.map(product => {
      return {
        item: product.title,
        quantity: product.quantity,
        extraOptions: product.extraOptions.map(option => option.text),
      };
    });

    createOrder({
      customer,
      orderDetails: orderItems,
      address,
      total: cart.total,
      method: 0,
    });
  };

  // const handleStripePayment = async () => {
  //   if (!stripe || !elements) {
  //     return;
  //   }

  //   try {
  //     const { paymentMethod, error } = await stripe.createPaymentMethod({
  //       type: 'card',
  //       card: elements.getElement(CardElement),
  //     });

  //     if (error) {
  //       console.error(error);
  //     } else {
  //       const orderItems = cart.products.map((product) => ({
  //         item: product.title,
  //         quantity: product.quantity,
  //         extraOptions: product.extraOptions.map((option) => option.text),
  //       }));

  //       createOrder({
  //         customer,
  //         orderDetails: orderItems,
  //         address,
  //         total: cart.total,
  //         method: 1,
  //         paymentMethodId: paymentMethod.id,
  //       });
  //     }
  //   } catch (err) {
  //     console.error("Error processing payment:", err);
  //   }
  // };

  return (
    <div className="flex flex-col">
      <div className="w-full">
        <div className="pt-6 pl-3 md:pl-8 text-3xl font-semibold">
          Your Cart
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row">
        <div className="m-4 md:w-2/3 md:m-8">
          {isLoading ? (
            <div className="pt-4">
              <LoadingScreen />
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
            >
              <table className="w-full border-collapse border-2 border-red-500">
                <tbody>
                  <tr className="text-left">
                    <th className="p-4 hidden md:flex"></th>
                    <th>Item</th>
                    <th>Extras</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                  </tr>
                </tbody>
                <tbody>
                  {cart.products.map((product, index) => (
                    <React.Fragment key={product._id}>
                      <tr>
                        <td colSpan="7" className="p-0">
                          <div className="border-b-2 border-red-500"></div>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 hidden md:flex">
                          <Image
                            src={product.img}
                            width={100}
                            height={100}
                            objectFit="cover"
                            alt=""
                          />
                        </td>
                        <td>
                          <span>{product.title}</span>
                        </td>
                        <td>
                          <span>
                            {product.extras.map((extra) => (
                              <span key={extra._id}>{extra.text}, </span>
                            ))}
                          </span>
                        </td>
                        <td>
                          <span className="font-semibold text-red-500">${product.price}</span>
                        </td>
                        <td>
                          <span>{product.quantity}</span>
                        </td>
                        <td>
                          <span className="font-semibold text-red-500">${product.price * product.quantity}</span>
                        </td>
                        <td
                          className="text-red-500 hover:scale-105 hover:text-red-700 transition-all"
                          onClick={() => {
                            dispatch(deleteProduct({ id: product._id }));
                          }}
                        >
                          <FaTrash size={20} />
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </div>
        <div className="m-4 md:w-1/3 md:m-8">
          <div className="bg-gray-900 p-4 md:p-8 text-white">
            <div className="flex">
              <div className="flex flex-col w-full">
                <h2 className="text-2xl pb-4">Your Details</h2>
                <div className="flex flex-col mb-4">
                  <label className="mb-2">Full Name</label>
                  <input
                    placeholder="..."
                    type="text"
                    className="w-full p-2 text-black rounded-sm"
                    onChange={(e) => setCustomer(e.target.value)}
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label className="mb-2">Phone Number</label>
                  <input
                    type="text"
                    placeholder="..."
                    className="w-full p-2 text-black rounded-sm"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label className="mb-2">Address</label>
                  <textarea
                    rows={5}
                    placeholder="..."
                    type="text"
                    className="w-full p-2 text-black rounded-sm"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <h2 className="text-2xl pb-4">Cart Total</h2>
            <div className="flex flex-row">
              <div className="mb-4 pr-8 flex flex-col">
                <span>Subtotal:</span>
                <span>Discount:</span>
                <span>Total:</span>
              </div>
              <div className="flex flex-col">
                <span>${cart.total}</span>
                <span>$0.00</span>
                <span className="text-red-300">${cart.total}</span>
              </div>
            </div>

            <h2 className="text-2xl pb-4">Payment Method</h2>
            <div className="flex flex-col">
              <button
                className={`px-5 py-3 rounded-sm mb-5 ${isPaymentDisabled ? 'cursor-not-allowed bg-gray-300 text-white' : 'cursor-pointer bg-white text-red-500 hover:bg-gray-300 hover:scale-105'} font-semibold`}
                onClick={handleCashPayment}
                disabled={isPaymentDisabled}
              >
                Cash on Delivery
              </button>
              {/* <button
                className={`px-5 py-3 rounded-sm mb-5 ${isPaymentDisabled ? 'cursor-not-allowed bg-gray-300 text-white' : 'cursor-pointer bg-white text-red-500 hover:bg-gray-300 hover:scale-105'} font-semibold relative`}
                onClick={handleStripePayment}
                disabled={isPaymentDisabled}
              >
                <div className="border-b border-gray-500">
                  <CardElement />
                </div>
                <div className="mt-2">
                  Pay with Stripe
                </div>
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default dynamic(() => Promise.resolve(Cart), { ssr: false });