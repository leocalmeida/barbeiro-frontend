import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./styles.css";
import "../Styles/global.css";
import Logo from "../../assets/logo.svg";
import api from "../../services/api";

export default function Principal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    try {
      const response = await api.post("signin", data);
      console.log(response);

      if (response.data !== "Senha Inválida") {
        sessionStorage.setItem("id", response.data._id);
        sessionStorage.setItem("name", response.data.name);

        history.push("/dashboard");
      } else {
        alert("Dados de acesso inválidos");
      }
    } catch (error) {
      console.log(error);
      alert("Ocorreu um problema, tente novamente mais tarde");
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleLogin}>
        <header>
          <img src={Logo} alt="Logo" />
        </header>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <Link className="Link" to="/register">
          Cadastrar-se
        </Link>
      </form>
    </div>
  );
}
