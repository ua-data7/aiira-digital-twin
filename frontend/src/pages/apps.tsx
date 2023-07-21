import { useState, useEffect } from "react";

import type { ApplicationArray } from "@/components/software/SoftwareTypes";
import SoftwareList from "@/components/software/SoftwareList";

import axios from "@/axios";

/**
 * Applications page
 * Path: /apps
 */
export default function Applications() {
  const [loading, setLoading] = useState(true);
  const [apps, setApps] = useState<ApplicationArray | null>(null);

  useEffect(() => {
    axios.get("/api/applications").then((res) => {
      setApps(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <main>
        {!loading && apps && (
          <SoftwareList softwareList={apps} title="Apps"></SoftwareList>
        )}
      </main>
    </>
  );
}
