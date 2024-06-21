import React, { ReactNode } from "react";
import { FormHelperText } from "@mui/material";

type TProps = {
  children?: ReactNode;
};

const TextError = (props: TProps) => {
  const { children } = props;
  return <FormHelperText error>{children}</FormHelperText>;
};

export default TextError;
