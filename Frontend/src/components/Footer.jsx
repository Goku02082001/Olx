import React from 'react';
import { Box, Container, Grid, Text, Link, Stack, VStack, HStack, Divider } from '@chakra-ui/react';
import { FaLocationArrow, FaInfoCircle, FaBlog, FaSitemap } from 'react-icons/fa';

const Footer = () => {
  return (
    <Box bg="gray.100" color="black" py={10} mt={20}>
      <Container maxW="container.xl">
        <Grid templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }} gap={8} mb={8}>
          <VStack align="start" spacing={4}>
            <Text fontSize="lg" fontWeight="bold" color="black">POPULAR LOCATIONS</Text>
            <Link href="#" _hover={{ textDecor: 'underline' }}>Kolkata</Link>
            <Link href="#" _hover={{ textDecor: 'underline' }}>Mumbai</Link>
            <Link href="#" _hover={{ textDecor: 'underline' }}>Chennai</Link>
            <Link href="#" _hover={{ textDecor: 'underline' }}>Pune</Link>
          </VStack>

          <VStack align="start" spacing={4}>
            <Text fontSize="lg" fontWeight="bold" color="black">TRENDING LOCATIONS</Text>
            <Link href="#" _hover={{ textDecor: 'underline' }}>Bhubaneshwar</Link>
            <Link href="#" _hover={{ textDecor: 'underline' }}>Hyderabad</Link>
            <Link href="#" _hover={{ textDecor: 'underline' }}>Chandigarh</Link>
            <Link href="#" _hover={{ textDecor: 'underline' }}>Nashik</Link>
          </VStack>

          <VStack align="start" spacing={4}>
            <Text fontSize="lg" fontWeight="bold" color="black">ABOUT US</Text>
            <Link href="#" _hover={{ textDecor: 'underline' }}>About OLX Group</Link>
            <Link href="#" _hover={{ textDecor: 'underline' }}>Careers</Link>
            <Link href="#" _hover={{ textDecor: 'underline' }}>Contact Us</Link>
          </VStack>

          <VStack align="start" spacing={4}>
            <Text fontSize="lg" fontWeight="bold" color="black">HELP & INFORMATION</Text>
            <Link href="#" _hover={{ textDecor: 'underline' }}>Waah Jobs</Link>
            <Link href="#" _hover={{ textDecor: 'underline' }}>OLX</Link>
            <Link href="#" _hover={{ textDecor: 'underline' }}>Help</Link>
            <Link href="#" _hover={{ textDecor: 'underline' }}>Sitemap</Link>
            <Link href="#" _hover={{ textDecor: 'underline' }}>Legal & Privacy Information</Link>
            <Link href="#" _hover={{ textDecor: 'underline' }}>Blog</Link>
          </VStack>
        </Grid>

        <Divider borderColor="gray.300" mb={8} />

        <HStack justify="space-between" align="center">
          <Text fontSize="sm">© {new Date().getFullYear()} OLX Clone. All rights reserved.</Text>
          <HStack spacing={4}>
            <Link href="#" _hover={{ textDecor: 'underline' }}><FaLocationArrow /> Locations</Link>
            <Link href="#" _hover={{ textDecor: 'underline' }}><FaInfoCircle /> About Us</Link>
            <Link href="#" _hover={{ textDecor: 'underline' }}><FaBlog /> Blog</Link>
            <Link href="#" _hover={{ textDecor: 'underline' }}><FaSitemap /> Sitemap</Link>
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
};

export default Footer;
