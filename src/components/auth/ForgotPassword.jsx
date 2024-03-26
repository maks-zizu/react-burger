import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import "./styles/auth.css";
import { useAuth } from "./auth";

function ForgotPassword() {
  const { forgotPass } = useAuth();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const onHadleSubmit = async (e) => {
    e.preventDefault();
    const isSend = await forgotPass({ email });
    if (isSend) navigate("/reset-password");
  };

  const linkToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="auth_content">
      <div className="auth_form-container">
        <form onSubmit={onHadleSubmit} className="auth_form mb-20">
          <p className="text text_type_main-medium">Восстановление пароля</p>
          <EmailInput
            value={email}
            name={"email"}
            placeholder="Укажите e-mail"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button htmlType="submit" type="primary" size="medium">
            Восстановить
          </Button>
        </form>
        <div className="auth_additional">
          <div className="auth_additional-text">
            <p className="text text_type_main-default text_color_inactive">
              Вспомнили пароль?
            </p>
            <Button
              onClick={linkToLogin}
              htmlType="button"
              type="secondary"
              size="medium"
            >
              Войти
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
