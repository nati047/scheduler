import { useState, useEffect } from "react";
import axios from "axios";


export const useApplicationData = () => {
  // state.days.spots
  // appointmets for day stored in : state.days.appointments []
  // to calculate remaining spots: state.days.appointments.map(appoint-id) => if (state.appointments[appoint-id].interview) counter++
  const [ state, setState ]= useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  
  });
  const setDay = day => setState({ ...state, day });


  useEffect(() =>{
    Promise.all([
      axios.get("api/days"),
      axios.get("api/appointments"),
      axios.get("api/interviewers")
    ]).then(all => {
      setState( prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    });
  }, []);

  const calculateSpots = (day, days, appointments) => {
    const dayIndex = days.findIndex(dayName => dayName.name === day);
    const dayObj = days[dayIndex];
    const dailyAppointments = dayObj.appointments;
    let spots = 0;
    
    for (let apt of dailyAppointments) {
      !appointments[apt].interview && spots++;
    };

    const newDayObj = { ...dayObj, spots };
    const newDays = [...days];
    newDays[dayIndex] = newDayObj;
    return newDays;
  };

  // const updateSpots = (day, days, appointments) => { const dayIndex = days.findIndex(dayName => dayName.name === day); const dayObj = days[dayIndex]; const aptIds = dayObj.appointments; let spots = 0; for (const id of aptIds) { let appointment = appointments[id]; !appointment.interview && spots++; } let newDayObj = { ...dayObj, spots }; let newDaysArray = [...days]; newDaysArray[dayIndex] = newDayObj; return newDaysArray; };

  const  bookInterview = (id, interview) => {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return  axios.put(`/api/appointments/${id}`, appointment)
      .then( () => {
       const result =  calculateSpots(state.day, state.days, appointments);
        setState({  
          ...state,
          appointments,
          days: result
        });

          
        
      });
  };


  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
    .then( () => {
      const result =  calculateSpots(state.day, state.days, appointments);
      
      setState({  
        ...state,
        appointments,
        days: result
      });
    })
  };
  
  return { state, setDay, bookInterview, cancelInterview };

};