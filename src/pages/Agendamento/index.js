//https://www.youtube.com/watch?v=tojwQEdI-QI
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import DataPicker from "react-datepicker";
import { addDays } from "date-fns";
import api from "../../services/api";
import Logo from "../../assets/logo.svg";
import Avatar from "../../assets/avatar.svg";
import "../Styles/global.css";
import "./styles.css";

import "react-datepicker/dist/react-datepicker.css";
export default function Agendamento(props) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [barbeiro, setBarbeiro] = useState("");
  const history = useHistory();

  const idBarbeiro = props.match.params.barbeiro;

  const idUser = sessionStorage.getItem("id");
  const nome = sessionStorage.getItem("nome");

  async function handleAgendamento(e) {
    e.preventDefault();

    const data = selectedDate;
    const usuarioId = idUser;
    const barbeiroId = idBarbeiro;

    const datas = {
      data,
      usuarioId,
      barbeiroId,
    };

    try {
      await api.post("/agendamento/agendado", datas);
      alert("Agendamento realizado com sucesso");
      history.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  }

  function validaSession() {
    if (idUser == null || nome == null) {
      return history.push("/");
    }
  }

  useEffect(() => {
    api.get(`agendamento/${idBarbeiro}`).then((response) => {
      setBarbeiro(response.data);
    });
  }, [idBarbeiro]);

  validaSession();

  return (
    <div className="container">
      <form onSubmit={handleAgendamento}>
        <header>
          <img src={Logo} alt="Logo" />
        </header>

        <div className="provider">
          <img src={Avatar} alt="Avatar" />

          <strong>{barbeiro.nome}</strong>
        </div>

        <DataPicker
          className="datepicker"
          placeholderText="Clique para agendar seu horário"
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          showTimeSelect="HH"
          timeIntervals={60}
          minDate={new Date()}
          maxDate={addDays(new Date(), 7)}
          timeCaption="time"
          dateFormat="dd/MM/yyyy hh:mm:aa"
          filterDate={(date) => date.getDay() !== 6 && date.getDay(0)}
          todayButton="hoje"
        />
        <button type="submit">Agendar</button>
      </form>
    </div>
  );
}
