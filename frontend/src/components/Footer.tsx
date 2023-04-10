import {
  Box,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  Flex,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactNode } from "react";

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid columns={{ base: 2, sm: 2, md: 2 }} spacing={8}>
          <Stack align={"flex-start"}>
            <ListHeader>Resources</ListHeader>
            <Link href={"https://aiira.iastate.edu/"}>AIIRA Website</Link>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Acknowledgement</ListHeader>
            <Text>
              AIIRA is supported by the National Science Foundation and United
              States Department of Agriculture.
            </Text>
            <Text>
              National Institute of Food and Agriculture award{" "}
              <Link
                href="https://portal.nifa.usda.gov/web/crisprojectpages/1027030-ai-institute-aiira-ai-institute-for-resilient-agriculture.html"
                target={"_blank"}
              >
                #2021-67021-35329
              </Link>
            </Text>
          </Stack>
        </SimpleGrid>
      </Container>
      <Box py={10}>
        <Flex
          align={"center"}
          _before={{
            content: '""',
            borderBottom: "1px solid",
            borderColor: useColorModeValue("gray.200", "gray.700"),
            flexGrow: 1,
            mr: 8,
          }}
          _after={{
            content: '""',
            borderBottom: "1px solid",
            borderColor: useColorModeValue("gray.200", "gray.700"),
            flexGrow: 1,
            ml: 8,
          }}
        >
          <Image
            src="/logos/aiira-logo.png"
            htmlWidth="60px"
            alt="AIIRA Logo"
          ></Image>
        </Flex>
        <Text pt={6} fontSize={"sm"} textAlign={"center"}>
          © 2023 AI Institute for Resilient Agriculture (AIIRA)
        </Text>
      </Box>
    </Box>
  );
}
