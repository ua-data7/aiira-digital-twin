import { useState, useEffect } from "react";
import SoftwareList from "@/components/software/SoftwareList";
import { Container } from "@chakra-ui/react";

import type { SoftwareArray } from "@/components/software/SoftwareTypes";

import axios from "@/axios";

/**
 * Software page
 * Path: /software
 */
export default function Software() {
  const [loading, setLoading] = useState(true);
  const [software, setSoftware] = useState<SoftwareArray | null>(null);

  useEffect(() => {
    axios.get("/api/software").then((res) => {
      setSoftware(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <Container maxW={"7xl"} py={{ base: 10, sm: 20, lg: 16 }}>
        <SoftwareList softwareList={software} title="Software" loading={loading}></SoftwareList>
    </Container>
  );
}
