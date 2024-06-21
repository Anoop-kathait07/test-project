import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { ErrorMessage } from 'formik';
import { ChangeEvent, FocusEvent } from 'react';
import TextError from '@/components/atomic/atoms/text-error';

type TProps = {
  name: string;
  label: string;
  placeholder: string;
  fullWidth: boolean;
  id: string;
  className?: string;
  value: number | null;
  onBlur: (event: FocusEvent<HTMLInputElement>) => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error: boolean;
  disabled?: boolean;
};

const NumberInput = (props: TProps) => {
  const {
    name,
    label,
    placeholder,
    id,
    className,
    fullWidth,
    onBlur,
    onChange,
    error,
    value,
    disabled,
  } = props;

  return (
    <>
      <TextField
        name={name}
        placeholder={placeholder}
        id={id}
        className={className}
        fullWidth={fullWidth}
        label={label}
        type="number"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AttachMoneyIcon
                sx={{
                  height: '0.8em',
                }}
              />
            </InputAdornment>
          ),
        }}
        onBlur={onBlur}
        onChange={onChange}
        error={error}
        value={value}
        disabled={disabled}
      />

      <ErrorMessage
        name={name}
        component={TextError}
      />
    </>
  );
};

export default NumberInput;
