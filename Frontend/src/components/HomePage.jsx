import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import url from "./vars";
import Footer from "./Footer";
import Container from "./Container";
import axios from 'axios';
const HomePage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const URL = url;

  // Fetch initial items or perform other setup tasks
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${URL}/items`);
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [URL]);

  return (
    <>
    
      <Navbar setItems={setItems}  setLoading={setLoading}/>
      <Container items={items} loading={loading} />
      <Footer />
    </>
  );
};

export default HomePage;
