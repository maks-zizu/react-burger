import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import authStyle from "./styles/auth.module.css";
import { useAuth } from "../services/auth/auth";
import { IAuthContextType } from "../services/auth/types";

interface IFormErrors {
  name?: string;
  email?: string;
  password?: string;
}

function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<IFormErrors>({
    name: "",
    email: "",
    password: "",
  });

  let { register, user } = useAuth() as IAuthContextType;

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const linkToLogin = () => {
    navigate("/login", { state: { from: location } });
  };

  const validateForm = () => {
    let formIsValid = true;
    let errors: IFormErrors = {};

    if (!name) {
      formIsValid = false;
      errors["name"] = "Пожалуйста, введите имя.";
    }

    if (!email) {
      formIsValid = false;
      errors["email"] = "Пожалуйста, введите email.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formIsValid = false;
      errors["email"] = "Email неверный.";
    }

    if (!password) {
      formIsValid = false;
      errors["password"] = "Пожалуйста, введите пароль.";
    } else if (password.length < 8) {
      formIsValid = false;
      errors["password"] = "Пароль должен быть длиннее 7 символов.";
    }

    setErrors(errors);
    return formIsValid;
  };

  const onHadleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      await register({ email, password, name });
    }
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
          <p className="text text_type_main-medium">Регистрация</p>
          <Input
            value={name}
            name={"name"}
            placeholder="Имя"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            error={Boolean(errors.name)}
            errorText={errors.name}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
          <Input
            value={email}
            name={"email"}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            error={Boolean(errors.email)}
            errorText={errors.email}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
          <Input
            value={password}
            name={"password"}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            error={Boolean(errors.password)}
            errorText={errors.password}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
          <Button htmlType="submit" type="primary" size="medium">
            Зарегистрироваться
          </Button>
        </form>
        <div className={authStyle.auth_additional}>
          <div className={authStyle["auth_additional-text"]}>
            <p className="text text_type_main-default text_color_inactive">
              Уже зарегистрированы?
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

export default Registration;
