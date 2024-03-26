import { NavLink } from "react-router-dom";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import useNavLink from "../../hooks/useNavLink";
import "./header.css";

function AppHeader() {
  const { getIconType, isProfileActive } = useNavLink();
  return (
    <header className="header">
      <div className="header__content">
        <nav className="header__menu">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "header__link header__link_active" : "header__link"
            }
          >
            <BurgerIcon type={getIconType("/")} />
            <p className="text text_type_main-default">Конструктор</p>
          </NavLink>
          <NavLink
            to="/orders"
            className={({ isActive }) =>
              isActive ? "header__link header__link_active" : "header__link"
            }
          >
            <ListIcon type={getIconType("/orders")} />
            <p className="text text_type_main-default">Лента заказов</p>
          </NavLink>
        </nav>
        <Logo />
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? "header__link header__link_active" : "header__link"
          }
        >
          <ProfileIcon type={isProfileActive} />
          <p className="text text_type_main-default">Личный кабинет</p>
        </NavLink>
      </div>
    </header>
  );
}

export default AppHeader;
