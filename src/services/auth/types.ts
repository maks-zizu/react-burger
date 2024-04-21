import { ReactNode } from "react";
import { IUser } from "../types";

export interface ILoginForm {
  email: string;
  password: string;
}

export interface IRegisterForm {
  name: string;
  email: string;
  password: string;
}

export interface IFogotForm extends Omit<ILoginForm, "password"> {}

export interface IResetForm extends Omit<ILoginForm, "email"> {
  token: string;
}

export interface ILoginForm {
  email: string;
  password: string;
}

export interface IAuthContextType {
  user: IUser | null;
  initUser: () => Promise<void>;
  updateUserData: (updateForm: any) => Promise<boolean>;
  signIn: (loginForm: ILoginForm) => Promise<void>;
  register: (registerForm: IRegisterForm) => Promise<void>;
  signOut: () => Promise<void>;
  forgotPass: (fogotForm: IFogotForm) => Promise<boolean>;
  resetPass: (resetForm: IResetForm) => Promise<boolean>;
  isLoggedIn: boolean;
}

export interface IProvideAuthProps {
  children: ReactNode;
}

export interface IProtectedRouteProps {
  children: ReactNode;
  anonymous?: boolean;
}
