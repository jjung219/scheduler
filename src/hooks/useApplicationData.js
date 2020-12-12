import { useState, useEffect } from 'react';
import Axios from 'axios';
import { setSpots } from "helpers/selectors";

export default function useApplicationData() {

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

    const days = setSpots([...state.days], id, -1);

    return Axios
      .put(`/api/appointments/${id}`, appointment)
      .then(() => {
        const appointments = {
        ...state.appointments,
        [id]: appointment
        };

        setState({
          ...state,
          days,
          appointments
        })
        return true
      })
  }

  function cancelInterview (appointmentId) {
    console.log("cancelling interview...")

    const days = setSpots([...state.days], appointmentId, 1);

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
          days,
          appointments
        })
      })
    
  }


  return { state, setDay, bookInterview, cancelInterview}
}