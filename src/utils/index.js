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
