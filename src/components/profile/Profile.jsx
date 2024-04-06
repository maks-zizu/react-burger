import React, { useRef, useState } from "react";
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import profileStyle from "./styles/profile.module.css";
import { useAuth } from "../../services/auth/auth";

function Profile() {
  const { user, updateUserData } = useAuth();
  const inputRef = useRef(null);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("password");

  const onIconClick = () => {
    inputRef.current.disabled = false;
    inputRef.current.classList.value =
      "text input__textfield text_type_main-default";
    inputRef.current.focus();
  };

  const onBlur = () => {
    inputRef.current.disabled = true;
    inputRef.current.classList.value =
      "text input__textfield text_type_main-default input__textfield-disabled";
  };

  const onHadleSubmit = async (e) => {
    e.preventDefault();
    await updateUserData({ name, email });
  };

  const onHadleReset = () => {
    setName(user?.name);
    setEmail(user?.email);
    setPassword("password");
  };

  return (
    <div className={profileStyle.profile_content}>
      <div className={profileStyle["profile_form-container"]}>
        <form
          onSubmit={onHadleSubmit}
          className={`${profileStyle.profile_form} mb-20`}
        >
          <Input
            value={name}
            name={"name"}
            placeholder="Имя"
            icon="EditIcon"
            ref={inputRef}
            type={"text"}
            disabled
            onBlur={onBlur}
            onIconClick={onIconClick}
            onChange={(e) => setName(e.target.value)}
          />
          <EmailInput
            value={email}
            name={"email"}
            placeholder="Логин"
            isIcon
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput
            value={password}
            name={"password"}
            placeholder="Пароль"
            icon="EditIcon"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className={profileStyle["profile_form-buttons"]}>
            <Button
              onClick={onHadleReset}
              htmlType="reset"
              type="secondary"
              size="medium"
            >
              Отменить
            </Button>
            <Button htmlType="submit" type="primary" size="medium">
              Сохранить
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
