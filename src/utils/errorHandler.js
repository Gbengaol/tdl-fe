export const errorHandler = (error) => {
  if (error.response) {
    return error.response.data.message;
  } else if (error.request) {
    return error.request;
  } else {
    return error.message;
  }
};
