import { Box, Grid, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import ButtonComponent from "@/components/atomic/atoms/button";
import Input from "@/components/atomic/atoms/input";
import CustomDialog from "@/components/atomic/atoms/dialog";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { rootReducersState } from "@/store/reducers";
import AddIcon from "@mui/icons-material/Add";
import { IPoolFormProps } from "@/types/pool";
import useBalance from "@/custom-hooks/use-balance";
import CreatePairTokenOut from "@/components/atomic/molecules/create-pair-token-out";
import CreatePairTokenIn from "@/components/atomic/molecules/create-pair-token-in";
import { setPairAmountIn, setPairAmountOut } from "@/store/slices/create-pair";

const CreatePairForm = (props: IPoolFormProps) => {
  const {
    initialValues,
    onSubmit,
    balance,
    setBalance,
    balance1,
    setBalance1,
  } = props;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalOpenToken, setIsModalOpenToken] = useState<boolean>(false);
  const validationSchema = Yup.object({
    amountIn: Yup.string().required("Amount is required"),
    amountOut: Yup.string().required("Amount is required"),
  });
  const tokenIn = useSelector(
    (state: rootReducersState) => state.createPair.tokenIn
  );
  const tokenOut = useSelector(
    (state: rootReducersState) => state.createPair.tokenOut
  );
  const account = useSelector(
    (state: rootReducersState) => state.metaMask.account
  );

  const dispatch = useDispatch();
  const { handleBalance } = useBalance();

  return (
    <>
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
                    onChange={(e: any) => {
                      setFieldValue("amountIn", e.target.value);
                      dispatch(setPairAmountIn(e.target.value));
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
                        dispatch(setPairAmountIn(value));
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
                    Balance: {balance && balance.toFixed(2)} {tokenIn?.tokenSymbol}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Box textAlign="center">
              <AddIcon className="icon-font" />
            </Box>
            <Box className="input-border" mb={5}>
              <Grid container spacing={2}>
                <Grid item md={6}>
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
                    onChange={(e: any) => {
                      setFieldValue("amountOut", e.target.value);
                      dispatch(setPairAmountOut(e.target.value));
                    }}
                    value={values.amountOut}
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
                          values.tokenOut.walletAddress,
                          account
                        );
                        setBalance1(value);
                        dispatch(setPairAmountOut(value));
                      }}
                    >
                      Max
                    </Typography>
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
                  <Typography variant="body1">
                    Balance: {balance1 && balance1.toFixed(2)}{" "}
                    {tokenOut?.tokenSymbol}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Box my={4}>
              <ButtonComponent
                fullWidth={true}
                size="large"
                type="submit"
                variant="contained"
                className="helper-card-button"
              >
                Create New Pair
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
        <CreatePairTokenIn
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
        <CreatePairTokenOut
          setIsModalOpen={setIsModalOpen}
          setBalance1={setBalance1}
        />
      </CustomDialog>
    </>
  );
};

export default CreatePairForm;
