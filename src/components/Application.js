import React, { useState, useEffect } from "react";
import Axios from 'axios';

import DayList from "components/DayList";
import Appointment from "components/Appointment/index";
// import helper function
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "helpers/selectors";


import "components/Application.scss";



export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday", 
    days: [],
    appointments: {
      "1": {
        id: 1,
        time: "12pm",
        interview: null
      }
    },
    interviewers: {}
  })


  const daysAPI = "/api/days"
  const appointmentsAPI = "/api/appointments"
  const interviewersAPI = "/api/interviewers"
  
  useEffect(() => {

    Promise.all([
      Axios.get(daysAPI),
      Axios.get(appointmentsAPI),
      Axios.get(interviewersAPI)
    ]).then((all) => {
      console.log(all[0].data); // first
      console.log(all[1].data); // second
      console.log(all[2].data); // second
    
      const [days, appointments, interviewers] = all;
      
      setState(prev => ({...prev, days: days.data, appointments: appointments.data, interviewers: interviewers.data}));
    });
    
  }, [])

  function setDay (day) {
    setState({ ...state, day });
  }

  function bookInterview (id, interview) {
    console.log("booking interview...")
    
    const appointment = {
      ...state.appointments[id],
      id: id,
      interview: { ...interview }
    };
    return Axios
      .put(`/api/appointments/${id}`, appointment)
      .then(() => {
        const appointments = {
        ...state.appointments,
        [id]: appointment
        };

        setState({
          ...state,
          appointments
        })
        return true
      })
  }

  function cancelInterview (appointmentId) {
    console.log("cancelling interview...")

    return Axios
      .delete(`/api/appointments/${appointmentId}`)
      .then(() => {
        const appointment = {
          ...state.appointments[appointmentId],
          id: appointmentId,
          interview: null
        };

        const appointments = {
        ...state.appointments,
        [appointmentId]: appointment
        };

        setState({
          ...state,
          appointments
        })
      })
    
  }

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  
  const interviewersArr = getInterviewersForDay(state, state.day);

  const showAppoinments = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    console.log("showing Appointments...")
    console.log(interview)
    return (
      <Appointment 
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        appointmentLength={Object.keys(state.appointments).length}
        interview={interview}
        interviewers={interviewersArr}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    )
  })


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
        {showAppoinments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}

