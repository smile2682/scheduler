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
// need to wrap with useEffect, nor the get api and set state will cause an infinite loop.
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

// this way makes it way easier
const updateSpots = function (state, appointments){
const dayObj = state.days.find(d => d.name === state.day);

let spots = 0;
for (const id of dayObj.appointments){
  const appointment = appointments[id];
  if(! appointment.interview){
    spots++;
  }
}
console.log("spots=",spots);
const newDay = {...dayObj,spots}
const newDays = state.days.map(d => d.name === state.day ? newDay :d)
return newDays;
}


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
      // shall  I spread the id and time? how does this put work? --put only change what is inside and do not change others, here can also put appointment without {}
      // how does it update the api/days.id.spots without axios.put?--backend did the work.
      interview,
    })
    .then(result => {
      const days = updateSpots(state, appointments)
      console.log(days)
      setState({
        ...state,
        appointments,
        days
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
    console.log(result);
    const days = updateSpots(state, appointments)
    console.log(days)
    setState({
      ...state,
      appointments,
      days
    });
  });
}
  return {state, setDay, bookInterview, cancelInterview}
}