function getAppointmentsForDay(state, day) {
  const AppoArray = [];
  for (const Day of state.days) {
    if (Day.name === day) {
      Day.appointments.forEach(number => AppoArray.push(state.appointments[number]))
    }
  }
  //... returns an array of appointments for that day
  return AppoArray;
}

function getInterview(state, interview) {
  if (interview) {
    const name =state.interviewers[interview.interviewer] 
    return {
      ...interview,
      interviewer: name
    }
  }
  return null
}


function getInterviewersForDay(state, day) {
  const IntArray = [];
  for (const Day of state.days) {
    if (Day.name === day) {
      Day.interviewers.forEach(number => IntArray.push(state.interviewers[number]))
    }
  }
  //... returns an array of appointments for that day
  return IntArray;
}


export { getAppointmentsForDay, getInterview,getInterviewersForDay };
