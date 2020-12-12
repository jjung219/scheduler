const getAppointmentsForDay = (state, day) => {
  const result = [];

  const filteredDays = state.days.filter((d) => d.name === day)
  
  if (state.days.length === 0) return [];
  if (filteredDays[0] === undefined) return [];
  const appointmentArr = filteredDays[0].appointments;

  for (const appointmentID of appointmentArr) {
    result.push(state.appointments[appointmentID])
  }

  return result;
}


const getInterview = (state, interview) => {
  let result = {};
  const interviewersObj = state.interviewers;
  
  if (interview === null) return null;
  const interviewerID = interview.interviewer;

  // console.log(interview.student)
  for (const interviewerKey in interviewersObj) {
    if (interviewersObj[interviewerKey].id === interviewerID) {
      result["student"] = interview.student;
      result["interviewer"] = interviewersObj[interviewerKey];
    }
  }
  return result;
}

// console.log(getInterview(state, state.appointments["3"].interview));

const getInterviewersForDay = (state, day) => {
  const interviewersObj = state.interviewers;
  let result = [];
  let interviewersForDayArr;

  if (state.days.length === 0) return [];
  const findDay = state.days.find((dayObj) => dayObj.name === day)
  if (findDay === undefined) return [];

  for (const dayObj of state.days) {
    if (dayObj.name === day) {
      interviewersForDayArr = dayObj.interviewers;
    }
  }

  for (const interviewerID of interviewersForDayArr) {
    result.push(interviewersObj[interviewerID])
  }
  return result;
}

const setSpots = (days, id, num) => {
  for (const dayObj of days) {
    if(dayObj.appointments.includes(id)) {
      dayObj.spots = dayObj.spots + num;
    }
  }

  return days;
}

export {getAppointmentsForDay, getInterview, getInterviewersForDay, setSpots};
