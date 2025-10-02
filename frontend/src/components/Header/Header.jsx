import logo from "../../images/Vector.png";
import { Link, useLocation } from "react-router-dom";
import menu from "../../images/menu.png";
import close from "../../images/Vector_add.png";
import { useState } from "react";

function Header({ email, loggedIn, onLogout }) {
  const location = useLocation();
  const [menuOpen, setMenu] = useState(false);

  const toggleMenu = () => setMenu(!menuOpen);

  return (
    <>
      {loggedIn && menuOpen && (
        <div className="header__user-burger">
          <span className="header__email-burger">{email}</span>
          <Link
            to="/signin"
            className="header__logout-burger"
            onClick={onLogout}
          >
            Cerrar sesión
          </Link>
        </div>
      )}

      <header className="header">
        <img className="header__title" src={logo} alt="logo" />

        {loggedIn && (
          <button className="header__menu-burger" onClick={toggleMenu}>
            <img
              src={menuOpen ? close : menu}
              alt={menuOpen ? "Cerrar menú" : "Abrir menú"}
              className={`header__icon ${menuOpen ? "open" : ""}`}
            />
          </button>
        )}

        {location.pathname === "/signup" && (
          <Link to="/signin" className="header__link">
            Iniciar sesión
          </Link>
        )}

        {location.pathname === "/signin" && (
          <Link to="/signup" className="header__link">
            Regístrate
          </Link>
        )}

        {loggedIn && (
          <div className="header__user">
            <span className="header__email">{email}</span>
            <Link to="/signin" className="header__logout" onClick={onLogout}>
              Cerrar sesión
            </Link>
          </div>
        )}
      </header>
    </>
  );
}
export default Header;
