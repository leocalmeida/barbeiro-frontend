import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import api from "../../services/api";
import "./styles.css";
import "../Styles/global.css";

export default function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const falso = false;
  const [cabelereiro, setCabelereiro] = useState(falso);

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      nome,
      email,
      senha,
      cabelereiro,
    };

    try {
      await api.post("signup", data);
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
          value={nome}
          onChange={(e) => setNome(e.target.value)}
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
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <p className="valida">
          <input
            type="checkbox"
            value={cabelereiro}
            onChange={(e) => setCabelereiro(true)}
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
