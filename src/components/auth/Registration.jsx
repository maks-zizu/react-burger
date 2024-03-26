import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import "./styles/auth.css";
import { useAuth } from "./auth";

function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });

  let { register, user } = useAuth();
  const navigate = useNavigate();

  const linkToLogin = () => {
    navigate("/login");
  };

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

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

  const onHadleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      await register({ email, password, name });
    }
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
          <p className="text text_type_main-medium">Регистрация</p>
          <Input
            value={name}
            name={"name"}
            placeholder="Имя"
            onChange={(e) => setName(e.target.value)}
            error={Boolean(errors.name)}
            errorText={errors.name}
          />
          <EmailInput
            value={email}
            name={"email"}
            onChange={(e) => setEmail(e.target.value)}
            error={Boolean(errors.email)}
            errorText={errors.email}
          />
          <PasswordInput
            value={password}
            name={"password"}
            onChange={(e) => setPassword(e.target.value)}
            error={Boolean(errors.password)}
            errorText={errors.password}
          />
          <Button htmlType="submit" type="primary" size="medium">
            Зарегистрироваться
          </Button>
        </form>
        <div className="auth_additional">
          <div className="auth_additional-text">
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
