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
  if (!interview) {
    return null
  }

  const interviewer = state.interviewers[interview.interviewer]
  return {
    // student name and interviewer name
    ...interview,
    interviewer,
    // interviewer: name
  }
}



function getInterviewersForDay(state, day) {
  const IntArray = [];
  for (const Day of state.days) {
    if (Day.name === day) {
      Day.interviewers.forEach(number => IntArray.push(state.interviewers[number]))
    }
  }
  //returns an array of interviewers for that day (id,name,avatar)
  return IntArray;
}


export { getAppointmentsForDay, getInterview, getInterviewersForDay };
