import { useState, useEffect } from "react";

import type { SoftwareArray } from "@/components/software/SoftwareTypes";
import SoftwareList from "@/components/software/SoftwareList";

/**
 * Software page
 * Path: /software
 */
export default function Software() {
  const [loading, setLoading] = useState(true);
  const [software, setSoftware] = useState<SoftwareArray | null>(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/software")
      .then((res) => res.json())
      .then((data) => {
        setSoftware(data);
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
