import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const AddButton = ({ setClose, admin, dashboard }) => {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/admin');
  };

  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    // Check if we are on the client side (browser)
    if (typeof window !== 'undefined') {
      // Access localStorage on the client side
      const existingOrderId = localStorage.getItem('orderId');
      setOrderId(existingOrderId);
    }
  }, []); // Empty dependency array ensures this effect runs only once after the initial render

  const viewLastOrder = () => {
    if (orderId !== "") {
      router.push(`/orders/${orderId}`);
    } else {
      console.error("Last order does not exist!");
    }
  };

  return (
    <div className="flex text-xs md:text-base justify-between flex-row gap-4">
      {!dashboard ? (
        <div
          className="text-white bg-red-500 p-2 rounded-md hover:scale-105 hover:bg-red-700 inline-block m-4 transition-all"
          onClick={handleLogin}
        >
          {admin ? 'Admin Dashboard' : 'Admin Log In'}
        </div>
      ) : null}

      {admin ? (
        <div
          className="text-white bg-red-500 p-2 rounded-md hover:scale-105 hover:bg-red-700 inline-block m-4 transition-all"
          onClick={() => setClose(false)}
        >
          Add New Menu Item
        </div>
      ) : null}

      {orderId !== "" && !dashboard ? (
        <div
          className="text-white bg-red-500 p-2 rounded-md hover:scale-105 hover:bg-red-700 inline-block m-4 transition-all"
          onClick={viewLastOrder}
        >
          View Your Last Order
        </div>
      ) : null}
    </div>
  );
};

export default AddButton;
