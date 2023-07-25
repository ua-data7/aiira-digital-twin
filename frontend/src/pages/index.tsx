import { useState, useEffect } from "react";

import DatasetList from "@/components/datasets/DatasetList";
import type { DatasetArray } from "@/components/datasets/DatasetTypes";
import { FeaturedContent } from "@/components/FeaturedTypes";

import Welcome from "@/components/Welcome";
import { Box, Container } from "@chakra-ui/react";
import { axiosClient, axiosServer } from "@/axios";

type HomeProps = {
  featured: FeaturedContent | null;
};
/**
 * Homepage for application.
 * Path: /
 */
export default function Home({ featured }: HomeProps) {
  const [loading, setLoading] = useState(true);
  const [datasets, setDatasets] = useState<DatasetArray | null>(null);

  useEffect(() => {
    axiosClient.get("/api/datasets/").then((res) => {
      setDatasets(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <Box position={"relative"}>
      <Container maxW={"7xl"} py={{ base: 10, sm: 20, lg: 10 }}>
        <Welcome featured={featured}></Welcome>
        <Box py={{ base: 10, sm: 20, lg: 10 }} px={{ base: 5, sm: 5, lg: 5 }}>
          <DatasetList datasets={datasets} loading={loading}></DatasetList>
        </Box>
      </Container>
    </Box>
  );
}

export async function getServerSideProps() {
  // fetch featured item
  const res = await axiosServer.get("/api/featured");

  let featured = null;

  if (res.data.length) {
    featured = res.data[0];
  }

  return {
    props: {
      featured: featured,
    },
  };
}
