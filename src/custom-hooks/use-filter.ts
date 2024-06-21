import { ChangeEvent, useCallback, useState } from 'react';
import { DEFAULT_PAGE, DEFAULT_ROWS_PER_PAGE, DEFAULT_SORT_DIRECTION } from '@/constants/pagination';

export interface IFilterProperties {
  page: number;
  rowsPerPage: number;
  sortBy: string;
  sortDir: number;
  searchBy: string;
  status: string;
  fromDate: string;
  toDate: string;
  [key: string]: any;
}
export interface SortOptions {
  sortBy: string;
  sortOrder: number;
}
export type HandleSortChangeCallback = (sort: SortOptions) => void;

export const useFilter: any = () => {
  const [filterData, setFilterData] = useState<IFilterProperties>({
    page: DEFAULT_PAGE,
    rowsPerPage: DEFAULT_ROWS_PER_PAGE,
    sortBy: '',
    sortDir: DEFAULT_SORT_DIRECTION,
    searchBy: '',
    status: '',
    fromDate: '',
    toDate: '',
  });

  const handleSortChange = useCallback((sort: SortOptions): void => {
    setFilterData((prevState: IFilterProperties) => ({
      ...prevState,
      sortBy: sort.sortBy,
      sortDir: sort.sortOrder,
    }));
  }, []);

  const handlePageChange = useCallback((_event: any, page: number): void => {
    setFilterData((prevState: IFilterProperties) => ({
      ...prevState,
      page,
    }));
  }, []);

  const handleRowsPerPageChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
    setFilterData((prevState: IFilterProperties) => ({
      ...prevState,
      page: DEFAULT_PAGE,
      rowsPerPage: parseInt(event.target.value, DEFAULT_ROWS_PER_PAGE),
    }));
  }, []);

  const handleSearch = (event: any) => {
    setFilterData((prevState: IFilterProperties) => ({
      ...prevState,
      page: DEFAULT_PAGE,
      searchBy: event.target.value,
    }));
  };
  const handleDateChange = (name: string, value: string) => {
    setFilterData((prevState: IFilterProperties) => ({
      ...prevState,
      page: DEFAULT_PAGE,
      [name]: value,
    }));
  };
  const handleChange = (event: any) => {
    setFilterData((prevState: IFilterProperties) => ({
      ...prevState,
      page: DEFAULT_PAGE,
      [event.target.name]: event.target.value,
    }));
  };

  const handleReset = () => {
    setFilterData(() => ({
      page: DEFAULT_PAGE,
      rowsPerPage: DEFAULT_ROWS_PER_PAGE,
      sortBy: '',
      sortDir: DEFAULT_SORT_DIRECTION,
      searchBy: '',
      status: '',
      fromDate: '',
      toDate: '',
    }));
  };

  return {
    handleSortChange,
    handlePageChange,
    handleRowsPerPageChange,
    handleSearch,
    handleDateChange,
    handleChange,
    handleReset,
    filterData,
  };
};
