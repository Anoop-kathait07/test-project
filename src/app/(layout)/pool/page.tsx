"use client";

import PoolList from "@/components/atomic/organism/pool-list";
import { useFilter } from "@/custom-hooks/use-filter";
import Types from "@/store/constants/pool";
import { ITabelHeader } from "@/types/table";
import { Box, Button, Container, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { rootReducersState } from "@/store/reducers";
import { setPoolAmountIn, setPoolAmountOut, setTokenIn, setTokenOut } from "@/store/slices/pool";
import { setPairAmountIn, setPairAmountOut, setPairTokenIn, setPairTokenOut } from "@/store/slices/create-pair";

const HEADING: ITabelHeader[] = [
  {
    id: "s.no",
    numeric: false,
    disablePadding: true,
    label: "S.No",
    isField: "isNumber",
    disableSortBy: true,
  },
  {
    id: "tokens",
    numeric: true,
    disablePadding: true,
    label: "Tokens",
    isField: "isAlphaNumeric",
  },
  {
    id: "action",
    numeric: false,
    disablePadding: true,
    label: "",
    isField: "isNumber",
    disableSortBy: true,
  },
];

const Pool = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    filterData,
    handlePageChange,
    handleRowsPerPageChange,
    handleSortChange,
  } = useFilter();

  const { rowsPerPage, page} = filterData;

  const address = useSelector(
    (state: rootReducersState) => state.metaMask.account
  );
  const listData = useSelector(
    (state: rootReducersState) => state.pool.poolData
  );

  useEffect(() => {
    dispatch({ type: Types.GET_POOL_DATA, payload: address });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        flex: "1 1 auto",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          py: {
            xs: "120px",
            md: "120px",
          },
        }}
      >
        <Box
          sx={{
            backgroundColor: "#17161b",
          }}
        >
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" className="gradient-text">
              Positions
            </Typography>
            <Button
              sx={{
                display: { xs: "none", md: "block" },
              }}
              className="helper-card-button"
              size="medium"
              variant="outlined"
              onClick={() => {
                router.push("/add-liquidity");
                dispatch(setPoolAmountIn(null));
                dispatch(setPoolAmountOut(null));
                dispatch(setTokenIn(null));
                dispatch(setTokenOut(null));
              }}
            >
              Add Liquidity
            </Button>
            <Button
              sx={{
                display: { xs: "none", md: "block" },
              }}
              className="helper-card-button"
              size="medium"
              variant="outlined"
              onClick={() => {
                router.push("/create-pair");
                dispatch(setPairAmountIn(null));
                dispatch(setPairAmountOut(null));
                dispatch(setPairTokenIn(null));
                dispatch(setPairTokenOut(null));
              }}
            >
              Create a pair
            </Button>
          </Box>
          <Box pt={8} className="tableData">
            <PoolList
              heading={HEADING}
              listingData={listData}
              handlePageChange={handlePageChange}
              handleRowsPerPageChange={handleRowsPerPageChange}
              handleSortChange={handleSortChange}
              page={page}
              rowsPerPage={rowsPerPage}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Pool;
