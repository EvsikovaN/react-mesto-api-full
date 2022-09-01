import logo from "../images/icons/logo.svg";
import { Route, Link, Routes } from "react-router-dom";

function Header({ email, onSignOut }) {

  return (
    <header className="header">
      <img src={logo} alt="логотип" className="header__logo" />
      <Routes>
        <Route
          path="/"
          element={
            <div className="header__tooltip">
              <p className="header__email">{email}</p>
              <button className="header__logout" onClick={onSignOut}>
                Выйти
              </button>
            </div>
          }
        ></Route>
        <Route
          path="/signin"
          element={
            <Link to="/signup" className="header__btn">
              Регистрация
            </Link>
          }
        ></Route>
        <Route
          path="/signup"
          element={
            <Link to="/signin" className="header__btn">
              Вход
            </Link>
          }
        ></Route>
      </Routes>
    </header>
  );
}

export default Header;
