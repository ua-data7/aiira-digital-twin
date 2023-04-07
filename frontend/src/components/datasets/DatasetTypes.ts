export interface Dataset {
  id: number;
  display_name: string;
  description: string;
  data_store_path: string;
  permission: string;
  display_image: string;
}
[];

export interface DatasetArray extends Array<Dataset> { }

export interface Directory {
  id: string;
  last_updated: string;
  name: string;
  path: string;
  type: string;
  size: string;
};

export interface DirectoryArray extends Array<Directory> { }
