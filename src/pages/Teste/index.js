import React, { useState } from "react";
import { addDays } from "date-fns";
import DataPicker from "react-datepicker";



export default function Teste() {
  const [selectedDate, setSelectedDate] = useState(null);

  async function enviaData(e) {
    e.preventDefault();
    if (selectedDate == null) {
      return alert("Preencha uma data");
    }
    const iso =
      selectedDate.toLocaleDateString();
    console.log("---------------------------------");
    console.log(iso);
    // await api.post("datateste", iso);
  }
  return (
    <form onSubmit={enviaData}>
      <DataPicker
        className="datepicker"
        placeholderText="Clique para agendar seu horário"
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        
        dateFormat="dd/MM/yyyy"
        minDate={new Date()}
        
        maxDate={addDays(new Date(), 7)}
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
  );
}
