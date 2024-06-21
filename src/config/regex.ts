const EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD = /^(?=.*?[A-Za-z])(?=.*?\d)(?=.*[$@!%*?&])[^\s]{8,}$/;
const PHONE_NUMBER = /^(\+)?[(]?\d{3}\)?[-\s.]?\d{3}[-\s.]?\d{4,}$/im;
const FLOAT_NUMBER = /^\d+(\.\d{1,2})?$/;
const INT_NUMBER = /^\d{1,2}$/;
const NAME_FORMAT = /^[a-zA-Z][a-zA-Z0-9\s]*$/;
const ACCOUNT_NUMBER_FORMAT = /^[a-zA-Z0-9]{8,16}$/;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  EMAIL,
  PASSWORD,
  PHONE_NUMBER,
  FLOAT_NUMBER,
  INT_NUMBER,
  NAME_FORMAT,
  ACCOUNT_NUMBER_FORMAT,
};
