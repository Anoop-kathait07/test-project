// eslint-disable-next-line import/named
import { AlertColor } from '@mui/material';
import { SNACKBAR_CLOSE, SNACKBAR_OPEN } from '@/store/constants';

type SnackbarInitialType = {
  type?: string | undefined;
  open: boolean;
  message: string;
  variant?: string;
  severity: AlertColor;
  duration?: number | undefined;
  direction?: 'right' | 'left' | 'up' | 'down' | undefined;
};

const initialState: SnackbarInitialType = {
  open: false,
  message: '',
  variant: 'default',
  severity: 'success',
  direction: 'left',
  duration: 4000,
};

const snackbarReducer = (state = initialState, action: SnackbarInitialType) => {
  switch (action.type) {
    case SNACKBAR_OPEN:
      return {
        ...state,
        open: action.open ? action.open : initialState.open,
        message: action.message ? action.message : initialState.message,
        variant: action.variant ? action.variant : initialState.variant,
        severity: action.severity ? action.severity : initialState.severity,
        direction: action.direction ? action.direction : initialState.direction,
        duration: action.duration ? action.duration : initialState.duration,
      };
    case SNACKBAR_CLOSE:
      return {
        ...state,
        open: false,
      };
    default:
      return state;
  }
};

export default snackbarReducer;
