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
      student: interview.student,
      interviewer: name
    }
  }
  return null
}

export { getAppointmentsForDay, getInterview };