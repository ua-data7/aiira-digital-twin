import { axiosServer } from "@/axios";
import SoftwareDetail from "@/components/software/SoftwareDetail";
import { SoftwareDetailProps } from "@/components/software/SoftwareTypes";

/**
 * Software Detail page
 * Path: /software/[id]
 */
export default function SoftwareDetailPage(props: SoftwareDetailProps) {
  return <SoftwareDetail {...props} title="Software"></SoftwareDetail>;
}

// This function gets called at build time
export async function getServerSideProps({
  params,
}: {
  params: { id: string };
}) {
  // fetch software by ID
  const res = await axiosServer.get(`/api/software/${params.id}`);

  // get contents of description file, if present
  let description = "";

  if (res.data.description_file) {
    let fileContents = await fetch(res.data.description_file);
    description = await fileContents.text();
  }

  return {
    props: {
      id: params.id,
      software: res.data,
      description: description,
    },
  };
}
