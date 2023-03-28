import { useState, useEffect } from "react";

import DatasetDirectory from "@/components/datasets/DatasetDirectory";

type DatasetDetailProps = {
  id: string;
};

/**
 * Dataset Detail page
 * Path: /datasets/[id]
 */
export default function DatasetDetail({ id }: DatasetDetailProps) {
  const [loadingDataset, setLoadingDataset] = useState(true);
  const [loadingDirectory, setLoadingDirectory] = useState(true);
  const [dataset, setDataset] = useState();
  const [directory, setDirectory] = useState();

  useEffect(() => {
    fetch(`http://localhost:8000/api/datasets/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setDataset(data);
        console.log(data);
        setLoadingDataset(false);
      });

    fetch(`http://localhost:8000/api/datasets/${id}/directory`)
      .then((res) => res.json())
      .then((data) => {
        setDirectory(data.file_list);
        console.log(data.file_list);
        setLoadingDirectory(false);
      });
  }, []);

  return (
    <>
      <main>
        {!loadingDataset && !loadingDirectory && dataset && directory && (
          <DatasetDirectory dataset={dataset} directory={directory} />
        )}
      </main>
    </>
  );
}

// This function gets called at build time
export async function getServerSideProps({
  params,
}: {
  params: { id: string };
}) {
  // Call an external API endpoint to get posts
  // const res = await axios.get(`http://127.0.0.1:8000/api/datasets/${params.id}`)
  // const dataset = res.data

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      id: params.id,
    },
  };
}
