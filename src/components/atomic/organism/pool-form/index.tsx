import { Box, Grid, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import ButtonComponent from "@/components/atomic/atoms/button";
import Input from "@/components/atomic/atoms/input";
import CustomDialog from "@/components/atomic/atoms/dialog";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { rootReducersState } from "@/store/reducers";
import AddIcon from "@mui/icons-material/Add";
import PoolTokenIn from "@/components/atomic/molecules/pool-token-In";
import PoolTokenOut from "@/components/atomic/molecules/pool-token-out";
import { IPoolFormProps } from "@/types/pool";
import { setPoolAmountIn, setPoolAmountOut } from "@/store/slices/pool";
import useAmountOutPool from "@/custom-hooks/use-amount-out-pool";
import useBalance from "@/custom-hooks/use-balance";
import useTokenShare from "@/custom-hooks/use-token-share";

const PoolForm = (props: IPoolFormProps) => {
  const { initialValues, onSubmit, balance, setBalance, setIsTokenShare, isTokenShare } = props;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalOpenToken, setIsModalOpenToken] = useState<boolean>(false);
  const validationSchema = Yup.object({
    amountIn: Yup.string().required("Amount is required"),
  });
  const tokenIn = useSelector((state: rootReducersState) => state.pool.tokenIn);
  const tokenOut = useSelector(
    (state: rootReducersState) => state.pool.tokenOut
  );
  const account = useSelector(
    (state: rootReducersState) => state.metaMask.account
  );
  const isFirstTokenPrice = useSelector(
    (state: rootReducersState) => state.pool.isFirstTokenPrice
  );
  const isSecondTokenPrice = useSelector(
    (state: rootReducersState) => state.pool.isSecondTokenPrice
  );

  const dispatch = useDispatch();
  const { handleAmountOut } = useAmountOutPool();
  const { handleBalance } = useBalance();
  const { handleTokenShare } = useTokenShare();

  const getBalance = async () => {
    if (tokenIn?.tokenAddress != "" && tokenIn?.tokenAddress != null) {
      const value = await handleBalance(tokenIn?.tokenAddress, account);
      setBalance(value);
    }
  };

  useEffect(() => {
    getBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenIn]);

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
                    error={!!(touched.amountIn && errors.amountIn)}
                    fullWidth
                    id="amountIn"
                    className="amountIn"
                    type="number"
                    placeholder="Enter Amount"
                    helperText={touched.amountIn && errors.amountIn}
                    label="Tokens Supply"
                    name="amountIn"
                    onBlur={handleBlur}
                    onChange={async (e: any) => {
                      setFieldValue("amountIn", e.target.value);
                      dispatch(setPoolAmountIn(e.target.value));
                      const value = await handleAmountOut(
                        e.target.value,
                        values.tokenIn.walletAddress,
                        values.tokenOut.walletAddress
                      );
                      dispatch(setPoolAmountOut(value));
                      const value2 = await handleTokenShare(
                        values.tokenIn.walletAddress,
                        values.tokenOut.walletAddress,
                        e.target.value,
                        value
                      );
                      setIsTokenShare(value2);
                    }}
                    value={values.amountIn}
                  />
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
                      variant="body1"
                      className="gradient-text"
                      onClick={async () => {
                        const value = await handleBalance(
                          values.tokenIn.walletAddress,
                          account
                        );
                        setBalance(value);
                        dispatch(setPoolAmountIn(value));
                        const valueBalance = await handleAmountOut(
                          values.amountIn,
                          values.tokenIn.walletAddress,
                          values.tokenOut.walletAddress
                        );
                        dispatch(setPoolAmountOut(valueBalance));
                      }}
                    >
                      Max
                    </Typography>
                    {tokenIn !== null ? (
                      <ButtonComponent
                        sx={{
                          display: { xs: "none", md: "block" },
                        }}
                        className="helper-card-button"
                        size="medium"
                        variant="outlined"
                        onClick={() => setIsModalOpenToken(true)}
                      >
                        {tokenIn?.tokenSymbol}
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
                  <Typography variant="body1">
                    Balance: {balance && balance.toFixed(2)}{" "}
                    {tokenIn?.tokenSymbol}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Box textAlign="center">
              <AddIcon className="icon-font" />
            </Box>
            <Box className="input-border" mb={5}>
              <Grid container spacing={2}>
                <Grid item md={7}>
                  <Typography variant="body1" pt={1}>
                    To
                  </Typography>
                  <Input
                    error={!!(touched.amountOut && errors.amountOut)}
                    fullWidth
                    id="amountOut"
                    className="amountOut"
                    type="number"
                    placeholder="Enter Amount"
                    helperText={touched.amountOut && errors.amountOut}
                    label="Tokens Supply"
                    name="swapValue"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.amountOut}
                    disabled={true}
                  />
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
                    {tokenOut !== null ? (
                      <ButtonComponent
                        sx={{
                          display: { xs: "none", md: "block" },
                        }}
                        className="helper-card-button"
                        size="medium"
                        variant="outlined"
                        onClick={() => setIsModalOpen(true)}
                      >
                        {tokenOut?.tokenSymbol}
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
            {tokenOut?.tokenAddress ? (
              <Box className="input-border" mb={5}>
                <Typography variant="body1" pt={1}>
                  Prices and pool share
                </Typography>
                <Grid container spacing={2}>
                  <Grid item md={4}>
                    <Typography variant="body1" pt={1}>
                      {isFirstTokenPrice}
                    </Typography>
                    <Typography variant="body1" pt={1}>
                      {tokenIn?.tokenSymbol} per {tokenOut?.tokenSymbol}
                    </Typography>
                  </Grid>
                  <Grid item md={4}>
                    <Typography variant="body1" pt={1}>
                      {isSecondTokenPrice}
                    </Typography>
                    <Typography variant="body1" pt={1}>
                      {tokenOut?.tokenSymbol} per {tokenIn?.tokenSymbol}
                    </Typography>
                  </Grid>
                  <Grid item md={4}>
                    <Typography variant="body1" pt={1}>
                      {isTokenShare}%
                    </Typography>
                    <Typography variant="body1" pt={1}>
                      Share of pool
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            ) : null}
            <Box my={4}>
              <ButtonComponent
                fullWidth={true}
                size="large"
                type="submit"
                variant="contained"
                className="helper-card-button"
              >
                Add Liquidity
              </ButtonComponent>
            </Box>
          </Form>
        )}
      </Formik>
      <CustomDialog
        open={isModalOpenToken}
        handleClose={() => setIsModalOpenToken(false)}
        className="modal_close"
        dialogTitle="Select a token"
        fullWidth={true}
        isAction={false}
      >
        <PoolTokenIn
          setIsModalOpen={setIsModalOpenToken}
          setBalance={setBalance}
        />
      </CustomDialog>
      <CustomDialog
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        className="modal_close"
        dialogTitle="Select a token"
        fullWidth={true}
        isAction={false}
      >
        <PoolTokenOut setIsModalOpen={setIsModalOpen} />
      </CustomDialog>
    </>
  );
};

export default PoolForm;
