import React, { useState } from "react";
import { addDays, parseISO } from "date-fns";
import DataPicker from "react-datepicker";

import SimpleReactCalendar from "simple-react-calendar";

import api from "../../services/api";
import moment from "moment";

export default function Teste() {
  const [selectedDate, setSelectedDate] = useState(null);

  async function enviaData(e) {
    e.preventDefault();
    const iso =
      selectedDate.toLocaleDateString() + selectedDate.toLocaleTimeString();
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
        timeCaption="time"
        dateFormat="dd/MM/yyyy hh:mm:aa"
        minDate={new Date()}
        showTimeSelect="HH"
        timeIntervals={60}
        maxDate={addDays(new Date(), 7)}
        filterDate={(date) => date.getDay() !== 6 && date.getDay(0)}
        todayButton="hoje"
      />

      <button type="submit">Agendar</button>
    </form>
  );
}
