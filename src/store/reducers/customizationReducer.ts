import {
  CLEAR_TOKEN,
  LOADER_CLOSE,
  LOADER_OPEN,
  STORE_DEVICE_ID,
  STORE_TOKEN,
  STORE_USER_INFO,
} from '@/store/constants';

interface initialStateProps {
  isLoader: boolean;
  access_token: string;
  refresh_token: string;
  userInfo: {
    first_name?: string;
    last_name?: string;
    email?: string;
    image?: string;
  };
  deviceId?: string;
}

export const initialState: initialStateProps = {
  isLoader: false,
  access_token: '',
  refresh_token: '',
  userInfo: {},
  deviceId: '',
};

const customizationReducer = (state = initialState, action: any): any => {
  switch (action.type) {
    case LOADER_OPEN:
      return {
        ...state,
        isLoader: true,
      };

    case LOADER_CLOSE:
      return {
        ...state,
        isLoader: false,
      };
    case STORE_TOKEN:
      return {
        ...state,
        access_token: action.payload.TOKEN_DATA.access_token,
        refresh_token: action.payload.TOKEN_DATA.refresh_token,
        userInfo: action.payload.USER_INFO,
      };
    case CLEAR_TOKEN:
      return {
        ...state,
        access_token: '',
        refresh_token: '',
        userInfo: {},
        deviceId: '',
      };
    case STORE_USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
      };
    case STORE_DEVICE_ID:
      return {
        ...state,
        deviceId: action.payload,
      };

    default:
      return state;
  }
};

export default customizationReducer;
