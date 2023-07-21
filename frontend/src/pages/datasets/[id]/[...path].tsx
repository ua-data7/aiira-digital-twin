import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

import DatasetDirectory from "@/components/datasets/DatasetDirectory";

import { Box, Stack, Heading, Container } from "@chakra-ui/react";

import axiosInstance from "@/axios";
import { Dataset } from "@/components/datasets/DatasetTypes";

type DatasetDetailProps = {
  id: string;
  path: Array<string>;
};

/**
 * Dataset Detail page
 * Path: /datasets/[id]
 */
export default function DatasetDetail({ id, path }: DatasetDetailProps) {
  const [loadingDataset, setLoadingDataset] = useState(true);
  const [loadingDirectory, setLoadingDirectory] = useState(true);
  const [dataset, setDataset] = useState<Dataset | null>(null);
  const [directory, setDirectory] = useState();
  const [description, setDescription] = useState("");

  useEffect(() => {
    axiosInstance
      .get(`/api/datasets/${id}`)
      .then((res) => {
        setDataset(res.data);
        if (res.data.description_file) return res.data.description_file;
      })
      .then((file) => {
        return fetch(file);
      })
      .then((fileContents) => {
        return fileContents.text();
      })
      .then((fileText) => {
        setDescription(fileText);
        setLoadingDataset(false);
      });

    axiosInstance
      .get(`/api/datasets/${id}/directory?path=/${path.join("/")}`)
      .then((res) => {
        setDirectory(res.data.file_list);
        setLoadingDirectory(false);
      });
  }, []);

  return (
    <>
      <main>
        {!loadingDataset && !loadingDirectory && dataset && directory && (
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
                <Box
                  maxWidth={"90%"}
                  borderWidth="1px"
                  borderRadius={"2xl"}
                  padding={5}
                  bg={"gray.100"}
                >
                  <Stack spacing={{ base: 10, md: 7 }}>
                    <Heading
                      lineHeight={1.1}
                      fontSize={{
                        base: "3xl",
                        sm: "4xl",
                        md: "4xl",
                        lg: "3xl",
                      }}
                      color="brand.800"
                    >
                      {dataset.display_name}
                    </Heading>
                    <ReactMarkdown>{description}</ReactMarkdown>
                  </Stack>
                </Box>
              </Stack>

              <Stack marginTop={12}>
                <DatasetDirectory
                  dataset={dataset}
                  directory={directory}
                  currentPath=""
                />
              </Stack>
            </Container>
          </Box>
        )}
      </main>
    </>
  );
}

// This function gets called at build time
export async function getServerSideProps({
  params,
}: {
  params: { id: string; path: string };
}) {
  return {
    props: {
      id: params.id,
      path: params.path,
    },
  };
}
