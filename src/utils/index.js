const console_print_error = error => {
    if (error.response) {
        console.log(error.response.data);
    } else if (error.request) {
        console.log(error.request);
    } else {
        console.log("Error", error.message);
    }
}

export { console_print_error }

