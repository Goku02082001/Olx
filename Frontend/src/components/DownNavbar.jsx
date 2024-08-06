import React, { useState } from "react";
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  Grid,
  Text,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import axios from 'axios';
import url from './vars'; // Ensure this path is correct

const categories = [
  { title: "Cars", items: ["Cars"] },
  {
    title: "Properties",
    items: [
      "For Sale: Houses & Apartments",
      "For Rent: Houses & Apartments",
      "Lands & Plots",
      "For Rent: Shops & Offices",
      "For Sale: Shops & Offices",
      "PG & Guest Houses",
    ],
  },
  { title: "Mobiles", items: ["Mobile Phones", "Accessories", "Tablets"] },
  {
    title: "Bikes",
    items: ["Motorcycles", "Scooters", "Spare Parts", "Bicycles"],
  },
  {
    title: "Electronics & Appliances",
    items: [
      "TVs, Video - Audio",
      "Kitchen & Other Appliances",
      "Computers & Laptops",
      "Cameras & Lenses",
      "Games & Entertainment",
      "Fridges",
      "Computer Accessories",
      "Hard Disks, Printers & Monitors",
      "ACs",
      "Washing Machines",
    ],
  },
  {
    title: "Commercial Vehicles & Spares",
    items: ["Commercial & Other Vehicles", "Spare Parts"],
  },
  {
    title: "Furniture",
    items: [
      "Sofa & Dining",
      "Beds & Wardrobes",
      "Home Decor & Garden",
      "Kids Furniture",
      "Other Household Items",
    ],
  },
  { title: "Fashion", items: ["Men", "Women", "Kids"] },
  {
    title: "Books, Sports & Hobbies",
    items: [
      "Books",
      "Gym & Fitness",
      "Musical Instruments",
      "Sports Equipment",
      "Other Hobbies",
    ],
  },
  {
    title: "Jobs",
    items: [
      "Data entry & Back office",
      "Sales & Marketing",
      "BPO & Telecaller",
      "Driver",
      "Office Assistant",
      "Delivery & Collection",
      "Teacher",
      "Cook",
      "Receptionist & Front office",
      "Operator & Technician",
      "IT Engineer & Developer",
      "Hotel & Travel Executive",
      "Accountant",
      "Designer",
      "Other Jobs",
    ],
  },
  {
    title: "Pets",
    items: [
      "Fishes & Aquarium",
      "Pet Food & Accessories",
      "Dogs",
      "Other Pets",
    ],
  },
  {
    title: "Services",
    items: [
      "Education & Classes",
      "Tours & Travel",
      "Electronics Repair & Services",
      "Health & Beauty",
      "Home Renovation & Repair",
      "Cleaning & Pest Control",
      "Legal & Documentation Services",
      "Packers & Movers",
      "Other Services",
    ],
  },
];

const DownNavbar = ({ setItems, setLoading }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCategoryClick = async (category) => {
    try {
      setLoading(true);
      const response = await axios.post(`${url}/items/category`, {
        category
      });

      if (Array.isArray(response.data)) {
        setItems(response.data);
      } else {
        console.error("Expected an array but got:", response.data);
      }
    } catch (error) {
      console.error("Error fetching items by category:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box fontSize={"sm"} mb={2}>
      <Flex justifyContent={"space-around"}>
        <Menu>
          {/* <MenuButton fontWeight={700} onClick={handleToggleMenu}>
            All Categories
            {isMenuOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </MenuButton> */}
          <MenuList w="100%" maxHeight="400px" overflowY="auto">
            <Grid templateColumns="repeat(5, 1fr)" gap={4} p={4}>
              {categories.map((category, index) => (
                <Box key={index}>
                  <MenuItem
                    as={Button}
                    variant="link"
                    fontWeight="bold"
                    py={2}
                    px={4}
                    bg="gray.100"
                    _hover={{ bg: "gray.200" }}
                    onClick={() => handleCategoryClick(category.title)}
                  >
                    {category.title}
                  </MenuItem>
                  {category.items.map((item, itemIndex) => (
                    <MenuItem
                      key={itemIndex}
                      as="a"
                      href="#"
                      px={4}
                      onClick={() => handleCategoryClick(item)}
                    >
                      {item}
                    </MenuItem>
                  ))}
                  {index < categories.length - 1 && (
                    <Box borderBottom="1px" borderColor="gray.200" my={2} />
                  )}
                </Box>
              ))}
            </Grid>
          </MenuList>
        </Menu>
        <Text _hover={{ color: "teal.500" }} fontWeight={400} onClick={() => handleCategoryClick("Cars")}>
          Car
        </Text>
        <Text _hover={{ color: "teal.500" }} fontWeight={400} onClick={() => handleCategoryClick("Motorcycles")}>
          Bike&Scooters
        </Text>
        <Text _hover={{ color: "teal.500" }} fontWeight={400} onClick={() => handleCategoryClick("Mobile Phones")}>
          Mobile Phones
        </Text>
        <Text _hover={{ color: "teal.500" }} fontWeight={400} onClick={() => handleCategoryClick("Houses & Apartments")}>
           Houses & Apartments
        </Text>
        <Text _hover={{ color: "teal.500" }} fontWeight={400} onClick={() => handleCategoryClick("Commercial & Other Vehicles")}>
          Laptop&computers
        </Text>
      </Flex>
    </Box>
  );
};

export default DownNavbar;
