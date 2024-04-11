import React, { FormEvent, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import authStyle from "./styles/auth.module.css";
import { useAuth } from "../services/auth/auth";
import { IAuthContextType } from "../services/auth/types";

function ForgotPassword() {
  const { forgotPass } = useAuth() as IAuthContextType;
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const onHadleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const isSend = await forgotPass({ email });
    if (isSend) navigate("/reset-password", { state: { from: location } });
  };

  const linkToLogin = () => {
    navigate("/login", { state: { from: location } });
  };

  return (
    <div className={authStyle.auth_content}>
      <div className={authStyle["auth_form-container"]}>
        <form
          onSubmit={onHadleSubmit}
          className={`${authStyle.auth_form} mb-20`}
        >
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
        <div className={authStyle.auth_additional}>
          <div className={authStyle["auth_additional-text"]}>
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
