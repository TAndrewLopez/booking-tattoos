const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

export const formatPhoneNumber = (phoneNumber: string) => {
  const areaCode = phoneNumber.slice(0, 3);
  const prefix = phoneNumber.slice(3, 6);
  const localExchange = phoneNumber.slice(6);
  return `(${areaCode}) ${prefix}-${localExchange}`;
};

export const stripPhoneNumber = (phoneNumber: string) => {
  return phoneNumber.split("").reduce((acc, el) => {
    if (numbers.includes(el)) {
      acc += el;
    }
    return acc;
  }, "");
};

export const validateNumber = (val: string): boolean => {
  if (stripPhoneNumber(val).length < 10) return false;
  return true;
};

export const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
