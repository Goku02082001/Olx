import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Image,
  Text,
  Flex,
  Spacer,
  Center,
} from '@chakra-ui/react';
import Navbar from './Navbar';
import url from './vars';
import timeAgo from './timeAgo';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

const MyItem = () => {
  const [items, setItems] = useState([]);
  const URL = url;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${URL}/items/user`, {}, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (Array.isArray(response.data)) {
          setItems(response.data);
        } else {
          console.error('Expected an array but got:', response.data);
        }
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  return (
    <>
      <Navbar />
      <Box p={"10%"} pt={"5%"} pb={"5%"} mt={20} bg="gray.100"> {/* Change background color here */}
        {items.length === 0 ? (
          <Center h="80vh">
            <Text fontSize="xl" fontWeight={500} color="black" textAlign="center">
              You have not added any items to sell yet.
            </Text>
          </Center>
        ) : (
          <Grid
            templateColumns={{
              base: 'repeat(1, 1fr)', 
              sm: 'repeat(2, 1fr)',  
              md: 'repeat(3, 1fr)',  
              lg: 'repeat(4, 1fr)', 
            }}
            gap={4}
          >
            {items.map((item) => (
              <Box
                key={item._id}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                maxW={300}
                p={2}
                onClick={() => navigate(`/itemPage/${item._id}`)}
                position="relative"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                bg="white"
                borderColor="gray.200"
                _hover={{ cursor: 'pointer' }}
              >
                <Image
                  src={`${URL}/uploads/${item.image}`}
                  alt={item.name}
                  boxSize="200px"
                  objectFit="cover"
                />
                <Box
                  textAlign="center"
                  justifyContent="center"
                  display="flex"
                  alignItems="right"
                  mt={2} 
                  color="gray.600"
                >
                  <Text>{timeAgo(item.createdAt)}</Text>
                </Box>
                <Box p={4} textAlign="center" color="gray.600">
                  <Box
                    textAlign="center"
                    border="none"
                    display="flex"
                    alignItems="center"
                    mb={2}
                  >
                    <Text fontWeight={500} fontSize="lg">
                      {item.name}
                    </Text>
                  </Box>

                  <Flex justifyContent="center" alignItems="center">
                    <Box fontWeight={500} fontSize="x-large">
                      <Text mt={2}>₹{item.price}</Text>
                    </Box>
                    <Spacer />
                    {/* Remove the following block to delete the Sold/Unsold indicator */}
                    {/* <Box
                      border="1px"
                      borderStyle="dotted"
                      bg={item.status === "sold" ? "red.500" : "green.500"}
                      borderColor={
                        item.status === "sold" ? "red.500" : "green.500"
                      }
                      borderRadius="50%"
                      p={0.5}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      transform="rotate(-10deg) translateY(5px)"
                      transformOrigin="center"
                    >
                      <Box
                        bg={"white"}
                        border="1px"
                        borderStyle="dotted"
                        borderColor={
                          item.status === "sold" ? "red.500" : "green.500"
                        }
                        borderRadius="50%"
                        p={2}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Text
                          fontSize={"md"}
                          fontWeight={500}
                          color={item.status === "sold" ? "red.500" : "green.500"}
                          textAlign="center"
                        >
                          {item.status === "sold" ? "Sold" : "Unsold"}
                        </Text>
                      </Box>
                    </Box> */}
                  </Flex>
                </Box>
              </Box>
            ))}
          </Grid>
        )}
      </Box>
      <Footer />
    </>
  );
};

export default MyItem;
