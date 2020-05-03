const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api"
    : "https://gbenga-todolist.herokuapp.com/api";

export const loginUrl = `${baseUrl}/auth/login`;
export const registrationUrl = `${baseUrl}/auth/register`;
export const forgotPasswordUrl = `${baseUrl}/auth/forgot-password`;
export const resetPasswordUrl = `${baseUrl}/auth/reset-password`;
export const allTodosUrl = `${baseUrl}/todos`;
export const allArchivedTodosUrl = `${baseUrl}/archived/todos`;
export const profileUrl = `${baseUrl}/user/profile`;
export const profilePictureUrl = `${baseUrl}/photo/upload`;
export const changePasswordUrl = `${baseUrl}/user/change-password`;
