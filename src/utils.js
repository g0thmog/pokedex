export const toFirstCharUppercase = (string) =>
  string && string[0].toUpperCase() + string.slice(1);

export const hgToKg = (weight) => weight / 10;

export const dcToFt = (height) => (height / 3.048).toFixed(2);
