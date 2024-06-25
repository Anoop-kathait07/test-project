import { Box, Grid, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import ButtonComponent from "@/components/atomic/atoms/button";
import Input from "@/components/atomic/atoms/input";
import { ISwapFormProps } from "@/types/swap";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import CustomDialog from "@/components/atomic/atoms/dialog";
import { useEffect, useState } from "react";
import SwapTokenSelection from "@/components/atomic/molecules/swap-token-selection";
import { useDispatch, useSelector } from "react-redux";
import { rootReducersState } from "@/store/reducers";
import SwapTokenSelect from "@/components/atomic/molecules/swap-token-select";
import {
  setAmountIn,
  setAmountOut,
  setTokenSelect,
  setTokenSelection,
} from "@/store/slices/swap";
import useAmountOut from "@/custom-hooks/use.amount-out";
import useBalance from "@/custom-hooks/use-balance";
import Types from "@/store/constants/swap";
import useAmountIn from "@/custom-hooks/use-amount-in";
import { useMetaMask } from "@/custom-hooks/use-metamask";

const SwapForm = (props: ISwapFormProps) => {
  const { initialValues, onSubmit, setBalance, balance } = props;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalOpenToken, setIsModalOpenToken] = useState<boolean>(false);
  const validationSchema = Yup.object({
    swapToken: Yup.string().required("Amount is required"),
  });

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

  const dispatch = useDispatch();

  const { handleAmount } = useAmountOut();
  const { handleBalance } = useBalance();
  const { handleAmountIn } = useAmountIn();
  const { connectMetamask } = useMetaMask();

  useEffect(() => {
    dispatch(setAmountIn(0));
    dispatch(setAmountOut(0));
    dispatch(setTokenSelect(null));
    dispatch(setTokenSelection(null));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getBalance = async () => {
    if (account && tokenSelect?.tokenAddress) {
      const value = await handleBalance(tokenSelect?.tokenAddress, account);
      setBalance(value);
    }
  };

  useEffect(() => {
    if (tokenSelect?.tokenAddress && tokenSelection?.tokenAddress) {
      dispatch({
        type: Types.GET_CHART_DATA,
        payload: {
          tokenA: tokenSelect.tokenAddress,
          tokenB: tokenSelection.tokenAddress,
        },
      });
    }
    getBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenSelect, tokenSelection, account]);


  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: Types.GET_SWAP_DATA, payload: "" });
      if (tokenSelect?.tokenAddress && tokenSelection?.tokenAddress) {
        dispatch({
          type: Types.GET_CHART_DATA,
          payload: {
            tokenA: tokenSelect.tokenAddress,
            tokenB: tokenSelection.tokenAddress,
          },
        });
      }
    }, 60000); // 60000ms = 1 minutes
    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [dispatch, tokenSelect, tokenSelection, account]);

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={onSubmit}
      >
        {({
          touched,
          errors,
          handleBlur,
          handleChange,
          values,
          setFieldValue,
        }) => (
          <Form>
            <Box className="input-border" mt={5}>
              <Grid container spacing={2}>
                <Grid item md={6}>
                  <Typography variant="body1" pt={1}>
                    From
                  </Typography>
                  <Input
                    error={!!(touched.swapToken && errors.swapToken)}
                    fullWidth
                    id="swapToken"
                    className="swapToken"
                    type="number"
                    placeholder="Enter Amount"
                    helperText={touched.swapToken && errors.swapToken}
                    label="Tokens Supply"
                    name="swapToken"
                    onBlur={handleBlur}
                    onChange={async (e: any) => {
                      setFieldValue("swapToken", e.target.value);
                      dispatch(setAmountIn(e.target.value));
                      const value = await handleAmount(
                        values.tokenSelect.walletAddress,
                        e.target.value,
                        values.tokenSelector.walletAddress
                      );
                      dispatch(setAmountOut(value));
                    }}
                    value={values.swapToken}
                  />
                  {/* <Typography variant="body2" pb={1}>
                    Price: ${values.swapToken && values.swapToken * 10}
                  </Typography> */}
                </Grid>
                <Grid item md={6}>
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      height: "70%",
                    }}
                  >
                    <Typography
                      variant="body2"
                      className="gradient-text cursor"
                      onClick={async () => {
                        const value: any = await handleBalance(
                          values.tokenSelector.walletAddress,
                          account
                        );
                        setBalance(value);
                        dispatch(setAmountIn(value));
                        const balanceValue = await handleAmount(
                          values.tokenSelect.walletAddress,
                          value,
                          values.tokenSelector.walletAddress
                        );
                        dispatch(setAmountOut(balanceValue));
                      }}
                    >
                      Max
                    </Typography>
                    {tokenSelect !== null ? (
                      <ButtonComponent
                        sx={{
                          display: { xs: "none", md: "block" },
                        }}
                        className="helper-card-button"
                        size="medium"
                        variant="outlined"
                        onClick={() => setIsModalOpenToken(true)}
                      >
                        {tokenSelect?.tokenSymbol}
                      </ButtonComponent>
                    ) : (
                      <ButtonComponent
                        sx={{
                          display: { xs: "none", md: "block" },
                        }}
                        className="helper-card-button"
                        size="medium"
                        variant="contained"
                        onClick={() => setIsModalOpenToken(true)}
                      >
                        Select a Token
                      </ButtonComponent>
                    )}
                  </Box>
                  <Typography variant="body1" pb={2}>
                    Balance: {balance && balance.toFixed(2)}{" "}
                    {balance ? tokenSelect?.tokenSymbol : ""}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Box textAlign="center">
              <SwapVertIcon
                className="icon-font"
                onClick={async () => {
                  dispatch(setAmountIn(amountOut));
                  dispatch(setAmountOut(amountIn));
                  dispatch(setTokenSelection(tokenSelect));
                  dispatch(setTokenSelect(tokenSelection));
                  dispatch({
                    type: Types.GET_TOKEN_DATA_FOR_PAIR,
                    payload: values.tokenSelect.walletAddress,
                  });
                  const value = await handleAmount(
                    values.tokenSelector.walletAddress,
                    amountOut,
                    values.tokenSelect.walletAddress
                  );
                  dispatch(setAmountOut(value));
                }}
              />
            </Box>
            <Box className="input-border" mb={5}>
              <Grid container spacing={2}>
                <Grid item md={7}>
                  <Typography variant="body1" pt={1}>
                    To
                  </Typography>
                  <Input
                    error={!!(touched.swapValue && errors.swapValue)}
                    fullWidth
                    id="swapValue"
                    className="swapValue"
                    type="number"
                    placeholder="Enter Amount"
                    helperText={touched.swapValue && errors.swapValue}
                    label="Tokens Supply"
                    name="swapValue"
                    onBlur={handleBlur}
                    onChange={async (e: any) => {
                      setFieldValue("swapValue", e.target.value);
                      dispatch(setAmountOut(e.target.value));
                      const value = await handleAmountIn(
                        e.target.value,
                        tokenSelect.tokenAddress,
                        tokenSelection.tokenAddress
                      );
                      dispatch(setAmountIn(value));
                    }}
                    value={values.swapValue}
                  />
                  {/* <Typography variant="body2" pb={1}>
                    Price: ${values.swapValue && values.swapValue * 10}
                  </Typography> */}
                </Grid>
                <Grid item md={5}>
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    {tokenSelection !== null ? (
                      <ButtonComponent
                        sx={{
                          display: { xs: "none", md: "block" },
                        }}
                        className="helper-card-button"
                        size="medium"
                        variant="outlined"
                        onClick={() => setIsModalOpen(true)}
                      >
                        {tokenSelection?.tokenSymbol}
                      </ButtonComponent>
                    ) : (
                      <ButtonComponent
                        sx={{
                          display: { xs: "none", md: "block" },
                        }}
                        className="helper-card-button"
                        size="medium"
                        variant="contained"
                        onClick={() => setIsModalOpen(true)}
                      >
                        Select a Token
                      </ButtonComponent>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box my={4}>
              {account == "" ? (
                <ButtonComponent
                  fullWidth={true}
                  size="large"
                  type="button"
                  variant="contained"
                  className="helper-card-button"
                  onClick={connectMetamask}
                >
                  Connect MetaMask
                </ButtonComponent>
              ) : balance == 0 || balance == null ? (
                <ButtonComponent
                  fullWidth={true}
                  size="large"
                  type="button"
                  variant="contained"
                  className="helper-card-button color-change"
                  disabled={true}
                >
                  Swap Now
                </ButtonComponent>
              ) : (
                <ButtonComponent
                  fullWidth={true}
                  size="large"
                  type="submit"
                  variant="contained"
                  className="helper-card-button"
                >
                  Swap Now
                </ButtonComponent>
              )}
            </Box>
          </Form>
        )}
      </Formik>
      <CustomDialog
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        className="modal_close"
        dialogTitle="Select a token"
        fullWidth={true}
        isAction={false}
      >
        <SwapTokenSelection setIsModalOpen={setIsModalOpen} />
      </CustomDialog>
      <CustomDialog
        open={isModalOpenToken}
        handleClose={() => setIsModalOpenToken(false)}
        className="modal_close"
        dialogTitle="Select a token"
        fullWidth={true}
        isAction={false}
      >
        <SwapTokenSelect
          setIsModalOpen={setIsModalOpenToken}
          setBalance={setBalance}
        />
      </CustomDialog>
    </>
  );
};

export default SwapForm;
