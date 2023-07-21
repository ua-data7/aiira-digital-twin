import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Box, Stack, Heading, Container, Button } from "@chakra-ui/react";

import axiosInstance from "@/axios";

import { Application } from "@/components/software/SoftwareTypes";
type AppDetailProps = {
  id: string;
};

/**
 * App Detail page
 * Path: /apps/[id]
 */
export default function AppDetail({ id }: AppDetailProps) {
  const [loading, setLoading] = useState(true);
  const [app, setApp] = useState<Application | null>(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    axiosInstance
      .get(`/api/applications/${id}`)
      .then((res) => {
        setApp(res.data);
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
        setLoading(false);
      });
  }, []);

  return (
    <>
      <main>
        {!loading && app && (
          <Box position={"relative"}>
            <Container maxW={"7xl"} py={{ base: 10, sm: 20, lg: 16 }}>
              <Stack spacing={{ base: 10, md: 7 }}>
                <Heading
                  lineHeight={1.1}
                  fontSize={{ base: "2xl", sm: "4xl", md: "4xl", lg: "2xl" }}
                  color="brand.800"
                >
                  Apps
                </Heading>

                <Box
                  maxWidth={"90%"}
                  borderWidth="1px"
                  borderRadius={"2xl"}
                  padding={5}
                  bg={"gray.100"}
                >
                  <Stack spacing={{ base: 10, md: 7 }} align="flex-start">
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
                      {app.display_name}
                    </Heading>
                    <ReactMarkdown>{description}</ReactMarkdown>
                    <Button
                      as={"a"}
                      href={app.url}
                      target="_blank"
                      // variant="outline"
                      colorScheme="blue"
                      marginLeft={2}
                    >
                      Launch App
                    </Button>
                  </Stack>
                </Box>
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
  params: { id: string };
}) {
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      id: params.id,
    },
  };
}
