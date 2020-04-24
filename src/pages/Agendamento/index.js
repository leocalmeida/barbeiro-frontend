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
  const [provider, setProvider] = useState("");
  const [hour, setHour] = useState("");
  const history = useHistory();

  const name = sessionStorage.getItem("name");
  const userID = sessionStorage.getItem("id");
  const providerID = props.match.params.providerID;

  async function handleAgendamento(e) {
    e.preventDefault();

    if (selectedDate == null) {
      return alert("Preencha uma data");
    }
    const date =
      selectedDate.toLocaleDateString();

    const datas = {
      date,
      userID,
      providerID,
    };

    try {
      await api.post("/agendamento/agendadoteste", datas);
      alert("Agendamento realizado com sucesso");
      history.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  }

  function validaSession() {
    if (userID == null || name == null) {
      return history.push("/");
    }
  }

  useEffect(() => {
    api.get(`agendamentoteste/${providerID}`).then((response) => {
      setProvider(response.data);
    });
  }, [providerID]);


  validaSession();

  return (
    <div className="container">
      <form onSubmit={handleAgendamento}>
        <header>
          <img src={Logo} alt="Logo" />
        </header>

        <div className="provider">
          <img src={Avatar} alt="Avatar" />

          <strong>{provider.name}</strong>
        </div>

        <DataPicker
          className="datepicker"
          placeholderText="Clique para agendar seu horário"
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          
          minDate={new Date()}
          maxDate={addDays(new Date(), 7)}
          
          dateFormat="dd/MM/yyyy"
          filterDate={(date) => date.getDay() !== 6 && date.getDay(0)}
          todayButton="hoje"
        />
        <ul>
        <li>
          <span><input type="radio" />12:00</span>
        </li>
        <li>
        <span><input type="radio" />12:00</span>
        </li>
        <li>
        <span><input type="radio" />12:00</span>
        </li>
      </ul>
        <button type="submit">Agendar</button>
      </form>
    </div>
  );
}
