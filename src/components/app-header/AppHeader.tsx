import { NavLink, useLocation } from "react-router-dom";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import useNavLink from "../../hooks/useNavLink";
import headerStyle from "./header.module.css";
import { TIconTypes } from "./types";

function AppHeader() {
  const { getIconType, isProfileActive } = useNavLink();
  const location = useLocation();
  return (
    <header className={headerStyle.header}>
      <div className={headerStyle.header__content}>
        <nav className={headerStyle.header__menu}>
          <NavLink
            to="/"
            state={{ from: location }}
            className={({ isActive }) =>
              isActive
                ? `${headerStyle.header__link} ${headerStyle.header__link_active}`
                : `${headerStyle.header__link}`
            }
          >
            <BurgerIcon type={getIconType("/")} />
            <p className="text text_type_main-default">Конструктор</p>
          </NavLink>
          <NavLink
            to="/feed"
            state={{ from: location }}
            className={({ isActive }) =>
              isActive
                ? `${headerStyle.header__link} ${headerStyle.header__link_active}`
                : `${headerStyle.header__link}`
            }
          >
            <ListIcon type={getIconType("/feed")} />
            <p className="text text_type_main-default">Лента заказов</p>
          </NavLink>
        </nav>
        <Logo />
        <NavLink
          to="/profile"
          state={{ from: location }}
          className={({ isActive }) =>
            isActive
              ? `${headerStyle.header__link} ${headerStyle.header__link_active}`
              : `${headerStyle.header__link}`
          }
        >
          <ProfileIcon type={isProfileActive as TIconTypes} />
          <p className="text text_type_main-default">Личный кабинет</p>
        </NavLink>
      </div>
    </header>
  );
}

export default AppHeader;
