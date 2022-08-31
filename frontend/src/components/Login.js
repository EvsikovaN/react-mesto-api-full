import React from "react";
import { useState } from "react";

const Login = ({onLogin}) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((oldData) => ({ ...oldData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = data;
    onLogin(email,password)
  };

  return (
    <>
      <section className="auth">
        <form className="auth__form" action="#" method="post" onSubmit={handleSubmit}>
          <h2 className="auth__title">Вход</h2>
          <section className="auth__form-section">
            <input
              className="auth__input auth__input_type_email"
              type="email"
              name="email"
              placeholder="Email"
              value={data.email}
              onChange={handleChange}
              minLength="2"
              maxLength="40"
              required
            />
          </section>
          <section className="auth__form-section">
            <input
              className="auth__input popup__input_type_password"
              type="password"
              name="password"
              placeholder="Пароль"
              minLength="2"
              maxLength="200"
              value={data.password}
              onChange={handleChange}
              required
            />
          </section>
          <button type="submit" className="auth__save">
            Войти
          </button>
        </form>
      </section>
    </>
  );
};

export default Login;
