import { Box, Stack, Heading, Container, SimpleGrid } from "@chakra-ui/react";

import SoftwareCard from "./SoftwareCard";
import type { SoftwareArray, ApplicationArray } from "./SoftwareTypes";

import { Icon } from '@chakra-ui/react'
import { TbCode, TbApps } from "react-icons/tb";

type SoftwareListProps = {
  softwareList: SoftwareArray | ApplicationArray;
  title: string;
};

export default function SoftwareList({
  softwareList,
  title,
}: SoftwareListProps) {
  return (
    <Box position={"relative"}>
      <Container maxW={"7xl"} py={{ base: 10, sm: 20, lg: 16 }}>
        <Stack spacing={{ base: 10, md: 20 }}>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "4xl" }}
          >
            {title} <Icon boxSize={6} as={title === 'Apps' ? TbApps : TbCode} color="brand.300" />
          </Heading>
          <SimpleGrid columns={1} spacing="40px">
            <>
              {softwareList.length &&
                softwareList.map((software) => {
                  return (
                    <SoftwareCard
                      key={software.id}
                      software={software}
                    ></SoftwareCard>
                  );
                })}
            </>
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
}
