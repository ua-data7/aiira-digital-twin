import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Center,
  Container,
  Divider,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";

import { FeaturedContent } from "@/components/FeaturedTypes";

type WelcomeProps = {
  featured: FeaturedContent | null;
};

export default function Welcome({ featured }: WelcomeProps) {
  console.log(featured);
  return (
    <Container
      as={SimpleGrid}
      maxW={"7xl"}
      columns={{ base: 1, md: 2 }}
      spacing={{ base: 10, md: 10, lg: 20 }}
      py={{ base: 10, sm: 10, lg: 10 }}
    >
      <Center>
        <Stack spacing={{ base: 10 }} align="flex-start">
          <Heading
            lineHeight={1.1}
            fontSize={{ base: "4xl" }}
            color={"gray.600"}
          >
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
            The Digital Twin platform makes our datasets, apps, and code
            available to the research community.
          </Heading>
        </Stack>
      </Center>

      {featured && (
        <Card maxW="md" padding={2}>
          <CardBody>
            {featured.content_object.display_image && (
              <Center>
                <Image
                  src={
                    process.env.NEXT_PUBLIC_API_URL +
                    featured.content_object.display_image
                  }
                  alt="featured content image"
                  borderRadius="lg"
                  maxH={{ base: "100%", sm: "200px" }}
                />
              </Center>
            )}
            <Stack mt="6" spacing="3">
              <Heading size="md">{featured.title}</Heading>
              <Text>{featured.description}</Text>
            </Stack>
          </CardBody>
          <CardFooter>
            <ButtonGroup spacing="2">
              <Button
                variant="solid"
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"brand.100"}
                _hover={{
                  bg: "brand.300",
                }}
              >
                Learn More
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
      )}
    </Container>
  );
}
