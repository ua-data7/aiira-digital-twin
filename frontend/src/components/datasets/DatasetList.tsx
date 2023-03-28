import { Box, Stack, Heading, Container, SimpleGrid } from "@chakra-ui/react";

import DatasetCard from "./DatasetCard";
import type { DatasetArray } from "./DatasetTypes";

import { Icon } from '@chakra-ui/react'
import { TbPlant } from "react-icons/tb";


type DatasetListProps = {
  datasets: DatasetArray;
};

export default function DatasetList({ datasets }: DatasetListProps) {
  return (
    <Box position={"relative"}>
      <Container maxW={"7xl"} py={{ base: 10, sm: 20, lg: 16 }}>
        <Stack spacing={{ base: 10, md: 20 }}>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "4xl" }}
          >
            Datasets <Icon boxSize={6} as={TbPlant} color="brand.300" />
          </Heading>
          <SimpleGrid columns={1} spacing="40px">
            <>
              {datasets.length &&
                datasets.map((dataset) => {
                  return (
                    <DatasetCard
                      key={dataset.id}
                      dataset={dataset}
                    ></DatasetCard>
                  );
                })}
            </>
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
}
