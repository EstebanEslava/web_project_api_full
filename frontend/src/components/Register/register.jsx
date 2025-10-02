import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const location = useLocation();

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(email, password);
  }

  return (
    <form onSubmit={handleSubmit} className="register__form">
      <h2 className="register__title">Regístrate</h2>
      <input
        className="register__input"
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        className="register__input"
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button className="register__btn-submit" type="submit">
        Regístrate
      </button>

      {location.pathname === "/signup" && (
        <Link to="/signin" className="login__text">
          ¿Ya eres miembro? Inicia sesión aquí
        </Link>
      )}
    </form>
  );
}

export default Register;
