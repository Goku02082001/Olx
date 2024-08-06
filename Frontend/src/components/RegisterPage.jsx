import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  Box,
  Text,
  Link,
  useToast,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { IoExit } from "react-icons/io5"; // Import exit icon
import url from "./vars";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const URL = url;

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${URL}/user/register`, {
        name,
        email,
        password,
      });

      // Show success toast
      toast({
        title: "Registration successful!",
        description: response.data.msg,
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      setName("");
      setEmail("");
      setPassword("");
      navigate("/login");
    } catch (error) {
      // Show error toast
      toast({
        title: "Registration failed.",
        description: error.response?.data?.error || "There was an issue with registration.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      position="relative"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
      bg="gray.900" // Change background color
    >
      <IconButton
        position="absolute"
        top="10px"
        left="10px"
        icon={<IoExit />} // Use exit arrow icon
        aria-label="Go Back"
        colorScheme="teal"
        onClick={() => navigate("/")}
        variant="outline"
        fontSize="20px"
        color="white"
      />
      <Box
        maxW="sm"
        width="100%"
        p={6}
        borderWidth={1}
        borderRadius="md"
        boxShadow="md"
        bg="gray.800" // Change box background color
      >
        <form onSubmit={handleRegister}>
          <Flex
            alignItems="center"
            justifyContent="center"
            bg="gray.700" // Change header background color
            p={4}
            borderRadius="md"
            mb={4}
          >
            <Text 
              fontSize="3xl" 
              fontWeight="extrabold" 
              textAlign="center" 
              color="white" // Change text color
            >
             
              Sign Up 
            </Text>
          </Flex>
          <FormControl mb={4}>
            <FormLabel htmlFor="name" color="white">Name</FormLabel>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              bg="gray.700"
              color="white"
              borderColor="gray.600"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel htmlFor="email" color="white">Email</FormLabel>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              bg="gray.700"
              color="white"
              borderColor="gray.600"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel htmlFor="password" color="white">Password</FormLabel>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              bg="gray.700"
              color="white"
              borderColor="gray.600"
            />
          </FormControl>
          <Button
            colorScheme="teal"
            type="submit"
            isLoading={loading}
            loadingText="Registering..."
          >
            Register
          </Button>
        </form>
        <Text mt={4} color="white">
          Already have an account?{" "}
          <Link color="teal.300" onClick={() => navigate("/login")}>
            Login
          </Link>
        </Text>
      </Box>
    </Box>
  );
};

export default RegisterPage;
