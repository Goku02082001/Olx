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

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const URL = url;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${URL}/user/login`, {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("name", response.data.user);
      localStorage.setItem("userId", response.data.userId);
      setEmail("");
      setPassword("");

      toast({
        title: "Login successful!",
        description: "You have been successfully logged in.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      navigate("/");
    } catch (error) {
      toast({
        title: "Login failed.",
        description: error.response?.data?.error || "There was an issue logging in.",
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
      bg="gray.800" // Change background color
    >
      <IconButton
        position="absolute"
        top="10px"
        left="10px"
        icon={<IoExit />}
        aria-label="Go Back"
        colorScheme="teal"
        onClick={() => navigate("/")}
        variant="outline"
        fontSize="20px"
      />
      <Box
        maxW="sm"
        width="100%"
        p={6}
        borderWidth={1}
        borderRadius="md"
        boxShadow="md"
        bg="gray.700" // Change box background color
      >
        <form onSubmit={handleLogin}>
          <Flex
            alignItems="center"
            justifyContent="center"
            bg="gray.600" // Change header background color
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
             Log In
            </Text>
          </Flex>
          <FormControl mb={4}>
            <FormLabel htmlFor="email" color="white">Email</FormLabel>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              bg="gray.600"
              color="white"
              borderColor="gray.500"
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
              bg="gray.600"
              color="white"
              borderColor="gray.500"
            />
          </FormControl>
          <Button
            colorScheme="teal"
            type="submit"
            isLoading={loading}
            loadingText="Logging in..."
          >
            Login
          </Button>
        </form>
        <Text mt={4} color="white">
          Don't have an account?{" "}
          <Link color="teal.300" onClick={() => navigate("/register")}>
            Sign Up
          </Link>
        </Text>
      </Box>
    </Box>
  );
};

export default LoginPage;
