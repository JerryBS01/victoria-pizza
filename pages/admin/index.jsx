import React, { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import Add from '../../components/add';
import AddButton from '../../components/addButton';
import { format } from 'date-fns';
import OrdersArchiveModal from './archive';

const Index = ({ orders, products }) => {

    const [pizzaList, setPizzaList] = useState(products);
    const [orderList, setOrderList] = useState(orders);
    const status = ["Preparing", "On the way", "Delivered"];

    const [close, setClose] = useState(true);
    const [editedProduct, setEditedProduct] = useState(null);

    const handleEdit = (product) => {
        setEditedProduct(product);
        setClose(false);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(
                `${process.env.NEXT_PUBLIC_API_URL}/api/products/` + id
            );
            setPizzaList(pizzaList.filter((pizza) => pizza._id !== id));
        } catch (err) {
            console.log(err);
        }
    };

    const handleStatus = async (id) => {

        const item = orderList.filter(order => order._id === id)[0];
        const currentStatus = item.status;

        try {
            const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/` + id, { status: currentStatus + 1 });
            setOrderList([res.data, ...orderList.filter((order) => order._id !== id)]);
        } catch (err) {
            console.log(err);
        }
    }

    const [archiveOrders, setArchiveOrders] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const handleViewArchive = () => {
        const archivedOrders = orderList.filter((order) => order.status === 3);
        setArchiveOrders(archivedOrders);
        setShowModal(true);
    };

    const closeArchive = () => {
        setShowModal(false);
    };

    return (
        <div className="flex flex-col my-8 mx-4 md:mx-8 gap-4">
            <div className="flex-1">
                <div className="flex flex-row items-center">
                    <h1 className="text-2xl font-bold flex-grow">Products</h1>
                    <div className="text-xs md:text-base">
                        <AddButton setClose={setClose} admin={true} dashboard={true} />
                    </div>
                </div>
                <table className="w-full text-xs md:text-base text-left border-2 border-red-500">
                    <thead>
                        <tr className="font-bold">
                            <th>Image</th>
                            <th>Item</th>
                            <th>Extra(s)</th>
                            <th>Price(s)</th>
                            <th>Action(s)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pizzaList.map((product) => (
                            <React.Fragment key={product._id}>
                                <tr>
                                    <td colSpan="5" className="p-0">
                                        <div className="border-b-2 border-red-500"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Image src={product.img} alt="" width={50} height={50} />
                                    </td>
                                    <td>{product.title}</td>
                                    <td>
                                        {product.extraOptions.map((option, index) => (
                                            <React.Fragment key={index}>
                                                <span>{option.text}: ${option.price}</span>
                                                {index !== product.extraOptions.length - 1 && ', '}
                                            </React.Fragment>
                                        ))}
                                    </td>
                                    <td>
                                        {product.prices.map((price, index) => (
                                            <React.Fragment key={index}>
                                                ${price}
                                                {index !== product.prices.length - 1 && ', '}
                                            </React.Fragment>
                                        ))}
                                    </td>
                                    <td>
                                        <div className="m-1">
                                            <button type="button" className="p-1 md:px-2 text-black bg-gray-300 hover:scale-105 hover:bg-gray-500 hover:text-white rounded-sm transition-all cursor-pointer" onClick={() => handleEdit(product)}>Edit</button>
                                        </div>
                                        <div className="m-1">
                                            <button type="button" className="p-1 md:px-2 text-white bg-red-500 hover:scale-105 hover:bg-red-700 rounded-sm transition-all cursor-pointer" onClick={() => handleDelete(product._id)}>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>

            {!close && <Add setClose={setClose} editData={editedProduct} setEditData={setEditedProduct} />}

            <div className="flex-1">
                <div className="flex flex-row items-center">
                    <h1 className="text-2xl font-bold flex-grow">Orders</h1>
                    <div className="text-xs md:text-base text-white bg-red-500 p-2 rounded-md hover:scale-105 hover:bg-red-700 inline-block m-4">
                        <button onClick={handleViewArchive}>View Archive</button>
                    </div>

                    {showModal && <OrdersArchiveModal orders={archiveOrders} closeArchive={closeArchive} />}
                </div>
                <table className="w-full text-xs md:text-base text-left border-2 border-red-500">
                    <thead>
                        <tr className="font-bold">
                            <th>Id</th>
                            <th className="hidden md:table-cell">Date & Time</th>
                            <th>Customer</th>
                            <th>Order Details</th>
                            <th className="hidden md:table-cell">Total</th>
                            <th className="hidden md:table-cell">Payment</th>
                            <th>Status</th>
                            <th>Action(s)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderList
                            .filter((order) => order.status < 3)
                            .map((order) => (
                                <React.Fragment key={order._id}>
                                    <tr>
                                        <td colSpan="8" className="p-0">
                                            <div className="border-b-2 border-red-500"></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>{order._id.slice(0, 5)}...</td>
                                        <td className="hidden md:table-cell">
                                            {format(new Date(order.createdAt), 'MMMM dd, yyyy -  HH:mm')}
                                        </td>
                                        <td>{order.customer}</td>
                                        <td>
                                            {order.orderDetails.map((item, index) => (
                                                <span key={index}>
                                                    <strong>{item.item}</strong>, Qty: <strong>{item.quantity}</strong>, Extras:{' '}
                                                    <strong>{item.extraOptions.join(', ')}</strong>
                                                    {index !== order.orderDetails.length - 1 && <br />}
                                                </span>
                                            ))}
                                        </td>
                                        <td className="hidden md:table-cell">${order.total}</td>
                                        <td className="hidden md:table-cell">
                                            {order.method === 0 ? <span>Cash</span> : <span>Stripe</span>}
                                        </td>
                                        <td>{status[order.status]}</td>
                                        <td>
                                            <div className="m-1">
                                                <button
                                                    type="button"
                                                    className={`p-1 md:px-2 text-black ${order.status === 3 ? 'bg-blue-300' : 'bg-gray-300'
                                                        } hover:scale-105 hover:bg-gray-500 hover:text-white rounded-sm transition-all cursor-pointer`}
                                                    onClick={() => handleStatus(order._id)}
                                                >
                                                    {order.status === 2 ? 'Send to Archive' : 'Next Stage'}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export const getServerSideProps = async (context) => {

    const myCookie = context.req?.cookies || ""

    if (myCookie.token !== process.env.TOKEN) {
        return {
            redirect: {
                destination: "/admin/login",
                permanent: false,
            }
        }
    }

    const productRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/products`)
    const orderRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`)

    return {
        props: {
            products: productRes.data,
            orders: orderRes.data,
        }
    }
}

export default Index;