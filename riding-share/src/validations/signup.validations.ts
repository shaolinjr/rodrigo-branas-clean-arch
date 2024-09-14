// NOTE: Maybe we should create a separate file for these validations.
export const validateName = (name: string) => {
  // Only letters and spaces
  if (/[^A-Z\s]/gi.test(name)) return false;
  // At least two words
  if (/(?:[a-zA-Z]+\s+)+(?:[a-zA-Z]+\s*)+/i.test(name)) return true;

  return false;
};

export const validateEmail = (email: string) =>
  /^(.+)@([a-z0-9]+)([.]{1}[a-z0-9]{2,})*([.]{1}[a-z]{2,})+$/.test(email);

export const validateCarPlate = (carPlate: string) =>
  /^[A-Z]{3}[0-9]{4}$/.test(carPlate);
