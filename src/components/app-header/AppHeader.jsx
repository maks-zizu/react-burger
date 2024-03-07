import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import './header.css';

function AppHeader() {
  return (
    <header className="header">
      <div className="header__content">
        <nav className="header__menu">
          <a href="#" className="header__link header__link_active">
            <BurgerIcon type="primary" />
            <p className="text text_type_main-default">Конструктор</p>
          </a>
          <a href="#" className="header__link">
            <ListIcon type="secondary" />
            <p className="text text_type_main-default">Лента заказов</p>
          </a>
        </nav>
        <Logo />
        <a href="#" className="header__link">
          <ProfileIcon type="secondary" />
          <p className="text text_type_main-default">Личный кабинет</p>
        </a>
      </div>
    </header>
  );
}

export default AppHeader;
