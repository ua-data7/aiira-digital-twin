import { useState, useEffect } from "react";

import type { SoftwareArray } from "@/components/software/SoftwareTypes";
import SoftwareList from "@/components/software/SoftwareList";

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
    <>
      <main>
        {!loading && software && (
          <SoftwareList softwareList={software} title="Software"></SoftwareList>
        )}
      </main>
    </>
  );
}
