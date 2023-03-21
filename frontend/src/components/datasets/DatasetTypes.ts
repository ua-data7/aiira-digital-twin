export interface Dataset {
  id: number;
  display_name: string;
  description: string;
  data_store_path: string;
  permission: string;
}
[];

export interface DatasetArray extends Array<Dataset> { }