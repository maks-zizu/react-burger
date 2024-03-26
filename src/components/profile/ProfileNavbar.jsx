import { useAuth } from "../auth/auth";
import "./styles/profileNavbar.css";
import { Link, useMatch, useNavigate, Outlet } from "react-router-dom";

function ProfileNavbar() {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const linkToLogout = () => {
    signOut().then(() => {
      navigate("/login", { replace: true });
    });
  };

  return (
    <div className="profile__navbar">
      <div className="profile__navbar-content">
        <nav className="profile__menu">
          <Link
            to="/profile"
            className={
              useMatch("/profile")
                ? "profile__link profile__link_active"
                : "profile__link"
            }
          >
            <p className="text text_type_main-medium">Профиль</p>
          </Link>
          <Link
            to="/profile/order"
            className={
              useMatch("/profile/order")
                ? "profile__link profile__link_active"
                : "profile__link"
            }
          >
            <p className="text text_type_main-medium">История заказов</p>
          </Link>
          <Link onClick={linkToLogout} to="" className="profile__link">
            <p className="text text_type_main-medium">Выход</p>
          </Link>
        </nav>
        <div className="profile_additional">
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
