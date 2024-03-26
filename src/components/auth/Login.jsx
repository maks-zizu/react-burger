import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import "./styles/auth.css";
import { useAuth } from "./auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, signIn } = useAuth();
  const navigate = useNavigate();

  const onHadleSubmit = async (e) => {
    e.preventDefault();
    await signIn({ email, password });
  };
  const linkToForgotPassword = () => {
    navigate("/forgot-password");
  };
  const linkToRegistration = () => {
    navigate("/register");
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="auth_content">
      <div className="auth_form-container">
        <form onSubmit={onHadleSubmit} className="auth_form mb-20">
          <p className="text text_type_main-medium">Вход</p>
          <EmailInput
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput
            value={password}
            autoComplete="current-password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button htmlType="submit" type="primary" size="medium">
            Войти
          </Button>
        </form>
        <div className="auth_additional">
          <div className="auth_additional-text">
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
          <div className="auth_additional-text">
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
