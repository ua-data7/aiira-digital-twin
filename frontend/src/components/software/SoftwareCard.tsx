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

import type { Software } from "./SoftwareTypes";

type SoftwareCardProps = {
  software: Software;
  softwareType: string;
};

export default function SoftwareCard({
  software,
  softwareType,
}: SoftwareCardProps) {
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
    >
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "200px" }}
        src={software.display_image}
        alt="software image"
      />

      <Stack>
        <CardBody>
          <Heading size="md">{software.display_name}</Heading>

          <Text py="2">{software.description}</Text>
        </CardBody>

        <CardFooter>
          <Button
            as={"a"}
            variant="solid"
            colorScheme="blue"
            href={
              softwareType === "app"
                ? "/apps/" + software.id
                : "/software/" + software.id
            }
          >
            Learn more
          </Button>

          <Button
            as={"a"}
            href={software.url}
            target="_blank"
            variant="outline"
            colorScheme="blue"
            marginLeft={2}
          >
            {softwareType === "app" ? "Launch" : "Download"}
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  );
}
