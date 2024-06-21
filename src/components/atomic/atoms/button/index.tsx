import React from 'react';
import Button from '@mui/material/Button';
import { SxProps } from '@mui/material';

type buttonProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  size: 'small' | 'medium' | 'large';
  type?: 'submit' | 'button' | 'reset';
  variant: 'text' | 'outlined' | 'contained';
  fullWidth?: boolean;
  disabled?: boolean;
  sx?: SxProps;
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  onClick?: any;
};
const ButtonComponent = (props: buttonProps) => {
  const { children, variant, size, type, fullWidth, disabled, sx, color, className, id, onClick } =
    props;
  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={className}
        id={id}
        disabled={disabled}
        fullWidth={fullWidth}
        type={type}
        sx={sx}
        color={color}
        onClick={onClick}
      >
        {children}
      </Button>
    </>
  );
};

export default ButtonComponent;
