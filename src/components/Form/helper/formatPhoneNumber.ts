export const formatPhoneNumber = (number: string): string => {
  const areaCode = number.slice(0, 3);
  const prefix = number.slice(3, 6);
  const local = number.slice(6);
  return `(${areaCode}) ${prefix}-${local}`;
};
