import { useState, useEffect } from "react";

import DatasetList from "@/components/datasets/DatasetList";
import type { DatasetArray } from "@/components/datasets/DatasetTypes";

import Welcome from "@/components/Welcome";
import { Box, Container, Divider } from "@chakra-ui/react";
import axiosInstance from "@/axios";

/**
 * Homepage for application.
 * Path: /
 */
export default function Home() {
  const [loading, setLoading] = useState(true);
  const [datasets, setDatasets] = useState<DatasetArray | null>(null);

  useEffect(() => {
    axiosInstance.get("/api/datasets/")
      .then((res) => {
        setDatasets(res.data);
        setLoading(false);
      });
  }, []);

  return (
    <Box position={"relative"}>
      <Container maxW={"7xl"} py={{ base: 10, sm: 20, lg: 10 }}>
        <Welcome></Welcome>
        <Divider></Divider>
        <Box py={{ base: 10, sm: 20, lg: 10 }} px={{ base: 5, sm: 5, lg: 5 }}>
          {!loading && datasets && (
            <DatasetList datasets={datasets}></DatasetList>
          )}
        </Box>
      </Container>
    </Box>
  );
}
