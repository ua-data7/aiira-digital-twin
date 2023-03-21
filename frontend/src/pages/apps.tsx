import { useState, useEffect } from "react";

import type { ApplicationArray } from "@/components/software/SoftwareTypes";
import SoftwareList from "@/components/software/SoftwareList";

/**
 * Applications page
 * Path: /apps
 */
export default function Applications() {
  const [loading, setLoading] = useState(true);
  const [apps, setApps] = useState<ApplicationArray | null>(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/applications")
      .then((res) => res.json())
      .then((data) => {
        setApps(data);
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
