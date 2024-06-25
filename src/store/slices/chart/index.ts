import { createSlice } from "@reduxjs/toolkit";

interface ICreatePairStateProps {
  chartData: any;
}

const initialState: ICreatePairStateProps = {
    chartData: [],
};

const chartSlice = createSlice({
  name: "chart",
  initialState,

  reducers: {
    setChartData: (state, action) => {
      state.chartData = action.payload;
      return state;
    },
  },
});

export const {
    setChartData,
} = chartSlice.actions;
export const { reducer } = chartSlice;
