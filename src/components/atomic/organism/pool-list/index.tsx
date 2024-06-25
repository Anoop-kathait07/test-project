import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomTableHead from "@/components/atomic/molecules/table-head";
import { PAGE_NO } from "@/constants/pagination";
import { rootReducersState } from "@/store/reducers";
import { SortDirection } from "@/types/common";
import { getComparator, stableSort } from "@/utils/sorting";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import useGetPoolShare from "@/custom-hooks/use-get-poolshare";
import { useRouter } from "next/navigation";
import {
  setIsFirstTokenPrice,
  setIsSecondTokenPrice,
  setPoolAmountIn,
  setPoolAmountOut,
  setTokenIn,
  setTokenOut,
} from "@/store/slices/pool";
import useTokenPrice from "@/custom-hooks/use-token-per-price";
import {
  setRemoveLiquidityTokenIn,
  setRemoveLiquidityTokenOut,
} from "@/store/slices/remove-liquidity";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PoolList = (props: any) => {
  const { heading, listingData, handleSortChange } = props;
  const [order, setOrder] = useState<SortDirection.Asc | SortDirection.Dsc>(
    SortDirection.Asc
  );
  const [orderBy, setOrderBy] = useState<string>("");
  const [fieldType, setFieldType] = useState<string>("");
  const dispatch = useDispatch();
  const [currentProduct, setCurrentProduct] = useState<string | null>(null);
  const [poolShareData, setPoolShareData] = useState<any>(null);

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

  const handleProductToggle = useCallback((productId: string): void => {
    setCurrentProduct((prevProductId) => {
      if (prevProductId === productId) {
        return null;
      }
      return productId;
    });
  }, []);

  const { handlePoolShare } = useGetPoolShare();
  const { handleTokenPrice } = useTokenPrice();
  const address = useSelector(
    (state: rootReducersState) => state.metaMask.account
  );
  const router = useRouter();

  const renderList = (listData: any[]) => {
    return (
      <>
        {stableSort(listData, getComparator(order, orderBy, fieldType)).map(
          (item: any, index: number) => {
            const isCurrent = item._id === currentProduct;
            return (
              <>
                <TableRow key={index + PAGE_NO}>
                  <TableCell>{index + PAGE_NO}</TableCell>
                  <TableCell>
                    {item.tokenIn[0].tokenSymbol} /{" "}
                    {item.tokenOut[0].tokenSymbol}
                  </TableCell>
                  <TableCell
                    padding="checkbox"
                    sx={{
                      ...(isCurrent && {
                        position: "relative",
                        "&:after": {
                          position: "absolute",
                          content: '" "',
                          top: 0,
                          left: 0,
                          width: 3,
                          height: "calc(100% + 1px)",
                        },
                      }),
                    }}
                    width="25%"
                  >
                    <IconButton
                      onClick={async () => {
                        setPoolShareData(null);
                        handleProductToggle(item._id);
                        const data = await handlePoolShare(
                          address,
                          item.tokenIn[0].tokenAddress,
                          item.tokenOut[0].tokenAddress
                        );
                        setPoolShareData(data);
                      }}
                      sx={{
                        fontSize: "17px",
                      }}
                    >
                      Manage
                      <SvgIcon>
                        {isCurrent ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </SvgIcon>
                    </IconButton>
                  </TableCell>
                </TableRow>
                {isCurrent && (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      sx={{
                        p: 0,
                        position: "relative",
                        "&:after": {
                          position: "absolute",
                          content: '" "',
                          top: 0,
                          left: 0,
                          backgroundColor: "primary.main",
                          width: 3,
                          height: "calc(100% + 1px)",
                        },
                      }}
                    >
                      <CardContent>
                        <Box
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Typography variant="body1">
                            Your Total Pool Token:
                          </Typography>
                          <Typography variant="body1">
                            {poolShareData === null ? (
                              <Skeleton
                                height={20}
                                width={100}
                                baseColor="black"
                                highlightColor="white"
                              />
                            ) : (
                              poolShareData?.LpToken.toFixed(2)
                            )}
                          </Typography>
                        </Box>
                        <Divider sx={{ mt: 1 }} />
                        <Box
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Typography variant="body1">
                            Pooled {item.tokenIn[0].tokenSymbol}:
                          </Typography>
                          <Typography variant="body1">
                            {poolShareData === null ? (
                              <Skeleton
                                height={20}
                                width={100}
                                baseColor="black"
                                highlightColor="white"
                              />
                            ) : (
                              poolShareData?.reserve0Liquidity.toFixed(2)
                            )}
                          </Typography>
                        </Box>
                        <Divider sx={{ mt: 1 }} />
                        <Box
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Typography variant="body1">
                            Pooled {item.tokenOut[0].tokenSymbol}:
                          </Typography>
                          <Typography variant="body1">
                            {poolShareData === null ? (
                              <Skeleton
                                height={20}
                                width={100}
                                baseColor="black"
                                highlightColor="white"
                              />
                            ) : (
                              poolShareData?.reserve1Liquidity.toFixed(2)
                            )}
                          </Typography>
                        </Box>
                        <Divider sx={{ mt: 1 }} />
                        <Box
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Typography variant="body1">
                            Your pool share:
                          </Typography>
                          <Typography variant="body1">
                            {poolShareData === null ? (
                              <Skeleton
                                height={20}
                                width={100}
                                baseColor="black"
                                highlightColor="white"
                              />
                            ) : (
                              `${poolShareData?.poolShare.toFixed(2)}%`
                            )}
                          </Typography>
                        </Box>
                        <Divider sx={{ mt: 1 }} />
                        <Grid container>
                          <Grid item md={5}></Grid>
                          <Grid item md={7}>
                            <Box
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              {poolShareData === null ? (
                                <Skeleton
                                  height={40}
                                  width={100}
                                  baseColor="#febf32"
                                  highlightColor="white"
                                />
                              ) : (
                                <Button
                                  sx={{
                                    display: { xs: "none", md: "block" },
                                  }}
                                  className="helper-card-button"
                                  size="medium"
                                  variant="outlined"
                                  onClick={async () => {
                                    router.push("/add-liquidity");
                                    dispatch(setPoolAmountIn(null));
                                    dispatch(setPoolAmountOut(null));
                                    dispatch(setTokenIn(item.tokenIn[0]));
                                    dispatch(setTokenOut(item.tokenOut[0]));
                                    const value1 = await handleTokenPrice(
                                      item.tokenIn[0].tokenAddress,
                                      item.tokenOut[0].tokenAddress
                                    );
                                    dispatch(setIsFirstTokenPrice(value1));
                                    const value2 = await handleTokenPrice(
                                      item.tokenOut[0].tokenAddress,
                                      item.tokenIn[0].tokenAddress
                                    );
                                    dispatch(setIsSecondTokenPrice(value2));
                                  }}
                                >
                                  Add Liquidity
                                </Button>
                              )}
                              {poolShareData === null ? (
                                <Skeleton
                                  height={40}
                                  width={100}
                                  baseColor="#febf32"
                                  highlightColor="white"
                                />
                              ) : (
                                <Button
                                  sx={{
                                    display: { xs: "none", md: "block" },
                                  }}
                                  className="helper-card-button"
                                  size="medium"
                                  variant="outlined"
                                  onClick={() => {
                                    router.push("/remove-liquidity");
                                    dispatch(
                                      setRemoveLiquidityTokenIn(item.tokenIn[0])
                                    );
                                    dispatch(
                                      setRemoveLiquidityTokenOut(
                                        item.tokenOut[0]
                                      )
                                    );
                                  }}
                                >
                                  Remove Liquidity
                                </Button>
                              )}
                            </Box>
                          </Grid>
                        </Grid>
                      </CardContent>
                      <Stack
                        alignItems="center"
                        direction="row"
                        justifyContent="space-between"
                        sx={{ px: 2 }}
                      ></Stack>
                    </TableCell>
                  </TableRow>
                )}
              </>
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
            {/* <TablePagination
                component="div"
                count={totalCount}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={rowsPerPageOptions}
              /> */}
          </Stack>
        </Card>
      </Stack>
    </Box>
  );
};

export default PoolList;
