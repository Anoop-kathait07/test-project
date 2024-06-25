export interface IPoolProps {
  amountIn: number | null;
  amountOut: number | null;
  tokenIn: {
    _id: string;
    name: string;
    walletAddress: string;
  };
  tokenOut: {
    _id: string;
    name: string;
    walletAddress: string;
  };
}

export interface IPoolFormProps {
  initialValues: IPoolProps;
  onSubmit: (values: IPoolProps) => void;
  balance: number;
  setBalance: any;
  setBalance1 ?: any;
  balance1 ?: any;
  setIsTokenShare: any;
  isTokenShare: any;
}

export type poolActions = {
  type: string;
  payload: IPoolProps;
};
