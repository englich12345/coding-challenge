export interface ITableProps {
  tableHead: ITableHeadProps[];
  tableData: Array<Array<object>>;
  handleSort: (sortField: string, order: string) => void;
  noFoundData: string;
}

export interface ITableHeadProps {
  sortField: string;
  label: string;
  active: string;
}

export interface ISortHead {
  sortField: string;
  label: string;
  active: string;
  handleSort: (sortField: string, order: string) => void;
}
