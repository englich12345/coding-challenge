export interface IApplication {
  application_date: string;
  birth_date: string;
  email: string;
  id: number;
  name: string;
  position_applied: string;
  status: string;
  year_of_experience: number;
}

export interface IApplicationView {
  sortVal: string;
  sortOrder: string;
  search: string;
  changeParams: (obj: { [key: string]: string }) => void;
  tableData: Array<Array<object>>;
  positionOptions: string[];
  statusOptions: string[];
  position: string;
  status: string;
}

export interface IUrlParams {
  search?: string;
  sort?: string;
  position?: string;
  status?: string;
}

export interface IUseUrl {
  urlParams: IUrlParams;
  changeParams: (obj: { [key: string]: string }) => void;
}
