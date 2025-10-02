import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const location = useLocation();

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(email, password);
  }

  return (
    <form onSubmit={handleSubmit} className="login__form">
      <h2 className="login__title">Iniciar sesión</h2>
      <input
        className="login__input"
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className="login__input"
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button className="login__btn-submit" type="submit">
        Entrar
      </button>

      {location.pathname === "/signin" && (
        <Link to="/signup" className="login__text">
          ¿Aún no eres miembro? Regístrate aquí
        </Link>
      )}
    </form>
  );
}

export default Login;
