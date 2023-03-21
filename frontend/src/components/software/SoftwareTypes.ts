export interface Software {
  id: number;
  display_name: string;
  description: string;
  url: string;
}
[];

export interface SoftwareArray extends Array<Software> { }

export interface Application {
  id: number;
  display_name: string;
  description: string;
  url: string;
  application_type: string;
}
[];

export interface ApplicationArray extends Array<Application> { }