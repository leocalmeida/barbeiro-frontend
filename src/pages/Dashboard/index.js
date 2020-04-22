import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { FiPower } from "react-icons/fi";
import Logo from "../../assets/logo.svg";
import Avatar from "../../assets/avatar.svg";
import "../Styles/global.css";
import "./styles.css";
import api from "../../services/api";

export default function Dashboard() {
  const [barbeiros, setBarbeiros] = useState("");
  const idUser = sessionStorage.getItem("id");
  const nome = sessionStorage.getItem("nome");

  const history = useHistory();

  function validaSession() {
    if (idUser == null || nome == null) {
      return history.push("/");
    }
  }

  useEffect(() => {
    api
      .get("dashboard", {
        headers: {
          authorization: idUser,
        },
      })
      .then((response) => {
        setBarbeiros(response.data);
      });
  }, [idUser]);
  function handleLogout() {
    sessionStorage.clear();
    history.push("/");
  }

  validaSession();
  return (
    <div className="container">
      <form>
        <header>
          <img src={Logo} alt="Logo" />
          <h2>Olá, {nome}</h2>
          <p>Inicie um agendamento escolhendo um dos profissionais abaixo.</p>
        </header>

        <ul>
          {barbeiros &&
            barbeiros.map((barbeiro) => (
              <li key={barbeiro.id}>
                <img src={Avatar} alt="Avatar" />
                <strong>{barbeiro.nome}</strong>
                <Link to={`/agendamento/${barbeiro.id}`}>+</Link>
              </li>
            ))}
        </ul>
        <button onClick={handleLogout}>
          <FiPower size={24} />
        </button>
      </form>
    </div>
  );
}
