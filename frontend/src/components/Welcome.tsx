import { Container, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";

export default function Welcome() {
  return (
    <Container
      as={SimpleGrid}
      maxW={"7xl"}
      columns={{ base: 1, md: 2 }}
      spacing={{ base: 10, lg: 32 }}
      py={{ base: 10, sm: 20, lg: 16 }}
    >
      <Stack spacing={{ base: 10 }} align="flex-start">
        <Heading lineHeight={1.1} fontSize={{ base: "4xl" }} color={"gray.600"}>
          AIIRA&apos;s mission is to build AI-driven{" "}
          <Text
            as={"span"}
            bgGradient="linear(to-r, brand.500,brand.400)"
            bgClip="text"
          >
            predictive digital twins
          </Text>{" "}
          for modeling plants.
        </Heading>
        <Heading fontSize={{ base: "xl" }} color={"gray.500"}>
          The Digital Twin platform makes our datasets, apps, and code available
          to the research community.
        </Heading>
      </Stack>
      <Stack
        bg={"gray.50"}
        rounded={"xl"}
        p={{ base: 4, sm: 6, md: 8 }}
        spacing={{ base: 8 }}
        maxW={{ lg: "lg" }}
      >
        <Stack spacing={4}>
          <Heading
            color={"gray.800"}
            lineHeight={1.1}
            fontSize={{ base: "2xl" }}
          >
            Featured App
          </Heading>
        </Stack>
      </Stack>
    </Container>
  );
}
