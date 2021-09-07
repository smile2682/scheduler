import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {


const [state, setState] = useState({
  day: "Monday",
  days: [],
  // you may put the line below, but will have to remove/comment hardcoded appointments variable
  appointments: {}
});



const setDay = day => setState({ ...state, day });
// need to wrap with useEffect, nor the get api and set state will,
useEffect(() => {
  Promise.all([
    axios.get("http://localhost:8001/api/days"),
    axios.get("http://localhost:8001/api/appointments"),
    axios.get("http://localhost:8001/api/interviewers")
  ])
    .then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
}, []);
// console.log("after",state.interviewers)


function bookInterview(id, interview) {
  console.log(id, interview);
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };

  return axios
    .put(`/api/appointments/${id}`, {
      // shall  I spread the id and time? how does this put work?
      interview,
    })
    .then(result => {
      setState({
        ...state,
        appointments
      });
      console.log(result)
    });
  
};

function cancelInterview(id) {
  const appointment = {
    ...state.appointments[id],
    interview: null,
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment,
  };

  return axios.delete(`/api/appointments/${id}`, {}).then((result) => {
    console.log(result)
    setState({
      ...state,
      appointments,
    });
  });
}
  return {state, setDay, bookInterview, cancelInterview}
}