import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { ErrorMessage } from 'formik';
import TextError from '@/components/atomic/atoms/text-error';

interface IAutoCompleteSelectProps {
  options: Option[];
  value: Option | undefined;
  name: string;
  label: string;
  id?: string;
  className?: string;
  placeholder: string;
  onChange: (field: string, value: any) => void;
  onBlur?: (event: React.FocusEvent) => void;
  helperText:any;
}

export type Option = {
  _id: string;
  name: string;
  walletAddress?: string;
};

const SelectAutoComplete: React.FC<IAutoCompleteSelectProps> = ({
  name,
  options,
  value,
  onChange,
  onBlur,
  label,
  id,
  className,
  placeholder,
  helperText
}) => {

  return (
    <>
      <Autocomplete
        id={id}
        multiple={false}
        options={options}
        className={className}
        value={value}
        onChange={(e, value) => onChange(name, value)}
        onBlur={onBlur}
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option._id === value._id}
        renderInput={(params) => (
          <TextField
            key={id}
            {...params}
            // label={label}
            placeholder={placeholder}
            // helperText={helperText}
          />
        )}
      />
      <ErrorMessage
        name={name}
        component={TextError}
      />
    </>
  );
};

export default SelectAutoComplete;
