export const isValidMobileNo = (mobileNo) => {
  return !!mobileNo.match(
    /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/g
  );
};

export const isValidOTP = (OTP) => {
  return !!OTP.match(/^\d{6}$/g);
};
