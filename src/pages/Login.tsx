import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import authStyle from "./styles/auth.module.css";
import { useAuth } from "../services/auth/auth";
import { IAuthContextType } from "../services/auth/types";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { user, signIn } = useAuth() as IAuthContextType;

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const onHadleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (signIn) await signIn({ email, password });
  };
  const linkToForgotPassword = () => {
    navigate("/forgot-password", { state: { from: location } });
  };
  const linkToRegistration = () => {
    navigate("/register", { state: { from: location } });
  };

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, from, navigate]);

  return (
    <div className={authStyle.auth_content}>
      <div className={authStyle["auth_form-container"]}>
        <form
          onSubmit={onHadleSubmit}
          className={`${authStyle.auth_form} mb-20`}
        >
          <p className="text text_type_main-medium">Вход</p>
          <EmailInput
            value={email}
            name="email"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
          <PasswordInput
            value={password}
            autoComplete="current-password"
            name="password"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
          <Button htmlType="submit" type="primary" size="medium">
            Войти
          </Button>
        </form>
        <div className={authStyle.auth_additional}>
          <div className={authStyle["auth_additional-text"]}>
            <p className="text text_type_main-default text_color_inactive">
              Вы — новый пользователь?
            </p>
            <Button
              onClick={linkToRegistration}
              htmlType="button"
              type="secondary"
              size="medium"
            >
              Зарегистрироваться
            </Button>
          </div>
          <div className={authStyle["auth_additional-text"]}>
            <p className="text text_type_main-default text_color_inactive">
              Забыли пароль?
            </p>
            <Button
              onClick={linkToForgotPassword}
              htmlType="button"
              type="secondary"
              size="medium"
            >
              Восстановить пароль
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
