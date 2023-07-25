import {
  Box,
  Center,
  Container,
  Heading,
  Icon,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";

import DatasetCard from "./DatasetCard";
import type { DatasetArray } from "./DatasetTypes";

import { TbPlant } from "react-icons/tb";

type DatasetListProps = {
  datasets: DatasetArray | null;
  loading: boolean;
};

export default function DatasetList({ datasets, loading }: DatasetListProps) {
  return (
    <Stack spacing={{ base: 10, md: 10 }}>
      <Heading
        lineHeight={1.1}
        fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "4xl" }}
      >
        Datasets <Icon boxSize={6} as={TbPlant} color="brand.300" />
      </Heading>
      <SimpleGrid columns={1} spacing="40px">
        {loading ? (
          <Center padding={10}>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Center>
        ) : (
          <>
            {datasets && datasets.length ? (
              datasets.map((dataset) => {
                return (
                  <DatasetCard key={dataset.id} dataset={dataset}></DatasetCard>
                );
              })
            ) : (
              <Text>No datasets.</Text>
            )}
          </>
        )}
      </SimpleGrid>
    </Stack>
  );
}
