import React, { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import authStyle from "./styles/auth.module.css";
import { useAuth } from "../services/auth/auth";
import { IAuthContextType } from "../services/auth/types";

function ResetPassword() {
  const { resetPass } = useAuth() as IAuthContextType;
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const linkToLogin = () => {
    navigate("/login", { state: { from: location } });
  };

  const onHadleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isSend = await resetPass({ token, password });
    if (isSend) linkToLogin();
  };

  return (
    <div className={authStyle.auth_content}>
      <div className={authStyle["auth_form-container"]}>
        <form
          onSubmit={onHadleSubmit}
          className={`${authStyle.auth_form} mb-20`}
        >
          <p className="text text_type_main-medium">Восстановление пароля</p>
          <PasswordInput
            value={password}
            name={"password"}
            placeholder="Введите новый пароль"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
          <Input
            value={token}
            name={"token"}
            placeholder="Введите код из письма"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setToken(e.target.value)
            }
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
          <Button htmlType="submit" type="primary" size="medium">
            Сохранить
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

export default ResetPassword;
