import {
  Stack,
  Heading,
  Text,
  Image,
  Button,
  Card,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";

import type { Dataset } from "./DatasetTypes";

type DatasetCardProps = {
  dataset: Dataset;
};

export default function DatasetCard({ dataset }: DatasetCardProps) {
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
    >
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "200px" }}
        src={dataset.display_image}
        alt="dataset image"
      />

      <Stack>
        <CardBody>
          <Heading size="md">{dataset.display_name}</Heading>
          <Text py="2">{dataset.description}</Text>
        </CardBody>

        <CardFooter>
          <Button
            as={"a"}
            href={"/datasets/" + dataset.id}
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bg={"brand.100"}
            _hover={{
              bg: "brand.300",
            }}
          >
            Explore Dataset
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  );
}
