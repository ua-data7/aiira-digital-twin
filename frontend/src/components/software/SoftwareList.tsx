import {
  Box,
  Center,
  Container,
  Heading,
  Icon,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";

import SoftwareCard from "./SoftwareCard";
import type { SoftwareArray, ApplicationArray } from "./SoftwareTypes";

import { TbCode, TbApps } from "react-icons/tb";

type SoftwareListProps = {
  softwareList: SoftwareArray | ApplicationArray | null;
  title: string;
  loading: boolean;
};

export default function SoftwareList({
  softwareList,
  title,
  loading,
}: SoftwareListProps) {
  return (
    <Stack spacing={{ base: 10, md: 10 }}>
      <Heading
        lineHeight={1.1}
        fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "4xl" }}
      >
        {title}{" "}
        <Icon
          boxSize={6}
          as={title === "Apps" ? TbApps : TbCode}
          color="brand.300"
        />
      </Heading>
      <SimpleGrid columns={1} spacing="40px">
        {loading ? (
          <Center padding={10}>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Center>
        ) : (
          <>
            {softwareList && softwareList.length ? (
              softwareList.map((software) => {
                return (
                  <SoftwareCard
                    key={software.id}
                    software={software}
                    softwareType={title === "Apps" ? "app" : "software"}
                  ></SoftwareCard>
                );
              })
            ) : (
              <Text>No {title} found.</Text>
            )}
          </>
        )}
      </SimpleGrid>
    </Stack>
  );
}
