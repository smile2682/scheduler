import React, { useState, useEffect } from "react";
import DayList from './DayList'
import "components/Application.scss";
import Appointment from "components/Appointment/index";
import { getAppointmentsForDay } from "helpers/selectors";
import axios from "axios";


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);
 
  const setDay = day => setState({ ...state, day });
  // const setDays = (days) => setState(prev => ({ ...prev, days }));



  // use axios to fetch data
  // useEffect(() => {
  //   const DaysApi = 'http://localhost:8001/api/days';
  //   axios.get(DaysApi)
  // //     .then(response => setDays([...response.data]));
  // // }, [])

  Promise.all([
    axios.get("http://localhost:8001/api/days"),
    axios.get("http://localhost:8001/api/appointments"),
  ])
  .then((all) => {
    setState(prev => ({...prev, days: all[0].data, appointments: all[1].data}));
  });
  
    

  const Parsedappointment = dailyAppointments.map(
    appointment => {
      return <Appointment key={appointment.id}{...appointment} />
    }
  )
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />

        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
        {Parsedappointment}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}



