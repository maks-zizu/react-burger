import { useContext, useState, createContext, useEffect } from "react";
import {
  postForgotPassword,
  getUser,
  loginRequest,
  logoutRequest,
  postRefreshAccessToken,
  registerRequest,
  postResetPassword,
  patchUpdateUser,
} from "./authApi";
import { useLocation, Navigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

const AuthContext = createContext(undefined);

export function useAuth() {
  return useContext(AuthContext);
}

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function ProtectedRoute({ children, anonymous = false }) {
  const location = useLocation();
  const { isLoggedIn } = useAuth();
  const token = localStorage.getItem("accessToken");

  const from = location.state?.from?.pathname || "/";
  const isPathReset = location.pathname === "/reset-password";
  const isLoggedInAccess =
    location.pathname === "/reset-password" ||
    location.pathname === "/forgot-password" ||
    location.pathname === "/register" ||
    location.pathname === "/login";

  if (!isLoggedIn && !!token) return <></>;

  if (isLoggedIn && !!token && isLoggedInAccess) {
    return <Navigate to={from} />;
  }

  if (from !== "/forgot-password" && isPathReset) {
    return <Navigate to={"/forgot-password"} />;
  }

  if (anonymous && isLoggedIn) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        await initUser();
      }
    };
    initAuth();
  }, []);

  const initUser = async () => {
    try {
      let res = await getUser();
      if (res.status === 403) {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) res = await getUser();
      }
      if (!res.ok) {
        const { message } = await res.json();
        if (message) {
          throw new Error(message);
        }
        throw new Error(`ошибка ${res.status}`);
      }
      const { success, user } = await res.json();
      if (success) {
        setUser({ ...user });
        setIsLoggedIn(true);
        return success;
      }
    } catch (error) {
      enqueueSnackbar(
        `Ошибка при получении данных пользователя: ${error.message}`
      );
      setUser(null);
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
        const { message } = await res.json();
        if (message) {
          throw new Error(message);
        }
        throw new Error(`ошибка ${res.status}`);
      }
      const { success, user } = await res.json();
      if (success) {
        setUser({ ...user });
        return success;
      }
    } catch (error) {
      enqueueSnackbar(
        `Ошибка при обновлении данных пользователя: ${error.message}`
      );
      setUser(null);
    }
  };

  const signIn = async (loginForm) => {
    try {
      const res = await loginRequest(loginForm);
      if (!res.ok) {
        const { message } = await res.json();
        if (message) {
          throw new Error(message);
        }
        throw new Error(`ошибка ${res.status}`);
      }
      const data = await res.json();
      if (data.success) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        initUser();
      }
    } catch (error) {
      enqueueSnackbar(`Ошибка входа: ${error.message}`);
    }
  };

  const register = async (registerForm) => {
    try {
      const res = await registerRequest(registerForm);
      if (!res.ok) {
        const { message } = await res.json();
        if (message) {
          throw new Error(message);
        }
        throw new Error(`ошибка ${res.status}`);
      }
      const data = await res.json();
      if (data.success) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        initUser();
      }
    } catch (error) {
      enqueueSnackbar(`Ошибка регистрации: ${error.message}`);
    }
  };

  const signOut = async () => {
    try {
      const res = await logoutRequest();
      if (!res.ok) {
        const { message } = await res.json();
        if (message) {
          throw new Error(message);
        }
        throw new Error(`ошибка ${res.status}`);
      }
      const { success } = await res.json();
      if (success) {
        setUser(null);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setIsLoggedIn(false);
      }
    } catch (error) {
      enqueueSnackbar(`Ошибка: ${error.message}`);
    }
  };

  const forgotPass = async () => {
    try {
      const res = await postForgotPassword();
      if (!res.ok) {
        const { message } = await res.json();
        if (message) {
          throw new Error(message);
        }
        throw new Error(`ошибка ${res.status}`);
      }
      const { success } = await res.json();
      if (success) return success;
    } catch (error) {
      enqueueSnackbar(`Ошибка: ${error.message}`);
    }
  };

  const resetPass = async () => {
    try {
      const res = await postResetPassword();
      if (!res.ok) {
        const { message } = await res.json();
        if (message) {
          throw new Error(message);
        }
        throw new Error(`ошибка ${res.status}`);
      }
      const { success } = await res.json();
      if (success) return success;
    } catch (error) {
      enqueueSnackbar(`Ошибка: ${error.message}`);
    }
  };

  const refreshAccessToken = async () => {
    try {
      const res = await postRefreshAccessToken();
      if (!res.ok) {
        const { message } = await res.json();
        if (message) {
          throw new Error(message);
        }
        throw new Error(`ошибка ${res.status}`);
      }
      const { accessToken } = await res.json();
      localStorage.setItem("accessToken", accessToken);
      return accessToken;
    } catch (error) {
      enqueueSnackbar(`Ошибка при обновлении accessToken: ${error.message}`);
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
    isLoggedIn,
  };
}
