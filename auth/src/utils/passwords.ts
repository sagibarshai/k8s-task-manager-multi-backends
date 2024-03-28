import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(Number(process.env.SALT));

export const toHash = (password: string) => {
  const encrypted = bcrypt.hashSync(password, salt);
  return encrypted;
};

export const compare = (password: string, encrypted: string) => {
  const isEqual = bcrypt.compareSync(password, encrypted);
  return isEqual;
};
