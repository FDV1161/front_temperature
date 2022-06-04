export const console_print_error = (error) => {
  if (error.response) {
    console.log(error.response.data);
  } else if (error.request) {
    console.log(error.request);
  } else {
    console.log("Error", error.message);
  }
};

export const dictFromArray = (arr, key) =>
  arr.reduce((a, v) => ({ ...a, [v[key]]: v }), {});

export const calcMaxValue = (arrayOfValues) => {
  if (!arrayOfValues || !arrayOfValues.length) {
    return null;
  }
  return Math.max(...arrayOfValues).toFixed(2);
};

export const calcMinValue = (arrayOfValues) => {
  if (!arrayOfValues || !arrayOfValues.length) {
    return null;
  }
  return Math.min(...arrayOfValues).toFixed(2);
};

export const calcAvgValue = (arrayOfValues) => {
  if (!arrayOfValues || arrayOfValues.length < 2) {
    return null;
  }
  return (
    arrayOfValues.reduce((a, b, index) => {
      return a + b;
    }) / arrayOfValues.length
  ).toFixed(2);
};

export const toFixedNumber = (value) => {
  if (value) {
    return value.toFixed(2);
  }
  return value;
};
