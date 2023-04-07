import { useState, useEffect } from "react";
import DatasetList from "@/components/datasets/DatasetList";
import { Box, Stack, Heading, Container, SimpleGrid } from "@chakra-ui/react";

import type { DatasetArray } from "@/components/datasets/DatasetTypes";

/**
 * Datasets page
 * Path: /datasets
 */
export default function Datasets() {
  const [loading, setLoading] = useState(true);
  const [datasets, setDatasets] = useState<DatasetArray | null>(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/datasets/")
      .then((res) => res.json())
      .then((data) => {
        setDatasets(data);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <main>
        {!loading && datasets && (
          <Box position={"relative"}>
            <Container maxW={"7xl"} py={{ base: 10, sm: 20, lg: 16 }}>
              <DatasetList datasets={datasets}></DatasetList>
            </Container>
          </Box>
        )}
      </main>
    </>
  );
}