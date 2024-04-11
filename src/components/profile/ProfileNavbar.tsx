import { useAuth } from "../../services/auth/auth";
import { IAuthContextType } from "../../services/auth/types";
import profileNavbarStyle from "./styles/profileNavbar.module.css";
import {
  Link,
  useMatch,
  useNavigate,
  Outlet,
  useLocation,
} from "react-router-dom";

function ProfileNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut } = useAuth() as IAuthContextType;

  const linkToLogout = () => {
    signOut().then(() => {
      navigate("/login", { replace: true });
    });
  };

  return (
    <div className={profileNavbarStyle.profile__navbar}>
      <div className={profileNavbarStyle["profile__navbar-content"]}>
        <nav className={profileNavbarStyle.profile__menu}>
          <Link
            to="/profile"
            state={{ from: location }}
            className={
              useMatch("/profile")
                ? `${profileNavbarStyle.profile__link} ${profileNavbarStyle.profile__link_active}`
                : `${profileNavbarStyle.profile__link}`
            }
          >
            <p className="text text_type_main-medium">Профиль</p>
          </Link>
          <Link
            to="/profile/order"
            state={{ from: location }}
            className={
              useMatch("/profile/order")
                ? `${profileNavbarStyle.profile__link} ${profileNavbarStyle.profile__link_active}`
                : `${profileNavbarStyle.profile__link}`
            }
          >
            <p className="text text_type_main-medium">История заказов</p>
          </Link>
          <Link
            onClick={linkToLogout}
            to=""
            className={profileNavbarStyle.profile__link}
          >
            <p className="text text_type_main-medium">Выход</p>
          </Link>
        </nav>
        <div className={profileNavbarStyle.profile_additional}>
          <p className="text text_type_main-default text_color_inactive">
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default ProfileNavbar;
