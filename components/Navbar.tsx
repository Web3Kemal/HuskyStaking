import {
  Container,
  Flex,
  Heading,
  Box,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ConnectWallet } from "@thirdweb-dev/react";

export default function Navbar() {
  const direction = useBreakpointValue({ base: "column", sm: "row" }) as
    | "column"
    | "row"
    | undefined;

  return (
    <Box bgGradient="linear(to-l, rgba(250,215,22,255), rgb(17, 112, 219))">
      <Container maxW={"1200px"} py={4}>
        <Flex
          direction={direction}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Heading color="white" mb={{ base: 4, sm: 0 }}>
            Official $BLUE Staking DApp. Stake $BLUE and earn $CAPO.
          </Heading>
          <ConnectWallet />
        </Flex>
      </Container>
    </Box>
  );
}
