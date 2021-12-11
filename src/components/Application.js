import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import axios from "axios";
import  { getAppointmentsForDay, getInterview } from "helpers/selectors";

export default function Application(props) {
  
  const [ state, setState ]= useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  
  });

  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days}));
  useEffect(() =>{

    Promise.all([
      axios.get("api/days"),
      axios.get("api/appointments"),
      axios.get("api/interviewers")
    ]).then(all => {
      console.log("response from promise.all \n",all)
      setState( prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    });
  
  }, []);
  
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  console.log("daily appointments \n ",dailyAppointments)
  
  const appontmentArr = dailyAppointments.map( appoint => {
    const interview = getInterview(state, appoint.interview);
    return (
      <Appointment 
        key={appoint.id}   
        {...appoint} 
        interview={interview}/> );
  });

  
  
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
  value={state.day}
  onChange={setDay}
/>
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
        {appontmentArr}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
