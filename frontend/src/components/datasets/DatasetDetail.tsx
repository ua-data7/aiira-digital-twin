import ReactMarkdown from "react-markdown";
import { Box, Container, Heading, Spinner, Stack } from "@chakra-ui/react";

import DatasetDirectory from "@/components/datasets/DatasetDirectory";
import { DatasetDetailProps } from "@/components/datasets/DatasetTypes";

/**
 * Dataset Detail page
 * Path: /datasets/[id]
 */
export default function DatasetDetail({
  id,
  dataset,
  directoryContents,
  currentPath,
  description,
}: DatasetDetailProps) {
  return (
    <>
      <Box position={"relative"}>
        <Container maxW={"7xl"} minH={"md"} py={{ base: 10, sm: 20, lg: 16 }}>
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

                {dataset.description_file ? (
                  <ReactMarkdown>{description}</ReactMarkdown>
                ) : (
                  <Box>{dataset.description}</Box>
                )}
              </Stack>
            </Box>
          </Stack>

          <Stack marginTop={12}>
            <DatasetDirectory
              dataset={dataset}
              directoryContents={directoryContents}
              currentPath={currentPath}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
}
