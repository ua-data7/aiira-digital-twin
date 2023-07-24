import { Stack, Text, Icon, IconButton } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

import { FcFolder, FcFile } from "react-icons/fc";
import { DownloadIcon } from "@chakra-ui/icons";

import type { Dataset, DirectoryArray } from "./DatasetTypes";

type DatasetDirectoryProps = {
  dataset: Dataset;
  directoryContents: DirectoryArray;
  currentPath: string;
};

export default function DatasetDirectory({
  dataset,
  directoryContents,
  currentPath
}: DatasetDirectoryProps) {
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Size</Th>
            <Th>Download</Th>
          </Tr>
        </Thead>
        <Tbody>
          {directoryContents.map((d, index) => {
            return (
              <Tr key={index}>
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
                <Td>
                  {d.type === "file" && (
                    <IconButton
                      aria-label="Download"
                      icon={<DownloadIcon />}
                      as="a"
                      href={`https://data.cyverse.org/dav-anon${d.path}`}
                      download
                    />
                  )}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
