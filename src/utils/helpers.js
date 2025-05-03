const charSet =
  "abcdefghijlkmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const maxRandomNumber = (max) => {
  return Math.floor(Math.random() * max);
};

export const getRandomString = (length) => {
  let random_string = "";
  for (let i = 0; i < length; i++) {
    random_string += charSet[maxRandomNumber(charSet.length - 1)];
  }

  return random_string;
};
