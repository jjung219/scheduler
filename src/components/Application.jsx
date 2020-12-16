import React from "react";

import DayList from "components/DayList";
import Appointment from "components/Appointment/index";
// import helper function
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";


import "components/Application.scss";



export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  
  const interviewersArr = getInterviewersForDay(state, state.day);

  const showAppoinments = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    console.log("showing Appointments...")
    // console.log("Interviewers: ", interviewersArr)
    // console.log("Interview: ", interview)
    // console.log("appointments: ", appointment)
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

