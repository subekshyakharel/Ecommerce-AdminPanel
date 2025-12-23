export const validator = (password = "", confirmPassword = "") => {
  const error = [];
  password !== confirmPassword && error.push("Passoword donot match");
  return error;
};
