export const isEmail = (text: string): boolean => {
  const EMAIL_RGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (text.match(EMAIL_RGEX)) return true;
  return false;
};
