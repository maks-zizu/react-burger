import {
  useContext,
  useState,
  createContext,
  useEffect,
  ReactElement,
} from "react";
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
import {
  IAuthContextType,
  IFogotForm,
  ILoginForm,
  IProtectedRouteProps,
  IProvideAuthProps,
  IRegisterForm,
  IResetForm,
} from "./types";

export const AuthContext = createContext<IAuthContextType | undefined>(
  undefined
);

export function useAuth() {
  return useContext(AuthContext);
}

export function ProvideAuth({ children }: IProvideAuthProps): ReactElement {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function ProtectedRoute({
  children,
  anonymous = false,
}: IProtectedRouteProps): ReactElement {
  const location = useLocation();
  const auth = useAuth();
  const isLoggedIn = auth?.isLoggedIn || false;
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

  return <>{children}</>;
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
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
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
    } catch (err) {
      const error = err as Error;
      enqueueSnackbar(
        `Ошибка при получении данных пользователя: ${error.message}`
      );
      setUser(null);
    }
  };

  const updateUserData = async (updateForm: IRegisterForm) => {
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
    } catch (err) {
      const error = err as Error;
      enqueueSnackbar(
        `Ошибка при обновлении данных пользователя: ${error.message}`
      );
      setUser(null);
    }
  };

  const signIn = async (loginForm: ILoginForm) => {
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
    } catch (err) {
      const error = err as Error;
      enqueueSnackbar(`Ошибка входа: ${error.message}`);
    }
  };

  const register = async (registerForm: IRegisterForm) => {
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
    } catch (err) {
      const error = err as Error;
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
    } catch (err) {
      const error = err as Error;
      enqueueSnackbar(`Ошибка: ${error.message}`);
    }
  };

  const forgotPass = async (forgotForm: IFogotForm) => {
    try {
      const res = await postForgotPassword(forgotForm);
      if (!res.ok) {
        const { message } = await res.json();
        if (message) {
          throw new Error(message);
        }
        throw new Error(`ошибка ${res.status}`);
      }
      const { success } = await res.json();
      if (success) return success;
    } catch (err) {
      const error = err as Error;
      enqueueSnackbar(`Ошибка: ${error.message}`);
    }
  };

  const resetPass = async (resetForm: IResetForm) => {
    try {
      const res = await postResetPassword(resetForm);
      if (!res.ok) {
        const { message } = await res.json();
        if (message) {
          throw new Error(message);
        }
        throw new Error(`ошибка ${res.status}`);
      }
      const { success } = await res.json();
      if (success) return success;
    } catch (err) {
      const error = err as Error;
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
    } catch (err) {
      const error = err as Error;
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
