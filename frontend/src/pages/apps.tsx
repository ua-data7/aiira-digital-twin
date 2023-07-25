import { useState, useEffect } from "react";
import SoftwareList from "@/components/software/SoftwareList";
import { Container } from "@chakra-ui/react";

import type { ApplicationArray } from "@/components/software/SoftwareTypes";
import axiosInstance from "@/axios";

/**
 * Applications page
 * Path: /apps
 */
export default function Applications() {
  const [loading, setLoading] = useState(true);
  const [apps, setApps] = useState<ApplicationArray | null>(null);

  useEffect(() => {
    axiosInstance.get("/api/applications").then((res) => {
      setApps(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <Container maxW={"7xl"} py={{ base: 10, sm: 20, lg: 16 }}>
      <SoftwareList
        softwareList={apps}
        title="Apps"
        loading={loading}
      ></SoftwareList>
    </Container>
  );
}
