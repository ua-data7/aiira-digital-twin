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

import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@chakra-ui/react";

import { FcFolder, FcFile } from "react-icons/fc";
import { DownloadIcon } from "@chakra-ui/icons";

import { usePathname } from 'next/navigation'

import type { Dataset, DirectoryArray } from "./DatasetTypes";

type DatasetDirectoryProps = {
  dataset: Dataset;
  directoryContents: DirectoryArray;
  currentPath: string;
};

type BreadcrumbMenuProps = {
  currentPath: string;
  rootPath: string;
  nextPath: string;
  datasetId: number;
};

function BreadcrumbMenu({ currentPath, rootPath, nextPath, datasetId }: BreadcrumbMenuProps) {
  
  // root path of dataset (top-level folder)
  const rootPathSplit = rootPath.split("/");

  // current path of dataset (which subfolder is user looking at)
  const currentPathSplit = currentPath.split("/");

  // full Next URL path
  const nextPathSplit = nextPath.split("/")

  console.log(rootPathSplit)
  console.log(currentPathSplit)
  console.log(nextPathSplit)
  
  // get starting index of dataset root path within full iplant path.
  // we only want to show Breadcrumb menu starting at dataset root folder, not include 'iplant/home/...)
  const rootStartIndex = rootPathSplit.length - 1;
  const menuItems = currentPathSplit.slice(rootStartIndex);

  const datasetPath = nextPathSplit.slice(0, nextPathSplit.length - menuItems.length);
  

  console.log(nextPath)

  function getHref(index:number) {

    const pathItems = menuItems.slice(0, index + 1)

    console.log(datasetPath)
    console.log(pathItems)
    
    const fullPath = datasetPath.join("/") + "/" + pathItems.join("/")
    
    return fullPath

    // http://149.165.153.95:3005/datasets/1/iplant/home/shared/commons_repo/curated/mosaic_raamp2/Codebase

    // http://149.165.153.95:3005/datasets/1/iplant/home/shared/mosaic_raamp2/Codebase
    
  }

  // TODO: add href links for breadcrumbs

  return (
    <Breadcrumb fontWeight='medium' fontSize='sm'>
      {menuItems.map((item, index) => {
        return (
          <BreadcrumbItem key={index} isCurrentPage={index === menuItems.length - 1}>
            <BreadcrumbLink href={getHref(index)} fontWeight={index === menuItems.length - 1 && 'bold'}>{item}</BreadcrumbLink>
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
}

export default function DatasetDirectory({
  dataset,
  directoryContents,
  currentPath,
}: DatasetDirectoryProps) {

  const nextPath = usePathname()

  return (
    <Stack spacing={6}>
      <Box>
        <BreadcrumbMenu
          currentPath={currentPath}
          rootPath={dataset.data_store_path}
          nextPath={nextPath}
          datasetId={dataset.id}
        ></BreadcrumbMenu>
      </Box>
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
    </Stack>
  );
}
