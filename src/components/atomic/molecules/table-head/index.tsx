import { TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import React, { ReactNode, memo, useState } from 'react';
import { SortDirection, SortOrder, StatusType } from '@/types/common';
import { ITabelHeader, ITableHead } from '@/types/table';

const CustomTableHead = (props: ITableHead) => {
  const { orderBy, onRequestSort, headCells, setSortData } = props;
  const handleSortDirection = (data: string) => {
    let sortType = sortDirection === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc;
    setSortDirection(sortType);
    setSortData({ sortOrder: sortDirection, sortBy: data });
  };
  const createSortHandler = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    property: string,
    isField: string,
  ) => {
    onRequestSort(event, property, isField);
    handleSortDirection(property)
  };
  const [sortDirection, setSortDirection] = useState<number>(SortOrder.Asc);

  

  return (
    <TableHead>
      <TableRow>
        {headCells?.map((headCell: ITabelHeader): ReactNode => {
          return !headCell.disableSortBy ? (
            <TableCell key={headCell.id}>
              <TableSortLabel
                style={{ width: headCell.width }}
                active={orderBy === headCell.id}
                direction={
                  sortDirection === StatusType.Active ? SortDirection.Dsc : SortDirection.Asc
                }
                onClick={ (event) => createSortHandler(event, headCell.id, headCell.isField)}
              >
                {headCell.label}
              </TableSortLabel>
            </TableCell>
          ) : (
            <TableCell key={headCell.id}>{headCell.label}</TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};

export default memo(CustomTableHead);