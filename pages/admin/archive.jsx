import React from 'react';
import { IoClose } from 'react-icons/io5';
import { format } from 'date-fns';

const OrdersArchiveModal = ({ orders, closeArchive }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full mt-8 bg-gray-300 bg-opacity-80 z-40 flex items-center justify-center">
      <div className="bg-white p-4 h-auto rounded-xl relative w-[90vw]">
        <div
          onClick={closeArchive}
          className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer absolute top-0 right-0 -mt-4 -mr-4 hover:bg-red-700 hover:scale-105"
        >
          <IoClose size={20} />
        </div>
        <h1 className="text-2xl font-bold flex-grow mb-4">Orders</h1>
        <div className="flex">
          <table className="w-full text-xs md:text-base text-left border-2 border-red-500">
            <thead>
              <tr className="font-bold">
                <th>Id</th>
                <th className="hidden md:table-cell">Date & Time</th>
                <th>Customer</th>
                <th>Order Details</th>
                <th className="hidden md:table-cell">Total</th>
                <th className="hidden md:table-cell">Payment</th>
              </tr>
            </thead>
            <tbody>
              {orders && orders.map((order) => (
                <React.Fragment key={order._id}>
                  <tr>
                    <td colSpan="7" className="p-0">
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
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrdersArchiveModal;