import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  IconProps,
  Icon,
} from "@chakra-ui/react";

export default function Welcome() {
  return (
    <Box position={"relative"}>
      <Container
        as={SimpleGrid}
        maxW={"7xl"}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 16 }}
      >
        <Stack spacing={{ base: 10 }} align="flex-start">
          <Heading
            lineHeight={1.1}
            fontSize={{ base: "4xl" }}
            color={"gray.600"}
          >
            AIIRA&apos;s mission is to build <br></br>AI-driven{" "}
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
            The Digital Twin platform makes our datasets, apps, and code
            available to the research community.
          </Heading>

          {/* <Button
            as={"a"}
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bg={"brand.100"}
            href={"/datasets/"}
            _hover={{
              bg: "brand.500",
            }}
          >
            Explore Datasets
          </Button> */}
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
      <Blur
        position={"absolute"}
        top={-10}
        left={-10}
        style={{ filter: "blur(70px)" }}
      />
    </Box>
  );
}

export const Blur = (props: IconProps) => {
  return (
    <Icon
      // width={useBreakpointValue({ base: "100%", md: "40vw", lg: "30vw" })}
      // zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="71" cy="61" r="111" fill="#F56565" />
      <circle cx="244" cy="106" r="139" fill="#ED64A6" />
      <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
    </Icon>
  );
};
