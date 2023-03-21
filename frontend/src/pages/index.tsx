import { useState, useEffect } from "react";

import DatasetList from "@/components/datasets/DatasetList";
import type { DatasetArray } from "@/components/datasets/DatasetTypes";

/**
 * Homepage for application.
 * Path: /
 */
export default function Home() {
  const [loading, setLoading] = useState(true);
  const [datasets, setDatasets] = useState<DatasetArray | null>(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/datasets/")
      .then((res) => res.json())
      .then((data) => {
        setDatasets(data);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {!loading && datasets && <DatasetList datasets={datasets}></DatasetList>}
    </>
  );
}
