import { useContext, useState, createContext } from "react";
import {
  postForgotPassword,
  getUser,
  loginRequest,
  logoutRequest,
  postRefreshAccessToken,
  registerRequest,
  postResetPassword,
  patchUpdateUser,
} from "./api";
import { useLocation, Navigate } from "react-router-dom";

const AuthContext = createContext(undefined);

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  const location = useLocation();
  const token = localStorage.getItem("accessToken");

  return (auth.user && token) || !location.pathname.includes("/profile") ? (
    <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export function useProvideAuth() {
  const [user, setUser] = useState(null);

  const initUser = async () => {
    try {
      let res = await getUser();
      if (res.status === 403) {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) res = await getUser();
      }
      if (!res.ok) {
        throw new Error("Ошибка при получении данных пользователя");
      }
      const { success, user } = await res.json();
      if (success) {
        setUser({ ...user });
        return success;
      }
    } catch (error) {
      console.error("Ошибка при получении данных пользователя:", error);
    }
  };

  const updateUserData = async (updateForm) => {
    try {
      let res = await patchUpdateUser(updateForm);
      if (res.status === 403) {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) res = await patchUpdateUser(updateForm);
      }
      if (!res.ok) {
        throw new Error("Ошибка при обновлении данных пользователя");
      }
      const { success, user } = await res.json();
      if (success) {
        setUser({ ...user });
        return success;
      }
    } catch (error) {
      console.error("Ошибка при обновлении данных пользователя:", error);
    }
  };

  const signIn = async (loginForm) => {
    const res = await loginRequest(loginForm);
    const data = await res.json();
    if (data.success) {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      initUser();
    }
  };

  const register = async (registerForm) => {
    const res = await registerRequest(registerForm);
    const data = await res.json();
    if (data.success) {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      initUser();
    }
  };

  const signOut = async () => {
    const res = await logoutRequest();
    const data = await res.json();
    if (data.success) {
      setUser(null);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
  };

  const forgotPass = async () => {
    const res = await postForgotPassword();
    const { success } = await res.json();
    if (success) return success;
  };

  const resetPass = async () => {
    const res = await postResetPassword();
    const { success } = await res.json();
    if (success) return success;
  };

  const refreshAccessToken = async () => {
    try {
      const res = await postRefreshAccessToken();
      if (!res.ok) {
        throw new Error("Не удалось обновить accessToken");
      }
      const data = await res.json();
      localStorage.setItem("accessToken", data.accessToken);
      return data.accessToken;
    } catch (error) {
      console.error("Ошибка при обновлении accessToken:", error);
    }
  };

  return {
    user,
    initUser,
    updateUserData,
    signIn,
    register,
    signOut,
    forgotPass,
    resetPass,
  };
}
