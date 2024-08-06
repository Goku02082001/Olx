import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import {
  Box,
  Text,
  Image,
  Flex,
  Grid,
  Center,
  Textarea,
  Button,
  useToast,
} from "@chakra-ui/react";
import url from "./vars";
import timeAgo from "./timeAgo";
import axios from "axios";
import Footer from "./Footer";

const ItemPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]); // For storing chat messages
  const [isFavorite, setIsFavorite] = useState(false);
  const URL = url;
  const toast = useToast();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`${URL}/items/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setItem(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchItem();
  }, [id]);

  const handleSendMessage = () => {
    if (message.trim()) {
      // Add new message to the chat messages
      setChatMessages([...chatMessages, { text: message, time: new Date().toLocaleTimeString() }]);
      setMessage("");
      toast({
        title: "Message sent.",
        description: "Your message has been sent successfully.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error",
        description: "Message cannot be empty.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const toggleFavorite = async () => {
    try {
      const response = await axios.post(`${URL}/items/favourites`, { itemId: id }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setIsFavorite((prev) => !prev);
      toast({
        title: "Success",
        description: response.data.message,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error updating favorites:', error);
      toast({
        title: "Error",
        description: "Please Login to add favorites",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  if (error)
    return (
      <>
        <Navbar />
        <Center h="calc(100vh - 60px)" p={4}>
          <Text color="red.500">Error: {error}</Text>
        </Center>
      </>
    );

  return (
    <>
      <Navbar />
      <Box p={4} mt={150} ml={"10%"} mr={"10%"}>
        {item ? (
          <Grid templateColumns={{ base: "1fr", md: "1fr" }} gap={6} justifyContent="center">
            <Box textAlign="center" maxW={500} mx="auto">
              <Image
                src={`${URL}/uploads/${item.image}`}
                alt={item.name}
                borderRadius="md"
                objectFit="cover"
                maxW="100%"
                maxH={500}
                mx="auto"
              />
              <Box
                borderWidth={1}
                borderRadius="md"
                borderColor="gray.300"
                p={4}
                mt={4}
                bg="gray.50"
                mx="auto"
                maxW={400}
              >
                <Text fontSize="l" color="grey" textAlign="center">
                  Description:{" "}
                  <span style={{ color: "teal.500" }}>
                    {item.description}
                  </span>
                </Text>
              </Box>
            </Box>
            <Box
              borderWidth={1}
              borderRadius="md"
              borderColor="gray.300"
              p={10}
              position="relative"
              width="500px"  // Fixed width of the car details box
              mx="auto"
            >
              {/* <IconButton
                icon={isFavorite ? <AiFillHeart color="red" /> : <AiOutlineHeart />}
                onClick={toggleFavorite}
                position="absolute"
                top={2}
                right={2}
                aria-label="Toggle Favorite"
                variant="outline"
                borderColor="black"
                boxSize={10} 
                fontSize="3xl" 
              /> */}
              <Flex direction="column" gap={4} textAlign="center">
                <Text fontSize="3xl" fontWeight="bold">
                  ₹{item.price}
                </Text>

                <Text fontSize="xl" mt={4} color={"grey"}>
                  Product:{" "}
                  <span style={{ fontWeight: "bold", color: "black" }}>
                    {item.name}
                  </span>
                </Text>
                <Text fontSize="xl" mt={4} color={"grey"}>
                  Type:{" "}
                  <span style={{ fontWeight: "bold", color: "black" }}>
                    {item.categories}
                  </span>
                </Text>

                <Flex direction="column" align="center" mb={4}>
                  <Box>
                    <Text fontSize="xl" mt={4} color={"grey"}>
                      Location:{" "}
                      <span style={{ fontWeight: "bold", color: "black" }}>
                        {item.location}
                      </span>
                    </Text>
                  </Box>
                  <Box>
                    <Text mt={5} color={"grey"}>{timeAgo(item.createdAt)}</Text>
                  </Box>
                </Flex>
              </Flex>
            </Box>
          </Grid>
        ) : (
          <Text>No item found</Text>
        )}

        {/* Chat Section */}
        <Box mt={8} borderWidth={1} borderRadius="md" borderColor="gray.300" p={4} bg="gray.50" maxW="500px" mx="auto">
          <Text fontSize="2xl" mb={4}>Chat with us</Text>
          <Box maxHeight={300} overflowY="auto" mb={4}>
            {chatMessages.map((msg, index) => (
              <Box key={index} mb={2} p={2} borderBottom="1px" borderColor="gray.200">
                <Text>{msg.text}</Text>
                <Text fontSize="sm" color="gray.500">{msg.time}</Text>
              </Box>
            ))}
          </Box>
          <Flex direction="column" gap={4}>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              size="lg"
              mb={4}
            />
            <Button colorScheme="teal" onClick={handleSendMessage}>
              Send
            </Button>
          </Flex>
        </Box>

      </Box>
      <Footer />
    </>
  );
};

export default ItemPage;
