export interface Software {
  id: number;
  display_name: string;
  description: string;
  url: string;
  display_image: string;
  description_file: string;
}
[];

export interface SoftwareArray extends Array<Software> { }

export interface Application {
  id: number;
  display_name: string;
  description: string;
  url: string;
  application_type: string;
  display_image: string;
  description_file: string;
}
[];

export interface ApplicationArray extends Array<Application> { }