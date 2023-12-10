import React, { useState, useEffect } from 'react';

import Head from 'next/head';
import Featured from '../components/Featured';
import PizzaList from '../components/PizzaList';
import AddButton from '../components/AddButton';
import Add from '../components/Add';
import About from '../components/About';
import axios from 'axios';

export default function Home({ pizzaList, admin }) {

  const [close, setClose] = useState(true);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const existingOrderId = localStorage.getItem('orderId');
      
      if (!existingOrderId) {
        localStorage.setItem('orderId', '');
      }
    }
  }, []);

  return ( 
    <div>
      <Head>
        <title>Pizza Restaurant</title>
        <meta name="description" content="Best Pizza Shop in Town" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured id="featured" />
      <AddButton setClose={setClose} admin={admin} dashboard={false} />
      <PizzaList pizzaList={pizzaList} id="menu" />
      {!close && <Add setClose={setClose} editData={editData} setEditData={setEditData} />}
      <About id="about" />
    </div>
  )
}

export const getServerSideProps = async (context) => {

  const myCookie = context.req?.cookies || "";
  let admin = false;

  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }

  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
    return {
      props: {
        pizzaList: res.data,
        admin
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return {
      props: {
        pizzaList: [],
      },
    };
  }
};
