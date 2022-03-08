import type { NextPage } from "next";
import * as React from "react";
import { QueryClient, QueryClientProvider, QueryCache } from "react-query";
import { ChakraProvider, Box, Heading } from "@chakra-ui/react";
import { Toaster, toast } from "react-hot-toast";
import theme from "../theme";
import { Provider as WagmiProvider } from "wagmi";
import { providers } from "ethers";
import Comments from "../components/Comments";

// Provider that will be used when no wallet is connected (aka no signer)
const provider = providers.getDefaultProvider(
  "https://rpc-mumbai.maticvigil.com"
);

const TWITTER_HANDLE = 'Mardeni01';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

// Create a react-query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: () => {
      toast.error(
        "Network Error: Ensure MetaMask is connected to the same network that your contract is deployed to."
      );
    },
  }),
});

const App: NextPage = () => {
  return (
    <WagmiProvider autoConnect provider={provider}>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Box p={8} maxW="600px" minW="320px" m="0 auto">
            <Comments topic="my-blog-post" />
            <Toaster position="bottom-right" />
          </Box>
        </QueryClientProvider>
      </ChakraProvider>
      
      <div className="footer-container" style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
					<a
						className="footer-text"
						href={TWITTER_LINK}
						target="_blank"
						rel="noreferrer"
					>{`Built by @${TWITTER_HANDLE}`}</a>
				</div>
      
    </WagmiProvider>
    
  );
};


export default App;
