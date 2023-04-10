const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

export const validateNumber = (val: string): boolean => {
  if (val.length < 10) return false;

  return val.split("").reduce((acc, el) => {
    if (numbers.includes(el)) return acc;
    return false;
  }, true);
};

export const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const validateSize = (val: string): boolean => {
  for (let i = 0; i < val.length; i++) {
    const char = val[i];
    if (char && !numbers.includes(char)) {
      return false;
    }
  }
  return true;
};
