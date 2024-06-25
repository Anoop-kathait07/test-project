/* eslint-disable import/named */
import { FocusEvent, ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';

type InputProps = {
  name: string;
  label?: string;
  type: string;
  placeholder: string;
  fullWidth: boolean;
  autoFocus?: boolean;
  id?: string;
  className?: string;
  disabled?: boolean;
  value: string|number|null|undefined;
  helperText:any;
  rows?:number;
  maxRows?:number;
  onBlur: (event: FocusEvent<HTMLInputElement>) => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error: boolean;
  multiline?: boolean;
};

const Input = (props: InputProps) => {
  const {
    name,
    type,
    label,
    placeholder,
    id,
    className,
    fullWidth,
    autoFocus,
    onBlur,
    onChange,
    error,
    value,
    helperText,
    rows,
    maxRows,
    disabled,
    multiline
  } = props;

  return (
   
      <TextField
        type={type}
        helperText={helperText}
        // label={label}
        autoFocus={autoFocus}
        fullWidth={fullWidth}
        id={id}
        name={name}
        placeholder={placeholder}
        className={className}
        onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
          onBlur(event);
        }}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          onChange(event);
        }}
        error={error}
        value={value}
        multiline={multiline}
        rows={rows}
        maxRows={maxRows}
        disabled={disabled}
        variant='filled'
      />
    
  );
};

export default Input;
