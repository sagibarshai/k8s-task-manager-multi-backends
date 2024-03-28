export const isPassword = (text: string): boolean => {
  if (text.length >= 6) return true;
  return false;
};
