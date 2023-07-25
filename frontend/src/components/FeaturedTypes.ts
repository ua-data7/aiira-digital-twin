import { Application, Software } from "@/components/software/SoftwareTypes";
import { Dataset } from "@/components/datasets/DatasetTypes";

export type FeaturedContent = {
  title: string;
  description: string;
  content_object: Dataset | Application | Software;
};
