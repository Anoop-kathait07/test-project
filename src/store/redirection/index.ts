import { REDIRECT_TO, CLEAR_REDIRECTION } from "@/store/constants/common";

interface RedirectionState {
  target: string | null;
}

const initialState: RedirectionState = {
  target: null,
};

const redirection = (state = initialState, action: any): RedirectionState => {
  switch (action.type) {
    case REDIRECT_TO:
      return { ...state, target: action.payload };

    case CLEAR_REDIRECTION:
      return { ...state, target: null };

    default:
      return state;
  }
};

export default redirection;
