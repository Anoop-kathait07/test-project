const namespaces = "api";

const URL = {
  SWAP: `${namespaces}/swap`,
  GET_TOKEN_DATA: `${namespaces}/getAllTokens`,
  GET_TOKEN_DATA_FOR_PAIR: `${namespaces}/getTokenForPair`,
  GET_TOKEN_FOR_POOL: `${namespaces}/getTokenForPool`,
  GET_AMOUNT_OUT: `${namespaces}/swapAmountOut`,
  ADD_TOKEN: `${namespaces}/addToken`,
  GET_POOL_DATA: `${namespaces}/getPairForUser`,
  GET_CHART_DATA: `${namespaces}/getChartData`,
  GET_SWAP_DATA: `${namespaces}/getLatestTxns`,
};

export default URL;
