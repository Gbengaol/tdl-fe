import axios from "axios";
import {
  loginUrl,
  registrationUrl,
  allTodosUrl,
  profileUrl,
  changePasswordUrl,
  allArchivedTodosUrl,
  forgotPasswordUrl,
  resetPasswordUrl,
  profilePictureUrl,
} from "./apiUrls";

const token = () => {
  return JSON.parse(localStorage.getItem("todoListStorage")).token;
};

export const loginEndpoint = async (reqBody) => {
  const data = await axios({
    method: "POST",
    data: reqBody,
    url: loginUrl,
  });
  return data;
};

export const registrationEndpoint = async (reqBody) => {
  const data = await axios({
    method: "POST",
    data: reqBody,
    url: registrationUrl,
  });
  return data;
};

export const forgotPasswordEndpoint = async (reqBody) => {
  const data = await axios({
    method: "POST",
    data: reqBody,
    url: forgotPasswordUrl,
  });
  return data;
};

export const resetPasswordEndpoint = async (reqBody, token) => {
  const data = await axios({
    method: "POST",
    data: reqBody,
    url: `${resetPasswordUrl}/${token}`,
  });
  return data;
};

export const getProfileEndpoint = async () => {
  const data = await axios({
    method: "GET",
    url: profileUrl,
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  });
  return data;
};

export const updateProfileEndpoint = async (reqBody) => {
  const data = await axios({
    method: "PATCH",
    url: profileUrl,
    data: reqBody,
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  });
  return data;
};

export const updateProfilePictureEndpoint = async (reqBody) => {
  const data = await axios({
    method: "PATCH",
    url: profilePictureUrl,
    data: reqBody,
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  });
  return data;
};

export const getAllTodosEndPoint = async (size, page, search, completed) => {
  const data = await axios({
    method: "GET",
    url: `${allTodosUrl}?size=${size}&page=${search ? 1 : page}&search=${
      search || ""
    }&completed=${completed}`,
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  });
  return data;
};

export const getArchivedTodosEndPoint = async (size, page, search) => {
  const data = await axios({
    method: "GET",
    url: `${allArchivedTodosUrl}?size=${size}&page=${
      search ? 1 : page
    }&search=${search || ""}`,
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  });
  return data;
};

export const addATodoEndPoint = async (reqBody) => {
  const data = await axios({
    method: "POST",
    url: allTodosUrl,
    data: reqBody,
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  });
  return data;
};

export const editATodoEndPoint = async (reqBody, id) => {
  const data = await axios({
    method: "PUT",
    url: `${allTodosUrl}/${id}`,
    data: reqBody,
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  });
  return data;
};

export const deleteATodoEndPoint = async (id) => {
  const data = await axios({
    method: "DELETE",
    url: `${allTodosUrl}/${id}`,
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  });
  return data;
};

export const archiveATodoEndPoint = async (id) => {
  const data = await axios({
    method: "PATCH",
    url: `${allTodosUrl}/${id}?status=true`,
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  });
  return data;
};

export const unarchiveATodoEndPoint = async (id) => {
  const data = await axios({
    method: "PATCH",
    url: `${allTodosUrl}/${id}?status=false`,
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  });
  return data;
};

export const changePasswordEndPoint = async (reqBody) => {
  const data = await axios({
    method: "POST",
    data: reqBody,
    url: `${changePasswordUrl}`,
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  });
  return data;
};
