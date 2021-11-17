export const PasswordValidator = (password: string) => {
  /* 
  One special character
  One uppercase letter
  One lowercase letter
  One digit
  8 characters minimum
  */

  const REGEX_PWD =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{8,}$/;

  if (!REGEX_PWD.test(password)) {
    return true;
  }
  return false;
};

export const EmailValidator = (email: string) => {
  const REGEX_EMAIL = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (!REGEX_EMAIL.test(email)) {
    return true;
  }
  return false;
};
