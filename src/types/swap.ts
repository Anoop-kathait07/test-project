export interface ISwapProps {
  swapToken: number | null;
  swapValue: number | null;
  tokenSelector: {
    _id: string;
    name: string;
    walletAddress: string;
  };
  tokenSelect: {
    _id: string;
    name: string;
    walletAddress: string;
  };
}

export interface ISwapFormProps {
  initialValues: ISwapProps;
  onSubmit: (values: ISwapProps) => void;
  setBalance: any;
  balance: number;
}

export type swapActions = {
  type: string;
  payload: ISwapProps;
};
