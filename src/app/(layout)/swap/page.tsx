"use client";
import MyChart from "@/components/atomic/molecules/chart";
import SwapForm from "@/components/atomic/organism/swap-form";
import useTokenSwap from "@/custom-hooks/use-swap";
import Types from "@/store/constants/swap";
import { rootReducersState } from "@/store/reducers";
import { ISwapProps } from "@/types/swap";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomDialog from "@/components/atomic/atoms/dialog";
import { useMetaMask } from "@/custom-hooks/use-metamask";
import { ITabelHeader } from "@/types/table";
import { useFilter } from "@/custom-hooks/use-filter";
import SwapList from "@/components/atomic/organism/swap-list";

const Swap = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [balance, setBalance] = useState<any>(0);
  const tokenSelection = useSelector(
    (state: rootReducersState) => state.swap.tokenSelection
  );
  const tokenSelect = useSelector(
    (state: rootReducersState) => state.swap.tokenSelect
  );
  const account = useSelector(
    (state: rootReducersState) => state.metaMask.account
  );
  const amountIn = useSelector(
    (state: rootReducersState) => state.swap.amountIn
  );
  const amountOut = useSelector(
    (state: rootReducersState) => state.swap.amountOut
  );

  useEffect(() => {
    dispatch({ type: Types.GET_TOKEN_DATA, payload: "" });
    if (account == "") {
      setIsModalOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { handleSwap } = useTokenSwap();
  const { connectMetamask } = useMetaMask();
  const initialValues: ISwapProps = {
    swapToken: amountIn,
    swapValue: amountOut,
    tokenSelector: {
      _id: tokenSelect?._id || "",
      name: tokenSelect?.tokenSymbol || "",
      walletAddress: tokenSelect?.tokenAddress || "",
    },
    tokenSelect: {
      _id: tokenSelection?._id || "",
      name: tokenSelection?.tokenSymbol || "",
      walletAddress: tokenSelection?.tokenAddress || "",
    },
  };

  const onSubmit = async(values: typeof initialValues) => {
    await handleSwap(
      values.tokenSelector.walletAddress,
      values.swapToken,
      values.tokenSelect.walletAddress,
      values.swapValue,
      account,
      values.tokenSelect.name,
      setBalance
    );
    dispatch({ type: Types.GET_SWAP_DATA, payload: "" });
  };

  interface Transaction {
    datetime: string;
    amount: number;
  }

  const transactions = useSelector(
    (state: rootReducersState) => state.chart.chartData
  );

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
      label: "Token Pair",
      isField: "isAlphaNumeric",
    },
    {
      id: "txHash",
      numeric: false,
      disablePadding: true,
      label: "Txn Hash",
      isField: "isAlphaNumeric",
      disableSortBy: true,
    },
    {
      id: "token_in_symbol",
      numeric: true,
      disablePadding: true,
      label: "Token In",
      isField: "isAlphaNumeric",
    },
    {
      id: "token_out_symbol",
      numeric: false,
      disablePadding: true,
      label: "Token Out",
      isField: "isAlphaNumeric",
      disableSortBy: true,
    },
    {
      id: "token_in_amount",
      numeric: true,
      disablePadding: true,
      label: "Token In Amount",
      isField: "isNumber",
    },
    {
      id: "token_out_amount",
      numeric: false,
      disablePadding: true,
      label: "Token Out Amount",
      isField: "isNumber",
      disableSortBy: true,
    },
    {
      id: "timestamp",
      numeric: false,
      disablePadding: true,
      label: "Time",
      isField: "isNumber",
      disableSortBy: true,
    },
  ];

  const {
    filterData,
    handlePageChange,
    handleRowsPerPageChange,
    handleSortChange,
  } = useFilter();

  const { rowsPerPage, page } = filterData;

  const listData = useSelector(
    (state: rootReducersState) => state.swap.swapData
  );

  useEffect(() => {
    dispatch({ type: Types.GET_SWAP_DATA, payload: "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Container maxWidth="xl">
        <Grid container>
          <Grid item md={6}>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                flex: "1 1 auto",
              }}
            >
              <Container
                maxWidth="md"
                sx={{
                  pt: {
                    xs: "220px",
                    md: "220px",
                  },
                  pb: {
                    xs: "110px",
                    md: "110px",
                  },
                }}
              >
                <MyChart transactions={transactions} />
              </Container>
            </Box>
          </Grid>
          <Grid item md={6}>
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
                  pt: {
                    xs: "120px",
                    md: "120px",
                  },
                  pb: {
                    xs: "48px",
                    md: "48px",
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
                      Swap
                    </Typography>
                    <Typography variant="body2" className="blue-text">
                      0.05% Slippage
                    </Typography>
                  </Box>
                  <SwapForm
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    setBalance={setBalance}
                    balance={balance}
                  />
                </Box>
              </Container>
            </Box>
          </Grid>
          <Grid item md={12}>
            <Box className="tableData" pb={8}>
              <SwapList
                heading={HEADING}
                listingData={listData}
                handlePageChange={handlePageChange}
                handleRowsPerPageChange={handleRowsPerPageChange}
                handleSortChange={handleSortChange}
                page={page}
                rowsPerPage={rowsPerPage}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
      <CustomDialog
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        className="modal_close"
        fullWidth={true}
        onModalClose={() => setIsModalOpen(false)}
        isAction={true}
      >
        <Typography variant="body2" className="blue-text" m={4}>
          Connect your Metamask wallet to access a universe of decentralized
          possibilities in just a click.
        </Typography>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            flex: "1 1 auto",
          }}
        >
          <Button
            sx={{ display: { xs: "none", md: "block" } }}
            className="helper-card-button"
            size="medium"
            variant="contained"
            onClick={() => {
              connectMetamask();
              setIsModalOpen(false);
            }}
          >
            Connect MetaMask
          </Button>
        </Box>
      </CustomDialog>
    </>
  );
};

export default Swap;
