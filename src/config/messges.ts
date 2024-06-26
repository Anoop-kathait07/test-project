export enum Messages {
    EMAIL_REQUIRED = 'Email is requred',
    PASSWORD_REQUIRED = 'Password is requred',
    CONFIRM_PASSWORD = 'Passwords must match',
    CURRENT_PASSWORD = 'Current Password is requred',
    CONFIRM_PASSWORD_REQUIRED = 'Password confirmation is required',
    PASSWORD_CRITERIA = 'Password must meet the following criteria:\n1 uppercase letter\n1 lowercase letter\n1 digit\n1 special character\nMinimum 8 characters',
    CHECK_FIELD = 'This field must be checked',
    ADDRESS_REQUIRED = 'Address is required',
    NAME_VALIDATION = 'invalid name',
    RESIDENCE_ADDRESS_REQUIRED = 'Residence Address is required',
    OFFICE_ADDRESS_REQUIRED = 'Office Address is required',
    EMAIL_INVALID = 'Must be a valid email',
    ONE_REQUIRED = 'Atleast one value is required',
    THREE_REQUIRED = 'Minimum 3 characters are required',
    LEGAL_REQUIRED = 'Legal Name is required',
    NAME_REQUIRED = 'Name is required',
    FIRST_NAME_REQUIRED = 'First name is required',
    LAST_NAME_REQUIRED = 'Last name is required',
    NAME_FORMAT = 'Only alphabets accepted',
    CONTECT_REQUIRED = 'Contact is required',
    WALLET_REQUIRED = 'Wallet address is required',
    CONTECT_REQUIRED_DIGITS = 'Must be a 10-digit number',
    SIX_DIGITS_REQUIRED = 'Must be a 6-digit number',
    ABN_REQUIRED = 'ABN/ACN is required',
    FEEDBACK_REQUIRED = 'Feedback is required',
    IMAGE_REQUIRED = 'Please select an image',
    RATING_REQUIRED = 'Please provide Ratings',
    PRICE_REQUIRED = 'Price is required',
    CATEGORY_REQUIRED = 'Please select any category',
    NUMBER_ONLY = 'It should be a number only',
    MATERIAL_REQUIRED = 'Material Type is required',
    OPERATE_REQUIRED = 'Operate Type is required',
    DISCOUNT_REQUIRED = 'Discount is required',
    STOCK_REQUIRED = 'Units in stock is required',
    CAPACITY_REQUIRED = 'Capacity is required',
    GST_REQUIRED = 'GST is required',
    WARRANTY_REQUIRED = 'Warranty is required',
    TOO_LONG_NAME = 'Name is too long',
    FILE_REQUIRED = 'File is required',
    DESCRIPTION_REQUIRED = 'Description is required',
    AADHAAR_REQUIRED = 'Aadhaar number is required',
    RADIO_REQUIRED = 'Please select any of the above options',
    AADHAAR_MIN_LENGHT = 'Invalid aadhaar, it should be minimum of 16 digits',
    AADHAAR_MAX_LENGHT = "Invalid aadhaar, it can't be more than 16 digits",
    TERMS_CONDITIONS = 'Please accept the terms and conditions',
    AMOUNT_REQUIRED = 'Please fill amount',
    SHOP_NAME_REQUIRED = 'Shop Name is required',
    PAN_REQUIRED = 'PAN Number is required',
    MODEL_NAME_REQUIRED = 'Model Name is required',
    DOB_REQUIRED = 'Date of Birth is required',
    PAN_LENGHT = 'Please enter a valid pan card',
    CODE_REQUIRED = 'Code is required',
    MAX_CODE_LENGHT = "Sorry! code should be of 6 digits",
    ID_PROOF_REQUIRED = 'Id proof is required, please upload your id proof',
    REGISTRY_PROOF_REQUIRED = 'Registry proof is required, please upload your registry proof',
    LOGO_TYPE_REQUIRED = 'Logo Type is required, please select any image for the logo of your token',
    TOKEN_NAME_REQUIRED = 'Token name is required',
    TOKEN_SYMBOL_REQUIRED = 'Token symbol is required',
    TOKEN_SUPPLY_REQUIRED = 'Token supply is required',
    ASSET_VALUATION_REQUIRED = 'Asset valuation is required',
    ACCOUNT_NUMBER = 'Account number is required',
    CONFIRM_ACCOUNT_NUMBER = 'Confirm account number is required',
    IFSC_REQUIRED = 'IFSC number is required',
    ACCOUNT_HOLDER_NAME = 'Account holder name is required',
    OCCUPATION_PROOF_REQUIRED = 'Occupation proof is required, please upload your registry proof',
    INCOME_PROOF_REQUIRED = 'Income proof is required, please upload your registry proof',
    PROPERTY_NAME_REQUIRED = 'Property name is required',
    TOKEN_COUNT = "Token is required",
    STATE_REQUIRED = "State is required",
    ZIP_REQUIRED = "Zip code is required",
    CARD_OWNER_NAME_REQUIRED = "Name is required, please enter the name",
    CARD_NUMBER_REQUIRED = "Card number is required",
    INVALID_CARD = "Invalid Card details",
    INVALID_CVV = "Invalid CVV number",
    CVV_REQUIRED = "CVV number is required",
    OOPS = "OOPS! something went wrong, please try again"
  }
  
  export enum Toast_Messages {
    ADD = 'Data added successfully',
    EDIT_UPDATED = 'Data updated successfully',
    ERROR = 'Something went wrong!',
    SIGN_UP = 'Thank you for sign up, we have sent you an email for verification',
    VERIFED = 'Thank you for the verification, please fill your some necessary details',
    REGISTERED = 'User registered sucessfully, please login',
    WELCOME = 'Welcome to PropyEstate',
    FORGOT = 'We have sent you an email on your registered email address, please check',
    RESET = 'Your password has been changed, please login again',
    PROFILE_UPDATED = 'Your profile has been updated successfully',
    LOGOUT = 'You have been successfully logged out',
    ALREADY_REGISTERED = 'You have already been registered with us with this account',
    TOKEN_ALREADY_REGISTERED = 'The details you have entered for the token name or token symbol has already been resgitered with us, please try any other token name or token symbol',
  }
  