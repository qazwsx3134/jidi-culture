export const shuffle = (arr: any[]) => {
  let len = arr.length;
  while (len) {
    const i = Math.floor(Math.random() * len--);
    [arr[i], arr[len]] = [arr[len], arr[i]];
  }
  return arr;
};
