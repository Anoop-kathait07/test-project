export interface ITabelHeader {
    id: string;
    numeric: boolean;
    disablePadding: boolean;
    label: string;
    isField: string;
  
    width?: string;
    disableSortBy?: boolean;
  }
  
  export type TSortData = {
    sortOrder: number;
    sortBy: string;
  };
  
  export interface ITableHead {
    order: 'asc' | 'desc';
    orderBy: string | boolean | undefined;
    onRequestSort: (
      event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
      property: string,
      isField: string
    ) => void;
    headCells: ITabelHeader[];
    rowCount: number;
    setSortData: (values: TSortData) => void;
  }