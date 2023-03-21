import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }: AppProps) {
  const theme = extendTheme({
    colors: {
      brand: {
        100: "#0f5877",
        800: "#153e75",
        700: "#2a69ac",
      },
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}
