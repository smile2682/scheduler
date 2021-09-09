import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {


  const [state, setState] = useState({
    day: "Monday",
    days: [],
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

  const updateSpots = function (state, appointments) {
    // get the day
    const dayObj = state.days.find(d => d.name === state.day);
    // calculate the spots
    let spots = 0;
    for (const id of dayObj.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots++;
      }
    }
    console.log("spots=", spots);
    // update spots in the chosen day
    const newDay = { ...dayObj, spots }
    // put day in days array, map is the best practice to inject newthing into a new array mapping from the old.
    const newDays = state.days.map(d => d.name === state.day ? newDay : d)
    // return days array
    return newDays;
  }


  function bookInterview(id, interview) {
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
        //put only change what is inside and do not change others, here can also put appointment without {}
        // Backend did the work to update the api/days.id.spots, here is only changing the state, which is cheaper.
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
  return { state, setDay, bookInterview, cancelInterview }
}