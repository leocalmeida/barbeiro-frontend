import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { FiPower } from "react-icons/fi";
import Logo from "../../assets/logo.svg";
import Avatar from "../../assets/avatar.svg";
import "../Styles/global.css";
import "./styles.css";
import api from "../../services/api";

export default function Dashboard() {
  const [providers, setProviders] = useState("");
  const userID = sessionStorage.getItem("id");
  const name = sessionStorage.getItem("name");

  const history = useHistory();

  function validaSession() {
    if (userID == null || name == null) {
      return history.push("/");
    }
  }
  validaSession();

  useEffect(() => {
    api
      .get("dashboardteste", {
        headers: {
          authorization: userID,
        },
      })
      .then((response) => {
        setProviders(response.data);
        console.log(response.data);
      });
  }, [userID]);

  function handleLogout() {
    sessionStorage.clear();
    history.push("/");
  }

  return (
    <div className="container">
      <form>
        <header>
          <img src={Logo} alt="Logo" />
          <h2>Olá, {name}</h2>
          <p>Inicie um agendamento escolhendo um dos profissionais abaixo.</p>
        </header>

        <ul>
          {providers &&
            providers.map((provider) => (
              <li key={provider._id}>
                <img src={Avatar} alt="Avatar" />
                <strong>{provider.name}</strong>
                <Link to={`/agendamento/${provider._id}`}>+</Link>
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
