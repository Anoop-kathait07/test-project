import {
  Box,
  Card,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import CustomTableHead from "@/components/atomic/molecules/table-head";
import { PAGE_NO } from "@/constants/pagination";
import { SortDirection } from "@/types/common";
import { getComparator, stableSort } from "@/utils/sorting";

const SwapList = (props: any) => {
  const { heading, listingData, handleSortChange } = props;
  const [order, setOrder] = useState<SortDirection.Asc | SortDirection.Dsc>(
    SortDirection.Asc
  );
  const [orderBy, setOrderBy] = useState<string>("");
  const [fieldType, setFieldType] = useState<string>("");

  const handleRequestSort = (
    _event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    property: string,
    fieldType: string
  ): void => {
    const isAsc = orderBy === property && order === SortDirection.Asc;
    setFieldType(fieldType);
    setOrder(isAsc ? SortDirection.Dsc : SortDirection.Asc);
    setOrderBy(property);
  };

  function formatTimeDifference(timestamp: any) {
    const now: any = new Date();
    const past: any = new Date(timestamp);
    const diffInSeconds = Math.floor((now - past) / 1000);
  
    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    }
  
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    }
  
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    }
  
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  }
  

  const renderList = (listData: any[]) => {
    return (
      <>
        {stableSort(listData, getComparator(order, orderBy, fieldType)).map(
          (item: any, index: number) => {
            return (
              <TableRow key={index + PAGE_NO}>
                <TableCell>{index + PAGE_NO}</TableCell>
                <TableCell>
                  {item?.token_in_symbol} /{" "}
                  {item?.token_out_symbol}
                </TableCell>
                <TableCell>{item?.txHash.slice(0, 4)+ "......" + item?.txHash.slice(38, 42)}</TableCell>
                <TableCell>{item?.token_in_symbol}</TableCell>
                <TableCell>{item?.token_out_symbol}</TableCell>
                <TableCell>{item?.token_in_amount / 10 ** item?.token_in_decimal}</TableCell>
                <TableCell>{item?.token_out_amount / 10 ** item?.token_out_decimal}</TableCell>
                <TableCell>{formatTimeDifference(item?.timestamp)}</TableCell>
              </TableRow>
            );
          }
        )}
      </>
    );
  };

  return (
    <Box component="main">
      <Stack spacing={3}>
        <Card>
          <Stack spacing={2}>
            <TableContainer>
              <Table>
                <CustomTableHead
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  headCells={heading}
                  rowCount={listingData.length}
                  setSortData={handleSortChange}
                />
                <TableBody>
                  {!listingData.length ? (
                    <TableRow>
                      <TableCell colSpan={9} align="center">
                        No Pair Created
                      </TableCell>
                    </TableRow>
                  ) : (
                    renderList(listingData)
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </Card>
      </Stack>
    </Box>
  );
};

export default SwapList;
