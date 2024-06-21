import { Box, Button, Grid, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import ButtonComponent from "@/components/atomic/atoms/button";
import Input from "@/components/atomic/atoms/input";
import { useSelector } from "react-redux";
import { rootReducersState } from "@/store/reducers";
import useGetTokenShare from "@/custom-hooks/use-get-token-share";
import { useState } from "react";

const RemoveLiquidityForm = (props: any) => {
  const { initialValues, onSubmit } = props;
  const [getData, setGetData] = useState<any>(null);
  const validationSchema = Yup.object({
    lpToken: Yup.string().required("Amount is required"),
  });

  const tokenIn = useSelector(
    (state: rootReducersState) => state.removeLiquidity.tokenIn
  );
  const tokenOut = useSelector(
    (state: rootReducersState) => state.removeLiquidity.tokenOut
  );
  const account = useSelector(
    (state: rootReducersState) => state.metaMask.account
  );

  const { handleGetTokenShare } = useGetTokenShare();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={onSubmit}
    >
      {({ touched, errors, handleBlur, values, setFieldValue }) => (
        <Form>
          <Box className="input-border" mt={5}>
            <Grid container spacing={2}>
              <Grid item md={12}>
                <Typography variant="body1" pt={1}>
                  Remove Amount
                </Typography>
                <Input
                  error={!!(touched.lpToken && errors.lpToken)}
                  fullWidth
                  id="lpToken"
                  className="lpToken"
                  type="number"
                  placeholder="Enter Amount"
                  helperText={touched.lpToken && errors.lpToken}
                  label="lpToken"
                  name="lpToken"
                  onBlur={handleBlur}
                  onChange={async (e: any) => {
                    setFieldValue("lpToken", e.target.value);
                    const value = await handleGetTokenShare(
                      tokenIn.tokenAddress,
                      tokenOut.tokenAddress,
                      account,
                      e.target.value
                    );
                    setGetData(value);
                    setFieldValue("lpTokenReturning", value?.lpTokenValue);
                  }}
                  value={values.lpToken}
                />
              </Grid>
              <Grid item md={3}>
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                    flex: "1 1 auto",
                  }}
                >
                  <Button
                    variant="outlined"
                    className="border-color"
                    onClick={async () => {
                      setFieldValue("lpToken", 25);
                      const value = await handleGetTokenShare(
                        tokenIn.tokenAddress,
                        tokenOut.tokenAddress,
                        account,
                        25
                      );
                      setGetData(value);
                      setFieldValue("lpTokenReturning", value?.lpTokenValue);
                    }}
                  >
                    25%
                  </Button>
                </Box>
              </Grid>
              <Grid item md={3}>
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                    flex: "1 1 auto",
                  }}
                >
                  <Button
                    variant="outlined"
                    className="border-color"
                    onClick={async () => {
                      setFieldValue("lpToken", 50);
                      const value = await handleGetTokenShare(
                        tokenIn.tokenAddress,
                        tokenOut.tokenAddress,
                        account,
                        50
                      );
                      setGetData(value);
                      setFieldValue("lpTokenReturning", value?.lpTokenValue);
                    }}
                  >
                    50%
                  </Button>
                </Box>
              </Grid>
              <Grid item md={3}>
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                    flex: "1 1 auto",
                  }}
                >
                  <Button
                    variant="outlined"
                    className="border-color"
                    onClick={async () => {
                      setFieldValue("lpToken", 75);
                      const value = await handleGetTokenShare(
                        tokenIn.tokenAddress,
                        tokenOut.tokenAddress,
                        account,
                        75
                      );
                      setGetData(value);
                      setFieldValue("lpTokenReturning", value?.lpTokenValue);
                    }}
                  >
                    75%
                  </Button>
                </Box>
              </Grid>
              <Grid item md={3}>
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                    flex: "1 1 auto",
                  }}
                >
                  <Button
                    variant="outlined"
                    className="border-color"
                    onClick={async () => {
                      setFieldValue("lpToken", 100);
                      const value = await handleGetTokenShare(
                        tokenIn.tokenAddress,
                        tokenOut.tokenAddress,
                        account,
                        100
                      );
                      setGetData(value);
                      setFieldValue("lpTokenReturning", value?.lpTokenValue);
                    }}
                  >
                    100%
                  </Button>
                </Box>
              </Grid>
              <Grid item md={12}>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  px={3}
                  pt={4}
                >
                  {getData === null ? (
                    <Typography variant="body1">0</Typography>
                  ) : (
                    <Typography variant="body1">
                      {getData?.reserve0Liquidity.toFixed(2)}
                    </Typography>
                  )}
                  <Typography variant="body1">
                    {tokenIn?.tokenSymbol}
                  </Typography>
                </Box>
              </Grid>
              <Grid item md={12}>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  px={3}
                >
                  {getData === null ? (
                    <Typography variant="body1">0</Typography>
                  ) : (
                    <Typography variant="body1">
                      {getData?.reserve1Liquidity.toFixed(2)}
                    </Typography>
                  )}
                  <Typography variant="body1">
                    {tokenOut?.tokenSymbol}
                  </Typography>
                </Box>
              </Grid>
              <Grid item md={12}>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  px={3}
                >
                  {getData === null ? (
                    <Typography variant="body1">0</Typography>
                  ) : (
                    <Typography variant="body1">
                      {getData?.lpTokenReturning.toFixed(2)}
                    </Typography>
                  )}
                  <Typography variant="body1">LP Tokens</Typography>
                </Box>
              </Grid>
            </Grid>
            <Box my={4}>
              <ButtonComponent
                fullWidth={true}
                size="large"
                type="submit"
                variant="contained"
                className="helper-card-button"
              >
                Remove Liquidity
              </ButtonComponent>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default RemoveLiquidityForm;
