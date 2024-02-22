import type { NextPage } from "next";
import { Box, Container, Flex, Heading, SimpleGrid, Text, Link as ChakraLink } from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import StakeToken from "../components/StakeToken";
import RewardToken from "../components/RewardToken";
import Stake from "../components/Stake";

const Home: NextPage = () => {
  const address = useAddress();

  if(!address) {
    return (
      <Box 
        width="100vw"
        height="100vh"
        backgroundSize="cover"
        backgroundImage={`url(${"/bg-capo-blue.png"})`}
        backgroundRepeat="no-repeat"
        backgroundColor="#0f1318" // fallback background color
      >
        <Container maxW={"1200px"}>
          <Flex h={"50vh"} justifyContent={"center"} alignItems={"center"}>
            <Heading color="white">Please Connect a BSC Wallet</Heading>
          </Flex>
        </Container>
      </Box>
    )
  }
  
  return (
    <Box 
      width="100vw"
      height="100vh"
      backgroundSize="cover"
      backgroundImage={`url(${"/bg-capo-blue.png"})`}
      backgroundRepeat="no-repeat"
      backgroundColor="#0f1318" // fallback background color
    >
      <Container maxW={"1200px"}>
        <SimpleGrid columns={2} spacing={4} mt={10}>
          <StakeToken />
          <RewardToken />
        </SimpleGrid>
        <Stake />
      </Container>
      
    </Box>
    
  );
};

export default Home;
