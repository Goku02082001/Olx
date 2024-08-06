import React, { useState } from "react";
import {
  Box,
  Grid,
  Image,
  Text,
  Button,
  Flex,
  Stack,
  Spacer,
  Center,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import timeAgo from "./timeAgo";
import url from "./vars";

const Container = ({ items }) => {
  const URL = url;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const navigate = useNavigate();

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(items.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  if (items.length === 0) return (
    <Center h="calc(100vh - 60px)" p={4}>
      <Text fontSize="2xl" fontWeight="bold" color="gray.600">
        No Items Found. Try another search.
      </Text>
    </Center>
  );

  return (
    <Box p={"10%"} pt={"5%"} pb={"5%"} mt={20} bg="gray.100"> {/* Change background color here */}
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)', 
          sm: 'repeat(2, 1fr)',  
          md: 'repeat(3, 1fr)',  
          lg: 'repeat(4, 1fr)', 
        }}
        gap={4}
      >
        {currentItems.map((item) => (
          
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
          >
            <Image
              src={`${URL}/uploads/${item.image}`}
              alt={item.name}
              boxSize="200px"
              objectFit="cover"
            />
                  {console.log(item.image)}

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
                justifyContent="center"
                border="none"
                borderColor="gray.300"
                display="flex"
                alignItems="center"
                mb={2}
              >
                <Text fontWeight={500} fontSize="lg">
                  {item.name}
                </Text>
              </Box>

              <Flex justifyContent="center" alignItems="center">
                <Box fontWeight={500} fontSize={"x-large"}>
                  <Text mt={2}>₹{item.price}</Text>
                </Box>
                <Spacer />
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
      <Flex justifyContent="center" mt={4}>
        <Stack spacing={4} direction="row">
          {pageNumbers.map((number) => (
            <Button
              mt={4}
              key={number}
              onClick={() => paginate(number)}
              variant={number === currentPage ? "solid" : "outline"}
              colorScheme={number === currentPage ? "teal" : "gray"}
              color={number === currentPage ? "white" : "gray.600"}
            >
              {number}
            </Button>
          ))}
        </Stack>
      </Flex>
    </Box>
  );
};

export default Container;
