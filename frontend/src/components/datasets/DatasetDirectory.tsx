import { Box, Stack, Heading, Container, Text } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { FcFolder, FcFile } from "react-icons/fc";

import type { Dataset, DirectoryArray } from "./DatasetTypes";

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

type DatasetDirectoryProps = {
  dataset: Dataset;
  directory: DirectoryArray;
};

export default function DatasetDirectory({
  dataset,
  directory,
}: DatasetDirectoryProps) {
  return (
    <Box position={"relative"}>
      <Container maxW={"7xl"} py={{ base: 10, sm: 20, lg: 16 }}>
        <Stack spacing={{ base: 10, md: 7 }}>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: "2xl", sm: "4xl", md: "4xl", lg: "2xl" }}
            color="brand.800"
          >
            Datasets
          </Heading>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: "3xl", sm: "4xl", md: "4xl", lg: "3xl" }}
            color="brand.800"
          >
            {dataset.display_name}
          </Heading>
          <Box>{dataset.description}</Box>
        </Stack>

        <Stack marginTop={12}>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Size</Th>
                </Tr>
              </Thead>
              <Tbody>
                {directory.map((d) => {
                  return (
                    <Tr>
                      <Td>
                        {d.type === "folder" ? (
                          <Stack direction="row" spacing={3}>
                            <Icon as={FcFolder} boxSize={5} />
                            <Text
                              as="a"
                              href={`/datasets/${dataset.id}/${d.path}`}
                              color="brand.100"
                            >
                              <b>{d.name}</b>
                            </Text>
                          </Stack>
                        ) : (
                          <Stack direction="row" spacing={3}>
                            <Icon as={FcFile} boxSize={5} />
                            <Text>{d.name}</Text>
                          </Stack>
                        )}
                      </Td>
                      <Td>{d.size ? d.size : "----"}</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Stack>
      </Container>
    </Box>
  );
}
