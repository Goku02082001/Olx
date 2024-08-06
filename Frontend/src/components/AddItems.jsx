import React, { useState } from "react";
import axios from "axios";
import { Button, Input, FormControl, FormLabel, Box, Text, Select, useToast, Textarea, Grid } from "@chakra-ui/react";
import Navbar from "./Navbar";
import url from "./vars";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const AddItems = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const URL = url;
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("image", image);
    formData.append("location", location);
    formData.append("categories", category);
    formData.append("description", description);

    try {
      const token = localStorage.getItem('token'); 
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}` 
        }
      };
      await axios.post(`${URL}/items`, formData, config);

      toast({
        title: "Item added.",
        description: "The item has been added successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
  
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.error('Error adding item:', error.response ? error.response.data : error.message);
      setMessage("Please fill in correct details");
    
      toast({
        title: "Error.",
        description: `An error occurred: ${error.response ? error.response.data.error : error.message}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Navbar />
      <Box maxW="sm" mx="auto" mt="120px" p={4} borderWidth={1} borderRadius="md" boxShadow="md">
        <form onSubmit={handleSubmit}>
          <FormControl id="name" mb={4}>
            <FormLabel>Item Name</FormLabel>
            <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </FormControl>
          <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4} mb={4}>
            <FormControl id="price">
              <FormLabel>Price</FormLabel>
              <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
            </FormControl>
            <FormControl id="location">
              <FormLabel>Location</FormLabel>
              <Input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
            </FormControl>
          </Grid>
          <FormControl id="category" mb={4}>
            <FormLabel>Category</FormLabel>
            <Select placeholder="Select category" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="Cars">Cars</option>
              <option value="Motorcycles">Motorcycles</option>
              <option value="Mobile Phones">Mobile Phones</option>
              <option value="Houses & Apartments">Houses & Apartments</option>
              <option value="Scooters">Scooters</option>
              <option value="Commercial & Other Vehicles">Commercial & Other Vehicles</option>
            </Select>
          </FormControl>
          <FormControl id="description" mb={4}>
            <FormLabel>Description</FormLabel>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter item description" />
          </FormControl>
          <FormControl id="image" mb={4}>
            <FormLabel>Image</FormLabel>
            <Input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </FormControl>
          <Button type="submit" color={"white"} bg={"green.600"} _hover={{bg:"green.800"}}>Add Item</Button>
        </form>
        {message && <Text mt={4}>{message}</Text>}
      </Box>
      <Footer/>
    </>
  );
};

export default AddItems;
