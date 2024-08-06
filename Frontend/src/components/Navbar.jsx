import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Heading,
  Stack,
  Input,
  Flex,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Select,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { AddIcon, SearchIcon } from "@chakra-ui/icons"; 
import { MdSearch } from "react-icons/md";
import axios from 'axios';
 import DownNavbar from "./DownNavbar";
import url from "./vars";

const Navbar = ({ setItems , setLoading }) => {
  const URL = url;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [locationSearch, setLocationSearch] = useState("");
  const [itemSearch, setItemSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterData, setFilterData] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [bgColor, setBgColor] = useState("blue.500");
  const [textColor, setTextColor] = useState("white");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    switch (selectedCity) {
      case "Delhi":
        setBgColor("red.500");
        setTextColor("white");
        break;
      case "Mumbai":
        setBgColor("green.500");
        setTextColor("black");
        break;
      case "Bangalore":
        setBgColor("blue.500");
        setTextColor("white");
        break;
      case "Kolkata":
        setBgColor("yellow.500");
        setTextColor("black");
        break;
      default:
        setBgColor("blue.500");
        setTextColor("white");
        break;
    }
  }, [selectedCity]);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleLocationSearchClick = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${URL}/items/location`, {
        location: selectedCity || locationSearch,
      });
      if (Array.isArray(response.data)) {
        setItems(response.data); 
        setLoading(false);
      } else {
        console.error("Expected an array but got:", response.data);
      }
    } catch (error) {
      console.error("Error fetching items:", error.message);
    }
  };

  const handleItemSearchClick = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${URL}/items/search`, {
        name: itemSearch,
      });
      if (Array.isArray(response.data)) {
        setItems(response.data); 
        setLoading(false);
      } else {
        console.error("Expected an array but got:", response.data);
      }
    } catch (error) {
      console.error("Error fetching items:", error.message);
    }
  };

  const handleFilterChange = (e) => {
    const filter = e.target.value;
    setSelectedFilter(filter);
    handleFilterClick(filter);
  };

  const handleFilterClick = async (filter) => {
    try {
      setLoading(true);
      if(filter === ""){
        const response = await axios.get(`${URL}/items/`, {});
        if (Array.isArray(response.data)) {
          setItems(response.data);
          setLoading(false);
        } else {
          console.error("Expected an array but got:", response.data);
        }
        setFilterData(filter);
        setFilterOpen(false);
        return;
      }
      const response = await axios.post(`${URL}/items/${filter}`, {});
      if (Array.isArray(response.data)) {
        setItems(response.data);
        setLoading(false);
      } else {
        console.error("Expected an array but got:", response.data);
      }
      setFilterData(filter);
      setFilterOpen(false);
    } catch (error) {
      console.error("Error fetching filtered items:", error.message);
    }
  };

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      bg={bgColor}
      color={textColor}
      boxShadow="md"
    >
      <Flex as="nav" p={4} justifyContent="space-between" alignItems="center">
        <Box>
          <Heading
            size="md"
            fontWeight={1000}
            color="white"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            OLX
          </Heading>
        </Box>
        <Box display="flex" alignItems="center" flex="1" ml={6}>
          <Select
            placeholder="Select city"
            size="md"
            mr={4}
            w={"20%"}
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            bg={bgColor}
            color={textColor}
          >
            <option value="Delhi" onClick={handleLocationSearchClick}>Delhi</option>
            <option value="Mumbai" onClick={handleLocationSearchClick}>Mumbai</option>
            <option value="Bangalore" onClick={handleLocationSearchClick}>Bangalore</option>
            <option value="Kolkata" onClick={handleLocationSearchClick}>Kolkata</option>
          </Select>
          <IconButton
            aria-label="Search Item"
            icon={<MdSearch />} 
            backgroundColor="blue.300" // Change to your desired color
            variant="outline"
            colorScheme="blue"
            onClick={handleItemSearchClick}
          />
          <Input
            placeholder="Search Item..."
            size="md"
            w={"20%"}
            value={itemSearch}
            onChange={(e) => setItemSearch(e.target.value)}
            ml={4}
            sx={{
              color: 'white',
              _placeholder: { color: 'white' },
            }}
          />
          <IconButton
            aria-label="Search Item"
            icon={<MdSearch />} 
            backgroundColor="blue.300" // Change to your desired color
            variant="outline"
            colorScheme="blue"
            onClick={handleItemSearchClick}
            marginLeft='20px'
          />
          <Select
            placeholder="Filter"
            size="md"
            ml={4}
            w={"20%"}
            value={selectedFilter}
            onChange={handleFilterChange}
            bg={bgColor}
            color={textColor}
          >
            <option value="">All</option>
            <option value="sold">Sold</option>
            <option value="unSold">Unsold</option>
          </Select>
        </Box>
        <Box>
          <Stack direction="row" spacing={4} align="center">
            <Button
              bg="light blue"
              _hover="none"
              borderRadius="10px"
              p="17px"
              borderTop="5px solid"
              borderLeft="5px solid "
              borderRight="5px solid"
              borderBottom="5px solid"
              className="sellBtn"
              onClick={() => isLoggedIn ? navigate("/addItem") : navigate("/login")}
              color={'white'}
            >
              
              SELL
            </Button>
            {isLoggedIn ? (
              <>
                <Menu
                  isOpen={isOpen}
                  onOpen={() => setIsOpen(true)}
                  onClose={() => setIsOpen(false)}
                >
                  <MenuButton>
                    <Flex align="center">
                      <Avatar size="sm" name={localStorage.getItem("name")} />
                      <IconButton
                        aria-label="Menu"
                        icon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                        variant="link"
                        ml={-2}
                        fontSize="xl"
                        color="gray.600"
                        _hover={{ color: "gray.800" }}
                      />
                    </Flex>
                  </MenuButton>
                  <MenuList>
                    <MenuItem as={Link} to="/">
                      Profile
                    </MenuItem>
                    <MenuItem as={Link} to="/myItems">
                      My-Items
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              </>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </Stack>
        </Box>
      </Flex>
      <DownNavbar setItems={setItems} setLoading={setLoading} />
    </Box>
  );
};

export default Navbar;
