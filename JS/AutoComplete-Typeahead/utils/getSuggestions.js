import { FRUITS } from "../data/data";

export const getSuggestions = (inputVal) => {
  const result = FRUITS.filter(
    (item) =>
      item.substring(0, inputVal.length).toLowerCase() ===
      inputVal.toLowerCase()
  );
  return new Promise((resolve, reject) => {
    if (result) {
      setTimeout(() => {
        resolve(result);
      }, 1000);
    }
  });
};
