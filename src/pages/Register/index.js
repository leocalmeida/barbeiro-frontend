import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import api from "../../services/api";
import "./styles.css";
import "../Styles/global.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const falso = false;
  const [provider, setProvider] = useState(falso);

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      name,
      email,
      password,
      provider,
    };

    try {
      // await api.post("signup", data);
      await api.post("signupteste", data);

      alert("Usuário cadastrado com sucesso");
      history.push("/");
    } catch (error) {
      console.log(error);
      alert("Falha ao criar usuários");
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleRegister}>
        <header>
          <img src={Logo} alt="Logo" />
        </header>
        <input
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <p className="valida">
          <input
            type="checkbox"
            value={provider}
            onChange={(e) => setProvider(true)}
          />
          <span>É cabelereiro?</span>
        </p>

        <button type="submit">Cadastrar</button>
        <Link className="Link" to="/">
          Voltar
        </Link>
      </form>
    </div>
  );
}
