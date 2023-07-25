import DatasetDetail from "@/components/datasets/DatasetDetail";
import { DatasetDetailProps } from "@/components/datasets/DatasetTypes";

import { axiosServer } from "@/axios";

/**
 * Dataset Detail subdirectory page
 * Path: /datasets/[id]/[path]
 */
export default function DatasetSubDirectory(props: DatasetDetailProps) {
  return <DatasetDetail {...props}></DatasetDetail>;
}

// This function gets called at build time
export async function getServerSideProps({
  params,
}: {
  params: { id: string; path: Array<string> };
}) {
  // fetch dataset by ID
  const dataset = await axiosServer.get(`/api/datasets/${params.id}`);

  // get contents of description file, if present
  let description = "";

  if (dataset.data.description_file) {
    let fileContents = await fetch(dataset.data.description_file);
    description = await fileContents.text();
  }

  // get contents of dataset root directory
  const directory = await axiosServer.get(
    `/api/datasets/${params.id}/directory?path=/${params.path.join("/")}`
  );

  return {
    props: {
      id: params.id,
      dataset: dataset.data,
      directoryContents: directory.data.file_list,
      currentPath: directory.data.current_path,
      description: description,
    },
  };
}
