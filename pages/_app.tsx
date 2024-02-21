import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import Navbar from "../components/Navbar";
import "../styles/globals.css";
import { Binance } from "@thirdweb-dev/chains";
import { Box, ChakraProvider, Text, Link as ChakraLink } from "@chakra-ui/react";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "binance";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      activeChain={{
        ...Binance,
        rpc: ["https://bsc-dataseed2.binance.org/"],
      }}
    >
      <ChakraProvider>
        <Navbar />
        <Component {...pageProps} />
      </ChakraProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
