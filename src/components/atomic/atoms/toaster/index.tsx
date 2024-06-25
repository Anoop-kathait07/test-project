import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { SlideProps } from "@mui/material/Slide";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
type SnackbarInitialType = {
  open: boolean;
  message: string;
  variant?: string;
  severity: AlertColor;
  duration?: number;
  direction?: "right" | "left" | "up" | "down";
};

type TransitionProps = Omit<SlideProps, "direction">;

const Toaster = () => {
  const snackbarInitial: SnackbarInitialType = useSelector(
    (state: any) => state.snackbar
  );
  const dispatch = useDispatch();

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch({ type: "@snackbar/SNACKBAR_CLOSE" });
  };
  return (
    <Snackbar
      open={snackbarInitial.open}
      autoHideDuration={snackbarInitial.duration}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      key={snackbarInitial.message}
      transitionDuration={1000}
    >
      <Alert severity={snackbarInitial?.severity} sx={{ width: "100%" }}>
        {snackbarInitial.message}
      </Alert>
    </Snackbar>
  );
};

export default Toaster;
