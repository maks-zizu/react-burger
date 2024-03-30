import { BASE_URL } from "../template";

const AUTH_URL = `${BASE_URL}/auth`;

export const loginRequest = async (loginForm) => {
  return await fetch(`${AUTH_URL}/login`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(loginForm),
  });
};

export const registerRequest = async (registerForm) => {
  return await fetch(`${AUTH_URL}/register`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(registerForm),
  });
};

export const logoutRequest = async () => {
  return await fetch(`${AUTH_URL}/logout`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
  });
};

export const getUser = async () =>
  await fetch(`${AUTH_URL}/user`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken"),
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });

export const patchUpdateUser = async (updateForm) =>
  await fetch(`${AUTH_URL}/user`, {
    method: "PATCH",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken"),
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(updateForm),
  });

export const postRefreshAccessToken = async () =>
  await fetch(`${AUTH_URL}/token`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
  });

export const postForgotPassword = async (forgotForm) => {
  return await fetch(`${BASE_URL}/password-reset`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(forgotForm),
  });
};

export const postResetPassword = async (resetForm) => {
  return await fetch(`${BASE_URL}/password-reset/reset`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(resetForm),
  });
};
