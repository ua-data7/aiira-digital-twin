import ReactMarkdown from "react-markdown";
import { Box, Stack, Heading, Container, Button } from "@chakra-ui/react";
import { SoftwareDetailProps } from "@/components/software/SoftwareTypes";

/**
 * App Detail page
 * Path: /apps/[id]
 */
export default function SoftwareDetail({
  id,
  software,
  description,
  title,
}: SoftwareDetailProps) {
  return (
    <Box position={"relative"}>
      <Container maxW={"7xl"} py={{ base: 10, sm: 20, lg: 16 }}>
        <Stack spacing={{ base: 10, md: 7 }}>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: "2xl", sm: "4xl", md: "4xl", lg: "2xl" }}
            color="brand.800"
          >
            {title}
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
                {software.display_name}
              </Heading>
              {software.description_file ? (
                <ReactMarkdown>{description}</ReactMarkdown>
              ) : (
                <Box>{software.description}</Box>
              )}
              <Button
                as={"a"}
                href={software.url}
                target="_blank"
                // variant="outline"
                colorScheme="blue"
                marginLeft={2}
              >
                {title == "Apps" ? "Launch App" : "Download Software"}
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
