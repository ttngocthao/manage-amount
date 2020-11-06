export const sortArray = (arr, sortCategory, desc) => {
  function compare(a, b) {
    let comparison = 0;
    if (a[sortCategory] > b[sortCategory]) comparison = 1;
    if (b[sortCategory] > a[sortCategory]) comparison = -1;
    if (desc) comparison = comparison * -1;
    return comparison;
  }

  return arr.sort(compare);
};
