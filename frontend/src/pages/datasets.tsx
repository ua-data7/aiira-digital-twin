import { useState, useEffect } from "react";
import DatasetList from "@/components/datasets/DatasetList";
import { Container } from "@chakra-ui/react";

import type { DatasetArray } from "@/components/datasets/DatasetTypes";
import { axiosClient } from "@/axios";

/**
 * Datasets page
 * Path: /datasets
 */
export default function Datasets() {
  const [loading, setLoading] = useState(true);
  const [datasets, setDatasets] = useState<DatasetArray | null>(null);

  useEffect(() => {
    axiosClient.get("/api/datasets/").then((res) => {
      setDatasets(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <Container maxW={"7xl"} py={{ base: 10, sm: 20, lg: 16 }}>
      <DatasetList datasets={datasets} loading={loading}></DatasetList>
    </Container>
  );
}
