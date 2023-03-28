import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }: AppProps) {
  const theme = extendTheme({
    colors: {
      brand: {
        100: "#0f5877", // aiira-btn-blue
        200: "#1f4555", // aiira-dark-blue
        300: "#2e9f48", // aiira-green-dark
        400: "#5dbc51", // aiira-green-light
        500: "#2581c4", // aiira-light-blue
        600: "#dee2e6", // aiira-light-grey
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
