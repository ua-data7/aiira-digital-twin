import DatasetDetail from "@/components/datasets/DatasetDetail";
import { DatasetDetailProps } from "@/components/datasets/DatasetTypes";

import { axiosServer } from "@/axios";

/**
 * Dataset Detail root directory page
 * Path: /datasets/[id]
 */
export default function DatasetRootDirectory(props: DatasetDetailProps) {
  return <DatasetDetail {...props}></DatasetDetail>;
}

// This function gets called at build time
export async function getServerSideProps({
  params,
}: {
  params: { id: string };
}) {
  // fetch dataset by ID
  const dataset = await axiosServer.get(`/api/datasets/${params.id}`);

  // get contents of description file, if present
  let description = "";

  if (dataset.data.description_file) {
    let fileContents = await fetch(dataset.data.description_file);
    description = await fileContents.text();
  }

  let directoryContents = null;
  let currentPath = "";

  if (dataset.data.data_store_path) {
    // get contents of dataset root directory
    const directory = await axiosServer.get(
      `/api/datasets/${params.id}/directory`
    );

    directoryContents = directory.data.file_list;
    currentPath = directory.data.current_path;
  }

  return {
    props: {
      id: params.id,
      dataset: dataset.data,
      directoryContents: directoryContents,
      currentPath: currentPath,
      description: description,
    },
  };
}
